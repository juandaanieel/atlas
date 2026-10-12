from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path

from atlas.analyzer.snapshot import AnalysisSnapshot
from atlas.explorer.view import build_view
from atlas.output import checked_output_path, ensure_output_subdir
from atlas.story import build_story, validate_story


STATIC_DIR = Path(__file__).parent / "static"
ASSETS = ("styles.css", "app.bundle.js", "app.bundle.js.LEGAL.txt", "THREE-LICENSE.txt", "MARKDOWN-LICENSES.txt")


def write_explorer(
    root: str | Path,
    snapshot: AnalysisSnapshot,
    story: dict | None = None,
) -> Path:
    output_dir = ensure_output_subdir(root, "explorer")
    assets_dir = checked_output_path(output_dir, "assets")
    if assets_dir.exists():
        shutil.rmtree(assets_dir)
    assets_dir.mkdir()
    for name in ASSETS:
        shutil.copy2(STATIC_DIR / name, assets_dir / name)
    output_path = checked_output_path(output_dir, "index.html")
    output_path.write_text(render_explorer(snapshot, story), encoding="utf-8")
    return output_path


def render_explorer(snapshot: AnalysisSnapshot, story: dict | None = None) -> str:
    """Use the same offline renderer for static exports and the local dashboard."""
    facts = snapshot.to_dict()
    if story is None:
        story = build_story(facts)
    else:
        validate_story(story, facts)
    document = build_view(facts, story)
    template = (STATIC_DIR / "index.html").read_text(encoding="utf-8")
    for marker, filename in (("STYLES", "styles.css"), ("APP", "app.bundle.js")):
        version = hashlib.sha256((STATIC_DIR / filename).read_bytes()).hexdigest()[:12]
        template = template.replace(f"__ATLAS_{marker}_VERSION__", version)
    return template.replace("__ATLAS_VIEW__", script_safe_json(document))


def script_safe_json(document: dict) -> str:
    """Escape HTML-significant characters before placing JSON in a script."""
    return (
        json.dumps(document, sort_keys=True, separators=(",", ":"), allow_nan=False)
        .replace("&", "\\u0026")
        .replace("<", "\\u003c")
        .replace(">", "\\u003e")
    )
