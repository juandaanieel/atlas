# Inline Codex prompts

> Status: Implemented (2026-07-13). This document describes the current
> client-side behavior in the Atlas explorer.

## Goal

Let a reviewer turn source-level observations into context-rich Codex prompts.
The explorer collects prompts during the current page session, combines them in
the Review sidebar, and copies the result for the reviewer to paste into Codex.

## Scope

The source-selection flow applies to functions and methods in the source
inspector.

- A reviewer selects one source line or a contiguous range and writes a
  free-form comment.
- Atlas builds a compact comment block from the file, line range, selected
  function, and statically resolved related functions.
- Three function-level quick prompts target the complete source excerpt:
  `Make function`, `Remove function`, and `Remove defensive coding`.
- The Review sidebar collects multiple prompts, supports removing individual
  items or clearing the collection, and copies the combined text.

The feature does not change the analysis payload or write annotations, review
files, or prompt history.

## Source selection and comments

1. The reviewer opens a function or method in the source inspector.
2. Clicking a line-number gutter selects that line and sets the range anchor.
3. Shift-clicking another gutter in the same symbol selects the inclusive range
   between the anchor and the new line. A normal click starts a new single-line
   selection.
4. Atlas shows an inline comment composer at the first selected line.
5. `Add comment` builds the prompt immediately, appends it to the in-memory
   Review collection, and clears the inline selection and draft.

`Cancel`, closing the inspector, changing tabs or the inspected function, and
reloading the page clear the active inline selection and draft. An empty
comment is rejected before it can be added.

## Quick prompts

The quick-prompt group appears below the function name in the source inspector.
Each action selects the full displayed function and pre-fills an editable
comment:

- `Make function` asks whether the selected code would be clearer as a focused
  extraction and requires behavior preservation.
- `Remove function` pre-fills `This should be a function. Write the code
  directly and add a comment.`
- `Remove defensive coding` pre-fills `Remove guards, fallback paths, exception
  handlers, and null or existence checks.`

The reviewer may edit the request before adding it to Review. Quick prompts use
the same collection flow as line comments; there is no separate generate step.

## Comment format

Every collected comment uses this format:

```text
--------
File: src/package/module.py
Line: 42–57
Involved functions:
- package.module.selected_function
- package.module.related_function
Comment:
Review this implementation.
--------
```

The selected function appears first. Resolved callers and callees follow as
one deduplicated, alphabetized list. A single note after the complete comment
collection explains that Atlas only includes statically resolved calls and
that indirect, dynamic, and external use needs separate verification.

For a quick prompt, `Line` covers the complete displayed function.

## Review collection and copying

The `Review` sidebar tab shows each collected file and range plus a read-only
text area containing the comment blocks separated by blank lines. The static
analysis note appears once at the end. The reviewer may remove one item, clear
all items, or copy the combined prompt.

Copying first uses `navigator.clipboard` in a secure context. If that fails or
is unavailable, Atlas tries a temporary text area with
`document.execCommand("copy")`. If both methods fail, the Review tab keeps the
combined prompt visible, selects its text, and reports that it must be copied
manually.

## State lifetime

Prompt items, combined text, drafts, selections, and copy feedback live only in
the JavaScript `state` object. Collected Review items survive ordinary renders
and sidebar changes during the current page session. They are not stored in
the URL, analysis payload, `localStorage`, or `sessionStorage`; reloading the
page discards them.

## Verification

- A normal click selects one absolute source line; Shift-click selects the
  inclusive anchored range in either direction.
- Line comments contain the selected file and line range. Quick prompts use the
  complete function range.
- Each block contains the file, line, involved functions, and comment fields in
  the documented order.
- The selected function appears first; resolved callers and callees are unique
  and alphabetized.
- The static-analysis note appears once after the complete collection.
- Multiple comments appear in Review and remain available while navigating the
  current page session.
- Remove, clear, clipboard success, fallback copy, and manual-copy failure
  states remain understandable.
- Reloading clears all prompt and review state without changing the payload or
  writing files.
