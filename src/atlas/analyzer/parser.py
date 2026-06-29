from __future__ import annotations

import ast
from dataclasses import dataclass, field
from pathlib import Path

from atlas.analyzer.discovery import is_test_file, module_from_path
from atlas.analyzer.imports import extract_imports
from atlas.analyzer.models import FileInfo, ImportInfo, SymbolInfo, WarningInfo
from atlas.analyzer.symbols import extract_symbols


@dataclass
class ParsedFile:
    file: FileInfo
    source: str
    lines: list[str]
    tree: ast.Module
    symbols: list[SymbolInfo] = field(default_factory=list)
    imports: list[ImportInfo] = field(default_factory=list)
    callable_nodes: dict[str, ast.AST] = field(default_factory=dict)
    warnings: list[WarningInfo] = field(default_factory=list)


def parse_python_file(root: str | Path, rel_path: Path) -> ParsedFile:
    root_path = Path(root).resolve()
    file_path = root_path / rel_path
    file_id = rel_path.as_posix()
    source = file_path.read_text(encoding="utf-8")
    lines = source.splitlines()
    module = module_from_path(root_path, rel_path)
    test_file = is_test_file(rel_path)
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
    file_info.function_count = sum(1 for symbol in symbols if symbol.kind in {"function", "method"})
    file_info.class_count = sum(1 for symbol in symbols if symbol.kind == "class")
    return ParsedFile(
        file=file_info,
        source=source,
        lines=lines,
        tree=tree,
        symbols=symbols,
        imports=imports,
        callable_nodes=callable_nodes,
    )
