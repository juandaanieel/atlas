from pathlib import Path
import subprocess

from atlas.analyzer.discovery import (
    discover_directories,
    discover_files,
    discover_python_files,
    module_from_path,
)


FIXTURES = Path(__file__).parent / "fixtures"


def test_discovers_python_files_in_sorted_order():
    root = FIXTURES / "simple_package"
    paths = [path.as_posix() for path in discover_python_files(root)]

    assert paths == [
        "simple_pkg/__init__.py",
        "simple_pkg/a.py",
        "simple_pkg/b.py",
    ]


def test_module_from_path_uses_import_style_names():
    root = FIXTURES / "simple_package"

    assert module_from_path(root, Path("simple_pkg/a.py")) == "simple_pkg.a"
    assert module_from_path(root, Path("simple_pkg/__init__.py")) == "simple_pkg"


def test_discovery_skips_pixi_environment(tmp_path):
    package = tmp_path / "pkg"
    pixi_env = tmp_path / ".pixi" / "envs" / "default"
    package.mkdir()
    pixi_env.mkdir(parents=True)
    (package / "module.py").write_text("def local():\n    return 1\n", encoding="utf-8")
    (pixi_env / "stdlib.py").write_text("def external():\n    return 2\n", encoding="utf-8")

    paths = [path.as_posix() for path in discover_python_files(tmp_path)]

    assert paths == ["pkg/module.py"]


def test_discovery_honors_an_empty_git_ignore_result(tmp_path):
    subprocess.run(["git", "init"], cwd=tmp_path, check=True, capture_output=True)
    (tmp_path / ".gitignore").write_text("*\n", encoding="utf-8")
    (tmp_path / "ignored.py").write_text("def ignored():\n    return 1\n", encoding="utf-8")

    assert discover_files(tmp_path) == []
    assert discover_python_files(tmp_path) == []


def test_discovery_skips_symlinked_files(tmp_path):
    root = tmp_path / "root"
    root.mkdir()
    outside = tmp_path / "outside.py"
    outside.write_text("def secret():\n    return 1\n", encoding="utf-8")
    (root / "linked.py").symlink_to(outside)

    assert discover_python_files(root) == []


def test_discovery_excludes_cache_directories(tmp_path):
    package = tmp_path / "package"
    package.mkdir()
    (package / "module.py").write_text("", encoding="utf-8")
    for name in (".cache", "__pycache__", "custom_pycache_data"):
        cache = package / name
        cache.mkdir()
        (cache / "stale.py").write_text("", encoding="utf-8")

    assert discover_python_files(tmp_path) == [Path("package/module.py")]
    assert discover_directories(tmp_path) == ["package"]
