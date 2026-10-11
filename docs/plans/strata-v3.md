# Strata v3: per-call lines, a source inspector and two themes, integrated

> Status: Prototype (2026-10-11). Runs on tempura (snapshot version 8, story
> version 2) at `prototypes/strata/`. The previous main prototype is kept
> unchanged at `prototypes/strata-v2/` for comparison. v3 merges three parallel
> tracks onto strata-v2: lines (`strata-lines.md`), inspector
> (`strata-inspector.md`) and theme (`strata-theme.md`), plus the landed Python
> change (snapshot 8 `exported`, story 2 kinds). Nothing under `src/`, `tests/`,
> `schema/` or `README.md` changed, and no track directory changed.

## Answer in brief

- **One prototype, three tracks.** The geometry, line routing, occlusion and
  camera come from the lines track. Colour, the legend and the themes come from
  the theme track. The inspector, `source.json`, the guide click rule and the
  pill-or-frame rule come from the inspector track. Python reads the story the
  inspector track's way, and the browser invents no steps: 13 steps, all from
  `atlas-story.json`.
- **The inspector lights the per-call curves.** Hovering a call site in the
  source puts the call's module pair in focus, so that call's own curve and its
  callee light (`09`). Hovering a card, row or curve in the picture lights the
  source lines that make the call and scrolls to them (`10`).
- **Nothing moves.** One geometry hash, `f4349dc` over 44,250 values, holds in
  45 of 50 checks: overview, Plan, all 8 package scopes, hover on a box and on a
  call, a selection with the inspector open, a hovered source line, the
  inspector resized and closed, a pipeline, both themes, the collapsed legend,
  perspective, key pan and zoom, and every guide step with and without the
  inspector. The other 5 checks are states with an unfolded module. Each equals
  the folded overview's hash with that module left out (`ce6157c5`, `67c09657`,
  `7e900cb2`, `34e2517`, `21efde46`).
- **The guide is inert outside what it lights.** 68 of 68 sampled clicks on
  dimmed marks over the 13 steps left the composited frame pixel-identical, with
  the same camera, step, selection, inspector and hash. 26 of 26 clicks on lit
  marks opened the inspector at the same camera.
- **Idle draws nothing.** 0 frames in 2 s on the landing, on the overview, and
  after a pipeline step's pulses end.
- **Fewer lines cross.** Against strata-v2 on the same data, a package scope
  draws 27 lines instead of 45 and 41 crossings instead of 86. `updates.py`
  unfolded has 16 overlapping pairs instead of 94. The zoomed-out scope hides
  0 in-scope line px instead of 893 (Metrics).

## The integrated design

### Levels, boxes, tiers and palette

| Level | Question | Camera | Tier 1 | Tier 2 | Tier 3 |
| --- | --- | --- | --- | --- | --- |
| Overview | What depends on what, and where are the defects? | Axonometric, perspective | Plates, package names, signal marks | Package-pair ribbons | Module boxes as silhouettes |
| Plan | Which module imports which? | Plan, perspective | Plates, package names | Imports, module names | Boxes, ribbons |
| Package scope | What is this package's surface, and how do its modules call each other? | Elevation, orthographic (`o`: perspective) | Boxes, public rows, module names | Module-pair tracks; per-call curves when a pair is in focus | Plate, out-of-scope outlines |
| Module scope | How does it work inside? | Elevation, orthographic | Cards and class blocks of the unfolded module | Margin lanes, per-call curves to neighbours | Neighbour boxes (tier 2 while they end a curve) |
| Guide step | What the story says at this step | Python's `camera` (`map`, `plan`, `face`, `raised`) | The step's lit marks and evidence | Focus modules | Context, inert to the pointer |

A module is one box in the class block's family (strata-v2): a header, a row
per public name in source order, a hatched tail for the internals, and a dead
row for each dead function. Unfolding grows the box into cards on the module's
own call-depth floors. Unfolding is the only structural change.

