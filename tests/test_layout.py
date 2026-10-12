import json
import os
import random
import subprocess
import sys
import textwrap
from collections import Counter, defaultdict
from pathlib import Path

import pytest

from atlas.analyzer.layout import rank_live
from atlas.analyzer.model import build_model
from atlas.analyzer.payload import analyze_path

FIXTURES = Path(__file__).parent / "fixtures"
FIXTURE_NAMES = sorted(path.name for path in FIXTURES.iterdir() if path.is_dir())
SRC = Path(__file__).parents[1] / "src"

CYCLE = {
    "pkg/__init__.py": "",
    "pkg/flow.py": """
        def main():
            return step(1)


        def step(value):
            return _again(value)


        def _again(value):
            return step(value - 1)


        def rerun():
            return main()
    """,
}

CLASSES = {
    "pkg/__init__.py": """
        def version():
            return 1
    """,
    "pkg/util.py": """
        def clamp(value):
            return value
    """,
    "pkg/specs.py": """
        from dataclasses import dataclass


        @dataclass
        class Spec:
            width: float
            height: float
    """,
    "pkg/engine.py": """
        from .util import clamp


        class Engine:
            def __init__(self):
                self._warm()

            def _warm(self):
                return clamp(1)

            @staticmethod
            def build():
                return 1

            def lonely(self):
                return 2

            def _never(self):
                return self.lonely()


        class Ghost:
            def _hidden(self):
                return self.shown()

            def shown(self):
                return 1


        def main():
            return helper()


        def helper():
            return Engine.build()
    """,
}

CROSSING = {
    "pkg/__init__.py": "",
    "pkg/top.py": """
        from .low import alpha, beta


        def first():
            return beta()


        def second():
            return alpha()
    """,
    "pkg/low.py": """
        def alpha():
            return 1


        def beta():
            return 2
    """,
}

CONSTRUCTION = {
    "pkg/__init__.py": "",
    "pkg/shapes.py": """
        from dataclasses import dataclass


        @dataclass(frozen=True)
        class Point:
            x: float
            y: float

            def shifted(self, dx):
                return Point(self.x + dx, self.y)


        class Canvas:
            def __init__(self, size):
                self.size = size

            def resized(self, size):
                return Canvas(size)


        class Tree:
            def __init__(self, depth):
                self.children = self._grow(depth)

            def _grow(self, depth):
                return [Tree(depth - 1)] if depth else []


        class Marker:
            pass
    """,
    "pkg/draw.py": """
        from .shapes import Canvas, Marker, Point


        def sketch():
            canvas = Canvas(3)
            Marker()
            return canvas, Point(1, 2)


        def _unused():
            return Point(0, 0)
    """,
}

REEXPORTS = {
    "pkg/__init__.py": """
        from pkg.app import main
        from .util import helper
    """,
    "pkg/util.py": """
        def helper():
            return 1
    """,
    "pkg/app.py": """
        from pkg import helper
        from pkg.shapes import UNIT, Box, build_box


        def main():
            return build_box(helper()), Box(UNIT)
    """,
    "pkg/shapes/__init__.py": """
        from pkg.shapes.build import build_box
        from pkg.shapes.records import Box

        UNIT = 1


        def describe():
            return "shapes"
    """,
    "pkg/shapes/records.py": """
        from dataclasses import dataclass


        @dataclass
        class Box:
            size: int
    """,
    "pkg/shapes/build.py": """
        from pkg.shapes.records import Box


        def build_box(size):
            return Box(size)
    """,
}

HAND_BUILT = {
    "cycle": CYCLE,
    "classes": CLASSES,
    "crossing": CROSSING,
    "construction": CONSTRUCTION,
    "reexports": REEXPORTS,
}


def _write(root, files):
    for relative, text in files.items():
        path = root / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(textwrap.dedent(text).lstrip(), encoding="utf-8")
    return root


