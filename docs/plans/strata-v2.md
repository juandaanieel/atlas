# Strata v2: module boxes, three tiers and a reading path

> Status: Prototype (2026-10-10). Runs on tempura (snapshot version 7) at
> `prototypes/strata/`. The previous main prototype is kept unchanged at
> `prototypes/strata-v1/` for comparison. This prototype merges three tracks
> that each answered the owner's "the information is still quite difficult to
> digest": module boxes and levels (`strata-surface.md`), visual hierarchy
> (`strata-hierarchy.md`) and the reading path (`strata-guide.md`), on the
> placement and routing of `strata.md`. Nothing under `src/`, `tests/`,
> `schema/` or `README.md` changed, and no other prototype or plan changed.

## Answer in brief

- **One prepare.py, one routing.js, one app.js, one style.css.** Python builds
  placement B, every module box, the links, the unfolded panes, a type
  calibration and the guide steps; `view.json` is byte-identical across runs.
  `routing.js` is the surface track's, unchanged.
- **The explorer opens on chapter 1** of the snapshot's story: 8 named packages,
  their ribbons, the modules as dark silhouettes, the chapter's evidence in a
  pill. 110 marks and 9 labels, against 651 marks and 33 labels on v1's
  opening view.
- **Each level answers one question at three contrast tiers.** Overview,
  Plan and both package scopes measure 3 luminance tiers (v1: 5 to 6).
- **Every label is at least 9 px** in every view measured (v1: down to 7 px).
  Every public row and ghost row reads whole in 6 of 7 package scopes (82 of 87
  names); the exception is the back slice of the split root package.
- **Nothing moves but the camera, an unfold and an opened class.** One geometry
  hash, `34f850ec` over 38,436 line and box values, holds in 31 checks:
  overview, Plan, Elevation, a reader's zoom, hover, pipeline, ribbon
  selection, all 7 package scopes, the module scope and the opened class (with
  the unfolded module left out), every guide step, and after folding back.

## The integrated design

### Levels and their questions

| Level | Question | Tier 1 | Tier 2 | Tier 3 |
| --- | --- | --- | --- | --- |
| Overview (Axonometric) | What depends on what, and where are the defects? | Plates, package names, signal marks | Package-pair ribbons | Module boxes as silhouettes (rows hidden), glass columns |
| Plan | Which module imports which? | Plates, package names | Imports, module names (9 px) | Boxes, package ribbons |
| Package scope (Elevation) | What is this package's public surface, and how do its modules depend on each other? | Boxes, their public rows, module names | Module-pair tracks, stubs, port labels | Plate, package name |
| Module scope | How does it work inside? | The unfolded module's cards and class blocks | Its calls (margin arcs, member calls) | Neighbour boxes (rows drawn, names off) |

A selection or hover adds the emphasis colour (`#f5f8fc`) above every tier and
dims the rest. The three hues (teal load-bearing, violet clone, red import
cycle) are tier 1 in every view.

### The box rule

A module is one box in the class block's family (`strata-surface.md`): a header,
one row per public name in source order (at most 6, the rest as hairlines), a
hatched tail for the private internals, a dashed ghost row for each dead
function, which never folds. Signals ride on the row, band or tail that holds
them. Calls enter a box on the left at the row they land on and leave on the
right. Unfolding grows the box down to Python's open height and replaces its
rows with cards on the module's own call-depth floors; it is the only
structural change.

Python sizes each box so that its names read at 9 px or more (see Conflicts):
rows wrap at underscores and capitals at a line length chosen per package, the
box is as wide as its longest row line at that package's scope scale and as its
widest card line at module-scope scale, and the line pitch follows the package's
scale. Boxes are 2.0 to 3.76 units wide; 56 of 82 rows wrap, 17 into three lines.

### Tiers, type and label budget

Neutral line tokens on the canvas `#0b1016` (`strata-hierarchy.md`): `strong`
`#a9b4c0` (9.1:1, tier 1), `link` `#7b8797` (5.2:1, tier 2), `edge` `#3e4a57`
and `rule` `#26313d` (2.1:1 and 1.4:1, tier 3). A box takes one of three styles
(`BOX_TIER` in `app.js`: outline, header fill, row rules, hatch and glass
strength); `STYLE` holds the view's tokens for plates, links, calls, ribbons,
imports, cards and blocks. The ground is the canvas colour; there is no grid and
no vignette.

