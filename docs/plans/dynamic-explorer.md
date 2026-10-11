# Strata: a three.js explorer (3D track)

> Status: Prototype (2026-10-09). Runs on tempura at
> `prototypes/dynamic-explorer/`; nothing under `src/` changed. This is the
> 3D/WebGL track. The 2D kinetic grid
> (`prototypes/kinetic-grid/`) and the references digest
> (`explorer-references.md`) are separate tracks; this plan answers the
> digest's case against 3D (its section 5) with screenshots, not opinion.

## Goal

The owner asked for an explorer that is "more dynamic and visual, perhaps
three JS", with every level of connection visible and distinguishable. This
track tests whether three.js earns its place for Atlas. The test case is
tempura: 306 call-map functions, 300 resolved calls, 39 modules with code, 17
classes, 5 dead functions, 3 clone groups, and no import cycles.

The result is one 3D model of the snapshot, called Strata, read through three
architectural projections: Axonometric, Plan, and Elevation. Python computes
every coordinate and every semantic fact. The browser draws the model, moves
the camera, and changes emphasis.

## Answer in brief

- **3D earns its place for orientation, scope transitions, and keeping
  connection levels apart.** It does not earn it for reading names, so Strata
  reads face-on: the Elevation is a section view that looks like a 2D grid.
- **What 3D adds that the 2D grid lacks:**
  - Packages stand in rows on a ground plan, so the overview is 1.7:1 instead
    of a 3:1 strip of 39 columns.
  - Every connection level has its own place in space.
  - A scope change is a camera flight in which nothing else moves.
  - Opening a class lifts its block toward the reader instead of reflowing
    the column.
- **What it costs:**
  - About 830 KB of minified three.js plus addons, which needs a one-off
    bundling step to load from `file://`.
  - Tilted text in oblique views.
  - About 23 ms per overview frame at 1,382 draw calls, which needs batching
    before large repositories.
- **Recommendation.** Strata is the stronger picture for a first look and for
  moving between scopes. The 2D grid is cheaper and equally legible for
  reading.
  - If the owner wants a single zero-dependency geometry, the 2D track should
    take four ideas from this one: cross-package calls in a lane above the
    columns, imports in their own ground lane, section-style scope changes
    that hide what is out of scope, and the lifted class block.
  - If the owner likes these pictures, Strata is buildable as specified below.

## References borrowed

The references track owns the survey. Strata borrows from these sources:

