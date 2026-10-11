# Strata guide: a reading path through the city

> Status: Prototype (2026-10-09). Runs on tempura (snapshot version 7) at
> `prototypes/strata-guide/`, a copy of `prototypes/strata/` (see `strata.md`).
> Nothing under `src/`, `tests/` or `schema/` changed, and no other prototype
> changed. This is the reading-path track of the third Strata iteration. The
> surface-first boxes (`prototypes/strata-surface`) and the visual-hierarchy
> audit (`prototypes/strata-hierarchy`) are sibling tracks.

## Problem

The owner on the integrated prototype: "The information is still quite
difficult to digest."

Part of the cause is the landing view. Strata opens on the whole city: 592
marks (242 cards, 225 call strands in pane textures, 43 module-pair ribbons,
40 panes, 12 imports, 17 class blocks, 8 plates, 5 clone arches), 37 labels
on the canvas and 84 text items in the panels and key. Nothing says where to
start or in which order to read. Atlas's own rule is to read from the public
surface inward: entry points, then pipelines, then shared infrastructure. The
snapshot already ships a validated reading guide (`atlas-story.json`, built
and checked by `src/atlas/story.py`) that follows that rule, but Strata does
not use it.

## Answer in brief

- **The explorer opens on chapter 1, not the city.** The landing view is the
  story's "Package map" at package level: 8 plates with their names, 8
  package-to-package ribbons, the module panes at 40 %, the cards at 10 %,
  and the chapter's evidence (`compile_mesh_inputs`) named in a pill. That is
  57 marks and 9 labels, against 592 and 37 at the overview. The city is one
  key away (Esc, or Map).
- **Python owns the path.** `prepare.py` reads `atlas-story.json`, validates
  it with `atlas.story.load_story`, and writes a `guide` block into
  `view.json`. Each step is fully resolved Strata state: scope, level of
  detail, which functions and calls are lit and at what depth, the trace
  path, the open class, what the camera frames, the camera rule, and the
  marks the step's key lists. The browser applies a step and never decides
  what it lights.
- **Fourteen steps on tempura.** The story's chapters 1 to 4, a tour of 6
  pipelines (one stop per package that no chapter walked), chapter 5
  (review pressure), then three review stops: dead band, clone chords and
  load-bearing hubs.
