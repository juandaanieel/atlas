"""Source excerpts with AST-derived call-name positions for the inspector."""
from __future__ import annotations

import ast
from collections import defaultdict

from atlas.analyzer.ast_names import dotted_name


def call_positions(text: str, start: int) -> dict:
    """Index call names by their original call line; columns use browser UTF-16 units.

    A method excerpt keeps its indentation. Enclosing it in a block lets Python
    parse it without rewriting multiline strings or changing source columns.
    """
    lines = text.split("\n")
    nested = lines[0] != lines[0].lstrip()
    tree = ast.parse(("if True:\n" if nested else "") + text)
    positions = defaultdict(list)
    for node in ast.walk(tree):
        if not isinstance(node, ast.Call):
            continue
        name = dotted_name(node.func)
        if name is None:
            continue
        func = node.func
        # Subscripts and chained calls name the original callable, as the analyzer does.
        while isinstance(func, (ast.Call, ast.Subscript)):
            func = func.func if isinstance(func, ast.Call) else func.value
        row = func.end_lineno - 1 - int(nested)
        prefix = lines[row].encode("utf-8")[:func.end_col_offset].decode("utf-8")
        label = func.attr if isinstance(func, ast.Attribute) else func.id
        end = len(prefix.encode("utf-16-le")) // 2
        begin = end - len(label.encode("utf-16-le")) // 2
        key = (start + node.lineno - 1 - int(nested), name)
        positions[key].append((start + row, begin, end))
    for values in positions.values():
        values.sort()
    return positions


def source_documentation(text: str) -> dict:
    """Read the declared interface and full docstring without executing source.

    ## Parameters
    - `text`: a complete function, method, or class source excerpt. Method
      indentation is preserved, including whitespace inside multiline strings.

    ## Returns
    A dictionary containing `signature` and `docstring`. Signatures retain
    declared annotations and defaults; classes include an explicit `__init__`
    when present. Missing docstrings are returned as an empty string.

    ## Example
    ```python
    source = "def square(x: int) -> int: return x * x"
    details = source_documentation(source)
    print(details["signature"])
    # def square(x: int) -> int
    ```

    Types and runtime-generated constructors are not inferred.
    """
    nested = text[0].isspace()
    tree = ast.parse(("if True:\n" if nested else "") + text)
    node = tree.body[0].body[0] if nested else tree.body[0]
    declarations = [node]
    if isinstance(node, ast.ClassDef):
        declarations.extend(child for child in node.body
                            if isinstance(child, (ast.FunctionDef, ast.AsyncFunctionDef))
                            and child.name == "__init__")
    signatures = []
    for declaration in declarations:
        if isinstance(declaration, ast.ClassDef):
            bases = [ast.unparse(base) for base in declaration.bases]
            bases.extend(ast.unparse(keyword) for keyword in declaration.keywords)
            signature = f"class {declaration.name}" + (f"({', '.join(bases)})" if bases else "")
        else:
            prefix = "async def" if isinstance(declaration, ast.AsyncFunctionDef) else "def"
            signature = f"{prefix} {declaration.name}({ast.unparse(declaration.args)})"
            if declaration.returns is not None:
                signature += f" -> {ast.unparse(declaration.returns)}"
        signatures.append(signature)
    return {"signature": "\n".join(signatures), "docstring": ast.get_docstring(node, clean=True) or ""}


def build_source(snapshot, view):
    nodes = {n["id"] for n in view["nodes"]}
    classes = {c["id"] for c in view["classes"]}
    edge_of = {}
    for k, e in enumerate(view["edges"]):
        edge_of.setdefault((e["s"], e["t"]), k)
    symbols = {x["id"]: x for x in snapshot["symbols"]}
    calls_by_source = defaultdict(list)
    for c in snapshot["calls"]:
        calls_by_source[c["source"]].append(c)
    out = {}
    for sid in sorted(nodes | classes):
        x = symbols.get(sid)
        if not x or not x.get("source_excerpt"):
            continue
        start, end = x["line_start"], x["line_end"]
        if sid in classes:
            owners = [k for k in calls_by_source if k == sid or k.startswith(sid + ".")]
        else:
            owners = [sid]
        records = sorted((c for o in owners for c in calls_by_source[o] if start <= c["line"] <= end),
                         key=lambda c: (c["line"], c["source"], c["called_name"], c["target"] or ""))
        positions = call_positions(x["source_excerpt"], start)
        used, sites = defaultdict(int), []
        for c in records:
            key = (c["line"], c["called_name"])
            pos = positions[key][used[key]]
            used[key] += 1
            if c["kind"] in ("external", "unresolved"):
                kind, k = c["kind"], None
            elif c["target"] == c["source"]:
                kind, k = "recursive", None
            elif (c["source"], c["target"]) in edge_of:
                kind, k = "edge", edge_of[(c["source"], c["target"])]
            else:
                kind, k = "undrawn", None
            # [line, first column, end column (or -1, -1), kind, edge index (or -1), called name]
            sites.append([*pos, kind, -1 if k is None else k, c["called_name"]])
        out[sid] = {"file": x["file_id"], "start": start, "end": end, "text": x["source_excerpt"], "sites": sites,
                    **source_documentation(x["source_excerpt"])}
    return {"symbols": out}
