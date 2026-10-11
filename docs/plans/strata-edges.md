# Strata edges: connections by structure

> Status: Prototype (2026-10-09). Runs on tempura at
> `prototypes/strata-edges/`; nothing under `src/` or `tests/` changed. This
> is the connection-structure track of the second Strata iteration. Placement
> (`strata-placement.md`) and references (`strata-structure-references.md`)
> are sibling tracks. The prototype starts from `prototypes/dynamic-explorer/`
> and keeps its placement, so the routing can be judged on its own.

## Problem

The owner on the first Strata prototype: "Now they overlap and it's
impossible to distinguish anything. There must be some structure in them.
Can we make use of that?"

What the tangle was made of on tempura (snapshot version 7):

- The overview drew every resolved call as its own line: 304 call lines (316
  edges, minus 12 calls inside closed classes).
  - 228 stay inside one module.
  - 58 run between modules of one package.
  - 18 run between packages.
- Calls across files bulged off the pane. Face-on they crossed the panes, and
  from the Axonometric camera they crossed each other 563 times.
- 55 import lines lay on the ground under all of it.

The structure was there to use:

- The 76 calls between modules fall into 43 ordered module pairs
  (`model.layout.bundles`): 32 inside a package and 11 across packages.
- The 11 cross-package pairs fall into 8 ordered package pairs.
- 76 % of the calls between modules stay inside their package.

## Answer in brief

- **Aggregation and strata do the work.** At the overview, one ribbon per
  module pair replaces the call lines. Each kind of connection gets its own
  height and its own line shape.
  - Call lines drop from 304 to 43.
  - Screen crossings drop from 563 to 104 in Axonometric and from 443 to 41
    in Plan.
  - Crossings inside plates drop from 88 to 24.
- **Hierarchical bundling was built and measured, and it loses on tempura.**
  - Ground crossings rise with β at every setting tried: 6 unbundled, 14 at
    β = 0.85, 23 at β = 1.
  - The package tree is too shallow to help. Every lowest common ancestor is
    the root, and 6 of the 8 package pairs carry a single module pair, so
    bundling has little to merge and mostly adds detours.
  - The default is therefore the unbundled arc (β = 0). Package-pair ribbons
    at the far zoom are the aggregation that bundling would have provided:
    0 ground crossings.
- **With the placement track's fixed ports, bundling comes close.** At
  β = 0.5 it gives 59 screen crossings against 64 for arcs, but 11 ground
  crossings against 8. It stays a switch for deeper trees.
- **Nothing moves.** Every line's geometry is identical at the overview, in
  all 7 package scopes, in 2 module scopes, and under selection: a hash over
  26,826 coordinates matches in every case. Scope, hover, and selection change
  only alpha and colour.

## Data (snapshot version 7)

`prepare.py` now reads the version 7 facts instead of re-deriving them. It
broke on version 7 because `constructs` edges end at a class id.

- **Ranks.** Ranks come from `layout.nodes[*].row` and `layout.classes[*].row`.
  The local `rank_live` copy is gone.
- **Edges.** Every edge carries Python's `kind` (`same_module`, `cross_module`,
  `into_class`, `intra_class`, `constructs`) and `back`.
  - The view adds `span`, the package-tree relation of the two modules:
    `pane` (one module), `district` (one package), or `city` (two packages).
  - The browser routes by `(kind, span)` and never decides either.
  - The old instantiation scan over `snapshot.calls` is gone.
- **Bundles.**
  - `view.bundles`: `layout.bundles` plus each pair's member edge indices.
    `prepare.py` asserts that the member count equals Python's count for
    every pair.
  - `view.package_bundles`: the 8 package pairs, with call counts and their
    module pairs.
  - `view.tree`: each package and its parent.
- **Imports.** Imports come from `layout.imports`, keeping the pairs where both
  modules have a pane: 55 drawn. 124 pairs have an end without a column;
  `layout.import_targets_without_column` lists those modules. Cycles come from
  `layout.import_cycles`.
- **Pipelines.** Pipelines are uncapped: `listed == reach` for all 41.
- **Determinism.** Two runs write byte-identical `view.json` files.

## Routing rules

All geometry lives in `routing.js`, a pure module with no three.js. Its only
inputs are:

- pane positions (`x`, `z`, `w`, `top`);
- plate positions (`x`, `z`, `w`, `row`, and `ports` when a placement provides
  them);
