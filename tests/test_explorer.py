import json
from pathlib import Path

import pytest

from atlas.analyzer.payload import analyze_path
from atlas.explorer.source import call_positions
from atlas.explorer.view import build_view
from atlas.explorer.writer import render_explorer
from atlas.story import build_story

FIXTURES = Path(__file__).parent / "fixtures"


@pytest.mark.parametrize("name", sorted(p.name for p in FIXTURES.iterdir() if p.is_dir()))
def test_explorer_prepares_every_fixture_with_consistent_references(name):
    snapshot = analyze_path(FIXTURES / name)
    story = build_story(snapshot)
    document = build_view(snapshot.to_dict(), story)
    assert document == build_view(snapshot.to_dict(), story)
    json.dumps(document, allow_nan=False)
    view = document["view"]
    assert view["snapshot_id"] == snapshot["snapshot_id"]
    if not view["panes"]:
        assert name == "test_package"
        return
    modules = {p["module"] for p in view["panes"]}
    symbols = {n["id"] for n in view["nodes"]} | {c["id"] for c in view["classes"]}
    assert len(view["routes"]["calls"]) == len(view["edges"])
    for edge in view["edges"]:
        assert edge["s"] in symbols and edge["t"] in symbols
        assert edge["ms"] in modules and edge["mt"] in modules
    assert [s["id"] for s in view["guide"]["steps"]] == [c["id"] for c in story["chapters"]]
    for step in view["guide"]["steps"]:
        assert set(step["unfold"]) <= modules
    for rec in document["source"]["symbols"].values():
        for line, start, end, kind, edge, name in rec["sites"]:
            assert rec["start"] <= line <= rec["end"]
            text = rec["text"].splitlines()[line - rec["start"]]
            assert text.encode("utf-16-le")[start * 2:end * 2].decode("utf-16-le")
            if kind == "edge":
                assert 0 <= edge < len(view["edges"])


def test_empty_repository_exports_an_empty_state(tmp_path):
    (tmp_path / "empty.py").write_text("VALUE = 42\n")
    snapshot = analyze_path(tmp_path)
    html = render_explorer(snapshot)
    embedded = html.split('<script id="atlasView" type="application/json">')[1].split('</script>')[0]
    assert json.loads(embedded)["view"]["panes"] == []


def test_dense_package_exports_all_modules_with_finite_geometry(tmp_path):
    package = tmp_path / "dense"
    package.mkdir()
    (package / "__init__.py").write_text("")
    for i in range(40):
        (package / f"module_{i}.py").write_text("def a_very_long_public_function_name():\n    return 42\n")
    snapshot = analyze_path(tmp_path)
    document = build_view(snapshot.to_dict(), build_story(snapshot))
    assert len(document["view"]["panes"]) == 40
    json.dumps(document, allow_nan=False)


def test_source_positions_ignore_strings_and_preserve_unicode_and_multiline_calls():
    text = '''def run():
    note = "helper() 😀"; helper()
    return (thing
        .method
        (helper()))'''
    positions = call_positions(text, 20)
    for key, expected in [((21, "helper"), "helper"), ((22, "thing.method"), "method"), ((24, "helper"), "helper")]:
        line, a, b = positions[key][0]
        actual = text.splitlines()[line - 20].encode("utf-16-le")[a * 2:b * 2].decode("utf-16-le")
        assert actual == expected
    assert positions[(21, "helper")][0][1] > text.splitlines()[1].index(';')


def test_method_source_preserves_multiline_string_indentation():
    text = '    def run(self):\n        note = """helper()\nno indentation"""\n        return helper()'
    assert call_positions(text, 8)[(11, "helper")] == [(11, 15, 21)]


def test_source_call_link_matches_actual_code_after_a_string(tmp_path):
    (tmp_path / "module.py").write_text('def helper():\n    return 1\n\ndef run():\n    note = "helper()"; return helper()\n')
    snapshot = analyze_path(tmp_path)
    document = build_view(snapshot.to_dict(), build_story(snapshot))
    rec = next(v for k, v in document["source"]["symbols"].items() if k.endswith('.run'))
    site, = rec["sites"]
    assert site[3] == 'edge'
    assert site[1] == rec["text"].splitlines()[1].rindex('helper')
