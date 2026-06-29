from __future__ import annotations

import ast
import re


SENTENCE_RE = re.compile(r"(?<=[.!?])\s+")


def summarize_docstring(node: ast.AST) -> str:
    """Return a compact, mechanical summary for a symbol docstring."""
    docstring = ast.get_docstring(node, clean=True)
    if not docstring:
        return "No docstring"

    paragraphs = [part.strip() for part in re.split(r"\n\s*\n", docstring) if part.strip()]
    first_paragraph = paragraphs[0] if paragraphs else docstring.strip()
    sentences = SENTENCE_RE.split(first_paragraph, maxsplit=1)
    return sentences[0].strip() or "No docstring"
