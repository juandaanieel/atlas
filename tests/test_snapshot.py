import json
from pathlib import Path

import pytest

from atlas.analyzer.payload import analyze_path, load_payload, write_payload
from atlas.analyzer.snapshot import AnalysisSnapshot


FIXTURES = Path(__file__).parent / "fixtures"


def test_snapshot_serializes_and_round_trips_as_the_same_contract(tmp_path):
    snapshot = analyze_path(FIXTURES / "simple_package")

    encoded = snapshot.to_json(indent=2)
    decoded = AnalysisSnapshot.from_json(encoded)

    assert json.loads(encoded) == snapshot.to_dict()
    assert decoded.to_dict() == snapshot.to_dict()
    assert decoded["snapshot_version"] == 2


def test_snapshot_is_read_only_through_mapping_access():
    snapshot = analyze_path(FIXTURES / "simple_package")

    files = snapshot["files"]
    files.clear()

    assert snapshot["files"]


def test_payload_writes_and_loads_the_snapshot_contract(tmp_path):
    target = tmp_path / "simple_package"
    target.mkdir()
    source = FIXTURES / "simple_package"
    for path in source.rglob("*"):
        if path.is_file():
            destination = target / path.relative_to(source)
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(path.read_bytes())

    snapshot = analyze_path(target)
    write_payload(target, snapshot)

    loaded = load_payload(target)

    assert isinstance(loaded, AnalysisSnapshot)
    assert loaded.to_dict() == snapshot.to_dict()


def test_write_payload_rejects_a_symlinked_atlas_json(tmp_path):
    root = tmp_path / "package"
    root.mkdir()
    (root / "module.py").write_text("def run():\n    return 1\n", encoding="utf-8")
    snapshot = analyze_path(root)
    output_dir = root / ".atlas"
    output_dir.mkdir()
    external = tmp_path / "external.json"
    external.write_text("keep me\n", encoding="utf-8")
    (output_dir / "atlas.json").symlink_to(external)

    with pytest.raises(ValueError, match="symlinked output path"):
        write_payload(root, snapshot)

    assert external.read_text(encoding="utf-8") == "keep me\n"


def test_snapshot_rejects_missing_or_unknown_versions():
    with pytest.raises(ValueError, match="missing required keys"):
        AnalysisSnapshot.from_dict({})

    document = analyze_path(FIXTURES / "simple_package").to_dict()
    document["snapshot_version"] = 3
    with pytest.raises(ValueError, match="Unsupported Atlas snapshot version"):
        AnalysisSnapshot.from_dict(document)
