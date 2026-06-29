from pathlib import Path

from atlas.analyzer.docstrings import summarize_docstring
from atlas.analyzer.parser import parse_python_file


FIXTURES = Path(__file__).parent / "fixtures"


def test_extracts_classes_methods_decorators_and_source():
    parsed = parse_python_file(FIXTURES / "class_package", Path("class_pkg/runner.py"))
    symbols = {symbol.id: symbol for symbol in parsed.symbols}

    assert "class_pkg.runner.Runner" in symbols
    assert "class_pkg.runner.Runner.run" in symbols
    assert "class_pkg.runner.Runner.step" in symbols
    assert symbols["class_pkg.runner.Runner.step"].decorators == ["staticmethod"]
    assert "return self.step(value)" in symbols["class_pkg.runner.Runner.run"].source_excerpt


def test_extracts_async_functions():
    parsed = parse_python_file(FIXTURES / "async_package", Path("async_pkg/work.py"))
    symbols = {symbol.name: symbol for symbol in parsed.symbols}

    assert symbols["fetch_value"].is_async is True
    assert symbols["run"].is_async is True


def test_marks_test_files_and_test_functions():
    parsed = parse_python_file(FIXTURES / "test_package", Path("test_pkg/test_sample.py"))
    test_symbol = next(symbol for symbol in parsed.symbols if symbol.name == "test_adds_numbers")

    assert parsed.file.is_test is True
    assert test_symbol.is_test is True


def test_docstring_summary_uses_first_sentence():
    import ast

    node = ast.parse('def f():\n    """First sentence. Second sentence."""\n    return 1\n').body[0]

    assert summarize_docstring(node) == "First sentence."
