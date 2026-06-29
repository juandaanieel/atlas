from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

from atlas import __version__
from atlas.analyzer.calls import build_calls
from atlas.analyzer.classify import MANY_OUTGOING_CALLS, warning_message
from atlas.analyzer.discovery import discover_python_files
from atlas.analyzer.imports import find_circular_imports
from atlas.analyzer.model import build_model
from atlas.analyzer.models import CallInfo, SymbolInfo, WarningInfo, to_dict
from atlas.analyzer.parser import ParsedFile, parse_python_file


def analyze_path(path: str | Path) -> dict:
    root = Path(path).resolve()
    parsed_files = [parse_python_file(root, rel_path) for rel_path in discover_python_files(root)]
    symbols = [symbol for parsed in parsed_files for symbol in parsed.symbols]
    imports = [item for parsed in parsed_files for item in parsed.imports]
    calls = build_calls(parsed_files, symbols)

    _apply_call_metrics(symbols, calls)
    circular_imports = find_circular_imports(imports, {parsed.file.module for parsed in parsed_files})
    warnings = _build_warnings(parsed_files, symbols, circular_imports)
    _apply_file_warning_counts(parsed_files, warnings)

    files = [parsed.file for parsed in parsed_files]
    package_name = _package_name(root, parsed_files)
    file_dicts = to_dict(files)
    symbol_dicts = to_dict(symbols)
    call_dicts = to_dict(calls)
    import_dicts = to_dict(imports)
    model = build_model(file_dicts, symbol_dicts, call_dicts, import_dicts, package_name)
    return {
        "atlas_version": __version__,
        "root": str(root),
        "package_name": package_name,
        "generated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "files": file_dicts,
        "symbols": symbol_dicts,
        "calls": call_dicts,
        "imports": import_dicts,
        "warnings": to_dict(warnings),
        "model": model,
        "overview": _overview(files, symbols, calls, circular_imports, model),
    }


def write_payload(path: str | Path) -> Path:
    root = Path(path).resolve()
    payload = analyze_path(root)
    output_dir = root / ".atlas"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / "atlas.json"
    output_path.write_text(json.dumps(payload, indent=2, sort_keys=True), encoding="utf-8")
    return output_path


def load_payload(path: str | Path) -> dict:
    payload_path = Path(path).resolve() / ".atlas" / "atlas.json"
    return json.loads(payload_path.read_text(encoding="utf-8"))


def write_report(path: str | Path) -> Path:
    root = Path(path).resolve()
    payload = analyze_path(root)
    output_dir = root / ".atlas"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / "report.md"
    output_path.write_text(_markdown_report(payload), encoding="utf-8")
    return output_path


def _apply_call_metrics(symbols: list[SymbolInfo], calls: list[CallInfo]) -> None:
    by_id = {symbol.id: symbol for symbol in symbols}
    for call in calls:
        source = by_id.get(call.source)
        if not source:
            continue
        if call.kind == "same_file":
            source.metrics["same_file_outgoing"] += 1
            if call.target in by_id:
                by_id[call.target].metrics["same_file_incoming"] += 1
        elif call.kind == "cross_file":
            source.metrics["cross_file_outgoing"] += 1
        elif call.kind == "external":
            source.metrics["external_outgoing"] += 1
        elif call.kind == "unresolved":
            source.metrics["unresolved_outgoing"] += 1

    for symbol in symbols:
        outgoing = (
            symbol.metrics["same_file_outgoing"]
            + symbol.metrics["cross_file_outgoing"]
            + symbol.metrics["external_outgoing"]
            + symbol.metrics["unresolved_outgoing"]
        )
        if symbol.metrics["unresolved_outgoing"] and "unresolved_calls" not in symbol.warnings:
            symbol.warnings.append("unresolved_calls")
        if outgoing >= MANY_OUTGOING_CALLS and "many_outgoing" not in symbol.warnings:
            symbol.warnings.append("many_outgoing")


