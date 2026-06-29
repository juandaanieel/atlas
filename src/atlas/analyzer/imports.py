from __future__ import annotations

import ast
from collections import defaultdict

from atlas.analyzer.models import ImportInfo


def extract_imports(tree: ast.AST, file_id: str, module: str) -> list[ImportInfo]:
    imports: list[ImportInfo] = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                imports.append(
                    ImportInfo(
                        file_id=file_id,
                        module=module,
                        name=alias.name,
                        alias=alias.asname,
                        imported_module=alias.name,
                        level=0,
                        kind="import",
                        line=node.lineno,
                    )
                )
        elif isinstance(node, ast.ImportFrom):
            imported_module = node.module or ""
            for alias in node.names:
                imports.append(
                    ImportInfo(
                        file_id=file_id,
                        module=module,
                        name=alias.name,
                        alias=alias.asname,
                        imported_module=imported_module,
                        level=node.level,
                        kind="from",
                        line=node.lineno,
                    )
                )
    return sorted(imports, key=lambda item: (item.file_id, item.line, item.name))


def resolve_from_base(current_module: str, imported_module: str, level: int) -> str:
    if level == 0:
        return imported_module

    parts = current_module.split(".")
    base_parts = parts[: max(0, len(parts) - level)]
    if imported_module:
        base_parts.extend(imported_module.split("."))
    return ".".join(part for part in base_parts if part)


def imported_module_for_graph(info: ImportInfo, local_modules: set[str]) -> str | None:
    if info.kind == "import":
        name = info.imported_module
        candidates = [name]
        pieces = name.split(".")
        candidates.extend(".".join(pieces[:idx]) for idx in range(len(pieces) - 1, 0, -1))
        return next((candidate for candidate in candidates if candidate in local_modules), None)

    base = resolve_from_base(info.module, info.imported_module, info.level)
    full_name = f"{base}.{info.name}" if base and info.name != "*" else base
    if full_name in local_modules:
        return full_name
    if base in local_modules:
        return base
    return None


def build_import_aliases(
    current_module: str,
    imports: list[ImportInfo],
    local_modules: set[str],
    symbol_ids: set[str],
) -> dict[str, dict[str, str | bool | None]]:
    aliases: dict[str, dict[str, str | bool | None]] = {}
    for info in imports:
        if info.kind == "import":
            visible_name = info.alias or info.imported_module.split(".")[0]
            module_name = info.imported_module
            local_module = imported_module_for_graph(info, local_modules)
            aliases[visible_name] = {
                "module": local_module or module_name,
                "symbol": None,
                "external": local_module is None,
            }
            continue

        visible_name = info.alias or info.name
        base = resolve_from_base(current_module, info.imported_module, info.level)
        full_name = f"{base}.{info.name}" if base and info.name != "*" else base
        local_module = full_name if full_name in local_modules else base if base in local_modules else None
        local_symbol = full_name if full_name in symbol_ids else None
        aliases[visible_name] = {
            "module": local_module or base,
            "symbol": local_symbol,
            "external": local_module is None and local_symbol is None,
        }
    return aliases


def find_circular_imports(imports: list[ImportInfo], local_modules: set[str]) -> list[list[str]]:
    graph: dict[str, set[str]] = defaultdict(set)
    for info in imports:
        target = imported_module_for_graph(info, local_modules)
        if target and target != info.module:
            graph[info.module].add(target)

    cycles: set[tuple[str, ...]] = set()

    def visit(node: str, path: list[str]) -> None:
        if node in path:
            cycle = path[path.index(node):] + [node]
            body = cycle[:-1]
            rotations = [tuple(body[idx:] + body[:idx]) for idx in range(len(body))]
            canonical = min(rotations)
            cycles.add(canonical + (canonical[0],))
            return
        if len(path) > len(local_modules):
            return
        for target in sorted(graph.get(node, set())):
            visit(target, path + [node])

    for module in sorted(local_modules):
        visit(module, [])

    return [list(cycle) for cycle in sorted(cycles)]