- the package tree;
- Python's bundles.

`app.js` adds only the card and class anchors at each call's ends.

Strata, bottom to top, on tempura:

- **Ground** (y = −9.95): imports.
- **Pane**: up to the pane tops (y ≤ 0.46).
- **Corridor**: lanes from y = 1.26 upward, 0.34 apart.
- **Sky**: from y = 6.24 upward.

| Connection | Python fact | Stratum and route | Line treatment | Drawn when |
| --- | --- | --- | --- | --- |
| Call in one module | `same_module` (also `into_class`, `constructs` within one module) | Pane, behind the cards: a cubic from the caller's bottom edge to the callee's top edge | Thin S-curve, 1.3 px tapering to 0.65 px, dim `same` grey | In a scope. At the overview as pane texture at 35 % |
| Call between modules of one package | `cross_module`, span `district` | Corridor. A riser from the caller's top runs up behind the cards to the pair's lane, along the lane, and drops onto the callee. Corners are rounded at 0.28 | Square-cornered track, 1.6 px tapered, `cross` grey | In a scope or a selection. At the overview the module-pair ribbon takes the same lane |
| Call between packages | `cross_module` (or class kinds), span `city` | Sky. A cubic arc leaves the card vertically. The apex sits 2.8 + 0.12 × distance above the sky base. Lateral offset: 0.35 to the right of travel, plus 0.2 per strand | Smooth high arc, 1.6 px tapered, brightest resting grey | In a scope as a stub with a port label. At the overview as a module ribbon. Far away as a package ribbon |
| Call into a class | `into_class` | Ends on the block side at the method's row, with a horizontal approach of 0.35 | Port square, 0.09 units | With its call |
| Class construction | `constructs` (no analysed `__init__`) | Lands on the block header from above | Bar across the landing point, 2.4 px | With its call |
| Call inside a class | `intra_class` | Loop on the open block's left edge | 1.1 px, no taper | Open blocks only |
| Import | `layout.imports` | Ground | Dashed 1 px with an arrowhead | Overview: the 12 import-only pairs (a ribbon stands for the other 43). Plan and scopes: all |
| Module pair | `layout.bundles` | The route of its calls, from a rim port on each pane | 1.5 + 1.25·log2(count) px (1.5 to 4.5), tapering to 55 %, bright at the caller | Overview |
| Package pair | `package_bundles` | Arc from plate centre to plate centre at pane-top height | 2.4 + 1.4·log2(count) px (2.4 to 6), tapered | Far zoom: the city drawn under 60 % of its overview width |

Ports and lanes:

- **Lanes.** Each package's module pairs are coloured as intervals over the
  panes they span, shortest first, so tracks nest instead of crossing.
  - Lanes used: mesh 13, electrostatics 7, strain 3, layout 2, tempura 1.
  - Two directions between the same modules take different lanes.
- **Rim ports.** Each pane rim is ordered left to right as:
  - left-going tracks, with the lowest lane outermost;
  - then sky risers, ordered by the partner hub's x;
  - then right-going tracks, with the lowest lane outermost.

  With this order, two tracks from one pane never cross at the pane.
- **Card ports.** Card ports spread across the card's top or bottom edge,
  ordered by the partner's x.
- **Calls inside a pair.** The individual calls of one module pair run on its
  lane 0.07 apart, so a selected pair shows parallel strands.
- **Scope stubs.**
  - In a scope, a call with one end outside is drawn only up to just above its
    own package's corridor band. It is solid for 60 % of that length, then
    fades by per-vertex alpha.
  - One label per module and direction names the partners, for example
    `→ mesh · meshing · strain · tempura` or `← layout`.
  - This answers the research track's point that cross-row trunks collapse to
    points in face-on Elevation.
- **Direction.** Width tapers and brightness falls from the caller to the
  callee. Pulses run caller to callee on a pipeline selection only.

The width taper and the stub fade need two per-vertex attributes that three's
`LineMaterial` does not have. `TaperMaterial` in `app.js` adds them to
three's shader source with five string replacements. Lines keep screen-space
width and one material each.

## Hierarchical bundling, as built

