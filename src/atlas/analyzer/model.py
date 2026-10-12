from __future__ import annotations

from collections import defaultdict, deque

from atlas.analyzer.imports import resolve_from_base
from atlas.analyzer.layout import box_members, build_layout, class_boxes, edge_kind, rank_live

# A clone group is only reported when each member has at least this many
# structural nodes, so trivial one-liners do not register as duplicates.
MIN_CLONE_SIZE = 14

# A hub is depended on by at least this many distinct callers; an orchestrator
# drives at least this many distinct callees. Both are "crucial" but for
# opposite reasons: change a hub and a lot breaks; read an orchestrator and you
# learn how a workflow is wired.
HUB_FAN_IN = 3
ORCHESTRATOR_FAN_OUT = 4

# Conceptual layers, ordered from entry surface (top) down to foundation.
# A dependency that points from a lower index to a higher index flows "down"
# the stack and is healthy; the reverse is a layering violation.
LAYER_ORDER = [
    "entry",
    "config",
    "model",
    "analysis",
    "compute",
    "render",
    "report",
    "support",
]

_LAYER_TOKENS = [
    ("entry", ("cli", "__main__", "main", "api", "command", "app", "server")),
    ("config", ("config", "settings", "schema", "options")),
    ("model", ("model", "entity", "domain", "types", "dataclass", "schema")),
    ("analysis", ("parse", "parser", "analy", "ast", "discover", "extract", "reader", "read")),
    ("compute", ("solve", "solver", "compute", "engine", "core", "pipeline", "build", "calc")),
    ("render", ("render", "visual", "plot", "diagram", "explorer", "view", "draw", "layout")),
    ("report", ("report", "summary", "format", "export", "write", "dump", "serialize")),
]


def build_model(files, symbols, calls, imports, package_name, objects, circular_imports, exports, references):
    """Assemble the comprehension model from raw analysis facts.

    This is the only place graph semantics are decided. Diagrams, the report,
    and the explorer all render this structure rather than recomputing it, so
    there is a single source of truth and no chance of the views disagreeing.
    ``exports`` maps each exported symbol to the packages exporting it
    (``package_exports``); it is a parallel fact and decides no root,
    reachability or dead code.
    """
    callables = [
        symbol
        for symbol in symbols
        if symbol["kind"] in {"function", "method"} and not symbol["is_test"]
    ]
    callable_ids = {symbol["id"] for symbol in callables}
    by_id = {symbol["id"]: symbol for symbol in callables}

    out_edges, in_edges, unresolved_out = _call_edges(calls, callable_ids)
    roots = _roots(callables, in_edges)
    # A callable value can escape into a callback, alias, or nested closure.
    # Keep this usage graph separate from measured calls and their fan-in/out.
    usage_edges = {sid: set(targets) for sid, targets in out_edges.items()}
    test_files = {f["id"] for f in files if f["is_test"]}
    for reference in references:
        source, target = reference["source"], reference["target"]
        if reference["file_id"] in test_files or target not in callable_ids:
            continue
        if source is None:
            roots.add(target)
        elif source in callable_ids:
            usage_edges.setdefault(source, set()).add(target)
    reachable = _reachable_from(roots, usage_edges)

    nodes = _classify_nodes(
        callables, roots, reachable, in_edges, out_edges, unresolved_out, exports
    )

    clones = _clone_groups(callables)
    layer_edges, violations = _layer_relations(files, imports, calls, by_id)

    test_modules = {file["module"] for file in files if file["is_test"]}
    boxes = class_boxes(objects, nodes, test_modules)
    class_modules = {box["module"] for box in boxes.values()}
    tree = build_tree(nodes, package_name, clones, class_modules)
    rank, back_edges = rank_live(nodes, out_edges, roots)
    module_of = {node["id"]: node["module"] for node in nodes}
    constructed = _construction_edges(calls, callable_ids, boxes)
    edges = _edge_records(out_edges, constructed, reachable, back_edges, module_of, boxes)
    # The modules build_tree admits, which are exactly the layout columns.
    column_modules = set(module_of.values()) | class_modules
    layout = build_layout(
        nodes,
        edges,
        rank,
        tree,
        boxes,
        {file["module"]: infer_layer(file) for file in files},
        clones,
        _import_pairs(files, symbols, imports, column_modules, circular_imports),
        circular_imports,
    )

    return {
        "package_name": package_name,
        "nodes": nodes,
        "edges": edges,
        "roots": sorted(roots),
        "clones": clones,
        "tree": tree,
        "wrappers": sorted(node["id"] for node in nodes if by_id[node["id"]]["is_wrapper"]),
        "layers": _layer_summary(files, layer_edges),
        "layer_violations": violations,
        "summary": _summary(nodes, clones, violations),
        "layout": layout,
    }


