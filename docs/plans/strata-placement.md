# Strata placement: where module panes stand

> Status: Prototype (2026-10-09). Runs on tempura (snapshot version 7) at
> `prototypes/strata-placement/`, a copy of `prototypes/dynamic-explorer/`.
> Nothing under `src/` or `tests/` changed. This is the module-placement
> track of the Strata iteration. Edge routing (`prototypes/strata-edges/`)
> and the research digest (`strata-structure-references.md`) are separate
> tracks. This plan uses the digest's measurements and sources.

## Problem

Strata draws each Python module as a glass pane. A pane's height axis is call
depth, and its cards are the module's functions. The dynamic-explorer
prototype puts each package on a plate and the plates in tree order, wrapped
into four rows by width. That order carries no dependency information:

- Adjacent modules are related only by name.
- Of the 76 cross-module calls, only 55 % go left to right or toward the
  reader, and 12 % go away from the reader.
- Inside plates, 12 of 35 linked module pairs run right to left.
- Cross-package arcs fly over whole rows in both directions
  (`/tmp/atlas-shots/proto/01-overview.png`).

The owner asked for a smarter placement. Related modules should be adjacent,
and calls should flow in one consistent direction.

## What the snapshot provides

Snapshot version 7 carries the module-level facts this track needs. The
prototype uses them and recomputes none of them.

- `model.layout.columns`: the 40 modules with code, in navigation-tree order,
  with their packages. They give the 40 panes in 7 packages.
- `model.layout.bundles`: resolved call counts per ordered module pair. Tempura
  has 43 such pairs.
- `model.layout.imports`: module import pairs, with re-exports resolved. Tempura
  has 55 pairs between panes, 12 of them without a resolved call. All 43 call
  pairs are also import pairs, and no call runs against an import.
- `model.edges[*].kind`: the view builds its edge levels from it.
- Call ranks come from `atlas.analyzer.layout.rank_live`. `prepare.py`
  asserts they match `model.layout.nodes[*].row`.

Two facts drive the result:

- Of the 76 cross-module call and construction edges, **58 stay inside one
  package** and 18 cross packages.
- Tempura's module graph is a DAG (directed acyclic graph): it has no import
  cycle and no call against an import.
- The package graph has one tangle. The root package `tempura` mixes an
  orchestrator (`linear_dot_array`, which calls `layout`) with foundations
  (`formatting`, `_region`, `specs`, which `layout` and `electrostatics`
  call). That closes two package cycles: tempura → layout → tempura, and
  tempura → layout → electrostatics → tempura.

## Module levels (shared by every candidate)

A module's level is its distance from the top of the module dependency graph.

1. Build the DAG. Resolved call pairs go in first, heaviest first; then
   import pairs. A pair that would close a cycle is dropped and listed in
   `view.placement.dropped` (tempura drops none).
2. Assign each module the longest path from a module that nothing depends on
   (level 0).
3. Balance. Sweeping in tree order until nothing moves, each module moves to
   the weighted median of the levels its links ask for. A link to a caller asks
   for one level below the caller, and a link to a callee asks for one level
   above the callee. Calls weigh their count, and an import without a call
   weighs 0.5. The move stays strictly between the module's deepest caller and
   its shallowest callee.
4. A module with no link (`layout.mutations`) takes the median level of its
   package siblings.

Balancing pulls a source that only feeds a deep module down next to it: for
example, `mesh._raster_edits` moves from level 0 to 6, beside
`mesh._regions`. Tempura gets 8 levels with 5, 8, 7, 4, 6, 3, 6, and 1
modules. Imports add one level over calls alone, because `mesh._plan` imports
`mesh._compiler` without calling it.

## Candidates

All candidates share the pane interiors, floors, and the 16-unit row gap of
the dynamic explorer. They also share the flow convention: callers stand at
the back, and calls run toward the reader (+z). In the Axonometric and the
Plan, the back is the top of the screen. "Down the screen" then means
"deeper" for floors inside a pane, for rows of panes, and in the Plan, which
reads like a levelized structure map. The research digest recommends the same
convention (its section 1.10). The Layered Software City takes the opposite
view: its readers look from the top layer, so the entry point is in the
foreground.