def _snapshot(name, tmp_path):
    if name in HAND_BUILT:
        return analyze_path(_write(tmp_path / name, HAND_BUILT[name]))
    return analyze_path(FIXTURES / name)


def _ranks(model):
    out_edges = defaultdict(set)
    for edge in model["edges"]:
        out_edges[edge["source"]].add(edge["target"])
    return rank_live(model["nodes"], out_edges, set(model["roots"]))


ALL_CASES = FIXTURE_NAMES + sorted(HAND_BUILT)


@pytest.mark.parametrize("name", ALL_CASES)
def test_every_call_map_node_is_placed_exactly_once(name, tmp_path):
    model = _snapshot(name, tmp_path)["model"]
    layout = model["layout"]
    placed = Counter(list(layout["nodes"]))
    for box in layout["classes"].values():
        placed.update(box["rows"] + box["private"])

    assert placed == Counter(node["id"] for node in model["nodes"])
    assert set(layout["nodes"]).isdisjoint(layout["classes"])


@pytest.mark.parametrize("name", ALL_CASES)
def test_row_zero_is_exactly_the_roots(name, tmp_path):
    model = _snapshot(name, tmp_path)["model"]
    rank, _ = _ranks(model)
    free = model["layout"]["nodes"]

    assert {node for node, row in rank.items() if row == 0} == set(model["roots"])
    assert {node for node, cell in free.items() if cell["row"] == 0} == set(model["roots"]) & set(free)


@pytest.mark.parametrize("name", ALL_CASES)
def test_dead_nodes_sit_only_in_the_dead_band(name, tmp_path):
    model = _snapshot(name, tmp_path)["model"]
    layout = model["layout"]
    dead = {node["id"] for node in model["nodes"] if node["dead"]}

    assert layout["dead_row"] == layout["rows"]
    for node_id, cell in layout["nodes"].items():
        assert (cell["row"] == layout["dead_row"]) == (node_id in dead)
    for box in layout["classes"].values():
        assert not set(box["private"]) & dead


def test_circular_calls_rank_with_a_back_edge(tmp_path):
    model = _snapshot("cycle", tmp_path)["model"]
    rank, back_edges = _ranks(model)
    edges = {(edge["source"], edge["target"]): edge for edge in model["edges"]}

    assert rank == {"pkg.flow.main": 0, "pkg.flow.rerun": 0, "pkg.flow.step": 1, "pkg.flow._again": 2}
    assert back_edges == {("pkg.flow._again", "pkg.flow.step"), ("pkg.flow.rerun", "pkg.flow.main")}
    assert edges[("pkg.flow._again", "pkg.flow.step")]["back"] is True
    # An edge into a root is ignored for ranking so the root stays on row 0.
    assert edges[("pkg.flow.rerun", "pkg.flow.main")]["back"] is True
    assert edges[("pkg.flow.main", "pkg.flow.step")]["back"] is False
    assert model["layout"]["rows"] == 3


def test_class_box_rows_are_constructor_then_public_in_source_order():
    layout = analyze_path(FIXTURES / "class_package")["model"]["layout"]
    runner = layout["classes"]["class_pkg.runner.Runner"]

    assert runner["rows"] == [
        "class_pkg.runner.Runner.__init__",
        "class_pkg.runner.Runner.run",
        "class_pkg.runner.Runner.step",
    ]
    assert runner["private"] == ["class_pkg.runner.Runner._prepare", "class_pkg.runner.Runner._normalize"]
    assert runner["row"] == 0
    # A class with neither analysed methods nor fields gets no box.
    assert "class_pkg.runner.Empty" not in layout["classes"]
    assert set(layout["nodes"]) == {"class_pkg.runner.build_runner"}


