"""The signal grid: module columns by call-depth rows, in integer grid units.

Python decides every position so the explorer only converts grid units to
pixels and never derives a graph property of its own.
"""

from __future__ import annotations

from collections import Counter, defaultdict
from fractions import Fraction

_ON_STACK = 1
_DONE = 2


def class_boxes(objects, nodes, test_modules):
    """Group each class's analysed methods into one box.

    ``rows`` is the constructor then the public methods in source order, dead
    or alive, so the class keeps its whole interface in one place. ``private``
    holds only live private methods; a dead private method stays a free card
    so it can fall into the dead band. A class with neither analysed methods
    nor fields gets no box.
    """
    by_id = {node["id"]: node for node in nodes}
    boxes = {}
    for item in objects:
        if item["module"] in test_modules:
            continue
        constructor = item["constructor"]["method_id"]
        interface = ([constructor] if constructor else []) + item["methods"]["public"]
        rows = [method for method in dict.fromkeys(interface) if method in by_id]
        private = [
            method for method in dict.fromkeys(item["methods"]["private"]) if method in by_id
        ]
        if not rows and not private and not item["fields"]:
            continue
        boxes[item["id"]] = {
            "module": item["module"],
            "line_start": item["line_start"],
            "rows": rows,
            "private": [method for method in private if not by_id[method]["dead"]],
            "analysed": bool(rows or private),
        }
    return boxes


def box_members(boxes):
    return {
        method: class_id
        for class_id, box in boxes.items()
        for method in box["rows"] + box["private"]
    }


def rank_live(nodes, out_edges, roots):
    """Rank live nodes by longest path from a root, after breaking cycles.

    Depth-first search starts from the roots in sorted order, then from any
    remaining live node, visiting callees in sorted order. An edge to a node
    on the search stack closes a cycle and is a back edge. Edges into roots
    are back edges too, so row 0 holds exactly the roots. Back edges are
    ignored for ranking only. Returns ``(rank, back_edges)``; dead nodes have
    no rank and their edges are never back edges.
    """
    live = sorted(node["id"] for node in nodes if not node["dead"])
    live_ids = set(live)
    callees = {
        node: sorted(target for target in out_edges.get(node, ()) if target in live_ids)
        for node in live
    }
    state: dict[str, int] = {}
    back_edges: set[tuple[str, str]] = set()
    finished: list[str] = []
    for start in sorted(roots) + live:
        if start in state:
            continue
        state[start] = _ON_STACK
        stack = [(start, iter(callees[start]))]
        while stack:
            node, pending = stack[-1]
            target = next(pending, None)
            if target is None:
                state[node] = _DONE
                finished.append(node)
                stack.pop()
            elif target in roots or state.get(target) == _ON_STACK:
                back_edges.add((node, target))
            elif target not in state:
                state[target] = _ON_STACK
                stack.append((target, iter(callees[target])))

    # Reverse finishing order is a topological order once back edges are gone.
    rank = dict.fromkeys(live, 0)
    for node in reversed(finished):
        for target in callees[node]:
            if (node, target) not in back_edges:
                rank[target] = max(rank[target], rank[node] + 1)
    return rank, back_edges


def edge_kind(source, target, module_of, box_of, boxes):
    """Classify a call by how it attaches to the grid.

    ``intra_class`` stays inside one box, a class building itself included;
    ``into_class`` enters a box at a method row; ``constructs`` enters a box
    at its header, because the target is the class itself (it has no analysed
    ``__init__``); the rest join cards in one module or across modules. A
    target is a class id exactly when it is a key of ``boxes``.
    """
    target_box = target if target in boxes else box_of.get(target)
    if target_box is not None and box_of.get(source) == target_box:
        return "intra_class"
    if target in boxes:
        return "constructs"
    if target_box is not None:
        return "into_class"
    return "same_module" if module_of[source] == module_of[target] else "cross_module"


