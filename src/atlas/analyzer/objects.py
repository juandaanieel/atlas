from __future__ import annotations

import ast
import re
from collections import defaultdict, deque

from atlas.analyzer.classify import is_private_name
from atlas.analyzer.docstrings import summarize_docstring
from atlas.analyzer.models import SymbolInfo
from atlas.analyzer.snippets import line_range, source_excerpt


FUNCTION_NODES = (ast.FunctionDef, ast.AsyncFunctionDef)
SELF_NAMES = {"self", "cls"}
DATACLASS_DECORATOR_NAMES = {"dataclass", "attrs", "attr", "define", "frozen"}


class FieldAccessVisitor(ast.NodeVisitor):
    def __init__(self) -> None:
        self.reads: set[str] = set()
        self.writes: set[str] = set()
        self.collaborator_calls: list[dict[str, object]] = []
        self._seen_calls: set[tuple[str, str, int]] = set()

    def collect(self, node: ast.AST) -> None:
        for child in getattr(node, "body", []):
            self.visit(child)

    def visit_Call(self, node: ast.Call) -> None:
        call = _self_collaborator_call(node)
        if call:
            key = (call["field"], call["method"], call["line"])
            if key not in self._seen_calls:
                self._seen_calls.add(key)
                self.collaborator_calls.append(call)
                self.reads.add(call["field"])
        self.generic_visit(node)

    def visit_Attribute(self, node: ast.Attribute) -> None:
        field_name = _self_field_name(node)
        if field_name:
            if isinstance(node.ctx, ast.Store):
                self.writes.add(field_name)
            elif isinstance(node.ctx, ast.Load):
                self.reads.add(field_name)
        self.generic_visit(node)

    def visit_AugAssign(self, node: ast.AugAssign) -> None:
        field_name = _self_field_name(node.target)
        if field_name:
            self.reads.add(field_name)
            self.writes.add(field_name)
        self.generic_visit(node)

    def visit_FunctionDef(self, node: ast.FunctionDef) -> None:
        return

    def visit_AsyncFunctionDef(self, node: ast.AsyncFunctionDef) -> None:
        return

    def visit_ClassDef(self, node: ast.ClassDef) -> None:
        return

    def visit_Lambda(self, node: ast.Lambda) -> None:
        return


class SelfAssignmentVisitor(ast.NodeVisitor):
    """Collect fields assigned directly by one method scope."""

    def __init__(self) -> None:
        self.assignments: list[tuple[str, ast.AST]] = []

    def collect(
        self,
        node: ast.FunctionDef | ast.AsyncFunctionDef,
    ) -> list[tuple[str, ast.AST]]:
        for child in node.body:
            self.visit(child)
        return self.assignments

    def visit_Assign(self, node: ast.Assign) -> None:
        for target in node.targets:
            self._add(target, node.value)
        self.generic_visit(node.value)

    def visit_AnnAssign(self, node: ast.AnnAssign) -> None:
        if node.value is not None:
            self._add(node.target, node.value)
            self.visit(node.value)

    def visit_AugAssign(self, node: ast.AugAssign) -> None:
        self._add(node.target, node.value)
        self.visit(node.value)

    def visit_FunctionDef(self, node: ast.FunctionDef) -> None:
        return

    def visit_AsyncFunctionDef(self, node: ast.AsyncFunctionDef) -> None:
        return

    def visit_ClassDef(self, node: ast.ClassDef) -> None:
        return

    def visit_Lambda(self, node: ast.Lambda) -> None:
        return

    def _add(self, target: ast.AST, value: ast.AST) -> None:
        field_name = _self_field_name(target)
        if field_name:
            self.assignments.append((field_name, value))


