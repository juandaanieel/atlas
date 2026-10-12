import json
from copy import deepcopy
from pathlib import Path

from atlas.analyzer.payload import analyze_path
from atlas.explorer.optimization import build_optimization_prompt
from atlas.explorer.writer import render_explorer

FIXTURES = Path(__file__).parent / 'fixtures'


def test_prompt_summarizes_facts_and_cites_largest_unused_candidate():
    snapshot = analyze_path(FIXTURES / 'defect_package').to_dict()
    prompt = build_optimization_prompt(snapshot)
    symbols = {s['id']: s for s in snapshot['symbols']}
    unused = [n for n in snapshot['model']['nodes'] if n['dead']]
    largest = sorted(unused, key=lambda n: (-symbols[n['id']]['loc'], n['id']))[0]
    symbol = symbols[largest['id']]
    assert f'{len(unused)} possibly unused callables' in prompt
    assert f'"{symbol["file_id"]}":{symbol["line_start"]}-{symbol["line_end"]}' in prompt
    assert snapshot['snapshot_id'] in prompt
    assert '.atlas/atlas.json' in prompt
    assert 'candidates, not proven defects' in prompt
    assert 'Never called: dead code' not in prompt
    changed = deepcopy(snapshot)
    changed['root'] = '/another/computer/project'
    changed['generated_at'] = '2099-01-01T00:00:00Z'
    assert build_optimization_prompt(changed) == prompt


def test_prompt_length_does_not_scale_with_finding_lists():
    snapshot = analyze_path(FIXTURES / 'defect_package').to_dict()
    original = build_optimization_prompt(snapshot)
    # Many more candidates should change totals, not create an exhaustive report.
    snapshot['model']['nodes'] *= 1000
    snapshot['model']['clones'] *= 1000
    snapshot['model']['wrappers'] *= 1000
    snapshot['calls'] *= 1000
    prompt = build_optimization_prompt(snapshot)
    assert len(prompt) < 4000
    assert len(prompt) < len(original) + 100
    assert 'short prioritized plan' in prompt


def test_prompt_reports_cycles_blind_spots_and_empty_map():
    cycles = analyze_path(FIXTURES / 'circular_package').to_dict()
    assert f'{len(cycles["overview"]["circular_imports"])} import cycles' in build_optimization_prompt(cycles)
    unresolved = analyze_path(FIXTURES / 'unresolved_package').to_dict()
    count = sum(c['kind'] == 'unresolved' for c in unresolved['calls'])
    assert count > 0
    assert f'{count} unresolved calls' in build_optimization_prompt(unresolved)
    empty = analyze_path(FIXTURES / 'test_package').to_dict()
    assert '0 possibly unused callables' in build_optimization_prompt(empty)


def test_export_embeds_prompt_safely():
    snapshot = analyze_path(FIXTURES / 'simple_package')
    html = render_explorer(snapshot)
    payload = html.split('<script id="atlasView" type="application/json">')[1].split('</script>')[0]
    prompt = json.loads(payload)['optimization_prompt']
    assert prompt == build_optimization_prompt(snapshot.to_dict())
    assert snapshot['root'] not in prompt
