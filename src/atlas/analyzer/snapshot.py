from __future__ import annotations

import json
from collections.abc import Iterator, Mapping
from dataclasses import dataclass, field
from types import MappingProxyType
from typing import Any


SNAPSHOT_VERSION = 8

_REQUIRED_KEYS = {
    "atlas_version",
    "snapshot_version",
    "snapshot_id",
    "root",
    "package_name",
    "generated_at",
    "directories",
    "files",
    "symbols",
    "objects",
    "calls",
    "imports",
    "warnings",
    "model",
    "overview",
    "architecture",
    "git",
}
_LIST_KEYS = {"directories", "files", "symbols", "objects", "calls", "imports", "warnings"}
_MAPPING_KEYS = {"model", "overview", "architecture", "git"}


@dataclass(frozen=True)
class AnalysisSnapshot(Mapping[str, Any]):
    """Immutable analysis facts with one canonical JSON representation."""

    _document: Mapping[str, Any]
    _frozen: Mapping[str, Any] = field(init=False, repr=False)

    def __post_init__(self) -> None:
        object.__setattr__(self, "_frozen", _freeze(dict(self._document)))

    @classmethod
    def from_dict(cls, document: Mapping[str, Any]) -> "AnalysisSnapshot":
        _validate_document(document)
        return cls(document)

    @classmethod
    def from_json(cls, text: str) -> "AnalysisSnapshot":
        document = json.loads(text)
        if not isinstance(document, dict):
            raise ValueError("Atlas snapshot JSON must contain an object")
        return cls.from_dict(document)

    def to_dict(self) -> dict[str, Any]:
        """Return a mutable JSON-ready copy for serialization or adapters."""
        return _thaw(self._frozen)

    def to_json(self, *, indent: int | None = None, sort_keys: bool = True) -> str:
        """Serialize this snapshot for the persisted Atlas contract."""
        return json.dumps(self.to_dict(), indent=indent, sort_keys=sort_keys)

    def __getitem__(self, key: str) -> Any:
        return _thaw(self._frozen[key])

    def __iter__(self) -> Iterator[str]:
        return iter(self._frozen)

    def __len__(self) -> int:
        return len(self._frozen)


def _validate_document(document: Mapping[str, Any]) -> None:
    missing = sorted(_REQUIRED_KEYS - set(document))
    if missing:
        raise ValueError(f"Atlas snapshot is missing required keys: {', '.join(missing)}")
    if document["snapshot_version"] != SNAPSHOT_VERSION:
        raise ValueError(
            f"Unsupported Atlas snapshot version: {document['snapshot_version']}"
        )
    for key in _LIST_KEYS:
        if not isinstance(document[key], list):
            raise ValueError(f"Atlas snapshot field {key!r} must be a list")
    for key in _MAPPING_KEYS:
        if not isinstance(document[key], Mapping):
            raise ValueError(f"Atlas snapshot field {key!r} must be an object")


def _freeze(value: Any) -> Any:
    if isinstance(value, Mapping):
        return MappingProxyType({key: _freeze(item) for key, item in value.items()})
    if isinstance(value, list):
        return tuple(_freeze(item) for item in value)
    return value


def _thaw(value: Any) -> Any:
    if isinstance(value, Mapping):
        return {key: _thaw(item) for key, item in value.items()}
    if isinstance(value, tuple):
        return [_thaw(item) for item in value]
    return value
