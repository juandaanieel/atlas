from __future__ import annotations

import json
import os
import tempfile
import uuid
from datetime import datetime, timezone
from pathlib import Path

from atlas import __version__
from atlas.analyzer.snapshot import SNAPSHOT_VERSION


REGISTRY_VERSION = 1
REGISTRY_FILE = "projects.json"


class ProjectRegistry:
    """Persist the small set of directories explicitly trusted by the user."""

    def __init__(self, state_dir: str | Path):
        self.state_dir = _prepare_state_directory(state_dir)
        self.path = self.state_dir / REGISTRY_FILE

    def list(self) -> list[dict]:
        return [dict(project) for project in self._document()["projects"]]

    def get(self, project_id: str) -> dict:
        for project in self._document()["projects"]:
            if project["id"] == project_id:
                return dict(project)
        raise KeyError(project_id)

    def add(
        self,
        path: str | Path,
        *,
        name: str | None = None,
    ) -> dict:
        root = resolve_registered_root(path)
        document = self._document()
        if any(Path(project["path"]) == root for project in document["projects"]):
            raise ValueError(f"Project is already registered: {root}")

        project = {
            "id": str(uuid.uuid4()),
            "name": _project_name(name, root.name),
            "path": str(root),
            "added_at": _utc_now(),
            "last_opened_at": None,
        }
        document["projects"].append(project)
        self._write(document)
        return dict(project)

    def update(
        self,
        project_id: str,
        *,
        name: str | None = None,
        path: str | Path | None = None,
    ) -> dict:
        document = self._document()
        project = next(
            (item for item in document["projects"] if item["id"] == project_id),
            None,
        )
        if project is None:
            raise KeyError(project_id)

        root = resolve_registered_root(path if path is not None else project["path"])
        duplicate = next(
            (
                item
                for item in document["projects"]
                if item["id"] != project_id and Path(item["path"]) == root
            ),
            None,
        )
        if duplicate:
            raise ValueError(f"Project is already registered: {root}")

        project["path"] = str(root)
        project.pop("workflow_path", None)
        if name is not None:
            project["name"] = _project_name(name, root.name)
        self._write(document)
        return dict(project)

    def remove(self, project_id: str) -> dict:
        document = self._document()
        for index, project in enumerate(document["projects"]):
            if project["id"] != project_id:
                continue
            removed = document["projects"].pop(index)
            self._write(document)
            return dict(removed)
        raise KeyError(project_id)

    def mark_opened(self, project_id: str) -> None:
        document = self._document()
        for project in document["projects"]:
            if project["id"] == project_id:
                project["last_opened_at"] = _utc_now()
                self._write(document)
                return
        raise KeyError(project_id)

    def project_status(self, project: dict) -> dict:
        root = Path(project["path"])
        status = {
            "state": "ready",
            "message": "Generated with the current Atlas version",
            "atlas_version": None,
            "snapshot_version": None,
            "generated_at": None,
        }
        if not root.exists() or not root.is_dir():
            status.update(state="missing", message="Project directory is missing")
            return status
        if root.is_symlink():
            status.update(state="invalid", message="Project directory is a symlink")
            return status

        payload_path = root / ".atlas" / "atlas.json"
        if (root / ".atlas").is_symlink():
            status.update(state="invalid", message="Atlas output directory is a symlink")
            return status
        if payload_path.is_symlink():
            status.update(state="invalid", message="Atlas snapshot is a symlink")
            return status
        if not payload_path.exists():
            status.update(state="never_analyzed", message="Project has not been analyzed")
            return status
        if not payload_path.is_file():
            status.update(state="invalid", message="Atlas snapshot is not a file")
            return status

        try:
            document = json.loads(payload_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            status.update(state="invalid", message="Atlas snapshot is unreadable")
            return status
        if not isinstance(document, dict):
            status.update(state="invalid", message="Atlas snapshot is invalid")
            return status

        status["atlas_version"] = document.get("atlas_version")
        status["snapshot_version"] = document.get("snapshot_version")
        status["generated_at"] = document.get("generated_at")
        if document.get("snapshot_version") != SNAPSHOT_VERSION:
            status.update(
                state="needs_update",
                message="Snapshot format must be updated",
            )
        elif document.get("atlas_version") != __version__:
            status.update(
                state="needs_update",
                message="Project was generated with an older Atlas version",
            )
        return status

    def _document(self) -> dict:
        if not self.path.exists():
            return {"registry_version": REGISTRY_VERSION, "projects": []}
        if self.path.is_symlink():
            raise ValueError(f"Refusing to read symlinked registry: {self.path}")
        document = json.loads(self.path.read_text(encoding="utf-8"))
        if document.get("registry_version") != REGISTRY_VERSION:
            raise ValueError("Unsupported Atlas project registry version")
        if not isinstance(document.get("projects"), list):
            raise ValueError("Atlas project registry has no project list")
        return document

    def _write(self, document: dict) -> None:
        if self.path.is_symlink():
            raise ValueError(f"Refusing to replace symlinked registry: {self.path}")
        encoded = json.dumps(document, indent=2, sort_keys=True) + "\n"
        descriptor, temporary_name = tempfile.mkstemp(
            prefix=".projects-",
            suffix=".tmp",
            dir=self.state_dir,
        )
        temporary_path = Path(temporary_name)
        try:
            os.fchmod(descriptor, 0o600)
            with os.fdopen(descriptor, "w", encoding="utf-8") as handle:
                handle.write(encoded)
                handle.flush()
                os.fsync(handle.fileno())
            os.replace(temporary_path, self.path)
            self.path.chmod(0o600)
        finally:
            if temporary_path.exists():
                temporary_path.unlink()


def default_state_directory() -> Path:
    return Path.home() / ".atlas" / "dashboard"


def resolve_registered_root(path: str | Path) -> Path:
    if not isinstance(path, (str, Path)):
        raise ValueError("Project path must be text")
    requested = Path(path).expanduser()
    if requested.is_symlink():
        raise ValueError(f"Project directory cannot be a symlink: {requested}")
    if not requested.exists():
        raise ValueError(f"Project directory does not exist: {requested}")
    resolved = requested.resolve()
    if not resolved.is_dir():
        raise ValueError(f"Project path is not a directory: {requested}")
    return resolved


def _project_name(name: str | None, fallback: str) -> str:
    if name is None:
        return fallback
    if not isinstance(name, str):
        raise ValueError("Project name must be text")
    return name.strip() or fallback


def _prepare_state_directory(path: str | Path) -> Path:
    requested = Path(path).expanduser()
    if requested.is_symlink():
        raise ValueError(f"Dashboard state directory cannot be a symlink: {requested}")
    requested.mkdir(parents=True, exist_ok=True, mode=0o700)
    resolved = requested.resolve()
    if not resolved.is_dir():
        raise NotADirectoryError(f"Dashboard state path is not a directory: {requested}")
    resolved.chmod(0o700)
    return resolved


def _utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()
