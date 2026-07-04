from __future__ import annotations

import subprocess
from pathlib import Path


OUTPUT_DIR_NAME = ".atlas"


def ensure_output_dir(root: str | Path) -> Path:
    output_dir = Path(root).resolve() / OUTPUT_DIR_NAME
    output_dir.mkdir(parents=True, exist_ok=True)
    _ensure_git_info_exclude(output_dir)
    return output_dir


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
        exclude_path = (output_dir / exclude_path).resolve()

    return exclude_path, f"/{normalized}/"
