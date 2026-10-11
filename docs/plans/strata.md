# Strata: the integrated explorer prototype

> Status: Prototype (2026-10-09). Runs on tempura (snapshot version 7) at
> `prototypes/strata/`. Nothing under `src/`, `tests/`, `schema/` or the other
> prototypes changed. This prototype merges the placement track
> (`strata-placement.md`, candidate B) and the connection track
> (`strata-edges.md`) into one `prepare.py`, one `routing.js` and one `app.js`,
> and fixes eight limitations those two reports left open. Target pictures come
> from `strata-structure-references.md` sections 3 and 4; visual tokens come
> from `dynamic-explorer.md`.

## Answer in brief

- **One model, one placement, one routing.** Python places every module (B:
  package plates in dependency order) and emits every fact the routing needs:
  spans, bundles with member calls, plate-pair bundles, fixed ports, the
  package tree. `routing.js` turns positions into lines with pure functions.
  Placement candidates, route variants, the legacy and KDEEB routes, the
  debug hooks and the read-only placement copy are gone.
- **Each kind of connection has its own height and shape.** Same module: a
  curve on the pane. Same plate: a square track above the panes. Same row,
  two plates: a square track that leaves through the side ports. Other row: an
  arc. Import: a dashed ground line.
- **Nothing moves.** One hash, `ed95c4fa` over 39,810 line coordinates, holds
  at the overview, in all 7 package scopes, in 2 module scopes, under a
  pipeline, ribbon and plate-ribbon selection, under hover, and at the far
  zoom.
- **Cost against the edge track's default.** Overview draw calls fall from
  1,217 to 1,020 and total line ink from 12,425 to 9,479 px. In-plate
  crossings fall from 24 to 9. Screen crossings in Axonometric are 67 at the
  new camera; at the edge track's camera they are 71 against 64 for "arcs on
  layout B", because row tracks and per-plate sky bases each add a few (see
  Metrics).

## Placement