Colour follows the theme track. Primer high-contrast neutrals carry the three
tiers. Four reserved hues each have one meaning: load-bearing blue, clone
purple, dead yellow (hatched), import cycle red. Attention (hover, selection,
trace) is the colour with the highest contrast against the canvas. The chrome
uses no accent hue. Bold names mark exported functions. v3 applies the hues to
the other tracks' marks:

- A call between dead functions draws its curve, margin lane or stub in the
  dead hue, dashed.
- An off-row pill and the hover pill carry a bar in the far end's signal hue,
  in the row's grammar.
- The inspector's badges use the theme classes.
- An underlined call site takes its callee's signal hue.
- Source syntax uses weight and lightness only. The inspector track's bluish
  keywords and yellowish strings collided with two reserved hues.

### Legend

The legend is always on, at the bottom left of the stage. It is built from one
table (`MARK_TABLE`) and from presence read off the scene (`drawnMarks`). In
the 16 screenshots with the legend open, its list equals the drawn set. The key overlay (`k`) and the
guide's "In the picture" list are subsets of it. v3 adds the other tracks' marks:

| Id | Legend | Key and guide |
| --- | --- | --- |
| `curve` | call by call | two modules in focus: a curve per call |
| `margin_arc` | margin lane | call inside the module: margin lane |
| `outline` | outside scope | module outside the scope: outline only |
| `call_pill` | hovered call | hovered call: caller → callee pill |
| `stub_pill` | off-row call | off-row call: pill → name · pkg |
| `site_linked` | drawn call | source: underline = a drawn call (hue: callee signal) |
| `site_other` | not drawn | source: dot = external or unresolved call |

The legend collapses to a pill (`Shift+K`); its state is remembered. Scoped
fits (package and module scopes, guide steps, pipelines) frame the subject
above or beside the open legend, whichever keeps the larger scale. Opening or
collapsing the legend moves nothing; the next fit reads its size. The overview
and Plan let the legend overlay a corner of the map.

### Reading path from the story

`prepare.py` validates `atlas-story.json` with `atlas.story.load_story` and
resolves every chapter into a step. It reads each chapter's `kind`: `chapter`,
`pipeline` (the root may be any function or method) or `signal` (`dead`,
`clones`, `load_bearing`, `import_cycles`). It also reads the view keys
`level`, `unfold`, `camera` and `signal`. It adds no tour or review stops. The
path has 4 chapters, 6 pipelines and 3 signals. The rail shows chapters as
numbered segments and pipelines and signals as dots; the panel says, for
example, "Step 7 · pipeline 5 of 6".

The pill-or-frame rule is Python's (`row_rule`, `STUB_SHARE = 1/4`). A
pipeline step whose reach leaves the root's row gets one of two treatments:

- **Frame** (`build_device`, `Device.plan_mesh`): more than a quarter of the
  reach is off the row, so the step frames the whole reach from the raised
  Elevation.
- **Pill** (`build_thomas_fermi_solver`): the step faces the root's row. Each
  call with one end off the row ends in a pill, `→ _raster_cell_indices ·
  mesh`. No line, curve or stub leaves the row, and the section cut stands at
  the root's row.

### The inspector

The inspector is a right-side panel, resizable from 300 to 820 px, with the
width remembered. Its header holds the name, module, line range and badges;
the body holds Python's source excerpt with every call site classified:
`edge` (underlined, linked), `external`, `unresolved`, `recursive` or
`undrawn` (a muted dot). Off the path it shows the selection. On the path it
shows a lit mark the reader clicked, and the step stays. A call site click
opens the callee; Backspace returns. A selected call (from the lines track)
shows both ends and the caller's source.

Picture and source link both ways:

- **Source to picture.** A hovered linked line lights exactly its drawn calls
  and their callees. For a call between modules, Python's per-call curve lights
  (its pair enters focus), not the pair's shared track. Inside an unfolded
  module the margin lane lights. The rest of the lit set steps down to tier 2.