- **GitHub, "How we built the GitHub globe"**
  (https://github.blog/engineering/how-we-built-the-github-globe).
  - Borrowed: cubic Bézier arcs lifted above the surface for long-distance
    relations, and pulses that travel along a selected arc.
  - Borrowed for phase 4: quality tiers when the frame rate drops (lower
    pixel ratio, fewer marks). Rendering only when something changes is
    Strata's own rule.
  - Rejected: the halo, the bloom, and the always-on animation.
- **CodeCity**, Wettel and Lanza, VISSOFT 2007
  (https://www.si.usi.ch/assets/publications/conf/vissoft/vissoft2007/WettelL07.pdf).
  - Borrowed: packages as districts on a ground plan.
  - Rejected: metric heights, because Atlas dropped metric encodings, and
    buildings as opaque volumes. The paper itself calls edges between
    buildings "not a feasible solution" because of occlusion, so Strata's
    units are glass panes that carry their calls on their faces.
- **Munzner, "No unjustified 3D"**, Visualization Analysis and Design, 2014
  (https://www.cs.ubc.ca/~tmm/vadbook/).
  - Taken as a constraint, not an obstacle. The reading view is face-on with
    perspective nearly flat, and text is never a 3D mesh.
- **Ware and Franck 1996**, ACM TOG 15(2), doi:10.1145/234972.234975.
  - Motion parallax is the strongest depth cue for path tracing in 3D
    graphs. Borrowed as orbit on demand: a drag shows depth when the reader
    wants it.
  - Rejected: idle rotation.
- **Bostock, "Object Constancy"** (https://bost.ocks.org/mike/constancy/).
  - Borrowed: a scope change keeps every mark where it is and moves only the
    camera, so the reader can track what they were looking at.
- **Architectural drawing conventions** (plan, elevation, axonometric,
  section).
  - Borrowed: one model read through standard projections. The near and far
    clipping "section slab" is a section cut.
- **three.js r185** (https://github.com/mrdoob/three.js), MIT.
  - Measured sizes: `three.module.min.js` is 365,552 B and
    `three.core.min.js` is 385,390 B. r186 dropped the minified builds.
  - Addons used: OrbitControls and the `Line2` family for wide and dashed
    lines.
- **troika-three-text**.
  - Rejected for SDF text in the scene. Labels are drawn on a 2D canvas over
    the WebGL canvas, at fixed screen size, so they stay crisp at every zoom
    and need no font atlas or worker.
- **Visual tokens from `explorer-references.md` section 4**: palette,
  brightness-only emphasis, motion budget, and fill patterns. Adopted with the
  deltas listed below.

## Design decisions

### One model, three projections

- **Ground plan.** Each package is a district: a plate on the ground.
  - Districts stand in rows, in sidebar tree order, wrapped into four rows by
    width.
  - The ground plan answers "where does this module live".
- **Panes.** Each module is a vertical glass pane standing on its district
  plate.
  - The pane's height axis is call depth. The top floor is the entry surface
    and each lower floor is one rank deeper (longest path from a root, the
    grid plan's rule). Floors are global, so depth reads level across a whole
    row.
  - A pane starts at its shallowest content. The skyline therefore shows
    which modules expose an entry surface (tall panes) and which are inner
    infrastructure (short panes).
- **Ground and basement.** The ground sits below the deepest live floor.
  - Dead code hangs below the ground in a dashed basement under its own pane,
    as outline-only cards.
  - Seen from above, a ground veil covers the basement, so dead code reads as
    buried.
- **Axonometric (key 1).** The overview, seen from 38° above and 17° to the
  left.
  - Rows stand 16 units apart, so a back row clears the row in front of it.
  - Reading level: orientation. District names, module names, signal marks,
    and the shape of the city.
- **Plan (key 2).** The camera looks straight down.
  - Plates, pane footprints, and module names are visible. The plan
    foregrounds the ground: imports, which are the module-dependency level.
  - Calls dim to 10 %.
- **Elevation (key 3).** The scope is seen face-on through a section slab.
  - The near plane cuts away district rows in front of the scope. The far
    plane cuts away rows behind it.
  - Reading level: names. Face-on, this view looks like the signal grid,
    with depth cues on top.

### Connection levels and their places

Each level has its own place in space plus at least one more channel: line
style, colour, or an end mark. Every row below is drawn by the prototype and
named in its key.

| Level | Place in space | Line or mark | Shown in |
| --- | --- | --- | --- |
| Package contains module | District plate on the ground; label on the plate's front edge | Plate outline `rule` | All views |
| Module contains function | Glass pane standing on the plate; name on its rim | Pane frame and brighter top rim | All views |
| Module contains class | A block, a real volume on the pane's face, at its shallowest public floor | Box edges `border`; header band | All views |
| Class contains method | Rows on the block's front face: constructor first (with parameters), public methods in source order | Teal bar for load-bearing; violet dotted underline for clone | Elevation |
| Private internals | Hatched tail at the bottom of the face; opening lifts the block 1.4 units toward the reader and unfolds the private rows below a hatched divider | Hatch | On demand |
| Call, same file | On the pane, behind the cards | Solid 1 px `edge`; luminance taper, bright at caller | Elevation, Axonometric |
| Call, across files in one package | Lifted off the pane; the bulge grows with the horizontal distance | Solid 1.5 px, one step brighter | Elevation, Axonometric |
| Call, across packages | Arc over the skyline from one district row to another | Solid 1.3 px, brightest resting grey | Axonometric |
| Call into a class from outside | Ends horizontally on the block side at the method's row (or the constructor row) | Port square at the end | Elevation |
| Call inside a class | Loop on the block's left edge between rows | Solid 1 px; open blocks only | Open class |
| Import (module to module) | Line on the ground between pane feet; within a package it bows into the plate's front strip, across packages it runs through the street between rows | Dashed, arrowhead at the imported module | Plan (foregrounded); Axonometric (60 %) |
| Import cycle | Same ground line | Red dashed, 1.5 px | None in tempura (the key says so) |
| Clone group | Arch between consecutive members, bowing up and toward the reader | Violet dotted; member outline violet dotted | All views |
| Class state | State column of the open block; method-to-field links | `◆` owned, `◇` injected; solid writes, dashed reads | Open class |
| Pipeline (reach from a root) | Python's reach set lit in place | Brightness `#f5f8fc`; wavefront, then pulses caller to callee | On selection |
| Dead | Basement under the ground | Dashed outline, no fill, ghost text; incident edges dashed at 40 % | Elevation; veiled from above |
| Calls leaving the scope | Edges with one end in the slab | Fade to the background along their length toward the cut-away end | Scoped Elevation |

Signals (load-bearing, clone, dead, entry surface, wrapper) keep the
references-track marks: teal outline and bar, violet dotted outline, dashed
ghost, bold name, half-height card.

### Motion rules

- **What animates:**
  - Explicit camera moves. Scope change or "go to": 360 ms ease-out. Preset
    change (a rotation of up to 80°): 700 ms.
  - Scope fades: 320 ms.
  - Emphasis: highlights switch on at once and fade out in 150 ms.
  - Opening or closing a class block: 220 ms lift.
  - Pipeline selection: a wavefront of 35 ms per call depth (at most 350 ms),
    then pulses for three passes or four seconds, whichever ends first. The
    `p` key replays them.
  - Orbit, when the reader drags.
- **What never moves:**
  - No card, pane, plate, or edge moves on hover, selection, inspector,
    sidebar, or key.
  - The camera never moves on hover or on a click in the picture. Only scope
    changes, view presets, and the pipeline list fit the camera.
  - An idle scene renders nothing.
- **Reduced motion.** With `prefers-reduced-motion`, the camera jumps, fades
  become 100 ms crossfades, and the wavefront and pulses are off.

### Semantic zoom

Thresholds use the projected size of each mark, not a global zoom level.

- **Far.** The Axonometric overview, or a large package in Elevation.
  - Cards are tiles that keep their marks.
  - Blocks read as volumes. District and module names show; card names
    appear only in the hover tooltip.
- **Middle.** A card at least 8 px tall carries its name.
  - The font first shrinks toward 7 px to fit the whole name.
  - If at least 7 characters still fit, the name is truncated with an
    ellipsis. Otherwise no name is drawn.
- **Near.** Module scope or zoom: full names, block rows, and the open
  block's state column.
- **Selection callouts.** Lit cards too small for an in-card name get a pill
  callout.
  - Callouts are placed in call-depth order, so the root and its first calls
    win any collisions.

### Classes stay compact

- A class is one block: constructor and public methods on the face, private
  methods as a hatched tail.
- Data-only classes show their fields on the face.
- Opening a block is the only structural motion:
  - The block lifts toward the reader and unfolds in place over its
    neighbours, which keep their positions.
  - Labels behind the open block are hidden by it.
  - The camera re-fits only when the reader asks (key 3).

## Evidence on tempura

Screens were captured at 1280×800 CSS px with the prototype's compositor,
which paints the WebGL canvas, the label canvas, and the panels into one PNG.

Overview (Axonometric). Four district rows, module names on pane rims,
cross-package arcs over the skyline, class blocks as volumes (`specs.py` front
right, `Device` centre):

![Overview](/tmp/atlas-shots/proto/01-overview.png)

Scoped package (Elevation of `layout`, section slab). Names readable, teal
load-bearing bars, the `read_gds_layout`/`read_oas_layout` clone arch, and
cross-package calls fading upward out of the slab:

![Layout scope](/tmp/atlas-shots/proto/02-scope-layout.png)

Hover. `prepare_layout`'s incident calls light up and a full-name tooltip
appears. Nothing moves:

![Hover](/tmp/atlas-shots/proto/03-hover.png)

Selected pipeline across packages (`build_thomas_fermi_solver`, picked from
the pipelines list). The call into `mesh._raster_edits` flies over the
skyline to the row behind. The inspector notes 4 unresolved calls that are not
drawn:

![Pipeline across packages](/tmp/atlas-shots/proto/06-pipeline-cross-package.png)

Selected pipeline in one package (`compile_mesh_inputs`, face-on, lit cards
named by callouts). Python's reach is 34 functions below the root; see the
data findings:

![compile_mesh_inputs](/tmp/atlas-shots/proto/07-pipeline-compile-mesh-inputs.png)

Expanded class (`Device`, module scope). The block lifts forward and shows
constructor and public rows, a hatched divider, 8 private rows, intra-class
loops on its left edge, a state column, and method-to-field links. The port on
`__init__` is where a constructor call enters:

![Device open](/tmp/atlas-shots/proto/08-class-open-device.png)

Owned collaborators (`_QuantumPetscTransfer`, opened, then re-fitted with key
3). Eight fields are marked `◆` owned:

![Owned fields](/tmp/atlas-shots/proto/11-class-open-owned-fields.png)

Dead band (`mesh._plan` module scope). Three dead private functions sit as
ghost cards in the basement below the ground line:

![Dead band](/tmp/atlas-shots/proto/05-module-dead-band.png)

Plan (imports). Hovering the `_compiler.py` foot lights its dashed import
lines to the other mesh modules:

![Plan imports](/tmp/atlas-shots/proto/09-plan-imports.png)

Scope transition, slowed to 3 s for capture (normally 360 ms). Other rows
fade, the camera turns and drops face-on, and the section slab cuts the rest:

![Flight filmstrip](/tmp/atlas-shots/proto/12-flight-filmstrip.png)

Limits, shown honestly:

- A large package at package scope is a far view. `electrostatics` (9 modules)
  shows name stems; `mesh` (13 modules) shows tiles only.
  ![Electrostatics](/tmp/atlas-shots/proto/04-scope-electrostatics.png)
  ![Mesh far](/tmp/atlas-shots/proto/13-scope-mesh-far.png)
- An oblique close-up keeps the picture spatial, but every name is printed on
  a tilted face. That is why reading happens in Elevation.
  ![Oblique](/tmp/atlas-shots/proto/10-axo-electrostatics-oblique.png)

## Answers to the case against 3D (explorer-references.md section 5)

1. **"No honest third variable."**
   - Partly agreed. Strata's depth is not a data variable. It is the second
     axis of a ground plan of packages, plus separate places for connection
     levels (pane, lifted, sky, ground, inside the block).
   - A 2D grid can also wrap its columns into rows. The difference is what
     happens to calls between rows. In 2D they cross the rows in between; in
     Strata they arc over them, and the section slab removes other rows when
     a scope is read.
   - Evidence: 01 against `/tmp/atlas-shots/grid-all.png`, the 2400×818 strip
     of 39 columns.
2. **"The content is text."**
   - Text is never a 3D mesh. It is drawn on a 2D overlay at fixed screen
     size and culled by projected size.
   - In Elevation it reads like 2D (02, 03, 05, 08, 11).
   - In oblique views it tilts with the faces (10). It stays legible there,
     but slower to read, so oblique views are for orientation.
3. **"3D needs movement, and orbiting moves every mark."**
   - Agreed that orbit moves everything. In Strata, orbit is a reader action,
     never a default.
   - Hover and selection never move the camera (03, 06, 07; 06 and 07 were
     fitted from the pipeline list, an explicit go-to).
   - The two reading presets (Elevation, Plan) need no orbit.
4. **"The layered structure collapses in 3D."**
   - Not with Python-computed floors. The floors are the grid's rows, and
     Elevation shows them face-on (02).
   - The 3d-force-graph failure the digest cites is a force-layout failure,
     not a 3D one.
5. **"Delivery cost."** Agreed, and measured:
   - three r185 minified core: 751 KB (365,552 B + 385,390 B).
   - Addons used: 78 KB unminified (OrbitControls 40,504 B; Line2,
     LineSegments2, LineMaterial, LineGeometry, LineSegmentsGeometry together
     37,355 B).
   - That is about 4 times the 200 KB budget. The prototype's own code is
     74 KB unminified, 23 KB gzipped.
   - See Vendoring.
6. **"Scale does not require WebGL."**
   - Measured in the T3 preview (Electron 44, Chrome 152): render plus labels
     take about 23 ms per overview frame, at 1,382 draw calls and 766 line
     materials.
   - A scoped Elevation takes 2.9 ms per frame. An idle scene costs nothing.
   - At 10,000 functions Strata needs instanced cards and merged line batches.
     three.js has both (`InstancedMesh`, one `LineSegments2` per style with
     per-vertex colour), but the prototype does not use them.

## Deltas from the references-track tokens

- **Adopted:**
  - Canvas `#0b1016` and the neutral ramp. Only teal `#29a895`, violet
    `#936dd9`, and red `#d33a3c` carry hue.
  - Emphasis is brightness `#f5f8fc`.
  - Load-bearing is a neutral card with a teal outline and bar.
  - Dead is outline-only with ghost text.
  - `◆`/`◇` collaborator glyphs; intra-class calls only in open blocks.
  - Durations: 150 / 220 / 320 / 360 ms.
  - Pulses capped at three passes or 4 s; no idle animation; reduced motion.
- **Changed:**
  - **Taper becomes a luminance gradient.** `LineMaterial` lines have
    constant width, so direction is bright at the caller and dim at the
    callee.
  - **Clone links are arches, not straight chords.** A straight chord in 3D
    passes through panes. The arch bows toward the reader and keeps the
    violet dotted style.
  - **Field access is drawn as links, not a glyph strip.** Writes are solid
    and reads dashed, inside the open block only.
  - **Intra-class loops sit on the left edge.** The right side of an open
    block holds the state column.
  - **Preset rotations take 700 ms.** An 80° turn in 360 ms is too fast to
    follow. Scope fits keep 360 ms.
  - **Fog is kept as a depth cue in Axonometric.** The section slab makes it
    irrelevant face-on.
  - **Imports live on the ground, not in a lane above the headers.** In plan
    view the ground lane plays the role of the import lane.

## Data plan

Snapshot version 6 to 7. `build_model` gains a `view` block, which
`prototypes/dynamic-explorer/prepare.py` stands in for today. It reuses
`model._import_target` and `imports.resolve_from_base` rather than
re-implementing them. The renderer looks values up and computes no graph
property.

```text
model.view
  floors:     {count, tops[], heights[], ground, basement}   # global call-depth floors
  dims:       {card_w, card_h, box_w, box_head, box_row, box_field, box_tail, box_d, expand_lift, ...}
  districts:  [{package, name, x, z, row, w, modules[]}]     # ground plan, tree order, wrapped rows
  panes:      [{module, district, x, z, w, top, bottom, dead_bottom, rollups}]
  nodes:      [{id, rank, x, y, z, w, h, cls, root, dead, lb, hub, orch, wrapper, clone, ...}]
  classes:    [{id, module, x, y, z, w, h, d, rank, ctor, public[], private[], dead_private[],
                fields[{name, kind: owned|injected|null}], access{method: {reads, writes}},
                expanded: {w, h, lift}}]
  edges:      [{s, t, level, span, via, dead, cls?}]
              # level: same_file | cross_file | cross_package | class_boundary | intra_class
              # span:  pane | district | city   (routing hint from the layout)
              # via:   call | constructor
  imports:    [{s, t, count, cycle, span}]                   # module pairs, both ends drawn
  clones:     [[id, ...]]
  reach:      {id: [[node_index, bfs_depth], ...]}           # downstream set, uncapped
  callers:    {id: [id, ...]}
  pipelines:  [{root, title, listed, reach}]
```

Rules:

- **Ranks.** The grid plan's rule: depth-first cycle breaking from sorted
  roots, then the longest path. Dead nodes are not ranked; they go to the
  basement.
- **Pane placement.** Class blocks take lanes at their floor and hang down.
  Cards go right of any block that overlaps their floor, in source order, at
  most 3 per sub-row.
- **District rows.** Packages are taken in tree order and wrapped by width
  into 4 rows, 16 units apart.
- **Data-only classes** sit one floor below their shallowest constructor
  call, or on the top floor if nothing constructs them.
- **Determinism.** Coordinates are rounded to 3 decimals. Two runs produce
  byte-identical `view.json` (checked).

Findings from building the block (both affect any explorer):

- **`model.edges` drops resolved constructor calls.**
  - A call to `Potential(...)` resolves to the class id, which is not a
    callable, so it never becomes an edge. tempura has 16 such calls from
    call-map functions.
  - The view adds 14 of them as `class_boundary` edges into the constructor
    row. The other 2 are a class constructing itself (`Potential.evaluate`,
    `Strain.with_element_strain`).
  - Without them, tempura has zero calls into a class from outside.
- **`architecture.pipelines` is capped at 24 nodes** (`MAX_PIPELINE_NODES`).
  - `compile_mesh_inputs` reaches 35 functions but lists 24;
    `plot_template_dot_array_geometry` reaches 25 but lists 24.
  - The 35-versus-24 mismatch that `signal-grid-explorer.md` blames on
    `app.js` comes from this cap.
  - The view's `reach` is uncapped. The inspector says when the pipeline
    list is truncated.

## Interaction contract

- **Click a card or class row:** selects it.
  - Python's reach set and the direct callers light up; everything else dims
    to 30 %.
  - The wavefront and pulses run once (three passes, at most 4 s). The camera
    does not move.
- **Click a block header:** selects the class (its methods' reach, plus its
  constructors' callers).
  - Click it again, or the hatched tail, or press `E` to open or close it.
- **Hover:** incident calls light up. A tooltip appears when the name is not
  fully printed.
  - Hovering a pane lights its imports.
- **Scope:** the tree, the breadcrumb, or a click on a pane.
  - The camera flies to the scope's Elevation, other districts fade, and the
    section slab applies.
  - `Esc` steps back: selection, then module, then package, then all
    packages.
- **Pipelines list:** selects the root and fits its call tree. The fit is
  face-on when the tree stays in one package; otherwise it is axonometric.
- **Views:** `1` Axonometric, `2` Plan, `3` Elevation. Each re-fits the
  current scope.
- **Camera:** drag orbits, right-drag pans, wheel zooms. Any manual camera
  move cancels the section slab and the automatic re-fit on resize.
- **State in the hash:** `scope`, `sel`, `open`, `view`. A reload restores
  the same picture.

## Vendoring

Atlas must open from `file://`, where ES modules and import maps do not load.
The current explorer already ships ELK as one classic script.

- Bundle once, on a machine with working Node, into
  `src/atlas/explorer/static/src/three.bundle.js`. Use an entry file that
  re-exports only the symbols used: core plus OrbitControls and the five
  `Line2` modules. Command:
  `npx esbuild entry.js --bundle --format=iife --global-name=AtlasThree --minify`.
- Commit it next to a `three.LICENSE.md` (MIT), as `elk.LICENSE.md` is
  today. Load it with a classic `<script>` before `app.js`, and add it to the
  dashboard's asset allowlist.
- The references track measured a minimal IIFE at 537 KB raw / 134 KB gzip,
  without the addons.
- Rejected: requiring the dashboard's HTTP server for module loading, which
  would drop `file://`.

## Phases

1. **Python view block.**
   - Work: add `build_view` in `src/atlas/analyzer/model.py` (ranks, ground
     plan, pane placement, edge levels including constructor edges, imports,
     reach). Bump `SNAPSHOT_VERSION`; extend `schema/atlas.schema.json`.
   - Tests: ranks, basement, edge levels on a fixture with each level,
     constructor edges, reach versus pipelines, determinism.
   - Exit: `view.json` for every fixture validates.
2. **Vendored three.js.**
   - Work: the bundle and its licence. A size decision against the 200 KB
     budget is needed from the owner.
3. **Renderer.**
   - Work: port the prototype into `src/atlas/explorer/static/src/` in place
     of the sunburst, Origin, and Pipeline geometries. Keep the inspector,
     review, Guide, and shortcuts. Replace the CDN import map.
   - Exit: the explorer contains no reachability or classification code.
4. **Scale pass.**
   - Work: instanced cards, one line batch per style, label culling by
     viewport. A synthetic 10,000-function snapshot must hold 50 fps on pan
     and zoom.
5. **Verification on tempura.**
   - Work: the screenshot set above, checked against the acceptance list.

## Acceptance criteria

- Every connection level in the table above appears in the tempura views
  without opening a panel, and the key names every mark and nothing else.
- Classes are single blocks. Private internals are collapsed until the reader
  opens the block, and opening moves only that block.
- No number is printed in the picture. Counts live in the tree and the
  inspector.
- Hover, selection, inspector, sidebar, and key never move a mark or the
  camera. An idle scene renders nothing.
- The same hash on the same snapshot gives the same picture.
- Every name in a module-scope Elevation is legible at 1280×800.
- The explorer computes no reach, rank, level, or classification. All of them
  come from `model.view`.
- Overview pan and zoom hold 50 fps on tempura, and on a synthetic
  10,000-function snapshot after phase 4.

## Risks and known limitations

- **Wide packages are far views.** A package wider than about 25 units
  (`electrostatics`, `mesh`) shows stems or tiles at package scope, so names
  need module scope or zoom. The 2D grid has the same limit.
  - Mitigation: module scope is one click on the pane, and selections get
    callouts.
- **Bundle size** is about 4 times the budget (see Vendoring). It is the main
  cost of this track.
- **Overview draw calls.** 23 ms per frame is acceptable for tempura only;
  phase 4 is required for larger code bases.
- **Cross-row arcs** in Axonometric can pass behind panes of the rows in
  between. They are readable there, but not in Plan, where they are dimmed
  on purpose.
- **Imports only between drawn modules.** Package `__init__` facades with no
  functions or classes have no pane, so their imports are not drawn.
- **Edges into class rows** do not spread their ports the way edges into
  cards do, and can overlap at busy rows.
- **Labels sit above geometry.** Labels are an overlay, so they need explicit
  occlusion rules:
  - Dimmed and cut-away objects carry no label, and open blocks hide the
    labels behind them.
  - A label can still cross an edge.
- **Preview quirk.** `requestAnimationFrame` never fires in the T3 preview.
  The prototype falls back to a 30 fps timer while anything animates; a
  normal browser uses `requestAnimationFrame`.
- **Not done:** keyboard focus and accessibility, edge bundling at the far
  view, and a landing ring on callees.

## How to run

```text
pixi run python -B prototypes/dynamic-explorer/prepare.py      # writes view.json from atlas.json
pixi run python -B -m http.server 8794 --bind 127.0.0.1 --directory prototypes/dynamic-explorer
# open http://127.0.0.1:8794/  (three.js loads from jsDelivr until vendored)
```

`window.atlasProto` exposes `setScope`, `select`, `expand`, `goView`,
`fitSelection`, `hover`, `hoverPane`, and `shoot`. `shoot` posts a composite
PNG to a local receiver (`/tmp/atlas-shots/receiver-proto.py`, port 8793).
