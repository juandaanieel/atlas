from __future__ import annotations

import subprocess
from pathlib import Path

from atlas.analyzer.discovery import resolve_analysis_root


OUTPUT_DIR_NAME = ".atlas"


def ensure_output_dir(root: str | Path) -> Path:
    root_path = resolve_analysis_root(root)
    output_dir = ensure_child_directory(root_path, OUTPUT_DIR_NAME)
    _ensure_git_info_exclude(output_dir)
    return output_dir


def ensure_output_subdir(root: str | Path, name: str) -> Path:
    """Create a direct child of the verified Atlas output directory."""
    return ensure_child_directory(ensure_output_dir(root), name)


def ensure_child_directory(parent: str | Path, name: str) -> Path:
    """Create a managed child directory without following a child symlink."""
    parent_path = Path(parent).resolve(strict=True)
    if not parent_path.is_dir():
        raise NotADirectoryError(f"Output parent is not a directory: {parent}")

    path = checked_output_path(parent_path, name)
    path.mkdir(exist_ok=True)
    if not path.is_dir():
        raise NotADirectoryError(f"Output path is not a directory: {path}")
    return path


def checked_output_path(parent: str | Path, name: str) -> Path:
    """Return a direct output child after rejecting traversal and symlinks."""
    if Path(name).name != name:
        raise ValueError(f"Output name must be a direct child: {name}")

    parent_path = Path(parent).resolve(strict=True)
    path = parent_path / name
    if path.is_symlink():
        raise ValueError(f"Refusing to use symlinked output path: {path}")
    try:
        path.resolve(strict=False).relative_to(parent_path)
    except ValueError as error:
        raise ValueError(f"Output path escapes its managed directory: {path}") from error
    return path


def _ensure_git_info_exclude(output_dir: Path) -> None:
    entry = _git_exclude_entry(output_dir)
    if entry is None:
        return

    exclude_path, ignore_pattern = entry
    exclude_path.parent.mkdir(parents=True, exist_ok=True)
    current_text = exclude_path.read_text(encoding="utf-8") if exclude_path.exists() else ""
    if ignore_pattern in current_text.splitlines():
        return

    prefix = "" if not current_text or current_text.endswith("\n") else "\n"
    with exclude_path.open("a", encoding="utf-8") as handle:
        if prefix:
            handle.write(prefix)
        handle.write(ignore_pattern + "\n")


def _git_exclude_entry(output_dir: Path) -> tuple[Path, str] | None:
    try:
        repo_root_proc = subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            cwd=output_dir,
            check=False,
            capture_output=True,
            text=True,
        )
        exclude_path_proc = subprocess.run(
            ["git", "rev-parse", "--git-path", "info/exclude"],
            cwd=output_dir,
            check=False,
            capture_output=True,
            text=True,
        )
    except OSError:
        return None

    if repo_root_proc.returncode != 0 or exclude_path_proc.returncode != 0:
        return None

    repo_root = Path(repo_root_proc.stdout.strip()).resolve()
    try:
        relative = output_dir.resolve().relative_to(repo_root)
    except ValueError:
        return None

    normalized = relative.as_posix().strip("/")
    if not normalized:
        return None

    exclude_path = Path(exclude_path_proc.stdout.strip())
    if not exclude_path.is_absolute():
        exclude_path = (output_dir / exclude_path).absolute()
    if _has_symlink_component(exclude_path):
        return None

    return exclude_path, f"/{normalized}/"


def _has_symlink_component(path: Path) -> bool:
    """Reject Git metadata paths redirected through any filesystem symlink."""
    current = Path(path.anchor)
    for part in path.parts[1:]:
        current /= part
        if current.is_symlink():
            return True
    return False