One family (the `--mono` stack) at three sizes: L 12 px names the view's unit,
M 10 px names what is inside it, S 9 px for captions, port labels and wrapped
rows that do not fit at 10. Nothing is drawn below 9 px. A row or ghost row is
drawn whole or not at all; a lit row that cannot be named gets a pill under its
box. Class rows and fields inside a block may be cut to 7 characters or more.

| View | Labels drawn |
| --- | --- |
| Overview | Package names (L); the hovered module (M) and its partners or a selection's modules (M) |
| Plan | Package names (L), module names (S) |
| Package scope | Module names (L) in a header row above the track band, public rows and ghost rows (M or S), port labels (S) |
| Module scope | The module's name (L), cards and class rows (M or S), neighbours' names (M), port labels (S) |
| Guide step | The step's modules (L, muted), its lit rows and cards (M), evidence in a pill (M), stubs it lights (S) |

The key is an overlay (Key, or k) that lists only the marks the current view
draws: 15 entries at the overview, 23 at a package scope.

### Reading path

The landing view is step 1. Python reads `atlas-story.json`, validates it with
`atlas.story.load_story` and writes 14 steps: the story's chapters 1 to 4, a
tour of 6 pipelines (one per package no chapter walked), chapter 5, then three
review stops (dead band, clone chords, load-bearing hubs). Each step is fully
resolved state: scope, lit functions and calls with depth, trace, open class,
frame, camera rule (`map`, `face`, `raised`), the marks its panel lists, and two
v2 fields:

- `unfold`: the modules whose inside the step talks about. A module unfolds when
  the step opens one of its classes, when the lit set stays inside it and reaches
  its folded internals, or when a module chapter lights nothing. Chapter 2
  unfolds `_compiler.py`, chapter 4 `_quantum_petsc.py` (and opens
  `_QuantumPetscTransfer`), tour stop 6 `_finalized_device.py`. Every other step
  shows boxes: a chapter about a package shows silhouettes, a pipeline shows lit
  rows, lit tails and lit tracks.
- `focus`: the modules the step touches. What the text names is tier 1 (lit,
  emphasis colour), focus modules are tier 2 (box outline `link`, names muted),
  the rest tier 3 at 40 % (16 % outside the scope).

A story scope on a module becomes a module scope only when that module unfolds;
chapter 5's dead function is a ghost row on the folded `_plan.py` box, so the
step scopes `mesh` and lights that row. Next and previous fly the camera over
360 ms; a guide frame never zooms past 64 px per unit. A click on anything
leaves the path where the camera stands; Esc or Map flies to the whole map;
"Resume guide" (or g) returns to the step. `#guide=<step-id>` links a step; an
empty hash lands on step 1.

### Routing and flow rule

