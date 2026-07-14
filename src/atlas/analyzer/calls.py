from __future__ import annotations

import ast
import builtins
from collections import defaultdict
from dataclasses import dataclass

from atlas.analyzer.imports import build_import_aliases
from atlas.analyzer.models import CallInfo, ImportInfo, SymbolInfo
from atlas.analyzer.parser import ParsedFile


BUILTIN_NAMES = set(dir(builtins))


@dataclass
class RawCall:
    name: str
    line: int


class CallVisitor(ast.NodeVisitor):
    def __init__(self) -> None:
        self.calls: list[RawCall] = []

    def collect(self, node: ast.AST) -> list[RawCall]:
        for child in getattr(node, "body", []):
            self.visit(child)
        return self.calls

    def visit_Call(self, node: ast.Call) -> None:
        name = dotted_name(node.func)
        if name:
            self.calls.append(RawCall(name=name, line=node.lineno))
        self.generic_visit(node)

    def visit_FunctionDef(self, node: ast.FunctionDef) -> None:
        return

    def visit_AsyncFunctionDef(self, node: ast.AsyncFunctionDef) -> None:
        return

    def visit_ClassDef(self, node: ast.ClassDef) -> None:
        return

    def visit_Lambda(self, node: ast.Lambda) -> None:
        return


class ScopeVisitor(ast.NodeVisitor):
    """Collect imports and local bindings without entering nested scopes."""

    def __init__(self, file_id: str, module: str) -> None:
        self.file_id = file_id
        self.module = module
        self.imports: list[ImportInfo] = []
        self.bound_names: set[str] = set()

    def collect(self, node: ast.AST) -> tuple[list[ImportInfo], set[str]]:
        for child in getattr(node, "body", []):
            self.visit(child)
        return self.imports, self.bound_names

    def visit_Import(self, node: ast.Import) -> None:
        for alias in node.names:
            self.imports.append(
                ImportInfo(
                    file_id=self.file_id,
                    module=self.module,
                    name=alias.name,
                    alias=alias.asname,
                    imported_module=alias.name,
                    level=0,
                    kind="import",
                    line=node.lineno,
                )
            )

    def visit_ImportFrom(self, node: ast.ImportFrom) -> None:
        imported_module = node.module or ""
        for alias in node.names:
            if alias.name == "*":
                continue
            self.imports.append(
                ImportInfo(
                    file_id=self.file_id,
                    module=self.module,
                    name=alias.name,
                    alias=alias.asname,
                    imported_module=imported_module,
                    level=node.level,
                    kind="from",
                    line=node.lineno,
                )
            )

    def visit_Name(self, node: ast.Name) -> None:
        if isinstance(node.ctx, (ast.Store, ast.Del)):
            self.bound_names.add(node.id)

    def visit_FunctionDef(self, node: ast.FunctionDef) -> None:
        self.bound_names.add(node.name)

    def visit_AsyncFunctionDef(self, node: ast.AsyncFunctionDef) -> None:
        self.bound_names.add(node.name)

    def visit_ClassDef(self, node: ast.ClassDef) -> None:
        self.bound_names.add(node.name)

    def visit_Lambda(self, node: ast.Lambda) -> None:
        return