Holten 2006 (https://doi.org/10.1109/TVCG.2006.147), adapted to the city.

1. **Control polygon.** For a module pair (a in plate A, b in plate B) the
   polygon is:
   - a's rim port, then the same point at the sky base (a vertical riser);
   - A's hub, then the hubs of A's ancestors below the lowest common ancestor
     L;
   - an apex;
   - the hubs down to B's hub, then B's riser and b's rim port.
2. **Hubs.** A hub sits at height 7.84 (sky base + 1.6) over its plate, plus
   1.4 per tree level above the leaves. Its x and z come from `hub`:
   - `centre`: the plate centre.
   - `traffic`: the call-weighted centre of the plate's modules with
     cross-package calls.
   - `edge`: the plate edge that faces the partner.
   - `ports`: the placement track's fixed front, back, left, or right port.
3. **Apex.**
   - Default: above the midpoint of the two hubs, 1.2 + 0.12 × distance
     higher (or 2.2 per row skipped with `height=rows`).
   - Variant `lift`, the 3D form of Holten's LCA: L's own hub, the centroid of
     its plates, lifted above every arc at y = 18.6.
4. **Straightening.**
   - Each hub and apex point moves toward the unbundled arc:
     P′ = β·P + (1 − β)·U(t), with t its chord-length fraction.
   - Holten straightens toward the chord. In 3D the chord cuts through the
     panes, so the arc is the β = 0 reference.
5. **Curve.** A uniform cubic B-spline with tripled end points
   (`d3.curveBasis`), 10 samples per span.
6. **Strands.** Module pairs inside one package pair are ordered across the
   direction of travel and offset 0.2 apart. Opposite directions keep to their
   right (0.35), so A→B and B→A never coincide.

| Parameter | Default | Tried |
| --- | --- | --- |
| `route` | `arcs` (β = 0) | `bundle`, `lift`, `confluent` (β = 1, no offsets), `kde`, `legacy` |
| `beta` | 0.85 for `bundle` and `lift` | 0.3, 0.5, 0.7, 0.85, 1 |
| `hub` | `centre` | `traffic`, `edge`, `ports` |
| `min` (bundle only pairs with ≥ n module pairs) | 1 | 2 |
| `height` | `distance` (0.12 per unit) | `rows` (2.2 per row skipped) |
| lane, corridor gap, sky gap, hub rise | 0.34, 0.8, 0.9, 1.6 | none |
| side, strand, member offsets | 0.35, 0.2, 0.07 | 0 (confluent) |

Every switch is in the hash, for example `#route=bundle&beta=0.5&hub=ports`.

β sweep, at the default overview camera:

| β | Bundle: ground crossings | Bundle: screen crossings | Lift: ground | Lift: screen |
| --- | --- | --- | --- | --- |
| 0 (arcs) | 6 | 104 | 6 | 104 |
| 0.3 | 6 | 127 | 10 | 132 |
| 0.5 | 9 | 137 | 11 | 153 |
| 0.7 | 11 | 148 | 17 | 193 |
| 0.85 | 14 | 146 | 17 | 259 |
| 1 | 23 | 145 | 33 | 316 |

Hub variants at β = 0.85:

| Hub | Ground | Screen |
| --- | --- | --- |
| `centre` | 14 | 146 |
| `traffic` | 14 | 122 |
| `edge` | 9 | 149 |
| `min=2` | 13 | 150 |

Why bundling loses here:

- **The tree is shallow.** With every pair's ancestor at the root, the
  control polygon is pane → plate hub → apex → plate hub → pane. Bundling then
  only adds a detour through each plate's hub, and strands from modules on both
  sides of a hub cross at it.
- **There is little to merge.** Only electrostatics → mesh (3 module pairs)
  and tempura → layout (2) have more than one strand.
- **The lifted LCA knots everything.** It routes all 11 bundles through one
  point above the city centre (screenshot 09).

## Level of detail and emphasis

- **Far** (the city drawn under 60 % of its overview width, with hysteresis
  to 68 %):
  - 8 package-pair ribbons;
  - corridor ribbons at 35 %;
  - no individual calls and no texture.
- **Overview:**
  - 43 module-pair ribbons;
  - same-module calls as 35 % pane texture;
  - the 12 import-only ground lines;
  - clone arches.
- **Scope** (package or module): every call with an end in the scope, drawn on
  its stratum. Calls leaving the scope are stubs with port labels. Ribbons
  outside the scope fall to 4 %.
- **Hover a pane:** its ribbons light. Every other ribbon falls to 16 % and
  the clone arches to 30 %; the pane texture stays as it is. In Plan the pane's
  imports light instead.
- **Hover or click a ribbon:**
  - Hover lights it and shows a tooltip.
  - Click lists its member calls in the inspector (caller → callee, kind) and
    draws those calls in place of the ribbon, lit, on the same lane or arc.
    Other ribbons fall to 12 %.
  - There is no wavefront and no pulse.
- **Select a pipeline:** its calls draw lit with the wavefront, then the
  pulses (3 passes or 4 s). Ribbons whose members are all lit step back to 0.
  Other ribbons fall to 12 %.
- **Nothing moves.**
  - `atlasProto.geomSignature()` hashes every strand and ribbon point. It is
    `81166a79` over 26,826 values at the overview, in all 7 package scopes, in
    the `_compiler` and `device` module scopes, and after hover, ribbon, and
    pipeline selections.
  - The only geometry change is the one the first prototype already had:
    opening a class reroutes that class's calls.

## Metrics

Overview in Axonometric at 1280×800, all variants at one camera (the default
fit), measured by `atlasProto.metrics()`.

- **Ground crossings** count proper intersections of the cross-package lines
  projected onto the ground.
- **Screen crossings** count every drawn call line in the screen projection.
  Calls that share a card or a port are not counted as crossing there.
- **In-plate crossings** count lines inside one package, projected onto the
  pane plane.

| Variant | Call lines | Ground crossings (cross-package lines) | Screen crossings, Axo | Screen crossings, Plan | In-plate crossings | Mean screen length (px) | Total screen ink (px) | Mean ground length |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Before: one line per call | 304 | 24 (18 lines) | 563 | 443 | 88 | 75 | 22,751 | 6.2 |
| **Module ribbons, arcs (default)** | **43** | **6 (11)** | **104** | **41** | **24** | 289 | 12,425 | 22.8 |
| Module ribbons, arcs, `height=rows` | 43 | 6 | 99 | 40 | 24 | 288 | 12,368 | 22.8 |
| Bundled, β = 0.85 | 43 | 14 | 146 | 108 | 24 | 312 | 13,427 | 24.2 |
| Bundled, lifted LCA | 43 | 17 | 259 | 125 | 24 | 339 | 14,572 | 25.5 |
| Confluent (β = 1, no offsets) | 43 | 13 | 149 | 139 | 24 | 318 | 13,669 | 24.7 |
| KDEEB, screen space (rejected) | 43 | 18 | 1,133 | not run | not run | 267 | not run | 25.5 |
| Far: package ribbons + corridor | 40 (8 + 32) | 0 (8) | 93 | 38 | 24 | 279 | 11,172 | 21.9 |

Notes on the measures:

- **Mean length.** It grows because short in-module calls leave the overview,
  not because routes get longer. Total ink halves (22,751 to 12,425 px).
- **Elevation, unscoped.** Screen crossings are 1,214 before and 311 with
  arcs. Rows superpose face-on, which is why Elevation is used in a scope.
- **Cost.** Draw calls go from 1,390 to 1,217 at the overview (983 far away).
  The 228 texture strands are separate `Line2` objects here, and one batched
  `LineSegments2` would remove most of that.
- **Frame time.** It is noisy in the preview: 20 to 25 ms before; now 18 to
  21 ms cold and 5 to 7 ms warm.
- **Drawn edge objects** at the overview: 43 ribbons, 12 import lines, and 5
  clone arches, plus the texture.
- **Invariance.** 0 control points differ between the overview and any scope
  (see above).

The placement facts the routing inherits (direction of flow, from pane
positions only, `atlasProto.flowShares()`), on the current placement:

- **Inside packages:** 22 of 32 module pairs (35 of 58 calls) run left to
  right.
- **Across packages:** 3 of 11 pairs (7 of 18 calls) run back to front.
- **Row spans** of cross-package pairs: 1, 4, 4, and 2 for spans 0 to 3.

On the placement track's layout B, every link runs forward.

## The same routing on the placement track's layout

`#placement=plates` loads a read-only copy of
`prototypes/strata-placement/view.json` (`placement-plates.json`).

- **What the adapter moves.** Each pane moves rigidly to B's position: the
  panes are identical inside, so cards and blocks move with them.
- **What B supplies.** B's plates become the districts, and B's ports become
  available as hubs.
- **What is regrouped.** The two tempura slices join the tree under
  `tempura`. Python's bundles are regrouped by plate, so a call between the
  slices becomes a sky call.
- **What is untouched.** `routing.js` is unchanged.

| Layout B variant | Call lines | Ground crossings | Screen crossings, Axo | In-plate crossings | Mean ground length |
| --- | --- | --- | --- | --- | --- |
| Before: one line per call | 304 | 17 | 413 | 77 | 4.8 |
| Module ribbons, arcs | 43 | 8 | 64 | 9 | 18.0 |
| Bundled, `hub=centre`, β = 0.85 | 43 | 18 | 78 | 9 | 20.0 |
| Bundled, `hub=ports`, β = 0.85 | 43 | 11 | 64 | 9 | 18.7 |
| Bundled, `hub=ports`, β = 0.5 | 43 | 11 | 59 | 9 | 18.2 |
| Far: package ribbons + corridor | 40 | 2 | 68 | 9 | 16.6 |

- **In-plate crossings** fall from 24 to 9, because B orders panes
  topologically inside each plate.
- **The corridor band** shrinks from 13 lanes to 9: mesh's tracks nest
  better.
- **Ports make bundling competitive**, but not better on the ground.

What changes when B's ports and corridors are used:

- **Hubs become plate ports.** `hub=ports` uses the front port toward a later
  row, the back port toward an earlier row, and the right or left port in the
  same row. This is the research track's "trunk through fixed ports". Arcs stay
  the default until a deeper package tree gives bundles something to merge.
- **Units replace packages.** Spans must be computed per plate, not per
  package. Python should emit `span` on bundles and the plate-level
  `package_bundles`, as the adapter does now.
- **The 12.1-unit corridor between rows stays empty for calls.**
  - Calls ride above the panes: corridor band, then sky.
  - Imports stay on the ground, and the street between rows is where the
    cross-row import lines run.
  - A tall corridor band is not needed at ground level.
- **Same-row links between plates** (9 calls in B) are sky arcs today. B's
  left and right ports would let them run in a row-level corridor at the
  corridor height, as one long track from the right port to the left port.
  This is not built.
- **Flow.** Every link in B runs left to right or back to front. The taper
  then confirms the reading direction instead of carrying it alone.

What routing needs from placement, in the view:

- Pane `x`, `z`, `w`, `top`, and the plate (unit) of each module.
- Plate `x`, `z`, `w`, `row`, centre, and ports.
- The package tree including split slices.
- Height reserves:
  - Each plate needs a corridor band of (lanes − 1) × 0.34 + 1.7 units above
    its tallest pane: 5.8 units for mesh in the current layout, 4.4 in B.
  - The sky base sits above the tallest band in the city, and arcs rise
    1.2 + 1.6 + 0.12 × distance above it.
  - Rows 16 units apart leave room for this. Placement needs no extra
    spacing, because calls never run at ground level between rows.

## Evidence

All screens are at 1280×800 CSS px from the prototype's compositor, in the
default arcs route unless named.

Before: the first prototype's routing on the same data (`#route=legacy`).

![Before](/tmp/atlas-shots/strata-edges/00-before-legacy-overview.png)
![Before, electrostatics](/tmp/atlas-shots/strata-edges/00b-before-legacy-scope-electrostatics.png)

Overview. Shown:

- corridor tracks as square staples above each plate;
- 11 sky arcs;
- pane texture;
- only import-only ground lines.

![Overview](/tmp/atlas-shots/strata-edges/01-overview.png)

Far zoom: 8 package-pair ribbons, wide at the caller. The tempura ↔ layout
pair runs as two one-way ribbons, each offset to its right of travel.

![Far](/tmp/atlas-shots/strata-edges/02-far-package-ribbons.png)
![Far, hover](/tmp/atlas-shots/strata-edges/02b-far-hover-electrostatics.png)

Hover `device.py`: its six ribbons light and everything else falls to
context.

![Hover pane](/tmp/atlas-shots/strata-edges/03-hover-pane-device.png)

Package scope, `electrostatics`, in Elevation:

- the panes carry only same-module curves;
- calls between modules rise into the corridor band;
- calls leaving the package are stubs labelled `→ mesh` and
  `→ mesh · meshing · strain · tempura`, plus `← layout` for the call into
  `Device.__init__`.

![Electrostatics](/tmp/atlas-shots/strata-edges/04-scope-electrostatics.png)

The same scope in Axonometric shows the four strata at once:

- dashed imports on the ground;
- curves on the panes;
- square tracks above;
- stubs into the sky.

![Electrostatics axo](/tmp/atlas-shots/strata-edges/06-scope-electrostatics-axo.png)

`mesh`: 13 panes under a nested bus of 13 lanes, with two labelled entries
from electrostatics. `device.py` module scope:

![Mesh](/tmp/atlas-shots/strata-edges/04b-scope-mesh.png)
![Device module](/tmp/atlas-shots/strata-edges/04c-scope-module-device.png)

Click a ribbon. `geometry.py → linear_dot_array.py` (4 calls, sky) and
`_built.py → _canonical.py` (5 calls, corridor, 2 of them constructs) draw as
their member calls, and the inspector lists them.

![Ribbon sky](/tmp/atlas-shots/strata-edges/05-ribbon-click-sky.png)
![Ribbon corridor](/tmp/atlas-shots/strata-edges/05b-ribbon-click-corridor.png)

Pipeline `compile_mesh_inputs`, picked from the list:

- its calls into the 6 other mesh modules it reaches run as a comb of
  corridor tracks from the root;
- same-module calls stay on the panes;
- the root's callout wins its place;
- in Axonometric, every other ribbon steps back.

![Pipeline](/tmp/atlas-shots/strata-edges/07-pipeline-compile-mesh-inputs.png)
![Pipeline pulses](/tmp/atlas-shots/strata-edges/07a-pipeline-compile-mesh-inputs-pulses.png)
![Pipeline axo](/tmp/atlas-shots/strata-edges/07b-pipeline-compile-mesh-inputs-axo.png)

Bundled (β = 0.85). The strands from `device.py` leave as one trunk, then
detour through the target plate's centre (the cusps over strain and mesh):

![Bundle](/tmp/atlas-shots/strata-edges/08-variant-bundle-b085.png)
![Bundle hover](/tmp/atlas-shots/strata-edges/08b-variant-bundle-hover-device.png)

Lifted LCA (the 3D Holten variant). Every bundle meets above the city centre:

![Lift](/tmp/atlas-shots/strata-edges/09-variant-lift-lca.png)

Layout B, with the routing unchanged: arcs, ports bundled at β = 0.5, the
electrostatics scope, the pipeline, and the far zoom.

![B arcs](/tmp/atlas-shots/strata-edges/12-placement-plates-arcs-overview.png)
![B ports](/tmp/atlas-shots/strata-edges/12b-placement-plates-bundle-ports.png)
![B electrostatics](/tmp/atlas-shots/strata-edges/12c-placement-plates-scope-electrostatics.png)
![B pipeline](/tmp/atlas-shots/strata-edges/12d-placement-plates-pipeline.png)
![B far](/tmp/atlas-shots/strata-edges/12e-placement-plates-far-package-ribbons.png)

## Rejected approaches

- **Kernel density edge bundling in screen space (KDEEB; Hurter, Ersoy,
  Telea 2012).**
  - Built: 10 iterations, kernel 42 px decaying by 0.78, Laplacian smoothing,
    each point un-projected at its own depth. It takes 390 ms.
  - Rejected for three reasons:
    - **It erases the strata.** Corridor tracks and sky arcs merge into one
      road network that cuts through panes, so a line's kind is no longer
      readable from its shape (10).
    - **It belongs to one camera.** After a 0.65 rad orbit the bundles are
      crooked wires floating in space (10b). Re-running it on every camera
      move would make the lines move whenever the reader orbits, against the
      object-constancy rule.
    - **It does not reduce crossings.** Bundled strands overlap and re-cross:
      1,133 screen crossings against 104.

  ![KDEEB](/tmp/atlas-shots/strata-edges/10-rejected-kdeeb-overview.png)
  ![KDEEB after orbit](/tmp/atlas-shots/strata-edges/10b-rejected-kdeeb-after-orbit.png)
- **Confluent merging of parallel arcs** (β = 1, no strand or direction
  offsets).
  - Strands of one package pair coincide, so the reader can no longer tell
    which module pair, or which direction, a stroke carries.
  - Crossings are 13 ground and 149 screen, against 6 and 104.
  - Rejected for module ribbons. The package-pair ribbon at far zoom is the
    honest form of a merge: one stroke that says it is a merge.

  ![Confluent](/tmp/atlas-shots/strata-edges/11-rejected-confluent.png)
  ![Confluent hover](/tmp/atlas-shots/strata-edges/11b-rejected-confluent-hover-device.png)
- **Depth-sorted transparency.**
  - three.js sorts transparent objects by the depth of each geometry's
    bounding-sphere centre. Between the default azimuth and orbits of 0.3, 0.6,
    and −0.6 rad, 54, 152, and 229 of the 903 ribbon pairs swap draw order.
    Their overlaps would flicker while the reader orbits.
  - One centre per arc is also the wrong depth for a long arc.
  - Kept instead: a fixed order by stratum (pane 3, corridor 3.1 to 3.4,
    sky 3.2 to 3.6, package 3.7), opaque resting lines, and dimming by alpha.
- **Lifted LCA** (the 3D variant asked for). It is rejected on tempura: every
  bundle knots at one point (17 ground and 259 screen crossings).
- **Hierarchical bundling as the default.** It is measured above and kept as a
  switch (`route=bundle`) for deeper package trees.
- **In-package ribbons in the plate's front lane** (the research track's
  suggestion). A lane at ground level in front of the panes collapses to a line
  in face-on Elevation, the reading view, and competes with the imports there.
  The corridor above the panes reads face-on as a band over the module names
  and leaves the ground to imports.