Unchanged from `strata.md` and the surface track: placement B (package plates by
dependency level, callers' rows at the back, modules callers-first), one lane
per module pair above the boxes, row tracks through side ports, arcs overhead
between rows with per-plate sky bases, imports dashed on the ground, labelled
stubs for calls leaving the scope. Every call follows the reading order: left
to right in a row, back to front between rows (flow share 1.0, 76 calls).

### What never moves

- Hover and selection change colour, width and alpha only. Hovering a lit row
  and a focus box at each of the 14 steps leaves the world signature and the
  camera unchanged.
- The camera moves only on a scope change, a view preset, a pipeline fit, a
  guide step, Map or Resume, and the reader's own orbit, pan and zoom. A click on
  a lit row during chapter 3 leaves the path and selects the row at the same
  camera.
- Wavefront and pulses run only for an explicit pipeline: one picked from the
  pipeline list, the p key, or a guide step that walks one. They stop after
  3 passes or 4 s.
- An idle scene draws nothing: 0 frames in 2 s on the landing, and 0 in 2 s
  after a pulsed step finished.

## Metrics

At 1,280 × 800 CSS px. Marks and labels use the surface track's `census()`:
marks are drawn objects with alpha at least 0.1 in the picture area (plates,
boxes, rows, bands, signal ticks, cards, class blocks, lines), labels are text
on the label canvas there. Luminance tiers use the hierarchy track's method on
the surface marks (`audit()`): neutral line marks clustered by effective CIE L*,
a new tier wherever a value lies 5 L* or more above the start of the current
one. The v1 numbers are the ones `strata-surface.md` (marks, labels, smallest,
cut) and `strata-hierarchy.md` (tiers) measured on the unmodified prototype;
"n/m" means that document did not measure the view.

| View | Marks v1 → v2 | Labels v1 → v2 | Smallest label (px) v1 → v2 | Cut labels v1 → v2 | Luminance tiers v1 → v2 |
| --- | --- | --- | --- | --- | --- |
| 01 Landing (v1 opened on the overview) | 651 → **110** | 33 → **9** | 8.5 → **10** | 7 → 0 | 6 → 4 |
| 02 Overview (Map) | 651 → **113** | 33 → **8** | 8.5 → **12** | 7 → 0 | 6 → **3** |
| 03 Plan | 455 → 168 | 26 → 48 | 8.5 → **9** | 6 → 0 | 5 → **3** |
| 04 Package `electrostatics` | 199 → **76** | 68 → 47 | 7 → **9** | 52 → 0 | 6 → **3** |
| 05 Package `mesh` | 192 → **98** | 16 → 72 | 7.5 → **9** | 4 → 0 | n/m → **3** |
| 06 Module `device.py` | 40 → 74 | 25 → 33 | 7 → **9** | 9 → 2 | 6 → 5 |
| 07 Pipeline `compile_mesh_inputs` | 149 → **46** | 15 → 15 | 8.5 → **10** | 1 → 0 | 4 → 6 |
| 08 Hover `device` | 651 → **122** | 33 → 15 | 8.5 → **10** | 7 → 0 | 6 → 5 |
| 09 Ribbon click | n/m → 100 | n/m → 10 | n/m → 10 | n/m → 0 | n/m → 6 |
| 10 Class `Device` opened | n/m → 68 | n/m → 47 | n/m → 9 | n/m → 13 | n/m → 4 |
| 11 Chapter 3 | n/m → 19 | n/m → 15 | n/m → 10 | n/m → 0 | n/m → 5 |
| 12 Tour stop 1 | n/m → 43 | n/m → 27 | n/m → 9 | n/m → 0 | n/m → 5 |
| 13 Review: dead band | n/m → 32 | n/m → 31 | n/m → 9 | n/m → 0 | n/m → 5 |

- The 9 to 12 px minimum holds in every view and every guide step; the only cut
  labels are class rows and fields inside a class block (the 2 in `device.py`
  are `Device.__init__(…)` and `finalized_geometry`).
- Plan and `mesh` draw more labels than v1 because they name what v1 left
  unnamed: Plan names all 40 modules at 9 px; `mesh` names its 13 modules and all
  17 public rows and 5 ghost rows (v1 drew 60 unnamed cards).
- Tier counts above 3 come from selection and hover, which add the emphasis
  cluster (L* 97) and a dimmed cluster, and from the module scope, where margin
  arcs at 75 % alpha form their own cluster (L* 44). The hierarchy track's own
  selection views measured 4 to 5.
- Guide steps (marks, labels, smallest px, tiers): 1 Package map 110, 9, 10, 4;
  2 Entry surface 31, 24, 10, 4; 3 Static call path 19, 15, 10, 5; 4 State and
  collaboration 23, 34, 9, 4; tour stops 43/16/44/30/65/22 marks; 5 Review
  pressure 14, 13, 9, 5; dead band 32, 31, 9, 5; clone chords 93, 13, 10, 6;
  load-bearing hubs 124, 25, 9, 6. The guide track on v1 geometry, with its own
  counter, measured 57 marks on the landing and 162 on the hub stop.
- Every package scope, rows named whole: electrostatics 14/14, layout 19/19,
  mesh 22/22, meshing 1/1, plotting 7/7, strain 11/11, tempura 8/13.
- Placement (Python, same 76 calls): footprint 68 × 48 (v1) → 54 × 39 (surface)
  → 63.5 × 39; ground length 1,207 → 855 → 923; ground crossings 116 → 53 → 88.
  Wider boxes cost footprint and crossings against the surface track.
- Overview draw calls 543, visible line objects 114. A guide step applies in 2
  to 8 ms of script and settles 449 to 500 ms after the key press (360 ms flight;
  the guide track measured 371 to 389 ms; the T3 preview tab ran hidden on a
  coarse timer, so these are upper bounds). `view.json` is 468 kB, 46 kB of it
  the guide.

## Evidence

All screens are 1,280 × 800 CSS px at pixel ratio 2, from the prototype's
compositor, in `/tmp/atlas-shots/strata-v2/`:

- `/tmp/atlas-shots/strata-v2/01-landing-guide-chapter1.png`: the package map,
  silhouettes, package ribbons, the evidence pill on `_compiler.py`'s outlined row.
- `/tmp/atlas-shots/strata-v2/02-overview-map-esc-from-guide.png`: Esc from the
  guide; the overview at three tiers. With the key overlay:
  `/tmp/atlas-shots/strata-v2/02b-overview-map-key.png`.
- `/tmp/atlas-shots/strata-v2/03-plan.png`: imports foregrounded, module names
  at 9 px.
- `/tmp/atlas-shots/strata-v2/04-scope-electrostatics.png`: 9 boxes, 14 public
  rows whole, header row of module names, lane tracks, labelled stubs.
- `/tmp/atlas-shots/strata-v2/05-scope-mesh.png`: 13 boxes, 17 public rows and
  5 ghost rows whole at 9 px.
- `/tmp/atlas-shots/strata-v2/06-module-device-unfolded.png`: `device.py`
  unfolded in context, every card named, neighbours at tier 3.
- `/tmp/atlas-shots/strata-v2/07-pipeline-compile-mesh-inputs.png` and
  `/tmp/atlas-shots/strata-v2/07a-pipeline-compile-mesh-inputs-pulses.png`:
  the pipeline picked from the list, static and with pulses.
- `/tmp/atlas-shots/strata-v2/08-hover-box-device.png`: hover on `device`; its
  links light, its partners are named.
- `/tmp/atlas-shots/strata-v2/09-ribbon-click-electrostatics-strain.png`: the
  package pair's two calls, `Device → normalize_reference_material`.
- `/tmp/atlas-shots/strata-v2/10-class-device-open.png`: `Device` opened inside
  the unfolded module (private rows, state column, intra-class loops).
- `/tmp/atlas-shots/strata-v2/11-guide-chapter3-static-call-path.png`: lit rows
  and tracks in four strain boxes, the trace brightest, the evidence pill on the
  `_material_catalog.py` tail.
- `/tmp/atlas-shots/strata-v2/12-tour-stop1-compile-mesh-inputs.png` and
  `/tmp/atlas-shots/strata-v2/12b-tour-stop4-device-finalize.png` (home-row
  framing with the `→ tempura·2` stub).
- `/tmp/atlas-shots/strata-v2/13-review-stop-dead-band.png` and
  `/tmp/atlas-shots/strata-v2/13b-review-stop-clone-chords.png`.
- `/tmp/atlas-shots/strata-v2/14-filmstrip-overview-to-electrostatics.png`: the
  scope transition slowed to 3 s, at 0, 20, 50 and 100 %.

## Conflicts resolved

1. **Every name whole (surface) against a 9 px floor (hierarchy).** The surface
   track's boxes put `mesh` rows at 7.5 px and its wrapped lines 0.30 units
   apart, about 7 px at `mesh`'s scope scale. Both behaviours are kept by moving
   the type floor into Python: per package, `calibrate_type` picks the longest
   line length whose boxes, each as wide as its longest line at the scope's
   scale, fit the scope frame (`FRAME_PX` 880 px) within 3.8 units; the line
   pitch follows the same scale. The scope frame depends on the placement (stub
   streets, split packages), so `main` calibrates, places, measures each
   package's frame (`scope_extra`) and recalibrates until the frames hold still.
   Cost: wider and taller boxes (footprint and crossings above).
2. **Unfolded panes too narrow for 9 px.** The surface track's cards wrapped at
   7 px. A box is now also as wide as its widest card line (13 characters at
   0.135 units each, 9 px at the height-bound module scope of the tallest panes).
3. **Module names.** The surface track printed 40 module names at 8.5 px on the
   overview; the hierarchy budget names packages only and shows module names on
   hover and selection. v2 follows the budget. In a package scope the names
   (12 px) do not fit 2 to 3.8-unit headers, so they stand in the hierarchy
   track's header row above the track band; when a guide frame cuts that row off,
   a name stands just above its box.
4. **Tier tables written for panes and cards.** The hierarchy track styled
   panes, cards and module-pair ribbons; the surface overview has boxes and
   package-pair ribbons only. v2 maps the tiers onto the surface marks (boxes
   tier 3 at the overview, tier 1 in a scope, tier 2 for a guide step's modules;
   package ribbons tier 2) and drops the hierarchy track's far zoom, which the
   surface overview already is.
5. **Guide tiers by alpha, hierarchy tiers by colour.** The guide track dimmed
   focus and context modules by alpha only. v2 gives focus modules the tier-2 box
   style and context modules the tier-3 style at 40 %; lit marks take the
   emphasis colour.
6. **Story scope on a module against "module scope means unfolded".** Resolved
   by the `unfold` rule in Python (Reading path); chapter 5 stays folded.
7. **Pulses on any click.** v1 and the surface track ran wavefront and pulses
   for any selected function. The brief allows pulses only on explicit pipeline
   selection, so a click on a row now lights its reach at once, without motion.
8. **Layout.** The guide track's shared 300 px left panel and bottom rail
   replace the bottom key of the other tracks, so leaving the path never shifts
   the picture; the hierarchy track's per-view key is the overlay's content.
9. **Behaviours not kept:** the guide track's "ground" and "dead" captions (the
   surface geometry has no basement; ghost rows carry the names), the guide
   track's landing panes at 40 % (silhouette boxes instead), the surface
   track's overview module names (budget), and wrapped names spaced at the world
   pitch at high zoom (lines keep a type-sized spacing; guide frames are capped
   at 64 px per unit).