def extract_objects(
    tree: ast.Module,
    module: str,
    file_id: str,
    lines: list[str],
    symbols: list[SymbolInfo],
) -> list[dict[str, object]]:
    class_symbols = {symbol.id: symbol for symbol in symbols if symbol.kind == "class"}
    class_by_name = {symbol.name: symbol.id for symbol in class_symbols.values()}

    objects: list[dict[str, object]] = []
    for node in tree.body:
        if not isinstance(node, ast.ClassDef):
            continue

        class_id = f"{module}.{node.name}"
        methods = [child for child in node.body if isinstance(child, FUNCTION_NODES)]
        method_ids = {method.name: f"{class_id}.{method.name}" for method in methods}
        constructor_node = next(
            (method for method in methods if method.name == "__init__"), None
        )
        constructor_id = method_ids.get("__init__")
        constructor_params = (
            _constructor_params(constructor_node, class_by_name)
            if constructor_node is not None
            else []
        )
        params_by_name = {str(param["name"]): param for param in constructor_params}

        fields_by_name: dict[str, dict[str, object]] = {}
        for field_record in _declared_fields(node, class_by_name):
            fields_by_name[str(field_record["name"])] = field_record
        field_access: list[dict[str, object]] = []
        for method in methods:
            method_id = method_ids[method.name]
            access = FieldAccessVisitor()
            access.collect(method)
            field_access.append(
                {
                    "method_id": method_id,
                    "reads": sorted(access.reads),
                    "writes": sorted(access.writes),
                    "collaborator_calls": sorted(
                        access.collaborator_calls,
                        key=lambda item: (
                            str(item["field"]),
                            str(item["method"]),
                            int(item["line"]),
                        ),
                    ),
                }
            )

            for field_name, value in _self_assignments(method):
                field_record = _field_record(
                    field_name,
                    value,
                    assigned_in=method_id,
                    params_by_name=params_by_name,
                    class_by_name=class_by_name,
                )
                if field_name not in fields_by_name or method.name == "__init__":
                    fields_by_name[field_name] = field_record

        field_names = set(fields_by_name)
        for access in field_access:
            access["reads"] = [
                field for field in access["reads"] if field in field_names
            ]
            access["writes"] = [
                field for field in access["writes"] if field in field_names
            ]
            access["collaborator_calls"] = [
                call
                for call in access["collaborator_calls"]
                if call["field"] in field_names
            ]

        collaborator_call_fields = {
            str(call["field"])
            for access in field_access
            for call in access["collaborator_calls"]  # type: ignore[index]
        }
        for field_name in collaborator_call_fields:
            field = fields_by_name.get(field_name)
            if field and field["collaborator_kind"] is None:
                if field["source_kind"] in {"param", "declaration"}:
                    field["collaborator_kind"] = "injected"
                elif field["source_kind"] == "call":
                    field["collaborator_kind"] = "owned"

        start, end = line_range(node)
        objects.append(
            {
                "id": class_id,
                "name": node.name,
                "qualified_name": class_id,
                "module": module,
                "file_id": file_id,
                "line_start": start,
                "line_end": end,
                "docstring_summary": summarize_docstring(node),
                "source_excerpt": source_excerpt(lines, node),
                "bases": _base_records(node, class_by_name),
                "constructor": {
                    "method_id": constructor_id,
                    "params": constructor_params,
                    "assigned_fields": sorted(
                        field["name"]
                        for field in fields_by_name.values()
                        if field["assigned_in"] == constructor_id
                    ),
                },
                "fields": sorted(fields_by_name.values(), key=lambda item: str(item["name"])),
                "methods": {
                    "public": [
                        method_ids[method.name]
                        for method in methods
                        if method.name != "__init__" and not is_private_name(method.name)
                    ],
                    "private": [
                        method_ids[method.name]
                        for method in methods
                        if method.name != "__init__" and is_private_name(method.name)
                    ],
                },
                "field_access": sorted(
                    field_access, key=lambda item: str(item["method_id"])
                ),
            }
        )

    return objects


