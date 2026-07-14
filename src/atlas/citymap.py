from __future__ import annotations

import math
from collections import defaultdict
from pathlib import Path
from typing import Any

from atlas.analyzer.discovery import discover_files, resolve_analysis_root


ROOT_RECT = {"x": 0.0, "z": 0.0, "w": 120.0, "d": 120.0}
_BINARY_EXTENSIONS = {
    ".gif",
    ".gz",
    ".ico",
    ".jpeg",
    ".jpg",
    ".mp3",
    ".mp4",
    ".mov",
    ".otf",
    ".pdf",
    ".png",
    ".tgz",
    ".ttf",
    ".webp",
    ".woff",
    ".woff2",
    ".zip",
}
_RISK_ORDER = {"neutral": 0, "elevated": 1, "severe": 2}
_ELEVATED_WARNING_TYPES = {"large_loc", "many_outgoing", "unresolved_calls"}


def build_citymap(
    root: str | Path,
    *,
    files: list[dict[str, Any]] | None = None,
    symbols: list[dict[str, Any]] | None = None,
    calls: list[dict[str, Any]] | None = None,
    warnings: list[dict[str, Any]] | None = None,
    model: dict[str, Any] | None = None,
    functionalities: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    """Build a deterministic repository treemap with optional analysis facts.

    The filesystem remains the source of visible files. Analysis only enriches
    code files that Atlas parsed, so documentation and binary assets never gain
    invented structural facts.
    """
    root_path = resolve_analysis_root(root)
    analysis_model = model or {}
    facts_by_path = _analysis_facts(
        files or [],
        symbols or [],
        calls or [],
        warnings or [],
        analysis_model,
        functionalities or [],
    )
    records = []
    for rel_path in discover_files(root_path):
        try:
            record = _inspect_file(root_path, rel_path)
            record["facts"] = facts_by_path.get(rel_path, _non_code_facts())
            records.append(record)
        except OSError:
            continue

    records.sort(key=lambda item: item["path"])
    for index, file in enumerate(records):
        file["id"] = index

    tree = _build_tree(records)
    dirs: list[dict[str, Any]] = []
    _layout_node(tree, dict(ROOT_RECT), records, dirs)
    summary = _summary(tree["facts"], analysis_model)
    return {
        "version": 2,
        "files": records,
        "dirs": dirs,
        "summary": summary,
        "layout": {
            "algorithm": "squarified-treemap-v2",
            "weight": "sqrt(max(code_loc, 16)); non-code files use text and byte fallback",
            "root_rect": dict(ROOT_RECT),
            "root_content_rect": dict(ROOT_RECT),
        },
    }


def _analysis_facts(
    files: list[dict[str, Any]],
    symbols: list[dict[str, Any]],
    calls: list[dict[str, Any]],
    warnings: list[dict[str, Any]],
    model: dict[str, Any],
    functionalities: list[dict[str, Any]],
) -> dict[str, dict[str, Any]]:
    files_by_id = {file["id"]: file for file in files}
    callable_symbols = [
        symbol for symbol in symbols if symbol["kind"] in {"function", "method"}
    ]
    symbols_by_file: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for symbol in callable_symbols:
        symbols_by_file[symbol["file_id"]].append(symbol)

    warnings_by_file: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for warning in warnings:
        if warning.get("file_id") in files_by_id:
            warnings_by_file[warning["file_id"]].append(warning)

    unresolved_by_symbol: dict[str, int] = defaultdict(int)
    for call in calls:
        if call["kind"] == "unresolved":
            unresolved_by_symbol[call["source"]] += 1

    nodes_by_id = {node["id"]: node for node in model.get("nodes", [])}
    clone_groups_by_symbol: dict[str, set[str]] = defaultdict(set)
    for group in model.get("clones", []):
        group_id = f"clone:{group['hash']}"
        for symbol_id in group["members"]:
            clone_groups_by_symbol[symbol_id].add(group_id)

    functionality_ids_by_symbol: dict[str, set[str]] = defaultdict(set)
    for functionality in functionalities:
        if functionality["status"] != "accepted":
            continue
        for symbol_id in functionality["member_ids"]:
            functionality_ids_by_symbol[symbol_id].add(functionality["id"])

    facts_by_path = {}
    for file in files:
        file_symbols = sorted(symbols_by_file[file["id"]], key=lambda symbol: symbol["id"])
        file_warnings = warnings_by_file[file["id"]]
        facts_by_path[file["path"]] = _code_facts(
            file,
            file_symbols,
            file_warnings,
            nodes_by_id,
            clone_groups_by_symbol,
            functionality_ids_by_symbol,
            unresolved_by_symbol,
        )
    return facts_by_path


def _code_facts(
    file: dict[str, Any],
    symbols: list[dict[str, Any]],
    warnings: list[dict[str, Any]],
    nodes_by_id: dict[str, dict[str, Any]],
    clone_groups_by_symbol: dict[str, set[str]],
    functionality_ids_by_symbol: dict[str, set[str]],
    unresolved_by_symbol: dict[str, int],
) -> dict[str, Any]:
    symbol_ids = [symbol["id"] for symbol in symbols]
    warning_types = sorted({warning["type"] for warning in warnings})
    dead_count = sum(bool(nodes_by_id.get(symbol_id, {}).get("dead")) for symbol_id in symbol_ids)
    load_bearing_count = sum(
        bool(nodes_by_id.get(symbol_id, {}).get("load_bearing")) for symbol_id in symbol_ids
    )
    clone_group_ids = sorted(
        {group_id for symbol_id in symbol_ids for group_id in clone_groups_by_symbol[symbol_id]}
    )
    functionality_ids = sorted(
        {
            functionality_id
            for symbol_id in symbol_ids
            for functionality_id in functionality_ids_by_symbol[symbol_id]
        }
    )
    large_function_loc = max(
        (symbol["loc"] for symbol in symbols if "large_loc" in symbol["warnings"]),
        default=0,
    )
    unresolved_calls = sum(unresolved_by_symbol[symbol_id] for symbol_id in symbol_ids)
    return {
        "kind": "code",
        "code_loc": file["loc"],
        "callable_count": len(symbols),
        "callable_ids": symbol_ids,
        "class_count": file["class_count"],
        "is_test": file["is_test"],
        "warning_count": len(warnings),
        "warning_types": warning_types,
        "unresolved_calls": unresolved_calls,
        "dead_function_count": dead_count,
        "clone_group_ids": clone_group_ids,
        "load_bearing_function_count": load_bearing_count,
        "large_function_loc": large_function_loc,
        "functionality_ids": functionality_ids,
        # The model identifies coupled layers, not the files that caused them.
        "layer_violation_ids": [],
        "risk": _risk(warnings, dead_count, clone_group_ids, large_function_loc),
    }


def _non_code_facts() -> dict[str, Any]:
    return {"kind": "non-code", "risk": "neutral"}


def _risk(
    warnings: list[dict[str, Any]],
    dead_count: int,
    clone_group_ids: list[str],
    large_function_loc: int,
) -> str:
    if any(warning["severity"] == "error" for warning in warnings):
        return "severe"
    if (
        dead_count
        or clone_group_ids
        or large_function_loc
        or any(warning["type"] in _ELEVATED_WARNING_TYPES for warning in warnings)
    ):
        return "elevated"
    return "neutral"


def _inspect_file(root: Path, rel_path: str) -> dict[str, Any]:
    path = root / rel_path
    size = path.stat().st_size
    lines = 1
    if size == 0:
        lines = 0
    elif not _is_binary_like(path):
        lines = _count_lines(path)
    directory = Path(rel_path).parent.as_posix()
    return {
        "id": 0,
        "path": rel_path,
        "dir": "" if directory == "." else directory,
        "lines": lines,
        "bytes": size,
        "lang": _language_for_path(rel_path),
        "rect": dict(ROOT_RECT),
    }


def _is_binary_like(path: Path) -> bool:
    if path.suffix.lower() in _BINARY_EXTENSIONS:
        return True
    with path.open("rb") as handle:
        sample = handle.read(8192)
    return b"\0" in sample


def _count_lines(path: Path) -> int:
    lines = 0
    has_bytes = False
    last = b""
    with path.open("rb") as handle:
        while chunk := handle.read(64 * 1024):
            has_bytes = True
            last = chunk[-1:]
            lines += chunk.count(b"\n")
    if has_bytes and last != b"\n":
        lines += 1
    return lines


def _language_for_path(path: str) -> str:
    extension = Path(path).suffix.lower().lstrip(".")
    return {
        "go": "go",
        "html": "html",
        "js": "javascript",
        "jsx": "javascript",
        "json": "json",
        "md": "markdown",
        "mdx": "markdown",
        "py": "python",
        "ts": "typescript",
        "tsx": "typescript",
        "yml": "yaml",
        "yaml": "yaml",
    }.get(extension, extension or "text")


def _build_tree(files: list[dict[str, Any]]) -> dict[str, Any]:
    root = _directory_node("", "")
    for index, file in enumerate(files):
        parts = [part for part in file["path"].split("/") if part]
        current = root
        for part in parts[:-1]:
            child = current["children"].get(part)
            if child is None:
                path = f"{current['path']}/{part}".strip("/")
                child = _directory_node(part, path)
                current["children"][part] = child
            current = child
        current["files"].append(index)
    _compute_weight(root, files)
    return root


def _directory_node(name: str, path: str) -> dict[str, Any]:
    return {
        "name": name,
        "path": path,
        "children": {},
        "files": [],
        "weight": 0.0,
        "file_count": 0,
        "lines": 0,
        "facts": _empty_directory_facts(),
        "rect": dict(ROOT_RECT),
    }


def _compute_weight(node: dict[str, Any], files: list[dict[str, Any]]) -> float:
    node["weight"] = sum(_file_weight(files[index]) for index in node["files"])
    node["file_count"] = len(node["files"])
    node["lines"] = sum(files[index]["lines"] for index in node["files"])
    facts = _rollup_facts([files[index]["facts"] for index in node["files"]])
    for child in _sorted_children(node["children"]):
        _compute_weight(child, files)
        node["weight"] += child["weight"]
        node["file_count"] += child["file_count"]
        node["lines"] += child["lines"]
        facts = _merge_directory_facts(facts, child["facts"])
    node["facts"] = facts
    node["weight"] = max(node["weight"], 1.0)
    return node["weight"]


def _layout_node(
    node: dict[str, Any],
    rect: dict[str, float],
    files: list[dict[str, Any]],
    dirs: list[dict[str, Any]],
) -> None:
    node["rect"] = rect
    content_rect = _content_rect(rect, bool(node["path"]))
    if node["path"]:
        dirs.append(
            {
                "path": node["path"],
                "depth": len(node["path"].split("/")),
                "rect": dict(rect),
                "header_rect": _header_rect(rect),
                "content_rect": content_rect,
                "file_count": node["file_count"],
                "lines": node["lines"],
                "facts": node["facts"],
            }
        )

    items = [
        {"name": child["name"], "kind": "dir", "node": child, "weight": child["weight"]}
        for child in _sorted_children(node["children"])
    ]
    items.extend(
        {
            "name": files[index]["path"],
            "kind": "file",
            "index": index,
            "weight": _file_weight(files[index]),
        }
        for index in node["files"]
    )
    items.sort(key=lambda item: (-item["weight"], item["name"]))
    total = sum(item["weight"] for item in items)
    if total <= 0:
        return
    scale = content_rect["w"] * content_rect["d"] / total
    for item in items:
        item["area"] = item["weight"] * scale

    for item, item_rect in _squarify(content_rect, items):
        item_rect = _inset(_cap_aspect(item_rect, 40.0), 0.08)
        if item["kind"] == "dir":
            _layout_node(item["node"], item_rect, files, dirs)
        else:
            files[item["index"]]["rect"] = item_rect


def _sorted_children(children: dict[str, dict[str, Any]]) -> list[dict[str, Any]]:
    return [children[name] for name in sorted(children)]


def _file_weight(file: dict[str, Any]) -> float:
    facts = file["facts"]
    if facts["kind"] == "code":
        units = max(float(facts["code_loc"]), 16.0)
    else:
        units = max(float(file["lines"]), float(file["bytes"]) / 4096.0, 4.0)
    return math.sqrt(units)


def _empty_directory_facts() -> dict[str, Any]:
    return {
        "code_file_count": 0,
        "test_file_count": 0,
        "flagged_file_count": 0,
        "code_loc": 0,
        "callable_count": 0,
        "class_count": 0,
        "warning_count": 0,
        "warning_types": [],
        "unresolved_calls": 0,
        "dead_function_count": 0,
        "clone_group_ids": [],
        "load_bearing_function_count": 0,
        "large_function_loc": 0,
        "functionality_ids": [],
        "layer_violation_ids": [],
        "risk": "neutral",
    }


def _rollup_facts(file_facts: list[dict[str, Any]]) -> dict[str, Any]:
    facts = _empty_directory_facts()
    for file in file_facts:
        if file["kind"] != "code":
            continue
        facts["code_file_count"] += 1
        facts["test_file_count"] += int(file["is_test"])
        facts["flagged_file_count"] += int(file["risk"] != "neutral")
        facts["code_loc"] += file["code_loc"]
        facts["callable_count"] += file["callable_count"]
        facts["class_count"] += file["class_count"]
        facts["warning_count"] += file["warning_count"]
        facts["warning_types"] = sorted(set(facts["warning_types"]) | set(file["warning_types"]))
        facts["unresolved_calls"] += file["unresolved_calls"]
        facts["dead_function_count"] += file["dead_function_count"]
        facts["clone_group_ids"] = sorted(
            set(facts["clone_group_ids"]) | set(file["clone_group_ids"])
        )
        facts["load_bearing_function_count"] += file["load_bearing_function_count"]
        facts["large_function_loc"] = max(
            facts["large_function_loc"], file["large_function_loc"]
        )
        facts["functionality_ids"] = sorted(
            set(facts["functionality_ids"]) | set(file["functionality_ids"])
        )
        facts["layer_violation_ids"] = sorted(
            set(facts["layer_violation_ids"]) | set(file["layer_violation_ids"])
        )
        facts["risk"] = _higher_risk(facts["risk"], file["risk"])
    return facts


def _merge_directory_facts(
    first: dict[str, Any], second: dict[str, Any]
) -> dict[str, Any]:
    merged = dict(first)
    for key in (
        "code_file_count",
        "test_file_count",
        "flagged_file_count",
        "code_loc",
        "callable_count",
        "class_count",
        "warning_count",
        "unresolved_calls",
        "dead_function_count",
        "load_bearing_function_count",
    ):
        merged[key] += second[key]
    for key in (
        "warning_types",
        "clone_group_ids",
        "functionality_ids",
        "layer_violation_ids",
    ):
        merged[key] = sorted(set(merged[key]) | set(second[key]))
    merged["large_function_loc"] = max(
        first["large_function_loc"], second["large_function_loc"]
    )
    merged["risk"] = _higher_risk(first["risk"], second["risk"])
    return merged


def _higher_risk(first: str, second: str) -> str:
    return first if _RISK_ORDER[first] >= _RISK_ORDER[second] else second


def _summary(facts: dict[str, Any], model: dict[str, Any]) -> dict[str, Any]:
    return {
        "total_loc": facts["code_loc"],
        "code_file_count": facts["code_file_count"],
        "flagged_file_count": facts["flagged_file_count"],
        "unresolved_calls": facts["unresolved_calls"],
        "load_bearing_functions": facts["load_bearing_function_count"],
        "layer_violation_count": len(model.get("layer_violations", [])),
    }


def _header_rect(rect: dict[str, float]) -> dict[str, float]:
    return {
        "x": rect["x"],
        "z": rect["z"],
        "w": rect["w"],
        "d": min(2.8, rect["d"] * 0.18),
    }


def _content_rect(rect: dict[str, float], has_header: bool) -> dict[str, float]:
    if not has_header:
        return dict(rect)
    header = _header_rect(rect)
    return {
        "x": rect["x"],
        "z": rect["z"] + header["d"],
        "w": rect["w"],
        "d": max(0.0, rect["d"] - header["d"]),
    }


def _squarify(
    rect: dict[str, float], items: list[dict[str, Any]]
) -> list[tuple[dict[str, Any], dict[str, float]]]:
    remaining = dict(rect)
    placed: list[tuple[dict[str, Any], dict[str, float]]] = []
    row: list[dict[str, Any]] = []
    for index, item in enumerate(items):
        side = min(remaining["w"], remaining["d"])
        candidate = row + [item]
        if (
            len(row) < 2
            or index == len(items) - 1
            or _worst_aspect(candidate, side) <= _worst_aspect(row, side)
        ):
            row = candidate
            continue
        row_placed, remaining = _layout_row(remaining, row)
        placed.extend(row_placed)
        row = [item]
    if row:
        row_placed, _ = _layout_row(remaining, row)
        placed.extend(row_placed)
    return placed


def _worst_aspect(row: list[dict[str, Any]], side: float) -> float:
    if not row or side <= 0:
        return math.inf
    total = sum(item["area"] for item in row)
    smallest = min(item["area"] for item in row)
    largest = max(item["area"] for item in row)
    if total <= 0 or smallest <= 0:
        return math.inf
    side_squared = side * side
    total_squared = total * total
    return max(side_squared * largest / total_squared, total_squared / (side_squared * smallest))


def _layout_row(
    rect: dict[str, float], row: list[dict[str, Any]]
) -> tuple[list[tuple[dict[str, Any], dict[str, float]]], dict[str, float]]:
    total = sum(item["area"] for item in row)
    if total <= 0:
        return [], rect
    placed: list[tuple[dict[str, Any], dict[str, float]]] = []
    remaining = dict(rect)
    if rect["w"] >= rect["d"]:
        row_depth = total / rect["w"]
        x = rect["x"]
        for index, item in enumerate(row):
            width = item["area"] / row_depth
            if index == len(row) - 1:
                width = rect["x"] + rect["w"] - x
            placed.append((item, {"x": x, "z": rect["z"], "w": width, "d": row_depth}))
            x += width
        remaining["z"] += row_depth
        remaining["d"] -= row_depth
    else:
        row_width = total / rect["d"]
        z = rect["z"]
        for index, item in enumerate(row):
            depth = item["area"] / row_width
            if index == len(row) - 1:
                depth = rect["z"] + rect["d"] - z
            placed.append((item, {"x": rect["x"], "z": z, "w": row_width, "d": depth}))
            z += depth
        remaining["x"] += row_width
        remaining["w"] -= row_width
    remaining["w"] = max(remaining["w"], 0.0)
    remaining["d"] = max(remaining["d"], 0.0)
    return placed, remaining


def _cap_aspect(rect: dict[str, float], max_ratio: float) -> dict[str, float]:
    if rect["w"] <= 0 or rect["d"] <= 0:
        return rect
    if rect["w"] / rect["d"] > max_ratio:
        width = rect["d"] * max_ratio
        rect["x"] += (rect["w"] - width) / 2
        rect["w"] = width
    elif rect["d"] / rect["w"] > max_ratio:
        depth = rect["w"] * max_ratio
        rect["z"] += (rect["d"] - depth) / 2
        rect["d"] = depth
    return rect


def _inset(rect: dict[str, float], padding: float) -> dict[str, float]:
    if rect["w"] > padding * 2:
        rect["x"] += padding
        rect["w"] -= padding * 2
    if rect["d"] > padding * 2:
        rect["z"] += padding
        rect["d"] -= padding * 2
    return rect