- **Picture to source.** Hovering a card, row, class, box, track or one curve
  lights the lines that make those calls and scrolls the first to a third of
  the panel.

### Per-call lines and occlusion (lines track)

A module pair is in focus when both ends show their rows and any of these
holds: an end is unfolded with its partner in scope, the reader hovers a box
in a package scope, a selection or step lights a call of the pair, the reader
hovers one of its calls, or the reader points at one of its calls in the
source. In focus, each call is its own S-curve from the caller's row or card to
the callee's. Ports are spread by the angle to the far end, and lanes keep
parallel curves apart. Calls inside an unfolded module take margin lanes
(interval colouring); Python widens the margin from the lane count. Hovering
one call isolates it. Every other line falls to tier 3, both ends take the lit
outline, and a pill names `caller → callee` at the first spot clear of both
ends and of every placed name.

Nothing outside a scope hides it. A clipping plane cuts the rows in front of
the scope whatever the camera does, and Elevation also cuts the rows behind.
Boxes outside the scope are outlines that write no depth. Picking ignores
anything beyond the cut planes or the camera's near and far planes, and
outlines are not click targets. This applies the inspector track's fix for
"random jumps" to the lines track's cut. A clone chord whose far end is cut
away or drawn as an outline is not drawn, so no line ends in mid-air.

### Key map and Esc

| Key | Action |
| --- | --- |
| ← → ↑ ↓ | Move the view by 15 % of the picture. In the guide, ← → step and ↑ ↓ move |
| Shift + arrow | Move by 45 % |
| + − | Zoom about the centre (×1.25) |
| Home | Fit again (in the guide: the step's frame) |
| 1 2 3 | Axonometric, Plan, Elevation (off the guide; inert on it) |
| o | Orthographic or perspective Elevation |
| u · e | Unfold the hovered module · open the selected class (off the guide) |
| k · Shift+K | The key overlay · collapse or show the legend |
| t | Dark or light theme (in place; `prefers-color-scheme` decides until the reader chooses) |
| g | Resume the guide |
| p | Replay the pulses of the lit pipeline |
| ? (or h) | The help overlay, generated from `KEYMAP` |
| Backspace | Inspector: back |
| PgUp PgDn | Previous and next guide step |

Esc follows one order everywhere:

1. Close the help or the key overlay.
2. Close the inspector. What is lit stays lit.
3. Clear the reader's selection.
4. On the path, leave the guide one level above the step's scope (a module step
   lands on its package, any other step on the whole map).
5. Go up one scope level: module → package → all packages.

On the path the step's selection is Python's, so Esc never clears it.

### What never moves

- Hover (box, row, card, call, source line), selection, opening, resizing and
  closing the inspector, the theme switch and the legend change colour, width
  and alpha only.
- The camera moves only on a scope change, a view preset, `o`, a pipeline fit,
  a guide step, Map, Resume, Home, the arrow and zoom keys, and the reader's
  own orbit, pan and zoom.
- Pulses run only for an explicit pipeline (a guide pipeline step or `p`) and
  stop after 3 passes or 4 s.
- The legend's scene read (`drawnMarks`, 1.8 to 2.9 ms) runs once, 120 ms after
  the last drawn frame, never inside a frame.

## Conflicts resolved

1. **Base.** `prototypes/strata/` is the lines track's copy. The theme and
   inspector changes were ported onto it. `prepare.py` is the lines track's
   file up to the guide, then the inspector track's guide and `build_source`,
   then the lines track's measure and `build_routes`, and a `main` that writes
   `view.json` (with `routes`) and `source.json`. The lines and theme tracks'
   own story-v2 shims were dropped for the inspector track's reading.
2. **Two hover models.** The lines track isolates a hovered call (others to
   tier 3). The inspector steps the lit set down around what the reader points
   at. Both are kept, and they combine: the slot outlines, card borders and
   names light for either. A source-hovered call puts its pair in focus, so its
   per-call curve lights instead of the shared track. New in v3: a hovered call
   keeps its own pair in focus. Without that, its curve vanished as soon as the
   pointer left the box that had put the pair in focus.
