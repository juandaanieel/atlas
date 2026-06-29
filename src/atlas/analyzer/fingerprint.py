from __future__ import annotations

import ast
import hashlib

# AST node types that carry no structural meaning for clone comparison.
_IGNORED_NODES = {"Load", "Store", "Del", "AugLoad", "AugStore", "Param"}


def structure_signature(node: ast.AST) -> tuple[str, int]:
    """Return a name-independent structural fingerprint for a callable body.

    Two functions that share control flow and expression shape produce the same
    hash even when identifiers, constants, and docstrings differ. This is what
    lets Atlas flag regenerated near-duplicate code, the signature smell of
    machine-authored implementations. The returned size is the number of
    structural nodes, used to suppress trivial collisions (one-line getters).
    """
    skeleton: list[str] = []
    for child in ast.walk(node):
        name = type(child).__name__
        if name in _IGNORED_NODES:
            continue
        skeleton.append(name)
    digest = hashlib.sha1("\n".join(skeleton).encode("utf-8")).hexdigest()[:16]
    return digest, len(skeleton)


def is_wrapper_body(node: ast.AST) -> bool:
    """True when the callable body is a single pass-through to one call.

    Chains of these are the over-abstraction smell: layers of indirection that
    forward an argument and return, adding names without adding behavior.
    """
    body = [
        statement
        for statement in getattr(node, "body", [])
        if not _is_docstring(statement)
    ]
    if len(body) != 1:
        return False
    statement = body[0]
    if isinstance(statement, ast.Return):
        return _is_call_expr(statement.value)
    if isinstance(statement, ast.Expr):
        return _is_call_expr(statement.value)
    return False


def _is_docstring(statement: ast.AST) -> bool:
    return (
        isinstance(statement, ast.Expr)
        and isinstance(statement.value, ast.Constant)
        and isinstance(statement.value.value, str)
    )


def _is_call_expr(value: ast.AST | None) -> bool:
    if isinstance(value, ast.Await):
        value = value.value
    return isinstance(value, ast.Call)