def _build_warnings(
    parsed_files: list[ParsedFile],
    symbols: list[SymbolInfo],
    circular_imports: list[list[str]],
) -> list[WarningInfo]:
    warnings: list[WarningInfo] = []
    for parsed in parsed_files:
        warnings.extend(parsed.warnings)

    for symbol in symbols:
        for warning in symbol.warnings:
            warnings.append(
                WarningInfo(
                    id=f"{symbol.id}:{warning}",
                    type=warning,
                    message=warning_message(warning),
                    severity=_severity(warning),
                    file_id=symbol.file_id,
                    symbol_id=symbol.id,
                )
            )

    for index, cycle in enumerate(circular_imports, start=1):
        warnings.append(
            WarningInfo(
                id=f"circular_import:{index}",
                type="circular_import",
                message=" -> ".join(cycle),
                severity="warning",
            )
        )
    return sorted(warnings, key=lambda item: item.id)


def _apply_file_warning_counts(parsed_files: list[ParsedFile], warnings: list[WarningInfo]) -> None:
    counts = {parsed.file.id: 0 for parsed in parsed_files}
    for warning in warnings:
        if warning.file_id in counts:
            counts[warning.file_id] += 1
    for parsed in parsed_files:
        parsed.file.warning_count = counts[parsed.file.id]


def _severity(warning: str) -> str:
    if warning in {"parse_error", "unresolved_calls", "circular_import"}:
        return "warning"
    return "info"


def _package_name(root: Path, parsed_files: list[ParsedFile]) -> str:
    top_levels = {
        parsed.file.module.split(".")[0]
        for parsed in parsed_files
        if parsed.file.module
    }
    if len(top_levels) == 1:
        return next(iter(top_levels))
    return root.name.replace("-", "_")


def _overview(
    files,
    symbols: list[SymbolInfo],
    calls: list[CallInfo],
    circular_imports: list[list[str]],
    model: dict,
) -> dict:
    callable_symbols = [symbol for symbol in symbols if symbol.kind in {"function", "method"}]
    unresolved_by_file: dict[str, int] = {file.id: 0 for file in files}
    for call in calls:
        if call.kind == "unresolved":
            source = next((symbol for symbol in symbols if symbol.id == call.source), None)
            if source:
                unresolved_by_file[source.file_id] = unresolved_by_file.get(source.file_id, 0) + 1

    return {
        "file_count": len(files),
        "module_count": len({file.module for file in files}),
        "function_count": sum(1 for symbol in symbols if symbol.kind == "function"),
        "class_count": sum(1 for symbol in symbols if symbol.kind == "class"),
        "method_count": sum(1 for symbol in symbols if symbol.kind == "method"),
        "test_file_count": sum(1 for file in files if file.is_test),
        "entrypoint_count": sum(1 for symbol in callable_symbols if symbol.is_entrypoint),
        "undocumented_function_count": sum(
            1
            for symbol in callable_symbols
            if symbol.docstring_summary == "No docstring"
        ),
        "unresolved_call_count": sum(1 for call in calls if call.kind == "unresolved"),
        "external_call_count": sum(1 for call in calls if call.kind == "external"),
        "cross_file_call_count": sum(1 for call in calls if call.kind == "cross_file"),
        "circular_import_count": len(circular_imports),
        "dead_function_count": model["summary"]["dead_count"],
        "clone_group_count": model["summary"]["clone_group_count"],
        "load_bearing_count": model["summary"]["load_bearing_count"],
        "wrapper_count": model["summary"]["wrapper_count"],
        "layer_violation_count": model["summary"]["layer_violation_count"],
        "largest_functions": [
            _symbol_summary(symbol)
            for symbol in sorted(callable_symbols, key=lambda item: (-item.loc, item.id))[:10]
        ],
        "most_connected_functions": [
            _symbol_summary(symbol)
            for symbol in sorted(callable_symbols, key=lambda item: (-_connection_count(item), item.id))[:10]
        ],
        "files_with_most_unresolved": [
            {"file_id": file_id, "unresolved_calls": count}
            for file_id, count in sorted(unresolved_by_file.items(), key=lambda item: (-item[1], item[0]))
            if count
        ][:10],
        "circular_imports": circular_imports,
        "entrypoints": [_symbol_summary(symbol) for symbol in callable_symbols if symbol.is_entrypoint],
    }