3. **Stubs.** The lines track kept v2's home-row labelled stubs; the inspector
   replaced them with Python's pill-or-frame rule. The pills win: the `home`
   stubs are gone, pill steps also hide the per-call curves of off-row calls,
   and the section cut of a pill step stands at the root's row (`stepScope`).
   Before, the cut followed every focus module, so a row in front could stay
   uncut.
4. **Section cut against picking.** The inspector filtered picks by the near
   plane, which was v2's cut. The lines track moved the cut to clipping planes.
   v3 filters picks by both. The lines track's rule that outlines are not
   targets is kept.
5. **Esc.** Each track had its own order. v3 uses the single order above. The
   inspector track's "× or Esc clears the selection" is dropped: closing the
   panel now keeps the selection lit. Otherwise closing the inspector and
   clearing the selection would be one step and the brief's order would
   collapse.
6. **Keys on the path.** In the lines track 1, 2 and 3 left the guide; the
   inspector made them inert. The inspector wins, so only Esc or Map leaves the
   path; u and e are inert there too. Arrows, + −, Home and o move only the
   camera and stay active on the path.
7. **Legend against fits.** The theme track's legend overlaid the picture's
   bottom-left corner and covered the bottom of `updates.py`'s margin lanes
   (first try of `06`). Scoped fits now frame above or beside it, at the larger
   scale. The overview keeps the overlay; the theme track rejected reserving
   the space there.
8. **Per-frame legend cost.** The theme track ran `drawnMarks` on every
   settled frame, which was most of a hover frame's script time. It is now
   debounced (see What never moves).
9. **Colour literals.** The lines track's call pill and the inspector's pills,
   grip and syntax used fixed dark colours. They now use the theme tokens (`K`,
   `C`, CSS variables), so both themes work. The help overlay is opaque.
10. **Inspector width.** The lines track's fits and pans assumed a 336 px
    panel. They now read the resizable width (`inspPx()`).
11. **Wording.** "Chapter 1 of 13" (the inspector track's numbering on story
    v2) now reads "Step 1 · chapter 1 of 4", like pipelines and signals.
12. **The pipeline list** stays removed (inspector). The lines track's
    occlusion scope for a pulsed selection still applies to `p` and to guide
    pipelines.

Behaviours not kept: 1 2 3 leaving the guide (lines), × or Esc clearing the
selection (inspector), home-row labelled stubs (lines, from v2), the inspector's
hued syntax palette, the every-frame legend scan (theme), and clone chords that
end at a cut-away or outline module.

## Metrics

At 1,280 × 800 CSS px. "v2" is the strata-v2 app on the same snapshot 8 and
story 2 data, with the lines track's measurement hooks only, served from
`/tmp/strata-merge/v2base/` (a copy of `/tmp/atlas-shots/lines-before/`).
`prototypes/strata-v2/` itself still runs on snapshot 7. The columns are:

- **Marks, labels, smallest px:** `census()`, the surface track's rules.
- **Lines, crossings, overlaps:** `metrics.js`. Lines are connection lines at
  alpha 0.1 or more in the picture. Crossings are proper screen intersections
  outside an 8 px shared end. An overlap is a pair of segments within 2 px of
  each other over more than 20 px.
- **Occluded:** in-scope line px that context hides (two-pass key-colour
  render), out of the scope's line px. "n/a" means the view has no scope.

