from __future__ import annotations

import ast
import builtins
from dataclasses import dataclass
from collections import defaultdict

from atlas.analyzer.imports import build_import_aliases
from atlas.analyzer.models import CallInfo, SymbolInfo
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
        # Recurse into nested functions so their calls are attributed to the
        # enclosing symbol. Without this, a helper invoked only from a closure
        # looks like it has no callers and is mislabelled dead code.
        self.generic_visit(node)

    def visit_AsyncFunctionDef(self, node: ast.AsyncFunctionDef) -> None:
        self.generic_visit(node)

    def visit_ClassDef(self, node: ast.ClassDef) -> None:
        return


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
        aliases = build_import_aliases(parsed.file.module, parsed.imports, local_modules, symbol_ids)
        context = _file_context(symbols_by_file[parsed.file.id])
        for source_id, node in parsed.callable_nodes.items():
            source_symbol = symbol_by_id[source_id]
            visitor = CallVisitor()
            for raw_call in visitor.collect(node):
                calls.append(
                    _resolve_call(
                        raw_call.name,
                        raw_call.line,
                        source_symbol,
                        context,
                        aliases,
                        symbol_by_id,
                    )
                )
    return sorted(calls, key=lambda call: (call.source, call.line, call.called_name, call.kind))


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
    symbol_by_id: dict[str, SymbolInfo],
) -> CallInfo:
    parts = call_name.split(".")
    root = parts[0]

    same_file_target = _resolve_same_file(parts, source_symbol, context)
    if same_file_target:
        return _resolved_call(source_symbol.id, same_file_target, call_name, line, symbol_by_id)

    imported_target = _resolve_imported(parts, aliases, symbol_by_id)
    if imported_target == "__external__":
        return _external_call(source_symbol.id, call_name, line)
    if imported_target:
        return _resolved_call(source_symbol.id, imported_target, call_name, line, symbol_by_id)

    if root in BUILTIN_NAMES:
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
) -> str | None:
    top_level: dict[str, SymbolInfo] = context["top_level"]  # type: ignore[assignment]
    classes_by_name: dict[str, SymbolInfo] = context["classes_by_name"]  # type: ignore[assignment]
    methods_by_class: dict[str, dict[str, SymbolInfo]] = context["methods_by_class"]  # type: ignore[assignment]

    if len(parts) == 1:
        name = parts[0]
        if source_symbol.class_id and name in methods_by_class.get(source_symbol.class_id, {}):
            return methods_by_class[source_symbol.class_id][name].id
        if name in top_level:
            return top_level[name].id
        return None

    root, member = parts[0], parts[1]
    if root in {"self", "cls"} and source_symbol.class_id and len(parts) == 2:
        method = methods_by_class.get(source_symbol.class_id, {}).get(member)
        return method.id if method else None

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
