# Strata lines: one curve per call, a scope nothing hides, keys

> Status: Prototype (2026-10-11). Runs on tempura at `prototypes/strata-lines/`,
> a copy of `prototypes/strata/` (strata-v2). This is the lines track of the
> fourth Strata iteration; the inspector, theme and Python tracks are siblings.
> Nothing under `src/`, `tests/`, `schema/` or `README.md` changed in this track.
> The data is the refreshed tempura snapshot (version 8) and story (version 2);
> see Data refresh.

## Problem

The owner on strata-v2, four requests:

1. "When looking at 2 files, the imports between them start as lines on one
   side, then they get bunched together in an inverted U shape at the top, and
   then they reach the functions at the other side. That makes it impossible to
   see what functions are being imported by what." The owner means calls. In
   v2 all calls of a module pair share one square track above the boxes: the
   pair reads, the function-to-function mapping does not.
2. "When the imports are within the same file, sometimes there are a lot of
   overlapping lines and they look impossible to distinguish." In an unfolded
   module the margin arcs bulge by the span they cover, capped at 0.52 units, so
   every long arc runs on the same outer curve.
3. "When zooming into one file, it is highlighted, but when zooming out the
   other modules get in the way obscuring some of the connections." v2 cut the
   rows in front of a scope with the camera's near plane and dropped that cut as
   soon as the reader zoomed, panned or orbited. Boxes outside the scope stayed
   at 5 % alpha but still wrote depth, so they hid lines behind them.
4. "I was thinking that using the arrows to move up and down and right and left
   would be helpful as well."

## Answer in brief

- **A module pair in focus draws each call as its own curve.** The curve runs
  from the caller's row or card to the callee's row or card, in front of the
  boxes. Out of focus the pair returns to its one track.
- **Calls inside an unfolded module each get a margin lane.** Lanes come from
  interval colouring, so overlapping calls never share one. Overlapping segment
  pairs between same-module calls fall from 9 to 0 in `device.py` and from 45 to
  1 in `updates.py`.
- **Nothing outside a scope hides it.** A clipping plane cuts every row in front
  of the scope, whatever the camera does, and boxes outside the scope become
  outlines with no fill and no depth. A scoped Elevation is orthographic by
  default. In-scope line pixels hidden by context after a reader's zoom-out fall
  from 893 to 0 (`electrostatics`) and from 1,920 to 0 (`device.py`).
- **The arrow keys move the view.** + and − zoom, Home fits again, Esc goes up
  one level. In the guide, ← and → still step.
- **Python writes every path.** `prepare.py` now emits the tracks, the ribbons
  and each call's curve, stub, margin lane and class loop for every state of its
  two ends. The browser samples the paths and only switches visibility. One
  geometry hash, `f4349dc` over 44,250 values, holds in 33 states: hover, focus,
  a hovered call, selections, three pipelines, Plan, perspective, all 7 package
  scopes, key pan and zoom, and every guide step.

## The per-call rule

A module pair is in focus, and draws call by call, when both of its modules show
their rows (or are unfolded) and one of these holds:

- an end is unfolded and the partner is in the scope;
- the reader hovers one of the two boxes in a package scope;
- a selection, a lit pipeline or a guide step lights a call of the pair;
- the reader clicked the pair's track, its plate ribbon, or one of its calls.

A pair whose other end lies outside the scope keeps its labelled stub, drawn per
call from the unfolded end. The pair's track (its links) is hidden while the
pair is in focus.

Each call between two modules in one row (span `plate` or `row`, 69 of the 77
calls between modules) is one cubic S-curve.

- **Ends.** It leaves the right side of the caller's slot (a row, the "more"
  band, the tail or a ghost row) or of its card or class row. It enters the left
  side of the callee's slot, card, class row or class header.
- **Port order.** The calls at one side spread along it, at most 0.11 units
  apart (0.05 along a class row), 0.07 inside its top and bottom. They are
  ordered by the angle to the far end, most ascending at the top, so
  neighbouring curves do not cross at the side. Ties fall back to the call's
  index, the same at both ends.
