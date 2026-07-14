from __future__ import annotations

import ast
import tokenize
from dataclasses import dataclass, field
from pathlib import Path

from atlas.analyzer.discovery import is_test_file, module_from_path, resolve_analysis_root
from atlas.analyzer.imports import extract_imports
from atlas.analyzer.models import FileInfo, ImportInfo, SymbolInfo, WarningInfo
from atlas.analyzer.objects import extract_objects
from atlas.analyzer.symbols import extract_symbols


@dataclass
class ParsedFile:
    file: FileInfo
    source: str
    lines: list[str]
    tree: ast.Module
    symbols: list[SymbolInfo] = field(default_factory=list)
    objects: list[dict[str, object]] = field(default_factory=list)
    imports: list[ImportInfo] = field(default_factory=list)
    callable_nodes: dict[str, ast.AST] = field(default_factory=dict)
    warnings: list[WarningInfo] = field(default_factory=list)


def parse_python_file(root: str | Path, rel_path: Path) -> ParsedFile:
    root_path = resolve_analysis_root(root)
    rel_path = Path(rel_path)
    file_path = _source_path(root_path, rel_path)
    file_id = rel_path.as_posix()
    module = module_from_path(root_path, rel_path)
    test_file = is_test_file(rel_path)

    try:
        with tokenize.open(file_path) as source_file:
            source = source_file.read()
    except (OSError, SyntaxError, UnicodeError) as error:
        return _read_error(file_id, module, test_file, error)

    lines = source.splitlines()
    file_info = FileInfo(
        id=file_id,
        path=file_id,
        module=module,
        is_test=test_file,
        loc=len(lines),
    )

    try:
        tree = ast.parse(source, filename=file_id)
    except SyntaxError as error:
        warning = WarningInfo(
            id=f"{file_id}:parse_error:{error.lineno or 0}",
            type="parse_error",
            message=f"Could not parse {file_id}: {error.msg}",
            severity="error",
            file_id=file_id,
        )
        return ParsedFile(
            file=file_info,
            source=source,
            lines=lines,
            tree=ast.Module(body=[], type_ignores=[]),
            warnings=[warning],
        )

    imports = extract_imports(tree, file_id, module)
    symbols, callable_nodes = extract_symbols(tree, module, file_id, test_file, lines)
    objects = extract_objects(tree, module, file_id, lines, symbols)
    file_info.function_count = sum(1 for symbol in symbols if symbol.kind in {"function", "method"})
    file_info.class_count = sum(1 for symbol in symbols if symbol.kind == "class")
    return ParsedFile(
        file=file_info,
        source=source,
        lines=lines,
        tree=tree,
        symbols=symbols,
        objects=objects,
        imports=imports,
        callable_nodes=callable_nodes,
    )


def _source_path(root: Path, relative: Path) -> Path:
    if relative.is_absolute() or ".." in relative.parts:
        raise ValueError(f"Python source path is outside the analysis directory: {relative}")

    path = root
    for part in relative.parts:
        path /= part
        if path.is_symlink():
            raise ValueError(f"Refusing to read symlinked Python source: {relative}")

    try:
        resolved = path.resolve(strict=True)
        resolved.relative_to(root)
    except ValueError as error:
        raise ValueError(
            f"Python source path is outside the analysis directory: {relative}"
        ) from error
    if not resolved.is_file():
        raise ValueError(f"Python source path is not a file: {relative}")
    return resolved


def _read_error(
    file_id: str,
    module: str,
    test_file: bool,
    error: OSError | SyntaxError | UnicodeError,
) -> ParsedFile:
    message = error.msg if isinstance(error, SyntaxError) else str(error)
    line = (error.lineno or 0) if isinstance(error, SyntaxError) else 0
    warning = WarningInfo(
        id=f"{file_id}:parse_error:{line}",
        type="parse_error",
        message=f"Could not read {file_id}: {message}",
        severity="error",
        file_id=file_id,
    )
    return ParsedFile(
        file=FileInfo(
            id=file_id,
            path=file_id,
            module=module,
            is_test=test_file,
            loc=0,
            warning_count=1,
        ),
        source="",
        lines=[],
        tree=ast.Module(body=[], type_ignores=[]),
        warnings=[warning],
    )
