from __future__ import annotations

import json
import shutil
from pathlib import Path

import pytest

from atlas.dashboard.refresh import _recover_interrupted_vault_swap, refresh_project


FIXTURES = Path(__file__).parent / "fixtures"


def test_dashboard_refresh_writes_only_atlas_owned_project_output(tmp_path):
    project = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", project)
    source = project / "simple_pkg" / "a.py"
    before = source.read_text(encoding="utf-8")

    result = refresh_project(project, job_id="first-refresh")

    assert result["snapshot_id"].startswith("sha256:")
    assert source.read_text(encoding="utf-8") == before
    assert (project / ".atlas" / ".atlas-owned").is_file()
    assert (project / ".atlas" / "atlas.json").is_file()
    assert (project / ".atlas" / "vault" / "00-atlas" / ".atlas-generated").is_file()
    assert not (project / ".atlas" / "explorer").exists()
    assert not (project / ".git").exists()


def test_dashboard_refresh_preserves_human_vault_directories(tmp_path):
    project = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", project)
    functionality = project / ".atlas" / "vault" / "10-functionality"
    functionality.mkdir(parents=True)
    note = functionality / "keep.md"
    note.write_text("human-authored\n", encoding="utf-8")

    refresh_project(project, job_id="first-refresh")
    refresh_project(project, job_id="second-refresh")

    assert note.read_text(encoding="utf-8") == "human-authored\n"
    assert (project / ".atlas" / "vault" / "00-atlas.previous").is_dir()
    assert (project / ".atlas" / "atlas.previous.json").is_file()


def test_dashboard_refresh_refuses_to_replace_an_unowned_vault(tmp_path):
    project = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", project)
    generated = project / ".atlas" / "vault" / "00-atlas"
    generated.mkdir(parents=True)
    note = generated / "personal.md"
    note.write_text("keep me\n", encoding="utf-8")

    with pytest.raises(ValueError, match="unowned vault"):
        refresh_project(project, job_id="unsafe-refresh")

    assert note.read_text(encoding="utf-8") == "keep me\n"
    assert not (project / ".atlas" / "atlas.json").exists()
    assert list((project / ".atlas" / ".staging").iterdir()) == []


def test_dashboard_refresh_rejects_a_symlinked_payload(tmp_path):
    project = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", project)
    output = project / ".atlas"
    output.mkdir()
    external = tmp_path / "external.json"
    external.write_text('{"keep": true}\n', encoding="utf-8")
    (output / "atlas.json").symlink_to(external)

    with pytest.raises(ValueError, match="symlinked output path"):
        refresh_project(project, job_id="linked-payload")

    assert json.loads(external.read_text(encoding="utf-8")) == {"keep": True}


def test_dashboard_refresh_never_executes_project_code(tmp_path):
    project = tmp_path / "project"
    project.mkdir()
    executed = tmp_path / "executed"
    (project / "module.py").write_text(
        "from pathlib import Path\n"
        f"Path({str(executed)!r}).write_text('executed')\n",
        encoding="utf-8",
    )

    refresh_project(project, job_id="ast-only")

    assert not executed.exists()


def test_dashboard_recovers_a_vault_interrupted_between_renames(tmp_path):
    project = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", project)
    refresh_project(project, job_id="complete-refresh")
    atlas_dir = project / ".atlas"
    generated = atlas_dir / "vault" / "00-atlas"
    previous = atlas_dir / "vault" / "00-atlas.previous"
    generated.rename(previous)

    _recover_interrupted_vault_swap(atlas_dir)

    assert generated.is_dir()
    assert not previous.exists()
    assert (generated / ".atlas-generated").is_file()
