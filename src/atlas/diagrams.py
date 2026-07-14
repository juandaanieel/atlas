from __future__ import annotations

from collections import defaultdict, deque
from pathlib import Path

from atlas.analyzer.payload import analyze_path
from atlas.output import checked_output_path, ensure_child_directory, ensure_output_dir

# How many function nodes the headline workflow may show before it stops being
# readable. Branches are kept; depth is not truncated arbitrarily.
MAX_WORKFLOW_NODES = 26
MAX_DEAD_SHOWN = 6


def write_diagrams(path: str | Path) -> Path:
    root = Path(path).resolve()
    payload = analyze_path(root)
    output_dir = ensure_output_dir(root)
    diagrams_dir = ensure_child_directory(output_dir, "diagrams")
    for child in diagrams_dir.iterdir():
        if child.is_symlink() or child.is_file():
            child.unlink()
    checked_output_path(output_dir, "atlas.json").write_text(
        payload.to_json(indent=2), encoding="utf-8"
    )

    diagrams = {
        "workflow.mmd": workflow_diagram(payload["model"]),
        "map.mmd": map_diagram(payload["model"]),
    }
    for filename, content in diagrams.items():
        checked_output_path(diagrams_dir, filename).write_text(content, encoding="utf-8")
    return diagrams_dir


def workflow_diagram(model: dict) -> str:
    """Reachability graph from one entry point, with defects in the topology.

    Live calls are solid; load-bearing hubs and chokepoints are highlighted;
    dead code is ghosted off to the side; structural clones are linked with a
    dotted edge. A healthy workflow looks calm. A problem one does not.
    """
    nodes_by_id = {node["id"]: node for node in model["nodes"]}
    out_adj: dict[str, list[str]] = defaultdict(list)
    for edge in model["edges"]:
        out_adj[edge["source"]].append(edge["target"])

    root = _primary_root(model, out_adj)
    header = [
        "---",
        f"title: Atlas Workflow - {model['package_name']}",
        "---",
        "flowchart TD",
    ]
    if not root:
        return "\n".join(
            header
            + ['  none["No public entry point was inferred.<br/>See map.mmd for the module-level view."]']
        ) + "\n"

    shown = _bfs_shown(root, out_adj, MAX_WORKFLOW_NODES)
    lines = list(header)
    lines.append(
        f'  note["Workflow from `{_escape(nodes_by_id[root]["qualified_name"])}`<br/>'
        f'reachable call graph, branches kept"]'
    )

    for sid in shown:
        node = nodes_by_id[sid]
        label = f"{node['name']}<br/>{node['module']}:{node['line_start']}"
        lines.append(f'  {_nid(sid)}["{_escape(label)}"]:::{_node_class(node)}')
    lines.append(f"  note --> {_nid(root)}")

    link_index = 1  # link 0 is note --> root
    style_lines: list[str] = []
    for source in shown:
        for target in out_adj.get(source, ()):
            if target in shown:
                lines.append(f"  {_nid(source)} --> {_nid(target)}")
                link_index += 1

    for group in model["clones"]:
        members = [mid for mid in group["members"] if mid in shown]
        for left, right in zip(members, members[1:]):
            lines.append(f'  {_nid(left)} -. clone .- {_nid(right)}')
            style_lines.append(f"  linkStyle {link_index} stroke:#7F77DD,stroke-dasharray:2 2;")
            link_index += 1

    dead = [node for node in model["nodes"] if node["dead"]]
    if dead:
        lines.append(f'  deadnote["dead code<br/>{len(dead)} private functions never reached"]:::ghost')
        for node in dead[:MAX_DEAD_SHOWN]:
            lines.append(f'  {_nid(node["id"])}["{_escape(node["name"])}<br/>{node["module"]}"]:::ghost')
            lines.append(f"  deadnote -.- {_nid(node['id'])}")
            link_index += 1

    lines.extend(_class_defs())
    lines.extend(style_lines)
    return "\n".join(lines) + "\n"


