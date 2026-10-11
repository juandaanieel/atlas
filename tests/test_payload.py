from pathlib import Path
import subprocess

from atlas.analyzer.calls import resolve_import_symbols
from atlas.analyzer.discovery import discover_python_files
from atlas.analyzer.parser import parse_python_file
from atlas.analyzer.payload import analyze_path


FIXTURES = Path(__file__).parent / "fixtures"


def test_payload_contains_same_file_and_cross_file_calls():
    payload = analyze_path(FIXTURES / "simple_package")

    calls = {(call["source"], call["target"], call["kind"]) for call in payload["calls"]}

    assert ("simple_pkg.a.main", "simple_pkg.a.helper", "same_file") in calls
    assert ("simple_pkg.a.main", "simple_pkg.b.beta", "cross_file") in calls
    assert payload["overview"]["function_count"] == 3


def test_payload_reports_external_and_unresolved_calls():
    payload = analyze_path(FIXTURES / "unresolved_package")
    kinds = [call["kind"] for call in payload["calls"]]
    compute = next(symbol for symbol in payload["symbols"] if symbol["id"] == "unresolved_pkg.problem.compute")

    assert "external" in kinds
    assert "unresolved" in kinds
    assert compute["metrics"]["external_outgoing"] == 2
    assert compute["metrics"]["unresolved_outgoing"] == 2
    assert "unresolved_calls" in compute["warnings"]


def test_payload_detects_circular_imports():
    payload = analyze_path(FIXTURES / "circular_package")

    assert payload["overview"]["circular_import_count"] == 1
    assert payload["overview"]["circular_imports"][0][0] == "circular_pkg.a"


def test_payload_records_git_status_for_the_analyzed_root(tmp_path):
    subprocess.run(["git", "init"], cwd=tmp_path, check=True, capture_output=True)
    tracked = tmp_path / "tracked.py"
    tracked.write_text("def first():\n    return 1\n", encoding="utf-8")
    subprocess.run(["git", "add", "tracked.py"], cwd=tmp_path, check=True)
    tracked.write_text("def first():\n    return 2\n", encoding="utf-8")
    (tmp_path / "untracked.py").write_text("def second():\n    return 2\n", encoding="utf-8")

    git = analyze_path(tmp_path)["git"]
    by_path = {file["path"]: file for file in git["files"]}

    assert git["available"] is True
    assert git["dirty"] is True
    assert git["counts"] == {
        "changed": 2,
        "staged": 1,
        "unstaged": 1,
        "untracked": 1,
        "conflicted": 0,
    }
    assert by_path["tracked.py"]["status"] == "modified"
    assert by_path["tracked.py"]["staged"] is True
    assert by_path["untracked.py"]["status"] == "untracked"


def test_calls_respect_callable_scope_and_python_method_lookup(tmp_path):
    package = tmp_path / "sample"
    package.mkdir()
    (package / "__init__.py").write_text("", encoding="utf-8")
    (package / "tools.py").write_text(
        "def imported():\n    return 1\n\ndef alternate():\n    return 2\n",
        encoding="utf-8",
    )
    (package / "main.py").write_text(
        """import sample.tools

FLAG = False
if FLAG:
    from sample.tools import imported as conditional_module_import

from sample.tools import imported as ambiguous_module_import
if FLAG:
    from sample.tools import alternate as ambiguous_module_import

from sample.tools import imported as assigned_module_import
assigned_module_import = lambda: 0

from sample.tools import imported as defined_module_import
def defined_module_import():
    return 0

def dotted():
    return sample.tools.imported()

def conditional_module():
    return conditional_module_import()

def ambiguous_module():
    return ambiguous_module_import()

def assigned_module():
    return assigned_module_import()

def defined_module():
    return defined_module_import()

def scoped():
    from sample.tools import imported as local_imported
    return local_imported()

def unrelated():
    return local_imported()

def too_early():
    result = late_import()
    from sample.tools import imported as late_import
    return result

def conditional_local(flag):
    if flag:
        from sample.tools import imported as branch_import
    return branch_import()

def ambiguous_local(flag):
    from sample.tools import imported as maybe_import
    if flag:
        from sample.tools import alternate as maybe_import
    return maybe_import()

def except_shadow():
    try:
        return 0
    except Exception as helper:
        return helper()

def comprehension_shadow(items):
    return [helper() for helper in items]

def outer():
    def nested():
        return sample.tools.imported()
    return 1

def helper():
    return 1

def shadowed(helper):
    return helper()

def rebound():
    sample = object()
    return sample.tools.imported()

class Worker:
    def task(self):
        return 1

    def run(self):
        return task()

def make():
    return Worker()
""",
        encoding="utf-8",
    )

    payload = analyze_path(tmp_path)
    calls = {
        (call["source"], call["called_name"]): call
        for call in payload["calls"]
    }

    assert calls[("sample.main.dotted", "sample.tools.imported")]["target"] == (
        "sample.tools.imported"
    )
    assert calls[("sample.main.scoped", "local_imported")]["target"] == (
        "sample.tools.imported"
    )
    assert calls[("sample.main.unrelated", "local_imported")]["kind"] == "unresolved"
    assert calls[("sample.main.too_early", "late_import")]["kind"] == "unresolved"
    assert calls[("sample.main.conditional_module", "conditional_module_import")]["kind"] == (
        "unresolved"
    )
    assert calls[("sample.main.conditional_local", "branch_import")]["kind"] == "unresolved"
    assert calls[("sample.main.ambiguous_module", "ambiguous_module_import")]["kind"] == (
        "unresolved"
    )
    assert calls[("sample.main.assigned_module", "assigned_module_import")]["kind"] == (
        "unresolved"
    )
    assert calls[("sample.main.defined_module", "defined_module_import")]["kind"] == (
        "unresolved"
    )
    assert calls[("sample.main.ambiguous_local", "maybe_import")]["kind"] == "unresolved"
    assert calls[("sample.main.except_shadow", "helper")]["kind"] == "unresolved"
    assert calls[("sample.main.comprehension_shadow", "helper")]["kind"] == "unresolved"
    assert not any(call["source"] == "sample.main.outer" for call in payload["calls"])
    assert calls[("sample.main.shadowed", "helper")]["kind"] == "unresolved"
    assert calls[("sample.main.rebound", "sample.tools.imported")]["kind"] == "unresolved"
    assert calls[("sample.main.Worker.run", "task")]["kind"] == "unresolved"
    assert calls[("sample.main.make", "Worker")]["target"] == "sample.main.Worker"
    # Worker has no __init__ of its own, so the call map draws the construction
    # into the class box rather than inventing a constructor to call.
    assert [
        (edge["target"], edge["kind"])
        for edge in payload["model"]["edges"]
        if edge["source"] == "sample.main.make"
    ] == [("sample.main.Worker", "constructs")]

    make = next(
        function
        for function in payload["architecture"]["functions"]
        if function["id"] == "sample.main.make"
    )
    assert make["callees"] == []
    symbols = {symbol["id"]: symbol for symbol in payload["symbols"]}
    assert symbols["sample.main.make"]["metrics"]["same_file_outgoing"] == 0
    assert symbols["sample.main.Worker"]["metrics"]["same_file_incoming"] == 0


