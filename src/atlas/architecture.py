from __future__ import annotations

import hashlib
import re
from collections import defaultdict, deque
from pathlib import Path

from atlas.analyzer.discovery import safe_descendant_files
from atlas.analyzer.model import infer_layer
from atlas.functionalities import functionality_issues, load_functionalities


RESOLVED_CALL_KINDS = {"same_file", "cross_file"}
MAX_PIPELINE_NODES = 24
MAX_RELATED_FUNCTIONS = 12
WORKFLOW_PREFIXES = ("prepare", "build", "solve", "run", "main")


def build_architecture(
    root: Path,
    files: list[dict],
    symbols: list[dict],
    calls: list[dict],
    model: dict,
    snapshot_id: str,
    functionality_dir: Path | None = None,
    functionalities: list[dict] | None = None,
    workflow_path: Path | None = None,
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
    use_cases = _use_cases(root, functions, workflow_path)
    for use_case in use_cases:
        use_case["architecture"] = _use_case_architecture(
            use_case["function_ids"], function_by_id
        )
    functionality_records = functionalities
    if functionality_records is None:
        functionality_records = load_functionalities(root, set(function_by_id), functionality_dir)
    _apply_functionalities(function_by_id, functionality_records)
    return {
        "snapshot_id": snapshot_id,
        "functions": functions,
        "pipelines": pipelines,
        "use_cases": use_cases,
        "functionalities": functionality_records,
        "functionality_issues": functionality_issues(functionality_records),
    }


def documentation_digest(root: Path, workflow_path: Path | None = None) -> str:
    """Hash the documentation inputs that become use-case records.

    Example assets contribute their path, while Markdown pages contribute their
    content. Atlas does not read binary example data as prose.
    """
    digest = hashlib.sha256()
    workflow_root = _workflow_root(root, workflow_path)
    example_files = _example_files(root, workflow_path)
    for path in _documentation_files(root, example_files):
        digest.update(path.relative_to(root).as_posix().encode("utf-8"))
        digest.update(path.read_bytes())
    for path in example_files:
        digest.update(_workflow_path(workflow_root, path).encode("utf-8"))
    return digest.hexdigest()


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
    out_adj: dict[str, list[str]] = defaultdict(list)
    for edge in model["edges"]:
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
                "title": f"{root_function['name']} workflow",
                "summary": f"Atlas reaches {len(function_ids)} functions from {root_function['qualified_name']}.",
                "function_ids": function_ids,
                "edge_count": sum(
                    1
                    for source in function_ids
                    for target in out_adj.get(source, [])
                    if target in function_ids
                ),
            }
        )
    return pipelines


def _pipeline_sort_key(root: str, out_adj: dict[str, list[str]], function_by_id: dict[str, dict]) -> tuple:
    function = function_by_id[root]
    name = function["name"]
    priority = 0 if name == "main" else 1 if name in {"run", "cli", "app"} else 2
    return (priority, -len(_pipeline_nodes(root, out_adj)), root)


def _pipeline_nodes(root: str, out_adj: dict[str, list[str]]) -> list[str]:
    nodes = []
    seen = {root}
    queue = deque([root])
    while queue and len(nodes) < MAX_PIPELINE_NODES:
        source = queue.popleft()
        nodes.append(source)
        for target in out_adj.get(source, []):
            if target not in seen:
                seen.add(target)
                queue.append(target)
    return nodes


def _use_cases(root: Path, functions: list[dict], workflow_path: Path | None = None) -> list[dict]:
    workflow_root = _workflow_root(root, workflow_path)
    example_files = _example_files(root, workflow_path)
    documentation_files = _documentation_files(root, example_files)
    records = []
    for path in documentation_files:
        text = path.read_text(encoding="utf-8")
        relative = path.relative_to(root).as_posix()
        records.append(
            {
                "id": f"use-case:{relative}",
                "path": relative,
                "title": _document_title(text, path),
                "summary": _document_summary(text),
                "kind": _document_kind(path, example_files),
                "example_paths": _matching_examples(path, example_files, workflow_root),
                "function_ids": _related_functions(text, functions),
            }
        )

    if workflow_path:
        documented_stems = {path.stem for path in documentation_files}
        records.extend(
            _workflow_records(root, functions, example_files, workflow_root, documented_stems)
        )

    return sorted(records, key=lambda record: record["path"])


def _documentation_files(root: Path, example_files: list[Path]) -> list[Path]:
    docs = root / "docs"
    example_stems = {path.stem for path in example_files}
    return sorted(
        (
            path
            for path in safe_descendant_files(docs)
            if path.suffix == ".md" and path.stem in example_stems
        ),
        key=lambda path: path.relative_to(root).as_posix(),
    )


def _use_case_architecture(function_ids: list[str], function_by_id: dict[str, dict]) -> dict:
    documented_ids = [function_id for function_id in function_ids if function_id in function_by_id]
    workflow_ids = [
        function_id
        for function_id in documented_ids
        if function_by_id[function_id]["name"].startswith(WORKFLOW_PREFIXES)
    ]
    if not workflow_ids:
        workflow_ids = documented_ids[:4]

    return {
        "workflow_ids": workflow_ids,
    }