def map_diagram(model: dict) -> str:
    """Layer map: which conceptual layers depend on which.

    Most edges are ordinary one-way dependencies. When two layers depend on
    each other, both directions are drawn red: mutual coupling between layers
    is a smell no matter which layer is meant to sit on top. The reader sees the
    red pair without reading a single number.
    """
    bands = model["layers"]["bands"]
    edges = model["layers"]["edges"]
    edge_set = {(edge["source"], edge["target"]) for edge in edges}

    lines = [
        "---",
        f"title: Atlas Layer Map - {model['package_name']}",
        "---",
        "flowchart TD",
        '  note["Layers inferred from module names.<br/>Red edges mark two layers that depend on each other."]:::note',
    ]
    for band in bands:
        label = f"{band['layer']}<br/>{band['module_count']} modules | {band['function_count']} funcs"
        lines.append(f'  {_nid(band["layer"])}["{_escape(label)}"]:::live')

    link_index = 0
    style_lines: list[str] = []
    for edge in edges:
        source, target = edge["source"], edge["target"]
        mutual = (target, source) in edge_set
        lines.append(f'  {_nid(source)} -->|"{edge["weight"]} deps"| {_nid(target)}')
        if mutual:
            style_lines.append(f"  linkStyle {link_index} stroke:#A32D2D,stroke-width:2px;")
        link_index += 1

    summary = model["summary"]
    flags = []
    if summary["dead_count"]:
        flags.append(f"{summary['dead_count']} dead functions")
    if summary["clone_group_count"]:
        flags.append(f"{summary['clone_group_count']} clone groups")
    if summary["layer_violation_count"]:
        flags.append(f"{summary['layer_violation_count']} layering violations")
    if flags:
        lines.append(f'  flags["needs attention<br/>{_escape(" · ".join(flags))}"]:::broken')

    lines.extend(_class_defs())
    lines.extend(style_lines)
    return "\n".join(lines) + "\n"


def _primary_root(model: dict, out_adj: dict[str, list[str]]) -> str | None:
    roots = model["roots"]
    if not roots:
        return None
    nodes_by_id = {node["id"]: node for node in model["nodes"]}

    def reach_size(root: str) -> int:
        return len(_reach(root, out_adj))

    def rank(root: str) -> tuple:
        node = nodes_by_id[root]
        name = node["name"]
        priority = 0 if name == "main" else 1 if name in {"run", "cli", "app"} else 2
        return (priority, -reach_size(root), root)

    return sorted(roots, key=rank)[0]


def _reach(root: str, out_adj: dict[str, list[str]]) -> set[str]:
    seen = {root}
    queue = deque([root])
    while queue:
        node = queue.popleft()
        for target in out_adj.get(node, ()):
            if target not in seen:
                seen.add(target)
                queue.append(target)
    return seen


def _bfs_shown(root: str, out_adj: dict[str, list[str]], limit: int) -> set[str]:
    order: list[str] = []
    seen = {root}
    queue = deque([root])
    while queue and len(order) < limit:
        node = queue.popleft()
        order.append(node)
        for target in sorted(out_adj.get(node, ())):
            if target not in seen:
                seen.add(target)
                queue.append(target)
    return set(order)


def _node_class(node: dict) -> str:
    if node["load_bearing"]:
        return "crucial"
    if node["is_root"]:
        return "root"
    return "live"


def _nid(value: str) -> str:
    cleaned = "".join(char if char.isalnum() else "_" for char in value)
    return f"n_{cleaned}".strip("_") or "n"


def _escape(value: str) -> str:
    escaped = str(value).replace("&", "&amp;").replace('"', "'").replace("<", "&lt;").replace(">", "&gt;")
    return escaped.replace("&lt;br/&gt;", "<br/>")


def _class_defs() -> list[str]:
    return [
        "  classDef root fill:#E6F1FB,stroke:#185FA5,color:#042C53,stroke-width:2px;",
        "  classDef live fill:#E6F1FB,stroke:#378ADD,color:#042C53;",
        "  classDef crucial fill:#E1F5EE,stroke:#0F6E56,color:#04342C,stroke-width:3px;",
        "  classDef broken fill:#FCEBEB,stroke:#A32D2D,color:#501313,stroke-dasharray:4 3;",
        "  classDef ghost fill:#F1EFE8,stroke:#B4B2A9,color:#5F5E5A,stroke-dasharray:4 3;",
        "  classDef note fill:#FAEEDA,stroke:#854F0B,color:#412402;",
    ]
