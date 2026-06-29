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
