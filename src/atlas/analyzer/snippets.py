from __future__ import annotations

import ast


def source_excerpt(lines: list[str], node: ast.AST) -> str:
    """Return source text for an AST node using its line range."""
    start = getattr(node, "lineno", 1)
    end = getattr(node, "end_lineno", start)
    return "\n".join(lines[start - 1:end])


def line_range(node: ast.AST) -> tuple[int, int]:
    start = getattr(node, "lineno", 1)
    end = getattr(node, "end_lineno", start)
    return start, end
