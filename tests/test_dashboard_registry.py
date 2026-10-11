from __future__ import annotations

import json
from pathlib import Path

import pytest

from atlas import __version__
from atlas.analyzer.snapshot import SNAPSHOT_VERSION
from atlas.dashboard.registry import ProjectRegistry


def test_registry_adds_a_project_without_writing_to_it(tmp_path):
    project = tmp_path / "project"
    project.mkdir()
    registry = ProjectRegistry(tmp_path / "state")

    registered = registry.add(project)

    assert registered["path"] == str(project.resolve())
    assert registered["name"] == "project"
    assert list(project.iterdir()) == []
    assert registry.path.stat().st_mode & 0o777 == 0o600
    assert registry.state_dir.stat().st_mode & 0o777 == 0o700


def test_registry_rejects_duplicate_and_symlinked_projects(tmp_path):
    project = tmp_path / "project"
    project.mkdir()
    linked = tmp_path / "linked"
    linked.symlink_to(project, target_is_directory=True)
    registry = ProjectRegistry(tmp_path / "state")
    registry.add(project)

    with pytest.raises(ValueError, match="already registered"):
        registry.add(project)
    with pytest.raises(ValueError, match="cannot be a symlink"):
        registry.add(linked)


def test_registry_remove_does_not_delete_project_data(tmp_path):
    project = tmp_path / "project"
    project.mkdir()
    source = project / "module.py"
    source.write_text("def run():\n    return 1\n", encoding="utf-8")
    registry = ProjectRegistry(tmp_path / "state")
    registered = registry.add(project)

    registry.remove(registered["id"])

    assert source.read_text(encoding="utf-8") == "def run():\n    return 1\n"
    assert registry.list() == []


def test_registry_reports_snapshot_compatibility_without_loading_it(tmp_path):
    project = tmp_path / "project"
    output = project / ".atlas"
    output.mkdir(parents=True)
    registry = ProjectRegistry(tmp_path / "state")
    registered = registry.add(project)
    snapshot = {
        "atlas_version": __version__,
        "snapshot_version": SNAPSHOT_VERSION - 1,
        "generated_at": "2026-07-23T10:00:00+00:00",
    }
    (output / "atlas.json").write_text(json.dumps(snapshot), encoding="utf-8")

    status = registry.project_status(registered)

    assert status["state"] == "needs_update"
    assert status["snapshot_version"] == SNAPSHOT_VERSION - 1


def test_registry_refuses_a_symlinked_registry_file(tmp_path):
    state = tmp_path / "state"
    state.mkdir()
    external = tmp_path / "external.json"
    external.write_text('{"registry_version": 1, "projects": []}', encoding="utf-8")
    (state / "projects.json").symlink_to(external)
    registry = ProjectRegistry(state)

    with pytest.raises(ValueError, match="symlinked registry"):
        registry.list()


def test_registry_reports_a_symlinked_atlas_directory_as_invalid(tmp_path):
    project = tmp_path / "project"
    project.mkdir()
    external = tmp_path / "external"
    external.mkdir()
    (project / ".atlas").symlink_to(external, target_is_directory=True)
    registry = ProjectRegistry(tmp_path / "state")
    registered = registry.add(project)

    status = registry.project_status(registered)

    assert status["state"] == "invalid"
    assert status["message"] == "Atlas output directory is a symlink"
