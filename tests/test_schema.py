import json
from pathlib import Path

import pytest

from atlas.analyzer.payload import analyze_path
from atlas.analyzer.snapshot import SNAPSHOT_VERSION
from atlas.story import STORY_VERSION, build_story


ROOT = Path(__file__).parents[1]
SCHEMA_PATH = ROOT / "schema" / "atlas.schema.json"
STORY_SCHEMA_PATH = ROOT / "schema" / "atlas-story.schema.json"
FIXTURES = Path(__file__).parent / "fixtures"
FIXTURE_NAMES = sorted(path.name for path in FIXTURES.iterdir() if path.is_dir())
SCHEMA = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
STORY_SCHEMA = json.loads(STORY_SCHEMA_PATH.read_text(encoding="utf-8"))


def test_schema_tracks_current_contract_versions():
    assert SCHEMA["properties"]["snapshot_version"]["const"] == SNAPSHOT_VERSION
    assert STORY_SCHEMA["properties"]["story_version"]["const"] == STORY_VERSION


@pytest.mark.parametrize("name", FIXTURE_NAMES)
def test_snapshot_matches_current_schema(name):
    jsonschema = pytest.importorskip("jsonschema")
    validator = jsonschema.validators.validator_for(SCHEMA)

    validator.check_schema(SCHEMA)
    validator(SCHEMA, format_checker=jsonschema.FormatChecker()).validate(
        analyze_path(FIXTURES / name).to_dict()
    )


def test_layout_and_edge_keys_match_the_schema():
    """Holds without jsonschema: emitted keys equal the schema's required keys."""
    defs = SCHEMA["$defs"]
    model = analyze_path(FIXTURES / "class_package")["model"]
    layout = model["layout"]

    assert set(model) == set(defs["model"]["required"])
    assert set(layout) == set(defs["layout"]["required"])
    assert all(set(edge) == set(defs["modelEdge"]["required"]) for edge in model["edges"])
    assert all(set(column) == set(defs["layoutColumn"]["required"]) for column in layout["columns"])
    assert all(set(cell) == set(defs["layoutCell"]["required"]) for cell in layout["nodes"].values())
    assert all(set(box) == set(defs["layoutClass"]["required"]) for box in layout["classes"].values())
    assert {edge["kind"] for edge in model["edges"]} <= set(defs["modelEdge"]["properties"]["kind"]["enum"])


@pytest.mark.parametrize("name", FIXTURE_NAMES)
def test_story_matches_current_schema(name):
    jsonschema = pytest.importorskip("jsonschema")
    validator = jsonschema.validators.validator_for(STORY_SCHEMA)
    snapshot = analyze_path(FIXTURES / name)

    validator.check_schema(STORY_SCHEMA)
    validator(STORY_SCHEMA).validate(build_story(snapshot))


def test_focus_story_matches_current_schema():
    jsonschema = pytest.importorskip("jsonschema")
    snapshot = analyze_path(FIXTURES / "export_package")
    focus = {
        "focus_version": 1,
        "items": [{"id": "export_pkg.engine.Engine", "note": "The class users build."}, {"id": "export_pkg.shapes.box.Box"}],
    }

    jsonschema.validators.validator_for(STORY_SCHEMA)(STORY_SCHEMA).validate(build_story(snapshot, focus))
