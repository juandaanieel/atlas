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
