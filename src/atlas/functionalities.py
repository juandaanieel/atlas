from __future__ import annotations

import hashlib
from pathlib import Path

from atlas.analyzer.discovery import safe_descendant_files


FUNCTIONALITIES_DIR = Path(".atlas") / "vault" / "10-functionality"
FUNCTIONALITY_STATUSES = {"accepted", "proposed"}


def functionality_digest(root: Path, vault_dir: Path | None = None) -> str:
    """Hash the human-owned functionality definitions used in the payload."""
    directory, paths = _functionality_files(root, vault_dir)
    digest = hashlib.sha256()
    for path in paths:
        if path.name.startswith("_"):
            continue
        text = path.read_text(encoding="utf-8")
        metadata, _ = _frontmatter(text)
        if metadata.get("atlas_kind") != "functionality":
            continue
        digest.update(path.relative_to(directory).as_posix().encode("utf-8"))
        digest.update(text.encode("utf-8"))
    return digest.hexdigest()


def load_functionalities(
    root: Path,
    function_ids: set[str],
    vault_dir: Path | None = None,
) -> list[dict]:
    """Read human-owned functionality notes without treating them as code facts."""
    directory, paths = _functionality_files(root, vault_dir)

    records = []
    paths_by_id: dict[str, str] = {}
    for path in paths:
        if path.name.startswith("_"):
            continue
        metadata, body = _frontmatter(path.read_text(encoding="utf-8"))
        if metadata.get("atlas_kind") != "functionality":
            continue
        relative = path.relative_to(directory).as_posix()
        declared_members = _list_value(metadata, "members")
        duplicate_members = _duplicates(declared_members)
        if duplicate_members:
            joined = ", ".join(duplicate_members)
            raise ValueError(
                f"Functionality definition {relative} repeats member IDs: {joined}"
            )
        members = [member for member in declared_members if member in function_ids]
        missing = [member for member in declared_members if member not in function_ids]
        functionality_id = _scalar_value(
            metadata,
            "atlas_id",
            f"functionality:{path.stem}",
            relative,
        )
        status = _scalar_value(metadata, "status", "proposed", relative)
        if status not in FUNCTIONALITY_STATUSES:
            supported = ", ".join(sorted(FUNCTIONALITY_STATUSES))
            raise ValueError(
                f"Functionality definition {relative} has unsupported status "
                f"{status!r}; expected one of: {supported}"
            )
        if functionality_id in paths_by_id:
            raise ValueError(
                "Duplicate functionality ID "
                f"{functionality_id!r} in {paths_by_id[functionality_id]} and {relative}"
            )
        paths_by_id[functionality_id] = relative
        records.append(
            {
                "id": functionality_id,
                "title": _title(body, path),
                "summary": _summary(body),
                "status": status,
                "tags": _list_value(metadata, "tags"),
                "member_ids": members,
                "missing_member_ids": missing,
                "path": relative,
            }
        )
    return sorted(records, key=lambda record: (record["status"], record["title"], record["id"]))


def functionality_issues(records: list[dict]) -> list[dict]:
    """Describe stale functionality members without discarding the definition."""
    issues = []
    for record in records:
        missing = record["missing_member_ids"]
        if not missing:
            continue
        joined = ", ".join(missing)
        issues.append(
            {
                "type": "missing_functionality_members",
                "functionality_id": record["id"],
                "path": record["path"],
                "member_ids": missing,
                "message": f"References missing callable IDs: {joined}",
            }
        )
    return issues


def _directory(root: Path, vault_dir: Path | None) -> Path:
    return vault_dir / "10-functionality" if vault_dir else root / FUNCTIONALITIES_DIR


def _functionality_files(root: Path, vault_dir: Path | None) -> tuple[Path, list[Path]]:
    vault = vault_dir if vault_dir else root / ".atlas" / "vault"
    directory = _directory(root, vault_dir)
    candidates = [vault, directory]
    if vault_dir is None:
        candidates.insert(0, root / ".atlas")
    for path in candidates:
        if path.is_symlink():
            raise ValueError(f"Refusing to read symlinked functionality path: {path}")

    paths = [
        path
        for path in safe_descendant_files(directory)
        if path.suffix == ".md"
    ]
    return directory, paths


def _frontmatter(text: str) -> tuple[dict[str, str | list[str]], list[str]]:
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}, lines

    metadata: dict[str, str | list[str]] = {}
    current_list: str | None = None
    for index, line in enumerate(lines[1:], start=1):
        if line.strip() == "---":
            return metadata, lines[index + 1 :]
        if line.startswith("  - ") and current_list:
            values = metadata.setdefault(current_list, [])
            if isinstance(values, list):
                values.append(_value(line[4:]))
            continue
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        value = value.strip()
        if value:
            metadata[key.strip()] = _value(value)
            current_list = None
        else:
            metadata[key.strip()] = []
            current_list = key.strip()
    return metadata, []


def _value(value: str) -> str:
    return value.strip().strip('"').strip("'")


def _list_value(metadata: dict[str, str | list[str]], key: str) -> list[str]:
    value = metadata.get(key, [])
    if isinstance(value, list):
        return value
    return [value] if value else []


def _scalar_value(
    metadata: dict[str, str | list[str]],
    key: str,
    default: str,
    path: str,
) -> str:
    value = metadata.get(key, default)
    if not isinstance(value, str) or not value.strip():
        raise ValueError(
            f"Functionality definition {path} requires a nonempty scalar {key}"
        )
    return value.strip()


def _duplicates(values: list[str]) -> list[str]:
    seen = set()
    duplicates = set()
    for value in values:
        if value in seen:
            duplicates.add(value)
        seen.add(value)
    return sorted(duplicates)


def _title(lines: list[str], path: Path) -> str:
    for line in lines:
        if line.startswith("# "):
            return line[2:].strip()
    return path.stem.replace("-", " ").replace("_", " ").title()


def _summary(lines: list[str]) -> str:
    for index, line in enumerate(lines):
        if not line.strip() or line.startswith("#"):
            continue
        paragraph = [line.strip()]
        for following in lines[index + 1 :]:
            if not following.strip() or following.startswith("#"):
                break
            paragraph.append(following.strip())
        return " ".join(paragraph)[:280]
    return "No human summary has been written."