- **Plane.** The curve stands 0.09 in front of the box faces. Tracks stand at
  0.06, so a curve passes in front of a track and of any box it crosses.
- **Lane.** The two handles together span 0.9 of the horizontal gap. Within a
  module pair each call takes a lane, which shifts the steep middle of its
  curve by 3/8 × 0.19 units per lane. Calls going down are ordered so that the
  lower one turns first, calls going up so that the higher one turns first. Two
  parallel steep curves are then apart where they are steep, not only at their
  ends.
- **Taper.** 1.7 px at the caller, 0.65 px at the callee; the caller's end is
  also brighter.

A call between rows (span `cross_row`, 8 calls) keeps the sky arc of its pair.
Per call it gets its own port, its own riser 0.03 from its neighbours and a
lateral offset of 0.12 per member.

Hover on one call isolates it. The call is drawn in the emphasis colour 1.2 px
wider, its two ends get the lit outline, and every other line falls to the
tier-3 colour at 55 % at most. A pill names `caller → callee` and the two
modules. It stands at the first of six spots around the pointer that keeps
both ends in sight. A click selects the call, and the inspector names both
ends.

A partner box that only stands at tier 3 (a neighbour in a module scope) rises
to tier 2 while it is the far end of curves in focus, so its row names are
drawn. A curve never ends on an unnamed row in a scope. Row names keep a halo in
the face colour, so a curve that crosses a box runs under its letters.

## The same-module rule

Every call inside an unfolded module runs in the pane's left margin:

1. **Lanes.** The calls are coloured as intervals over the card column, shortest
   first, ties by sorted caller and callee id. Each call takes the first lane
   that no overlapping call holds; lane 0 is next to the cards. Two calls that
   only touch at one card share a lane, because their ports on that card stand
   one above the other.
2. **Margin width.** Python sizes the margin from the lane count, at 0.075 units
   per lane, 0.1 from the cards and 0.05 from the box wall. A module that needs
   more than v2's 0.6 takes the room from its cards, never below the width of a
   13-character card line. The box keeps its width, so the placement does not
   move; only the unfolded pane's cards get narrower and its open height grows.
   Five modules widen: `updates` (11 lanes, margin 0.9), `_lattice` (12,
   0.975), `layout_pipeline` (9, 0.75), `linear_dot_array` (18, 0.735) and
   `_compiler` (8, 0.675). `device` keeps 0.6 with 5 lanes at 0.085.
3. **Ports.** A card's left side carries its incoming calls from other modules
   at the top. Below them come its margin calls: first those whose far end is
   above (inner lane at the top), then those whose far end is below (outer lane
   at the top). With this order a call's horizontal stub never crosses the lane
   of a call nested inside it.
4. **Shape.** A call leaves the caller's left side, runs to its lane, along the
   lane, and back into the callee's left side, with corners rounded at 0.06. It
   is 1.35 px wide at the caller and tapers to 0.54 px. Calls between adjacent
   cards also take a lane: cards on one floor are 0.1 apart, so a direct
   connector would be 4 px long.

Shortest-first colouring uses more lanes than the minimum but nests short calls
inside long ones. On `updates.py`, counting where a call's stub crosses another
call's lane, it gives 11 lanes and 33 crossings; colouring by start gives the
minimum of 9 lanes and 91 crossings.

## The occlusion rule

In a scoped view nothing outside the scope may hide it. The scope is the package
of a package or module scope, the modules of a pipeline picked from the list,
and the modules a guide step touches.

- **Section cut.** One clipping plane on every material keeps z up to 3.2 in
  front of the scope's front row, which covers its plate's front edge and
  package name. The cut follows the scope, not the camera, so it survives the
  reader's zoom, pan and orbit. Labels beyond the cut are not drawn. In
  Elevation a second plane cuts the rows behind the scope (2.2 behind its back
  row), whose outlines would otherwise show through the gaps between its boxes.
- **Silhouettes.** A box outside the scope draws only its outline, at tier 3 and
  22 % alpha, plus its foot on the ground. It has no face fill, no header, no
  rows and no glass column, and it writes no depth, so it can hide nothing. It
  is not a click target.