def test_class_boxes_keep_their_interface_and_drop_dead_privates(tmp_path):
    layout = _snapshot("classes", tmp_path)["model"]["layout"]
    engine = layout["classes"]["pkg.engine.Engine"]
    ghost = layout["classes"]["pkg.engine.Ghost"]

    # Dead public methods stay in the interface; dead private ones become cards.
    assert engine["rows"] == ["pkg.engine.Engine.__init__", "pkg.engine.Engine.build", "pkg.engine.Engine.lonely"]
    assert engine["private"] == ["pkg.engine.Engine._warm"]
    assert engine["row"] == 0
    assert layout["nodes"]["pkg.engine.Engine._never"]["row"] == layout["dead_row"]
    # A box whose analysed methods are all dead belongs in the dead band.
    assert ghost["rows"] == ["pkg.engine.Ghost.shown"]
    assert ghost["row"] == layout["dead_row"]
    # A data-only box has no call depth and sits on the entry row.
    assert layout["classes"]["pkg.specs.Spec"] == {"column": 2, "row": 0, "slot": 0, "rows": [], "private": []}


def test_columns_follow_the_tree_and_admit_class_only_modules(tmp_path):
    model = _snapshot("classes", tmp_path)["model"]
    columns = model["layout"]["columns"]

    # The package's own __init__ column comes before its children.
    assert [(column["module"], column["scope"], column["package"]) for column in columns] == [
        ("pkg", "pkg", "pkg"),
        ("pkg.engine", "pkg.engine", "pkg"),
        ("pkg.specs", "pkg.specs", "pkg"),
        ("pkg.util", "pkg.util", "pkg"),
    ]
    assert all(column["width"] >= 1 for column in columns)
    specs = next(child for child in model["tree"]["children"][0]["children"] if child["name"] == "specs")
    assert specs["type"] == "module"
    assert specs["function_ids"] == []
    assert specs["rollup"]["functions"] == 0
    assert model["tree"]["rollup"]["functions"] == len(model["nodes"])


def test_cells_are_ordered_by_neighbour_barycenter(tmp_path):
    layout = _snapshot("crossing", tmp_path)["model"]["layout"]
    nodes = layout["nodes"]

    # Line order would put alpha first; its caller sits right of beta's caller.
    assert [column["module"] for column in layout["columns"]] == ["pkg.low", "pkg.top"]
    assert nodes["pkg.low.beta"]["slot"] == 0
    assert nodes["pkg.low.alpha"]["slot"] == 1
    assert nodes["pkg.top.first"]["slot"] == 0
    assert nodes["pkg.top.second"]["slot"] == 1
    assert [column["width"] for column in layout["columns"]] == [2, 2]


@pytest.mark.parametrize(
    "name",
    ["class_package", "defect_package", "classes", "crossing", "cycle", "construction", "reexports"],
)
def test_model_is_independent_of_input_order(name, tmp_path):
    document = _snapshot(name, tmp_path).to_dict()

    for seed in range(4):
        shuffled = {key: list(document[key]) for key in ("files", "symbols", "calls", "imports", "objects")}
        for items in shuffled.values():
            random.Random(seed).shuffle(items)
        model = build_model(
            shuffled["files"],
            shuffled["symbols"],
            shuffled["calls"],
            shuffled["imports"],
            document["package_name"],
            shuffled["objects"],
            document["overview"]["circular_imports"],
            {node["id"]: node["exported_from"] for node in document["model"]["nodes"] if node["exported"]},
            document["references"],
        )
        assert model == document["model"]


def test_layout_is_independent_of_hash_seed(tmp_path):
    root = _write(tmp_path / "crossing", CROSSING)
    script = (
        "import json, sys\n"
        "from atlas.analyzer.payload import analyze_path\n"
        "print(json.dumps([analyze_path(path)['model']['layout'] for path in sys.argv[1:]], sort_keys=True))\n"
    )
    paths = [str(root), str(FIXTURES / "class_package"), str(FIXTURES / "defect_package")]
    outputs = set()
    for seed in ("0", "1", "2"):
        env = {**os.environ, "PYTHONHASHSEED": seed, "PYTHONPATH": str(SRC)}
        result = subprocess.run(
            [sys.executable, "-B", "-c", script, *paths], capture_output=True, text=True, env=env, check=True
        )
        outputs.add(result.stdout)

    assert len(outputs) == 1
    assert json.loads(outputs.pop())[0]["nodes"]["pkg.low.beta"]["slot"] == 0