class AssignmentVisitor(ast.NodeVisitor):
    """Collect runtime name assignments without entering nested scopes."""

    def __init__(self) -> None:
        self.names: set[str] = set()

    def collect(self, node: ast.AST) -> set[str]:
        for child in getattr(node, "body", []):
            self.visit(child)
        return self.names

    def visit_Name(self, node: ast.Name) -> None:
        if isinstance(node.ctx, (ast.Store, ast.Del)):
            self.names.add(node.id)

    def visit_ExceptHandler(self, node: ast.ExceptHandler) -> None:
        if node.name:
            self.names.add(node.name)
        self.generic_visit(node)

    def visit_Import(self, node: ast.Import) -> None:
        return

    def visit_ImportFrom(self, node: ast.ImportFrom) -> None:
        return

    def visit_FunctionDef(self, node: ast.FunctionDef) -> None:
        if node.col_offset:
            self.names.add(node.name)
        return

    def visit_AsyncFunctionDef(self, node: ast.AsyncFunctionDef) -> None:
        if node.col_offset:
            self.names.add(node.name)
        return

    def visit_ClassDef(self, node: ast.ClassDef) -> None:
        if node.col_offset:
            self.names.add(node.name)
        return

    def visit_Lambda(self, node: ast.Lambda) -> None:
        return

    def visit_ListComp(self, node: ast.ListComp) -> None:
        self.generic_visit(node)

    def visit_SetComp(self, node: ast.SetComp) -> None:
        self.generic_visit(node)

    def visit_DictComp(self, node: ast.DictComp) -> None:
        self.generic_visit(node)

    def visit_GeneratorExp(self, node: ast.GeneratorExp) -> None:
        self.generic_visit(node)

    def visit_MatchAs(self, node: ast.AST) -> None:
        name = getattr(node, "name", None)
        if name:
            self.names.add(name)
        pattern = getattr(node, "pattern", None)
        if pattern is not None:
            self.visit(pattern)

    def visit_MatchStar(self, node: ast.AST) -> None:
        name = getattr(node, "name", None)
        if name:
            self.names.add(name)

    def visit_MatchMapping(self, node: ast.AST) -> None:
        rest = getattr(node, "rest", None)
        if rest:
            self.names.add(rest)
        self.generic_visit(node)


def dotted_name(node: ast.AST) -> str | None:
    if isinstance(node, ast.Name):
        return node.id
    if isinstance(node, ast.Attribute):
        parent = dotted_name(node.value)
        return f"{parent}.{node.attr}" if parent else node.attr
    if isinstance(node, ast.Call):
        return dotted_name(node.func)
    if isinstance(node, ast.Subscript):
        return dotted_name(node.value)
    return None


def build_calls(parsed_files: list[ParsedFile], symbols: list[SymbolInfo]) -> list[CallInfo]:
    symbol_by_id = {symbol.id: symbol for symbol in symbols}
    symbol_ids = set(symbol_by_id)
    local_modules = {parsed.file.module for parsed in parsed_files}
    symbols_by_file: dict[str, list[SymbolInfo]] = defaultdict(list)
    for symbol in symbols:
        symbols_by_file[symbol.file_id].append(symbol)

    calls: list[CallInfo] = []
    for parsed in parsed_files:
        module_scope_imports = _scope_imports(parsed, parsed.tree)
        direct_module_imports = _module_imports(parsed)
        direct_module_import_names = {
            _visible_import_name(info) for info in direct_module_imports
        }
        definition_collisions = (
            _direct_definition_names(parsed.tree) & direct_module_import_names
        )
        module_ambiguous_names = (
            _conditional_import_names(module_scope_imports, direct_module_imports)
            | AssignmentVisitor().collect(parsed.tree)
            | definition_collisions
        )
        module_aliases = build_import_aliases(
            parsed.file.module,
            [
                info
                for info in direct_module_imports
                if _visible_import_name(info) not in module_ambiguous_names
            ],
            local_modules,
            symbol_ids,
        )
        module_import_names = {
            _visible_import_name(info) for info in module_scope_imports
        }
        context = _file_context(symbols_by_file[parsed.file.id])
        for source_id, node in parsed.callable_nodes.items():
            source_symbol = symbol_by_id[source_id]
            local_imports, shadowed_names = _callable_scope(parsed, node)
            direct_local_imports = _direct_imports(parsed, node)
            conditional_local_import_names = _conditional_import_names(
                local_imports, direct_local_imports
            )
            local_import_names = {_visible_import_name(info) for info in local_imports}
            inherited_aliases = {
                name: alias
                for name, alias in module_aliases.items()
                if name not in shadowed_names and name not in local_import_names
            }
            visitor = CallVisitor()
            for raw_call in visitor.collect(node):
                aliases = dict(inherited_aliases)
                aliases.update(
                    build_import_aliases(
                        parsed.file.module,
                        [
                            info
                            for info in direct_local_imports
                            if info.line <= raw_call.line
                            and _visible_import_name(info) not in shadowed_names
                            and _visible_import_name(info) not in conditional_local_import_names
                        ],
                        local_modules,
                        symbol_ids,
                    )
                )
                calls.append(
                    _resolve_call(
                        raw_call.name,
                        raw_call.line,
                        source_symbol,
                        context,
                        aliases,
                        shadowed_names
                        | local_import_names
                        | module_import_names
                        | module_ambiguous_names,
                        symbol_by_id,
                    )
                )
    return sorted(calls, key=lambda call: (call.source, call.line, call.called_name, call.kind))