| View | Marks v2 → v3 | Labels | Smallest px | Lines | Crossings | Overlapping pairs | Occluded in-scope px |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01 Landing (step 1) | 112 → 112 | 11 → 11 | 10 → 10 | 8 → 8 | 3 → 3 | 0 → 0 | n/a |
| 02 Overview (Esc from the guide) | 115 → 115 | 8 → 8 | 12 → 12 | 11 → 11 | 10 → 8 | 3 → 3 | n/a |
| 03 Package `electrostatics` | 78 → **61** | 50 → 50 | 9 → 9 | 45 → **27** | 86 → **41** | 75 → **40** | 0 of 8,729 → 0 of 7,426 |
| 03z `electrostatics`, 3 wheel notches out | 83 → 65 | 15 → 15 | 9 → 9 | 45 → 27 | 87 → 41 | 85 → 56 | **893** of 6,936 → **0** of 4,952 |
| 04 `layout`, hover `layout_pipeline.py` | 38 → 40 | 34 → 34 | 9 → 9 | 9 → 9 | 11 → 10 | 3 → **0** | 0 of 5,924 → 0 of 4,617 |
| 05 Package `mesh` | 99 → 73 | 71 → 71 | 9 → 9 | 54 → **28** | 160 → **61** | 178 → **95** | 0 of 10,094 → 0 of 8,198 |
| 06 Module `device.py` | 76 → 73 | 33 → 41 | 9 → 9 | 42 → 32 | 46 → 26 | 26 → **9** | 4 of 5,084 → 0 of 4,041 |
| 07 Module `updates.py` | 81 → 69 | 34 → 40 | 9 → 9 | 48 → 36 | 178 → **72** | 94 → **16** | 3 of 5,459 → 0 of 5,298 |
| 08 Pipeline `compile_mesh_inputs` | 47 → 48 | 15 → 15 | 10 → 10 | 12 → 13 | 4 → **0** | 28 → **4** | 0 of 2,743 → 0 of 1,538 |
| 09 Selection + inspector, `mesh` scope | 45 → 42 | 41 → 37 | 9 → 9 | 9 → 10 | 4 → 0 | 23 → **0** | 0 of 3,561 → 0 of 2,277 |
| 10 Guide `build_device` (frame) | 66 → 51 | 10 → 13 | 9 → 9 | 2 → 2 | 0 → 0 | 0 → 0 | 0 of 3,053 → 0 of 2,793 |
| 11 Guide `build_thomas_fermi_solver` (pill) | 107 → **29** | 14 → 18 | 10 → 9 | 7 → 7 | 11 → **1** | 6 → 1 | 0 of 2,784 → 0 of 3,385 |
| 12 Guide dead code | 33 → 33 | 30 → 30 | 9 → 9 | 1 → 1 | 0 → 0 | 0 → 0 | 0 of 964 → 0 of 577 |
| 13 Guide clone groups | 95 → 70 | 19 → 20 | 10 → 10 | 3 → 3 | 0 → 2 | 1 → 1 | 0 of 563 → 0 of 773 |

What the numbers say:

- **Scopes draw fewer lines and fewer crossings.** Elevation no longer draws
  imports, and the per-call curves and margin lanes replace stacked tracks.
  `mesh` halves its crossings, and `updates.py` loses 78 of 94 overlapping
  pairs.
- **The cut survives the reader's zoom.** `03z` hides 0 in-scope px; v2 hid
  893.
- **Pill steps draw less.** v2 drew 107 marks for
  `build_thomas_fermi_solver`, with the rows in front visible; v3 draws 29
  (the cut, outlines, no off-row lines).
- **Labels never fall below 9 px.** Every view keeps the 9 px floor. Module
  scopes name more cards because neighbours that end a curve rise to tier 2.
- **Clone groups gain 2 crossings.** The chords between groups now cross
  without being dimmed by outline boxes.

Invariance, clicks, idle and cost:

- **Geometry hash.** 50 checks: 45 at `f4349dc` and 5 unfolded states equal to
  their folded references (see Answer in brief).
- **The guide click rule.** A 24 × 16 grid over each of the 13 steps, with up
  to 6 inert and 3 lit targets per step: 68 of 68 inert clicks left the frame
  identical (pixel hash) and 26 of 26 lit clicks opened the inspector at the
  same camera.
- **Idle.** 0 frames in 2 s on the landing, on the overview, and after the
  pulses of `pipeline-prepare-layout`.
