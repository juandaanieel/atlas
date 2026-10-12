from __future__ import annotations

from collections import defaultdict, deque
from pathlib import Path

from atlas.analyzer.model import infer_layer
from atlas.functionalities import functionality_issues, load_functionalities


RESOLVED_CALL_KINDS = {"same_file", "cross_file"}


def build_architecture(
    root: Path,
    files: list[dict],
    symbols: list[dict],
    calls: list[dict],
    model: dict,
    snapshot_id: str,
    functionality_dir: Path | None = None,
    functionalities: list[dict] | None = None,
) -> dict:
    """Build the stable, human-readable view shared by the vault and explorer.

    This layer only groups and describes facts Atlas already extracted. It does
    not infer new call edges or semantic functionality labels.
    """
    files_by_id = {file["id"]: file for file in files}
    nodes_by_id = {node["id"]: node for node in model["nodes"]}
    callable_symbols = [
        symbol for symbol in symbols if symbol["kind"] in {"function", "method"}
    ]
    callable_ids = {symbol["id"] for symbol in callable_symbols}
    outgoing, incoming = _call_indexes(calls, callable_ids)

    functions = []
    for symbol in sorted(callable_symbols, key=lambda item: item["id"]):
        node = nodes_by_id.get(symbol["id"])
        file = files_by_id[symbol["file_id"]]
        functions.append(
            _function_record(symbol, node, file, outgoing[symbol["id"]], incoming[symbol["id"]])
        )
    for function in functions:
        function["snapshot_id"] = snapshot_id

    function_by_id = {function["id"]: function for function in functions}
    pipelines = _pipelines(model, function_by_id)
    if functionalities is None:
        functionalities = load_functionalities(root, set(function_by_id), functionality_dir)
    _apply_functionalities(function_by_id, functionalities)
    return {
        "snapshot_id": snapshot_id,
        "functions": functions,
        "pipelines": pipelines,
        "functionalities": functionalities,
        "functionality_issues": functionality_issues(functionalities),
    }


def _call_indexes(calls: list[dict], callable_ids: set[str]):
    outgoing: dict[str, list[dict]] = defaultdict(list)
    incoming: dict[str, list[dict]] = defaultdict(list)
    for call in calls:
        target_is_callable = call["target"] in callable_ids
        if call["source"] in callable_ids and (
            call["kind"] not in RESOLVED_CALL_KINDS or target_is_callable
        ):
            outgoing[call["source"]].append(call)
        if target_is_callable:
            incoming[call["target"]].append(call)

    for records in outgoing.values():
        records.sort(key=lambda item: (item["line"], item["called_name"], item["kind"]))
    for records in incoming.values():
        records.sort(key=lambda item: (item["source"], item["line"], item["kind"]))
    return outgoing, incoming


def _apply_functionalities(function_by_id: dict[str, dict], functionalities: list[dict]) -> None:
    for function in function_by_id.values():
        function["functionalities"] = []
    for functionality in functionalities:
        if functionality["status"] != "accepted":
            continue
        for function_id in functionality["member_ids"]:
            function = function_by_id[function_id]
            function["functionalities"].append(functionality["id"])
            function["tags"].append(f"functionality/{_tag_name(functionality['id'])}")
            function["tags"].extend(functionality["tags"])
    for function in function_by_id.values():
        function["functionalities"].sort()
        function["tags"] = sorted(set(function["tags"]))


def _tag_name(value: str) -> str:
    return value.split(":", 1)[-1].replace("_", "-").replace(".", "-")


def _function_record(
    symbol: dict,
    node: dict | None,
    file: dict,
    outgoing: list[dict],
    incoming: list[dict],
) -> dict:
    resolved_outgoing = [call for call in outgoing if call["kind"] in RESOLVED_CALL_KINDS]
    resolved_incoming = [call for call in incoming if call["kind"] in RESOLVED_CALL_KINDS]
    unresolved = [call for call in outgoing if call["kind"] == "unresolved"]
    state = _state(symbol, node)
    role, role_source = _role(symbol, node, len(resolved_incoming), len(resolved_outgoing))
    return {
        "id": symbol["id"],
        "name": symbol["name"],
        "qualified_name": symbol["qualified_name"],
        "kind": symbol["kind"],
        "module": symbol["module"],
        "file_id": symbol["file_id"],
        "line_start": symbol["line_start"],
        "line_end": symbol["line_end"],
        "docstring_summary": symbol["docstring_summary"],
        "is_test": symbol["is_test"],
        "is_private": symbol["is_private"],
        "exported": bool(node and node["exported"]),
        "exported_from": node["exported_from"] if node else [],
        "state": state,
        "role": role,
        "role_source": role_source,
        "tags": _tags(symbol, node, file, state, unresolved),
        "parameters": symbol["parameters"],
        "return_annotation": symbol["return_annotation"],
        "callers": [_incoming_record(call) for call in resolved_incoming],
        "callees": [_outgoing_record(call) for call in resolved_outgoing],
        "unresolved_calls": [_unresolved_record(call) for call in unresolved],
        "fan_in": node["fan_in"] if node else len(resolved_incoming),
        "fan_out": node["fan_out"] if node else len(resolved_outgoing),
        "is_root": bool(node and node["is_root"]),
        "is_hub": bool(node and node["is_hub"]),
        "is_orchestrator": bool(node and node["is_orchestrator"]),
        "is_wrapper": bool(node and node["is_wrapper"]),
        "in_static_map": node is not None,
    }


