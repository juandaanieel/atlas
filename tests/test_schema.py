import json
from pathlib import Path

import pytest

from atlas.analyzer.payload import analyze_path
from atlas.analyzer.snapshot import SNAPSHOT_VERSION


ROOT = Path(__file__).parents[1]
SCHEMA_PATH = ROOT / "schema" / "atlas.schema.json"
FIXTURES = Path(__file__).parent / "fixtures"
SCHEMA = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))


def test_schema_tracks_current_contract_versions():
    assert SCHEMA["properties"]["snapshot_version"]["const"] == SNAPSHOT_VERSION
    assert SCHEMA["$defs"]["citymap"]["properties"]["version"]["const"] == 2


def test_snapshot_matches_current_schema():
    jsonschema = pytest.importorskip("jsonschema")
    validator = jsonschema.validators.validator_for(SCHEMA)

    validator.check_schema(SCHEMA)
    validator(SCHEMA, format_checker=jsonschema.FormatChecker()).validate(
        analyze_path(FIXTURES / "simple_package").to_dict()
    )
