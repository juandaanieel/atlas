# Strata surface: a module is a box

> Status: Prototype (2026-10-09). Runs on tempura (snapshot version 7) at
> `prototypes/strata-surface/`, a copy of `prototypes/strata/` (see
> `strata.md`). Nothing under `src/`, `tests/`, `schema/` or the other
> prototypes changed. One of three tracks answering "the information is still
> quite difficult to digest"; the sibling tracks are `strata-guide` (a reading
> path) and `strata-hierarchy` (a visual-hierarchy audit).

## Answer in brief

- **A module is what a class already is.** At the overview and in a package
  scope every module is a compact box in the class block's family: a header,
  one row per public name, a hatched tail for the internals, ghost rows for the
  dead. The 306 function cards, the 17 class blocks and the 225 same-module
  curves appear only when a module unfolds.
- **Each level answers one question with a few dozen marks.** Overview: 113
  marks (was 651), 48 labels, smallest 8.5 px. Package `electrostatics`: 76
  marks (was 199) and every row named, none cut (was 52 cut of 68). Package
  `mesh`: 98 marks (was 192), all 17 public names written out (the integrated
  view drew 60 unnamed cards).
- **Calls attach to rows.** A call enters a box on its left side at the row
  (or the tail) it lands on and leaves from the right side at the row that
  makes it. Of the 76 calls between modules, 34 land on a public row and 41 on
  a tail: you can see private internals being called from outside without
  unfolding anything.
- **Nothing else moves.** One hash, `c1204b1` over 37,026 line and box
  coordinates, holds at the overview, under hover, row hover, pipeline, link
  and plate-ribbon selection, in Plan, in all 7 package scopes and at a
  reader's zoom. Unfolding a module changes only the lines that touch it and
  folding restores the hash.

## Problem

The integrated prototype shows everything at once at similar contrast. Its
overview draws 242 cards, 17 class blocks and 288 lines (651 marks); a package
scope draws every card of every module plus every call (199 marks in
`electrostatics`, 52 of its 68 labels cut, 55 under 8 px); in `mesh` the cards
are too small to carry names at all. Every view answers every question, so no
view answers one.

## The box rule

Python (`prepare.py`, `box_layout`) builds every box.

1. **Rows are the public surface, in source order.** A row is a live function
   or a class whose name has no leading underscore. A class is one row; a call
   into any of its methods lands on that row. A root (an entry point: public
   and called by nothing inside the package) is bold.
2. **At most 6 rows.** A larger surface keeps 5 rows, chosen by calls from
   other modules, then load-bearing, clone, entry, source order; the rest fold
   into a "more" band drawn as one hairline per hidden name (a book edge, never
   a number). Tempura has 3 such boxes (`specs` 3 hidden, `extraction` and
   `layout_pipeline` 2).
3. **Everything else alive folds into the hatched tail:** private functions,
   private classes. A module with no public name is a header and a tail (6
   sealed boxes: `_quantum_petsc`, `_quantum_response`, `_thomas_fermi_core`,
   `geometry_generators`, `_recipe`, `_regions`).
4. **Dead code never folds.** Each dead function is a ghost row (dashed,
   unfilled, its name in ghost grey) under the tail, at most 3, then one ghost
   band. Tempura: 5 ghost rows in `_plan`, `_built`, `_canonical`.
5. **Signals ride on what holds them.** A row, band or tail carries the marks
   of its contents exactly as a card does: teal bar (load-bearing), violet
   dotted underline (clone member), bold (entry), a shorter row (wrapper). So
   a load-bearing private helper still shows as a teal bar on its tail.

Names are never cut where space allows wrapping: a name longer than the line
wraps after an underscore or before a capital, in at most 3 lines, choosing the
split with the shortest longest line. The line length is set per package: the
scope frame holds about 150 characters across its modules, so a package of n
modules gets lines of 150 / n characters, 11 to 18 (`mesh` 11, `electrostatics`
16, `layout` and `strain` 18). The box width follows its longest line (2.3 to
3.2 units). 52 of the 82 rows wrap, 11 into three lines.