- **Determinism.** Two runs of `prepare.py` give byte-identical `view.json`
  (679 kB, 187 kB of it routes) and `source.json` (615 kB).
- **Legend list.** In the 16 screenshots with the legend open (all but 13b,
  14 and the filmstrip), the legend equals the drawn set and the guide's list
  is a subset of it.
- **Cost.** `drawnMarks` takes 1.8 ms (`mesh`), 2.8 ms (overview) and 2.9 ms
  (`updates.py`), most of a forced frame's 2.6 to 3.9 ms of script. It now runs
  off the frame path. Collapsing the legend (13b) left the camera key
  unchanged.

## Screenshots

1,280 × 800 CSS px at pixel ratio 2, dark unless named, in
`/tmp/atlas-shots/strata-v3/`:

- `/tmp/atlas-shots/strata-v3/01-landing-guide-step1.png`: the package map
  step: plates, silhouettes, ribbons, evidence pills, the legend.
- `/tmp/atlas-shots/strata-v3/02-overview-map-esc-from-guide.png` and
  `/tmp/atlas-shots/strata-v3/02L-overview-map-esc-from-guide-light.png`: Esc
  from step 1; the overview with dead bands and clone chords in their hues.
- `/tmp/atlas-shots/strata-v3/03-package-electrostatics-ortho.png` and
  `/tmp/atlas-shots/strata-v3/03L-package-electrostatics-ortho-light.png`: the
  orthographic package scope, rows whole at 9 px or more, outlines outside.
- `/tmp/atlas-shots/strata-v3/04-two-modules-per-call-curves-layout.png`:
  hover `layout_pipeline.py`; `prepare_layout` → readers and → `extraction`,
  one curve per call between named rows.
- `/tmp/atlas-shots/strata-v3/05-hover-isolates-one-call-pill.png`: one call
  isolated, both ends outlined, the pill clear of every name.
- `/tmp/atlas-shots/strata-v3/06-updates-unfolded-margin-lanes.png`:
  `updates.py` unfolded beside the legend, margin lanes, curves to neighbours.
- `/tmp/atlas-shots/strata-v3/07-guide-build-device.png` (frame step, raised
  Elevation) and `/tmp/atlas-shots/strata-v3/16-guide-build-device-light.png`.
- `/tmp/atlas-shots/strata-v3/08-guide-build-thomas-fermi-solver-pill.png`:
  the pill step; `→ _raster_cell_indices · mesh` under `_quantum_response.py`.
- `/tmp/atlas-shots/strata-v3/09-inspector-compile-mesh-inputs-hover-site-curve.png`:
  `_compiler.py` unfolded, inspector open; line 246 hovered lights the curve
  from the `compile_mesh_inputs` card to `compile_interface_boxes`.
- `/tmp/atlas-shots/strata-v3/10-hover-card-lights-source-lines.png`: the
  pointer on the `_clip_boxes_to_bounds` card; line 250 lights and scrolls
  into view, its margin lane lights.
- `/tmp/atlas-shots/strata-v3/11-guide-signal-dead-code.png` and
  `/tmp/atlas-shots/strata-v3/12-guide-signal-clone-groups.png`.
- `/tmp/atlas-shots/strata-v3/13-legend-expanded-mesh.png` and
  `/tmp/atlas-shots/strata-v3/13b-legend-collapsed-mesh.png` (same camera).
- `/tmp/atlas-shots/strata-v3/14-help-overlay.png`: the merged key map and the
  Esc order.
- `/tmp/atlas-shots/strata-v3/15-filmstrip-arrow-key-pan.png`: fit, →, →, ↓;
  the hash is unchanged in all four frames.

## Deferred

- **The picture beside the inspector is narrow.** A package scope reframed
  beside the open panel can drop to 10 px per unit (`mesh`). `09` uses the
  module scope and one → step. A per-scope frame that drops neighbours while
  the panel is open would help.
