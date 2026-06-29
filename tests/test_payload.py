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
