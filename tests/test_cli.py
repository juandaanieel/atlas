from pathlib import Path
import shutil
import subprocess

import pytest

from atlas.analyzer.payload import write_report
from atlas.cli import main
from atlas.diagrams import write_diagrams


FIXTURES = Path(__file__).parent / "fixtures"


def test_explore_writes_static_explorer(tmp_path):
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    shutil.copytree(source, target)

    main(["explore", "--where", str(target)])

    index = target / ".atlas" / "explorer" / "index.html"
    assert index.exists()
    assert "window.ATLAS_PAYLOAD" in index.read_text(encoding="utf-8")


def test_explore_registers_output_dir_with_local_git_excludes(tmp_path):
    subprocess.run(["git", "init"], cwd=tmp_path, check=True, capture_output=True)
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    shutil.copytree(source, target)

    main(["explore", "--where", str(target)])
    main(["explore", "--where", str(target)])

    exclude_path = tmp_path / ".git" / "info" / "exclude"
    exclude_lines = exclude_path.read_text(encoding="utf-8").splitlines()
    assert exclude_lines.count("/simple_package/.atlas/") == 1


def test_explore_requires_explicit_where():
    with pytest.raises(SystemExit):
        main(["explore"])


def test_report_writes_markdown(tmp_path):
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    shutil.copytree(source, target)

    write_report(target)

    report = target / ".atlas" / "report.md"
    assert report.exists()
    assert "# Atlas Report" in report.read_text(encoding="utf-8")


def test_render_writes_workflow_and_map_diagrams(tmp_path):
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    shutil.copytree(source, target)

    write_diagrams(target)

    diagrams = target / ".atlas" / "diagrams"
    expected = {"workflow.mmd", "map.mmd"}
    assert {path.name for path in diagrams.iterdir()} == expected
    assert "Atlas Workflow" in (diagrams / "workflow.mmd").read_text(encoding="utf-8")
    assert "Atlas Layer Map" in (diagrams / "map.mmd").read_text(encoding="utf-8")


def test_workflow_ghosts_dead_code(tmp_path):
    source = FIXTURES / "defect_package"
    target = tmp_path / "defect_package"
    shutil.copytree(source, target)

    write_diagrams(target)

    workflow = (target / ".atlas" / "diagrams" / "workflow.mmd").read_text(encoding="utf-8")
    # Dead code is drawn with the ghost class, not the live workflow.
    assert ":::ghost" in workflow
    assert "dead code" in workflow