def _connection_count(symbol: SymbolInfo) -> int:
    return sum(symbol.metrics.values())


def _symbol_summary(symbol: SymbolInfo) -> dict:
    return {
        "id": symbol.id,
        "name": symbol.name,
        "qualified_name": symbol.qualified_name,
        "file_id": symbol.file_id,
        "loc": symbol.loc,
        "line_start": symbol.line_start,
        "warnings": symbol.warnings,
        "metrics": symbol.metrics,
    }


def _markdown_report(payload: dict) -> str:
    model = payload["model"]
    summary = model["summary"]
    node_by_id = {node["id"]: node for node in model["nodes"]}
    lines = [
        f"# Atlas Report: {payload['package_name']}",
        "",
        "Architecture health, derived from the call graph. Counts above zero in",
        "the defect sections below are where to look first.",
        "",
        "## Signals",
        "",
        f"- Callable functions/methods: {summary['callable_count']}",
        f"- Public entry surface (roots): {summary['root_count']}",
        f"- Reachable from the entry surface: {summary['reachable_count']}",
        f"- **Dead** (private, never reached): {summary['dead_count']}",
        f"- **Clone groups** (duplicated structure): {summary['clone_group_count']}",
        f"- **Load-bearing** (hubs and chokepoints): {summary['load_bearing_count']}",
        f"- Pass-through wrappers: {summary['wrapper_count']}",
        f"- Layering violations: {summary['layer_violation_count']}",
        f"- Circular imports: {payload['overview']['circular_import_count']}",
        "",
        "## Dead Code",
        "",
        "Private callables not reachable from any public entry point.",
        "",
    ]
    dead = [node for node in model["nodes"] if node["dead"]]
    lines.extend(_node_lines(dead, lambda node: f"`{node['qualified_name']}` ({node['file_id']}:{node['line_start']})"))

    lines.extend(["", "## Clone Groups", "", "Functions sharing an identical structural fingerprint.", ""])
    if model["clones"]:
        for group in model["clones"]:
            scope = "cross-module" if group["cross_module"] else "same-module"
            members = ", ".join(f"`{node_by_id.get(mid, {}).get('qualified_name', mid)}`" for mid in group["members"])
            lines.append(f"- {len(group['members'])}× {scope}: {members}")
    else:
        lines.append("- None")

    lines.extend(["", "## Load-Bearing Functions", "", "Hubs many functions depend on, or chokepoints linking parts of the graph.", ""])
    load_bearing = sorted(
        (node for node in model["nodes"] if node["load_bearing"]),
        key=lambda node: (-node["fan_in"], node["id"]),
    )

    def _reason(node):
        marks = []
        if node["is_hub"]:
            marks.append(f"hub, fan-in {node['fan_in']}")
        if node["is_orchestrator"]:
            marks.append(f"orchestrator, fan-out {node['fan_out']}")
        return f"`{node['qualified_name']}` ({'; '.join(marks)})"

    lines.extend(_node_lines(load_bearing, _reason))

    lines.extend(["", "## Layering Violations", "", "Pairs of layers that depend on each other (mutual coupling).", ""])
    if model["layer_violations"]:
        for item in model["layer_violations"]:
            left, right = item["layers"]
            lines.append(f"- `{left}` <-> `{right}`")
    else:
        lines.append("- None")

    lines.extend(["", "## Circular Imports", ""])
    cycles = payload["overview"]["circular_imports"]
    if cycles:
        for cycle in cycles:
            lines.append(f"- {' -> '.join(cycle)}")
    else:
        lines.append("- None")
    lines.append("")
    return "\n".join(lines)


def _node_lines(nodes: list[dict], formatter, limit: int = 25) -> list[str]:
    if not nodes:
        return ["- None"]
    lines = [f"- {formatter(node)}" for node in nodes[:limit]]
    if len(nodes) > limit:
        lines.append(f"- ... and {len(nodes) - limit} more")
    return lines
