from pathlib import Path

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
    assert not any(
        edge["source"] == "sample.main.make"
        for edge in payload["model"]["edges"]
    )

    make = next(
        function
        for function in payload["architecture"]["functions"]
        if function["id"] == "sample.main.make"
    )
    assert make["callees"] == []
    symbols = {symbol["id"]: symbol for symbol in payload["symbols"]}
    assert symbols["sample.main.make"]["metrics"]["same_file_outgoing"] == 0
    assert symbols["sample.main.Worker"]["metrics"]["same_file_incoming"] == 0
