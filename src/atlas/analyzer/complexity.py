from __future__ import annotations

import ast


FUNCTION_NODES = (ast.FunctionDef, ast.AsyncFunctionDef)
LOOP_NODES = (ast.For, ast.AsyncFor, ast.While)
COMPREHENSION_NODES = (ast.ListComp, ast.SetComp, ast.DictComp, ast.GeneratorExp)


def function_complexity(node: ast.FunctionDef | ast.AsyncFunctionDef) -> dict[str, int]:
    """Return control-flow metrics for one function without counting nested definitions."""
    cyclomatic = _CyclomaticVisitor()
    for statement in node.body:
        cyclomatic.visit(statement)
    cognitive = _CognitiveCounter()
    for statement in node.body:
        cognitive.visit(statement, 0)
    nesting = _NestingCounter()
    for statement in node.body:
        nesting.visit(statement, 0)
    return {
        "cyclomatic_complexity": cyclomatic.value,
        "cognitive_complexity": cognitive.value,
        "max_nesting_depth": nesting.maximum,
    }


class _CyclomaticVisitor(ast.NodeVisitor):
    def __init__(self) -> None:
        self.value = 1

    def visit_FunctionDef(self, node: ast.FunctionDef) -> None:
        return

    def visit_AsyncFunctionDef(self, node: ast.AsyncFunctionDef) -> None:
        return

    def visit_ClassDef(self, node: ast.ClassDef) -> None:
        return

    def visit_If(self, node: ast.If) -> None:
        self.value += 1
        self.generic_visit(node)

    def visit_IfExp(self, node: ast.IfExp) -> None:
        self.value += 1
        self.generic_visit(node)

    def visit_For(self, node: ast.For) -> None:
        self.value += 1
        self.generic_visit(node)

    def visit_AsyncFor(self, node: ast.AsyncFor) -> None:
        self.value += 1
        self.generic_visit(node)

    def visit_While(self, node: ast.While) -> None:
        self.value += 1
        self.generic_visit(node)

    def visit_With(self, node: ast.With) -> None:
        self.value += 1
        self.generic_visit(node)

    def visit_AsyncWith(self, node: ast.AsyncWith) -> None:
        self.value += 1
        self.generic_visit(node)

    def visit_Try(self, node: ast.Try) -> None:
        self.value += len(node.handlers)
        self.generic_visit(node)

    def visit_Assert(self, node: ast.Assert) -> None:
        self.value += 1
        self.generic_visit(node)

    def visit_BoolOp(self, node: ast.BoolOp) -> None:
        self.value += max(0, len(node.values) - 1)
        self.generic_visit(node)

    def visit_comprehension(self, node: ast.comprehension) -> None:
        self.value += 1 + len(node.ifs)
        self.generic_visit(node)

    def visit_Match(self, node: ast.Match) -> None:
        default_cases = sum(
            isinstance(case.pattern, ast.MatchAs)
            and case.pattern.pattern is None
            and case.pattern.name is None
            for case in node.cases
        )
        self.value += max(0, len(node.cases) - default_cases)
        self.generic_visit(node)