- **Orthographic Elevation.** A scoped Elevation uses an orthographic camera:
  every box in the scope has one scale, and no box face or side from another
  depth overlaps the scope. The camera stands 120 units from its target; the
  zoom is px per unit. `o`, or the Orthographic button, switches to perspective
  and back. The switch keeps the scale at the target, and flights blend the zoom
  logarithmically. On the split root package `tempura`, the orthographic raised
  Elevation draws both slices at 28.7 px per unit. Under perspective the back
  slice is smaller than the front one (05 against 05b).
- **Imports.** Imports lie on the ground. Face-on they collapse into one band of
  overlapping dashes, so Elevation leaves them to Plan (v2 drew them at 17 %).

## Key map

| Key | Action |
| --- | --- |
| ← → ↑ ↓ | Move the view by 15 % of the picture, in screen space (in the guide ← → step and ↑ ↓ move) |
| Shift + arrow | Move by 45 % |
| + − | Zoom in and out by 1.25 about the picture's centre |
| Home | Fit the scope again; in the guide, the step's frame; after a pipeline, its fit |
| Esc | Close the help; clear the selection; then up one level: module → package → all packages. In the guide, Esc lands one level above the step's scope, which leaves the path |
| 1 2 3 | Axonometric, Plan, Elevation |
| o | Orthographic or perspective Elevation |
| k | The key (legend) |
| ? or h | The key map (help overlay) |
| PgUp PgDn | Previous and next guide step |
| g | Resume the guide |
| p | Replay the pulses of the lit pipeline |
| u, e | Unfold the hovered module; open the selected class |
| mouse | Drag orbits, right-drag pans, wheel zooms; hover a call to isolate it, click to select it |

The arrow and zoom keys fly the camera for 160 ms. A key pressed during a flight
starts from that flight's goal, so repeated presses add up exactly. The keys move the camera
and nothing else: the geometry hash is unchanged after pan and zoom, and an
idle scene draws 0 frames in 2 s. `KEYMAP` in `app.js` feeds the help overlay.

## Metrics

All views are at 1,280 × 800 CSS px, measured by `metrics.js` at the view's own
camera. "Before" is the unmodified strata-v2 app on the same refreshed data
(served from `/tmp/atlas-shots/lines-before/`, with v2's margin rule).

- **Lines drawn.** Connection line objects (calls, tracks, curves, ribbons,
  clone chords, imports) with effective alpha of at least 0.1 and a point in
  the picture.
- **Crossings.** Proper intersections between the screen polylines of two drawn
  lines. A crossing within 8 px of an end the two lines share is not counted.
- **Overlapping pairs.** Two segments of different lines that stay within 2 px
  of each other over more than 20 px; each such run counts once.
- **Occluded in-scope px.** We draw the scope's lines (lines touching a scope
  module) in a key colour with only the scope's boxes, then again with
  everything else. Key pixels of the first picture that are missing from the
  second are occluded. Values are CSS px, out of the scope's line pixels.
- **Call lines only.** The same crossings and overlaps without imports and clone
  chords, so that the routing is measured apart from hiding imports in Elevation.