def _call_edges(calls, callable_ids):
    out_edges: dict[str, set[str]] = defaultdict(set)
    in_edges: dict[str, set[str]] = defaultdict(set)
    unresolved_out: dict[str, int] = defaultdict(int)
    for call in calls:
        source = call["source"]
        if source not in callable_ids:
            continue
        if call["kind"] == "unresolved":
            unresolved_out[source] += 1
            continue
        target = call["target"]
        if call["kind"] in {"same_file", "cross_file"} and target in callable_ids and target != source:
            out_edges[source].add(target)
            in_edges[target].add(source)
    return out_edges, in_edges, unresolved_out


def _roots(callables, in_edges):
    """Workflow starting points: the public surface nobody internally calls.

    Name-based entrypoints (main/run/cli/app) always count. Beyond those, any
    public callable with no resolved caller is an API entry. Private helpers
    are never roots, so an uncalled private helper falls out as dead code.
    A constructor's callers inside its own class do not count: a class that
    only builds instances of itself is still entered from outside, so a
    recursive structure such as ``__init__ -> _grow -> Cls(...)`` stays live.
    """
    class_of = {symbol["id"]: symbol["class_id"] for symbol in callables}
    roots: set[str] = set()
    for symbol in callables:
        if symbol["is_private"]:
            continue
        callers = in_edges.get(symbol["id"], set())
        if symbol["kind"] == "method" and symbol["name"] == "__init__":
            callers = {caller for caller in callers if class_of[caller] != symbol["class_id"]}
        if symbol["is_entrypoint"] or not callers:
            roots.add(symbol["id"])
    return roots


def _reachable_from(roots, out_edges):
    reachable = set(roots)
    queue = deque(roots)
    while queue:
        node = queue.popleft()
        for target in out_edges.get(node, ()):  # noqa: SIM118 - set is fine
            if target not in reachable:
                reachable.add(target)
                queue.append(target)
    return reachable


def _classify_nodes(callables, roots, reachable, in_edges, out_edges, unresolved_out, exports):
    nodes = []
    for symbol in callables:
        sid = symbol["id"]
        is_reachable = sid in reachable
        fan_in = len(in_edges.get(sid, ()))
        fan_out = len(out_edges.get(sid, ()))
        is_hub = fan_in >= HUB_FAN_IN
        is_orchestrator = fan_out >= ORCHESTRATOR_FAN_OUT
        nodes.append(
            {
                "id": sid,
                "name": symbol["name"],
                "qualified_name": symbol["qualified_name"],
                "kind": symbol["kind"],
                "is_private": symbol["is_private"],
                "exported": sid in exports,
                "exported_from": exports.get(sid, []),
                "module": symbol["module"],
                "file_id": symbol["file_id"],
                "line_start": symbol["line_start"],
                "loc": symbol["loc"],
                "docstring_summary": symbol["docstring_summary"],
                "is_root": sid in roots,
                "is_wrapper": symbol["is_wrapper"],
                "fan_in": fan_in,
                "fan_out": fan_out,
                "unresolved_out": unresolved_out.get(sid, 0),
                "reachable": is_reachable,
                "dead": not is_reachable,
                "is_hub": is_hub,
                "is_orchestrator": is_orchestrator,
                "load_bearing": is_hub or is_orchestrator,
                "status": _status(sid, roots, is_reachable),
            }
        )
    return sorted(nodes, key=lambda node: node["id"])


def _status(sid, roots, is_reachable):
    if not is_reachable:
        return "dead"
    if sid in roots:
        return "root"
    return "live"


def _construction_edges(calls, callable_ids, boxes):
    """Calls that build a class whose constructor Atlas has not analysed.

    ``build_calls`` already aims ``Cls(...)`` at ``Cls.__init__`` when the
    class defines one, so that construction is an ordinary call edge
    (``into_class``, or ``intra_class`` from the class's own methods). A call
    that still targets a class runs generated or inherited construction code
    (a dataclass, a base class's ``__init__``). It becomes an edge to the class
    itself only when the class has a box to draw; otherwise it stays in
    ``calls`` alone. These edges count toward no fan-in, fan-out, root, rank,
    or reachability: a class is not a callable, so nothing lies behind it.
    """
    constructed: dict[str, set[str]] = defaultdict(set)
    for call in calls:
        if call["source"] in callable_ids and call["target"] in boxes:
            constructed[call["source"]].add(call["target"])
    return constructed