def test_calls_follow_package_reexports_into_implementation_modules(tmp_path):
    package = tmp_path / "sample"
    package.mkdir()
    examples = tmp_path / "examples"
    examples.mkdir()
    (package / "__init__.py").write_text(
        "from .api import public_run\n",
        encoding="utf-8",
    )
    (package / "api.py").write_text(
        "from .engine import run as public_run\n",
        encoding="utf-8",
    )
    (package / "engine.py").write_text(
        "def helper():\n    return 1\n\ndef run():\n    return helper()\n",
        encoding="utf-8",
    )
    (examples / "workflow.py").write_text(
        "from sample import public_run\n\ndef main():\n    return public_run()\n",
        encoding="utf-8",
    )

    payload = analyze_path(tmp_path)
    calls = {
        (call["source"], call["called_name"]): call
        for call in payload["calls"]
    }

    workflow_call = calls[("examples.workflow.main", "public_run")]
    assert workflow_call["target"] == "sample.engine.run"
    assert workflow_call["kind"] == "cross_file"
    assert calls[("sample.engine.run", "helper")]["target"] == "sample.engine.helper"


def test_import_symbols_follow_package_reexports_to_the_definition(tmp_path):
    package = tmp_path / "sample"
    package.mkdir()
    examples = tmp_path / "examples"
    examples.mkdir()
    (package / "__init__.py").write_text(
        "from .api import public_run\nfrom . import engine\n",
        encoding="utf-8",
    )
    (package / "api.py").write_text(
        "import os\nfrom .engine import run as public_run\nfrom .engine import *\n",
        encoding="utf-8",
    )
    (package / "engine.py").write_text(
        "LIMIT = 3\n\nclass Job:\n    pass\n\ndef run():\n    return Job()\n",
        encoding="utf-8",
    )
    (examples / "workflow.py").write_text(
        "import sample.engine\n"
        "from json import dumps\n"
        "from sample import public_run\n"
        "from sample.api import public_run as again\n"
        "from sample.engine import LIMIT, Job\n",
        encoding="utf-8",
    )
    parsed_files = [parse_python_file(tmp_path, path) for path in discover_python_files(tmp_path)]

    resolve_import_symbols(parsed_files, [symbol for parsed in parsed_files for symbol in parsed.symbols])

    symbols = {
        (info.module, info.name, info.alias): info.symbol
        for parsed in parsed_files
        for info in parsed.imports
    }
    assert symbols == {
        # Through the package and then the api module to the definition.
        ("sample", "public_run", None): "sample.engine.run",
        ("examples.workflow", "public_run", None): "sample.engine.run",
        ("examples.workflow", "public_run", "again"): "sample.engine.run",
        ("sample.api", "run", "public_run"): "sample.engine.run",
        ("examples.workflow", "Job", None): "sample.engine.Job",
        # Modules, star imports, external names, and plain values bind no definition.
        ("sample", "engine", None): None,
        ("sample.api", "os", None): None,
        ("sample.api", "*", None): None,
        ("examples.workflow", "sample.engine", None): None,
        ("examples.workflow", "dumps", None): None,
        ("examples.workflow", "LIMIT", None): None,
    }