| View | Lines drawn | Crossings | Overlapping pairs | Call lines only: crossings | Call lines only: overlaps | Same-module overlaps | Occluded in-scope px |
| --- | --- | --- | --- | --- | --- | --- | --- |
| electrostatics scope | 45 → 27 | 86 → 41 | 75 → 40 | 26 → 25 | 47 → 38 | 0 → 0 | 0 of 8729 → 0 of 7054 |
| electrostatics, reader zoomed out (3 wheel notches) | 45 → 27 | 87 → 41 | 85 → 56 | 25 → 25 | 51 → 53 | 0 → 0 | 893 of 6936 → 0 of 4715 |
| electrostatics, hover device.py | 27 → 27 | 53 → 39 | 50 → 34 | 26 → 23 | 47 → 32 | 0 → 0 | 0 of 7563 → 0 of 7386 |
| layout, hover layout_pipeline.py | 9 → 9 | 11 → 10 | 3 → 0 | 11 → 10 | 3 → 0 | 0 → 0 | 0 of 5924 → 0 of 4244 |
| device.py unfolded | 42 → 27 | 46 → 20 | 26 → 8 | 23 → 18 | 17 → 8 | 9 → 0 | 4 of 5084 → 0 of 3953 |
| device.py unfolded, zoomed out | 48 → 32 | 62 → 26 | 47 → 15 | 26 → 22 | 28 → 14 | 8 → 0 | 1920 of 4181 → 0 of 2720 |
| updates.py unfolded | 48 → 37 | 178 → 73 | 94 → 16 | 91 → 45 | 72 → 14 | 45 → 1 | 3 of 5459 → 2 of 5087 |
| pipeline compile_mesh_inputs | 12 → 13 | 4 → 0 | 28 → 4 | 4 → 0 | 28 → 4 | 0 → 0 | 0 of 2743 → 0 of 2066 |
| compile_mesh_inputs, zoomed out | 20 → 13 | 52 → 0 | 32 → 4 | 33 → 0 | 30 → 4 | 0 → 0 | 5 of 2115 → 0 of 1505 |
| pipeline prepare_layout | 9 → 9 | 3 → 0 | 7 → 1 | 3 → 0 | 7 → 1 | 0 → 0 | 0 of 1750 → 0 of 962 |
| pipeline build_device | 10 → 10 | 10 → 6 | 3 → 2 | 10 → 6 | 3 → 2 | 0 → 0 | 0 of 1583 → 0 of 1347 |
| build_device, zoomed out | 11 → 11 | 11 → 8 | 2 → 1 | 11 → 8 | 2 → 1 | 0 → 0 | 0 of 1208 → 0 of 1029 |

What the numbers say:

- **Lines drawn** fall in Elevation mainly because imports are no longer drawn
  there (18 in `electrostatics`, 15 in `device.py`, 11 in `updates.py`). The
  pipeline gains a line because its 9 links become its 10 calls.
- **The pipelines** lose every crossing and almost every overlap. v2's lit links
  ran in one lane, 0.07 apart; the per-call curves leave and enter at spread
  ports.
- **`updates.py`** halves its call crossings (91 → 45) and loses 58 of 72 call
  overlaps. 44 of those come from the margin lanes (45 → 1 same-module
  overlaps).
- **The package scope out of focus** changes little (call overlaps 47 → 38).
  Its overlaps are v2's tracks: gutter risers in a 0.24-unit gutter and the
  links of one pair in one lane. Wider caps (risers 0.075 apart instead of
  0.045, links 0.1 instead of 0.07) and the orthographic scale move it from 47
  to 38; the rest goes when a pair comes into focus (hover: 47 → 32).