def _edge_records(out_edges, constructed, reachable, back_edges, module_of, boxes):
    """One record per call edge and per construction edge, sorted by ids.

    A construction edge is reachable when its caller is, and never a back
    edge, since a class box is neither a root nor on any call cycle.
    """
    box_of = box_members(boxes)
    targets: dict[str, set[str]] = defaultdict(set)
    for links in (out_edges, constructed):
        for source, callees in links.items():
            targets[source] |= callees
    records = []
    for source in sorted(targets):
        for target in sorted(targets[source]):
            records.append(
                {
                    "source": source,
                    "target": target,
                    "reachable": source in reachable and (target in reachable or target in boxes),
                    "kind": edge_kind(source, target, module_of, box_of, boxes),
                    "back": (source, target) in back_edges,
                }
            )
    return records


def build_tree(nodes, package_name, clones, class_modules=()):
    """A package/module trie with defect counts rolled up to every level.

    This is the navigation spine of the explorer: the reader expands a package,
    sees which subtree is troubled from its badges, and drills in. The graph is
    then scoped to whatever the reader selected, so it never renders the whole
    repository at once. Rollups are summed from the per-function classifications
    the analyzer already decided, so the tree cannot disagree with the graph.
    Modules that only define classes are admitted too, with empty rollups, so
    every class box has a module column.
    """
    cloned_ids = {member for group in clones for member in group["members"]}
    funcs_by_module: dict[str, list[dict]] = defaultdict(list)
    for node in nodes:
        funcs_by_module[node["module"]].append(node)

    root = {"name": package_name, "path": "", "module": None, "children": {}}

    for module in sorted(set(funcs_by_module) | set(class_modules)):
        cursor = root
        parts = module.split(".")
        for index, part in enumerate(parts):
            path = ".".join(parts[: index + 1])
            cursor = cursor["children"].setdefault(
                part, {"name": part, "path": path, "module": None, "children": {}}
            )
        cursor["module"] = module

    def finalize(node):
        children = [finalize(node["children"][key]) for key in sorted(node["children"])]
        own = funcs_by_module.get(node["module"], []) if node["module"] else []
        rollup = {"functions": 0, "dead": 0, "clones": 0, "hubs": 0, "orchestrators": 0, "wrappers": 0}
        for function in own:
            rollup["functions"] += 1
            rollup["dead"] += 1 if function["dead"] else 0
            rollup["clones"] += 1 if function["id"] in cloned_ids else 0
            rollup["hubs"] += 1 if function["is_hub"] else 0
            rollup["orchestrators"] += 1 if function["is_orchestrator"] else 0
            rollup["wrappers"] += 1 if function["is_wrapper"] else 0
        for child in children:
            for key in rollup:
                rollup[key] += child["rollup"][key]
        return {
            "name": node["name"],
            "path": node["path"],
            "type": "module" if node["module"] and not children else "package",
            "module": node["module"],
            "function_ids": sorted(function["id"] for function in own),
            "children": children,
            "rollup": rollup,
        }

    return finalize(root)


def _clone_groups(callables):
    by_hash: dict[str, list[dict]] = defaultdict(list)
    for symbol in callables:
        if symbol["structure_size"] >= MIN_CLONE_SIZE and symbol["structure_hash"]:
            by_hash[symbol["structure_hash"]].append(symbol)

    groups = []
    for digest, members in by_hash.items():
        if len(members) < 2:
            continue
        member_ids = sorted(symbol["id"] for symbol in members)
        modules = {symbol["module"] for symbol in members}
        groups.append(
            {
                "hash": digest,
                "members": member_ids,
                "size": members[0]["structure_size"],
                "cross_module": len(modules) > 1,
            }
        )
    return sorted(groups, key=lambda group: (-len(group["members"]), -group["size"], group["members"][0]))


