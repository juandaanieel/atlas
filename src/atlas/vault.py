from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
from collections import defaultdict
from pathlib import Path

from atlas.analyzer.discovery import resolve_analysis_root
from atlas.analyzer.snapshot import AnalysisSnapshot
from atlas.output import checked_output_path, ensure_child_directory, ensure_output_subdir


GENERATED_DIR = "00-atlas"
FUNCTIONALITIES_DIR = "10-functionality"
PROPOSALS_DIR = "20-proposals"


def write_vault(
    root: str | Path,
    payload: AnalysisSnapshot | None = None,
    out: str | Path | None = None,
) -> Path:
    """Materialize Atlas facts as an Obsidian-compatible Markdown vault."""
    root_path = resolve_analysis_root(root)
    vault_dir = _vault_directory(root_path, out)
    if payload is None:
        from atlas.analyzer.payload import analyze_path

        payload = analyze_path(root_path, vault_dir=vault_dir)

    generated_dir = checked_output_path(vault_dir, GENERATED_DIR)
    if generated_dir.exists():
        shutil.rmtree(generated_dir)

    functions_dir = generated_dir / "Functions"
    modules_dir = generated_dir / "Modules"
    pipelines_dir = generated_dir / "Pipelines"
    for directory in (functions_dir, modules_dir, pipelines_dir):
        directory.mkdir(parents=True, exist_ok=True)

    _ensure_human_space(vault_dir)
    architecture = payload["architecture"]
    functions = architecture["functions"]
    functions_by_id = {function["id"]: function for function in functions}
    function_paths = {
        function["id"]: functions_dir / _note_name(function["id"])
        for function in functions
    }
    module_paths = {
        module: modules_dir / _note_name(f"module:{module}")
        for module in sorted({function["module"] for function in functions})
    }
    pipeline_paths = {
        pipeline["id"]: pipelines_dir / _note_name(pipeline["id"])
        for pipeline in architecture["pipelines"]
    }
    functionality_paths = {
        functionality["id"]: vault_dir / FUNCTIONALITIES_DIR / functionality["path"]
        for functionality in architecture["functionalities"]
    }

    pipelines_by_function: dict[str, list[dict]] = defaultdict(list)
    for pipeline in architecture["pipelines"]:
        for function_id in pipeline["function_ids"]:
            pipelines_by_function[function_id].append(pipeline)

    for function in functions:
        path = function_paths[function["id"]]
        path.write_text(
            _function_note(
                function,
                path,
                function_paths,
                module_paths,
                pipeline_paths,
                functionality_paths,
                functions_by_id,
                pipelines_by_function[function["id"]],
            ),
            encoding="utf-8",
        )

    _write_module_notes(functions, module_paths, function_paths)
    _write_pipeline_notes(architecture["pipelines"], pipeline_paths, function_paths, functions_by_id)
    _write_home(
        payload,
        generated_dir,
        module_paths,
        pipeline_paths,
        functionality_paths,
    )
    _write_manifest(
        payload,
        generated_dir,
        function_paths,
        module_paths,
        pipeline_paths,
        functionality_paths,
    )
    return vault_dir


def _ensure_human_space(vault_dir: Path) -> None:
    functionalities = ensure_child_directory(vault_dir, FUNCTIONALITIES_DIR)
    proposals = ensure_child_directory(vault_dir, PROPOSALS_DIR)
    _write_if_missing(
        checked_output_path(functionalities, "_template.md"),
        """---
atlas_kind: functionality
status: proposed
tags:
members:
  - replace.with.function_id
---

# Functionality name

Describe the purpose, boundary, and known uncertainty here. Change the status
to `accepted` after review to project its members onto generated function notes.
""",
    )
    _write_if_missing(
        checked_output_path(proposals, "README.md"),
        """# Proposals

Place reviewed AI or human proposals here. A proposal should name its Atlas
snapshot, member function IDs, supporting call evidence, and open questions.
Atlas never treats these files as static-analysis facts.
""",
    )


