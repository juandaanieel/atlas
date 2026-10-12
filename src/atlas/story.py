from __future__ import annotations

import json
import re
from collections import Counter, deque
from collections.abc import Mapping
from pathlib import Path

from atlas.analyzer.model import HUB_FAN_IN, ORCHESTRATOR_FAN_OUT
from atlas.analyzer.snapshot import AnalysisSnapshot
from atlas.output import checked_output_path, ensure_output_dir


STORY_VERSION = 2
FOCUS_VERSION = 1
AUTHORING_FILE = "atlas-story.json"
FOCUS_FILE = "atlas-focus.json"
OUTPUT_FILE = "atlas-story.json"
# Package map, entry surface, state, review pressure and four signal chapters
# leave twelve of the twenty chapters for focus items.
MAX_FOCUS_ITEMS = 12

_STORY_KEYS = {"story_version", "snapshot_id", "title", "summary", "chapters"}
_CHAPTER_KEYS = {"id", "kind", "title", "body", "view", "evidence"}
_CHAPTER_KINDS = {"chapter", "pipeline", "signal"}
_VIEW_KEYS = {
    "scope",
    "level",
    "unfold",
    "camera",
    "signal",
    "pipeline_root",
    "context",
    "structure",
    "cross_file",
    "selection",
    "source",
    "object",
    "trace_start",
    "trace_end",
}
_CONTEXT_VALUES = {"0", "1", "2", "all"}
_LEVELS = {"package", "module", "function"}
_CAMERAS = {"axonometric", "plan", "elevation"}
_SIGNALS = {"dead", "clones", "load_bearing", "import_cycles"}
_FOCUS_KEYS = {"focus_version", "items"}
_CHAPTER_ID = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def build_story(snapshot: AnalysisSnapshot | Mapping, focus: Mapping | None = None) -> dict:
    """Build a deterministic reading guide from Atlas's structural facts.

    The pipeline chapters walk the focus file's items in the author's order;
    without a focus file they walk at most three exported roots, those exported
    nearest the top-level package first, then the widest.
    """
    document = _snapshot_document(snapshot)
    if focus is not None:
        validate_focus(focus, document)
    package_name = document["package_name"]
    functions = document["architecture"]["functions"]
    outgoing = _call_map(document["model"])
    entries = _entry_points(document, outgoing)
    pipelines = document["architecture"]["pipelines"]
    fallback_entry = _entry_function(functions, pipelines[0] if pipelines else None)
    connected = _most_connected_function(functions)

    exported = bool(entries)
    if focus is not None:
        walks = [_focus_chapter(document, outgoing, item) for item in focus["items"]]
        walked = f"{_count(len(walks), 'focus item')} from {FOCUS_FILE}"
    else:
        walks = [
            _root_chapter(document, outgoing, pipeline, exported)
            for pipeline in _default_pipelines(document, exported)
        ]
        walked = _count(len(walks), "exported pipeline" if exported else "public pipeline")
    signals = _signal_chapters(document)
    chapters = [
        _package_chapter(document, entries, fallback_entry),
        _entry_chapter(package_name, entries, fallback_entry),
        *walks,
        _responsibility_chapter(_most_stateful_object(document["objects"]), connected),
        _review_chapter(document, _review_target(document), connected),
        *signals,
    ]
    _make_ids_distinct(chapters)
    story = {
        "story_version": STORY_VERSION,
        "snapshot_id": document["snapshot_id"],
        "title": f"{package_name} reading guide",
        "summary": (
            f"A reading path through {package_name} from its entry surface inward: "
            + _join(
                ["its map and entry surface"]
                + ([walked] if walks else [])
                + ["state and collaboration", "review pressure"]
                + ([_count(len(signals), "signal chapter")] if signals else [])
            )
            + "."
        ),
        "chapters": chapters,
    }
    validate_story(story, document)
    return story


def story_for_snapshot(root: str | Path, snapshot: AnalysisSnapshot | Mapping) -> dict:
    """Load an authored project story, or build the default guide and its focus."""
    folder = Path(root).expanduser().resolve()
    authored_path = folder / AUTHORING_FILE
    if authored_path.exists():
        return load_story(authored_path, snapshot)
    focus_path = folder / FOCUS_FILE
    focus = None
    if focus_path.exists():
        focus = _read_json(focus_path, "focus")
        validate_focus(focus, snapshot)
    return build_story(snapshot, focus)


