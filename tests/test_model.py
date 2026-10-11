from pathlib import Path

from atlas.analyzer.payload import analyze_path

FIXTURES = Path(__file__).parent / "fixtures"


def _model(name):
    return analyze_path(FIXTURES / name)["model"]


def test_dead_code_is_private_and_unreachable():
    model = _model("defect_package")
    dead = {node["id"] for node in model["nodes"] if node["dead"]}

    assert "defect_pkg.core._unused_private" in dead
    # A public, uncalled function is API surface, not dead.
    assert "defect_pkg.core.helper_two" not in dead


def test_structural_clones_are_grouped():
    model = _model("defect_package")
    members = {tuple(group["members"]) for group in model["clones"]}

    assert ("defect_pkg.core.helper_one", "defect_pkg.core.helper_two") in members


def test_reachability_partitions_roots_and_dead():
    model = _model("defect_package")
    summary = model["summary"]

    assert "defect_pkg.core.run" in model["roots"]
    assert summary["dead_count"] == 1
    assert summary["reachable_count"] + summary["dead_count"] == summary["callable_count"]


def test_nodes_carry_visibility_and_kind():
    model = _model("defect_package")
    by_id = {node["id"]: node for node in model["nodes"]}

    assert by_id["defect_pkg.core._unused_private"]["is_private"] is True
    assert by_id["defect_pkg.core.run"]["is_private"] is False
    assert by_id["defect_pkg.core.run"]["kind"] == "function"


def test_orchestrator_is_load_bearing():
    model = _model("simple_package")
    by_id = {node["id"]: node for node in model["nodes"]}

    main = by_id["simple_pkg.a.main"]
    assert main["fan_out"] >= 1
    # main calls helper and beta; with the fixture it is the workflow driver.
    assert main["is_root"]


def test_tree_rolls_up_defects():
    model = _model("defect_package")
    tree = model["tree"]

    # The root rollup sees the dead helper and the clone group beneath it.
    assert tree["rollup"]["functions"] == 4
    assert tree["rollup"]["dead"] == 1
    assert tree["rollup"]["clones"] == 2

    def find(node, name):
        if node["name"] == name:
            return node
        for child in node["children"]:
            hit = find(child, name)
            if hit:
                return hit
        return None

    core = find(tree, "core")
    assert core is not None and core["type"] == "module"
    assert "defect_pkg.core._unused_private" in core["function_ids"]


def test_exports_follow_all_and_package_reexports():
    snapshot = analyze_path(FIXTURES / "export_package")
    nodes = {node["id"]: node for node in snapshot["model"]["nodes"]}

    assert {node_id: node["exported_from"] for node_id, node in nodes.items() if node["exported"]} == {
        "export_pkg.engine.Engine.__init__": ["export_pkg"],
        "export_pkg.engine.Engine.run": ["export_pkg"],
        "export_pkg.engine.build": ["export_pkg"],
        "export_pkg.shapes.box.Box.scaled": ["export_pkg.shapes"],
        "export_pkg.shapes.box.area": ["export_pkg.shapes"],
    }
    # __all__ leaves out the re-exported tune; the private _vendor package exports nothing.
    assert nodes["export_pkg.engine.tune"]["exported_from"] == []
    assert not nodes["export_pkg._compile.compile_inputs"]["exported"]
    assert {item["id"]: item["exported"] for item in snapshot["objects"]} == {
        "export_pkg.engine.Engine": True,
        "export_pkg.shapes.box.Box": True,
    }


def test_exports_leave_roots_and_dead_code_unchanged():
    model = _model("export_package")
    by_id = {node["id"]: node for node in model["nodes"]}

    assert by_id["export_pkg.engine.build"]["exported"] and not by_id["export_pkg.engine.build"]["is_root"]
    assert sorted(node["id"] for node in model["nodes"] if node["dead"]) == [
        "export_pkg.engine.Engine._check",
        "export_pkg.shapes.box._hidden",
    ]


def test_package_without_all_exports_its_public_bindings(tmp_path):
    files = {
        "pkg/__init__.py": "from .core import _secret, run\n\n\ndef version():\n    return 1\n",
        "pkg/core.py": "def run():\n    return _secret()\n\n\ndef _secret():\n    return 1\n",
        "pkg/extra/__init__.py": "from pkg.core import run\n\n__all__: list = []\n__all__ += ['run']\n",
    }
    for relative, text in files.items():
        path = tmp_path / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8")

    nodes = analyze_path(tmp_path)["model"]["nodes"]

    assert {node["id"]: node["exported_from"] for node in nodes if node["exported"]} == {
        "pkg.core.run": ["pkg", "pkg.extra"],
        "pkg.version": ["pkg"],
    }
