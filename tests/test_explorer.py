import json
import math
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
    assert {p["unit"] for p in view["plates"]} == {d["package"] for d in view["districts"]}
    plate_modules = [m for p in view["plates"] for m in p["modules"]]
    assert len(plate_modules) == len(set(plate_modules)) == len(modules)
    panes = {p["module"]: p for p in view["panes"]}
    rows = view["placement"]["rows"]
    for back, front in zip(rows, rows[1:]):
        height = max(panes[m]["box"]["h"] for m in back["modules"])
        # Back-row faces clear the next row's headers in the default axonometric view.
        assert (front["z"] - back["z"]) * math.tan(0.82) > height + 2
        assert all(panes[m]["z"] == front["z"] for m in front["modules"])
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


def test_dense_packages_clear_back_rows_and_keep_all_modules(tmp_path):
    for name in ("first", "second", "third", "fourth"):
        package = tmp_path / name
        package.mkdir()
        (package / "__init__.py").write_text("")
        for i in range(24):
            (package / f"module_{i}.py").write_text("\n".join(
                f"def public_function_number_{j}():\n    return {i * j}\n" for j in range(6)
            ))
    snapshot = analyze_path(tmp_path)
    document = build_view(snapshot.to_dict(), build_story(snapshot))
    view = document["view"]
    assert len(view["panes"]) == 96
    rows = view["placement"]["rows"]
    assert len(rows) == 2
    back_height = max(p["box"]["h"] for p in view["panes"] if p["row"] == 0)
    assert (rows[1]["z"] - rows[0]["z"]) * math.tan(0.82) > back_height + 2
    json.dumps(document, allow_nan=False)


def test_package_dependency_cycle_keeps_one_box_per_package(tmp_path):
    package = tmp_path / "example"
    child = package / "child"
    child.mkdir(parents=True)
    (package / "__init__.py").write_text("")
    (child / "__init__.py").write_text("")
    (package / "entry.py").write_text("from .child.worker import run\n\ndef main():\n    return run()\n")
    (child / "worker.py").write_text("from ..shared import helper\n\ndef run():\n    return helper()\n")
    (package / "shared.py").write_text("def helper():\n    return 42\n")
    snapshot = analyze_path(tmp_path)
    view = build_view(snapshot.to_dict(), build_story(snapshot))["view"]
    plates = {p["unit"]: p for p in view["plates"]}
    assert len(view["plates"]) == len(plates) == 2
    assert set(plates["example"]["modules"]) == {"example.entry", "example.shared"}
    assert plates["example.child"]["modules"] == ["example.child.worker"]
    assert {(e["ms"], e["mt"]) for e in view["edges"]} == {
        ("example.entry", "example.child.worker"), ("example.child.worker", "example.shared"),
    }


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


def test_source_documentation_preserves_full_docstring_and_declared_interface(tmp_path):
    (tmp_path / "api.py").write_text('''async def run(value: int, /, scale: float = 1.5, *args: str, flag: bool = False, **options) -> list[int]:
    """Compute results.

    ## Parameters
    value: input count.

    ## Examples
    ```python
    await run(2, flag=True)
    ```

    Raises:
        ValueError: when the input is negative.
    """
    return [value]

class Worker:
    """Run jobs.

    Additional class documentation.
    """
    def __init__(self, size: int = 3):
        self.size = size

    def run(self, *, value: str = "a:b") -> str:
        """Return a value.

        Preserves the original text.
        """
        return value

def undocumented():
    return 1
''')
    snapshot = analyze_path(tmp_path)
    records = build_view(snapshot.to_dict(), build_story(snapshot))["source"]["symbols"]
    run = records['api.run']
    assert run['signature'] == 'async def run(value: int, /, scale: float=1.5, *args: str, flag: bool=False, **options) -> list[int]'
    assert '## Examples\n```python\nawait run(2, flag=True)\n```' in run['docstring']
    assert 'ValueError: when the input is negative.' in run['docstring']
    assert records['api.Worker']['signature'] == 'class Worker\ndef __init__(self, size: int=3)'
    assert 'Additional class documentation.' in records['api.Worker']['docstring']
    assert records['api.Worker.run']['signature'] == "def run(self, *, value: str='a:b') -> str"
    assert 'Preserves the original text.' in records['api.Worker.run']['docstring']
    assert records['api.undocumented']['docstring'] == ''
