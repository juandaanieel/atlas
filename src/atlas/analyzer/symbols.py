from __future__ import annotations

import ast

from atlas.analyzer.classify import is_entrypoint_name, is_private_name, is_test_symbol
from atlas.analyzer.complexity import function_complexity
from atlas.analyzer.docstrings import summarize_docstring
from atlas.analyzer.fingerprint import is_wrapper_body, structure_signature
from atlas.analyzer.models import SymbolInfo
from atlas.analyzer.snippets import line_range, source_excerpt


FUNCTION_NODES = (ast.FunctionDef, ast.AsyncFunctionDef)


def decorator_name(node: ast.AST) -> str:
    try:
        return ast.unparse(node)
    except Exception:
        return node.__class__.__name__


def extract_symbols(
    tree: ast.Module,
    module: str,
    file_id: str,
    file_is_test: bool,
    lines: list[str],
) -> tuple[list[SymbolInfo], dict[str, ast.AST]]:
    symbols: list[SymbolInfo] = []
    callable_nodes: dict[str, ast.AST] = {}

    for node in tree.body:
        if isinstance(node, ast.ClassDef):
            class_id = f"{module}.{node.name}"
            symbols.append(_class_symbol(node, class_id, module, file_id, file_is_test, lines))
            for child in node.body:
                if isinstance(child, FUNCTION_NODES):
                    symbol = _function_symbol(
                        child,
                        module=module,
                        file_id=file_id,
                        file_is_test=file_is_test,
                        lines=lines,
                        class_id=class_id,
                        kind="method",
                    )
                    symbols.append(symbol)
                    callable_nodes[symbol.id] = child
        elif isinstance(node, FUNCTION_NODES):
            symbol = _function_symbol(
                node,
                module=module,
                file_id=file_id,
                file_is_test=file_is_test,
                lines=lines,
                class_id=None,
                kind="function",
            )
            symbols.append(symbol)
            callable_nodes[symbol.id] = node

    return symbols, callable_nodes


def _class_symbol(
    node: ast.ClassDef,
    class_id: str,
    module: str,
    file_id: str,
    file_is_test: bool,
    lines: list[str],
) -> SymbolInfo:
    start, end = line_range(node)
    doc = summarize_docstring(node)
    warnings = [] if doc != "No docstring" else ["no_docstring"]
    return SymbolInfo(
        id=class_id,
        name=node.name,
        qualified_name=class_id,
        kind="class",
        file_id=file_id,
        module=module,
        class_id=None,
        line_start=start,
        line_end=end,
        loc=end - start + 1,
        is_async=False,
        is_private=is_private_name(node.name),
        is_test=is_test_symbol(node.name, file_is_test),
        is_entrypoint=False,
        decorators=[decorator_name(item) for item in node.decorator_list],
        docstring_summary=doc,
        source_excerpt=source_excerpt(lines, node),
        metrics=_empty_metrics(),
        warnings=warnings,
    )


def _function_symbol(
    node: ast.FunctionDef | ast.AsyncFunctionDef,
    module: str,
    file_id: str,
    file_is_test: bool,
    lines: list[str],
    class_id: str | None,
    kind: str,
) -> SymbolInfo:
    start, end = line_range(node)
    qualified_name = f"{class_id}.{node.name}" if class_id else f"{module}.{node.name}"
    doc = summarize_docstring(node)
    warnings = []
    if doc == "No docstring":
        warnings.append("no_docstring")
    if is_entrypoint_name(node.name):
        warnings.append("entrypoint")
    if is_test_symbol(node.name, file_is_test):
        warnings.append("test")
    if end - start + 1 > 50:
        warnings.append("large_loc")

    structure_hash, structure_size = structure_signature(node)
    return SymbolInfo(
        id=qualified_name,
        name=node.name,
        qualified_name=qualified_name,
        kind=kind,
        file_id=file_id,
        module=module,
        class_id=class_id,
        line_start=start,
        line_end=end,
        loc=end - start + 1,
        is_async=isinstance(node, ast.AsyncFunctionDef),
        is_private=is_private_name(node.name),
        is_test=is_test_symbol(node.name, file_is_test),
        is_entrypoint=is_entrypoint_name(node.name),
        decorators=[decorator_name(item) for item in node.decorator_list],
        parameters=_function_parameters(node),
        return_annotation=decorator_name(node.returns) if node.returns else None,
        docstring_summary=doc,
        source_excerpt=source_excerpt(lines, node),
        structure_hash=structure_hash,
        structure_size=structure_size,
        is_wrapper=is_wrapper_body(node),
        metrics={**_empty_metrics(), **function_complexity(node)},
        warnings=warnings,
    )


def _function_parameters(node: ast.FunctionDef | ast.AsyncFunctionDef) -> list[dict[str, str | None]]:
    parameters = []
    positional = node.args.posonlyargs + node.args.args
    defaults = [None] * (len(positional) - len(node.args.defaults)) + list(node.args.defaults)
    for index, parameter in enumerate(positional):
        kind = "positional-only" if index < len(node.args.posonlyargs) else "positional"
        _add_parameter(parameters, parameter, kind, defaults[index])
    if node.args.vararg:
        _add_parameter(parameters, node.args.vararg, "variadic")
    for parameter, default in zip(node.args.kwonlyargs, node.args.kw_defaults):
        _add_parameter(parameters, parameter, "keyword-only", default)
    if node.args.kwarg:
        _add_parameter(parameters, node.args.kwarg, "keyword-variadic")
    return parameters


def _add_parameter(
    parameters: list[dict[str, str | None]],
    parameter: ast.arg,
    kind: str,
    default: ast.expr | None = None,
) -> None:
    if parameter.arg in {"self", "cls"}:
        return
    parameters.append(
        {
            "name": parameter.arg,
            "kind": kind,
            "annotation": decorator_name(parameter.annotation) if parameter.annotation else None,
            "default": decorator_name(default) if default else None,
        }
    )


def _empty_metrics() -> dict[str, int]:
    return {
        "cyclomatic_complexity": 0,
        "cognitive_complexity": 0,
        "max_nesting_depth": 0,
        "same_file_incoming": 0,
        "same_file_outgoing": 0,
        "cross_file_outgoing": 0,
        "external_outgoing": 0,
        "unresolved_outgoing": 0,
    }