def _function_note(
    function: dict,
    path: Path,
    function_paths: dict[str, Path],
    module_paths: dict[str, Path],
    pipeline_paths: dict[str, Path],
    functionality_paths: dict[str, Path],
    functions_by_id: dict[str, dict],
    pipelines: list[dict],
) -> str:
    lines = _frontmatter(
        {
            "atlas_kind": function["kind"],
            "atlas_id": function["id"],
            "snapshot_id": function["snapshot_id"],
            "module": function["module"],
            "source": f"{function['file_id']}:{function['line_start']}-{function['line_end']}",
            "state": function["state"],
            "role_source": function["role_source"],
            "in_static_map": function["in_static_map"],
            "fan_in": function["fan_in"],
            "fan_out": function["fan_out"],
            "tags": function["tags"],
        }
    )
    lines.extend(
        [
            f"# {function['qualified_name']}",
            "",
            f"**Role ({function['role_source']}):** {function['role']}",
            "",
            f"**State (Atlas):** {_state_label(function)}",
            "",
            "## Context",
            "",
            f"- Module: {_link(function['module'], path, module_paths[function['module']])}",
            f"- Source: `{function['file_id']}:{function['line_start']}`",
            "",
            "## Calls",
            "",
        ]
    )
    if not function["in_static_map"]:
        lines.extend(
            [
                "This callable is recorded in the vault but is outside Atlas's static map.",
                "",
            ]
        )
    if function["callees"]:
        for call in function["callees"]:
            target = functions_by_id.get(call["id"])
            if target:
                label = target["qualified_name"]
                lines.append(
                    f"- {_link(label, path, function_paths[target['id']])} · `{call['kind']}` at line {call['line']}"
                )
    else:
        lines.append("- No statically resolved calls.")

    lines.extend(["", "## Called by", ""])
    if function["callers"]:
        for call in function["callers"]:
            source = functions_by_id.get(call["id"])
            if source:
                lines.append(
                    f"- {_link(source['qualified_name'], path, function_paths[source['id']])} · `{call['kind']}` at line {call['line']}"
                )
    else:
        lines.append("- No statically resolved callers.")

    lines.extend(["", "## Unresolved calls", ""])
    if function["unresolved_calls"]:
        for call in function["unresolved_calls"]:
            lines.append(f"- `{call['called_name']}()` at line {call['line']}")
    else:
        lines.append("- None.")

    lines.extend(["", "## Pipelines", ""])
    if pipelines:
        for pipeline in pipelines:
            lines.append(_link(pipeline["title"], path, pipeline_paths[pipeline["id"]], prefix="- "))
    else:
        lines.append("- None.")

    lines.extend(["", "## Accepted functionalities", ""])
    if function["functionalities"]:
        for functionality_id in function["functionalities"]:
            functionality_path = functionality_paths.get(functionality_id)
            if functionality_path and functionality_path.exists():
                lines.append(_link(functionality_id, path, functionality_path, prefix="- "))
    else:
        lines.append("- None.")
    lines.append("")
    return "\n".join(lines)


def _write_module_notes(functions: list[dict], module_paths: dict[str, Path], function_paths: dict[str, Path]) -> None:
    by_module: dict[str, list[dict]] = defaultdict(list)
    for function in functions:
        by_module[function["module"]].append(function)
    for module, members in by_module.items():
        path = module_paths[module]
        lines = _frontmatter(
            {
                "atlas_kind": "module",
                "atlas_id": f"module:{module}",
                "function_count": len(members),
            }
        )
        lines.extend([f"# {module}", "", "## Functions", ""])
        for function in sorted(members, key=lambda item: item["id"]):
            lines.append(
                _link(
                    function["name"],
                    path,
                    function_paths[function["id"]],
                    suffix=f" · {function['state']}",
                    prefix="- ",
                )
            )
        lines.append("")
        path.write_text("\n".join(lines), encoding="utf-8")


def _write_pipeline_notes(
    pipelines: list[dict],
    pipeline_paths: dict[str, Path],
    function_paths: dict[str, Path],
    functions_by_id: dict[str, dict],
) -> None:
    for pipeline in pipelines:
        path = pipeline_paths[pipeline["id"]]
        lines = _frontmatter(
            {
                "atlas_kind": "pipeline",
                "atlas_id": pipeline["id"],
                "root": pipeline["root"],
                "function_count": len(pipeline["function_ids"]),
                "edge_count": pipeline["edge_count"],
            }
        )
        lines.extend([f"# {pipeline['title']}", "", pipeline["summary"], "", "## Reachable functions", ""])
        for function_id in pipeline["function_ids"]:
            function = functions_by_id.get(function_id)
            if function:
                lines.append(_link(function["qualified_name"], path, function_paths[function_id], prefix="- "))
        lines.append("")
        path.write_text("\n".join(lines), encoding="utf-8")