Geometry: every box hangs from the entry surface (y = 0), so headers form one
line and calls rise only a short way to their lane. The ground sits under the
tallest box (`updates`, 5.8 units); a faint glass column joins each box to its
plate, the room it unfolds into.

## The three levels and their questions

| Level | Question | What is drawn |
| --- | --- | --- |
| Overview (all packages, Axonometric) | What depends on what, and where are the defects? | Plates; 40 boxes with header names (rows hidden, only their signal ticks); the tail, band and ghost rows; 8 package-pair ribbons; clone chords only between modules; import-cycle arcs when present. Imports and module-pair lines are hidden. |
| Package scope (Elevation, face-on) | What is this package's public surface, and how do its modules depend on each other? | Boxes with named rows; one lane per module pair above the boxes, one line per link (pair of slots) in it; stubs where calls leave the scope with a port label; imports on the ground (visible in Axonometric and Plan). |
| Module scope (or a header click) | How does it work inside? | The box unfolds in place into its pane: one column of cards on the module's own call-depth floors, class blocks, an arc diagram of the calls inside the module in the left margin, dead cards under a dashed divider. Its links give way to their member calls, which keep the link's lane and risers and end on cards. Neighbours stay boxes, a step back. |

- **Semantic zoom.** At the overview the rows of a box appear once a row is 11
  px tall on screen (a reader's zoom), see
  `/tmp/atlas-shots/surface/10-overview-zoomed-rows.png`.
- **Hover a box** (overview): its links light (the calls between it and every
  other module), plate ribbons fall to 18 %, a tooltip names it.
- **Select a pipeline:** lit boxes keep their rows; lit rows and tails get a
  bright outline; a lit row too small for its name at that zoom gets a
  callout under its box (the slot under a box is always empty); the links
  carrying lit calls draw bright, with the wavefront and pulses of
  `strata.md`.
- **Unfold:** a header click in a scope (or `u`, or the sidebar's module row,
  which also fits the camera). The body grows to Python's open height in 220
  ms; rows fade out, cards appear as the body passes them, links cross-fade
  to member calls. Nothing else moves.

## Marks

| Mark | Meaning | Levels |
| --- | --- | --- |
| Plate, name at the front edge | Package (a slice for a split package) | All |
| Box, name on the header | Module | All |
| Row (bold = entry, short = wrapper) | Public function | Scope; overview on zoom |
| Inset row | Public class (calls into its methods land here) | Scope; overview on zoom |
| Hairline band | Public names that did not get a row, one hairline each | All |
| Hatched tail | Private internals | All |
| Ghost row, dashed | Dead function, never folded | All |
| Teal bar | Load-bearing (hub or orchestrator) inside the row, band or tail | All |
| Violet dotted underline | Clone member inside the row, band or tail | All |
| Violet dashed chord | Clone pair in two modules | Overview, scope |
| Glass column | The module's slot down to its plate | All |
| Package ribbon | Calls between two plates, width by log count | Overview |
| Lane track (square corners) | Calls between two modules of one row, one line per pair of slots | Scope; overview on hover |
| Arc | Calls between rows | Scope; overview on hover |
| Stub with port label | A call leaving the scope (`→ mesh · meshing`) | Scope |
| Card, class block | Function, class | Unfolded module |
| Margin arc | Call inside a module | Unfolded module |
| Dashed ground line | Import (red: import cycle) | Plan, scope |
| Bright outline, pulses | Selection | On selection |

A call enters a box on its left side and leaves on its right, so a box reads as
a schematic block. Each link end owns a fixed riser in the gutter (0.24 units)
beside the box; the innermost riser climbs highest, then comes the higher
port, so risers at one side do not cross.

## Camera and fit

- A package scope frames the boxes, their lanes (or the sky base when a stub
  rises) and the side-port street of row stubs; never the empty columns under
  the boxes. Every package fits face-on at 1,280 × 800: `layout`, `strain`
  and `plotting` rows read at 9.5 px or larger, `electrostatics` at 7.6 px or
  larger, `mesh` at 7.5 px.
- A module scope frames the unfolded pane with its left and right neighbours on
  the plate (height-bound, about 45 px per unit).
- A pipeline frames the lit boxes and the lanes between them.
- The overview keeps the 47° Axonometric of `strata.md`. Module names are
  screen labels at 8.5 px, centred on their box; a name that would run into a
  neighbour first steps up above its box (up to three tiers) and is cut to the
  box width only when every tier is taken (3 of 40).

## What never moves

- `atlasProto.geomSignature()` hashes every link, member call, package ribbon
  and box position and height: `c1204b1` over 37,026 values at the overview,
  after a box hover, a row hover, the `compile_mesh_inputs` pipeline, a link
  selection, a plate-ribbon selection, in Plan, in each of the 7 package
  scopes and at a 0.45× zoom.
- Module scope `device.py`: the hash without the lines touching `device`
  (`3fb202ce`) equals the overview's; the same for `_compiler` (`3dba4b7a`).
  Folding back restores `c1204b1`.
- Each link end keeps its gutter riser and lane offset whatever is unfolded:
  a member call of an unfolded module reuses its link's riser, so unfolding
  never shifts a neighbour's lines.
- `prepare.py` writes byte-identical `view.json` files on two runs.

## Metrics

At 1,280 × 800, measured by `atlasProto.census()`: marks are drawn objects with
alpha at least 0.1 inside the free picture area (plates, boxes or panes, rows,
bands and ghost rows, signal ticks on hidden rows, class blocks and their rows,
cards, lines: every call strand, link, ribbon, texture curve, clone chord and
import). Labels are text drawn on the label canvas there; "smallest" is the
font size in CSS px. The integrated prototype was measured with the same
counter on a copy (`/tmp/strata-baseline/`), before any change.

| View | Marks before | Marks after | Labels before | Labels after | Smallest label (px) before → after | Labels under 8 px before → after | Cut labels before → after |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Overview, Axonometric | 651 (242 cards, 17 blocks, 56 block rows, 288 lines) | **113** (40 boxes, 37 bands, 17 ticks, 11 lines) | 33 | 48 | 8.5 → 8.5 | 0 → 0 | 7 → 3 |
| Plan | 455 | 168 (66 lines, 55 of them imports) | 26 | 47 | 8.5 → 8.5 | 0 → 0 | 6 → 0 |
| Package `electrostatics` | 199 (49 cards, 102 lines) | **76** (9 boxes, 14 rows, 44 lines) | 68 | 39 | 7 → 7.6 | 55 → 14 | 52 → 0 |
| Package `mesh` | 192 (60 unnamed cards, 103 lines) | **98** (13 boxes, 17 rows, 54 lines) | 16 | 69 | 7.5 → 7.5 | 4 → 53 | 4 → 0 |
| Module `device.py` | 40 | 87 (5 neighbour boxes with rows, 47 lines) | 25 | 56 | 7 → 7 | 18 → 28 | 9 → 5 |
| Pipeline `compile_mesh_inputs` | 149 | **46** | 15 | 21 (7 row callouts) | 8.5 → 8.5 | 0 → 0 | 1 → 0 |
| Hover `device` (overview) | 651 | 122 | 33 | 48 | 8.5 → 8.5 | 0 → 0 | 7 → 3 |

- `mesh` now names all 17 public functions and classes and its 5 ghost rows;
  the integrated view drew 60 cards without names, so its 16 labels were only
  module names and port labels. The cost is size: 53 of the 69 labels sit at
  7.5 px, the floor; 13 modules share about 980 px.
- `device.py` carries more labels than before because its neighbours stay boxes
  with named rows (the calls land on them); its own cards wrap into 2 or 3
  lines at 7 px; 5 names are cut, mostly rows of the `Device` block.
- Overview draw calls fall from 1,020 to 544; visible line objects from 491 to
  114.
- Placement (Python's ground metrics, same 76 calls, same four rows, flow
  share 1.0): ground length 1,207 → 855, ground crossings 116 → 53, footprint
  68 × 48 → 54 × 39, in-plate arc crossings 10 → 10.

## Evidence

All screens are 1,280 × 800 CSS px at pixel ratio 2. Before: the integrated
prototype's screens in `/tmp/atlas-shots/strata/` (`01-overview-axonometric`,
`04-scope-electrostatics`, `05-scope-mesh`, `06-scope-module-device`,
`07-pipeline-compile-mesh-inputs`, `08-hover-pane-device`).