def _module_imports(parsed: ParsedFile) -> list[ImportInfo]:
    return _direct_imports(parsed, parsed.tree)


def _direct_imports(parsed: ParsedFile, node: ast.AST) -> list[ImportInfo]:
    """Return imports that execute directly in this scope, not in a branch."""
    imports: list[ImportInfo] = []
    for child in getattr(node, "body", []):
        if isinstance(child, (ast.Import, ast.ImportFrom)):
            visitor = ScopeVisitor(parsed.file.id, parsed.file.module)
            visitor.visit(child)
            imports.extend(visitor.imports)
    return imports


def _scope_imports(parsed: ParsedFile, node: ast.AST) -> list[ImportInfo]:
    visitor = ScopeVisitor(parsed.file.id, parsed.file.module)
    imports, _ = visitor.collect(node)
    return imports


def _conditional_import_names(
    scope_imports: list[ImportInfo], direct_imports: list[ImportInfo]
) -> set[str]:
    direct_lines = {info.line for info in direct_imports}
    return {
        _visible_import_name(info)
        for info in scope_imports
        if info.line not in direct_lines
    }


def _direct_definition_names(node: ast.AST) -> set[str]:
    return {
        child.name
        for child in getattr(node, "body", [])
        if isinstance(child, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef))
    }


def _callable_scope(parsed: ParsedFile, node: ast.AST) -> tuple[list[ImportInfo], set[str]]:
    visitor = ScopeVisitor(parsed.file.id, parsed.file.module)
    imports, _ = visitor.collect(node)
    shadowed_names = AssignmentVisitor().collect(node)
    arguments = getattr(node, "args", None)
    if arguments is not None:
        shadowed_names.update(
            argument.arg
            for argument in (
                *arguments.posonlyargs,
                *arguments.args,
                *arguments.kwonlyargs,
            )
        )
        if arguments.vararg:
            shadowed_names.add(arguments.vararg.arg)
        if arguments.kwarg:
            shadowed_names.add(arguments.kwarg.arg)
    return imports, shadowed_names


def _visible_import_name(info: ImportInfo) -> str:
    if info.kind == "import":
        return info.alias or info.imported_module.split(".")[0]
    return info.alias or info.name


def _file_context(symbols: list[SymbolInfo]) -> dict[str, object]:
    top_level: dict[str, SymbolInfo] = {}
    classes_by_name: dict[str, SymbolInfo] = {}
    methods_by_class: dict[str, dict[str, SymbolInfo]] = defaultdict(dict)

    for symbol in symbols:
        if symbol.kind in {"function", "class"}:
            top_level[symbol.name] = symbol
        if symbol.kind == "class":
            classes_by_name[symbol.name] = symbol
        if symbol.kind == "method" and symbol.class_id:
            methods_by_class[symbol.class_id][symbol.name] = symbol

    return {
        "top_level": top_level,
        "classes_by_name": classes_by_name,
        "methods_by_class": methods_by_class,
    }