## Deferred

- **The split root package.** `tempura`'s slices stand 3 rows apart; its raised
  Elevation shows the back slice at about 23 px per unit under perspective, and 5
  of its 13 row names do not fit at 9 px. A scope that frames each slice face-on
  would fix it.
- **Screen assumptions in Python.** `FRAME_PX`, `SCALE_CAP`, `CARD_CHAR_U` and
  the 9 px floor's character width describe a 1,280 × 800 frame with a 300 px
  panel. The explorer should pass its frame to the layout step.
- **The pipeline view with the inspector open** is width-bound at about 13 px per
  unit; its row names come as pills. The tour's stop 1 shows the same pipeline
  without the inspector.
- **Transitions** show the target view's labels from the first frame (labels
  follow state, not the animation).
- **Lanes, riser order, rim ports and sky bases** are still computed in
  `routing.js` from Python's positions; they can move to Python with the layout.
- **Story schema.** The extensions proposed in `strata-guide.md` (camera,
  frame, signal, ribbons, level, tour chapter, chapter steps, neutral bodies)
  stay documentation only; v2 adds one more candidate, `view.unfold` (modules to
  show from the inside), today a Python rule. Chapter bodies are still the
  story's text written for the previous explorer.
- **Prototype tooling:** three.js from a CDN, `?size=1280x800`, frame time not
  measured, hidden preview tab.