Python (`prepare.py`, the placement track's rule B, unchanged):

1. **Levels.** The module graph is resolved calls plus imports; tempura has no
   cycle to drop. A module's level is its longest path from a module nothing
   depends on, balanced toward the weighted median of its links.
2. **Plates.** One plate per package, except that a package on a cycle of the
   package graph splits into level slices. The root package becomes
   `tempura·1` (`linear_dot_array`, `geometry_generators`) and `tempura·2`
   (`formatting`, `_region`, `specs`).
3. **Rows.** Plates follow a topological order of the plate graph and wrap into
   rows by width, the first row at the back. Tempura has 4 rows, 16 units
   apart: plotting, tempura·1, layout; electrostatics, strain; meshing, mesh;
   tempura·2.
4. **Order inside a plate.** A topological order of the plate's calls and
   imports, improved by single-module moves against 2 × arc crossings plus
   call-weighted span.
5. **Plate positions.** Rigid plates slide along their row toward their links
   in other rows (isotonic fit, at least 1.6 units of street).
6. **Ports.** Each plate has a front and a back port at the call-weighted x of
   the panes that use them, and a left or right port at its ends when it links
   to a plate in its own row.

Result on tempura: 100 % of the 76 cross-module calls run in reading order,
ground length 1,207, 0 of 35 in-plate arcs against the flow, 10 in-plate arc
crossings, footprint 68 × 48. Two runs write byte-identical `view.json` files
(0.2 s).

## Flow rule

Reading order on two axes: **left to right inside a row, back to front between
rows** (down the screen in Axonometric and Plan). Every call and import in
tempura follows it; `against` on edges, bundles and plate bundles marks the
ones that would not. The key states the rule with a small diagram.

## Connections

Every line is a pure function of positions and Python's bundles. Heights are
per row and per plate:

- **Corridor base** of a row: its tallest pane top + 0.8.
- **Lanes**, per row, 0.34 apart. Module pairs on one plate are coloured first,
  then pairs between plates of the row, each group shortest first. A track
  therefore sits above every track it contains, and a row track above every
  in-plate track it overlaps.
- **Sky base** of a plate: (lanes over the plate − 1) × 0.34 + 1.7 above the
  row's tallest pane. Quiet plates keep low arcs: tempura·2 and meshing 2.16,
  mesh 4.88 (a global base would put every plate at 4.88).
- **Track plane**: tracks run 0.06 in front of the pane, and in front of a class
  block's face where a block stands above the card.

| Connection | Python fact | Route | Line |
| --- | --- | --- | --- |
| Call in one module | span `pane` | S-curve on the pane, behind the cards | 1.3 px tapered, dim grey; at the overview one batched texture per pane |
| Call between modules of one plate | span `plate` | Riser from the card's top edge (stepping onto the track plane), along the pair's lane, down onto the callee | Square-cornered track, 1.6 px tapered |
| Call between two plates of one row | span `row` | Same track system; leaves the source plate through its right port and enters the target through its left port, in a lane above every in-plate track it overlaps | Square-cornered track, brighter grey |
| Call between rows | span `cross_row` | Cubic arc leaving and landing vertically; control height = sky base of the source plate + 2.8 + 0.12 × ground distance; 0.35 to the right of travel, 0.2 per strand inside a plate pair | Smooth arc, 1.6 px tapered |
| Call into a class | `into_class` | Ends on the block side at the method's row | Port square |
| Construction | `constructs` | Lands on the block header from above | Bar on the header |
| Call inside a class | `intra_class` | Loop on the open block's left edge | 1.1 px, open blocks only |
| Import | `layout.imports` | Ground; bows into the front strip within a row, crosses the street between rows | Dashed, arrowhead |
| Module pair (overview) | `bundles` | The route of its calls, from rim ports ordered left-going, arcs, right-going | 1.5–4.5 px by log of calls |
| Plate pair (far zoom) | `plate_bundles` | Row pair: side port to side port above its members' lanes. Cross-row pair: front port to back port | 2.4–6 px |

Leaving a scope:

- A **row** call runs along its lane to its own plate's side port and fades
  over the next 1.1 units of street. One label per port and direction names the
  partner plates (`→ strain`, `← plotting`).
- A **cross-row** call rises to its plate's sky base and fades. One label per
  module and direction (`→ mesh · meshing · tempura·2`).
- In a module scope, a call to another module of the same plate fades at half
  its length.

## Emphasis

Brightness only, three hues (teal load-bearing, violet clone, red import
cycle), as in `dynamic-explorer.md`.

- **Overview:** 43 module-pair ribbons, pane texture at 35 %, import-only
  ground lines (12 of 55), clone arches.
- **Hover a pane:** its ribbons light; others fall to 16 %.
- **Click a ribbon:** its member calls draw lit on the same lane or arc; the
  inspector lists them; other ribbons fall to 12 %. No wavefront, no pulse.
- **Select a pipeline:** the reach set lights; a wavefront (35 ms per depth,
  at most 350 ms), then pulses for 3 passes or 4 s. Plan dims calls to 10 %.
- **Scope:** out-of-scope panes fall to 5 %, plates to 15 %; Elevation cuts the
  rows in front and behind (section slab). A package split across rows
  (`tempura`) gets a raised Elevation (0.5 rad) without a cut.

## What never moves

- No card, pane, plate or line moves on hover, selection, scope, level of
  detail, inspector, sidebar or key; scope and emphasis change alpha and colour
  only. The hash above checks every strand and ribbon point.
- Opening a class block lifts that block and reroutes only its own calls.
- The camera moves only on a scope change, a view preset, a pipeline fit, or
  the reader's own orbit, pan and zoom. A click never moves it.
- An idle scene renders nothing.

## Semantic zoom

- **Far** (city under 60 % of its overview width): 8 plate-pair ribbons,
  corridor ribbons at 35 %, no texture.
- **Overview:** module-pair ribbons and texture.
- **Scope:** individual calls with stubs and port labels.
- **Labels.** Package names sit on each plate's front edge at a fixed 11 px; if
  panes of a row in front cover the spot, the name slides along its edge to the
  first free spot. Module names sit on the rim in Axonometric and Plan; in a
  scoped Elevation they form a header row above the plate's track band, each
  fitted to its pane first and extended to its full name where no other name
  is in the way. Cards carry names when 8 px tall; selected cards too small for
  a name get a callout.
- **Camera.** The Axonometric preset looks down at 47° (0.82 rad) instead of
  38°, so each row's front edge, where its package name sits, clears the panes
  and bands of the row in front.

## Metrics

Overview at 1,280 × 800, measured by `atlasProto.metrics()`. Ground crossings
count lines between plates projected onto the ground; screen crossings count
all drawn call lines; in-plate crossings count lines inside one plate on the
pane plane. Rows marked "edge track" are copied from `strata-edges.md`.

| Variant | Call lines | Ground crossings (lines) | Screen crossings, Axo | Screen crossings, Plan | In-plate crossings | Total screen length (px) | Draw calls |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Edge track, before: one line per call (tree placement) | 304 | 24 (18) | 563 | 443 | 88 | 22,751 | 1,390 |
| Edge track, arcs per module pair (tree placement) | 43 | 6 (11) | 104 | 41 | 24 | 12,425 | 1,217 |
| Edge track, before, on layout B | 304 | 17 | 413 | — | 77 | — | — |
| Edge track, arcs per module pair, on layout B | 43 | 8 | 64 | — | 9 | — | — |
| **Integrated default, 47° camera** | **43** | **8 (11)** | **67** | **21** | **9** | **9,479** | **1,020** |
| Integrated default, at the edge track's 38° camera | 43 | 8 (11) | 71 | 21 | 9 | 10,933 | 1,020 |

Where the Axonometric difference against "arcs on layout B" comes from, at the
38° camera (variants built from the same bundles, then removed from the code):

| Same-row pairs | Sky base | Ground | Screen, Axo | Screen, Plan |
| --- | --- | --- | --- | --- |
| Arcs | global | 9 | 62 | 23 |
| Arcs | per plate | 9 | 65 | — |
| Row tracks | global | 8 | 68 | — |
| **Row tracks** | **per plate** | **8** | **71** | **21** |

- Row tracks add about 6 screen crossings: the long band-height tracks cross
  other rows' arcs on screen. They remove one ground and two Plan crossings,
  and give same-row calls their own shape.
- Per-plate sky bases add about 3 crossings at 38° and 1 at 47°: lower arcs
  pass closer to other rows' corridor bands.
- Draw calls fall by 197 at the overview: 225 texture strands become 28
  batched geometries (3 dead same-module calls keep their own dashed strand).
  Plan takes 1,149 draw calls and the far zoom 986.
- Frame time was not measured; the T3 preview's timer makes it unreliable.

## Evidence

All screens are 1,280 × 800 CSS px at pixel ratio 2, from the prototype's
compositor.

Overview (Axonometric, 47°). Four rows back to front; nested tracks on each
plate; row tracks crossing the streets (plotting → tempura·1 → layout,
electrostatics → strain); low arcs from quiet plates; each package name on its
own plate's front edge:

![Overview](/tmp/atlas-shots/strata/01-overview-axonometric.png)

Plan (imports foregrounded; every dashed line runs down or right) and the
unscoped Elevation (rows superpose face-on, which is why Elevation is read in a
scope):

![Plan](/tmp/atlas-shots/strata/02-plan.png)
![Elevation](/tmp/atlas-shots/strata/03-elevation.png)

Package scope `electrostatics`. Module names form a header row above the track
band; calls leave as labelled stubs: arcs (`→ mesh`, `← layout`) and the row
stub to strain, which ends at the plate's right port (`→ strain`):

![Electrostatics](/tmp/atlas-shots/strata/04-scope-electrostatics.png)

The split package `tempura`: raised Elevation of both slices, row stubs at the
side ports of tempura·1 (`← plotting`, `→ layout`):

![Tempura split](/tmp/atlas-shots/strata/04b-scope-tempura-split.png)

Package scope `mesh` (13 panes in dependency order, two labelled entries from
electrostatics) and module scope `device.py`:

![Mesh](/tmp/atlas-shots/strata/05-scope-mesh.png)
![device.py](/tmp/atlas-shots/strata/06-scope-module-device.png)

Pipeline `compile_mesh_inputs`, fitted face-on (one row): a comb of corridor
tracks from the root through `_lattice`, `_refinement`, `_geometry`, `_recipe`
and `_selectors` to `_regions`; then with pulses on the first depth:

![Pipeline](/tmp/atlas-shots/strata/07-pipeline-compile-mesh-inputs.png)
![Pipeline pulses](/tmp/atlas-shots/strata/07a-pipeline-compile-mesh-inputs-pulses.png)

Hover `device.py`: its six ribbons light, including the row track to
`strain/materials.py`:

![Hover](/tmp/atlas-shots/strata/08-hover-pane-device.png)

Ribbon click on the row pair `device.py → materials.py` (after a reader's pan
and zoom; the click itself does not move the camera). Both member calls leave
`device.py`, cross the street at band height and land on `materials.py`:

![Ribbon click](/tmp/atlas-shots/strata/09-ribbon-click-row-device-materials.png)

Class `Device` opened in module scope (lifted block, private rows below the
hatched divider, intra-class loops, state column):

![Device open](/tmp/atlas-shots/strata/10-class-device-open.png)

Scope transition overview → electrostatics, slowed to 3 s, at 0, 20, 50 and
100 %:

![Filmstrip](/tmp/atlas-shots/strata/11-filmstrip-overview-to-electrostatics.png)

Far zoom: plate-pair ribbons, side port to side port within a row and front
port to back port between rows:

![Far](/tmp/atlas-shots/strata/12-far-plate-ribbons.png)

Before and after, same region. Risers (the edge track hides them behind
`_require_positions` and the Device block; here they run in front):

![Risers before](/tmp/atlas-shots/strata/13a-risers-before-edge-track-device.png)
![Risers after](/tmp/atlas-shots/strata/13b-risers-after-track-plane-device.png)

Module names (the edge track's rim names are crossed by risers and run over
neighbours; here they form a header row no track crosses):

![Labels before](/tmp/atlas-shots/strata/14a-labels-before-edge-track-electrostatics.png)
![Labels after](/tmp/atlas-shots/strata/14b-labels-after-header-row-electrostatics.png)

## Limitations fixed

1. **Same-row links were arcs.** Fixed: span `row` routes as a track through
   the side ports, coloured after the in-plate pairs so it nests outside them
   (4 module pairs, 9 calls). Cost: about 6 more screen crossings in
   Axonometric (Metrics).
2. **One global sky height.** Fixed: the sky base is per source plate,
   (lanes − 1) × 0.34 + 1.7 above the row's tallest pane. Cost: 1 to 3 screen
   crossings.
3. **The browser regrouped bundles by plate.** Fixed: Python emits
   `plate_bundles` with span and `against`, and spans on every edge, bundle
   and import. The adapter is gone.
4. **Tracks behind module names; port labels dropped.** Fixed in a scoped
   Elevation, the reading view: names form a header row above the track band.
   Port labels try up to 9 positions and are never dropped (the least
   overlapping spot wins if all collide; this did not happen on tempura).
   Partly deferred for Axonometric and Plan, see below.
5. **Package names behind the next row's panes.** Fixed: the Axonometric
   preset rises from 38° to 47°, so each front edge clears the row in front,
   and a name that is still covered slides along its edge to the first free
   spot.
6. **The key.** Fixed: it states the two-axis flow rule with a diagram and
   lists only marks the view draws (plate, pane, card, entry, block, private
   tail, wrapper; load-bearing, clone, dead, fields; the four call strata,
   class port, construction bar, intra-class loop; import, ribbon, plate
   ribbon, scope stub with label, selection). The import-cycle entry appears
   only when the snapshot has a cycle.
7. **Risers hidden behind cards above.** Fixed with the track plane: a riser
   steps off the card's top edge 0.06 toward the reader (in front of a class
   block's face where one stands above) and runs over the cards; card names
   stay legible because labels draw above lines. The pane-margin route was
   rejected on capacity: up to 11 risers leave one pane (`linear_dot_array`),
   and a 0.16-unit margin would space them about 0.015 units apart, under 1 px
   even at module-scope zoom.
8. **228 texture objects.** Fixed: one batched `LineSegments2` per pane (28
   batches for 225 strands), built from the strands' own points.

## Deferred

- **Module names in Axonometric** stay on the rim, where overview ribbons can
  pass behind them (with a halo). Above-the-band names detach from their panes
  at overview zoom; checked and rejected.
- **Hierarchical bundling** is not carried over. The edge track measured it
  losing on tempura's one-level package tree; it returns as an option when a
  deeper tree gives it something to merge.
- **Wide packages are far views** (`mesh`, 58 units): card names truncate at
  package scope; module scope or zoom reads them.
- **At a reader's 38° orbit** package names can still fall behind the next row;
  they slide to the least-covered spot on their edge.
- **Lanes, rim ports and strand order** are computed in `routing.js`. They are
  pure functions of Python's positions, so they can move to Python with the
  placement.
- **Prototype tooling:** three.js loads from a CDN; `?size=1280x800` lays the
  page out in a fixed frame for screenshots because the T3 preview cannot be
  resized.

## Data the explorer needs from Python

Phase 2 moves `prepare.py` into `src/atlas/analyzer/layout.py`. It reads these
snapshot-7 facts: `model.layout.columns`, `.bundles`, `.imports`,
`.import_cycles`, `.nodes[*].row`, `.classes[*].row`, `.dead_row`;
`model.edges[*].kind` and `.back`; `model.nodes`, `model.clones`,
`model.wrappers`, `model.tree`; `snapshot.objects`, `snapshot.symbols`,
`snapshot.files`, `architecture.pipelines`.

It must compute and emit (`view.json` today):

- **`placement`**: rule text, flow (`reading`), rows (z, modules), plate order,
  corridor sizes (row gap 16, plate back 1.3, plate front 2.6, street 1.6, pane
  gap 0.34), and module-graph pairs dropped to break cycles.
- **`floors`** (count, tops, heights, ground, basement) and **`dims`** (card,
  block and plate sizes).
- **`districts`** (packages, the scope unit): package, name, modules, plates,
  rows, centre.
- **`plates`**: unit, package, name, row, x, z, w, modules, centre, front and
  back edge, and ports (front, back, left, right: x, z, out, in).
- **`tree`**: package, parent, `slice` (true for `package·n`), has_modules.
- **`panes`**: module, name, district, plate, row, level, x, z, w, top,
  bottom, dead_bottom, and counts (functions, dead, clones, load-bearing,
  classes).
- **`nodes`** and **`classes`**: Python's flags and ranks plus card and block
  positions (x, y, z, w, h; blocks also d and expanded size).
- **`edges`**: s, t, kind, back, span (`pane | plate | row | cross_row`), ms,
  mt, dead, cls (class kinds), against (cross-module).
- **`bundles`**: s, t, count, span, us, ut (plates), against, members (edge
  indices; Python asserts their count equals `layout.bundles`).
- **`plate_bundles`**: s, t (plates), span (`row | cross_row`), count,
  bundles, against.
- **`imports`**: s, t, cycle, call, span.
- **`clones`**, **`reach`** (uncapped BFS depth per node), **`callers`**,
  **`pipelines`** (root, title, listed, reach), **`summary`**.

The steps behind them: pane interiors (floors, card and block packing,
basement), the module DAG and balanced levels, the cycle split into slices,
plate order and row wrapping, the in-plate crossing pass, plate packing, ports,
spans and `against`, bundle members and plate bundles, reach and callers.
Optionally the lane colouring, sky bases and rim ports from `routing.js`.

## How to run

```text
pixi run python -B prototypes/strata/prepare.py      # writes view.json (byte-identical across runs)
pixi run python -B -m http.server 8786 --directory prototypes/strata --bind 127.0.0.1
# http://127.0.0.1:8786/                  the explorer
# http://127.0.0.1:8786/?size=1280x800    fixed 1280x800 frame, pixel ratio 2 (screenshots)
```

`window.atlasProto` drives the page: `setScope`, `select`, `fitSelection`,
`expand`, `goView`, `hover`, `hoverPane`, `hoverRibbon`, `orbit`, `zoomTo`,
`zoom`, `settle`, `at`, `shoot`, `filmstrip`, and the checks `metrics()` and
`geomSignature()`. Screenshots post to `/tmp/atlas-shots/receiver-strata.py`
on port 8787.
