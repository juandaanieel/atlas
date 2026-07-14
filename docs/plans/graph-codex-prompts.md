# Graph Codex prompts

> Status: Implemented (2026-07-13).

## Goal

Let a reviewer create a focused Codex prompt from the structure shown in the
function graph. The graph feature complements source-line prompts: it captures
questions about dependencies and flows rather than comments on one source
excerpt.

Atlas keeps graph selections and prompt drafts in memory only. It does not save
comments, add a review inbox, or change the analysis payload.

## Supported prompt targets

### Call edge

Clicking an edge between two displayed functions opens a prompt composer for
that dependency. The prompt names the source and target functions, their
locations, and the statically resolved edge. It asks Codex to inspect the
dependency in repository context.

This feature applies only to direct function edges. Aggregated package and file
edges do not identify one call, so they are not comment targets.

### Function selection

`Command`-click on macOS or `Control`-click elsewhere toggles a function in a
temporary graph selection. Normal clicking keeps its current behaviour of
opening the source inspector.

When two or more functions are selected, the graph toolbar shows:

- the selected-function count;
- `Comment on selection`;
- `Comment on pipeline` when the selection is a valid pipeline;
- `Clear`.

`Comment on selection` is always available for two or more nodes. It is the
right target for a related set of functions with branches, missing links, or
multiple entry points.

### Pipeline

Atlas offers `Comment on pipeline` only when the selected functions form one
ordered path of statically resolved calls. It derives the order from the graph
and presents it in the prompt. Atlas must not call an arbitrary selection a
pipeline.

For selected functions `A`, `B`, and `C`, a valid pipeline has exactly the
edges `A → B` and `B → C`. It has one start node with no selected predecessor,
one end node with no selected successor, every internal node has one selected
predecessor and successor, and the path visits every selected node once.

Selections with a branch, disconnected nodes, a cycle, or an additional edge
remain available as `Comment on selection` but do not enable the pipeline
action.

## Prompt format

Graph prompts keep context compact because Codex has the repository available.
They include:

- The reviewer’s free-form question.
- The target type: dependency, selection, or statically resolved pipeline.
- Each function’s qualified name, repository-relative path, and line range.
- The relevant direct edges, written in call direction.
- A request to inspect the referenced implementation before proposing changes.
- A statement that Atlas reports only statically resolved calls; indirect,
  dynamic, and external callers need separate verification.

Graph prompts do not paste complete function bodies by default. Source-line
comments remain the appropriate path when the reviewer needs to point Codex at
an exact code excerpt.

## User interface

Keep the source inspector dedicated to source reading. Render graph prompt
composition in a small temporary panel inside the graph workspace, positioned
below the toolbar. The panel contains:

- A clear target summary, including pipeline order when applicable.
- A text area for the reviewer’s question.
- The generated, selectable Codex prompt.
- `Copy prompt` and `Cancel` actions.

Copying clears the active graph selection and closes the panel. Cancellation,
leaving graph view, changing scope, and reloading the explorer also discard all
temporary prompt state.

## Implementation plan

1. Add a `graphPromptSelection` array and a `graphPromptTarget` value to the
   client-side state in `src/atlas/explorer/static/src/app.js`. Keep both out
   of URL-hash and navigation state so they cannot persist across views.

2. Update function-node click handling in `fnBox` to detect `metaKey` or
   `ctrlKey`. A modified click toggles the node in `graphPromptSelection`; an
   ordinary click continues to call `selectFunction`.

3. Add a separate visual treatment for graph-prompt selection. It must remain
   distinguishable from the existing singular graph selection and source
   inspector state. Clicking blank graph space clears only the temporary graph
   selection.

4. Add direct-edge metadata and edge click handlers while drawing function
   graphs. `draw` already has each edge's source and target, so it can attach
   both IDs to the rendered SVG path and open a dependency target. Do not make
   grouped file edges interactive in this first version.

5. Add a pure helper that validates a selected pipeline against the direct
   function edges in the current graph. It returns either `null` or an ordered
   list of function IDs. The toolbar enables `Comment on pipeline` only when
   this helper returns an order.

6. Extend `renderTools` to show the selection count and actions when at least
   two functions are temporarily selected. Bind `Comment on selection`,
   `Comment on pipeline`, and `Clear` after each toolbar render.

7. Add a `graphPromptComposer` element inside the main stage in
   `src/atlas/explorer/static/index.html`. Render it only in graph workspace
   with an active edge, selection, or pipeline target. Add styles in
   `src/atlas/explorer/static/styles.css` for the panel, selected nodes,
   clickable edges, and narrow screens.

8. Reuse the prompt-generation and clipboard helpers introduced by the inline
   Codex prompts feature. The graph target supplies function metadata and
   edges; the shared composer owns draft text, generated text, copy feedback,
   and cancellation.

9. Clear graph prompt state in `setScope`, `setMode`, `showFullGraph`,
   `hideDetail`, and other transitions that replace the current graph. A
   successful copy also clears it.

## Verification

- A normal node click still opens the same source inspector.
- Modified clicks add and remove nodes without opening or changing the source
  inspector.
- An edge prompt includes its exact source and target functions.
- A two-node direct call enables a pipeline prompt in call direction.
- A three-node chain enables a pipeline prompt with all steps ordered.
- A branch, cycle, disconnected selection, or selection with an extra internal
  edge never enables the pipeline prompt.
- A non-pipeline selection can still generate a selection prompt.
- Copy and cancellation clear all graph prompt state; reload does not restore
  it.
- The graph remains pannable and zoomable, and graph-edge clicks do not trigger
  blank-canvas selection handling.