- **Baseline (tree order).** The dynamic-explorer rule, re-measured with the
  same row gap.
- **A, levelized rows.** One row per level.
  - Row order follows barycentre sweeps (each module moves toward the mean
    position of its linked modules in other rows), keeping each package's
    modules contiguous within a row.
  - An isotonic fit pulls each row toward those barycentres.
  - Packages become one plate per run of same-package panes in a row.
- **B, package plates by level.** One plate per package (or per slice of a
  split package, see below).
  - Plates are ordered by level and wrapped into rows by width. Inside a
    plate, modules run left to right in dependency order.
  - Flow is reading order: left to right inside a row, back to front between
    rows.
- **C, dependency-weighted packing.**
  - Stress layout: classical MDS (multidimensional scaling) start, then
    localized stress majorization over shortest-path distances. A call link
    has length 1 and an import-only link 1.5. No randomness, pure Python,
    because numpy is not in the pixi env.
  - The layout is rotated so calls point toward the reader, then cut into 5
    rows of equal width. Packages become plates per run, as in A.
- **D, level bands × package lanes** (an extra probe).
  - Flow runs left to right, with one band of x per level and one row per
    package.
  - The row order is the best of all 7! orders by call-weighted row distance,
    then crossings.

`?placement=levels|plates|stress|lanes|tree` selects a candidate in the page.
The header has the same switch, and `view.json` is B.

## Metrics

Python computes every metric from the view alone (`measure()` in
`prepare.py`). They are listed for every candidate in `metrics.json`.

- **Edge length.** Cross-module edges are the call and construction edges
  whose ends sit in different panes; tempura has 76. Each counts as a straight
  ground segment between the centres of its two cards (or class blocks).
  Edge length is the sum of those segments, in scene units. A card is 1.9
  units wide, and rows are 16 apart.
- **Call crossings.** Pairs of those segments from different module pairs
  that cross. Two segments in one row cross when their ends interleave, as
  arcs drawn to one side do.
- **Flow share.** The share of cross-module edges that follow the
  candidate's own flow rule.
  - A and C: the edge points toward the reader.
  - B and baseline: reading order.
  - D: the edge points right.
- **Plate arcs.** One arc per linked module pair (call or import) inside one
  plate, counted with the research digest's method.
  - **Against:** the arc runs right to left.
  - **Crossings:** one-page crossings, meaning two arcs in a plate whose ends
    interleave.
  - On the baseline this reproduces the digest's 35 arcs, 12 against, and 26
    crossings.
- **Row skips.** For the 20 linked module pairs between packages, the number
  that skip at least one row.
- **Same-package distance.** The mean ground distance between pane centres of
  two modules in one package.
- **Footprint.** The width × depth of the pane feet.

| Candidate | Flow share | Edge length | Call crossings | Plate arcs against / crossings | Row skips (of 20) | Same-package distance | Rows | Max modules per row | Plates | Footprint |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Baseline (tree order) | 55 % | 1633 | 203 | 12 / 26 | 10 | 16.7 | 4 | 14 | 7 | 67 × 48 |
| A, levelized rows | 100 % | 1985 | 98 | n/a (25 plates, no in-plate arcs) | 8 | 32.0 | 8 | 8 | 25 | 46 × 112 |
| B, as first specified (level sort) | 96 % | 1449 | 148 | 0 / 31 | 10 | 16.9 | 4 | 13 | 7 | 59 × 48 |
| B, crossing pass, no split | 96 % | 1330 | 111 | 0 / 10 | 10 | 16.4 | 4 | 13 | 7 | 78 × 48 |
| **B, chosen (split + crossing pass)** | **100 %** | **1207** | 116 | **0 / 10** | **6** | 17.9 | 4 | 15 | 8 | 68 × 48 |
| C, stress packing | 36 % (63 % reading order) | 992 | 16 | 8 / 0 (14 arcs) | 0 | 24.6 | 5 | 10 | 21 | 66 × 64 |
| D, level bands × lanes | 100 % | 1681 | 141 | 0 / 27 | 7 | 23.9 | 7 | 13 | 7 | 103 × 96 |

