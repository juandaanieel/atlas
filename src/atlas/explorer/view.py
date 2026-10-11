"""Build the browser document from one validated analysis snapshot and story."""
from atlas.explorer.guide import build_guide
from atlas.explorer.layout import analyse, assemble, place, scope_extra
from atlas.explorer.routes import build_routes
from atlas.explorer.source import build_source


def build_view(snapshot: dict, story: dict) -> dict:
    test_modules = {f["module"] for f in snapshot["files"] if f["is_test"]}
    columns = snapshot["model"]["layout"]["columns"]
    if not any(c["module"] not in test_modules for c in columns):
        return {
            "view": {"package": snapshot["model"]["package_name"],
                     "snapshot_id": snapshot["snapshot_id"], "panes": []},
            "source": {"symbols": {}},
        }
    extra = {}
    for _ in range(4):
        facts = analyse(snapshot, extra)
        placement = place(facts)
        measured = scope_extra(facts, placement)
        if measured == extra:
            break
        extra = measured
    view = assemble(facts, placement)
    view["guide"] = build_guide(facts, view, story)
    view["routes"] = build_routes(view)
    return {"view": view, "source": build_source(snapshot, view)}
