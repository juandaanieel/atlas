import json
from pathlib import Path
import shutil
import subprocess

import pytest

from atlas.cli import main


FIXTURES = Path(__file__).parent / "fixtures"


def test_explore_writes_static_explorer(tmp_path):
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    shutil.copytree(source, target)

    main(["explore", "--where", str(target)])

    index = target / ".atlas" / "explorer" / "index.html"
    assert index.exists()
    index_text = index.read_text(encoding="utf-8")
    document = json.loads(
        index_text.split('<script id="atlasView" type="application/json">', 1)[1]
        .split("</script>", 1)[0]
    )
    snapshot = json.loads((target / ".atlas" / "atlas.json").read_text())
    story = json.loads((target / ".atlas" / "atlas-story.json").read_text())
    assert document["view"]["snapshot_id"] == story["snapshot_id"] == snapshot["snapshot_id"]
    assert len(document["view"]["guide"]["steps"]) == len(story["chapters"]) == 5
    assert document["source"]["symbols"]
    assert (target / ".atlas" / "vault" / "00-atlas" / "Home.md").exists()
    from atlas.explorer.writer import ASSETS
    assets = index.parent / "assets"
    assert {p.name for p in assets.iterdir()} == set(ASSETS)
    assert 'type="module"' not in index_text
    assert "https://" not in index_text
    assert 'src="assets/app.bundle.js?v=' in index_text


def test_vault_writes_to_an_explicit_directory(tmp_path):
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    output = tmp_path / "architecture"
    shutil.copytree(source, target)

    main(["vault", "--where", str(target), "--out", str(output)])

    assert (output / "00-atlas" / "Home.md").exists()


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


def test_explore_does_not_follow_a_symlinked_git_exclude(tmp_path):
    subprocess.run(["git", "init"], cwd=tmp_path, check=True, capture_output=True)
    target = tmp_path / "package"
    target.mkdir()
    (target / "module.py").write_text("def run():\n    return 1\n", encoding="utf-8")
    external = tmp_path / "external-exclude"
    external.write_text("keep me\n", encoding="utf-8")
    exclude_path = tmp_path / ".git" / "info" / "exclude"
    exclude_path.unlink()
    exclude_path.symlink_to(external)

    main(["explore", "--where", str(target)])

    assert external.read_text(encoding="utf-8") == "keep me\n"


def test_explore_requires_explicit_where():
    with pytest.raises(SystemExit):
        main(["explore"])


def test_explore_rejects_a_missing_directory_without_creating_it(tmp_path):
    missing = tmp_path / "missing"

    with pytest.raises(SystemExit):
        main(["explore", "--where", str(missing)])

    assert not missing.exists()


def test_explorer_escapes_script_closing_text_in_the_payload(tmp_path):
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    shutil.copytree(source, target)
    module = target / "simple_pkg" / "a.py"
    module.write_text(
        module.read_text(encoding="utf-8")
        + '\n\ndef injected():\n    """</script><script>window.ATLAS_INJECTED = true</script>"""\n',
        encoding="utf-8",
    )

    main(["explore", "--where", str(target)])

    index = (target / ".atlas" / "explorer" / "index.html").read_text(encoding="utf-8")
    assert "</script><script>window.ATLAS_INJECTED" not in index
    assert "\\u003c/script\\u003e\\u003cscript\\u003e" in index


def test_dashboard_command_passes_safe_defaults(monkeypatch, tmp_path):
    called = {}

    def fake_serve_dashboard(**options):
        called.update(options)

    monkeypatch.setattr(
        "atlas.dashboard.server.serve_dashboard",
        fake_serve_dashboard,
    )

    main(
        [
            "dashboard",
            "--state-dir",
            str(tmp_path / "state"),
            "--no-open",
        ]
    )

    assert called == {
        "state_dir": tmp_path / "state",
        "port": 7331,
        "open_browser": False,
        "timeout_seconds": 900,
    }
