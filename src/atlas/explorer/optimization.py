"""A concise, evidence-based handoff from the snapshot to a coding agent."""
from __future__ import annotations

import json


def build_optimization_prompt(snapshot: dict) -> str:
    """Summarize measured signals and cite a few representative source locations."""
    model = snapshot['model']
    symbols = {s['id']: s for s in snapshot['symbols']}
    unused = sorted((n for n in model['nodes'] if n['dead']),
                    key=lambda n: (-symbols[n['id']]['loc'], n['id']))
    clones = sorted(model['clones'], key=lambda g: (-g['size'], g['members']))
    complex_nodes = sorted(model['nodes'], key=lambda n: (
        -symbols[n['id']]['metrics']['cyclomatic_complexity'], n['id']))

    def ref(sid):
        s = symbols[sid]
        name = sid[len(s['module']) + 1:]
        return f'{json.dumps(s["file_id"], ensure_ascii=False)}:{s["line_start"]}-{s["line_end"]} ({name})'

    evidence = []
    for n in unused[:2]:
        evidence.append(f'Possibly unused: {ref(n["id"])}; {symbols[n["id"]]["loc"]} LOC.')
    for group in clones[:1]:
        examples = '; '.join(ref(sid) for sid in sorted(group['members'])[:2])
        evidence.append(f'Largest clone group: {len(group["members"])} members, '
                        f'normalized AST size {group["size"]}; examples: {examples}.')
    for sid in sorted(model['wrappers'])[:1]:
        evidence.append(f'Wrapper candidate: {ref(sid)}.')
    for n in complex_nodes[:1]:
        s = symbols[n['id']]
        evidence.append(f'Highest cyclomatic complexity: {ref(n["id"])}; '
                        f'complexity {s["metrics"]["cyclomatic_complexity"]}, {s["loc"]} LOC.')

    facts = [
        f'Project: {json.dumps(snapshot["package_name"], ensure_ascii=False)}; snapshot: {snapshot["snapshot_id"]}.',
        f'{len(snapshot["files"])} Python files analyzed ({sum(f["is_test"] for f in snapshot["files"])} test files); '
        f'{len(model["nodes"])} non-test callables in the map.',
        f'Static flags: {len(unused)} possibly unused callables, {len(clones)} structural clone groups, '
        f'{len(model["wrappers"])} wrappers, {len(model["layer_violations"])} inferred layer violations.',
        f'{len(snapshot["overview"]["circular_imports"])} import cycles; '
        f'{sum(c["kind"] == "unresolved" for c in snapshot["calls"])} unresolved calls '
        f'(including tests).',
    ]
    return '\n'.join([
        'Propose a focused cleanup of this repository using the Atlas evidence below. '
        'Keep the implementation readable and preserve required behavior and performance.',
        '', 'Facts', *('- ' + fact for fact in facts),
        '', 'Selected source evidence (relative to the project root)',
        *('- ' + item for item in evidence),
        *([] if evidence else ['- No callable cleanup candidates in this snapshot.']),
        '', 'Full evidence: .atlas/atlas.json — model.nodes, model.clones, model.wrappers, '
        'model.layer_violations, symbols, calls, references, warnings, objects, and overview.circular_imports. '
        'Read repository instructions and recheck the snapshot against the current code.',
        '', 'Suggested cleanup',
        '1. Verify callers and public entry points; remove confirmed unused code and unnecessary wrappers.',
        '2. Compare clone behavior and consolidate duplicated logic where it simplifies the code.',
        '3. Simplify complex routines or dependency cycles only where the evidence justifies a change.',
        '', 'Static flags are candidates, not proven defects; unresolved calls limit reachability. '
        'Complexity is not a runtime measurement. Return a short prioritized plan citing files, '
        'expected benefit, and relevant tests. Keep useful tests; benchmark any proposed performance improvement.',
        '',
    ])