def _resolve_call(
    call_name: str,
    line: int,
    source_symbol: SymbolInfo,
    context: dict[str, object],
    aliases: dict[str, dict[str, str | bool | None]],
    shadowed_names: set[str],
    symbol_by_id: dict[str, SymbolInfo],
) -> CallInfo:
    parts = call_name.split(".")
    root = parts[0]

    imported_target = _resolve_imported(parts, aliases, symbol_by_id)
    if imported_target == "__external__":
        return _external_call(source_symbol.id, call_name, line)
    if imported_target:
        return _resolved_call(source_symbol.id, imported_target, call_name, line, symbol_by_id)

    same_file_target = _resolve_same_file(
        parts,
        source_symbol,
        context,
        shadowed_names,
    )
    if same_file_target:
        return _resolved_call(source_symbol.id, same_file_target, call_name, line, symbol_by_id)

    if root in BUILTIN_NAMES and root not in shadowed_names:
        return _external_call(source_symbol.id, call_name, line)

    return CallInfo(
        source=source_symbol.id,
        target=None,
        called_name=call_name,
        kind="unresolved",
        resolved=False,
        confidence=0.0,
        line=line,
    )


def _resolve_same_file(
    parts: list[str],
    source_symbol: SymbolInfo,
    context: dict[str, object],
    shadowed_names: set[str],
) -> str | None:
    top_level: dict[str, SymbolInfo] = context["top_level"]  # type: ignore[assignment]
    classes_by_name: dict[str, SymbolInfo] = context["classes_by_name"]  # type: ignore[assignment]
    methods_by_class: dict[str, dict[str, SymbolInfo]] = context["methods_by_class"]  # type: ignore[assignment]

    if len(parts) == 1:
        name = parts[0]
        if name in shadowed_names:
            return None
        if name in top_level:
            return top_level[name].id
        return None

    root, member = parts[0], parts[1]
    if root in {"self", "cls"} and source_symbol.class_id and len(parts) == 2:
        method = methods_by_class.get(source_symbol.class_id, {}).get(member)
        return method.id if method else None

    if root in shadowed_names:
        return None

    class_symbol = classes_by_name.get(root)
    if class_symbol and len(parts) == 2:
        method = methods_by_class.get(class_symbol.id, {}).get(member)
        return method.id if method else None
    return None


def _resolve_imported(
    parts: list[str],
    aliases: dict[str, dict[str, str | bool | None]],
    symbol_by_id: dict[str, SymbolInfo],
) -> str | None:
    root = parts[0]
    alias = aliases.get(root)
    if not alias:
        return None
    if alias.get("external"):
        return "__external__"

    symbol_id = alias.get("symbol")
    module = alias.get("module")
    suffix = ".".join(parts[1:])

    if isinstance(symbol_id, str) and not suffix:
        return symbol_id
    if isinstance(symbol_id, str) and suffix:
        candidate = f"{symbol_id}.{suffix}"
        if candidate in symbol_by_id:
            return candidate
    if isinstance(module, str) and suffix:
        candidate = f"{module}.{suffix}"
        if candidate in symbol_by_id:
            return candidate

    return None


def _resolved_call(
    source: str,
    target: str,
    called_name: str,
    line: int,
    symbol_by_id: dict[str, SymbolInfo],
) -> CallInfo:
    source_file = symbol_by_id[source].file_id
    target_file = symbol_by_id[target].file_id
    kind = "same_file" if source_file == target_file else "cross_file"
    return CallInfo(
        source=source,
        target=target,
        called_name=called_name,
        kind=kind,
        resolved=True,
        confidence=1.0,
        line=line,
    )


def _external_call(source: str, called_name: str, line: int) -> CallInfo:
    return CallInfo(
        source=source,
        target=None,
        called_name=called_name,
        kind="external",
        resolved=False,
        confidence=0.5,
        line=line,
    )