def test_clone_links_join_consecutive_members():
    layout = analyze_path(FIXTURES / "defect_package")["model"]["layout"]

    assert layout["clone_links"] == [["defect_pkg.core.helper_one", "defect_pkg.core.helper_two"]]
    assert layout["imports"] == []
    assert layout["bundles"] == []


def test_import_cycles_and_bundles_on_the_circular_fixture():
    snapshot = analyze_path(FIXTURES / "circular_package")
    layout = snapshot["model"]["layout"]

    assert snapshot["overview"]["circular_imports"] == [["circular_pkg.a", "circular_pkg.b", "circular_pkg.a"]]
    assert layout["imports"] == [["circular_pkg.a", "circular_pkg.b"], ["circular_pkg.b", "circular_pkg.a"]]
    assert layout["import_cycles"] == [["circular_pkg.a", "circular_pkg.b"], ["circular_pkg.b", "circular_pkg.a"]]
    assert layout["bundles"] == [
        {"source_module": "circular_pkg.a", "target_module": "circular_pkg.b", "count": 1},
        {"source_module": "circular_pkg.b", "target_module": "circular_pkg.a", "count": 1},
    ]
    # Both functions only call each other, so neither is reachable from a root.
    assert layout["rows"] == 1
    assert {cell["row"] for cell in layout["nodes"].values()} == {layout["dead_row"]}


@pytest.mark.parametrize("name", ALL_CASES)
def test_import_cycle_pairs_are_import_pairs(name, tmp_path):
    layout = _snapshot(name, tmp_path)["model"]["layout"]

    assert all(pair in layout["imports"] for pair in layout["import_cycles"])
    assert layout["imports"] == sorted(layout["imports"])


def test_imports_and_bundles_on_the_simple_fixture():
    layout = analyze_path(FIXTURES / "simple_package")["model"]["layout"]

    assert layout["imports"] == [["simple_pkg.a", "simple_pkg.b"]]
    assert layout["bundles"] == [{"source_module": "simple_pkg.a", "target_module": "simple_pkg.b", "count": 1}]


def test_edges_carry_kind_and_back(tmp_path):
    model = _snapshot("classes", tmp_path)["model"]
    edges = {(edge["source"], edge["target"]): (edge["kind"], edge["back"]) for edge in model["edges"]}

    assert edges == {
        ("pkg.engine.Engine.__init__", "pkg.engine.Engine._warm"): ("intra_class", False),
        ("pkg.engine.Engine._warm", "pkg.util.clamp"): ("cross_module", False),
        # The dead private caller is a card in the dead band, outside the box.
        ("pkg.engine.Engine._never", "pkg.engine.Engine.lonely"): ("into_class", False),
        ("pkg.engine.Ghost._hidden", "pkg.engine.Ghost.shown"): ("into_class", False),
        ("pkg.engine.helper", "pkg.engine.Engine.build"): ("into_class", False),
        ("pkg.engine.main", "pkg.engine.helper"): ("same_module", False),
    }
    assert model["layout"]["bundles"] == [
        {"source_module": "pkg.engine", "target_module": "pkg.util", "count": 1}
    ]