def _layer_relations(files, imports, calls, by_id):
    layer_by_module = {file["module"]: infer_layer(file) for file in files}
    local_modules = set(layer_by_module)
    edges: dict[tuple[str, str], int] = defaultdict(int)

    for item in imports:
        if item["module"] not in local_modules:
            continue
        target = _import_target(item, local_modules)
        if target and target != item["module"]:
            edges[(item["module"], target)] += 1

    for call in calls:
        if call["kind"] != "cross_file" or not call["target"]:
            continue
        source = by_id.get(call["source"])
        target = by_id.get(call["target"])
        if source and target and source["module"] != target["module"]:
            edges[(source["module"], target["module"])] += 1

    layer_edges: dict[tuple[str, str], int] = defaultdict(int)
    for (source, target), weight in edges.items():
        source_layer = layer_by_module.get(source)
        target_layer = layer_by_module.get(target)
        if source_layer and target_layer and source_layer != target_layer:
            layer_edges[(source_layer, target_layer)] += weight

    # A violation is mutual coupling: two layers that depend on each other.
    # This is a real smell regardless of which layer "should" sit on top, so it
    # needs no guessed ordering and produces no false positives from one.
    violations = []
    for (source_layer, target_layer) in layer_edges:
        if source_layer < target_layer and (target_layer, source_layer) in layer_edges:
            violations.append({"layers": [source_layer, target_layer]})

    return layer_edges, sorted(violations, key=lambda item: item["layers"])


def _import_pairs(files, symbols, imports, column_modules, circular_imports):
    """Every resolved local import as a sorted, deduplicated module pair.

    The imported module is resolved as in ``find_circular_imports``. When a
    ``from`` import binds a function or class defined in a different module
    (``symbol``: the name is re-exported, typically by a package
    ``__init__``), the pair points at the defining module instead, because
    the package usually has no column to draw. The pair to the imported
    module is kept as well only when that module has a column, or when the
    pair closes an import cycle, so every import-cycle pair is still an
    import pair. Pairs with no column at either end are kept; the layout
    names those modules in ``import_targets_without_column``.
    """
    local_modules = {file["module"] for file in files}
    module_of_symbol = {symbol["id"]: symbol["module"] for symbol in symbols}
    cycle_pairs = {pair for cycle in circular_imports for pair in zip(cycle, cycle[1:])}
    pairs = set()
    for item in imports:
        source = item["module"]
        if source not in local_modules:
            continue
        imported = _import_target(item, local_modules)
        defining = module_of_symbol.get(item["symbol"])
        targets = {imported}
        if defining is not None and defining != imported:
            targets = {defining}
            if imported in column_modules or (source, imported) in cycle_pairs:
                targets.add(imported)
        pairs.update((source, target) for target in targets if target and target != source)
    return [list(pair) for pair in sorted(pairs)]


def _import_target(item, local_modules):
    if item["kind"] == "import":
        pieces = item["imported_module"].split(".")
        for index in range(len(pieces), 0, -1):
            candidate = ".".join(pieces[:index])
            if candidate in local_modules:
                return candidate
        return None
    base = resolve_from_base(item["module"], item["imported_module"], item["level"])
    full_name = f"{base}.{item['name']}" if base and item["name"] != "*" else base
    if full_name in local_modules:
        return full_name
    if base in local_modules:
        return base
    return None


def _layer_summary(files, layer_edges):
    modules_by_layer: dict[str, list[str]] = defaultdict(list)
    funcs_by_layer: dict[str, int] = defaultdict(int)
    for file in files:
        layer = infer_layer(file)
        modules_by_layer[layer].append(file["module"])
        funcs_by_layer[layer] += file["function_count"]

    summary = []
    for layer in LAYER_ORDER:
        modules = sorted(modules_by_layer.get(layer, []))
        if not modules:
            continue
        summary.append(
            {
                "layer": layer,
                "modules": modules,
                "module_count": len(modules),
                "function_count": funcs_by_layer[layer],
            }
        )
    edges = [
        {"source": source, "target": target, "weight": weight}
        for (source, target), weight in sorted(layer_edges.items(), key=lambda item: (-item[1], item[0]))
    ]
    return {"bands": summary, "edges": edges}


def infer_layer(file):
    text = f"{file['path']} {file['module']}".lower()
    for layer, tokens in _LAYER_TOKENS:
        if any(token in text for token in tokens):
            return layer
    return "support"


def _summary(nodes, clones, violations):
    return {
        "callable_count": len(nodes),
        "root_count": sum(1 for node in nodes if node["is_root"]),
        "reachable_count": sum(1 for node in nodes if node["reachable"]),
        "dead_count": sum(1 for node in nodes if node["dead"]),
        "load_bearing_count": sum(1 for node in nodes if node["load_bearing"]),
        "wrapper_count": sum(1 for node in nodes if node["is_wrapper"]),
        "clone_group_count": len(clones),
        "cloned_function_count": sum(len(group["members"]) for group in clones),
        "layer_violation_count": len(violations),
    }
