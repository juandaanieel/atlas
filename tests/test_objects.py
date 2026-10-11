from pathlib import Path

from atlas.analyzer.parser import parse_python_file
from atlas.analyzer.payload import analyze_path


FIXTURES = Path(__file__).parent / "fixtures"


def _runner_object():
    parsed = parse_python_file(FIXTURES / "class_package", Path("class_pkg/runner.py"))
    return next(item for item in parsed.objects if item["id"] == "class_pkg.runner.Runner")


def test_object_records_constructor_params_and_fields():
    runner = _runner_object()
    params = {param["name"]: param for param in runner["constructor"]["params"]}
    fields = {field["name"]: field for field in runner["fields"]}

    assert set(params) == {"repository", "offset"}
    assert params["repository"]["annotation"] == "Repository"
    assert params["repository"]["collaborator_id"] == "class_pkg.runner.Repository"

    assert fields["repository"]["source_kind"] == "param"
    assert fields["repository"]["source_name"] == "repository"
    assert fields["repository"]["collaborator_kind"] == "injected"
    assert fields["repository"]["collaborator_id"] == "class_pkg.runner.Repository"

    assert fields["stepper"]["source_kind"] == "call"
    assert fields["stepper"]["source_name"] == "Stepper"
    assert fields["stepper"]["collaborator_kind"] == "owned"
    assert fields["stepper"]["collaborator_id"] == "class_pkg.runner.Stepper"

    assert fields["ready"]["source_kind"] == "literal"
    assert runner["constructor"]["assigned_fields"] == [
        "offset",
        "ready",
        "repository",
        "stepper",
    ]


def test_constructor_params_preserve_python_order_and_kinds(tmp_path):
    source = tmp_path / "config.py"
    source.write_text(
        """class Service:
    pass

class Config:
    def __init__(self, source, /, *services: Service, option=True, **extras):
        self.services = services
""",
        encoding="utf-8",
    )

    parsed = parse_python_file(tmp_path, Path("config.py"))
    config = next(item for item in parsed.objects if item["id"] == "config.Config")
    params = config["constructor"]["params"]

    assert [(param["name"], param["kind"]) for param in params] == [
        ("source", "positional-only"),
        ("services", "variadic"),
        ("option", "keyword-only"),
        ("extras", "keyword-variadic"),
    ]
    services = next(field for field in config["fields"] if field["name"] == "services")
    assert services["source_kind"] == "param"
    assert services["source_name"] == "services"


def test_object_separates_public_private_and_constructor_methods():
    runner = _runner_object()
    methods = runner["methods"]

    assert runner["constructor"]["method_id"] == "class_pkg.runner.Runner.__init__"
    assert "constructor" not in methods
    assert methods["public"] == [
        "class_pkg.runner.Runner.run",
        "class_pkg.runner.Runner.step",
    ]
    assert methods["private"] == [
        "class_pkg.runner.Runner._prepare",
        "class_pkg.runner.Runner._normalize",
    ]


def test_object_records_method_field_access_and_collaborator_calls():
    runner = _runner_object()
    access_by_method = {
        item["method_id"]: item
        for item in runner["field_access"]
    }
    run_access = access_by_method["class_pkg.runner.Runner.run"]

    assert run_access["reads"] == ["offset", "repository", "stepper"]
    assert run_access["writes"] == []
    assert run_access["collaborator_calls"] == [
        {
            "field": "repository",
            "method": "save",
            "called_name": "repository.save",
            "line": 43,
        },
        {
            "field": "stepper",
            "method": "step",
            "called_name": "stepper.step",
            "line": 44,
        },
    ]


def test_payload_includes_objects_and_classes_without_constructors_or_methods():
    payload = analyze_path(FIXTURES / "class_package")
    objects = {item["id"]: item for item in payload["objects"]}

    assert "class_pkg.runner.Runner" in objects
    assert objects["class_pkg.runner.Repository"]["constructor"] == {
        "method_id": None,
        "params": [],
        "assigned_fields": [],
    }
    assert objects["class_pkg.runner.Empty"]["methods"] == {"public": [], "private": []}
    assert payload["overview"]["class_count"] == 5


def test_onion_rings_place_public_surface_on_the_skin_and_privates_inward():
    payload = analyze_path(FIXTURES / "class_package")
    objects = {item["id"]: item for item in payload["objects"]}
    onion = objects["class_pkg.runner.Runner"]["onion"]
    ring_by_method = {item["id"]: item for item in onion["methods"]}

    # The skin (ring 0) is the constructor plus every public method.
    assert onion["ring_count"] == 2
    assert ring_by_method["class_pkg.runner.Runner.__init__"]["ring"] == 0
    assert ring_by_method["class_pkg.runner.Runner.run"]["ring"] == 0
    # Privates reached only from the skin sit one ring deeper, none detached.
    assert ring_by_method["class_pkg.runner.Runner._prepare"]["ring"] == 1
    assert ring_by_method["class_pkg.runner.Runner._normalize"]["ring"] == 1
    assert all(not item["detached"] for item in onion["methods"])