Where the edge length comes from:

- **A.** A's 58 intra-package calls each cross at least one 16-unit row gap.
  They add up to 1496 of A's 1985 units.
- **B.** The same calls stay inside a plate and run left to right.
- **C.** C is shortest because it ignores packages and direction: 18 % of its
  calls point away from the reader.

## Evidence

All screens are 1280×800 CSS px from the prototype compositor. Each candidate
has the same five views:

1. Axonometric overview.
2. Plan.
3. Elevation of everything.
4. Scope `tempura.electrostatics`.
5. Pipeline `compile_mesh_inputs` selected, with the camera fitted to the lit
   call tree.

### B, chosen

The overview has four rows from back to front:

1. `plotting`, `tempura` (orchestrator slice), and `layout`.
2. `electrostatics` and `strain`.
3. `meshing` and `mesh`.
4. `tempura` (foundation slice: `formatting`, `_region`, `specs`).

Every call runs right inside a row or forward between rows.

![B overview](/tmp/atlas-shots/strata-placement/B-plates-1-axo.png)

In the Plan, every dashed import line runs from a higher row to a lower one,
or to the right:

![B plan](/tmp/atlas-shots/strata-placement/B-plates-2-plan.png)

![B elevation](/tmp/atlas-shots/strata-placement/B-plates-3-elev.png)

The package scope is one row, face-on, behind the section cut. Its modules run
in dependency order: `_thomas_fermi`, `_thomas_fermi_core`, `_quantum_petsc`,
`_quantum_response`, `updates`, `_block_poisson`, `potential`, `device`,
`height_fields`.

![B electrostatics](/tmp/atlas-shots/strata-placement/B-plates-4-scope-electrostatics.png)

The pipeline stands in one row, so the fit is face-on. Every lit call leaves
`_compiler` to the right, through `_lattice`, `_refinement`, `_geometry`,
`_recipe`, and `_selectors`, to `_regions`:

![B compile_mesh_inputs](/tmp/atlas-shots/strata-placement/B-plates-5-pipeline-compile-mesh-inputs.png)

More scope views:

- **Package scope `mesh`.** Still a far view: 13 modules side by side, 58 units.
- **Module scope `_compiler`.** Every outgoing call leaves to the right.

![B mesh](/tmp/atlas-shots/strata-placement/B-plates-6-scope-mesh.png)
![B _compiler](/tmp/atlas-shots/strata-placement/B-plates-7-scope-module-compiler.png)

The split's cost is the root package scope. `tempura` now stands in two rows
(orchestrator at the back, foundations in front), so its Elevation is raised,
without a section cut:

![B tempura](/tmp/atlas-shots/strata-placement/B-plates-8-scope-tempura-split.png)

### A, levelized rows

The overview is a narrow tower, 46 × 112 units, in a landscape viewport.
Every cross-module call is an arc, and package names repeat on 25 plates:

![A overview](/tmp/atlas-shots/strata-placement/A-levels-1-axo.png)

The Plan is the cleanest layered drawing of the dependency graph, but it fills
a third of the screen width:

![A plan](/tmp/atlas-shots/strata-placement/A-levels-2-plan.png)
![A elevation](/tmp/atlas-shots/strata-placement/A-levels-3-elev.png)

`electrostatics` spans five rows, so no face-on cut can show it. The raised
view scatters it:

![A electrostatics](/tmp/atlas-shots/strata-placement/A-levels-4-scope-electrostatics.png)
![A compile_mesh_inputs](/tmp/atlas-shots/strata-placement/A-levels-5-pipeline-compile-mesh-inputs.png)

### C, stress packing

![C overview](/tmp/atlas-shots/strata-placement/C-stress-1-axo.png)
![C plan](/tmp/atlas-shots/strata-placement/C-stress-2-plan.png)
![C elevation](/tmp/atlas-shots/strata-placement/C-stress-3-elev.png)

In C, `electrostatics` lands in three rows (`device` alone, front left):

![C electrostatics](/tmp/atlas-shots/strata-placement/C-stress-4-scope-electrostatics.png)

