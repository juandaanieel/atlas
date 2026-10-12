import ast

import pytest

from atlas.analyzer.ast_names import dotted_name


@pytest.mark.parametrize(
    ("expression", "expected"),
    [
        ("package.factory().worker[index].run", "package.factory.worker.run"),
        ("factory()()", "factory"),
        ("items[0][1]", "items"),
        ("(left + right).method", "method"),
        ("left + right", None),
    ],
)
def test_dotted_names_preserve_chained_calls_and_unknown_receivers(expression, expected):
    assert dotted_name(ast.parse(expression, mode="eval").body) == expected