- **Occlusion** was zero in v2's default frames, which the near-plane cut
  covered. It appears as soon as the reader zooms (893 and 1,920 px, 13 % and
  46 % of the scope's line pixels) and is 0 with the clipping cut and
  silhouettes. The remaining 2 px in `updates.py` are antialiased edge pixels.
- **On the old snapshot** (version 7, before the data refresh) the v2 baseline
  showed the same defects: 799 and 1,950 occluded px after zoom-out, 28
  overlaps in the `compile_mesh_inputs` pipeline, 92 in `updates.py`. The JSON
  is `/tmp/atlas-shots/lines/metrics-before-v7.json`.

Invariance (`atlasProto.geomSignature(skip)`, a hash over every link, call,
curve and ribbon point and every box position) is `f4349dc` over 44,250 values
in 33 states:

- the overview and Plan;
- a hovered box and a hovered call;
- a selected call and a clicked ribbon;
- the three pipelines;
- perspective;
- all 7 package scopes;
- key pan and zoom;
- all 12 guide steps that unfold nothing, and after the guide.

`device.py` unfolded, with a call hovered and with `Device` opened, matches the
overview's hash with `device.py` left out (`ce6157c5`). Guide step "State and
collaboration", which unfolds `_quantum_petsc.py`, matches its reference
(`21efde46`). A call with no path in the current state is parked on its first
points, so folding a module back restores the exact geometry.

## Evidence

All screens are 1,280 × 800 CSS px at pixel ratio 2, from the prototype's
compositor, in `/tmp/atlas-shots/lines/`. Before (strata-v2 on the same data):

- `/tmp/atlas-shots/lines/00a-before-hover-device.png`: hover `device.py` in
  `electrostatics`; its pairs light as shared tracks.
- `/tmp/atlas-shots/lines/00b-before-electrostatics-zoomout.png`: three wheel
  notches out; the rows in front come back and veil the scope.
- `/tmp/atlas-shots/lines/00c-before-device-unfolded.png` and
  `/tmp/atlas-shots/lines/00d-before-device-zoomout.png`
- `/tmp/atlas-shots/lines/00e-before-updates-unfolded.png`: v2's margin arcs.
- `/tmp/atlas-shots/lines/00f-before-pipeline-compile-mesh-inputs.png`,
  `/tmp/atlas-shots/lines/00g-before-hover-layout-pipeline.png`,
  `/tmp/atlas-shots/lines/00h-before-pipeline-build-device.png`,
  `/tmp/atlas-shots/lines/00i-before-pipeline-prepare-layout.png`,
  `/tmp/atlas-shots/lines/00j-before-electrostatics.png`

After:

- `/tmp/atlas-shots/lines/01-two-modules-in-focus-layout.png`: hover
  `layout_pipeline.py`; `prepare_layout` → the three readers and
  `load_layout_data`, and → `crop_polygons_to_aoi`, `polygons_to_vertices`,
  `rasterize_gate_vertices`, each its own curve between named rows.
- `/tmp/atlas-shots/lines/01b-two-modules-in-focus-thomas-fermi.png`: hover
  `_thomas_fermi.py`, five pairs in focus.
- `/tmp/atlas-shots/lines/01c-guide-pipeline-prepare-layout.png`: guide tour
  stop 1; the step's lit calls drawn per call, every end named.
- `/tmp/atlas-shots/lines/02-hover-isolates-one-call.png`: one call isolated,
  both ends outlined, the pill clear of both.
- `/tmp/atlas-shots/lines/02b-hover-isolates-one-margin-call.png`: one margin
  call inside `device.py` isolated.
- `/tmp/atlas-shots/lines/03-device-unfolded-margin-lanes.png` and
  `/tmp/atlas-shots/lines/03b-updates-unfolded-margin-lanes.png`: margin lanes;
  the per-call curves to `height_fields.py`, `_block_poisson.py` and
  `potential.py` end on named rows.
- `/tmp/atlas-shots/lines/04-package-scope-zoomed-out-section-cut.png` and
  `/tmp/atlas-shots/lines/04b-module-scope-zoomed-out-section-cut.png`: the same
  zoom-out as 00b and 00d; the rows in front are cut, those behind are gone, the
  neighbours outside the package are outlines.
- `/tmp/atlas-shots/lines/05-ortho-elevation-split-package-tempura.png` against
  `/tmp/atlas-shots/lines/05b-persp-elevation-split-package-tempura.png`, and
  `/tmp/atlas-shots/lines/05c-ortho-elevation-electrostatics.png` against
  `/tmp/atlas-shots/lines/05d-persp-elevation-electrostatics.png`.
- `/tmp/atlas-shots/lines/06-pipeline-prepare-layout.png`,
  `/tmp/atlas-shots/lines/06b-pipeline-prepare-layout-zoomed-by-keys.png` (+ +
  →), `/tmp/atlas-shots/lines/06c-pipeline-compile-mesh-inputs.png`,
  `/tmp/atlas-shots/lines/06e-pipeline-compile-mesh-inputs-zoomed-by-keys.png`
  (+ + + Shift+←), `/tmp/atlas-shots/lines/06d-pipeline-build-device.png`
  (Axonometric across two rows; rows 2 and 3 cut).
- `/tmp/atlas-shots/lines/07-filmstrip-keyboard-zoom-and-pan.png`: fit, +, →,
  ↓, each settled.
- `/tmp/atlas-shots/lines/08-help-key-map.png` and
  `/tmp/atlas-shots/lines/08b-key-legend-module-scope.png` (the key lists
  "in focus: a curve per call" and "inside a module: margin lane").

Measurements: `/tmp/atlas-shots/lines/metrics-before.json`,
`/tmp/atlas-shots/lines/metrics-after.json`.

## Rejected options

- **Per-call tracks at distinct heights.** Each call keeps the U shape over the
  boxes, with its own riser and lane. The mapping reads, but a pair with five
  calls fills the corridor with five nested Us, the shape the owner asked to
  lose. Direct curves cross intermediate boxes instead. Those boxes are dimmed
  or named under a halo, and the curve stands in front of them.
- **A bow for long curves.** Long curves bowed up by their rank among the calls
  leaving the same side, so that far, level calls fan out in a wide pipeline
  frame. On `compile_mesh_inputs` crossings rose from 0 to 5 and overlaps from
  4 to 6: at 12 px per unit adjacent ranks stand 2 px apart, and the raised
  curves cross the calls of other rows. Removed; the zoom keys are the better
  answer for that frame (06e).
- **Margin lanes by start order.** They give the minimum lane count (9 on
  `updates.py`) but put long calls inside short ones: 91 lane crossings against
  33 for shortest first.
- **One trunk per caller in the margin** (calls of one caller share a vertical
  and branch off). It halves the lanes, but the shared vertical makes a single
  call impossible to isolate, and the brief asks for a lane per call.
- **A second margin on the cards' right side.** It halves the lane depth, but
  calls to other modules leave the cards on the right and would cross every
  right-hand lane.
- **Widening boxes for their margin.** This would change the type calibration
  and the placement of every package. The margin takes the room from the cards
  instead, down to a 13-character card line.
- **The camera's near plane as the cut** (v2). It works face-on only, and it was
  dropped at the reader's first zoom, which is when the owner saw occlusion.
- **Hiding out-of-scope boxes entirely.** A package scope would float without
  its row. Outlines keep the row's rhythm and hide nothing.
- **A narrow-angle perspective instead of an orthographic camera.** Perspective
  distortion shrinks but stays, and every distance-based rule (fog, flights,
  scale caps) would need an exaggerated camera distance.

## Data refresh

During the iteration the Python track landed snapshot version 8 and story
version 2. `src/atlas/story.py` now rejects version-1 stories. Following the
orchestrator's instruction, this prototype copies
`/Users/jdtorresluna/Code/tempura/.atlas/atlas.json` and `atlas-story.json`.
Its `prepare.py` makes the smallest change that accepts the new story:

- pipeline chapters become tour stops;
- signal chapters (`dead`, `clones`, `load_bearing`) take the review stop built
  for their signal, with the chapter's id, title, body and evidence;
- when the story carries pipeline or signal chapters, `prepare.py` generates no
  tour or review stops of its own, and the steps follow story order (13 steps).

The keys `level`, `unfold` and `camera` on story views are not read. The
integration step should consume them. If `atlas.story.load_story` rejects a
story only for its version, `prepare.py` falls back to the snapshot-id check.
The routing does not read the v8 fields (`exported`, `exported_from`). The
"before" measurements and screenshots use this refreshed data. The first
baseline on the version-7 data is kept for reference
(`/tmp/atlas-shots/lines/metrics-before-v7.json`).

## What Python must additionally emit

On top of strata-v2's view (see `strata-v2.md`, "Data the explorer needs from
Python"), `build_routes` adds `view.routes` (187 kB of the 640 kB view):

- **`plates`:** per plate `band_top`, `sky_base` and the lane count over it.
  These are what `routing.js` computed in v2.
- **`links`:** one path per link, the module pair's track or arc between folded
  boxes. This is v2's routing, ported with two changes: risers at most 0.075
  apart (v2: 0.045), links in a lane at most 0.1 apart (v2: 0.07).
- **`ribbons`:** one path per plate pair.
- **`calls`:** per call, paths per variant. A variant names the state of each
  end: `f` folded, `o` unfolded, `x` unfolded with the end's class opened.
  - `curve` (all 77 calls between modules, 360 variants);
  - `track` (stubs of `row` and `cross_row` calls with an unfolded end, 65
    variants; each member has its own riser);
  - `margin` (calls inside one module, 251 variants);
  - `loop` (calls inside a class, opened only).
- **Path format:** a start point, then pieces of 10 numbers (sample count, two
  Bezier controls, end point). Straight runs are cubics with controls at thirds,
  sampled every 0.5 units for the stub fade; corners are quadratics written as
  cubics.
- **Per unfolded pane** (`panes[*].box`): `margin` (width) and `lanes`, from
  `column_lanes`. The same function runs in `box_layout` and in the routes,
  and an assertion checks that both agree. `routes.margin` repeats lanes,
  pitch and width per module.
- **`routes.rule` and `routes.constants`:** the rules in words and the
  constants (`curve_z`, `port_pitch`, `curve_lane`, `margin_pitch`,
  `margin_lane`, `track_front`).

The browser picks a variant from the module and class state. While a class block
lifts it blends the `o` and `x` paths, which have one shape. Otherwise it
switches visibility. Which pairs are in focus stays a browser lookup (hover,
selection, scope), since it depends on interaction only. Moving `prepare.py`
into `src/atlas/analyzer/layout.py` takes these blocks with it; the variants
assume that at most the pair's own two modules are unfolded when ports are
ordered.

## Limitations

- **Wide pipeline frames.** With the inspector open, `compile_mesh_inputs`
  frames at 12 px per unit. Rows are too small to name (their names come as
  pills under the boxes), and the per-call curves to far modules run close
  together. The zoom keys open them up (06e).
- **`linear_dot_array.py`** needs 18 margin lanes in a 2.82-wide box: pitch
  0.034 units, about 1.5 px at module scope. `mutations.py` and `meshing.py`
  get 10 lanes at 0.05. A grid of cards per floor, instead of one column, would
  shorten most calls.
- **Out-of-focus tracks** keep v2's narrow gutters: 38 call overlaps remain in
  the `electrostatics` scope until a pair comes into focus.
- **Curves crossing boxes.** A curve between distant boxes passes in front of
  the boxes between them. Row names keep a halo, so the curve breaks around the
  letters.
- **Port labels** can still collide when zoomed out (`← layout` and
  `→ mesh · tempura·2` in 04, as in v2).
- **The silhouettes between the slices** of the split package make the raised
  Elevation busy, and at 28.7 px per unit the back slice's rows still do not
  fit their names at 9 px.
- **Class blocks.** An opened class block protrudes 1.95 units in front of the
  face, so per-call curves of other modules can pass behind it. Its intra-class
  loops share the margin with the lanes.
- **Prototype tooling.** three.js comes from a CDN. `metrics.js`,
  `atlasProto._lines` and `_scene` exist for measurement. The before bundle in
  `/tmp/atlas-shots/lines-before/` is a throwaway copy.

## How to run

```text
pixi run python -B prototypes/strata-lines/prepare.py      # writes view.json, byte-identical across runs
pixi run python -B -m http.server 8774 --directory prototypes/strata-lines --bind 127.0.0.1
# http://127.0.0.1:8774/?size=1280x800#map                 free exploration, fixed frame
# http://127.0.0.1:8774/#scope=package:tempura.layout      a package scope (orthographic Elevation)
# http://127.0.0.1:8774/#scope=package:tempura.layout&proj=persp
pixi run python -B /tmp/atlas-shots/receiver-lines.py      # port 8775, writes /tmp/atlas-shots/lines/
```

`window.atlasProto` adds `hoverCall(ei)`, `focusPairs()`, `curves()`,
`key(k, shift)`, `proj('ortho' | 'persp')`, `camera()` and `help(on)` to v2's
calls. The measured views and the metrics run in the page:

```text
const v = await import('./views.js'); await v.measureLines('after');   // posts metrics-after.json
```
