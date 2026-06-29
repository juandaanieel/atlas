from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path


STATIC_DIR = Path(__file__).parent / "static"


def write_explorer(root: str | Path, payload: dict) -> Path:
    root_path = Path(root).resolve()
    output_dir = root_path / ".atlas" / "explorer"
    assets_dir = output_dir / "assets"
    styles_path = STATIC_DIR / "styles.css"
    app_path = STATIC_DIR / "src" / "app.js"
    output_dir.mkdir(parents=True, exist_ok=True)

    if assets_dir.exists():
        shutil.rmtree(assets_dir)
    shutil.copytree(STATIC_DIR / "src", assets_dir / "src")
    shutil.copy2(styles_path, assets_dir / "styles.css")

    template = (STATIC_DIR / "index.html").read_text(encoding="utf-8")
    html = (
        template
        .replace("__ATLAS_PAYLOAD__", json.dumps(payload, sort_keys=True))
        .replace("__ATLAS_STYLES_VERSION__", _asset_version(styles_path))
        .replace("__ATLAS_APP_VERSION__", _asset_version(app_path))
    )
    output_path = output_dir / "index.html"
    output_path.write_text(html, encoding="utf-8")
    return output_path


def _asset_version(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()[:12]