In the pipeline, the calls to `_regions` arc backward and the rest arc
forward:

![C compile_mesh_inputs](/tmp/atlas-shots/strata-placement/C-stress-5-pipeline-compile-mesh-inputs.png)

### D and the baseline, for reference

![D overview](/tmp/atlas-shots/strata-placement/D-lanes-1-axo.png)
![D plan](/tmp/atlas-shots/strata-placement/D-lanes-2-plan.png)
![Baseline overview](/tmp/atlas-shots/strata-placement/tree-1-axo.png)
![Baseline plan](/tmp/atlas-shots/strata-placement/tree-2-plan.png)

## Chosen rule: B, package plates in dependency order

B keeps the package as the unit of place, which the sidebar, breadcrumbs, and
scopes are built on. It then orders everything by the dependency graph.

1. **Levels.** As in "Module levels" above.
2. **Units.** A unit is a package, unless the package sits on a cycle of the
   unit graph (packages linked by calls or imports). While such a cycle
   exists, every unit on a cycle is tried at every level cut, into a top slice
   (levels up to t) and a base slice. The cut kept is chosen by, in order:
   - the fewest units left on cycles;
   - the least call weight between the two slices;
   - the most even split;
   - tree order.

   Slices are named `package·1`, `package·2`, from the top. In tempura one cut
   suffices: `tempura·1` holds `linear_dot_array` and `geometry_generators`,
   and `tempura·2` holds `formatting`, `_region`, and `specs`.
3. **Plate order.** Units follow a topological order of the now acyclic unit
   graph. Among ready units, the one with the lowest mean module level comes
   first, then tree order.
4. **Rows.** Plates are wrapped into rows in that order, by width.
   - The width budget is the larger of the widest plate and a third of the
     total plate width, with 8 % slack.
   - Row 0 stands at z = 0, and row i at z = 16·i, toward the reader.
   - Because the order is topological, every call between plates runs right
     or forward.
5. **Order inside a plate.** The order is topological in the plate's own
   calls and imports, so every in-plate arc runs left to right.
   - The cost is 2 × (arc crossings) + the call-weighted distance between
     linked pane centres.
   - Two starts compete: the level order, and a callers-first depth-first
     order (reverse postorder, callees in level order).
   - Each start is improved by single-module moves that keep the order
     topological, taking the first improving move in a fixed scan, until no
     move helps. The cheaper result wins.
6. **Plate positions.** Panes in a plate keep a 0.34-unit gap. Each plate then
   slides along its row as a rigid unit toward the mean barycentre of its panes
   linked to other rows.
   - An isotonic fit (pool-adjacent-violators) keeps the plate order and a
     street of at least 1.6 units between plates.
   - Eight sweeps alternate back to front and front to back, and the result is
     centred on x = 0.
7. **Output.** The view records:
   - the rule text (`view.placement.rule`), the flow (`reading`), the rows,
     the corridor sizes, and the metrics;
   - each plate's unit, centre, edges, and ports, and each package's centre;
   - on every edge, `span` (`pane`, `row`, or `cross_row`), and on every
     cross-module edge, `against` (true when it runs against the flow).

   Coordinates are rounded to 3 decimals. Two runs give byte-identical
   files, and all five candidates build in about 0.5 s.

## What we rejected and why

- **A, levelized rows.** A has the purest flow and few call crossings (98),
  and its Plan is the best layered drawing. We rejected it as the default for
  four reasons:
  - Every intra-package call crosses a 16-unit row gap, which makes A's edges
    the longest (1985 against 1207 for B).
  - Packages split into 25 plates. A package scope cannot be read face-on
    (`electrostatics` spans five rows).
  - The ground plan is a 46 × 112 tower in a landscape viewport.
  - Every cross-module call becomes an arc.

  B keeps A's level computation.
- **C, stress packing.** C has the shortest edges and the fewest crossings,
  but 18 % of calls run away from the reader. Packages split into 21 plates,
  and the `compile_mesh_inputs` tree arcs both ways. Proximity without
  direction reproduces the complaint.
