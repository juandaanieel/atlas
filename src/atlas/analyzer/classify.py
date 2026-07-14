from __future__ import annotations


ENTRYPOINT_NAMES = {"main", "run", "cli", "app"}
LARGE_FUNCTION_LOC = 50
MANY_OUTGOING_CALLS = 8


def is_private_name(name: str) -> bool:
    return name.startswith("_") and not (name.startswith("__") and name.endswith("__"))


def is_entrypoint_name(name: str) -> bool:
    return name in ENTRYPOINT_NAMES


def is_test_symbol(name: str, file_is_test: bool) -> bool:
    return file_is_test or name.startswith("test_")


def warning_message(warning: str) -> str:
    messages = {
        "no_docstring": "No docstring",
        "large_loc": "Large function",
        "unresolved_calls": "Unresolved calls",
        "many_outgoing": "Many outgoing calls",
        "entrypoint": "Likely entrypoint",
        "test": "Test function",
        "circular_import": "Circular import",
        "parse_error": "Parse error",
    }
    return messages.get(warning, warning.replace("_", " ").title())
