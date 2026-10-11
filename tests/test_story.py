import copy
import json
from pathlib import Path
import shutil

import pytest

from atlas.analyzer.payload import analyze_path
from atlas.explorer.writer import render_explorer
from atlas.story import (
    FOCUS_FILE,
    STORY_VERSION,
    build_story,
    load_story,
    story_for_snapshot,
    validate_focus,
    validate_story,
    write_story,
)


FIXTURES = Path(__file__).parent / "fixtures"
FIXTURE_NAMES = sorted(path.name for path in FIXTURES.iterdir() if path.is_dir())


def _chapter(story, chapter_id):
    return next(chapter for chapter in story["chapters"] if chapter["id"] == chapter_id)


def _focus(*items):
    return {"focus_version": 1, "items": list(items)}


def test_default_story_is_a_five_chapter_snapshot_bound_guide():
    snapshot = analyze_path(FIXTURES / "simple_package")

    story = build_story(snapshot)

    assert story["story_version"] == STORY_VERSION
    assert story["snapshot_id"] == snapshot["snapshot_id"]
    assert [(chapter["id"], chapter["kind"]) for chapter in story["chapters"]] == [
        ("package-map", "chapter"),
        ("entry-surface", "chapter"),
        ("pipeline-main", "pipeline"),
        ("state-and-collaboration", "chapter"),
        ("review-pressure", "chapter"),
    ]
    assert story["chapters"][1]["view"]["source"] == "simple_pkg.a.main"
    assert story["chapters"][2]["view"]["trace_start"] == "simple_pkg.a.main"
    validate_story(story, snapshot)


@pytest.mark.parametrize("name", FIXTURE_NAMES)
def test_default_story_is_valid_for_every_fixture(name):
    snapshot = analyze_path(FIXTURES / name)

    validate_story(build_story(snapshot), snapshot)


def test_story_selects_the_strongest_state_bearing_class():
    snapshot = analyze_path(FIXTURES / "class_package")

    chapter = _chapter(build_story(snapshot), "state-and-collaboration")

    assert chapter["view"]["object"] == "class_pkg.runner.Runner"
    assert chapter["view"]["unfold"] == ["class_pkg.runner"]
    assert chapter["evidence"] == ["class_pkg.runner.Runner"]


def test_package_map_and_entry_surface_name_only_exported_symbols():
    snapshot = analyze_path(FIXTURES / "export_package")

    story = build_story(snapshot)
    package_map, entry = story["chapters"][:2]

    assert "It exports 4 entry points" in package_map["body"]
    assert "among them build, Engine and area." in package_map["body"]
    assert package_map["view"]["level"] == "package"
    assert entry["evidence"] == [
        "export_pkg.engine.build",
        "export_pkg.engine.Engine",
        "export_pkg.shapes.box.area",
        "export_pkg.shapes.box.Box",
    ]
    assert entry["body"].startswith("export_pkg exports 2 functions and 2 classes from 2 packages")
    assert "Nearest the top level, the widest is build (exported from export_pkg)" in entry["body"]
    assert "compile_inputs" not in package_map["body"] + entry["body"]


def test_entry_surface_says_when_the_package_exports_nothing():
    snapshot = analyze_path(FIXTURES / "simple_package")

    story = build_story(snapshot)

    assert "exports nothing through __all__ or package re-exports" in story["chapters"][0]["body"]
    assert story["chapters"][1]["body"].startswith(
        "No __all__ or re-exports; the entry surface is every public function without an "
        "internal caller. Start with simple_pkg.a.main."
    )