def assign_onion_rings(objects: list[dict], calls: list[dict]) -> None:
    """Annotate each object with encapsulation-depth rings for the onion view.

    Ring 0 is the class skin: the constructor plus every public method,
    dunder protocol methods included. Private methods sit on deeper rings by
    their shortest call distance from any skin method, so reading inward
    descends from interface to implementation. Private methods no skin method
    ever reaches are detached: they hang outside the onion.
    """
    outgoing: dict[str, set[str]] = defaultdict(set)
    for call in calls:
        if call["target"]:
            outgoing[call["source"]].add(call["target"])

    for item in objects:
        methods = item["methods"]
        constructor_id = item["constructor"]["method_id"]
        skin = ([constructor_id] if constructor_id else []) + list(methods["public"])
        member_ids = set(skin) | set(methods["private"])
        ring = {method_id: 0 for method_id in skin}
        queue = deque(skin)
        while queue:
            source = queue.popleft()
            for target in sorted(outgoing[source]):
                if target in member_ids and target not in ring:
                    ring[target] = ring[source] + 1
                    queue.append(target)
        item["onion"] = {
            "ring_count": max(ring.values(), default=-1) + 1,
            "methods": [
                {
                    "id": method_id,
                    "ring": ring.get(method_id),
                    "detached": method_id not in ring,
                }
                for method_id in sorted(member_ids)
            ],
        }


def _declared_fields(
    node: ast.ClassDef,
    class_by_name: dict[str, str],
) -> list[dict[str, object]]:
    """Collect class-body field declarations, the way dataclasses hold state."""
    dataclass_like = _is_dataclass_like(node)
    records = []
    for child in node.body:
        if isinstance(child, ast.AnnAssign) and isinstance(child.target, ast.Name):
            name = child.target.id
            if name.startswith("__") and name.endswith("__"):
                continue
            annotation = _unparse(child.annotation)
            collaborator_id = _resolve_annotation_target(annotation, class_by_name)
            records.append(
                {
                    "name": name,
                    "assigned_in": None,
                    "source_kind": "declaration",
                    "source_name": annotation or "",
                    "collaborator_id": collaborator_id,
                    "collaborator_kind": "injected" if collaborator_id and dataclass_like else None,
                }
            )
        elif isinstance(child, ast.Assign):
            for target in child.targets:
                if not isinstance(target, ast.Name):
                    continue
                if target.id.startswith("__") and target.id.endswith("__"):
                    continue
                record = _field_record(
                    target.id,
                    child.value,
                    assigned_in=None,
                    params_by_name={},
                    class_by_name=class_by_name,
                )
                records.append(record)
    return records


def _is_dataclass_like(node: ast.ClassDef) -> bool:
    for decorator in node.decorator_list:
        name = _dotted_name(decorator)
        if name and name.split(".")[-1] in DATACLASS_DECORATOR_NAMES:
            return True
    return False


def _base_records(
    node: ast.ClassDef,
    class_by_name: dict[str, str],
) -> list[dict[str, object]]:
    records = []
    for base in node.bases:
        name = _dotted_name(base) or _unparse(base) or "?"
        records.append(
            {
                "name": name,
                "collaborator_id": _resolve_call_target(name, class_by_name),
            }
        )
    return records


def _constructor_params(
    node: ast.FunctionDef | ast.AsyncFunctionDef,
    class_by_name: dict[str, str],
) -> list[dict[str, object]]:
    positional = [*node.args.posonlyargs, *node.args.args]
    defaults = [None] * (len(positional) - len(node.args.defaults)) + list(
        node.args.defaults
    )
    params = []
    for index, (arg, default) in enumerate(zip(positional, defaults)):
        if arg.arg in SELF_NAMES:
            continue
        kind = "positional-only" if index < len(node.args.posonlyargs) else "positional"
        params.append(_param_record(arg, kind, default, class_by_name))

    if node.args.vararg is not None:
        params.append(_param_record(node.args.vararg, "variadic", None, class_by_name))

    params.extend(
        _param_record(arg, "keyword-only", default, class_by_name)
        for arg, default in zip(node.args.kwonlyargs, node.args.kw_defaults)
    )

    if node.args.kwarg is not None:
        params.append(
            _param_record(node.args.kwarg, "keyword-variadic", None, class_by_name)
        )

    return params


