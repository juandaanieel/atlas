from pathlib import Path

import pytest

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
    assert "return self.stepper.step" in symbols["class_pkg.runner.Runner.run"].source_excerpt
    assert symbols["class_pkg.runner.Runner.run"].parameters == [
        {"name": "value", "kind": "positional", "annotation": None, "default": None}
    ]
    assert symbols["class_pkg.runner.Runner.run"].return_annotation is None


def test_extracts_async_functions():
    parsed = parse_python_file(FIXTURES / "async_package", Path("async_pkg/work.py"))
    symbols = {symbol.name: symbol for symbol in parsed.symbols}

    assert symbols["fetch_value"].is_async is True
    assert symbols["run"].is_async is True


def test_extracts_function_inputs_and_declared_output(tmp_path):
    source = tmp_path / "typed.py"
    source.write_text(
        "def transform(value: float, *, scale: float = 1.0, **options: str) -> list[float]:\n    return [value * scale]\n",
        encoding="utf-8",
    )

    parsed = parse_python_file(tmp_path, Path("typed.py"))
    symbol = next(item for item in parsed.symbols if item.name == "transform")

    assert symbol.parameters == [
        {"name": "value", "kind": "positional", "annotation": "float", "default": None},
        {"name": "scale", "kind": "keyword-only", "annotation": "float", "default": "1.0"},
        {"name": "options", "kind": "keyword-variadic", "annotation": "str", "default": None},
    ]
    assert symbol.return_annotation == "list[float]"


def test_preserves_positional_only_and_keyword_only_parameter_kinds(tmp_path):
    source = tmp_path / "signature.py"
    source.write_text(
        "def select(source, /, target='item', *, strict=False):\n    return target\n",
        encoding="utf-8",
    )

    parsed = parse_python_file(tmp_path, Path("signature.py"))
    symbol = next(item for item in parsed.symbols if item.name == "select")

    assert [parameter["kind"] for parameter in symbol.parameters] == [
        "positional-only",
        "positional",
        "keyword-only",
    ]


def test_marks_test_files_and_test_functions():
    parsed = parse_python_file(FIXTURES / "test_package", Path("test_pkg/test_sample.py"))
    test_symbol = next(symbol for symbol in parsed.symbols if symbol.name == "test_adds_numbers")

    assert parsed.file.is_test is True
    assert test_symbol.is_test is True


def test_reads_pep_263_encoded_python(tmp_path):
    source = tmp_path / "encoded.py"
    source.write_bytes(
        b'# coding: latin-1\n\ndef greeting():\n    """caf\xe9."""\n    return "caf\xe9"\n'
    )

    parsed = parse_python_file(tmp_path, Path("encoded.py"))
    greeting = next(symbol for symbol in parsed.symbols if symbol.name == "greeting")

    assert greeting.docstring_summary == "caf\u00e9."


def test_rejects_symlinked_python_source(tmp_path):
    root = tmp_path / "root"
    root.mkdir()
    outside = tmp_path / "outside.py"
    outside.write_text("def secret():\n    return 1\n", encoding="utf-8")
    (root / "linked.py").symlink_to(outside)

    with pytest.raises(ValueError, match="symlinked Python source"):
        parse_python_file(root, Path("linked.py"))


def test_docstring_summary_uses_first_sentence():
    import ast

    node = ast.parse('def f():\n    """First sentence. Second sentence."""\n    return 1\n').body[0]

    assert summarize_docstring(node) == "First sentence."