def _write_home(
    payload: dict,
    generated_dir: Path,
    module_paths: dict[str, Path],
    pipeline_paths: dict[str, Path],
    functionality_paths: dict[str, Path],
) -> None:
    path = generated_dir / "Home.md"
    lines = _frontmatter(
        {
            "atlas_kind": "home",
            "snapshot_id": payload["snapshot_id"],
            "package": payload["package_name"],
        }
    )
    lines.extend(
        [
            f"# Atlas vault: {payload['package_name']}",
            "",
            "This is a deterministic view of the Atlas call graph. Function notes link only statically resolved calls.",
            "",
            "## Modules",
            "",
        ]
    )
    for module, module_path in sorted(module_paths.items()):
        lines.append(_link(module, path, module_path, prefix="- "))
    lines.extend(["", "## Pipelines", ""])
    if pipeline_paths:
        for pipeline in payload["architecture"]["pipelines"]:
            lines.append(_link(pipeline["title"], path, pipeline_paths[pipeline["id"]], prefix="- "))
    else:
        lines.append("- No entry pipeline contains a statically resolved call.")
    lines.extend(["", "## Functionalities", ""])
    available = [
        functionality
        for functionality in payload["architecture"]["functionalities"]
        if functionality_paths[functionality["id"]].exists()
    ]
    if available:
        for functionality in available:
            lines.append(
                _link(functionality["title"], path, functionality_paths[functionality["id"]], prefix="- ")
            )
    else:
        lines.append("- No functionality definitions have been added.")
    issues = payload["architecture"].get("functionality_issues", [])
    if issues:
        lines.extend(["", "## Functionality definition issues", ""])
        for issue in issues:
            lines.append(f"- `{issue['path']}`: {issue['message']}")
    lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


def _write_manifest(
    payload: dict,
    generated_dir: Path,
    function_paths: dict[str, Path],
    module_paths: dict[str, Path],
    pipeline_paths: dict[str, Path],
    functionality_paths: dict[str, Path],
) -> None:
    vault_dir = generated_dir.parent
    manifest = {
        "atlas_version": payload["atlas_version"],
        "snapshot_id": payload["snapshot_id"],
        "package_name": payload["package_name"],
        "functions": _relative_paths(vault_dir, function_paths),
        "modules": _relative_paths(vault_dir, module_paths),
        "pipelines": _relative_paths(vault_dir, pipeline_paths),
        "functionalities": _relative_paths(vault_dir, functionality_paths),
    }
    (generated_dir / "manifest.json").write_text(
        json.dumps(manifest, indent=2, sort_keys=True), encoding="utf-8"
    )


def _relative_paths(root: Path, paths: dict[str, Path]) -> dict[str, str]:
    return {
        key: path.relative_to(root).as_posix()
        for key, path in sorted(paths.items())
    }


def _frontmatter(values: dict) -> list[str]:
    lines = ["---"]
    for key, value in values.items():
        if isinstance(value, list):
            lines.append(f"{key}:")
            for item in value:
                lines.append(f"  - {_yaml_value(item)}")
        else:
            lines.append(f"{key}: {_yaml_value(value)}")
    lines.extend(["---", ""])
    return lines


def _yaml_value(value: object) -> str:
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    return '"' + str(value).replace("\\", "\\\\").replace('"', '\\"') + '"'


def _state_label(function: dict) -> str:
    labels = [function["state"]]
    if function["is_hub"]:
        labels.append("hub")
    if function["is_orchestrator"]:
        labels.append("orchestrator")
    if function["is_wrapper"]:
        labels.append("wrapper")
    return " · ".join(labels)


def _link(label: str, source: Path, target: Path, *, prefix: str = "", suffix: str = "") -> str:
    destination = os.path.relpath(target, source.parent).replace(os.sep, "/")
    safe_label = label.replace("[", "\\[").replace("]", "\\]")
    return f"{prefix}[{safe_label}]({destination}){suffix}"


def _note_name(value: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-").lower()
    digest = hashlib.sha256(value.encode("utf-8")).hexdigest()[:8]
    return f"{slug[:88]}--{digest}.md"


def _write_if_missing(path: Path, content: str) -> None:
    if not path.exists():
        path.write_text(content, encoding="utf-8")


def _vault_directory(root: Path, out: str | Path | None) -> Path:
    if out is None:
        return ensure_output_subdir(root, "vault")

    requested = Path(out).expanduser().absolute()
    if requested == root / ".atlas" / "vault":
        return ensure_output_subdir(root, "vault")
    if requested.is_symlink():
        raise ValueError(f"Refusing to use symlinked vault directory: {requested}")
    requested.mkdir(parents=True, exist_ok=True)
    if not requested.is_dir():
        raise NotADirectoryError(f"Vault output is not a directory: {requested}")
    return requested.resolve()
