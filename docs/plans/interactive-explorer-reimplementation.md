# Interactive explorer reimplementation plan

> Status: Proposed (2026-07-15).

## Goal

Replace the current vanilla JavaScript and SVG explorer with a TypeScript
application built around direct, physics-driven graph exploration without
losing architectural clarity or the existing source-review workflow. Users
must be able to grab nodes and containers, feel the connected neighborhood
respond, pin important structure, tune the forces, and let the graph settle
into a readable state.

The new explorer must make three activities work together:

- Explore folders, files, classes, functions, and call pipelines.
- Read highlighted source in a resizable code panel.
- Create AI review comments from source ranges and graph selections.

The Python analyzer remains the source of truth. This plan replaces the
browser application and its delivery boundary, not the dependency analysis.

## Current boundary

The current explorer is generated as a `file://` report. Python serializes the
complete analysis snapshot into `index.html`, then copies a classic JavaScript
application and stylesheet beside it. The application contains graph layout,
SVG drawing, navigation, source rendering, review state, and prompt generation
in one browser script.

The rewrite must preserve these implemented behaviors:

- Global file and pipeline views.
- Function and object views within a file.
- Public pipeline heads and separate class-internal workflows.
- Static trace selection and complete-path highlighting.
- File and folder ON/OFF controls.
- File and folder SOLO controls.
- Single-click graph selection and double-click source opening.
- Graph selection that survives closing the source panel.
- A resizable source panel with GitHub-dark syntax colors.
- Source-line and contiguous source-range selection.
- A review collection containing multiple source comments.
- Graph prompts for dependencies, selected functions, and valid pipelines.
- Copyable Codex prompts when direct AI review is unavailable.

The city map remains out of scope.

## Design decisions

### Keep analysis in Python

Python continues to build the repository model, resolve static calls, identify
objects, classify public and private methods, and derive pipeline membership.
The browser receives normalized facts and does not reimplement analyzer rules.

### Serve the application over localhost

`atlas explore` starts a small read-only local server and opens the explorer in
the browser. This enables module loading, Web Workers, streamed AI responses,
on-demand source reads, and optional WASM layouts.

Retain a separate static export command for portable reports. Static export
may omit direct AI execution, but it must retain navigation, graph exploration,
source reading, review collection, and prompt copying.

### Use TypeScript and React for application UI

React owns panels, controls, navigation, review sessions, source selection,
and explicit application state. The graph renderer owns continuous node
positions and animation frames. Physics ticks must not update React state.

Start with a reducer and small context providers. Do not add a general state
library until the state model demonstrates a concrete need for one.

### Use G6 for the interactive graph

