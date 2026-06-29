from pathlib import Path

from atlas.analyzer.discovery import discover_python_files, module_from_path


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
