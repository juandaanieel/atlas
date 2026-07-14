from __future__ import annotations

import os
import subprocess
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
    return [Path(path) for path in discover_files(root) if Path(path).suffix == ".py"]


def discover_files(root: str | Path) -> list[str]:
    """Return safe, non-ignored files below root in deterministic order."""
    root_path = resolve_analysis_root(root)
    git_files = _git_files(root_path)
    candidates = git_files if git_files is not None else _walk_files(root_path)
    return [
        relative.as_posix()
        for relative in sorted((Path(path) for path in candidates), key=lambda item: item.as_posix())
        if _is_safe_file(root_path, relative)
    ]


def safe_descendant_files(directory: str | Path) -> list[Path]:
    """Return regular files below a directory without following symlinks."""
    requested = Path(directory)
    if requested.is_symlink():
        return []
    try:
        root = requested.resolve(strict=True)
    except OSError:
        return []
    if not root.is_dir():
        return []

    files: list[Path] = []
    for current, directories, names in os.walk(root):
        current_path = Path(current)
        directories[:] = sorted(
            name
            for name in directories
            if not (current_path / name).is_symlink()
        )
        for name in sorted(names):
            path = current_path / name
            if path.is_symlink():
                continue
            try:
                resolved = path.resolve(strict=True)
                resolved.relative_to(root)
            except (OSError, ValueError):
                continue
            if resolved.is_file():
                files.append(resolved)
    return files


def resolve_analysis_root(root: str | Path) -> Path:
    """Resolve and validate the directory Atlas is allowed to read."""
    path = Path(root).expanduser()
    if not path.exists():
        raise FileNotFoundError(f"Analysis directory does not exist: {path}")
    resolved = path.resolve()
    if not resolved.is_dir():
        raise NotADirectoryError(f"Analysis path is not a directory: {path}")
    return resolved


def resolve_workflow_path(workflow: str | Path) -> Path:
    """Resolve an explicit Python workflow file or workflow directory."""
    path = Path(workflow).expanduser()
    if not path.exists():
        raise FileNotFoundError(f"Workflow path does not exist: {path}")
    resolved = path.resolve()
    if resolved.is_file() and resolved.suffix.lower() != ".py":
        raise ValueError(f"Workflow file must be a Python file: {path}")
    if not resolved.is_file() and not resolved.is_dir():
        raise ValueError(f"Workflow path is not a file or directory: {path}")
    return resolved


def _git_files(root: Path) -> list[str] | None:
    try:
        result = subprocess.run(
            [
                "git",
                "-C",
                str(root),
                "ls-files",
                "-co",
                "--exclude-standard",
                "-z",
                "--",
                ".",
            ],
            check=False,
            capture_output=True,
        )
    except OSError:
        return None

    if result.returncode != 0:
        return None
    return [os.fsdecode(part) for part in result.stdout.split(b"\0") if part]


def _walk_files(root: Path) -> list[str]:
    files: list[str] = []
    for current, directories, names in os.walk(root):
        current_path = Path(current)
        directories[:] = sorted(
            name
            for name in directories
            if name not in EXCLUDED_DIRS and not (current_path / name).is_symlink()
        )
        for name in sorted(names):
            files.append((current_path / name).relative_to(root).as_posix())
    return files


def _is_safe_file(root: Path, relative: Path) -> bool:
    if relative.is_absolute() or ".." in relative.parts:
        return False
    if any(part in EXCLUDED_DIRS for part in relative.parts):
        return False

    path = root / relative
    if path.is_symlink():
        return False
    try:
        resolved = path.resolve(strict=True)
        resolved.relative_to(root)
    except (OSError, ValueError):
        return False
    return resolved.is_file()


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