## Data the explorer needs from Python

Phase 2 moves `prepare.py` into `src/atlas/analyzer/layout.py` (and `build_guide`
next to `story_for_snapshot`). It reads the snapshot-7 facts `model.layout`
(`columns`, `bundles`, `imports`, `import_cycles`, `nodes[*].row`,
`classes[*].row`, `dead_row`), `model.edges[*].kind` and `.back`,
`model.nodes`, `model.clones`, `model.wrappers`, `model.tree`,
`snapshot.objects`, `snapshot.symbols`, `snapshot.files`,
`architecture.pipelines` and `architecture.functions[*].role`, plus the story
validated by `atlas.story.load_story`. It must emit:

- **Placement:** rule text, flow (`reading`), rows (z, modules), plate order,
  corridor sizes (row gap 13, plate back 1.3 and front 2.6, street 1.6, pane gap
  0.1), module-graph pairs dropped to break cycles; module slots of box width
  plus two gutters; in-plate order measured in uniform 3-unit slots; row budget
  factor 1.2. Placement metrics.
- **Type calibration** (v2): per package `line` (characters), `char_u` (units
  per character), `scale_px`, `pitch`, `frame_extra` and the `split` set, from
  the two-pass calibrate, place, measure loop; constants `FRAME_PX`,
  `TYPE_FLOOR`, `CHAR_EM`, `LINE_ROOM`, `SCALE_CAP`, `SCALE_CAP_SPLIT`,
  `STUB_STREET`, `LINE_MIN`/`LINE_MAX`, `MOD_W_MIN`/`MOD_W_MAX`, `CARD_LINE`,
  `CARD_CHAR_U`.