def _incoming_record(call: dict) -> dict:
    return {"id": call["source"], "kind": call["kind"], "line": call["line"]}


def _outgoing_record(call: dict) -> dict:
    return {
        "id": call["target"],
        "kind": call["kind"],
        "line": call["line"],
        "called_name": call["called_name"],
        "confidence": call["confidence"],
    }


def _unresolved_record(call: dict) -> dict:
    return {"called_name": call["called_name"], "line": call["line"]}


def _state(symbol: dict, node: dict | None) -> str:
    if symbol["is_test"]:
        return "test"
    if node is None:
        return "unmodeled"
    if node["dead"]:
        return "dead"
    if node["is_root"]:
        return "root"
    return "live"


def _role(symbol: dict, node: dict | None, fan_in: int, fan_out: int) -> tuple[str, str]:
    docstring = symbol["docstring_summary"]
    if docstring != "No docstring":
        return docstring, "docstring"
    if symbol["is_test"]:
        return f"Test helper in {symbol['module']}.", "atlas"
    if node is None:
        return f"Callable in {symbol['module']} outside Atlas's operational graph.", "atlas"
    if node["dead"]:
        return "Private helper not reached from Atlas's inferred public entry points.", "atlas"
    if node["is_root"] and node["is_orchestrator"]:
        return f"Public entry point that coordinates {fan_out} resolved calls.", "atlas"
    if node["is_root"]:
        return f"Public entry point for {symbol['module']}.", "atlas"
    if node["is_hub"] and node["is_orchestrator"]:
        return f"Load-bearing helper with {fan_in} callers and {fan_out} resolved calls.", "atlas"
    if node["is_hub"]:
        return f"Shared helper called by {fan_in} static callers.", "atlas"
    if node["is_orchestrator"]:
        return f"Coordinates {fan_out} resolved calls in {symbol['module']}.", "atlas"
    if node["is_wrapper"]:
        return f"Thin wrapper in {symbol['module']}.", "atlas"
    return f"Function in {symbol['module']} with {fan_in} callers and {fan_out} resolved calls.", "atlas"


def _tags(symbol: dict, node: dict | None, file: dict, state: str, unresolved: list[dict]) -> list[str]:
    tags = [
        f"atlas/{symbol['kind']}",
        f"atlas/module/{symbol['module'].replace('.', '-')}",
        f"atlas/state/{state}",
        f"atlas/layer/{infer_layer(file)}",
        "atlas/evidence/static",
    ]
    if symbol["is_test"]:
        tags.append("atlas/test")
    if symbol["docstring_summary"] == "No docstring":
        tags.append("atlas/undocumented")
    if unresolved:
        tags.append("atlas/has/unresolved-call")
    if node and node["is_hub"]:
        tags.append("atlas/role/hub")
    if node and node["is_orchestrator"]:
        tags.append("atlas/role/orchestrator")
    if node and node["is_wrapper"]:
        tags.append("atlas/role/wrapper")
    return sorted(tags)


def _pipelines(model: dict, function_by_id: dict[str, dict]) -> list[dict]:
    """One pipeline per root with calls: every function the root reaches.

    Roots the package exports come first, then name priority, then reach.

    A pipeline follows call edges between functions. An edge that constructs
    a class without an analysed ``__init__`` ends at the class box, so it is
    not followed. ``function_ids`` is the full reachable set in breadth-first
    order and ``edge_count`` counts the call edges among those functions.
    """
    out_adj: dict[str, list[str]] = defaultdict(list)
    for edge in model["edges"]:
        if edge["target"] in function_by_id:
            out_adj[edge["source"]].append(edge["target"])
    for targets in out_adj.values():
        targets.sort()

    roots = [root for root in model["roots"] if out_adj.get(root)]
    roots.sort(key=lambda root: _pipeline_sort_key(root, out_adj, function_by_id))
    pipelines = []
    for root in roots:
        function_ids = _pipeline_nodes(root, out_adj)
        root_function = function_by_id[root]
        pipelines.append(
            {
                "id": f"pipeline:{root}",
                "root": root,
                "title": f"{root_function['name']} pipeline",
                "summary": f"Atlas reaches {len(function_ids)} functions from {root_function['qualified_name']}.",
                "function_ids": function_ids,
                # The reachable set is closed under calls, so every call edge
                # out of a member lands on a member.
                "edge_count": sum(len(out_adj.get(source, [])) for source in function_ids),
            }
        )
    return pipelines


def _pipeline_sort_key(root: str, out_adj: dict[str, list[str]], function_by_id: dict[str, dict]) -> tuple:
    function = function_by_id[root]
    name = function["name"]
    priority = 0 if name == "main" else 1 if name in {"run", "cli", "app"} else 2
    return (not function["exported"], priority, -len(_pipeline_nodes(root, out_adj)), root)


def _pipeline_nodes(root: str, out_adj: dict[str, list[str]]) -> list[str]:
    nodes = []
    seen = {root}
    queue = deque([root])
    while queue:
        source = queue.popleft()
        nodes.append(source)
        for target in out_adj.get(source, []):
            if target not in seen:
                seen.add(target)
                queue.append(target)
    return nodes