Overview: boxes on plates, package ribbons, clone chords between the
electrostatics tails, teal ticks, ghost rows in `_plan`:

![Overview](/tmp/atlas-shots/surface/01-overview-axo.png)

Plan (imports foregrounded):

![Plan](/tmp/atlas-shots/surface/02-plan.png)

Package scope `electrostatics`: six entry rows in `updates` wrapped whole,
class rows `ThomasFermiSolver`, `Potential`, `Device`, sealed boxes,
lane tracks, stubs `→ mesh · meshing · tempura·2`, `← layout`, `→ strain`:

![Electrostatics](/tmp/atlas-shots/surface/03-scope-electrostatics.png)

Package scope `mesh`: 13 boxes, every public name whole in three lines at
most, ghost rows in `_plan`, `_built`, `_canonical`:

![Mesh](/tmp/atlas-shots/surface/04-scope-mesh.png)

Module scope `device.py` unfolded in context (cards on depth floors, the
`Device` block, margin arcs, calls leaving through the right gutter;
`height_fields` and the left neighbours stay boxes):

![device.py](/tmp/atlas-shots/surface/05-module-device-unfolded.png)

Pipeline `compile_mesh_inputs`: lit boxes, lit rows and tails, callouts naming
the lit public functions under their boxes; then with pulses:

