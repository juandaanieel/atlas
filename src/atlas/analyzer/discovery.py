from __future__ import annotations

from pathlib import Path


EXCLUDED_DIRS = {
    ".atlas",
    ".git",
    ".hg",
    ".mypy_cache",
    ".pixi",
    ".pytest_cache",
    ".ruff_cache",
    ".tox",
    ".venv",
    "__pycache__",
    "build",
    "dist",
    "node_modules",
    "venv",
}


def discover_python_files(root: str | Path) -> list[Path]:
    """Return Python files below root in deterministic relative-path order."""
    root_path = Path(root).resolve()
    files: list[Path] = []
    for path in root_path.rglob("*.py"):
        rel = path.relative_to(root_path)
        if any(part in EXCLUDED_DIRS for part in rel.parts):
            continue
        files.append(rel)
    return sorted(files, key=lambda item: item.as_posix())


def module_from_path(root: str | Path, rel_path: str | Path) -> str:
    """Convert a Python file path to a best-effort import module name."""
    root_path = Path(root).resolve()
    rel = Path(rel_path)
    parts = list(rel.with_suffix("").parts)
    if parts and parts[0] == "src":
        parts = parts[1:]
    if parts and parts[-1] == "__init__":
        parts = parts[:-1]
    if not parts:
        return root_path.name.replace("-", "_")
    return ".".join(part.replace("-", "_") for part in parts)


def is_test_file(rel_path: str | Path) -> bool:
    path = Path(rel_path)
    name = path.name
    return (
        "tests" in path.parts
        or name.startswith("test_")
        or name.endswith("_test.py")
    )