def test_onion_flags_private_methods_no_public_surface_reaches(tmp_path):
    source = tmp_path / "widget.py"
    source.write_text(
        """class Widget:
    def render(self):
        return self._draw()

    def _draw(self):
        return 1

    def _orphan(self):
        return self._deeper_orphan()

    def _deeper_orphan(self):
        return 2
""",
        encoding="utf-8",
    )

    parsed = parse_python_file(tmp_path, Path("widget.py"))
    # extract_objects does not resolve calls, so rings need the call graph.
    from atlas.analyzer.objects import assign_onion_rings

    payload_objects = list(parsed.objects)
    calls = [
        {"source": "widget.Widget.render", "target": "widget.Widget._draw"},
        {"source": "widget.Widget._orphan", "target": "widget.Widget._deeper_orphan"},
    ]
    assign_onion_rings(payload_objects, calls)
    onion = next(item for item in payload_objects if item["id"] == "widget.Widget")["onion"]
    ring_by_method = {item["id"]: item for item in onion["methods"]}

    assert ring_by_method["widget.Widget.render"]["ring"] == 0
    assert ring_by_method["widget.Widget._draw"]["ring"] == 1
    # Never reached from the public surface: detached, no ring.
    assert ring_by_method["widget.Widget._orphan"]["detached"] is True
    assert ring_by_method["widget.Widget._orphan"]["ring"] is None
    assert ring_by_method["widget.Widget._deeper_orphan"]["detached"] is True


def test_dataclass_declared_fields_become_state_core(tmp_path):
    source = tmp_path / "layer.py"
    source.write_text(
        """from dataclasses import dataclass


@dataclass
class Layer:
    name: str
    thickness_nm: float = 1.0

    def __post_init__(self):
        self.ready = True
""",
        encoding="utf-8",
    )

    parsed = parse_python_file(tmp_path, Path("layer.py"))
    layer = next(item for item in parsed.objects if item["id"] == "layer.Layer")
    fields = {field["name"]: field for field in layer["fields"]}

    assert fields["name"]["source_kind"] == "declaration"
    assert fields["thickness_nm"]["source_kind"] == "declaration"
    # Fields assigned inside methods still register alongside declarations.
    assert "ready" in fields


def test_object_source_and_calls_support_a_class_method_map():
    payload = analyze_path(FIXTURES / "class_package")
    objects = {item["id"]: item for item in payload["objects"]}
    runner = objects["class_pkg.runner.Runner"]
    edges = {
        (edge["source"], edge["target"])
        for edge in payload["model"]["edges"]
    }

    assert runner["source_excerpt"].startswith("class Runner:")
    assert "def _prepare" in runner["source_excerpt"]
    assert (
        "class_pkg.runner.Runner.__init__",
        "class_pkg.runner.Runner._prepare",
    ) in edges
    assert (
        "class_pkg.runner.Runner.__init__",
        "class_pkg.runner.Runner.run",
    ) not in edges


def test_object_records_bases():
    parsed = parse_python_file(FIXTURES / "class_package", Path("class_pkg/runner.py"))
    by_id = {item["id"]: item for item in parsed.objects}

    assert by_id["class_pkg.runner.Runner"]["bases"] == []
    assert by_id["class_pkg.runner.AuditRepository"]["bases"] == [
        {"name": "Repository", "collaborator_id": "class_pkg.runner.Repository"}
    ]


def test_object_tracks_read_write_access_without_entering_nested_scopes(tmp_path):
    source = tmp_path / "state.py"
    source.write_text(
        """class Counter:
    def __init__(self):
        self.count = 0

    def bump(self):
        self.count += 1
        def nested():
            self.hidden = 1
        callback = lambda: self.ghost
        return self.count
""",
        encoding="utf-8",
    )

    parsed = parse_python_file(tmp_path, Path("state.py"))
    counter = next(item for item in parsed.objects if item["id"] == "state.Counter")
    fields = {field["name"] for field in counter["fields"]}
    bump = next(
        access
        for access in counter["field_access"]
        if access["method_id"] == "state.Counter.bump"
    )

    assert fields == {"count"}
    assert bump["reads"] == ["count"]
    assert bump["writes"] == ["count"]
