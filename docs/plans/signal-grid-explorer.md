# Signal grid explorer

> Status: Proposed (2026-10-09). Awaiting veto before any code changes.

## Goal

Replace the explorer's three geometries (repository sunburst, Origin file
rings with class onions, Pipeline call-depth rings) with one geometry that
puts the seven kept signals back into the shape of the picture. Python
computes every coordinate and every mark; the browser only draws.

The analyzer, the snapshot contract, the inspector, the review collection,
the Guide, and the vault stay as they are. This plan changes `model.py`, the
explorer assets, the story view vocabulary, and the schemas.

## Current problems

- The explorer draws none of `dead`, `is_root`, `is_hub`, `is_orchestrator`,
  `load_bearing`, `clones`, `structure_hash`, or `layer_violations`. It draws
  complexity ticks and git marks instead, which fire on most files.
- Three unrelated geometries must be learned, and none of them shows a
  defect. The all-files Origin view of tempura (306 functions) is a hairball
  of overlapping frames and colliding captions.
- `buildPipelineModel` in `app.js` re-derives workflows, ownership, and
  shared infrastructure, so two implementations of the same semantics exist.
  The visible symptom, 35 functions in the explorer's `compile_mesh_inputs`
  pipeline against 24 in `architecture.pipelines`, comes from the
  `MAX_PIPELINE_NODES = 24` cap in `architecture.py`, which the explorer does
  not apply; the real reach is 35. The cap should go, and the explorer should
  stop re-deriving.
- Layout runs asynchronously in a 1.6 MB ELK bundle with status messages,
  retries, and a plain-options fallback.

## Design decisions

### One geometry: module columns by call-depth rows

- **Columns are modules.** One column per module that owns at least one
  call-map node, in navigation-tree order. A column's width is its widest
  cell.
- **Rows are call depth.** Row 0 is the entry surface. Every live node's row
  is its longest path from any root after cycle breaking, so resolved calls
  point downward except genuine cycles, which curve upward.
- **The dead band is the last row.** Dead functions sit below the live graph
  in their own module column, ghosted. Nothing else sits there.
- **Cells pack left to right.** Nodes sharing a column and row are ordered by
  the barycenter of their neighbours in the adjacent rows, ties by line
  number, then id. Two sweeps (down, then up). Deterministic.
- **Edges are plain curves.** Bottom centre of the caller to top centre of the
  callee. No routing engine. Crossings are resolved by emphasis, not geometry.
- **Scope is a column filter.** Choosing a tree path shows only the columns
  under it, compacted. Calls that leave the scope become a small chevron on
  the card's bottom edge (calls out) or top edge (called from outside); the
  inspector lists them.
- **Classes are compact boxes.** A class with analysed methods is one box in
  its module column, placed in the row of its shallowest public method. Its
  rows are the constructor and the public methods, in source order, each row
  carrying the same marks as a card (teal bar for load-bearing, bold for entry
  surface, dotted underline for clone, small type for wrapper). Private
  methods collapse into a hatched tail at the bottom of the box; expanding
  the class shows them as rows inside the box. Calls attach to the box side
  at the method's row; calls from collapsed private methods attach to the
  tail; calls inside one class are not drawn. Dead private methods still fall
  into the dead band as ghost cards under the class's column. A data-only
  class is a box whose rows are its fields. The methods-by-fields blueprint
  stays in the inspector; the onion is removed.
- **Cards carry no numbers.** The name, the class or module context, and the
  marks below. Counts live in the sidebar tree and the inspector.

### Signal-to-mark table

| Signal | Definition (unchanged) | Mark in the picture |
| --- | --- | --- |
| Entry surface | public with no resolved caller, or named `main`/`run`/`cli`/`app` | row 0; name in bold |
| Dead | private and unreachable from the entry surface | ghosted card in the dead band; its edges ghosted |
| Load-bearing | hub (fan-in ≥ 3) or orchestrator (fan-out ≥ 4) | teal, heavier border |
| Clone group | identical structural fingerprint with ≥ 14 nodes | dotted violet link between members; dotted outline |
| Wrapper | body is one pass-through call | half-height card |
| Mutual layer coupling | two layers depend on each other | call edges between those layers red; both column headers red-underlined. Drawn only once layers are declared, not inferred from name tokens (see Risks) |
| Circular import | module import cycle | red dashed arc between the column headers |

Everything else is grey and quiet. A healthy package is a grey grid with a
short dead band and no red.

Deliberately not drawn in the picture: complexity (inspector panel only),
git status (sidebar panel only), unresolved calls (inspector only), private
visibility (the underscore in the name already says it). The dashed outline
is therefore free for dead code again.

### Emphasis, never geometry

- Click a card: its downstream call tree and its direct callers light up,
  everything else dims. Positions do not change.
- Hover: incident edges light up.
- Trace: the green directed route, as now.
- Context control: dims cards beyond N hops from the selection instead of
  hiding them. The pipeline view becomes "select the root and fit".
- Opening or closing the inspector, switching sidebar tabs, and adding review
  notes never touch the canvas.

### Navigation spine

The sidebar tree shows the `model.tree` rollups (dead, clones, load-bearing,
wrappers) as badges per package and module. Those are numbers, but they live
in navigation, not in the picture. On/off and solo keep working as column
filters.

### Semantic zoom

- Near: full cards with labels.
- Far: cards become tiles; marks still read (teal, dotted, ghost, red).
- Overview (whole package beyond a card-count threshold): each column is a bar
  whose ghosted tail is its dead band, with its header marks. The picture is
  still the same grid, only less detailed.