- **D, level bands × lanes.** D gets a perfect left-to-right flow with whole
  packages. Its footprint is 103 × 96: bands as wide as their widest cell leave
  most of the ground empty and stretch in-package calls.
- **B as first specified (level sort).** It leaves 31 crossing arcs inside
  plates. The crossing pass reaches 10, the digest's best figure (it reports
  26 → 62 for a level sort with tree-order ties, 16 for a depth-first order,
  and 10 after swaps).
- **B without the split (the Layered Software City's way).** Dashuber,
  Philippsen, and Weigend keep every package whole. They break each cycle at
  its lightest edge and draw only those edges, as architecture violations.
  - In tempura that leaves three calls against the flow (layout →
    `Device.__init__`, layout → `formatting` twice) and 10 row-skipping pairs.
  - The split removes all three and cuts row skips to 6. It also shows the
    root package's two roles as two plates.
  - We chose the split. The `against` flag keeps the paper's alternative open:
    without the split, the edge track would draw exactly those three edges.
- **Fewer, wider rows** (the digest's suggestion), measured on the chosen
  rule:
  - **3 rows:** 1154 length, 3 row skips, 97 × 32, a 3:1 overview.
  - **2 rows:** 0 skips, 127 × 16.
  - **4 rows:** 68 × 48 keeps the 1.7:1 overview aspect that suits a 1280×800
    screen.

  We kept 4 rows: wider rows trade shorter arcs for smaller panes on screen.
- **Network-simplex unit ranking and DSM partitioning** (digest 3.2) were not
  built. With an acyclic unit graph, a topological order is a DSM partition
  order. A ranking step would matter only if rows were to mean levels, and
  here rows come from width.
- **Callers in front** (the Layered Software City's viewpoint, which puts the
  entry point in the foreground). We rejected it because "down the screen"
  would then mean "deeper" inside a pane but "shallower" across rows. A
  camera preset that looks from behind the back row would give that view
  without moving anything.

## Sources

- Dashuber, Philippsen, Weigend, "A Layered Software City for Dependency
  Visualization", IVAPP 2021,
  https://www.scitepress.org/Papers/2021/101802/101802.pdf (pages 1–10 read).
  - **Layering.** Recursive: the classes of one package by topological sort,
    with layer = the longest path to a sink. Then the coarsened sibling
    packages, with parallel edges fused into weights.
  - **Cycles.** Broken during a depth-first traversal at the lightest edge. On
    a tie, the edge whose source has the smaller total outgoing weight.
  - **Layer order.** "Items on the same layer are drawn in a random order",
    which our crossing pass replaces.
  - **Study.** 30 professional engineers on SolrJ (974 classes, 19,732
    dependencies). The layered group was more correct (median 100 % against
    57 %) and faster (35.4 % against 40.7 % of the time limit). Both
    differences were significant by chi-squared test.
  - **Shape.** Their city is also a long, narrow strip read from the top
    layer.
- `strata-structure-references.md`, sections 1 and 3: the package split, the
  crossing pass, the row-span metric, and the port model for routing.

## What the edge-routing track should assume

These hold for `view.json` (`placement.name == "plates"`). Every number is in
the view, so nothing needs recomputing.

- **Flow.** Reading order, with no exception in tempura.
  - Inside a row, every link between panes runs left to right. Of the 76
    cross-module calls, 67 stay in a row: 58 inside a plate, plus 9 between
    plates (plotting → `tempura·1` → layout, and electrostatics → strain).
  - Between rows, every link runs back to front: 9 calls, 5 hopping one row,
    2 hopping two, 2 hopping three.
  - `against` is false on every edge here. Elsewhere it marks the edges that
    the unit graph's cycle breaking could not avoid.
- **Spans.** `span` is a geometric hint and replaces the dynamic explorer's
  `district`/`city`:
  - `pane`: one module.
  - `row`: same row, in one plate or between plates.
  - `cross_row`: different rows.

  Use `level` for styling and `span` for routing. Imports split 40 in a row and
  15 across rows.
- **Rows and corridors.**
  - Rows stand at z = 0, 16, 32, 48.
  - A plate covers z from row z − 1.3 (back edge) to row z + 2.6 (front edge),
    and the panes stand on the row line.
  - The empty corridor between consecutive rows is 12.1 units deep
    (`view.placement.corridor`).
  - In height, panes reach y = 0.46 at most, the ground is at y = −9.95, and
    dead basements reach y = −11.98.
- **Plates and packages.**
  - `view.plates[*]` gives `unit`, `package`, `row`, `x`, `w`, `z`, the plate
    `centre` (x, z = row z + 0.65), and the `front` and `back` edge z.
  - Plates in a row are at least 1.6 units apart (the street), and panes in a
    plate 0.34 apart.
  - `view.districts[*].centre` gives each package centre, width-weighted over
    its plates. `tempura` sits between rows 0 and 3, at (−2.8, 25.8).
  - `view.panes[*].row` and `.level` give each pane's row and module level.
- **Fixed ports.** Every plate has a front port on its front edge and a back
  port on its back edge. A plate linked to another plate in its own row also
  has a right and a left port at its ends, on the pane line.
  - A forward link leaves through the source's front port and enters the
    target's back port.
  - A link in the same row leaves through the right port and enters the left
    port.
  - A front or back port sits at the call-weighted mean x of the panes that use
    it (an import without a call weighs 0.5), kept 0.3 inside the plate ends.
    An unused port sits at the plate centre.
  - Each port lists `out` and `in` counts of module pairs. Ports depend only
    on the snapshot and the placement, never on scope.
  - The busiest ports in tempura:

    | Port | x | Pairs |
    | --- | --- | --- |
    | `electrostatics` front | −5.7 | 7 out |
    | `mesh` back | 14.2 | 7 in |
    | `tempura·2` back | −4.2 | 5 in |
    | `strain` front | 26.1 | 3 out |

## Scope views

- **Package scope.** A package is one row segment in B (and in the baseline),
  so its Elevation is face-on with the section cut and shows modules in
  dependency order.
- **Split packages.** A package split by the cycle rule (`tempura`) spans two
  rows. Its Elevation rises to 0.5 rad without a cut, as in A and C.
- **Module scope.** Unchanged.
- **Pipeline fit.** The fit goes face-on when every lit module stands in one
  row.
- **Out-of-scope modules** fade as before. Nothing moves on a scope change.

## Limitations

- Reading order uses two axes: rows read back to front, and plates left to
  right. The key does not say so yet.
- The split rule tries one level cut at a time and repeats. It is untested on a
  package graph with many cycles. A large tangle could shred a package into
  many slices.
- The search inside a plate uses single moves and finds a local optimum. The
  largest plate here has 13 modules (`mesh`).
- A wide package is still a far view at package scope (`mesh`, 58 units).
  Placement cannot shorten 13 modules standing side by side.
- Package labels sit on the front edge of each plate. In the Axonometric they
  can fall behind the next row's panes, as in the dynamic explorer.
- The ground metrics use straight segments. Drawn edges are arcs, so the
  crossing counts stand in for screen crossings; the routing track should
  measure screen crossings in the presets.
- Everything is measured on one snapshot (tempura).
- Version 7 changes in `prepare.py`:
  - Edges come from `model.edges` kinds: `constructs` edges become constructor
    edges into the class block, and a class constructing itself is skipped.
  - Imports come from `layout.imports`.
  - Pipelines are no longer capped, so the inspector's truncation note no
    longer appears.

## How to run

```text
pixi run python -B prototypes/strata-placement/prepare.py             # all candidates, view.json = B, metrics.json
pixi run python -B prototypes/strata-placement/prepare.py --placement levels   # one candidate into view.json
pixi run python -B -m http.server 8790 --directory prototypes/strata-placement --bind 127.0.0.1
# open http://127.0.0.1:8790/?placement=plates   (or levels, stress, lanes, tree)
```

`window.atlasProto.shoot(name)` posts a composite PNG to the receiver on port
8791 (`/tmp/atlas-shots/receiver-placement.py`). The T3 preview tab changes
size without a resize event, so the shoot hook re-syncs the renderer first.