Adopted after trying:

- **Metro-style orthogonal routing** in the corridor, with nested lanes by
  span. It gives the fewest in-plate crossings of any shape tried here (24, or
  9 on layout B).
- **Screen-space lines** (`Line2`) with a per-vertex width taper and alpha.

## Response to the research track

The track is `strata-structure-references.md`, sections 2 to 4.

- **Adopted:**
  - same-module calls as faint pane texture at the overview;
  - import-only ground lines at the overview (12 of 55);
  - strands at fixed offsets inside a ribbon;
  - labelled ports instead of fading trunks at the scope boundary;
  - the invariance check (target 0, measured 0);
  - the metrics list in their section 3.4;
  - B's fixed ports as a hub option.
- **Measured, and not adopted on tempura:**
  - one trunk per package pair through ports at the overview: arcs have
    fewer ground crossings on both layouts;
  - heights tiered by rows skipped: a marginal gain (99 against 104 screen
    crossings), kept as `height=rows`.
- **Argued against:** the front-lane in-package arcs (see Rejected
  approaches).

## Limitations

- **The sky base is global.** One busy package (mesh, 13 lanes) lifts every
  package's sky. A sky base per plate would lower the others, but arcs between
  plates would then start at different heights.
- **Risers cross the pane.** A riser runs behind the cards above its card. It
  is hidden where cards cover it but visible in the gaps. Tracks above the rim
  can pass behind module-name labels, which keep a halo.
