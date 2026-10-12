from atlas.analyzer.payload import analyze_path


def test_callbacks_closures_and_constructed_receivers_keep_live_code(tmp_path):
    (tmp_path / 'example.py').write_text('''
from threading import Thread

def _thread_helper(): pass
def _sort_key(x): return x
def _validator(x): return x
def _handler_helper(): pass
def _unused(): pass

class Worker:
    def __init__(self):
        Thread(target=self._run)
    def _run(self):
        _thread_helper()

class _Counter:
    def visit(self):
        self._child()
    def _child(self): pass

def main(parser, values):
    Worker()
    parser.add_argument(type=_validator)
    values.sort(key=lambda x: _sort_key(x))
    counter = _Counter()
    counter.visit()
    class Handler:
        def handle(self):
            _handler_helper()
    return Handler
''')
    snapshot = analyze_path(tmp_path)
    nodes = {n['id']: n for n in snapshot['model']['nodes']}
    assert {sid for sid, n in nodes.items() if n['dead']} == {'example._unused'}
    refs = {(r['source'], r['target']) for r in snapshot['references']}
    assert ('example.Worker.__init__', 'example.Worker._run') in refs
    assert ('example.main', 'example._Counter.visit') in refs
    assert ('example.main', 'example._handler_helper') in refs
    # Potential callbacks are evidence of use, not measured direct calls.
    calls = {(c['source'], c['target']) for c in snapshot['calls']}
    assert ('example.Worker.__init__', 'example.Worker._run') not in calls
    assert nodes['example.Worker._run']['fan_in'] == 0


def test_unused_callback_chains_and_shadowed_names_stay_unused(tmp_path):
    (tmp_path / 'example.py').write_text('''
def _unreachable(): return _callback
def _callback(): return _leaf()
def _leaf(): pass
def _parameter(): pass
def _assigned(): pass
def _lambda(): pass
def _comprehension(): pass

def main(_parameter, values):
    _assigned = object()
    register(_parameter, _assigned)
    register(lambda _lambda: _lambda)
    return [_comprehension for _comprehension in values]
''')
    snapshot = analyze_path(tmp_path)
    assert {n['name'] for n in snapshot['model']['nodes'] if n['dead']} == {
        '_unreachable', '_callback', '_leaf', '_parameter', '_assigned', '_lambda', '_comprehension',
    }


def test_imported_callback_aliases_and_module_registrations(tmp_path):
    (tmp_path / 'helpers.py').write_text('''
def _module_callback(): pass
def _local_callback(): pass
def _qualified(): pass
def _unused(): pass
''')
    (tmp_path / 'main.py').write_text('''
import helpers
from helpers import _module_callback as callback
register(callback)

def main():
    from helpers import _local_callback as local
    alias = local
    register(alias, helpers._qualified)
''')
    snapshot = analyze_path(tmp_path)
    assert {n['id'] for n in snapshot['model']['nodes'] if n['dead']} == {'helpers._unused'}
    assert any(r['source'] is None and r['target'] == 'helpers._module_callback'
               for r in snapshot['references'])


def test_test_only_references_do_not_make_production_code_reachable(tmp_path):
    (tmp_path / 'helpers.py').write_text('def _unused(): pass\n')
    (tmp_path / 'test_helpers.py').write_text('from helpers import _unused\ncallbacks = [_unused]\n')
    snapshot = analyze_path(tmp_path)
    assert next(n for n in snapshot['model']['nodes'] if n['id'] == 'helpers._unused')['dead']