- **The legend's size at fit time** is the previous view's: the legend
  refreshes after the picture settles. The fit tests the subject's bounding
  box, which is conservative for sparse guide frames.
- **Lit rows too narrow for their names** in raised frames get one pill per
  module (v2's rule). `materials.py` in `build_device` shows a lit slot with no
  name next to the `_positive` pill.
- **Port labels** can stack when zoomed out (`← layout`, `→ mesh · tempura·2`;
  lines track limitation). `linear_dot_array.py` needs 18 margin lanes at about
  1.5 px pitch.
- **The hover pill** in a dense scope can rest on box headers when no spot is
  free (it never covers a name; `05`).
- **Red is untested on screen**: tempura has no import cycle.
- **`source.json` loads at boot** (615 kB); lazy loading per module is open.
- **Screen assumptions in Python** (`FRAME_PX`, `SCALE_CAP`, `CARD_CHAR_U`, the
  9 px floor) describe a 1,280 × 800 frame with a 300 px panel.
- **Prototype tooling.** three.js comes from a CDN. The T3 preview tab is
  hidden and never fires `requestAnimationFrame` (a 30 fps timer stands in).
  `/tmp/atlas-shots/serve-v3.py` is `http.server` with `Cache-Control:
  no-store` and a `/_v2/` mount for the baseline. `metrics.js`, `measure.js`
  and `views.js` are measurement-only and are not loaded by `app.js`.

## Data the explorer needs from Python

Phase 2 moves `prepare.py` into `src/atlas/analyzer/` (next to `layout.py`) and
the guide into `atlas.story`. Marks: **[src]** already in `src/atlas`;
**[proto-py]** computed in prototype Python (`prepare.py`) and still to move;
**[browser]** still computed in `app.js`.

Inputs the prototype reads:

- **[src]** Snapshot 8: `model.layout` (`columns`, `bundles`, `imports`,
  `import_cycles`, `nodes[*].row`, `classes[*].row`, `dead_row`),
  `model.edges[*].kind` and `.back`, `model.nodes` with `exported` and
  `exported_from`, `model.clones`, `model.wrappers`, `model.tree`,
  `snapshot.objects` (with `exported`, `exported_from`, `source_excerpt`),
  `snapshot.symbols`, `snapshot.files`, `architecture.pipelines`,
  `architecture.functions[*].role`. Call records carry no column range.
- **[src]** Story 2 (`atlas.story.load_story`): chapters of kind `chapter`,
  `pipeline` (`pipeline_root` any function or method) and `signal`, view keys
  `level`, `unfold`, `camera`, `signal`, plus evidence, title and body.

Outputs the explorer needs (`view.json`, `source.json`):

- **[proto-py]** Placement: placement B rule text, flow, rows, plate order,
  corridor sizes, dropped module-graph pairs, module slots, in-plate order,
  placement metrics.
- **[proto-py]** Type calibration per package: `line`, `char_u`, `scale_px`,
  `pitch`, `frame_extra`, `split`, plus the constants (`FRAME_PX`,
  `TYPE_FLOOR`, `CHAR_EM`, `SCALE_CAP`, `STUB_STREET`, `CARD_LINE`,
  `CARD_CHAR_U`, …).
- **[proto-py]** `floors`, `dims`, `districts`, `plates` (with ports), `tree`.
- **[proto-py]** `panes` and `box` (rows with `lines`, `more`, `tail`,
  `ghosts`, `open_h`, `card_w`, `dead_top`), and the lines track's `margin`
  and `lanes` per unfolded pane (`column_lanes`, asserted equal in
  `box_layout` and the routes).
- **[proto-py]** `nodes` (flags, ranks, slot, card geometry, `lines`,
  `exported`, `exported_from`), `classes` (rows, block geometry, expanded size,
  `exported`, `exported_from`), and rows carrying `exported` for the bold name.
- **[proto-py]** `edges` (s, t, kind, back, span, ms, mt, ss, ts, dead, cls),
  `bundles`, `links`, `plate_bundles`, `imports`, `clones`, `reach`, `callers`,
  `pipelines`, `summary`.
- **[proto-py]** `routes` (lines track): per plate `band_top`, `sky_base` and
  lane count; one path per link and per ribbon; per call and per end-state
  variant (`f`, `o`, `x`) the `curve`, `track`, `margin` and `loop` paths in
  the 10-number piece format; `routes.margin` (lanes, pitch, width per
  module); `routes.rule` and `routes.constants`.
- **[proto-py]** `guide`: title, summary, snapshot id, rule, chapters, and
  `steps[]` with id, part (from the story's kind), label, title, body,
  evidence, scope, lod, cross_file, selected, lit, lit_edges, lit_classes,
  trace, trace_edges, open, pulses, signal (story values, `load_bearing`),
  frame, camera, home_row, list, `unfold`, `focus`, `marks`, and the stub rule's
  `stub` (`pill | frame | null`), `pills` (edge, at, dir, other, name,
  package) and `off_edges` (`STUB_SHARE = 1/4`).
- **[proto-py]** `source.json` (inspector): per drawn function and class,
  `file`, `start`, `end`, `text` and `sites` `[line, first column, end column,
  kind, edge index, called name]` with kind `edge | external | unresolved |
  recursive | undrawn`; `counts` and the rule text. Better: the analyzer's call
  records should carry the call's column range from the AST so no regular
  expression is needed **[src, missing]**.
- **[proto-py, candidate]** `view.legend`: the mark table's ids and words
  (theme track), so the explorer and the report share one vocabulary. Python's
  `step.marks` should either follow the renderer's rules or be dropped: the
  guide's list is now the drawn set filtered by section.
- **[browser]** Interaction-only lookups, which stay in the browser:
  - which module pairs are in focus (hover, selection, source hover, hovered
    call);
  - which path variant to show (fold and open-class state);
  - mark presence for the legend (`drawnMarks`);
  - label, callout and pill placement;
  - the legend-avoiding fit;
  - a pill step's cut row (`stepScope`, from Python's `home_row` and `focus`);
  - a call's far-end signal for pill bars (from Python's node flags).