### Removed

Sunburst, Origin rings, onion, Pipeline rings, ELK bundle and all layout
options, stress packing, radial routing, the unused region-card node kinds,
canvas complexity and git marks, layout status messages.

### Kept

Analyzer and snapshot contract, inspector (source, blueprint, dependencies,
complexity panel), review collection and quick actions, Guide, keyboard
shortcuts, deep links, the key, the dashboard, the vault.

## Data plan

Snapshot version 6 → 7. `build_model` gains a `layout` block; nothing else in
the model changes shape.

```text
model.layout
  columns:        [{module, scope, layer, width}]   # tree order
  rows:           int                                # live rows
  dead_row:       int                                # == rows
  nodes:          {node_id: {column, row, slot}}     # free functions and dead methods
  classes:        {class_id: {column, row, slot, rows: [method_id], private: [method_id]}}
  clone_links:    [[id, id], ...]                    # consecutive members per group
  coupled_layers: [[layer, layer], ...]              # copy of layer_violations
  import_cycles:  [[module, module], ...]            # consecutive pairs per cycle
```

A method that belongs to a class box has no entry in `nodes`; its position is
the box plus its row index. `build_tree` must also admit modules that only
define classes, since today it is built from functions alone and such
modules would otherwise have no column. The set of expanded classes is
explorer state (hash field `expanded`), not snapshot data; expanding a class
is a structural change like a scope change and may move cards within that
column's row band.

Rules:

- Cycle breaking: depth-first from roots in sorted order; back edges are
  ignored for ranking only and still drawn.
- Rank: longest path from any root over the broken graph. `is_root` holds
  exactly for row 0.
- Dead nodes are not ranked; they go to `dead_row` in their module column.
- Coordinates are integers in grid units. The renderer owns card size and
  pixel spacing.
- Edge colour is a lookup: an edge is red when its two columns' layers form a
  pair in `coupled_layers`. The browser computes no graph property.

`overview.circular_imports` already holds the cycles; the layout copies them
as module pairs so the renderer does not parse cycle lists.

## Hash and story vocabulary

Explorer hash fields become `scope`, `selection`, `source`, `context`,
`traceStart`, `traceEnd`. `pipeline`, `structure`, and `crossFile` are retired.

Story version 1 → 2. View keys become `scope`, `selection`, `source`,
`object`, `trace_start`, `trace_end`, `context`. The default guide keeps its
five chapters; the static call path chapter selects the root and fits to its
call tree. An authored version 1 story fails validation with a message naming
the version.

## Implementation phases

1. **Python layout.** Add the layout block to `src/atlas/analyzer/model.py`;
   bump `SNAPSHOT_VERSION`; extend `schema/atlas.schema.json`. Tests in
   `tests/test_model.py` for row 0 equals roots, dead band placement, column
   order, slot determinism, clone links, cycle pairs; `tests/test_schema.py`
   for the new block.

   Exit: `atlas.json` for every fixture validates and `layout.nodes` covers
   every call-map node.

2. **Renderer.** Rewrite `src/atlas/explorer/static/src/app.js` to draw from
   `model.layout`; delete `elk.bundled.js` and its licence file; trim
   `styles.css`; update `core.js` hash helpers and `tests/js`; keep inspector,
   review, Guide, trace, keyboard code. Tree badges from `model.tree`. Key
   entries equal the mark table.

   Exit: the explorer contains no reachability, ownership, or layout code.

3. **Story and docs.** Story version 2 in `src/atlas/story.py` and
   `schema/atlas-story.schema.json`; `tests/test_story.py`; README "What it
   shows" and the Guide paragraph.

4. **Verification on tempura.** Screenshots of all files, the
   `tempura.electrostatics` scope, a selected root with its call tree, and a
   selected method, checked against the acceptance list.

## Acceptance criteria

- All seven marks are visible in the tempura all-files view without opening
  a panel, and the key names exactly those marks and nothing else.
- Every class with analysed methods appears as one box whose rows are its
  constructor and public methods; private internals are collapsed by default
  and shown on demand; data-only classes show their fields.
- No number is printed inside a card.
- Selection, hover, trace, inspector, sidebar, and review actions never move
  a card.
- The tempura all-files view fits one screen with no overlapping cards or
  captions, and each column reads as a bar at overview zoom.
- Every count the explorer shows comes from the snapshot; Python and the
  explorer cannot disagree on pipeline size, dead count, or clone count.
- No layout library ships; explorer assets stay under 200 KB.
- Existing tests pass; new tests cover ranks, dead band, ordering
  determinism, cycle pairs, and both schemas.

## Risks

- **Wide packages.** Many modules give many columns. Mitigation: scope via the
  tree and the overview zoom; column order follows the tree so neighbours are
  related.
- **Dense fan-out.** A root calling 20 functions across modules produces many
  crossings. Mitigation: barycenter ordering and selection dimming; no routing
  is a deliberate trade for stability.
- **Layer inference is name-based, and on tempura it is wrong.** A mock of
  this grid on 2026-10-09 showed 16 red edges, and 4 of the 5 coupled pairs
  came from token misfires: `_domains` matched `main`, `_raster_edits` matched
  `ast`, `_thomas_fermi_core` matched `core`, and `layout` matched the render
  token while meaning chip layout. Decision: red is reserved for circular
  imports until layers can be declared by the user; the mutual-coupling mark
  stays in the table but is not drawn from inferred layers.
- **Story version 2 breaks authored stories.** Mitigation: validation names
  the version; the README documents the new keys; the default guide is
  regenerated.
