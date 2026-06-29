from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any


@dataclass
class FileInfo:
    id: str
    path: str
    module: str
    is_test: bool
    loc: int
    function_count: int = 0
    class_count: int = 0
    warning_count: int = 0


@dataclass
class SymbolInfo:
    id: str
    name: str
    qualified_name: str
    kind: str
    file_id: str
    module: str
    class_id: str | None
    line_start: int
    line_end: int
    loc: int
    is_async: bool
    is_private: bool
    is_test: bool
    is_entrypoint: bool
    decorators: list[str] = field(default_factory=list)
    docstring_summary: str = "No docstring"
    source_excerpt: str = ""
    structure_hash: str = ""
    structure_size: int = 0
    is_wrapper: bool = False
    metrics: dict[str, int] = field(default_factory=dict)
    warnings: list[str] = field(default_factory=list)


@dataclass
class ImportInfo:
    file_id: str
    module: str
    name: str
    alias: str | None
    imported_module: str
    level: int
    kind: str
    line: int


@dataclass
class CallInfo:
    source: str
    target: str | None
    called_name: str
    kind: str
    resolved: bool
    confidence: float
    line: int


@dataclass
class WarningInfo:
    id: str
    type: str
    message: str
    severity: str
    file_id: str | None = None
    symbol_id: str | None = None


def to_dict(value: Any) -> Any:
    """Convert dataclasses and nested values into JSON-ready dictionaries."""
    if hasattr(value, "__dataclass_fields__"):
        return asdict(value)
    if isinstance(value, list):
        return [to_dict(item) for item in value]
    if isinstance(value, dict):
        return {key: to_dict(item) for key, item in value.items()}
    return value