- **[browser]** Screen-space constants Python cannot know yet: the inspector
  width, the legend box, and the frame size. The explorer should pass its frame
  to the layout step (see Deferred).

## How to run

```text
pixi run python -B prototypes/strata/prepare.py   # view.json and source.json, byte-identical across runs
pixi run python -B -m http.server 8768 --directory prototypes/strata --bind 127.0.0.1
# (or: pixi run python -B /tmp/atlas-shots/serve-v3.py 8768 prototypes/strata /tmp/strata-merge/v2base  # no-store, /_v2/ baseline)
# http://127.0.0.1:8768/?size=1280x800                 lands on step 1 of the guide
# http://127.0.0.1:8768/?size=1280x800&theme=light     forced theme
# http://127.0.0.1:8768/#scope=package:tempura.mesh&sel=node:tempura.mesh._compiler.compile_mesh_inputs
pixi run python -B /tmp/atlas-shots/receiver-v3.py   # port 8769, writes /tmp/atlas-shots/strata-v3/
```

`window.atlasProto` carries the three tracks' calls: `hoverCall`,
`focusPairs`, `curves`, `key`, `proj`, `camera`, `help` (lines); `setTheme`,
`themeCheck`, `drawnMarks`, `legend`, `legendShown`, `guideShown`,
`updateMarks` (theme); `inspect`, `closeInspector`, `inspectorBack`,
`setInspectorWidth`, `hoverSource`, `clickSite`, `sourceState`, `pointer`,
`pickAt`, `pills`, `frameHash`, `shootRow` (inspector). It also keeps v2's
`census`, `geomSignature(skip)`, `camKey`, `renders` and `shoot`. Measured
views: `const v = await import('./views.js'); v.V.mesh();` and
`(await import('./metrics.js')).lineMetrics({ scope })`.