[AntV G6](https://g6.antv.antgroup.com/en/manual/element/overview) provides
nodes, edges, nested containers, custom drawing, interaction behaviors, and
force-directed layouts.

Use custom G6 Canvas nodes for graph content. Do not render every graph node as
a React component. React remains appropriate for the application shell and
DOM-based inspectors, while Canvas keeps large graphs responsive.

Start with the Canvas renderer. Add WebGL only after profiling demonstrates a
rendering bottleneck that semantic zoom and aggregation do not solve.

### Use two layout engines

A single force simulation cannot express every Atlas constraint. The explorer
therefore provides three layout modes:

- **Field:** Obsidian-inspired force-directed exploration with free node
  movement and user-tunable forces.
- **Architecture:** deterministic directional layout using
  [ELK Layered](https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-layered.html).
- **Hybrid:** architectural placement for major regions followed by constrained
  local physics. This is the default.

Physics is a functional requirement, not decorative animation. Field and
Hybrid must use a real force simulation throughout direct manipulation. When a
user drags a node, its linked neighborhood and containing region respond. When
the user releases it, the simulation settles from the new position. The graph
must never drift or reheat because of selection, hover, or panel changes.

The hybrid layout uses:

- Link attraction for resolved calls.
- Node repulsion and collision using rendered node dimensions.
- A gravitational center for each active file or class container.
- A directional pull based on call depth.
- Fixed or semi-fixed public pipeline heads.
- Strong containment for private class methods.
- Ports for public class methods and cross-container calls.

Run iterative layouts in a Web Worker. The simulation cools and stops after it
settles. Selection never restarts physics. Dragging, filtering, SOLO, layout
changes, and an explicit `Relax` action may reheat it.

### Borrow Obsidian's graph interaction model

[Obsidian Graph view](https://obsidian.md/help/plugins/graph) is the interaction
reference, not a visual template. Carry these ideas into Atlas:

- A global graph and a local graph centered on the current selection. Local
  scope has a depth control for one to several call hops.
- Immediate connection highlighting on hover and durable execution-path
  highlighting on click.
- Direct canvas pan and zoom, direct node dragging, and a context menu on graph
  elements.
- A collapsible force panel with center gravity, repulsion, link attraction,
  link distance, collision padding, motion damping, and `Restore defaults`.
- Search-backed filters, orphan visibility, and saved groups. Atlas maps groups
  to reusable scopes and filter presets; color remains reserved for execution
  paths.
- Display controls for labels, arrows, node scale, and link thickness.

Atlas adds stronger structure than Obsidian: file and class containers,
directional calls, public-method ports, private-method containment, execution
paths, and semantic zoom. Force controls operate within those constraints
rather than flattening the codebase into an undifferentiated cloud.

### Model structure and execution separately

Structural containment has one hierarchy:

```text
folder -> file -> class -> method
```

Pipeline membership is an overlay on nodes and edges. It is not structural
containment because a function may participate in more than one resolved
path.

Public class methods act as boundary ports. External function paths may reach
those ports, but external edges do not connect directly to private methods.
Each public method may start a class workflow containing private methods and
external regular functions.

### Use CodeMirror for source and diff review

[CodeMirror 6](https://codemirror.net/docs/) renders source in a resizable,
read-only editor. It provides Python syntax highlighting, line selection,
search, gutters, range decorations, block widgets, and tooltips.

Use:

- `@codemirror/state`
- `@codemirror/view`
- `@codemirror/lang-python`
- `@codemirror/merge`

Custom gutter markers identify open AI and user comments. Range decorations
highlight their source spans. Block widgets render inline comment threads.
`@codemirror/merge` presents optional AI patch suggestions without adding a
second diff renderer.

Do not use Monaco unless Atlas expands into a full IDE with language servers,
rename operations, code actions, and multi-file editing.

### Use Primer for the application shell

[Primer React](https://primer.style/product/getting-started/react/) provides
the GitHub-dark component and color system. Use its TreeView, ActionList,
buttons, dialogs, tooltips, tabs, and form components where they fit.

The graph path palette remains the Atlas palette of explicit color codes.
Primer colors apply to application chrome, containers, text, and interaction
states, not pipeline identity.

### Make review comments first-class data

Source comments and graph prompts currently use separate temporary state. The
rewrite unifies them in a review session.

```ts
type ReviewTarget =
  | {
      kind: "source";
      fileId: string;
      symbolId: string;
      startLine: number;
      endLine: number;
    }
  | { kind: "node"; nodeIds: string[] }
  | { kind: "dependency"; sourceId: string; targetId: string }
  | {
      kind: "pipeline";
      pipelineId: string;
      nodeIds: string[];
      edgeIds: string[];
    };

type ReviewComment = {
  id: string;
  target: ReviewTarget;
  author: "user" | "ai";
  body: string;
  severity?: "info" | "warning" | "error";
  status: "draft" | "open" | "resolved" | "dismissed";
  suggestion?: {
    original: string;
    replacement: string;
  };
};
```

Review targets remain valid when a panel closes or the graph relayouts. Each
target uses stable snapshot, file, symbol, node, and edge identifiers rather
than rendered coordinates.

### Stream structured AI results

The Python server owns model credentials, repository access, prompt assembly,
and review persistence. Credentials never enter the browser.

Use [`@ai-sdk/react`](https://ai-sdk.dev/docs/ai-sdk-ui/transport) with a custom
transport to the Python server. Stream typed review events rather than one
unstructured response string. The UI progressively receives:

- Review status and progress.
- An overall summary.
- Source-anchored findings.
- Graph-anchored findings.
- Optional patch suggestions.

Render explanatory text with `react-markdown`, `remark-gfm`, and
`rehype-sanitize`. Preserve `Copy prompt` for offline use and for reviewers who
want to continue in Codex manually.

## Package plan

### Initial dependencies

| Responsibility | Packages |
| --- | --- |
| Application | `react`, `react-dom`, `typescript`, `vite`, `@vitejs/plugin-react` |
| Graph | `@antv/g6`, `elkjs` |
| Source and diff | `codemirror`, `@codemirror/state`, `@codemirror/view`, `@codemirror/lang-python`, `@codemirror/merge` |
| Product UI | `@primer/react`, `@primer/primitives`, `@primer/octicons-react` |
| Panels | `react-resizable-panels` |
| AI transport | `ai`, `@ai-sdk/react` |
| AI text | `react-markdown`, `remark-gfm`, `rehype-sanitize` |
| Canvas popovers | `@floating-ui/react` |

### Optional dependencies after profiling

- `@antv/layout-wasm` for a measured layout bottleneck.
- `@tanstack/react-virtual` for very large navigator or review lists.
- `@tanstack/react-query` if server-state caching and mutation flows become
  complex enough to justify it.

Do not add a chat UI kit, a second graph renderer, or a separate diff library
in the first implementation.

## Runtime architecture

```mermaid
flowchart LR
    analyzer[Python analyzer] --> snapshot[Versioned snapshot]
    snapshot --> server[Local explorer server]
    server --> app[React application]
    app --> graph[G6 graph canvas]
    app --> source[CodeMirror source panel]
    app --> review[Review workspace]
    snapshot --> worker[Layout worker]
    worker --> force[G6 force layout]
    worker --> elk[ELK architecture layout]
    force --> graph
    elk --> graph
    review --> ai[Python AI endpoint]
    ai --> review
    review --> source
    review --> graph
```

The server exposes a small local API:

```text
GET  /api/snapshot
GET  /api/source/:file
GET  /api/reviews
POST /api/reviews
POST /api/reviews/:id/comments
POST /api/reviews/:id/run
```

Persist review sessions under `.atlas/reviews/`. Associate each session with
the analysis snapshot and Git commit when available. A source comment stores
the file, symbol, and line range used when it was created. If the file changes,
the UI marks the comment stale rather than silently attaching it to different
code.

## Interaction contract

### Graph motion

- The graph moves only during initial layout, explicit layout changes, node or
  container dragging, visibility changes, SOLO, or `Relax`.
- Selection, hover, opening source, closing source, and creating a comment do
  not move the graph.
- Dragging a node or container gives direct positional control and reheats only
  the affected neighborhood. Connected nodes visibly respond during the drag.
- Releasing a dragged element lets that neighborhood find a new equilibrium;
  the rest of the graph remains stable.
- The user may pin a node permanently until the layout is reset.
- Pinned nodes and containers are visually identifiable and remain fixed across
  selection, filtering, source-panel changes, and saved sessions.
- `Pause` freezes the current simulation immediately. `Relax` reheats the
  active scope. `Reset layout` clears pins and restores the mode defaults.
- Force controls update the active simulation immediately and are stored per
  layout mode. `Restore defaults` returns to Atlas-tuned values.
- File and folder visibility changes reorganize the remaining visible graph.
- SOLO shows one file or folder subtree and reorganizes the remaining graph.

### Selection

- Clicking a function, method, class, file, or pipeline selects it and
  highlights its complete path.
- Unrelated paths recede without disappearing entirely.
- Clicking empty canvas clears selection and restores full opacity.
- Double-clicking a source-bearing graph element opens source.
- Closing the source panel does not clear graph selection.
- A selected function inside a selected path receives a second, neutral
  selection treatment without changing path color.
- Local graph scope can replace the global canvas around the selected node at
  a configurable call depth. Returning to global scope preserves selection and
  pinned positions.

### Semantic zoom

- Overview zoom shows containers, public heads, terminals, counts, and
  simplified topology.
- Architecture zoom shows function labels and primary edges.
- Detail zoom adds file labels, call metadata, and class internals.
- Semantic zoom changes rendered detail, not node coordinates.

### Source and review

- The source panel opens only on double-click or from a review comment.
- The panel width is resizable and remembered per browser.
- Clicking a source gutter selects one line; Shift-click extends the range.
- Drag selection may also define a comment range.
- User and AI comments remain visible as distinct gutter markers.
- Clicking a review item opens its source or graph target and restores the
  corresponding highlight.
- Suggested changes open a merge view. Applying repository changes is outside
  the initial rewrite and requires a separate explicit action.

## Implementation phases

### 1. Version the browser data contract

- Define TypeScript types for the snapshot, graph elements, containers,
  pipelines, source references, and review targets.
- Add a schema version to the explorer payload.
- Move browser-derived analyzer semantics into Python where necessary.
- Add stable IDs for edges and pipelines.

Exit criterion: the legacy explorer and a small TypeScript fixture reader can
consume the same representative snapshot without interpreting facts
differently.

### 2. Add the React application and local server

- Create an explorer UI package with Vite and TypeScript.
- Add the local read-only server and `/api/snapshot` endpoint.
- Build the Primer-dark shell, navigation, toolbar, empty states, and panel
  layout.
- Keep the legacy explorer available behind an explicit command or flag.

Exit criterion: `atlas explore` opens the new shell and loads the snapshot;
static export remains available.

### 3. Implement a physics-driven graph vertical slice

- Render functions and direct calls with custom G6 Canvas nodes and edges.
- Add pan, zoom, fit, selection, empty-canvas clear, and double-click events.
- Add Field mode with drag, local reheating, settle, pin, pause, `Relax`, reset,
  and the initial force controls.
- Reproduce stable path colors and selected-path dimming.
- Keep graph selection independent from panel state.

Exit criterion: one representative repository supports function selection,
path highlighting, source-open events, and direct physics-driven manipulation
without React receiving layout ticks. Dragging changes the local equilibrium;
selection does not.

### 4. Add hybrid architecture and visibility controls

- Add the layout worker.
- Add Architecture and Hybrid modes to the Field mode from phase 3.
- Constrain local physics by file and class regions without removing direct
  manipulation.
- Add global and local scopes with a call-depth control.
- Port file and folder ON/OFF and SOLO controls.
- Reorganize visible nodes after visibility changes.

Exit criterion: selection does not move the graph, while explicit structural
changes produce a smooth and bounded relayout.

### 5. Add architectural containers and semantic zoom

- Add folder, file, and class containers.
- Render public class methods as ports and private methods as contained nodes.
- Restore global file and pipeline views.
- Add semantic zoom and large-graph aggregation.
- Keep paths visually distinct from containment boundaries.

Exit criterion: the representative dense graph remains understandable at fit,
architecture, and detail zoom levels.

### 6. Replace the source inspector with CodeMirror

- Load complete source on demand.
- Add GitHub-dark Python syntax highlighting, line numbers, search, and
  read-only behavior.
- Add range selection, resizable panels, remembered width, and source links.
- Preserve double-click source opening and selection persistence on close.

Exit criterion: every existing function and class source entry point opens the
correct file and range without overflowing the panel.

### 7. Unify review targets and comments

- Introduce `ReviewSession`, `ReviewTarget`, and `ReviewComment`.
- Port source-range comments and quick prompt templates.
- Port dependency, selection, and valid-pipeline prompts.
- Add CodeMirror gutter markers, range decorations, and inline comment widgets.
- Persist review sessions and retain prompt-copy fallback.

Exit criterion: one review session can contain source, dependency, node, and
pipeline targets, and each item restores its graph or source context.

### 8. Add streamed AI review

- Add the Python review endpoint and browser transport.
- Validate structured AI results before storing them.
- Stream progress, summary, findings, and optional suggestions.
- Render sanitized Markdown and merge previews.
- Support cancellation, failure, retry, and partially completed reviews.

Exit criterion: a failed or cancelled AI run does not lose collected review
targets, and no credential or unrestricted file access reaches the browser.

### 9. Complete parity and retire the legacy UI

- Verify summary, use-case, function, object, trace, visibility, navigation,
  source, and review workflows against the legacy explorer.
- Measure representative small and large repositories.
- Document the new command behavior and static export limitations.
- Remove the legacy UI only after parity criteria pass.

Exit criterion: the new explorer is the default and the legacy application has
no unique supported behavior.

## Verification strategy

### Unit coverage

- Snapshot normalization and schema compatibility.
- Review-target creation and stale-source detection.
- Pipeline validation and path membership.
- Visibility and SOLO reduction.
- Semantic-zoom level selection.
- AI event validation and review-state transitions.

### Browser coverage

- Single click selects without opening source or moving nodes.
- Double click opens the correct source range.
- Closing source preserves graph selection.
- ON/OFF and SOLO work for files and folders.
- Visibility changes reheat and settle the graph.
- Dragging a node moves it directly, causes only its neighborhood to respond,
  and reaches a stable resting state after release.
- Pin, unpin, pause, `Relax`, and reset have distinct, predictable effects.
- Force controls visibly change center gravity, repulsion, link attraction,
  link distance, collision padding, and damping; restoring defaults is exact.
- Local scope expands by call depth and returns to the unchanged global scope.
- Source comments and graph comments coexist in one review session.
- AI cancellation, error, retry, and copy-prompt fallback remain usable.
- Keyboard navigation and focus restoration work across graph, tree, source,
  and review panels.

### Performance coverage

Measure at least three snapshots:

- Small: fewer than 200 visible nodes.
- Medium: approximately 2,000 visible nodes.
- Large: at least 10,000 analyzed nodes with aggregation enabled.

Record initial layout time, interaction latency, steady-state frame rate,
memory use, and source-panel opening time. Do not move to WebGL or WASM without
a measured bottleneck and a repeatable benchmark.

## Acceptance criteria

- Atlas retains the Python analyzer and produces a versioned browser contract.
- Field and Hybrid are genuinely physics-driven: grabbed nodes and containers
  directly follow the pointer, connected neighborhoods respond, collisions are
  resolved, and the graph settles after release.
- The default Hybrid view combines architectural regions with local physics;
  Field provides unconstrained Obsidian-style exploration and Architecture
  provides a deterministic fallback.
- Graph movement happens only for explicit layout-affecting actions.
- Users can tune, pause, relax, reset, pin, and restore the force simulation
  without losing their graph or review selection.
- Global and depth-limited local graph scopes are both available.
- Files, folders, classes, functions, methods, and pipelines remain visually
  distinguishable at every semantic-zoom level.
- Public class methods are external ports; private methods remain internal.
- File and folder ON/OFF and SOLO controls dynamically relayout visible nodes.
- Single click highlights; double click opens source.
- Closing source never clears a graph highlight.
- CodeMirror provides highlighted, searchable, range-selectable source in a
  resizable panel.
- Source, node, dependency, and pipeline comments share one persistent review
  model.
- AI findings stream into stable source or graph targets and survive panel
  changes and graph relayouts.
- Reviewers can always copy a repository-aware Codex prompt without enabling
  direct AI execution.
- Credentials and unrestricted repository access remain in the Python process.
- The legacy explorer is removed only after documented behavior reaches parity.

## Main risks

### Force layout reduces architectural clarity

Mitigation: keep deterministic Architecture mode, make Hybrid the default,
anchor public heads, use container gravity, and stop the simulation after it
settles.

### Physics feels decorative or uncontrollable

Mitigation: ship direct dragging in the first graph slice, expose the small set
of Obsidian-inspired force controls, reheat only the affected scope, provide
pin and pause controls, and verify that each control produces an observable and
repeatable layout change.

### Compound structure conflicts with pipeline membership

Mitigation: use containers only for structural ownership. Render pipelines as
edge and node overlays with stable IDs.

### Large graphs overwhelm the renderer

Mitigation: use Canvas nodes, semantic zoom, aggregation, a layout worker, and
measured renderer upgrades.

### Review comments drift when source changes

Mitigation: associate comments with snapshot and Git identifiers and mark
outdated targets stale. Do not silently remap them by line number alone.

### The rewrite loses small legacy behaviors

Mitigation: keep the legacy explorer during migration, maintain an explicit
parity checklist, and migrate one complete user workflow at a time.

### AI integration expands the security boundary

Mitigation: keep model access and repository reads in Python, validate all
structured output, sanitize rendered Markdown, and require explicit user
actions for any future file mutation.
