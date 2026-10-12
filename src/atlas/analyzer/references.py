"""Resolve callable uses that are not necessarily direct calls.

A callback, alias, or captured function can execute later. These references
contribute to potential reachability, but never to call counts or drawn edges.
"""
from __future__ import annotations

import ast

from atlas.analyzer.calls import (
    AssignmentVisitor, ScopeVisitor, _callable_scope, _direct_definition_names,
    _direct_imports, _exported_symbols, _resolve_imported,
)
from atlas.analyzer.imports import build_import_aliases


def build_references(parsed_files, symbols):
    by_id = {s.id: s for s in symbols}
    modules = {p.file.module for p in parsed_files}
    exports = _exported_symbols(parsed_files, symbols)
    references = []
    for parsed in parsed_files:
        bindings = {s.name: s.id for s in parsed.symbols if s.kind in {'function', 'class'}}
        imports = _direct_imports(parsed, parsed.tree)
        aliases = build_import_aliases(parsed.file.module, imports, modules, set(by_id), exports)
        for name, alias in aliases.items():
            target = _resolve_imported([name], aliases, by_id)
            bindings[name] = None if alias.get('external') else target or alias.get('module')
        # Assignments are processed in source order below. Function bodies cannot
        # assume a global has retained its initial value after module execution.
        globals_for_functions = dict(bindings)
        for name in AssignmentVisitor().collect(parsed.tree):
            globals_for_functions[name] = None
        visitor = ReferenceVisitor(parsed, by_id, modules, exports, references)
        visitor.bindings = bindings
        for statement in parsed.tree.body:
            visitor.visit(statement)
        for sid, node in parsed.callable_nodes.items():
            visitor.source = sid
            visitor.class_id = by_id[sid].class_id
            visitor.scan_scope(node, globals_for_functions)
    return sorted(references, key=lambda r: (r['file_id'], r['source'] or '', r['line'], r['target']))


class ReferenceVisitor(ast.NodeVisitor):
    """Track lexical bindings while collecting concrete local symbol references."""

    def __init__(self, parsed, symbols, modules, exports, references):
        self.parsed = parsed
        self.symbols = symbols
        self.modules = modules
        self.exports = exports
        self.references = references
        self.bindings = {}
        self.source = None
        self.class_id = None

    def target(self, node):
        if isinstance(node, ast.Name):
            return self.bindings.get(node.id)
        if isinstance(node, ast.Attribute):
            base = self.target(node.value)
            candidate = f'{base}.{node.attr}' if base else None
            if candidate in self.symbols or candidate in self.modules:
                return candidate
            return self.exports.get(candidate)
        if isinstance(node, ast.Call):
            target = self.target(node.func)
            if target in self.symbols and self.symbols[target].kind == 'class':
                return target
        return None

    def record(self, node):
        target = self.target(node)
        if target not in self.symbols:
            return
        if self.symbols[target].kind == 'class':
            target = f'{target}.__init__'
        if target in self.symbols:
            self.references.append({'source': self.source, 'target': target,
                                    'file_id': self.parsed.file.id, 'line': node.lineno})

    def visit_Name(self, node):
        if isinstance(node.ctx, ast.Load):
            self.record(node)

    def visit_Attribute(self, node):
        if isinstance(node.ctx, ast.Load):
            self.record(node)
        self.visit(node.value)

    def visit_Assign(self, node):
        self.visit(node.value)
        target = self.target(node.value)
        for lhs in node.targets:
            for name in ast.walk(lhs):
                if isinstance(name, ast.Name) and isinstance(name.ctx, ast.Store):
                    self.bindings[name.id] = target if isinstance(lhs, ast.Name) else None

    def visit_AnnAssign(self, node):
        if node.value:
            self.visit(node.value)
        if isinstance(node.target, ast.Name):
            self.bindings[node.target.id] = self.target(node.value)

    def scan_scope(self, node, outer):
        previous = self.bindings
        self.bindings = dict(outer)
        if isinstance(node, ast.Lambda):
            args = node.args
            shadowed = {a.arg for a in [*args.posonlyargs, *args.args, *args.kwonlyargs,
                                       args.vararg, args.kwarg] if a is not None}
        else:
            _, shadowed = _callable_scope(self.parsed, node)
            shadowed |= _direct_definition_names(node)
        self.bindings.update(dict.fromkeys(shadowed))
        if self.class_id and getattr(node, 'args', None):
            args = node.args.posonlyargs + node.args.args
            if args and args[0].arg in {'self', 'cls'}:
                self.bindings[args[0].arg] = self.class_id
        if isinstance(node, ast.Lambda):
            self.visit(node.body)
        else:
            for statement in node.body:
                self.visit(statement)
        self.bindings = previous

    def visit_FunctionDef(self, node):
        for value in [*node.decorator_list, *node.args.defaults, *node.args.kw_defaults]:
            if value is not None:
                self.visit(value)
        if self.source is not None:
            # Nested definitions have no separate map node: attribute their uses
            # conservatively to the enclosing callable, without inventing calls.
            previous_class = self.class_id
            self.class_id = None
            self.scan_scope(node, self.bindings)
            self.class_id = previous_class

    visit_AsyncFunctionDef = visit_FunctionDef

    def visit_Lambda(self, node):
        previous_class = self.class_id
        self.class_id = None
        self.scan_scope(node, self.bindings)
        self.class_id = previous_class

    def visit_ListComp(self, node):
        previous = self.bindings
        self.bindings = dict(previous)
        for generator in node.generators:
            self.visit(generator.iter)
            for target in ast.walk(generator.target):
                if isinstance(target, ast.Name):
                    self.bindings[target.id] = None
            for condition in generator.ifs:
                self.visit(condition)
        if isinstance(node, ast.DictComp):
            self.visit(node.key)
            self.visit(node.value)
        else:
            self.visit(node.elt)
        self.bindings = previous

    visit_SetComp = visit_GeneratorExp = visit_DictComp = visit_ListComp

    def visit_ClassDef(self, node):
        for value in [*node.decorator_list, *node.bases]:
            self.visit(value)
        previous = self.bindings
        self.bindings = dict(previous)
        for statement in node.body:
            self.visit(statement)
        self.bindings = previous

    def visit_Import(self, node):
        collector = ScopeVisitor(self.parsed.file.id, self.parsed.file.module)
        collector.visit(node)
        aliases = build_import_aliases(self.parsed.file.module, collector.imports,
                                      self.modules, set(self.symbols), self.exports)
        for name, alias in aliases.items():
            target = _resolve_imported([name], aliases, self.symbols)
            self.bindings[name] = None if alias.get('external') else target or alias.get('module')

    visit_ImportFrom = visit_Import