![Pipeline](/tmp/atlas-shots/surface/06-pipeline-compile-mesh-inputs.png)
![Pulses](/tmp/atlas-shots/surface/06a-pipeline-pulses.png)

Hover `device` at the overview: its 9 links in 6 module pairs light (a lane
track to `height_fields`, a row track to `strain/materials.py`, arcs to `mesh`,
`meshing` and `tempura·2`, the arc from `layout`):

![Hover](/tmp/atlas-shots/surface/07-hover-box-device.png)

Unfolding `device.py` in place, slowed to 2 s, at 2, 30, 60 and 100 %:

![Filmstrip](/tmp/atlas-shots/surface/08-filmstrip-unfold-device.png)

Package scope `layout` (more band in `layout_pipeline` and `extraction`, clone
underlines on `read_gds_layout` and `read_oas_layout`) and the overview after a
reader's zoom (rows appear by size):

![Layout](/tmp/atlas-shots/surface/09-scope-layout.png)
![Zoomed overview](/tmp/atlas-shots/surface/10-overview-zoomed-rows.png)

## Rejected options

- **Rows for roots only** (the strict "entry surface"). Tempura has 13 `mesh`
  modules and 6 roots among them; nearly every call between modules would land
  on a tail and `_lattice` or `_refinement` would show no surface. Rows are
  public names; roots are bold.
- **Box width = the integrated pane width** (unfold without changing width).
  Panes are 2.2 to 7 units wide; `mesh` stays 58 units across and rows drop to
  about 6 px.
- **One-line names, cut to the box.** At the first fit 15 of 33 `mesh` row
  labels were cut at 7.5 px. Wrapping at underscores and capitals with a
  per-package line length keeps every name whole.
- **Unfolded pane wider than its box, lifted forward** like an opened class
  block. It covers its neighbours' ports, exactly where its calls land.
- **Internals in a drawer under the plate.** The frame then spans box, column
  and drawer and the cards shrink; the box would also keep its rows next to
  the cards that replace them.
- **Boxes standing on the plate** (a skyline). It removes the glass columns
  but staggers the headers, sends the lanes above the tallest box of the row
  and makes risers from short boxes several units long.
- **Module-pair ribbons at the overview** (43 lines in the integrated
  prototype). The overview's question is about packages; module pairs appear
  on hover and in a scope.
- **Camera elevation 0.66 or 1.0 rad.** At 0.66 package names sit among the
  next row's boxes; at 1.0 box faces, where the signals are, flatten. 0.82
  stays.
