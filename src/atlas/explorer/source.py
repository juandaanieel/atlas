"""Source excerpts with AST-derived call-name positions for the inspector."""
from __future__ import annotations

import ast
from collections import defaultdict

from atlas.analyzer.calls import dotted_name


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


SOURCE_RULE = [
    "a call site is linked when its call record resolves to a drawn call (one of view.edges); it is underlined and hovering it lights that call and its callee",
    "external and unresolved call records are shown with a muted marker and no underline; recursive calls and calls to undrawn functions likewise",
    "a class excerpt carries the call sites of all its methods",
]


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
    out, counts = {}, defaultdict(int)
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
            if sid in nodes:
                counts[kind] += 1
            # [line, first column, end column (or -1, -1), kind, edge index (or -1), called name]
            sites.append([*pos, kind, -1 if k is None else k, c["called_name"]])
        out[sid] = {"file": x["file_id"], "start": start, "end": end, "text": x["source_excerpt"], "sites": sites}
    return {"rule": SOURCE_RULE, "symbols": out, "counts": dict(sorted(counts.items()))}