def _param_record(
    arg: ast.arg,
    kind: str,
    default: ast.AST | None,
    class_by_name: dict[str, str],
) -> dict[str, object]:
    annotation = _unparse(arg.annotation)
    return {
        "name": arg.arg,
        "kind": kind,
        "annotation": annotation,
        "has_default": default is not None,
        "default": _unparse(default),
        "collaborator_id": _resolve_annotation_target(annotation, class_by_name),
    }


def _self_assignments(
    method: ast.FunctionDef | ast.AsyncFunctionDef,
) -> list[tuple[str, ast.AST]]:
    return SelfAssignmentVisitor().collect(method)


def _field_record(
    field_name: str,
    value: ast.AST,
    *,
    assigned_in: str | None,
    params_by_name: dict[str, dict[str, object]],
    class_by_name: dict[str, str],
) -> dict[str, object]:
    record: dict[str, object] = {
        "name": field_name,
        "assigned_in": assigned_in,
        "source_kind": "expression",
        "source_name": _unparse(value),
        "collaborator_id": None,
        "collaborator_kind": None,
    }

    if isinstance(value, ast.Name) and value.id in params_by_name:
        param = params_by_name[value.id]
        collaborator_id = param["collaborator_id"]
        record.update(
            {
                "source_kind": "param",
                "source_name": value.id,
                "collaborator_id": collaborator_id,
                "collaborator_kind": "injected" if collaborator_id else None,
            }
        )
        return record

    if isinstance(value, ast.Call):
        call_name = _dotted_name(value.func) or "call"
        collaborator_id = _resolve_call_target(call_name, class_by_name)
        record.update(
            {
                "source_kind": "call",
                "source_name": call_name,
                "collaborator_id": collaborator_id,
                "collaborator_kind": "owned" if collaborator_id else None,
            }
        )
        return record

    if isinstance(value, (ast.Constant, ast.List, ast.Tuple, ast.Dict, ast.Set)):
        record["source_kind"] = "literal"

    return record


def _self_collaborator_call(node: ast.Call) -> dict[str, object] | None:
    func = node.func
    if not isinstance(func, ast.Attribute):
        return None
    receiver = func.value
    if not isinstance(receiver, ast.Attribute):
        return None
    field_name = _self_field_name(receiver)
    if not field_name:
        return None
    return {
        "field": field_name,
        "method": func.attr,
        "called_name": f"{field_name}.{func.attr}",
        "line": node.lineno,
    }


def _self_field_name(node: ast.AST) -> str | None:
    if not isinstance(node, ast.Attribute):
        return None
    if isinstance(node.value, ast.Name) and node.value.id in SELF_NAMES:
        return node.attr
    return None


def _resolve_annotation_target(
    annotation: str | None,
    class_by_name: dict[str, str],
) -> str | None:
    if not annotation:
        return None
    for token in reversed(re.findall(r"[A-Za-z_][A-Za-z0-9_]*", annotation)):
        if token in class_by_name:
            return class_by_name[token]
    return None


def _resolve_call_target(call_name: str, class_by_name: dict[str, str]) -> str | None:
    name = call_name.split(".")[-1]
    return class_by_name.get(name)


def _dotted_name(node: ast.AST) -> str | None:
    if isinstance(node, ast.Name):
        return node.id
    if isinstance(node, ast.Attribute):
        parent = _dotted_name(node.value)
        return f"{parent}.{node.attr}" if parent else node.attr
    if isinstance(node, ast.Call):
        return _dotted_name(node.func)
    if isinstance(node, ast.Subscript):
        return _dotted_name(node.value)
    return None


def _unparse(node: ast.AST | None) -> str | None:
    if node is None:
        return None
    return ast.unparse(node)
