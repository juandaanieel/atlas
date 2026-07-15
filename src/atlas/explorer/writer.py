from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path

from atlas.analyzer.snapshot import AnalysisSnapshot
from atlas.output import checked_output_path, ensure_output_subdir


STATIC_DIR = Path(__file__).parent / "static"


def write_explorer(root: str | Path, snapshot: AnalysisSnapshot) -> Path:
    output_dir = ensure_output_subdir(root, "explorer")
    assets_dir = checked_output_path(output_dir, "assets")
    styles_path = STATIC_DIR / "styles.css"
    core_path = STATIC_DIR / "src" / "core.js"
    app_path = STATIC_DIR / "src" / "app.js"

    if assets_dir.exists():
        shutil.rmtree(assets_dir)
    shutil.copytree(STATIC_DIR / "src", assets_dir / "src")
    shutil.copy2(styles_path, assets_dir / "styles.css")

    template = (STATIC_DIR / "index.html").read_text(encoding="utf-8")
    template = (
        template
        .replace("__ATLAS_STYLES_VERSION__", _asset_version(styles_path))
        .replace("__ATLAS_CORE_VERSION__", _asset_version(core_path))
        .replace("__ATLAS_APP_VERSION__", _asset_version(app_path))
    )
    html = template.replace("__ATLAS_PAYLOAD__", _script_safe_json(snapshot))
    output_path = checked_output_path(output_dir, "index.html")
    output_path.write_text(html, encoding="utf-8")
    return output_path


def _asset_version(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()[:12]


def _script_safe_json(snapshot: AnalysisSnapshot) -> str:
    """Escape HTML-significant characters before placing JSON in a script."""
    document = snapshot.to_dict()
    document.pop("citymap")
    return (
        json.dumps(document, sort_keys=True)
        .replace("&", "\\u0026")
        .replace("<", "\\u003c")
        .replace(">", "\\u003e")
    )
