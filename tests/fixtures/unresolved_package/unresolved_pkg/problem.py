import math
import requests


def compute(value):
    """Mix resolved external calls and unresolved local-looking calls."""
    root = math.sqrt(value)
    requests.get("https://example.invalid")
    missing_builder(root)
    return value.transform(root)
