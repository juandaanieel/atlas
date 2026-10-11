# Strata inspector: the source beside the picture, an inert guide, pills for off-row calls

> Status: Prototype (2026-10-11). Runs on tempura (snapshot version 8, story
> version 2) at `prototypes/strata-inspector/`, a copy of `prototypes/strata/`
> (see `strata-v2.md`). Nothing under `src/`, `tests/`, `schema/` or
> `README.md` changed, and no other prototype changed. This is the inspector
> track of the fourth Strata iteration; the Python track (story, exports, focus
> file), the lines track (`prototypes/strata-lines/`) and the theme track
> (`prototypes/strata-theme/`) are siblings.

## Problem

The owner on Strata v2, four requests:

1. "Remove the `pipelines` side of the bar."
2. "We need a side bar on the right side that is able to show the code of the
   selected function, when hovering the mouse over some internal functions,
   the connections should highlight."
3. "Clicking somewhere while in the tour takes you somewhere totally random and
   useless."
4. "`Device.finalize()` shows a bunch of transparent lines that guide nowhere."

v2 had a right-hand inspector, but it listed callees and callers as names and
never showed code, and it was hidden on the reading path. On the path, a click
on anything left the guide and selected or scoped what it hit. Measuring that
click showed a second cause for "random": in every face-on step the camera's
near plane cuts away the rows in front (the section cut), but the ray picking
still hit those invisible boxes. Across the 13 steps, 3,933 of 7,361 sampled
pickable points (53 %) resolved to a box the reader could not see; in the
`prepare_layout` step it was 1,446 of 1,523. A click there left the guide and
scoped a package that was not on screen. The `Device.finalize` tour stop faced
the root's row and let its two calls into `tempura._region` rise as one sky
stub that faded out, labelled `→ tempura·2`, with pulses running out along it.

## Answer in brief

- **No pipeline list.** The left panel keeps the scope tree and the hints.
  Pipelines are reached through the guide (six pipeline chapters), by selecting
  a row (its reach lights in place) and through the inspector (every call site
  in the source opens its callee).
- **A source inspector on the right.** Header (name, module, line range,
  signal badges), then the source excerpt with Python syntax colours and line
  numbers, read-only, resizable (300 to 820 px, remembered in
  `localStorage`). Python classifies every call site and links it to a drawn
  call (`source.json`). Hovering a linked line lights that call and its callee
  and steps the rest of the lit set down one notch; hovering a card, row,
  class, box or track lights the lines that call it and scrolls them into
  view. Clicking a call site opens the callee; a back control returns. The
  class inspector keeps its public, private and state lists above the source.
- **Nothing moves.** Opening, hovering, resizing and closing the inspector
  leave the geometry hash, the world signature and the camera unchanged in
  87 of 87 checks over 13 guide steps and 4 free views.