@pytest.mark.parametrize("name", ALL_CASES)
def test_edge_targets_are_nodes_or_class_boxes(name, tmp_path):
    model = _snapshot(name, tmp_path)["model"]
    nodes = {node["id"]: node for node in model["nodes"]}
    boxes = model["layout"]["classes"]
    calls_in, calls_out = Counter(), Counter()
    for edge in model["edges"]:
        assert (edge["target"] in nodes) != (edge["target"] in boxes)
        if edge["target"] in boxes:
            # A class target is the class itself: built from outside or from its own rows.
            assert edge["kind"] in {"constructs", "intra_class"}
            assert edge["back"] is False
            assert edge["reachable"] == (not nodes[edge["source"]]["dead"])
        else:
            assert edge["kind"] != "constructs"
            calls_in[edge["target"]] += 1
            calls_out[edge["source"]] += 1

    # Fan-in and fan-out count calls between callables, not constructions.
    for node_id, node in nodes.items():
        assert (node["fan_in"], node["fan_out"]) == (calls_in[node_id], calls_out[node_id])


def test_constructing_a_class_with_init_calls_its_constructor(tmp_path):
    snapshot = _snapshot("construction", tmp_path)
    model = snapshot["model"]
    nodes = {node["id"]: node for node in model["nodes"]}
    calls = {(call["source"], call["called_name"]): call for call in snapshot["calls"]}
    edges = {(edge["source"], edge["target"]): edge for edge in model["edges"]}

    # The call itself lands on the code that runs.
    assert calls[("pkg.draw.sketch", "Canvas")]["target"] == "pkg.shapes.Canvas.__init__"
    assert edges[("pkg.draw.sketch", "pkg.shapes.Canvas.__init__")]["kind"] == "into_class"
    # A constructor someone outside its class builds is no longer an entry point,
    # and it is live because its caller is.
    canvas_init = nodes["pkg.shapes.Canvas.__init__"]
    assert (canvas_init["is_root"], canvas_init["dead"], canvas_init["fan_in"]) == (False, False, 2)
    assert model["layout"]["classes"]["pkg.shapes.Canvas"]["row"] == 0

    functions = {item["id"]: item for item in snapshot["architecture"]["functions"]}
    assert [call["id"] for call in functions["pkg.draw.sketch"]["callees"]] == ["pkg.shapes.Canvas.__init__"]
    assert [call["id"] for call in functions["pkg.shapes.Canvas.__init__"]["callers"]] == [
        "pkg.draw.sketch",
        "pkg.shapes.Canvas.resized",
    ]
    pipeline = next(item for item in snapshot["architecture"]["pipelines"] if item["root"] == "pkg.draw.sketch")
    assert (pipeline["function_ids"], pipeline["edge_count"]) == (
        ["pkg.draw.sketch", "pkg.shapes.Canvas.__init__"],
        1,
    )


def test_constructing_a_class_without_init_draws_an_edge_into_its_box(tmp_path):
    snapshot = _snapshot("construction", tmp_path)
    model = snapshot["model"]
    edges = {(edge["source"], edge["target"]): edge for edge in model["edges"]}
    calls = {(call["source"], call["called_name"]): call for call in snapshot["calls"]}

    assert calls[("pkg.draw.sketch", "Point")]["target"] == "pkg.shapes.Point"
    assert edges[("pkg.draw.sketch", "pkg.shapes.Point")] == {
        "source": "pkg.draw.sketch",
        "target": "pkg.shapes.Point",
        "reachable": True,
        "kind": "constructs",
        "back": False,
    }
    # A dead caller's construction is drawn, but not as reachable.
    assert edges[("pkg.draw._unused", "pkg.shapes.Point")]["reachable"] is False
    # A class with neither methods nor fields has no box, so its construction
    # stays in calls only.
    assert calls[("pkg.draw.sketch", "Marker")]["target"] == "pkg.shapes.Marker"
    assert "pkg.shapes.Marker" not in model["layout"]["classes"]
    assert not any(edge["target"] == "pkg.shapes.Marker" for edge in model["edges"])
    assert model["layout"]["bundles"] == [
        {"source_module": "pkg.draw", "target_module": "pkg.shapes", "count": 3}
    ]