- **Each step is a camera flight.** Next and previous move the camera over
  360 ms to the step's frame and light its set. Every transition settles in
  371 to 389 ms. One step changes geometry (chapter 4 opens a class block, as
  the story's `object` key asks). Hover never moves anything.
- **Leaving the path keeps the camera.** Clicking a card, block, ribbon or
  pane leaves the guide into free exploration where the camera stands.
  "Resume guide" (or g) flies back to the step. `#guide=<step-id>` links to
  a step.

## The reading-path model

1. **Steps, not chapters.** A step is one picture with one text. The story's
   chapters become steps in story order. Two kinds of step come from
   snapshot facts, because the story vocabulary cannot express them yet:
   tour stops (pipelines) and review stops (signal classes).
2. **Order.** Chapters 1 to 4, then the tour, then the chapter whose id is
   `review-pressure` with the review stops after it. Without a
   `review-pressure` chapter, the tour and the review stops go at the end.
   This follows the reading rule: entry surface, then pipelines, then shared
   infrastructure and defects.
3. **Three brightness tiers per step.** What the text names is lit (cards at
   100 %, calls bright). The modules the step is about are the focus (panes
   at 60 %, unlit cards at 26 %). The rest of the map is context (panes at
   14 %, cards at 8 %, plates at 45 %, names kept as orientation). Imports,
   module ribbons and pane textures are off in the guide; no step talks about
   them.
4. **One frame per step.** The camera frames what the text names: the lit
   set (plus the ground and the dead band for a dead function), the open
   class and its partners in the same row, or the whole map for the package
   map. The picture keeps the full width between the guide panel and the
   right edge.
5. **The panel carries the words.** The guide panel shows the step's place
   ("Chapter 2 of 5", "Tour · stop 4 of 6"), title, body, evidence,
   "In the picture" (only the marks this step draws, with their key
   swatches), and for tour and review stops the lit functions by module in
   call order. A rail along the bottom shows every step: chapters by number
   and title, tour and review stops as dots, read steps filled, the current
   one bright.

## How story view keys map to Strata state

`prepare.py` (`build_guide`) does the mapping; the browser receives the
result.

| Story key | Strata state | Notes |
| --- | --- | --- |
| `scope` | `scope`: a module scope if the path is a module with a pane, a package scope if it is a package with a plate, none for `""` and for the package root | The package root (`tempura`) means the whole package in the story; Strata's `tempura` package is only its root modules, so it maps to no scope |
| `structure` | `lod`: `plate` (package level: plates, names, plate ribbons) when `structure` is false and the chapter has no selection, pipeline, object or trace; otherwise `function` | `structure: false` meant the repository sunburst in the previous explorer |
| `cross_file` | Whether the lit set may leave its module. False: the reach is computed over same-module calls only, and calls between modules are hidden. True: calls between modules are lit; one whose far end lies outside the step's focus becomes a labelled stub | Computed in Python (a BFS restricted to the module), not filtered in the browser |
| `selection` | `selected` (white outline) and `lit`: the selection's reach with BFS depth | The reach is the explorer's reach (resolved calls) |
| `pipeline_root` | As `selection`, plus `pulses: true` (wavefront, then pulses for 3 passes or 4 s) | |
| `context` | Depth cap of the lit reach: `"0"`, `"1"`, `"2"`, or no cap for `"all"` | |
| `trace_start`, `trace_end` | `trace`: the shortest resolved call path between them, inside the lit calls (Python BFS); drawn brightest and 1.4 px wider, the rest of the pipeline one step down in brightness | |
| `object` | The class opened (`open`), selected, and lit: its methods, its own calls, its direct callees (depth 1) and callers (depth −1); framed with its partners that stand in its row | Opening lifts the block, the one geometry change on a step |
| `source` | No source panel in Strata yet: the id is the selection; the panel's evidence line names its module | Phase 2 needs a source panel |
| `evidence` | Lit, named in a bold pill wherever the card is too small to carry its name, listed in the panel as controls (a click leaves the path and selects it) | |

Things Python derives that no story key states (see the proposed
extensions): the frame, the camera (`map`, `face`, `raised`), the home row of
a tour stop, the step's key marks, the focus modules, and the tour and
review steps.

Camera rule: `map` for a package-level chapter (Axonometric at 0.98 rad, a
little steeper than the 0.82 rad overview so plates read as a map);
`face` (Elevation with a section cut) when the framed set stands in one row;
`raised` (Elevation from 0.5 rad, rows stacked, no cut) otherwise.

## The steps on tempura

| # | Step | Story keys | Lit | Frame | Camera |
| --- | --- | --- | --- | --- | --- |
| 1 | Package map | `scope ""`, `structure false` | evidence `compile_mesh_inputs` | the whole map at package level | map |
| 2 | Entry surface | `scope _compiler`, `selection`, `cross_file false` | `compile_mesh_inputs` and its 8 callees inside `_compiler.py` (10 calls) | the 9 lit cards | face |
| 3 | Static call path | `pipeline_root prepare_strain_update`, `context all`, `trace_start`, `trace_end` | 9 functions, 9 calls; the trace to `_reference_lattice_nm` brightest; pulses | the lit set and its tracks | face |
| 4 | State and collaboration | `object _QuantumPetscTransfer`, `cross_file true` | the open block (10 methods, 14 fields), 2 calls in from `_thomas_fermi.py` | the block and `build_thomas_fermi_solver`, `ThomasFermiSolver.extract_potential` | face |
| T1–T6 | Tour | (none) | each pipeline's reach, pulses | the reach, or its root's row | face, raised for T5 |
| 5 | Review pressure | `scope _plan`, `selection _build_leaf_hierarchy` | the dead function | it, the other dead functions of `_plan.py`, the ground above them | face |
| R1 | Dead band | (none) | the 5 dead functions and the 2 dead calls between them | the dead cards and the ground | face |
| R2 | Clone chords | (none) | the 8 clone members; their violet arches | the members | raised |
| R3 | Load-bearing hubs | (none) | the 22 hubs | the hubs | raised |

## The tour rule

Walk the snapshot's pipelines (`architecture.pipelines`) in snapshot order,
biggest reach first. Keep a pipeline as a stop when:

1. its root is drawn (not test code);
2. its package has no stop yet, and no chapter's pipeline was rooted there
   (chapter 3 walked `strain`, so `strain` is toured already);
3. its reach has at least 4 functions;
4. at least half of its reach was lit by no earlier chapter pipeline or stop.

On tempura this gives one stop per remaining package, 6 of 41 pipelines:

| Stop | Pipeline | Package | Reach | New | Camera |
| --- | --- | --- | --- | --- | --- |
| T1 | `compile_mesh_inputs` | mesh | 35 | 35 | face |
| T2 | `plot_template_dot_array_geometry` | plotting | 25 | 25 | face |
| T3 | `prepare_generated_layout` | tempura | 19 | 19 | face |
| T4 | `Device.finalize` | electrostatics | 17 | 17 | face on the root's row; 3 functions leave as stubs |
| T5 | `build_device` | layout | 12 | 11 | raised |
| T6 | `FinalizedDeviceGeometry.__post_init__` | meshing | 6 | 6 | face |

Skipped examples: `write_template_dot_array_gds` (20 functions, 3 new after
T2), `build_thomas_fermi_solver` (electrostatics already toured),
`solve_strain` (strain walked by chapter 3).

Home row. When at most a third of a stop's reach stands outside its root's
row, the camera faces the root's row and the calls to other rows leave as
stubs labelled with their partner packages, the convention of a scope view
(T4: `→ meshing · tempura·2`). Otherwise the whole reach is framed from the
raised Elevation (T5: 5 of 12 functions in another row).

Each stop's body is built from facts: the root's role (its docstring summary)
and "It reaches N functions in M modules of P", from the reach and the
module-to-package map. The panel lists the reach by module in call order
(module order by first depth, then pane order; inside a module by depth and
line).

## Review pressure

After the tour comes the story's chapter 5. On tempura its target,
`_build_leaf_hierarchy`, is itself dead, so the picture shows it lit in
the dead band of `_plan.py`, under the ground line. Three stops follow. Each
lights one signal class and states one sentence built from snapshot facts:

- **Dead band.** "5 functions are dead: private and never called. They hang
  in the basement below the ground of _plan.py, _built.py and
  _canonical.py." Lit: the 5 dead cards (dashes kept, brightened) and the 2
  dead calls between them; "ground" and "dead" labelled beside the leftmost
  one.
- **Clone chords.** "3 clone groups join 8 functions that share one
  structure; violet arches tie each copy to its twin. The largest repeats
  _readonly_array in 4 modules." Lit: the members and their arches.
- **Load-bearing hubs.** "22 hubs, functions called from many places, carry
  the teal bar: the shared infrastructure the pipelines lean on (21 more
  load-bearing functions are orchestrators, which call many)." Lit: the 22
  hub cards.

The counts come from the view's node flags (`dead`, `clone`, `hub`, `orch`)
and `model.clones`. The browser adds no analysis.

## Leaving the path

- **Click.** A click on a card, class block, ribbon or pane leaves the guide
  at the current camera and then does what it does in free exploration:
  select (inspector, reach, pulses) or, for a pane, set the module scope
  without flying. A click on empty ground does nothing in the guide, so a
  short orbit drag never leaves the path by accident. Measured on chapter 3
  with a real pointer event on `build_material_catalog`: camera key and
  world signature identical before and after.
- **Map.** Esc in the guide, or the Map button, leaves the path and flies to
  the whole map (the explorer's overview, Axonometric).
- **Resume.** Off the path, the rail starts with "Resume guide ▸" and shows
  the step left, underlined; g does the same. Clicking any rail entry jumps
  to that step.
- **Deep links.** On the path the hash is `#guide=<step-id>`
  (`#guide=tour-device-finalize`); an empty hash lands on step 1. Off the
  path the hash is the explorer's (`scope`, `sel`, `open`, `view`) plus
  `at=<step-id>`, the step "Resume guide" returns to. The explorer's
  existing links (`#scope=package:tempura.mesh`) still open in free
  exploration.
- **One layout for both modes.** The guide panel and the scope tree share
  the left 300 px; the rail is the bottom 40 px. The picture's free area
  (and so the camera's view offset) is the same in both modes, so leaving
  the path shifts nothing. The full key became an overlay (Key, or k).

## What moves

- **Camera only on a step or a command:** next, previous, a rail click,
  Resume, Map, Esc, a view preset (1 2 3). A click, a hover, leaving the
  path and the evidence controls never move it.
- **World signature** (every pane, card, plate, class block, call strand,
  ribbon, plate ribbon and clone arch position): `d775a110` at 13 of 14
  steps. Chapter 4 gives `8f6bfb02` because its block is open (lifted 1.4
  units, its own calls rerouted, 220 ms); the next step closes it and the
  signature returns to `d775a110`. After hovering a lit card and a focus
  pane at every step, the world signature and the camera are unchanged.
- **Geometry signature** of the integrated prototype (`geomSignature`):
  `ed95c4fa` over 39,810 values, identical to `prototypes/strata/`.
- **Pulses** run only on pipeline steps (chapter 3 and the tour), capped at
  3 passes or 4 s. Selection-only steps light without pulses.
- **Idle:** 0 frames drawn in 2 s on the landing, and 0 in 2 s after a
  pulsed step has finished.

## Metrics

At 1,280 × 800 CSS px, measured by `atlasProto.census()`. Marks are drawn
shapes on screen with alpha at least 0.2 (foreground at least 0.5); context
counts those between 0.03 and 0.2. Labels are text items drawn on the label
canvas. Chrome counts text items in the panels, rail and key.

| View | Marks (foreground + mid) | Context marks | Canvas labels | Chrome text items |
| --- | --- | --- | --- | --- |
| **Landing, chapter 1** | **57** (17 + 40) | 295 | **9** | **38** |
| Overview (Map), key shown as in the integrated prototype | 592 (367 + 225) | 3 | 37 | 84 (1,348 characters) |
| Overview (Map), key hidden | 592 | 3 | 37 | 56 |

The landing's 57: 8 plates, 8 plate ribbons, 1 card (the evidence), and the
40 panes at 40 %. The overview's 592: 242 cards, 17 class blocks, 40 panes,
8 plates, 43 module ribbons, 12 import lines, 5 clone arches and 225
same-module call strands in pane textures.

Per step:

| Step | Marks | Context | Labels | Chrome |
| --- | --- | --- | --- | --- |
| 1 Package map | 57 | 295 | 9 | 38 |
| 2 Entry surface | 20 | 52 | 12 | 41 |
| 3 Static call path | 31 | 53 | 22 | 42 |
| 4 State and collaboration | 9 | 58 | 43 (class rows and fields) | 45 |
| T1 compile_mesh_inputs | 90 | 81 | 15 | 106 |
| T2 plot_template_dot_array_geometry | 73 | 68 | 32 | 87 |
| T3 prepare_generated_layout | 83 | 88 | 27 | 76 |
| T4 Device.finalize | 27 | 78 | 23 | 73 |
| T5 build_device | 51 | 234 | 24 | 62 |
| T6 FinalizedDeviceGeometry.__post_init__ | 14 | 48 | 18 | 47 |
| 5 Review pressure | 2 | 56 | 6 | 40 |
| Dead band | 29 | 95 | 11 | 44 |
| Clone chords | 64 | 249 | 20 | 49 |
| Load-bearing hubs | 162 | 193 | 29 | 77 |

Tour and review stops carry more chrome text because the panel lists their
functions (35 names for T1).

Transition time, real time in the T3 preview (frames driven by a 30 fps
timer, so about ±33 ms): applying a step takes 2.3 to 8 ms of script, and the
scene is still again (flight, fades, wavefront, class lift; pulses excluded)
371 to 389 ms after the key press, for every one of the 14 transitions. The
flight's 360 ms is the whole budget; fades (300 ms), the wavefront (at most
350 ms) and the class lift (220 ms) end inside it.

`view.json` grows by 45 kB for the guide block (366 to 411 kB). Two runs of
`prepare.py` give byte-identical files.

## Proposed story-schema extensions

The story vocabulary was written for the previous explorer. These additions
would let an author say what a Strata chapter needs; today `prepare.py`
derives each by the rule given. None is implemented in `src/atlas/story.py`
or the schema.

1. **`view.camera`**: `"map" | "face" | "raised" | "axonometric" | "plan"`.
   Reason: the camera is a reading decision. The rule (face when the frame
   stands in one row) cannot know that a chapter about imports wants Plan,
   or that an author wants a two-row pipeline face-on with stubs.
2. **`view.frame`**: a list of module, function or class ids the camera
   frames, when that differs from what is lit. Reason: chapter 5 lights one
   dead function but is about the dead band around it; chapter 4 frames the
   class with its in-row partners. Today both are rules.
3. **`view.signal`**: `"dead" | "clones" | "hubs" | "orchestrators" |
   "import_cycles"`. Lights a whole signal class. Reason: the review stops
   light 5, 8 and 22 functions; `selection` takes one id and `evidence` is
   capped at 12.
4. **`view.ribbons`**: a list of module pairs (`[source, target]`) or package
   pairs to light, the "look at these ribbons" emphasis. Reason: a chapter
   about the coupling between two packages has no key for it; the closest is
   evidence ids, which light functions, not the bundle between modules.
5. **`view.level`**: `"package" | "module" | "function"`, replacing the
   overloaded `structure` for this explorer. Reason: `structure: false`
   meant "repository sunburst"; Strata reads it as package level only by
   convention.
6. **A tour chapter**: `{"id": "pipeline-tour", "kind": "tour", "tour":
   {"stops": [root ids]} }`, or `{"rule": "per-package", "min_reach": 4,
   "new_share": 0.5}`. Reason: the tour's place (before `review-pressure`),
   length and filter are rules today; an author should be able to place it,
   pin stops, or turn it off. Tour stops would not count against the
   20-chapter cap.
7. **Chapter steps**: `"steps": [{"title", "body", "view", "evidence"}]`
   inside a chapter. Reason: "Review pressure" is one chapter with three lit
   stops, each with its own sentence; the schema has one view per chapter.
8. **Explorer-neutral bodies** (a `story.py` wording change, not schema).
   Chapter 1 says "counted in the header" and "the repository view groups
   source files by their architectural role". Strata has neither. Proposed:
   "306 non-test functions form the call map; packages group the source
   files."

## Evidence

All screens are 1,280 × 800 CSS px at pixel ratio 2, from the prototype's
compositor (`shoot.js`, receiver on port 8783).

Landing, chapter 1 (package map at package level, the evidence in a pill):

![Landing](/tmp/atlas-shots/guide/01-landing-chapter1-package-map.png)

Chapter 2, entry surface (`_compiler.py` face-on; `compile_mesh_inputs` and
its 8 callees in the module, cross-file calls hidden because
`cross_file` is false):

![Entry surface](/tmp/atlas-shots/guide/02-chapter2-entry-surface.png)

Chapter 3, static call path with pulses (the trace to
`_reference_lattice_nm` brightest; both evidence ids in pills):

![Static call path](/tmp/atlas-shots/guide/03-chapter3-static-call-path-pulses.png)

Chapter 4, state and collaboration (`_QuantumPetscTransfer` opened with its 14
fields; its two callers in `_thomas_fermi.py` framed with it):

![State and collaboration](/tmp/atlas-shots/guide/04-chapter4-state-and-collaboration.png)

Chapter 5, review pressure (the dead `_build_leaf_hierarchy` lit in the dead
band of `_plan.py`, the ground above it):

![Review pressure](/tmp/atlas-shots/guide/05-chapter5-review-pressure.png)

Tour stop 2, `plot_template_dot_array_geometry` face-on across plotting and
tempura·1, with its functions listed in the panel; and tour stop 4,
`Device.finalize` on its root's row with the stub `→ meshing · tempura·2`:

![Tour stop 2](/tmp/atlas-shots/guide/06-tour-stop2-plot-template.png)
![Tour stop 4](/tmp/atlas-shots/guide/06b-tour-stop4-device-finalize-stubs.png)

Left the path: a click on `build_material_catalog` during chapter 3 selected
it at the same camera; the scope tree replaced the guide panel and the rail
offers "Resume guide":

![Left the path](/tmp/atlas-shots/guide/07-left-the-path-resume.png)

Transition from chapter 1 to chapter 2 at 0, 30, 60 and 100 % of its 360 ms
flight:

![Filmstrip](/tmp/atlas-shots/guide/08-filmstrip-chapter1-to-chapter2.png)

The three review stops:

![Dead band](/tmp/atlas-shots/guide/09a-review-dead-band.png)
![Clone chords](/tmp/atlas-shots/guide/09b-review-clone-chords.png)
![Load-bearing hubs](/tmp/atlas-shots/guide/09c-review-load-bearing-hubs.png)

The overview for comparison (Map, key overlay shown):

![Overview](/tmp/atlas-shots/guide/10-overview-map-with-key.png)

## Rejected options

- **Landing on the whole city with the entry point highlighted.** The
  reader still decodes 592 marks and 37 labels before the highlight means
  anything. The landing is the package map instead.
- **Framing a module chapter by its whole pane.** In chapter 2 the cards came
  out about 60 px wide with truncated names, and in chapter 5 one dead card
  sat in an empty pane. The frame is the lit set.
- **The tour list in the right inspector.** It narrowed the picture to
  620 px; `compile_mesh_inputs` across 7 mesh modules came out at about 20 px
  per card. On the path the guide panel is the inspector and the picture
  keeps 956 px.
- **Axonometric for sets in several rows.** At 47° the vertical cards
  foreshorten and the set spreads over the whole screen (T4, T5). Replaced by
  the raised Elevation and, when most of a pipeline stands in one row,
  home-row framing with labelled stubs.
- **Every pipeline as a stop.** 41 flights, most adding fewer than 5 new
  functions. "At least half new, at least 4 functions" without the package
  rule still gives 13 stops, dominated by electrostatics and plotting.
- **A pill for every lit card.** On T1 eight pills piled up around
  `_compiler.py`. A tour stop names at most one function per module (where
  the pipeline enters it) and the panel lists the rest; other steps keep at
  most 8.
- **A Plan-like camera for the package map** (1.15 rad): the panes flatten
  into strokes and the arcs dominate. 0.98 rad keeps panes legible and the
  plate names clear of the row in front.
- **Leaving on a click on empty ground.** A short orbit drag would leave the
  path by accident.
- **Separate layouts for the two modes.** The picture would shift when the
  reader leaves the path, a move not caused by a step. Both modes share one
  free area; the key is an overlay.
- **Camera presets or emphasis invented in the browser.** That would split
  the reading path between Python and JavaScript. The rules live in
  `prepare.py`, and the extensions above would let the story carry them.

## Limitations

- Chapter bodies are the story's text, written for the previous explorer
  (extension 8).
- Wide packages stay small in a tour: T1's 35 functions across 7 of
  mesh's 13 modules give cards about 30 px wide. Names come from the panel
  list and one pill per module.
- T5 (`build_device`, 5 of 12 functions in another row) and the clone and hub
  stops span several rows and are map-scale pictures. The clone pair inside
  the closed `Device` block is lit on its rows but gets no pill.
- The per-package tour rule gives a single stop on a project with one
  package; it needs a fallback (per module, or the first k by new functions),
  which belongs in the tour extension.
- `source` has no Strata equivalent yet (no source panel).
- Hover still lights things on the path (alpha only).
- `prepare.py` imports `atlas.story.load_story` for validation; outside the
  Atlas environment it only checks the snapshot id.
- Timing comes from the T3 preview, whose frames run on a 30 fps timer.
- three.js still loads from a CDN.

## Data the explorer needs from Python

Phase 2 moves `build_guide` next to the layout in `src/atlas/analyzer/` (or a
`story_view` step after `story_for_snapshot`). It reads the story (validated)
and the snapshot's `architecture.pipelines` and `functions[*].role`, plus the
facts Strata already reads. It emits `guide`:

- `title`, `summary`, `snapshot_id`, `rule` (the text of the rules above),
  `chapters` (count).
- `steps[]`: `id`, `part` (`chapter | tour | review`), `label`, `title`,
  `body`, `evidence` (drawn ids), `scope`, `lod`, `cross_file`, `selected`,
  `lit` (`[id, depth]`), `lit_edges` (`[edge index, depth]`), `lit_classes`,
  `trace`, `trace_edges`, `open`, `pulses`, `signal`, `frame` (`nodes`,
  `classes`, `modules`), `focus` (modules), `camera`, `home_row`, `list`
  (`module`, `name`, `ids`), `marks`.

## How to run

```text
pixi run python -B prototypes/strata-guide/prepare.py [atlas.json] [atlas-story.json]   # writes view.json, byte-identical across runs
pixi run python -B -m http.server 8782 --directory prototypes/strata-guide --bind 127.0.0.1
# http://127.0.0.1:8782/                               lands on step 1
# http://127.0.0.1:8782/#guide=static-call-path        a step
# http://127.0.0.1:8782/#map                           free exploration, whole map
# http://127.0.0.1:8782/?size=1280x800                 fixed frame for screenshots
```

Keys: ← → step · Esc whole map · g resume · k key · 1 2 3 views · p pulses.
`window.atlasProto` adds `steps`, `guide(i, ms)`, `next`, `prev`, `leave`,
`resume`, `toMap`, `census`, `worldSignature`, `camKey`, `clickAt`,
`screenOf`, `motionAudit`, `timings`, `lastTiming`, `stepFilmstrip`,
`pulses` and `renders` to the integrated prototype's hooks. Screenshots post
to `/tmp/atlas-shots/receiver-guide.py` on port 8783.