- **The path is inert outside what it lights.** On a guide step only tier-1
  marks (the step's lit functions, classes and tracks and its evidence)
  respond: a click opens them in the inspector without leaving the path or
  moving the camera; tier-2 and tier-3 marks, ground and ribbons ignore hover
  and click, and the cursor is a pointer only over a clickable mark. 78 of 78
  sampled inert clicks left the frame pixel-identical; 38 of 38 lit clicks
  opened the inspector at the same camera. Picking now ignores what the
  section cut hides.
- **The stub rule is Python's.** A pipeline step whose reach leaves the root's
  row frames the whole reach from the raised Elevation when more than a
  quarter of it stands off the row; otherwise it faces the row and each call
  leaving the row ends in a pill at the card edge, `→ callee · package`. No
  line is drawn off the row.
- **Data refresh.** The copy now reads snapshot 8 and story version 2 (13
  steps: 4 chapters, 6 pipelines from the focus file, 3 signals). `prepare.py`
  consumes the story's kinds, levels, unfold lists and cameras and no longer
  adds a tour or review stops of its own.

## The inspector model

The inspector shows `state.inspect`, which is separate from the selection:

- **Off the path** the inspector shows the selection. A click on a row, card,
  class or track selects it (its reach lights in place, as in v2) and opens it.
  A selection made in the picture starts a fresh back stack; one made from the
  inspector (a call site, a caller, a method) pushes the previous target, and
  the back control (or Backspace) returns. Close (×, or Esc) clears the
  selection.
- **On the path** the inspector shows a lit mark the reader clicked, or a name
  clicked in the guide panel (evidence, the pipeline's function list). The
  step's lighting, scope, camera and selection stay Python's; the inspected
  mark takes the emphasis outline. A guide step starts with the inspector
  closed, so every step frames the full picture. Esc closes an open inspector
  first and leaves the path the second time.
- **Header.** Name (class-qualified), module, line range, badges: entry
  surface (snapshot 8's `exported`, with the exporting package), load-bearing
  hub or orchestrator, structural clone, wrapper, dead, folded into the
  internals. A class shows `class` or `data class` and its dead private count.
- **Body.** A function: docstring, the source, called by (links), static
  reach. A class: docstring, constructor and public methods, private methods,
  dead private methods, state (◆ owned, ◇ injected), constructed by, then the
  class's source with the call sites of all its methods. A track (link or
  package ribbon): its member calls, as in v2.
- **Source.** Line numbers, Python colours from a tokenizer ported from the 2D
  explorer (`source.js`). The colours stay away from the canvas hues: no teal,
  violet or red in the code. A long line wraps at its spaces and continues
  four columns in from its own indentation. The header line counts the sites:
  `18 linked · 10 not drawn`.
- **Width.** The left edge is a grip; the width is clamped to 300 to 820 px
  (and to leave 160 px of picture) and stored under
  `strata.inspector.width`. Labels and pills treat the panel as an obstacle.
  Resizing changes no camera and no mark.
- **Camera.** Selection, inspection, hover and resizing never move the camera,
  so the panel can cover marks on the right of the picture. A later fit (a
  scope change, a view preset, a reload with a selection in the hash) frames
  the picture beside the open panel. `05a` shows the class block half under
  the panel at the camera of the click; pressing Elevation (3) reframes it
  beside the panel (`05`).

## The source-to-edge linking rule

Python decides what every call site is (`prepare.py`, `build_source`, written to
`source.json`). For each drawn function and class it emits the excerpt and one
record per call in it, `[line, first column, end column, kind, edge, called
name]`:

| Kind | Meaning | In the source |
| --- | --- | --- |
| `edge` | the call record resolves to a call in `view.edges` (same source, same target) | underlined; hover lights it; click opens the callee |
| `external` | a call outside the package (builtins, numpy, ...) | muted marker, tooltip "external: outside the package, not drawn" |
| `unresolved` | a call with no static target (an attribute on a value) | muted marker, tooltip "unresolved: no static target, not drawn" |
| `recursive` | a resolved call of the function itself | muted marker, tooltip "recursive" |
| `undrawn` | a resolved call to a function that is not drawn | muted marker, tooltip "undrawn" (none on tempura) |

The column is the called name's last part on the record's line: the dotted
name followed by `(`, else its last part after any dot, else (a chained call
whose last link continues on a later line) the longest called prefix; equal
names on one line are taken left to right. All 2,950 sites of the 310 drawn
functions get a column.

The browser only wraps Python's ranges. The linking works both ways:

- **Source to picture.** Hovering a line lights the drawn calls of its linked
  sites (hovering one site lights only that one) and their callees. A call
  between two folded boxes is drawn by its link (one line per module and slot
  pair), so the link lights; with an end unfolded, the member call lights; a
  call inside a folded box has no line, so only the callee's slot (row or
  tail) lights; inside an unfolded module its margin arc lights. The callee's
  slot outline widens to 2.6 px and its name turns emphasis white; a lit class
  block (a constructor call) takes the emphasis outline; a pill whose call is
  hovered lights. Everything else that was lit steps down to the tier-2 line
  colour (`#7b8797`). Nothing else changes.
- **Picture to source.** Hovering a card, row or class lights the lines that
  call it; a box lights the lines that call into its module; a track lights
  the lines of its member calls. The first lit line scrolls to a third of the
  panel's height (the panel's own scroll, never the page). Hovering a lit
  function in the picture while something is lit also makes it and its lit
  calls the brightest marks, with the same one-notch step-down.