def load_story(path: str | Path, snapshot: AnalysisSnapshot | Mapping) -> dict:
    """Load and validate a story against the exact snapshot it describes."""
    story = _read_json(path, "story")
    validate_story(story, snapshot)
    return story


def _read_json(path: str | Path, label: str) -> object:
    file_path = Path(path).expanduser()
    if file_path.is_symlink():
        raise ValueError(f"Refusing to read symlinked Atlas {label}: {file_path}")
    try:
        return json.loads(file_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        raise ValueError(f"Atlas {label} is not valid JSON: {file_path}") from error


def write_story(
    root: str | Path,
    snapshot: AnalysisSnapshot | Mapping,
    story: Mapping | None = None,
) -> Path:
    """Write the validated story beside the canonical Atlas snapshot."""
    document = dict(story) if story is not None else story_for_snapshot(root, snapshot)
    validate_story(document, snapshot)
    output_path = checked_output_path(ensure_output_dir(root), OUTPUT_FILE)
    output_path.write_text(json.dumps(document, indent=2) + "\n", encoding="utf-8")
    return output_path


def validate_focus(focus: object, snapshot: AnalysisSnapshot | Mapping) -> None:
    """Validate that every focus item names a call-map function, method or class."""
    if not isinstance(focus, Mapping):
        raise ValueError("Atlas focus must contain an object")
    _require_exact_keys(focus, _FOCUS_KEYS, "Atlas focus")
    if focus["focus_version"] != FOCUS_VERSION:
        raise ValueError(
            f"Unsupported Atlas focus version: {focus['focus_version']} (expected {FOCUS_VERSION})"
        )
    items = focus["items"]
    if not isinstance(items, list) or not items:
        raise ValueError("Atlas focus items must be a non-empty list")
    if len(items) > MAX_FOCUS_ITEMS:
        raise ValueError(f"Atlas focus cannot contain more than {MAX_FOCUS_ITEMS} items")
    document = _snapshot_document(snapshot)
    known = {item["id"] for item in document["model"]["nodes"]} | {
        item["id"] for item in document["objects"]
    }
    seen = set()
    for index, item in enumerate(items, start=1):
        label = f"Atlas focus item {index}"
        if not isinstance(item, Mapping):
            raise ValueError(f"{label} must contain an object")
        _require_exact_keys(item, {"id", "note"} if "note" in item else {"id"}, label)
        _require_reference(item["id"], known, f"{label} id")
        if "note" in item:
            _require_text(item["note"], f"{label} note")
        if item["id"] in seen:
            raise ValueError(f"Atlas focus item is duplicated: {item['id']}")
        seen.add(item["id"])


def validate_story(story: Mapping, snapshot: AnalysisSnapshot | Mapping) -> None:
    """Validate story shape and every reference used to drive the explorer."""
    if not isinstance(story, Mapping):
        raise ValueError("Atlas story must contain an object")
    _require_exact_keys(story, _STORY_KEYS, "Atlas story")
    if story["story_version"] != STORY_VERSION:
        raise ValueError(
            f"Unsupported Atlas story version: {story['story_version']} (expected {STORY_VERSION})"
        )

    document = _snapshot_document(snapshot)
    if story["snapshot_id"] != document["snapshot_id"]:
        raise ValueError(
            "Atlas story targets a different snapshot: "
            f"{story['snapshot_id']} (current {document['snapshot_id']})"
        )
    _require_text(story["title"], "Atlas story title")
    _require_text(story["summary"], "Atlas story summary")

    chapters = story["chapters"]
    if not isinstance(chapters, list) or not chapters:
        raise ValueError("Atlas story chapters must be a non-empty list")
    if len(chapters) > 20:
        raise ValueError("Atlas story cannot contain more than 20 chapters")

    references = _story_references(document)
    chapter_ids = set()
    for index, chapter in enumerate(chapters, start=1):
        label = f"Atlas story chapter {index}"
        if not isinstance(chapter, Mapping):
            raise ValueError(f"{label} must contain an object")
        _require_exact_keys(chapter, _CHAPTER_KEYS, label)
        _require_text(chapter["id"], f"{label} id")
        if not _CHAPTER_ID.fullmatch(chapter["id"]):
            raise ValueError(f"{label} id must be lowercase and hyphenated")
        if chapter["id"] in chapter_ids:
            raise ValueError(f"Atlas story chapter id is duplicated: {chapter['id']}")
        chapter_ids.add(chapter["id"])
        _require_text(chapter["title"], f"{label} title")
        _require_text(chapter["body"], f"{label} body")
        _validate_view(chapter["view"], references, label)
        _validate_kind(chapter["kind"], chapter["view"], label)
        _validate_evidence(chapter["evidence"], references, label)


def _package_chapter(document: dict, entries: list[dict], fallback: dict | None) -> dict:
    overview = document["overview"]
    body = (
        f"{document['package_name']} is a Python package of "
        f"{_count(overview['module_count'], 'module')} and "
        f"{_count(overview['function_count'] + overview['method_count'], 'callable symbol')}"
        f" (tests included); its call map holds "
        f"{_count(len(document['model']['nodes']), 'non-test function')}."
    )
    if entries:
        body += (
            f" It exports {_count(len(entries), 'entry point')} through package __init__ files,"
            f" among them {_join([entry['label'] for entry in entries[:3]])}."
        )
        evidence = [entry["id"] for entry in entries[:3]]
    else:
        roots = document["model"]["summary"]["root_count"]
        body += (
            " It exports nothing through __all__ or package re-exports; its entry surface is "
            f"{_count(roots, 'public callable')} without an internal caller."
        )
        evidence = _evidence(fallback)
    return {
        "id": "package-map",
        "kind": "chapter",
        "title": "Package map",
        "body": body,
        "view": {
            "scope": "",
            "level": "package",
            "camera": "axonometric",
            "structure": False,
            "cross_file": False,
        },
        "evidence": evidence,
    }


def _entry_chapter(package_name: str, entries: list[dict], fallback: dict | None) -> dict:
    if entries:
        first = entries[0]
        functions = sum(1 for entry in entries if entry["kind"] == "function")
        packages = sorted({module for entry in entries for module in entry["exported_from"]})
        body = (
            f"{package_name} exports {_count(functions, 'function')} and "
            f"{_count(len(entries) - functions, 'class', 'classes')} from "
            f"{_count(len(packages), 'package')}: {_join(packages)}. Nearest the top level, the "
            f"widest is {first['label']} (exported from {_join(first['exported_from'])}): it "
            f"reaches {_count(len(first['reach']), 'function')}."
        )
        if first["docstring_summary"] != "No docstring":
            body += f" {_sentence(first['docstring_summary'])}"
        view = {
            "scope": "",
            "level": "module",
            "camera": "elevation",
            "context": "0",
            "structure": True,
            "cross_file": False,
        }
        if first["root"]:
            view["selection"] = first["root"]
        view["source"] = first["id"]
        return {
            "id": "entry-surface",
            "kind": "chapter",
            "title": "Entry surface",
            "body": body,
            "view": view,
            "evidence": [entry["id"] for entry in entries[:12]],
        }
    if fallback is None:
        return {
            "id": "entry-surface",
            "kind": "chapter",
            "title": "Entry surface",
            "body": f"Atlas found no callable entry point in {package_name}.",
            "view": {"scope": "", "level": "package", "structure": False, "cross_file": False},
            "evidence": [],
        }
    return {
        "id": "entry-surface",
        "kind": "chapter",
        "title": "Entry surface",
        "body": (
            "No __all__ or re-exports; the entry surface is every public function without an "
            f"internal caller. Start with {fallback['qualified_name']}. "
            f"{_sentence(fallback['role'])}"
        ),
        "view": {
            "scope": fallback["module"],
            "level": "module",
            "camera": "elevation",
            "structure": True,
            "cross_file": False,
            "selection": fallback["id"],
            "source": fallback["id"],
        },
        "evidence": [fallback["id"]],
    }


def _focus_chapter(document: dict, outgoing: dict[str, list[str]], item: Mapping) -> dict:
    subject = _subject(document, item["id"])
    lead = [item["note"]] if "note" in item else []
    if subject["docstring_summary"] != "No docstring":
        lead.append(subject["docstring_summary"])
    if subject["root"] is None:
        return {
            "id": f"pipeline-{_slug(subject['label'])}",
            "kind": "chapter",
            "title": subject["label"],
            "body": " ".join(
                [_sentence(text) for text in lead]
                + ["Atlas analysed no constructor for this class, so the chapter opens it."]
            ),
            "view": {
                "scope": "",
                "level": "function",
                "camera": "elevation",
                "structure": True,
                "cross_file": True,
                "object": subject["id"],
                "source": subject["id"],
            },
            "evidence": [subject["id"]],
        }
    return _walk_chapter(document, outgoing, subject, lead, subject["root_label"])


def _root_chapter(
    document: dict, outgoing: dict[str, list[str]], pipeline: dict, exported: bool
) -> dict:
    subject = _subject(document, pipeline["root"])
    lead = [subject["docstring_summary"]] if subject["docstring_summary"] != "No docstring" else []
    if exported:
        lead.append(
            f"This chapter walks {subject['label']}, an entry point exported from "
            f"{_join(subject['exported_from'])}"
        )
    else:
        lead.append(
            f"This chapter walks {subject['label']}, a public callable without an internal caller"
        )
    return _walk_chapter(document, outgoing, subject, lead, "it")


def _walk_chapter(
    document: dict, outgoing: dict[str, list[str]], subject: dict, lead: list[str], start: str
) -> dict:
    """A pipeline chapter: everything the subject's root reaches, traced to its farthest end."""
    root = subject["root"]
    reach = _reach(outgoing, root)
    farthest = sorted(reach, key=lambda item: (-reach[item], item))[0]
    function_by_id = _function_by_id(document)
    if farthest == root:
        walk = f"{function_by_id[root]['qualified_name']} makes no resolved call into the package."
    else:
        modules = {function_by_id[item]["module"] for item in reach}
        walk = (
            f"From {start}, Atlas reaches "
            f"{_count(len(reach), 'function')} in {_count(len(modules), 'module')}; the farthest "
            f"is {function_by_id[farthest]['qualified_name']}."
        )
    view = {
        "scope": "",
        "level": "module",
        "camera": "elevation",
        "pipeline_root": root,
        "context": "all",
        "structure": True,
        "cross_file": True,
        "selection": root,
        "source": subject["id"],
    }
    evidence = [subject["id"]]
    if farthest != root:
        view["trace_start"] = root
        view["trace_end"] = farthest
    if farthest != subject["id"]:
        evidence.append(farthest)
    return {
        "id": f"pipeline-{_slug(subject['label'])}",
        "kind": "pipeline",
        "title": subject["label"],
        "body": " ".join([_sentence(text) for text in lead] + [walk]),
        "view": view,
        "evidence": evidence,
    }


def _responsibility_chapter(stateful_object: dict | None, connected: dict | None) -> dict:
    if stateful_object is not None:
        method_count = len(stateful_object["methods"]["public"]) + len(
            stateful_object["methods"]["private"]
        )
        return {
            "id": "state-and-collaboration",
            "kind": "chapter",
            "title": "State and collaboration",
            "body": (
                f"{stateful_object['qualified_name']} is the strongest state-bearing class: "
                f"{_count(len(stateful_object['fields']), 'detected field')} and "
                f"{_count(method_count, 'method')}."
            ),
            "view": {
                "scope": stateful_object["module"],
                "level": "function",
                "unfold": [stateful_object["module"]],
                "camera": "elevation",
                "structure": True,
                "cross_file": True,
                "object": stateful_object["id"],
            },
            "evidence": [stateful_object["id"]],
        }
    if connected is not None:
        return {
            "id": "state-and-collaboration",
            "kind": "chapter",
            "title": "Shared responsibility",
            "body": (
                f"{connected['qualified_name']} has the widest resolved neighborhood, with "
                f"{_count(connected['fan_in'], 'caller')} and "
                f"{_count(connected['fan_out'], 'callee')}."
            ),
            "view": {
                "scope": connected["module"],
                "level": "module",
                "camera": "elevation",
                "structure": True,
                "cross_file": True,
                "selection": connected["id"],
                "source": connected["id"],
            },
            "evidence": [connected["id"]],
        }
    return {
        "id": "state-and-collaboration",
        "kind": "chapter",
        "title": "State and collaboration",
        "body": "Atlas found no classes or callable collaboration surface to inspect.",
        "view": {"scope": "", "level": "package", "structure": False, "cross_file": False},
        "evidence": [],
    }


def _review_chapter(document: dict, target: dict | None, connected: dict | None) -> dict:
    overview = document["overview"]
    body = (
        f"Atlas reports {_count(overview['dead_function_count'], 'dead function')}, "
        f"{_count(overview['clone_group_count'], 'clone group')}, "
        f"{_count(overview['load_bearing_count'], 'load-bearing function')} and "
        f"{_count(overview['circular_import_count'], 'import cycle')}; static analysis left "
        f"{_count(overview['unresolved_call_count'], 'call')} unresolved."
    )
    target = target or connected
    view = {"scope": "", "level": "package", "structure": False, "cross_file": False}
    evidence = []
    if target is not None:
        view = {
            "scope": target["module"],
            "level": "module",
            "camera": "elevation",
            "structure": True,
            "cross_file": True,
            "selection": target["id"],
            "source": target["id"],
        }
        evidence.append(target["id"])
        body += f" {target['qualified_name']} has the strongest current review signal."
    return {
        "id": "review-pressure",
        "kind": "chapter",
        "title": "Review pressure",
        "body": body,
        "view": view,
        "evidence": evidence,
    }


def _signal_chapters(document: dict) -> list[dict]:
    """One chapter per review signal that is present, each lighting its whole class."""
    model = document["model"]
    nodes = model["nodes"]
    chapters = []

    dead = sorted(node["id"] for node in nodes if node["dead"])
    if dead:
        per_module = Counter(node["module"] for node in nodes if node["dead"])
        by_module = [
            f"{module} ({per_module[module]})"
            for module in sorted(per_module, key=lambda module: (-per_module[module], module))
        ]
        one = len(dead) == 1
        chapters.append(
            _signal_chapter(
                "dead",
                "Dead code",
                f"{_count(len(dead), 'function')} {'is' if one else 'are'} dead: no call path from "
                f"the public surface reaches {'it' if one else 'them'}. By module: "
                f"{_join(_shortlist(by_module))}.",
                dead,
            )
        )

    clones = model["clones"]
    if clones:
        members = list(dict.fromkeys(member for group in clones for member in group["members"]))
        largest = clones[0]
        node_by_id = {node["id"]: node for node in nodes}
        modules = {node_by_id[member]["module"] for member in largest["members"]}
        chapters.append(
            _signal_chapter(
                "clones",
                "Clone groups",
                f"Atlas finds {_count(len(clones), 'clone group')}, "
                f"{_count(len(members), 'function')} in all; the members of a group share one "
                f"structure. The largest has {len(largest['members'])} copies of "
                f"{node_by_id[largest['members'][0]]['name']} in "
                f"{_count(len(modules), 'module')}.",
                members,
            )
        )

    load_bearing = sorted(
        (node for node in nodes if node["load_bearing"]),
        key=lambda node: (-node["fan_in"], -node["fan_out"], node["id"]),
    )
    if load_bearing:
        hubs = sum(1 for node in load_bearing if node["is_hub"])
        orchestrators = sum(1 for node in load_bearing if node["is_orchestrator"])
        chapters.append(
            _signal_chapter(
                "load_bearing",
                "Load-bearing functions",
                f"{_count(len(load_bearing), 'function')} "
                f"{'is' if len(load_bearing) == 1 else 'are'} load-bearing: "
                f"{_count(hubs, 'hub')} called from at least {HUB_FAN_IN} places and "
                f"{_count(orchestrators, 'orchestrator')} calling at least "
                f"{ORCHESTRATOR_FAN_OUT} others. The most called is "
                f"{load_bearing[0]['qualified_name']}, with "
                f"{_count(load_bearing[0]['fan_in'], 'caller')}.",
                [node["id"] for node in load_bearing],
            )
        )

    cycles = document["overview"]["circular_imports"]
    if cycles:
        chapter = _signal_chapter(
            "import_cycles",
            "Import cycles",
            f"Atlas finds {_count(len(cycles), 'import cycle')} between modules that import "
            "each other: "
            f"{'; '.join(' -> '.join(cycle) for cycle in cycles[:3])}"
            + (f"; and {len(cycles) - 3} more." if len(cycles) > 3 else "."),
            [],
        )
        chapter["view"]["camera"] = "plan"
        chapters.append(chapter)
    return chapters


def _signal_chapter(signal: str, title: str, body: str, evidence: list[str]) -> dict:
    return {
        "id": f"signal-{signal.replace('_', '-')}",
        "kind": "signal",
        "title": title,
        "body": body,
        "view": {
            "scope": "",
            "level": "module",
            "camera": "elevation",
            "signal": signal,
            "structure": True,
            "cross_file": True,
        },
        "evidence": evidence[:12],
    }


def _entry_points(document: dict, outgoing: dict[str, list[str]]) -> list[dict]:
    """Exported functions and classes, the shallowest export first, then the widest reach.

    A name the top-level package exports is the author's first promise to a
    user; reach alone would put a wide plotting helper ahead of the solver.
    """
    entries = [
        _subject(document, function["id"])
        for function in document["architecture"]["functions"]
        if function["exported"] and function["kind"] == "function"
    ] + [_subject(document, item["id"]) for item in document["objects"] if item["exported"]]
    for entry in entries:
        entry["reach"] = list(_reach(outgoing, entry["root"])) if entry["root"] else []
    return sorted(
        entries,
        key=lambda entry: (
            _export_depth(entry["exported_from"]),
            -len(entry["reach"]),
            entry["id"],
        ),
    )


def _subject(document: dict, item_id: str) -> dict:
    """A function, method or class with the callable a pipeline starts from."""
    function_by_id = _function_by_id(document)
    function = function_by_id.get(item_id)
    if function is not None:
        item, kind, root, root_label = function, function["kind"], item_id, _label(function)
    else:
        item = next(item for item in document["objects"] if item["id"] == item_id)
        constructor = function_by_id.get(item["constructor"]["method_id"])
        analysed = constructor is not None and constructor["in_static_map"]
        kind = "class"
        root = constructor["id"] if analysed else None
        root_label = _label(constructor) if analysed else None
    return {
        "id": item_id,
        "kind": kind,
        "label": _label(item),
        "docstring_summary": item["docstring_summary"],
        "exported_from": item["exported_from"],
        "root": root,
        "root_label": root_label,
    }


def _default_pipelines(document: dict, exported: bool) -> list[dict]:
    """At most three pipelines: exported roots by export depth, then reach."""
    function_by_id = _function_by_id(document)
    candidates = [
        pipeline
        for pipeline in document["architecture"]["pipelines"]
        if function_by_id[pipeline["root"]]["exported"] or not exported
    ]
    return sorted(
        candidates,
        key=lambda item: (
            _export_depth(function_by_id[item["root"]]["exported_from"]),
            -len(item["function_ids"]),
            item["root"],
        ),
    )[:3]


def _export_depth(packages: list[str]) -> int:
    """Package levels between a user and the name; zero when nothing exports it."""
    return min((len(package.split(".")) for package in packages), default=0)


def _entry_function(functions: list[dict], pipeline: dict | None) -> dict | None:
    by_id = {item["id"]: item for item in functions}
    if pipeline:
        return by_id[pipeline["root"]]
    mapped = [item for item in functions if item["in_static_map"]]
    root = min((item for item in mapped if item["is_root"]), key=lambda item: item["id"], default=None)
    return root or (mapped[0] if mapped else None)


def _most_connected_function(functions: list[dict]) -> dict | None:
    candidates = [item for item in functions if not item["is_test"]]
    if not candidates:
        return None
    return min(
        candidates,
        key=lambda item: (
            -(item["fan_in"] + item["fan_out"]),
            -item["fan_in"],
            -item["fan_out"],
            item["id"],
        ),
    )


def _most_stateful_object(objects: list[dict]) -> dict | None:
    candidates = [
        item
        for item in objects
        if item["fields"] or item["methods"]["public"] or item["methods"]["private"]
    ]
    if not candidates:
        return None
    return min(
        candidates,
        key=lambda item: (
            -len(item["fields"]),
            -(len(item["methods"]["public"]) + len(item["methods"]["private"])),
            item["id"],
        ),
    )


def _review_target(document: dict) -> dict | None:
    symbols = {item["id"]: item for item in document["symbols"]}
    candidates = [
        item
        for item in document["architecture"]["functions"]
        if not item["is_test"] and item["id"] in symbols
    ]
    if not candidates:
        return None

    def score(item: dict) -> tuple:
        symbol = symbols[item["id"]]
        metrics = symbol["metrics"]
        return (
            item["state"] == "dead",
            len(item["unresolved_calls"]),
            metrics["cognitive_complexity"],
            metrics["cyclomatic_complexity"],
            item["fan_in"] + item["fan_out"],
        )

    review_candidates = [
        item
        for item in candidates
        if item["state"] == "dead"
        or item["unresolved_calls"]
        or symbols[item["id"]]["metrics"]["cognitive_complexity"] > 15
        or symbols[item["id"]]["metrics"]["cyclomatic_complexity"] > 10
    ]
    if not review_candidates:
        return None
    return min(
        review_candidates,
        key=lambda item: tuple(-value for value in score(item)) + (item["id"],),
    )


def _call_map(model: dict) -> dict[str, list[str]]:
    """Resolved calls between call-map functions, as sorted adjacency lists."""
    nodes = {node["id"] for node in model["nodes"]}
    outgoing: dict[str, list[str]] = {node: [] for node in sorted(nodes)}
    for edge in model["edges"]:
        if edge["target"] in nodes:
            outgoing[edge["source"]].append(edge["target"])
    return {source: sorted(targets) for source, targets in outgoing.items()}


def _reach(outgoing: dict[str, list[str]], root: str) -> dict[str, int]:
    """Breadth-first call depth of every function the root reaches, root included."""
    distance = {root: 0}
    queue = deque([root])
    while queue:
        source = queue.popleft()
        for target in outgoing[source]:
            if target not in distance:
                distance[target] = distance[source] + 1
                queue.append(target)
    return distance


def _validate_view(view: object, references: dict, label: str) -> None:
    if not isinstance(view, Mapping) or not view:
        raise ValueError(f"{label} view must be a non-empty object")
    extra = sorted(set(view) - _VIEW_KEYS)
    if extra:
        raise ValueError(f"{label} view has unknown fields: {', '.join(extra)}")

    if "scope" in view:
        scope = view["scope"]
        if not isinstance(scope, str) or scope not in references["scopes"]:
            raise ValueError(f"{label} scope references an unknown Atlas path: {scope}")
    for key, allowed in (
        ("level", _LEVELS),
        ("camera", _CAMERAS),
        ("signal", _SIGNALS),
        ("context", _CONTEXT_VALUES),
    ):
        if key in view and view[key] not in allowed:
            raise ValueError(f"{label} {key} must be one of {sorted(allowed)}")
    if "unfold" in view:
        unfold = view["unfold"]
        if not isinstance(unfold, list) or len(unfold) != len(set(map(str, unfold))):
            raise ValueError(f"{label} unfold must be a list of distinct module ids")
        for module in unfold:
            _require_reference(module, references["modules"], f"{label} unfold")
    for key in ("structure", "cross_file"):
        if key in view and type(view[key]) is not bool:
            raise ValueError(f"{label} {key} must be a boolean")
    if view.get("cross_file") and not view.get("structure"):
        raise ValueError(f"{label} cross_file requires structure")
    for key in ("pipeline_root", "selection", "trace_start", "trace_end"):
        if key in view:
            _require_reference(view[key], references["nodes"], f"{label} {key}")
    if "source" in view:
        _require_reference(view["source"], references["symbols"], f"{label} source")
    if "object" in view:
        _require_reference(view["object"], references["objects"], f"{label} object")

    has_trace_start = "trace_start" in view
    has_trace_end = "trace_end" in view
    if has_trace_start != has_trace_end:
        raise ValueError(f"{label} trace requires both trace_start and trace_end")
    if has_trace_start and not _has_directed_path(
        references["edges"], view["trace_start"], view["trace_end"]
    ):
        raise ValueError(f"{label} trace endpoints have no resolved directed path")


def _validate_kind(kind: object, view: Mapping, label: str) -> None:
    if kind not in _CHAPTER_KINDS:
        raise ValueError(f"{label} kind must be one of {sorted(_CHAPTER_KINDS)}")
    if (kind == "signal") != ("signal" in view):
        raise ValueError(f"{label} view.signal belongs to, and is required by, a signal chapter")
    if kind == "pipeline" and "pipeline_root" not in view:
        raise ValueError(f"{label} pipeline chapter requires view.pipeline_root")


def _validate_evidence(evidence: object, references: dict, label: str) -> None:
    if not isinstance(evidence, list):
        raise ValueError(f"{label} evidence must be a list")
    if len(evidence) > 12:
        raise ValueError(f"{label} cannot contain more than 12 evidence references")
    known = references["symbols"] | references["objects"]
    for item in evidence:
        _require_reference(item, known, f"{label} evidence")
    if len(evidence) != len(set(evidence)):
        raise ValueError(f"{label} evidence contains duplicate references")


def _story_references(document: dict) -> dict:
    tree = document["model"]["tree"]
    scopes, modules = _tree_references(tree)
    return {
        "scopes": scopes,
        "modules": modules,
        "nodes": {item["id"] for item in document["model"]["nodes"]},
        "symbols": {item["id"] for item in document["symbols"]},
        "objects": {item["id"] for item in document["objects"]},
        "edges": document["model"]["edges"],
    }


def _tree_references(tree: dict) -> tuple[set[str], set[str]]:
    paths, modules, pending = set(), set(), [tree]
    while pending:
        node = pending.pop()
        paths.add(node["path"])
        if node["module"]:
            modules.add(node["module"])
        pending.extend(node["children"])
    return paths, modules


def _has_directed_path(edges: list[dict], start: str, end: str) -> bool:
    if start == end:
        return True
    outgoing: dict[str, list[str]] = {}
    for edge in edges:
        outgoing.setdefault(edge["source"], []).append(edge["target"])
    seen = {start}
    queue = deque([start])
    while queue:
        source = queue.popleft()
        for target in outgoing.get(source, []):
            if target == end:
                return True
            if target not in seen:
                seen.add(target)
                queue.append(target)
    return False


def _snapshot_document(snapshot: AnalysisSnapshot | Mapping) -> dict:
    return snapshot.to_dict() if isinstance(snapshot, AnalysisSnapshot) else dict(snapshot)


def _require_exact_keys(value: Mapping, expected: set[str], label: str) -> None:
    missing = sorted(expected - set(value))
    if missing:
        raise ValueError(f"{label} is missing required fields: {', '.join(missing)}")
    extra = sorted(set(value) - expected)
    if extra:
        raise ValueError(f"{label} has unknown fields: {', '.join(extra)}")


def _require_text(value: object, label: str) -> None:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{label} must be a non-empty string")


def _require_reference(value: object, known: set[str], label: str) -> None:
    _require_text(value, label)
    if value not in known:
        raise ValueError(f"{label} references an unknown Atlas id: {value}")


def _evidence(item: dict | None) -> list[str]:
    return [item["id"]] if item else []


def _function_by_id(document: dict) -> dict[str, dict]:
    return {item["id"]: item for item in document["architecture"]["functions"]}


def _label(item: dict) -> str:
    """The name a reader knows: ``name`` for a function, ``Class.name`` for a method."""
    return item["qualified_name"][len(item["module"]) + 1 :]


def _slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-") or "item"


def _make_ids_distinct(chapters: list[dict]) -> None:
    used: set[str] = set()
    for chapter in chapters:
        base, number = chapter["id"], 1
        while chapter["id"] in used:
            number += 1
            chapter["id"] = f"{base}-{number}"
        used.add(chapter["id"])


def _sentence(value: str) -> str:
    text = value.strip()
    return text if text.endswith((".", "!", "?")) else text + "."


def _shortlist(items: list[str], limit: int = 3) -> list[str]:
    return items if len(items) <= limit else items[:limit] + [f"{len(items) - limit} more"]


def _join(items: list[str]) -> str:
    return items[0] if len(items) == 1 else ", ".join(items[:-1]) + " and " + items[-1]


def _count(value: int, singular: str, plural: str | None = None) -> str:
    return f"{value} {singular if value == 1 else plural or singular + 's'}"