def test_default_pipelines_walk_exported_roots():
    snapshot = analyze_path(FIXTURES / "export_package")

    pipelines = [chapter for chapter in build_story(snapshot)["chapters"] if chapter["kind"] == "pipeline"]

    assert [chapter["title"] for chapter in pipelines] == ["Engine.run"]
    assert "an entry point exported from export_pkg" in pipelines[0]["body"]
    assert pipelines[0]["view"]["pipeline_root"] == "export_pkg.engine.Engine.run"
    assert pipelines[0]["view"]["trace_end"] == "export_pkg._compile._scale"
    assert pipelines[0]["evidence"] == ["export_pkg.engine.Engine.run", "export_pkg._compile._scale"]


def test_focus_file_drives_the_pipeline_chapters_in_author_order(tmp_path):
    target = tmp_path / "export_package"
    shutil.copytree(FIXTURES / "export_package", target)
    snapshot = analyze_path(target)
    focus = _focus(
        {"id": "export_pkg._compile.compile_inputs", "note": "Where the inputs are made."},
        {"id": "export_pkg.engine.Engine"},
        {"id": "export_pkg.shapes.box.Box", "note": "A plain record."},
        {"id": "export_pkg.shapes.box.area"},
    )
    (target / FOCUS_FILE).write_text(json.dumps(focus), encoding="utf-8")

    story = story_for_snapshot(target, snapshot)
    walks = story["chapters"][2:6]

    assert [(chapter["id"], chapter["kind"], chapter["title"]) for chapter in walks] == [
        ("pipeline-compile-inputs", "pipeline", "compile_inputs"),
        ("pipeline-engine", "pipeline", "Engine"),
        ("pipeline-box", "chapter", "Box"),
        ("pipeline-area", "pipeline", "area"),
    ]
    assert walks[0]["body"].startswith("Where the inputs are made. Compile inputs for a build. From")
    assert walks[0]["evidence"] == ["export_pkg._compile.compile_inputs", "export_pkg._compile._scale"]
    assert walks[1]["view"]["pipeline_root"] == "export_pkg.engine.Engine.__init__"
    assert walks[1]["evidence"] == ["export_pkg.engine.Engine", "export_pkg.engine.Engine.__init__"]
    assert walks[2]["view"]["object"] == "export_pkg.shapes.box.Box"
    assert "no resolved call" in walks[3]["body"]
    assert "trace_start" not in walks[3]["view"]
    assert "4 focus items from atlas-focus.json" in story["summary"]


def test_focus_validation_names_unknown_and_repeated_ids():
    snapshot = analyze_path(FIXTURES / "export_package")

    with pytest.raises(ValueError, match="unknown Atlas id: export_pkg.engine.missing"):
        validate_focus(_focus({"id": "export_pkg.engine.missing"}), snapshot)
    with pytest.raises(ValueError, match="duplicated: export_pkg.engine.build"):
        validate_focus(_focus({"id": "export_pkg.engine.build"}, {"id": "export_pkg.engine.build"}), snapshot)
    with pytest.raises(ValueError, match="unknown fields: camera"):
        validate_focus(_focus({"id": "export_pkg.engine.build", "camera": "plan"}), snapshot)
    with pytest.raises(ValueError, match="Unsupported Atlas focus version: 2"):
        validate_focus({"focus_version": 2, "items": [{"id": "export_pkg.engine.build"}]}, snapshot)


def test_signal_chapters_follow_review_pressure_when_present():
    defects = build_story(analyze_path(FIXTURES / "defect_package"))
    cycles = build_story(analyze_path(FIXTURES / "circular_package"))
    simple = build_story(analyze_path(FIXTURES / "simple_package"))

    assert [(chapter["id"], chapter["view"]["signal"]) for chapter in defects["chapters"][-2:]] == [
        ("signal-dead", "dead"),
        ("signal-clones", "clones"),
    ]
    assert defects["chapters"][-3]["id"] == "review-pressure"
    assert _chapter(defects, "signal-dead")["evidence"] == ["defect_pkg.core._unused_private"]
    assert _chapter(cycles, "signal-import-cycles")["view"]["camera"] == "plan"
    assert not [chapter for chapter in simple["chapters"] if chapter["kind"] == "signal"]