def _example_files(root: Path, workflow_path: Path | None = None) -> list[Path]:
    examples = _workflow_root(root, workflow_path)
    if workflow_path and workflow_path.is_file():
        return (
            [workflow_path]
            if not workflow_path.is_symlink() and workflow_path.suffix != ".md"
            else []
        )
    return sorted(
        (
            path
            for path in safe_descendant_files(examples)
            if path.suffix != ".md"
            and _is_example_content(path, examples)
        ),
        key=lambda path: path.relative_to(examples).as_posix(),
    )


def _workflow_root(root: Path, workflow_path: Path | None) -> Path:
    if workflow_path and workflow_path.is_file():
        return workflow_path.parent
    return workflow_path or root / "examples"


def _workflow_path(workflow_root: Path, path: Path) -> str:
    return f"{workflow_root.name}/{path.relative_to(workflow_root).as_posix()}"


def _is_example_content(path: Path, examples: Path) -> bool:
    relative = path.relative_to(examples)
    return (
        path.suffix not in {".pyc", ".pyo"}
        and "__pycache__" not in relative.parts
        and not any(part.startswith(".") for part in relative.parts)
    )


def _document_kind(path: Path, example_files: list[Path]) -> str:
    if "guide" in path.parts or "guides" in path.parts:
        return "guide"
    if path.stem in {example.stem for example in example_files}:
        return "example"
    return "documentation"


def _matching_examples(
    path: Path,
    example_files: list[Path],
    workflow_dir: Path,
) -> list[str]:
    return [
        _workflow_path(workflow_dir, example)
        for example in example_files
        if example.stem == path.stem
    ]


def _workflow_records(
    root: Path,
    functions: list[dict],
    example_files: list[Path],
    workflow_root: Path,
    documented_stems: set[str],
) -> list[dict]:
    records = []
    for example in example_files:
        if example.suffix.lower() != ".py" or example.stem in documented_stems:
            continue
        example_path = _workflow_path(workflow_root, example)
        try:
            file_id = example.relative_to(root).as_posix()
        except ValueError:
            file_id = ""
        related_functions = [
            function
            for function in functions
            if function["file_id"] == file_id and not function["is_private"] and not function["is_test"]
        ]
        function_ids = [function["id"] for function in related_functions]
        entry_function = next(
            (function for function in related_functions if function["name"].startswith(WORKFLOW_PREFIXES)),
            None,
        )
        summary = (
            entry_function["docstring_summary"]
            if entry_function and entry_function["docstring_summary"] != "No docstring"
            else f"Python workflow defined in {example_path}."
        )
        records.append(
            {
                "id": f"use-case:{example_path}",
                "path": example_path,
                "title": _title_from_path(example),
                "summary": summary,
                "kind": "workflow",
                "example_paths": [example_path],
                "function_ids": function_ids,
            }
        )
    return records


def _document_title(text: str, path: Path) -> str:
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return _title_from_path(path)


def _title_from_path(path: Path) -> str:
    return path.stem.replace("_", " ").replace("-", " ").title()


def _document_summary(text: str) -> str:
    lines = _body_lines(text)
    for index, line in enumerate(lines):
        if not line.strip() or line.startswith("#") or line.startswith("---"):
            continue
        if line.startswith("```") or line.startswith("!!!") or line.startswith(":"):
            continue
        paragraph = [line.strip()]
        for following in lines[index + 1 :]:
            if not following.strip() or following.startswith("#") or following.startswith("```"):
                break
            paragraph.append(following.strip())
        return re.sub(r"\s+", " ", " ".join(paragraph))[:280]
    return "Documentation page without a prose summary."


def _body_lines(text: str) -> list[str]:
    lines = text.splitlines()
    if lines and lines[0].strip() == "---":
        for index, line in enumerate(lines[1:], start=1):
            if line.strip() == "---":
                return lines[index + 1 :]
    return lines


def _related_functions(text: str, functions: list[dict]) -> list[str]:
    by_name: dict[str, list[dict]] = defaultdict(list)
    for function in functions:
        if function["is_private"] or function["is_test"] or len(function["name"]) < 4:
            continue
        by_name[function["name"]].append(function)

    matches = []
    for name, candidates in by_name.items():
        if len(candidates) != 1:
            continue
        function = candidates[0]
        pattern = re.compile(rf"(?<![A-Za-z0-9_]){re.escape(name)}\s*\(")
        found = pattern.search(text)
        if found:
            matches.append((found.start(), function["id"]))
            continue
        if name == "main":
            command = function["module"].split(".")[0]
            cli_pattern = re.compile(rf"(?<![A-Za-z0-9_-]){re.escape(command)}\s+[A-Za-z0-9_-]+")
            cli_match = cli_pattern.search(text)
            if cli_match:
                matches.append((cli_match.start(), function["id"]))
    matches.sort()
    return [function_id for _, function_id in matches[:MAX_RELATED_FUNCTIONS]]