def build_layout(
    nodes, edges, rank, tree, boxes, layer_by_module, clones, import_pairs, circular_imports
):
    """Place every call-map item on the grid and carry the links the renderer draws.

    ``imports`` keeps every module pair, drawable or not; modules at either
    end of a pair that have no column (a package ``__init__`` that only
    re-exports, a test module) are listed in ``import_targets_without_column``
    so the renderer knows which pairs it cannot draw.
    """
    columns = _columns(tree, layer_by_module)
    column_of = {column["module"]: index for index, column in enumerate(columns)}
    rows = max(rank.values(), default=0) + 1
    dead_row = rows
    box_of = box_members(boxes)

    items = {}
    for node in nodes:
        if node["id"] not in box_of:
            row = dead_row if node["dead"] else rank[node["id"]]
            items[node["id"]] = (column_of[node["module"]], row, node["line_start"])
    for class_id, box in boxes.items():
        row = _box_row(box, rank, dead_row)
        items[class_id] = (column_of[box["module"]], row, box["line_start"])

    cells: dict[tuple[int, int], list[str]] = defaultdict(list)
    for item_id in sorted(items, key=lambda item_id: (items[item_id][2], item_id)):
        column, row, _ = items[item_id]
        cells[(column, row)].append(item_id)
    for index, column in enumerate(columns):
        column["width"] = max(
            len(members) for (owner, _), members in cells.items() if owner == index
        )

    _order_cells(cells, items, _neighbours(edges, box_of), columns, dead_row)
    slot = {
        item_id: index for members in cells.values() for index, item_id in enumerate(members)
    }

    def place(item_id):
        column, row, _ = items[item_id]
        return {"column": column, "row": row, "slot": slot[item_id]}

    module_of = {node["id"]: node["module"] for node in nodes} | {
        class_id: box["module"] for class_id, box in boxes.items()
    }
    return {
        "columns": columns,
        "rows": rows,
        "dead_row": dead_row,
        "nodes": {item_id: place(item_id) for item_id in sorted(items) if item_id not in boxes},
        "classes": {
            class_id: {
                **place(class_id),
                "rows": boxes[class_id]["rows"],
                "private": boxes[class_id]["private"],
            }
            for class_id in sorted(boxes)
        },
        "clone_links": [list(pair) for pair in _consecutive(group["members"] for group in clones)],
        "imports": import_pairs,
        "import_targets_without_column": sorted(
            {module for pair in import_pairs for module in pair} - set(column_of)
        ),
        "import_cycles": [list(pair) for pair in sorted(set(_consecutive(circular_imports)))],
        "bundles": _bundles(edges, module_of),
    }


def _columns(tree, layer_by_module):
    """One column per tree module, depth-first in the tree's own child order."""
    columns = []

    def visit(item, package):
        if item["type"] == "package":
            package = item["path"]
        if item["module"]:
            columns.append(
                {
                    "module": item["module"],
                    "scope": item["path"],
                    "package": package,
                    "layer": layer_by_module[item["module"]],
                }
            )
        for child in item["children"]:
            visit(child, package)

    visit(tree, tree["path"])
    return columns


def _box_row(box, rank, dead_row):
    """Row of the shallowest live interface method, else of a live private one.

    A box whose analysed methods are all dead belongs in the dead band; a
    data-only box has no call depth and sits on the entry row. Edges that
    construct a class without an analysed ``__init__`` end at the box header
    and do not rank it.
    """
    live_rows = [rank[method] for method in box["rows"] if method in rank]
    if live_rows:
        return min(live_rows)
    if box["private"]:
        return min(rank[method] for method in box["private"])
    return dead_row if box["analysed"] else 0


def _neighbours(edges, box_of):
    """Undirected adjacency between grid items; a box stands for all its methods."""
    neighbours: dict[str, set[str]] = defaultdict(set)
    for edge in edges:
        source = box_of.get(edge["source"], edge["source"])
        target = box_of.get(edge["target"], edge["target"])
        if source != target:
            neighbours[source].add(target)
            neighbours[target].add(source)
    return neighbours


def _order_cells(cells, items, neighbours, columns, dead_row):
    """Order each cell by the barycenter of its neighbours in other rows.

    An item's x is its column's offset (the widths of the columns to its left)
    plus its slot, so positions are comparable across columns. One sweep down,
    then one up; positions update after every cell. Barycenters are exact
    fractions, so ties fall to line number and id rather than float noise.
    """
    offsets, total = [], 0
    for column in columns:
        offsets.append(total)
        total += column["width"]
    x = {}

    def place(key):
        for index, item_id in enumerate(cells[key]):
            x[item_id] = offsets[key[0]] + index

    def barycenter(item_id, row):
        xs = [x[other] for other in neighbours.get(item_id, ()) if items[other][1] != row]
        return Fraction(sum(xs), len(xs)) if xs else Fraction(x[item_id])

    for key in cells:
        place(key)
    for sweep in (range(1, dead_row + 1), range(dead_row - 1, -1, -1)):
        for row in sweep:
            for column in range(len(columns)):
                key = (column, row)
                if key not in cells:
                    continue
                cells[key].sort(
                    key=lambda item_id: (barycenter(item_id, row), items[item_id][2], item_id)
                )
                place(key)


def _consecutive(chains):
    """Adjacent pairs along each chain: clone-group members, or an import cycle."""
    return [pair for chain in chains for pair in zip(chain, chain[1:])]


def _bundles(edges, module_of):
    counts = Counter(
        (module_of[edge["source"]], module_of[edge["target"]])
        for edge in edges
        if module_of[edge["source"]] != module_of[edge["target"]]
    )
    return [
        {"source_module": source, "target_module": target, "count": count}
        for (source, target), count in sorted(counts.items())
    ]