class _CognitiveCounter:
    def __init__(self) -> None:
        self.value = 0

    def visit(self, node: ast.AST, nesting: int) -> None:
        if isinstance(node, FUNCTION_NODES + (ast.ClassDef,)):
            return
        if isinstance(node, ast.If):
            self._visit_if(node, nesting, is_elif=False)
            return
        if isinstance(node, LOOP_NODES):
            self.value += 1 + nesting
            self._visit_fields(node, nesting, nested_fields={"body", "orelse"})
            return
        if isinstance(node, ast.Try):
            for statement in node.body:
                self.visit(statement, nesting)
            for handler in node.handlers:
                self.value += 1 + nesting
                for statement in handler.body:
                    self.visit(statement, nesting + 1)
            for statement in node.orelse + node.finalbody:
                self.visit(statement, nesting)
            return
        if isinstance(node, ast.Match):
            self.value += 1 + nesting
            self.visit(node.subject, nesting)
            for case in node.cases:
                if case.guard:
                    self.visit(case.guard, nesting + 1)
                for statement in case.body:
                    self.visit(statement, nesting + 1)
            return
        if isinstance(node, ast.IfExp):
            self.value += 1 + nesting
            self.visit(node.test, nesting)
            self.visit(node.body, nesting + 1)
            self.visit(node.orelse, nesting + 1)
            return
        if isinstance(node, COMPREHENSION_NODES):
            self._visit_comprehension(node, nesting)
            return
        if isinstance(node, ast.BoolOp):
            self.value += 1
        elif isinstance(node, (ast.Break, ast.Continue)):
            self.value += 1
        elif isinstance(node, ast.Lambda):
            self.visit(node.body, nesting + 1)
            return
        for child in ast.iter_child_nodes(node):
            self.visit(child, nesting)

    def _visit_if(self, node: ast.If, nesting: int, is_elif: bool) -> None:
        self.value += 1 if is_elif else 1 + nesting
        self.visit(node.test, nesting)
        for statement in node.body:
            self.visit(statement, nesting + 1)
        if len(node.orelse) == 1 and isinstance(node.orelse[0], ast.If):
            self._visit_if(node.orelse[0], nesting, is_elif=True)
        elif node.orelse:
            self.value += 1
            for statement in node.orelse:
                self.visit(statement, nesting + 1)

    def _visit_comprehension(self, node: ast.AST, nesting: int) -> None:
        generators = node.generators
        for index, generator in enumerate(generators):
            level = nesting + index
            self.value += 1 + level
            self.visit(generator.iter, level)
            for condition in generator.ifs:
                self.value += 1 + level + 1
                self.visit(condition, level + 1)
        for field in ("elt", "key", "value"):
            value = getattr(node, field, None)
            if value is not None:
                self.visit(value, nesting + len(generators))

    def _visit_fields(
        self,
        node: ast.AST,
        nesting: int,
        nested_fields: set[str],
    ) -> None:
        for field, value in ast.iter_fields(node):
            if field in nested_fields:
                items = value if isinstance(value, list) else [value]
                for item in items:
                    if isinstance(item, ast.AST):
                        self.visit(item, nesting + 1)
            elif isinstance(value, ast.AST):
                self.visit(value, nesting)
            elif isinstance(value, list):
                for item in value:
                    if isinstance(item, ast.AST):
                        self.visit(item, nesting)


class _NestingCounter:
    def __init__(self) -> None:
        self.maximum = 0

    def visit(self, node: ast.AST, nesting: int) -> None:
        if isinstance(node, FUNCTION_NODES + (ast.ClassDef,)):
            return
        if isinstance(node, ast.If):
            self._visit_if(node, nesting, is_elif=False)
            return
        if isinstance(node, LOOP_NODES):
            level = nesting + 1
            self.maximum = max(self.maximum, level)
            self._visit_fields(node, nesting, nested_fields={"body", "orelse"})
            return
        if isinstance(node, ast.Try):
            for statement in node.body:
                self.visit(statement, nesting)
            for handler in node.handlers:
                level = nesting + 1
                self.maximum = max(self.maximum, level)
                for statement in handler.body:
                    self.visit(statement, level)
            for statement in node.orelse + node.finalbody:
                self.visit(statement, nesting)
            return
        if isinstance(node, ast.Match):
            level = nesting + 1
            self.maximum = max(self.maximum, level)
            for case in node.cases:
                for statement in case.body:
                    self.visit(statement, level)
            return
        if isinstance(node, ast.IfExp):
            level = nesting + 1
            self.maximum = max(self.maximum, level)
            self.visit(node.body, level)
            self.visit(node.orelse, level)
            return
        if isinstance(node, COMPREHENSION_NODES):
            level = nesting + len(node.generators)
            self.maximum = max(self.maximum, level)
            for child in ast.iter_child_nodes(node):
                self.visit(child, level)
            return
        for child in ast.iter_child_nodes(node):
            self.visit(child, nesting)

    def _visit_if(self, node: ast.If, nesting: int, is_elif: bool) -> None:
        level = nesting + 1
        self.maximum = max(self.maximum, level)
        for statement in node.body:
            self.visit(statement, max(level, nesting + 1))
        if len(node.orelse) == 1 and isinstance(node.orelse[0], ast.If):
            self._visit_if(node.orelse[0], nesting, is_elif=True)
        else:
            for statement in node.orelse:
                self.visit(statement, max(level, nesting + 1))

    def _visit_fields(
        self,
        node: ast.AST,
        nesting: int,
        nested_fields: set[str],
    ) -> None:
        level = nesting + 1
        for field, value in ast.iter_fields(node):
            next_nesting = level if field in nested_fields else nesting
            items = value if isinstance(value, list) else [value]
            for item in items:
                if isinstance(item, ast.AST):
                    self.visit(item, next_nesting)