- **`floors`** (top 0, ground) and **`dims`** (card, block and plate sizes,
  module header, row, wrapper and ghost paddings, minimum pitch, tail, depth,
  gutter, arc margin, row cap, type floor).
- **`districts`** (package, name, modules, plates, rows, centre), **`plates`**
  (unit, package, name, row, x, z, w, modules, centre, front and back edge, ports
  front/back/left/right with x, z, out, in), **`tree`** (package, parent,
  `slice`, has_modules).
- **`panes`**: module, name, district, plate, row, level, x, z, w, top, bottom,
  counts (functions, dead, clones, load-bearing, classes), and **`box`**: x, w,
  h, d, `open_h`, `line` (pitch), `card_w`, `dead_top`, `rows` (slot, kind
  `fn | class`, id, name, `lines`, y, h, root, lb, clone, wrapper, data_only),
  `more` (slot, y, h, lines, lb, clone, names), `tail` (slot, y, h, count, lb,
  clone), `ghosts` (slot, id, name, lines, y, h).
- **`nodes`**: flags and ranks (root, dead, lb, hub, orch, wrapper, clone,
  private, fan-in/out, unresolved, cls, params), `slot`, card position in the
  unfolded pane (x, y, z, w, h) and `lines` when the card name wraps.
  **`classes`**: public, private, dead_private, fields, access, data_only,
  `slot`, block position and size, expanded size and lift.
- **`edges`**: s, t, kind, back, span (`pane | plate | row | cross_row`), ms,
  mt, `ss` and `ts` (folded slots), dead, cls, against.
- **`bundles`** (s, t, count, span, us, ut, against, members, `links` in slot
  order), **`links`** (bundle, s, t, ss, ts, span, count, members),
  **`plate_bundles`** (s, t, span, count, bundles, against), **`imports`** (s,
  t, cycle, call, span).
- **`clones`**, **`reach`** (uncapped BFS depth per node), **`callers`**,
  **`pipelines`** (root, title, listed, reach), **`summary`**.
- **`guide`**: title, summary, snapshot_id, rule (text), chapters (count), and
  `steps[]` with id, part (`chapter | tour | review`), label, title, body,
  evidence, scope, lod, cross_file, selected, lit (`[id, depth]`), lit_edges
  (`[edge index, depth]`), lit_classes, trace, trace_edges, open, pulses,
  signal, frame (nodes, classes, modules), camera, home_row, list (module, name,
  ids), and the v2 fields `unfold`, `focus` and `marks` in the surface
  vocabulary (plate, box, plate_ribbon, row, tail, card, margin_arc,
  link_track, link_row, link_arc, into_class, constructs, intra, class_open,
  fields, trace, pulse, lit, stub, evidence, dead, clone, hub, load_bearing).
- Optionally the lane colouring, gutter riser order, link offsets and sky bases
  that `routing.js` computes today.

## How to run

```text
pixi run python -B prototypes/strata/prepare.py [atlas.json] [atlas-story.json]   # writes view.json, byte-identical across runs
pixi run python -B -m http.server 8778 --directory prototypes/strata --bind 127.0.0.1
# http://127.0.0.1:8778/                         lands on step 1 of the guide
# http://127.0.0.1:8778/#guide=static-call-path  a step
# http://127.0.0.1:8778/#map                     free exploration, whole map
# http://127.0.0.1:8778/?size=1280x800           fixed frame, pixel ratio 2 (screenshots)
pixi run python -B /tmp/atlas-shots/receiver-v2.py   # port 8779, writes /tmp/atlas-shots/strata-v2/
```

Keys: ← → step, Esc whole map, g resume, k key, 1 2 3 views, u unfold, e open a
class, p replay pulses. `window.atlasProto` drives the page (`guide`, `next`,
`leave`, `resume`, `toMap`, `setScope`, `select`, `unfold`, `expand`, `goView`,
`hoverBox`, `hover`, `filmstrip`, `shoot`) and checks it (`census`, `audit`,
`labels`, `geomSignature(skip)`, `worldSignature`, `camKey`, `timings`,
`renders`). `views.js` sets up each measured view:
`const v = await import('./views.js'); v.V.mesh(); v.measure();`.