- **In-plate order measured with box widths.** A wider `updates` box moved
  `device.py` to the front of `electrostatics` (its row track then crossed the
  whole plate). The order now measures span in uniform slots, so box widths
  never reorder a plate.
- **Clone chords inside one module.** The row's violet underline says it; a
  chord inside a box is noise.

## Limitations

- **Wide packages sit at the type floor.** `mesh` reads at 7.5 px (53 of 69
  labels); the frame is width-bound and the line length assumes about 150
  characters across a 980 px frame, a screen assumption baked into Python.
- **Unfolded panes are narrow** (the box width, 2.3 to 3.2 units): card names
  wrap into 2 or 3 lines at 7 px and class-block rows read at about 7 px. A
  module with many internals is a tall column (`device.py` 11.3 units).
- **The ground sits under the tallest box,** so most boxes stand on several
  units of glass column; in the Axonometric a back row's package name can sit
  close to the next row's boxes. An unfolded pane drops through the ground;
  only the Elevation (with its section cut) shows it whole.
- **The pipeline view is width-bound with the inspector open:** row names come
  as callouts; lit tails say "internals" without naming them (the inspector
  does).
- **The split package `tempura`** (slices in rows 0 and 3) reads small in its
  raised Elevation; unchanged from the integrated prototype.
- **Plan** draws 168 marks: it is the imports view and shows all 55 imports.
- **Prototype tooling:** three.js from a CDN; `?size=1280x800`; frame time not
  measured.

## Data Python must additionally emit

On top of `strata.md`'s list (`prepare.py` already emits all of it in
`view.json`):

- **Per pane, `box`:** x, w, h, d, `open_h`, `card_w`, `dead_top`; `rows`
  (slot, kind `fn | class`, id, name, `lines`, y, h, root, lb, clone,
  wrapper, data_only); `more` (slot, y, h, lines, lb, clone, names); `tail`
  (slot, y, h, count, lb, clone); `ghosts` (slot, id, name, lines, y, h).
- **Per node:** `slot` (the row, `more`, `tail` or ghost it folds into);
  `lines` when its card name wraps; x, y, z, w, h are now positions in the
  unfolded pane.
- **Per class:** `slot`; position and size in the unfolded pane; expanded size.
- **Per edge:** `ss` and `ts`, the folded slots of caller and callee.
- **`links`:** bundle, s, t, ss, ts, span, count, members; `bundles[*].links`
  in slot order. 64 links for 43 module pairs.
- **`floors`:** top (0) and ground; **`dims`:** module header, row, extra line,
  depth, gutter, arc margin, row cap.
- **Placement changes:** a module's slot width is its box width plus two
  gutters; the in-plate order measures span in uniform 3-unit slots; rows are
  13 units apart; the row budget factor is 1.2 (it keeps the integrated four
  rows).
- **Rule constants:** `ROW_CAP` 6, `GHOST_CAP` 3, `WRAP_LINES` 3, `WRAP_SHORT`
  10, `FRAME_CHARS` 150, line length 11 to 18, box width 2.3 to 3.2. The frame
  width behind `FRAME_CHARS` should become a parameter of the explorer, not a
  Python constant.
- Optionally the gutter riser order and lane offsets per link, now pure
  functions in `routing.js`.

## How to run

```text
pixi run python -B prototypes/strata-surface/prepare.py      # writes view.json (byte-identical across runs)
pixi run python -B -m http.server 8784 --directory prototypes/strata-surface --bind 127.0.0.1
# http://127.0.0.1:8784/                  the explorer
# http://127.0.0.1:8784/?size=1280x800    fixed 1280x800 frame, pixel ratio 2 (screenshots)
```

`window.atlasProto` drives the page: `setScope`, `select`, `fitSelection`,
`unfold`, `expand`, `goView`, `hover`, `hoverBox`, `hoverLine`, `orbit`,
`zoomTo`, `zoom`, `settle`, `at`, `shoot`, `unfoldFilmstrip`, and the checks
`census()`, `labels()`, `geomSignature(skipModule)` and `drawn()`. Screenshots
post to `/tmp/atlas-shots/receiver-surface.py` on port 8785.