def test_self_construction_stays_inside_the_class(tmp_path):
    model = _snapshot("construction", tmp_path)["model"]
    nodes = {node["id"]: node for node in model["nodes"]}
    edges = {(edge["source"], edge["target"]): (edge["kind"], edge["back"]) for edge in model["edges"]}

    assert edges[("pkg.shapes.Point.shifted", "pkg.shapes.Point")] == ("intra_class", False)
    assert edges[("pkg.shapes.Canvas.resized", "pkg.shapes.Canvas.__init__")] == ("intra_class", False)
    # A class that only builds itself is still entered from outside: its
    # constructor stays a root, so the recursion closes a back edge into it.
    assert edges[("pkg.shapes.Tree.__init__", "pkg.shapes.Tree._grow")] == ("intra_class", False)
    assert edges[("pkg.shapes.Tree._grow", "pkg.shapes.Tree.__init__")] == ("intra_class", True)
    assert nodes["pkg.shapes.Tree.__init__"]["is_root"] is True
    assert nodes["pkg.shapes.Tree._grow"]["dead"] is False
    assert [node_id for node_id, node in nodes.items() if node["dead"]] == ["pkg.draw._unused"]


def test_reexported_imports_point_at_the_defining_module(tmp_path):
    snapshot = _snapshot("reexports", tmp_path)
    layout = snapshot["model"]["layout"]

    assert [column["module"] for column in layout["columns"]] == [
        "pkg.app",
        "pkg.shapes",
        "pkg.shapes.build",
        "pkg.shapes.records",
        "pkg.util",
    ]
    assert layout["imports"] == [
        # The package re-exports main and helper; the relative one is resolved too.
        ["pkg", "pkg.app"],
        ["pkg", "pkg.util"],
        # pkg has no column, but this pair closes the import cycle pkg <-> pkg.app.
        ["pkg.app", "pkg"],
        # pkg.shapes has a column, so the raw pair stays beside the defining modules;
        # UNIT is not a function or class, so it only resolves to the package.
        ["pkg.app", "pkg.shapes"],
        ["pkg.app", "pkg.shapes.build"],
        ["pkg.app", "pkg.shapes.records"],
        # helper is imported from pkg but defined in pkg.util.
        ["pkg.app", "pkg.util"],
        ["pkg.shapes", "pkg.shapes.build"],
        ["pkg.shapes", "pkg.shapes.records"],
        ["pkg.shapes.build", "pkg.shapes.records"],
    ]
    assert layout["import_cycles"] == [["pkg", "pkg.app"], ["pkg.app", "pkg"]]
    assert layout["import_targets_without_column"] == ["pkg"]


def test_package_pairs_are_dropped_only_when_the_package_has_no_column(tmp_path):
    files = dict(REEXPORTS)
    files["pkg/shapes/__init__.py"] = """
        from pkg.shapes.build import build_box
        from pkg.shapes.records import Box

        UNIT = 1
    """
    layout = analyze_path(_write(tmp_path / "plain", files))["model"]["layout"]

    # Box and build_box now resolve only to their defining modules; UNIT keeps
    # the package pair, which the renderer cannot draw.
    assert [pair for pair in layout["imports"] if pair[0] == "pkg.app"] == [
        ["pkg.app", "pkg"],
        ["pkg.app", "pkg.shapes"],
        ["pkg.app", "pkg.shapes.build"],
        ["pkg.app", "pkg.shapes.records"],
        ["pkg.app", "pkg.util"],
    ]
    assert layout["import_targets_without_column"] == ["pkg", "pkg.shapes"]


@pytest.mark.parametrize("name", sorted(HAND_BUILT))
def test_hand_built_snapshots_match_the_schema(name, tmp_path):
    jsonschema = pytest.importorskip("jsonschema")
    schema = json.loads((SRC.parent / "schema" / "atlas.schema.json").read_text(encoding="utf-8"))

    jsonschema.validators.validator_for(schema)(schema).validate(_snapshot(name, tmp_path).to_dict())
