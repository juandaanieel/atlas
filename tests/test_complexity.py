import ast

import pytest

from atlas.analyzer.complexity import function_complexity


def _metrics(source: str) -> dict[str, int]:
    node = ast.parse(source).body[0]
    assert isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef))
    return function_complexity(node)


def test_straight_line_function_has_one_path_and_no_nesting():
    assert _metrics(
        """
def format_name(name):
    cleaned = name.strip()
    return cleaned.title()
"""
    ) == {
        "cyclomatic_complexity": 1,
        "cognitive_complexity": 0,
        "max_nesting_depth": 0,
    }


def test_nested_control_flow_separates_paths_from_reading_burden():
    assert _metrics(
        """
def select(items, enabled):
    for item in items:
        if enabled and item.ready:
            return item
    return None
"""
    ) == {
        "cyclomatic_complexity": 4,
        "cognitive_complexity": 4,
        "max_nesting_depth": 2,
    }


def test_nested_definitions_do_not_inflate_the_parent_function():
    assert _metrics(
        """
def outer():
    def inner(value):
        if value:
            return 1
        return 0
    return inner
"""
    ) == {
        "cyclomatic_complexity": 1,
        "cognitive_complexity": 0,
        "max_nesting_depth": 0,
    }


def test_elif_adds_a_branch_without_deepening_nesting():
    assert _metrics(
        """
def choose(primary, fallback):
    if primary:
        return primary
    elif fallback:
        return fallback
    return None
"""
    ) == {
        "cyclomatic_complexity": 3,
        "cognitive_complexity": 2,
        "max_nesting_depth": 1,
    }


@pytest.mark.parametrize("body", [
    "if ready: pass",
    "return 1 if ready else 0",
    "for item in items: pass",
    "async for item in items: pass",
    "while ready: break",
    "with context: pass",
    "async with context: pass",
    "assert ready",
])
def test_each_branch_form_counts_one_cyclomatic_path(body):
    assert _metrics(f"async def run():\n    {body}\n")["cyclomatic_complexity"] == 2
