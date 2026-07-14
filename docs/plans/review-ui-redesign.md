# Review UI redesign plan

> Status: Superseded design reference (2026-07-13). The current explorer keeps
> the city map in the left navigation rail rather than the main workspace and
> does not include the proposed repository-health strip. The README documents
> the current user-facing behavior.

## Goal

Make the Atlas explorer predictable during code review. Navigation remains visible, the city map becomes a useful repository view, and the right panel appears only when the user is reading source.

## Current problems

- The left navigation disappears outside the graph because `.shell.tab-view` hides the sidebar.
- The right panel has two unrelated roles: it shows source for a selected function and the repository map when nothing is selected.
- The city map is constrained to a 240px inspector panel, so directory labels and structural information cannot be read easily.
- The Repository map action may do nothing when no item is selected.
- City-map records only contain path, language, bytes, line count, and geometry. They omit Atlas's structural signals.
- The source panel has a user-resized width and preserves long lines, causing horizontal scrolling rather than a consistent reading measure.

## Design decisions

### Persistent navigation

The left rail remains present in every workspace view. It is 16rem wide when expanded and compact when collapsed. It contains:

- Repository identity and a collapse control.
- Review views: Summary, Use cases, and Functions.
- A navigation switch: Tree or City map.
- The active navigation surface and clear current-location styling.

The switch changes the navigation presentation without clearing the graph scope, map path, or open source inspector.

### Main workspace

The main workspace owns the active view:

- Review views render their existing content without hiding navigation.
- Graph view renders the scoped function or object graph.
- City view renders the city map at main-workspace size. It includes a compact repository-health strip and a map-information column for the selected file or directory.

The city map does not live in the source inspector. Its mode control belongs in the navigation rail, but its canvas needs the main workspace.

### Source inspector

The right panel has one role: source inspection.

- It is closed when no source-bearing function, method, or graph node is selected.
- Selecting one of those items opens it.
- Selecting a directory or file in the city map shows map information in the city view and does not open source automatically.
- It uses one fixed 34rem width and a visible collapse control. Remove drag resizing.
- Preserve source text but visually wrap it to approximately 58–64 monospace characters. Keep line numbers aligned to the first visual line and prevent horizontal overflow.

## Data plan

Extend each city-map code-file record with facts Atlas already computes:

- Code LOC, callable count, class count, and test status.
- Warning counts and warning types.
- Unresolved calls, dead functions, clone membership, load-bearing functions, and large-function LOC.
- Accepted functionality memberships when explicitly defined by the user. Do not infer functionality labels.

Roll those values up to directory records. Non-code files remain visible and use neutral metadata rather than fabricated analysis.

Use a semantic palette rather than path-hash colours:

- Neutral stone for ordinary files and directories.
- Slate for tests and non-code files.
- Muted amber for elevated structural risk.
- Muted red for severe warnings.
- A dark outline for the selected item.

Directory labels appear in a reserved strip at the top of each directory box. Box area follows LOC. The repository-health strip shows total LOC, flagged files, unresolved calls, load-bearing functions, and layer violations.

## Implementation phases

1. **Separate application state and page layout.**

   Update `src/atlas/explorer/static/index.html`, `src/atlas/explorer/static/src/app.js`, and `src/atlas/explorer/static/styles.css`. Replace the overloaded selection flow with separate workspace, navigation, scope, map selection, and source-inspector state. Keep the left rail in all views.

2. **Enrich the city-map payload.**

   Update `src/atlas/citymap.py` and `src/atlas/analyzer/payload.py` so the city-map builder receives file, model, and warning facts, then produces file and directory rollups. Treat the snapshot schema as a versioned contract and bump its version if the expanded structure is not backward-compatible.

3. **Build the main city view.**

   Replace the right-panel map renderer with a main-workspace treemap. Make directory and file tiles keyboard-accessible. Selecting a file reveals its structural summary and its callable list; choosing a callable opens source.

4. **Restrict and format the source inspector.**

   Remove the city-map fallback from `renderDetail`, remove the splitter, and render only source-oriented metadata and code. Apply source wrapping and line-number styling at the fixed panel width.

5. **Verify behavior and visual readability.**

   Regenerate the explorer from a fixture and a representative repository. Check the flows below at desktop and narrow widths.

## Acceptance criteria

- Navigation remains visible while switching between Summary, Use cases, Functions, Graph, and City map.
- Tree and City map modes visibly identify the current location and do not reset unrelated state.
- The city map fills the main workspace, uses readable directory headers, and presents repository and selection information without opening source.
- The map uses structural facts already supported by Atlas; it does not label inferred complexity or functionality as fact.
- A selected function or graph node opens the fixed source inspector.
- Closing the source inspector leaves the graph or city selection unchanged.
- No empty selection turns the source inspector into another navigator.
- Source code fits the fixed panel without horizontal scrolling and retains accurate line numbering.
- City-map payload tests cover deterministic geometry, file facts, directory rollups, and non-code files.
- Explorer integration tests cover persistent navigation, source-panel visibility, and map-file selection.