def test_story_rejects_version_one_and_unknown_view_vocabulary():
    snapshot = analyze_path(FIXTURES / "defect_package")
    story = build_story(snapshot)

    for change, message in [
        (lambda s: s.update(story_version=1), "Unsupported Atlas story version: 1"),
        (lambda s: s["chapters"][0].update(kind="tour"), "kind must be one of"),
        (lambda s: s["chapters"][0]["view"].update(level="city"), "level must be one of"),
        (lambda s: s["chapters"][0]["view"].update(camera="map"), "camera must be one of"),
        (lambda s: s["chapters"][0]["view"].update(unfold=["defect_pkg.gone"]), "unknown Atlas id: defect_pkg.gone"),
        (lambda s: s["chapters"][0]["view"].update(signal="dead"), "signal chapter"),
        (lambda s: s["chapters"][-1]["view"].update(signal="hubs"), "signal must be one of"),
        (lambda s: s["chapters"][2]["view"].pop("pipeline_root"), "requires view.pipeline_root"),
    ]:
        broken = copy.deepcopy(story)
        change(broken)
        with pytest.raises(ValueError, match=message):
            validate_story(broken, snapshot)


def test_story_round_trips_through_atlas_output(tmp_path):
    target = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", target)
    snapshot = analyze_path(target)
    story = build_story(snapshot)

    path = write_story(target, snapshot, story)

    assert path == target / ".atlas" / "atlas-story.json"
    assert load_story(path, snapshot) == story


def test_project_story_overrides_the_generated_guide(tmp_path):
    target = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", target)
    snapshot = analyze_path(target)
    story = build_story(snapshot)
    story["title"] = "A deliberately authored guide"
    (target / "atlas-story.json").write_text(json.dumps(story), encoding="utf-8")

    loaded = story_for_snapshot(target, snapshot)

    assert loaded["title"] == "A deliberately authored guide"


def test_story_rejects_stale_snapshots_and_unknown_evidence(tmp_path):
    snapshot = analyze_path(FIXTURES / "simple_package")
    stale = build_story(snapshot)
    stale["snapshot_id"] = "sha256:" + "0" * 64
    with pytest.raises(ValueError, match="different snapshot"):
        validate_story(stale, snapshot)

    unknown = copy.deepcopy(build_story(snapshot))
    unknown["chapters"][0]["evidence"] = ["simple_pkg.missing"]
    with pytest.raises(ValueError, match="unknown Atlas id"):
        validate_story(unknown, snapshot)


def test_story_rejects_traces_without_a_resolved_path():
    snapshot = analyze_path(FIXTURES / "simple_package")
    story = build_story(snapshot)
    story["chapters"][0]["view"].update(
        {
            "trace_start": "simple_pkg.b.beta",
            "trace_end": "simple_pkg.a.main",
        }
    )

    with pytest.raises(ValueError, match="no resolved directed path"):
        validate_story(story, snapshot)


def test_story_text_is_script_safe_when_embedded():
    snapshot = analyze_path(FIXTURES / "simple_package")
    story = build_story(snapshot)
    story["chapters"][0]["body"] = "</script><script>window.STORY_INJECTED = true</script>"

    source = render_explorer(snapshot, story)

    assert "</script><script>window.STORY_INJECTED" not in source
    assert "\\u003c/script\\u003e\\u003cscript\\u003e" in source


def test_package_map_chapter_explains_both_symbol_counts():
    snapshot = analyze_path(FIXTURES / "simple_package")

    body = build_story(snapshot)["chapters"][0]["body"]

    overview = snapshot["overview"]
    callables = overview["function_count"] + overview["method_count"]
    call_map = len(snapshot["model"]["nodes"])
    assert f"{callables} callable symbol" in body
    assert "(tests included)" in body
    assert f"{call_map} non-test function" in body
    assert "header" not in body and "repository view" not in body