- **Members of a pair are 0.07 apart.** At overview zoom they read as one
  track, by design. They separate in a scope.
- **Labels can collide.** Port labels for one module merge into one line. A
  label that still collides moves up one step, and then it is dropped.
- **Pulses on class rows** use the row's side port, as before.
- **Frame time is unreliable in the T3 preview.** Draw calls are the reliable
  cost. Phase 4 of the dynamic-explorer plan (batched line sets) still
  applies: the texture alone is 228 objects.
- **Prototype only:**
  - The KDEEB code and the `legacy` route exist only for comparison.
  - `atlasProto._debug` exposes internals for testing.
  - `placement-plates.json` is a copy of another track's output, for the
    integration test only.

## How to run

```text
pixi run python -B prototypes/strata-edges/prepare.py      # writes view.json from atlas.json
pixi run python -B -m http.server 8788 --directory prototypes/strata-edges --bind 127.0.0.1
# http://127.0.0.1:8788/                                   default: arcs, auto level of detail
# http://127.0.0.1:8788/#route=bundle&beta=0.85            Holten bundling
# http://127.0.0.1:8788/#route=legacy                      the first prototype's routing
# http://127.0.0.1:8788/#placement=plates&hub=ports        on the placement track's layout B
```

`window.atlasProto` adds `metrics(names, beta, hub, min, height)`,
`geomSignature()`, `flowShares()`, `kdeeb()`, `zoom(k)`, `settle()`, and
`shoot(name, crop)`. Screenshots post to `/tmp/atlas-shots/receiver-edges.py`
on port 8789.