- **Click.** A linked site opens its callee in the inspector (a class for a
  constructor call). Off the path that is a selection, lit in place; on the
  path it changes the inspector only.

## The guide click rule

On a guide step, only what the step lights responds:

| Mark under the pointer | Tier | Hover | Click | Cursor |
| --- | --- | --- | --- | --- |
| A lit function (row, card, class row) or a cited evidence id | 1 | lights it and its lit calls | opens it in the inspector; path, camera, lighting stay | pointer |
| A lit class, or a lit track | 1 | as above | opens it in the inspector | pointer |
| A focus module's box, its other rows, its tail | 2 | nothing | nothing | default |
| Context boxes, plates, ribbons, ground | 3 | nothing | nothing | default |

A tail slot holds several functions, so it stays inert even when lit; its
functions open from the guide panel's list. The guide panel's evidence and
function names open in the inspector without leaving the path. The path is
left only by Esc (after closing an open inspector) or the Map control;
"Resume guide" (or g) returns to the step. On the path the view presets, the
breadcrumbs and the unfold and open-class keys are inert and drawn muted.
Picking ignores any hit in front of the camera's near plane or behind its far
plane, so the section cut's hidden rows can no longer be hit, on the path or
off it.

## The stub rule

Decided per step in `prepare.py` (`row_rule`, constant `STUB_SHARE = 1/4`), for
every pipeline step (a story chapter of kind `pipeline`, or any chapter that
walks a `pipeline_root`):

1. Let the root's row be the placement row of the root's module, and the
   off-row part the lit functions whose modules stand in other rows.
2. No off-row part: nothing to decide.
3. Off-row part more than a quarter of the reach: `stub = "frame"`. The step
   frames the whole reach; its rows differ, so the camera is the raised
   Elevation. Every call is drawn in full.
4. Otherwise: `stub = "pill"`. The step faces the root's row (Elevation with a
   section cut) and frames what stands in it. Every lit call with exactly one
   end on the row becomes a pill at that end, `→ callee · package` going out,
   `← caller · package` coming in; calls with both ends off the row are not
   drawn either (`off_edges`). No line, stub or pulse leaves the row.

The browser draws Python's pills. On a folded box a slot's pills hang under the
box, where the glass column is always empty, on a short tick down the box's
right edge (left edge for incoming calls); near the picture's edge a pill hangs
the other way from its tick; pills avoid every box and every placed label. On
an unfolded card they sit beside its edge. The step's key lists "off-row call:
pill → name · pkg".

| Step (story v2) | Reach | Off the root's row | Share | Decision |
| --- | --- | --- | --- | --- |
| `prepare_layout` | 16 | 0 | 0 | one row |
| `build_device` | 12 | 5 | 0.42 | frame, raised Elevation |
| `Device.plan_mesh` | 10 | 9 | 0.90 | frame, raised Elevation |
| `build_meshed_device` | 8 | 0 | 0 | one row |
| `build_thomas_fermi_solver` | 16 | 1 | 0.06 | pill: `→ _raster_cell_indices · mesh` |
| `solve_strain` | 10 | 0 | 0 | one row |
| `Device.finalize` (story 1 tour stop, snapshot 7) | 17 | 3 | 0.18 | pills: `→ region_box · tempura`, `→ region_from_predicate · tempura` |

Story version 2 has no `Device.finalize` stop; the rule was built and shown on
that stop with the snapshot 7 data (screenshots `07-...-v7`) before the refresh.

## Data refresh (snapshot 8, story version 2)

The orchestrator replaced the copy's `atlas.json` and `atlas-story.json` with
tempura's current ones (snapshot version 8, story version 2) because
`atlas.story.load_story` now requires story version 2. `prepare.py` now:

- reads every chapter of the story and none of its own: kind `chapter`
  (package map, entry surface, state and collaboration, review pressure), kind
  `pipeline` (the focus file's six items; the root may be any function or
  method, here `Device.plan_mesh`), kind `signal` (`dead`, `clones`,
  `load_bearing`; `import_cycles` frames the modules in cycles from the Plan,
  none on tempura). The generated tour and review stops are gone, so no signal
  appears twice. 13 steps.
- maps `level` to the level of detail (package: the map; module and function:
  boxes, unfolded where the story's `unfold` list says), honours `unfold`
  lists (state and collaboration unfolds `_quantum_petsc.py`) and a `plan`
  camera, and keeps the v2 rules where the story says nothing.
- frames a chapter on its lit set and its evidence: the entry surface frames
  its 12 cited exports from the raised Elevation; a signal frames its whole
  class (44 load-bearing functions, 8 clone members, 5 dead functions).
- emits snapshot 8's `exported` and `exported_from` on nodes and classes; the
  inspector's entry-surface badge uses it (`compile_mesh_inputs` is no longer
  badged: it is not exported).
- still validates with `atlas.story.load_story`; if that rejects a story's
  version, it falls back to the copy's minimal snapshot check and says so.

The browser's rail groups the steps as chapters (numbered segments), pipelines
and signals (dots); a step's panel says "Step 7 · pipeline 5 of 6". The
evidence list scrolls so the step's navigation stays on screen.

## Metrics

At 1,280 × 800 CSS px, snapshot 8, in the T3 preview tab.

**Nothing moves.** One geometry hash, `e7c45a35` over the folded scene
(`a2692968` and `bc90b40` with the unfolded `_quantum_petsc.py` or `device.py`
left out, as v2 measured), held through 87 of 87 checks: in each of the 13
guide steps and in the overview, the `mesh` package scope, the `device.py`
module scope and Plan, the inspector opened on the step's target, a linked
source line hovered and left, the callee hovered in the picture, the panel
resized to 320 px and back, and the inspector closed. The world signature and
the camera key were unchanged at every check. Snapshot 7's hash was
`34f850ec`; the data refresh changed the geometry, the inspector did not.

**Call sites of `compile_mesh_inputs`** (lines 199 to 327, 28 call records):

| Kind | Sites | Notes |
| --- | --- | --- |
| linked to a drawn call | 18 | 16 distinct calls: 10 sites to 5 other modules (`_recipe`, `_geometry`, `_selectors`, `_refinement`, `_lattice`), drawn as tracks while folded; 8 sites to its own module's internals (margin arcs when `_compiler.py` unfolds, the tail slot while folded); `resolve_layer_ids` and `_normalize_resolution` are called twice |
| external | 7 | `tuple` ×3, `ValueError` ×2, `len`, `range` |
| unresolved | 3 | `recipe.items`, `compiled_domains.values`, `refinement_records.append` |

**The whole snapshot** (310 drawn functions; class excerpts repeat their
methods' sites and are not counted): 428 linked sites, 2,014 external, 506
unresolved, 2 recursive (`_plan._freeze`), 0 undrawn, 0 without a column.
`Device`'s excerpt (510 lines) carries 21 linked sites and 131 not drawn.

**The guide click rule**, sampled over a 23 × 19 px grid of the picture in all
13 steps (up to 6 inert and 3 lit marks per step): 78 of 78 clicks on tier-2
and tier-3 marks left the step, selection, scope, inspector, hash, world
signature, camera and composited frame identical; 38 of 38 clicks on lit marks
opened the inspector at the same camera and step; the cursor matched the rule
at all 116 points.

**Picking through the section cut** (v2's picking against the new filter, 20 ×
16 px grid): 3,933 of 7,361 pickable points differed. By step: `prepare_layout`
1,446/1,523, state and collaboration 908/1,020, `solve_strain` 620/839,
`build_thomas_fermi_solver` 519/688, `build_meshed_device` 227/453, review
pressure 132/641, dead code 81/327; 0 in the steps seen from the map or the
raised Elevation (no cut).

**The stub rule.** One pill step (`build_thomas_fermi_solver`: 28 marks, 18
labels, smallest 9 px, 1 pill), two frame steps (`build_device`: 66 marks, 10
labels; `Device.plan_mesh`: 105 marks, 25 labels; both 9 px or more), three
single-row steps. On snapshot 7, `Device.finalize` went from one fading sky
stub labelled `→ tempura·2` (with pulses running out along it) to 0 lines off
the row and 2 pills naming callee and package.

**Cost.** Opening the inspector on `compile_mesh_inputs` (129 lines) takes
3.7 ms of script, on `Device` (510 lines) 11 ms; hovering a source line 5.8 ms
including its scroll, leaving it 1.9 ms. `source.json` is 615 kB (327
excerpts, 411 kB of it source text), `view.json` 489 kB. Two runs of
`prepare.py` give byte-identical `view.json` and `source.json`.

## Screenshots

1,280 × 800 CSS px at pixel ratio 2, from the prototype's compositor (which now
paints preformatted text where the browser laid it out, clips to scrolled
panels and draws a mouse pointer where a hover or click happens), in
`/tmp/atlas-shots/inspector/`:

- `/tmp/atlas-shots/inspector/01-left-panel-no-pipelines.png`: free
  exploration, the scope tree without the pipeline list.
- `/tmp/atlas-shots/inspector/02-inspector-compile-mesh-inputs.png`: `mesh`
  scope, `compile_mesh_inputs` selected, its source with 18 linked sites and 10
  markers.
- `/tmp/atlas-shots/inspector/03-hover-call-site-edge-lit.png`: the pointer on
  line 246 (`compile_interface_boxes`); the track to `_refinement.py` and the
  callee's row light, the rest of the reach steps down.
- `/tmp/atlas-shots/inspector/04-hover-card-source-lines-lit.png`: the pointer
  on the `_normalize_resolution` card in the unfolded `_lattice.py`; lines 291
  and 300 light and scroll into view.
- `/tmp/atlas-shots/inspector/05-class-device-inspector.png`: class `Device`
  opened in `device.py`, its lists above its source, after Elevation (3)
  reframed beside the panel; `/tmp/atlas-shots/inspector/05a-class-device-inspector-same-camera.png`
  is the same moment at the camera of the click.
- `/tmp/atlas-shots/inspector/06-guide-inert-dimmed-click-before-after.png`:
  `build_thomas_fermi_solver` step, the pointer on the dimmed `updates.py`
  box before and after a click: identical frames (pixel hash `f33ab07f` both).
  `/tmp/atlas-shots/inspector/06b-guide-lit-click-opens-inspector.png`: a
  click on the lit root opens its source; same step, same camera.
- `/tmp/atlas-shots/inspector/07a-stub-rule-pill-build-thomas-fermi-solver.png`
  (pill), `/tmp/atlas-shots/inspector/07b-stub-rule-frame-device-plan-mesh.png`
  and `/tmp/atlas-shots/inspector/07c-stub-rule-frame-build-device.png`
  (frame); on snapshot 7, the stop the owner named:
  `/tmp/atlas-shots/inspector/07-device-finalize-before-v7.png` (v2: the fading
  `→ tempura·2` stub) and `/tmp/atlas-shots/inspector/07-device-finalize-after-v7.png`
  (two pills under `device.py`'s neighbour, no line off the row).
- `/tmp/atlas-shots/inspector/08-inspector-resized-narrow-wide.png`: the grip
  dragged to 300 px and to 700 px; same camera, same marks.

## Rejected options

- **Moving the picture when the inspector opens** (a camera fit or a view
  offset that recentres the picture left of the panel): the request was that
  selection never moves the camera, and a jumping picture loses the reader's
  place. A later fit frames beside the panel instead.
- **Reserving the panel's width in every fit:** 438 px of a 944 px picture lost
  whenever the panel is closed.
- **Linking call sites in the browser by name:** the explorer would re-derive
  what Python already resolved (the duplication Atlas's single source of truth
  forbids) and would get method calls on values wrong. Python classifies;
  the browser wraps column ranges.
- **Two underline styles** (drawn as a line now, or inside a folded box): the
  line depends on what is unfolded, not on the code. One underline says "a
  drawn call"; the picture says how it is drawn.
- **The GitHub syntax palette** (red keywords, violet calls): it uses two of
  the three hues the canvas reserves for import cycles and clones.
- **Leaving the path on a click on context** (v2), or making focus boxes and
  lit tails clickable: a box or a tail stands for several functions, so a click
  would pick one arbitrarily. Their functions open from the guide panel.
- **Raising the camera for any off-row call:** `build_thomas_fermi_solver`
  would frame two rows for one call out of sixteen, at half the type size.
- **v2's fading stub with a package label:** it named only a package slice and
  drew a line that ends in nothing. **Pills beside the slot** (first try): in a
  dense row they covered the neighbour box's rows; they now hang under the box.

## What Python must additionally emit

On top of `strata-v2.md`'s list, for phase 2 (`src/atlas/analyzer/layout.py`
and the story):

- **`source`**: per drawn function and class, `file`, `start`, `end`, `text`
  (the snapshot's `source_excerpt`) and `sites`, each `[line, first column, end
  column, kind, edge index, called name]` with kind `edge | external |
  unresolved | recursive | undrawn`; a class carries its methods' sites;
  `counts` and the rule text. Better still, the analyzer's call records should
  carry the call's column range from the AST (`func` end position), so no
  regular expression is needed.
- **Guide steps**: `stub` (`pill | frame | null`), `pills` (`edge`, `at`,
  `dir` `out | in`, `other`, `name`, `package`) and `off_edges`, from
  `STUB_SHARE = 1/4`; `part` taken from the story's chapter kind; `signal` with
  the story's values (`load_bearing`, not `hubs`).
- **Nodes and classes**: `exported` and `exported_from` (snapshot 8).
- Nothing for the guide click rule: it uses the tiers every step already
  carries (`lit`, `lit_classes`, `evidence`, `focus`).

## Limitations and deferred

- The panel can cover selected marks on the right; a view preset reframes
  beside it. A guide step always frames the full picture and closes the panel.
- A lit tail is inert on the path; its functions open from the guide panel.
- Same-module calls inside a folded box have no line; hovering their source
  lines lights the callee's slot only.
- Columns come from matching the called name on the record's line; a chained
  call continuing on a later line marks its first called prefix.
- `source.json` is loaded at boot (615 kB, class excerpts repeat their
  methods); lazy loading per module is deferred.
- The hover step-down and pills are measured at 1,280 × 800 only; the pill
  placement uses screen space and can stack long lists under one box.
- Prototype tooling unchanged: three.js from a CDN, `?size=1280x800`, the T3
  preview tab never fires `requestAnimationFrame` (a timer stands in), and the
  compositor draws the pointer.

## How to run

```text
pixi run python -B prototypes/strata-inspector/prepare.py   # writes view.json and source.json, byte-identical across runs
pixi run python -B -m http.server 8776 --directory prototypes/strata-inspector --bind 127.0.0.1
# http://127.0.0.1:8776/?size=1280x800                lands on step 1 of the guide
# http://127.0.0.1:8776/#scope=package:tempura.mesh&sel=node:tempura.mesh._compiler.compile_mesh_inputs
pixi run python -B /tmp/atlas-shots/receiver-inspector.py  # port 8777, writes /tmp/atlas-shots/inspector/
```

Keys: ← → step, Esc close the inspector or leave the path, g resume, Backspace
inspector back, k key, 1 2 3 views (off the path), u unfold, e open a class.
`window.atlasProto` adds `inspect`, `closeInspector`, `inspectorBack`,
`setInspectorWidth`, `hoverSource(line, k)`, `clickSite(line, k)`,
`sourceState`, `source(id)`, `sourceCounts`, `pointer(x, y)` (a real pointer
move, returns the cursor), `pickAt(x, y, raw)`, `pills`, `strands`,
`frameHash`, `shoot(name, cursor)`, `shootCrop` and `shootRow` to v2's API.
