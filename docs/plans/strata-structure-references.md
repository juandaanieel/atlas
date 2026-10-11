# Strata structure references: placement and edge routing

> Status: Research (2026-10-09). Feeds `prototypes/strata-placement/`,
> `prototypes/strata-edges/`, and the integration step. Extends
> `dynamic-explorer.md`; does not repeat `explorer-references.md` sections 1
> and 2. Changes no code.

## Scope and method

The owner chose the 3D direction and asked for smarter pane placement and for
connections that use the code's structure ("Now they overlap and it's
impossible to distinguish anything. There must be some structure in them.").
This digest surveys placement and routing, measures tempura, and recommends
one pairing with a target picture.

- **Reading.** Entries marked "full text" were read via `pdftotext`; others
  rely on abstracts or documentation. No paper figure was viewed; Strata
  screenshots 01, 09, and 13 were.
- **Numbers.** From `prototypes/strata-placement/atlas.json` (snapshot 7) and
  `prototypes/dynamic-explorer/view.json`, via throwaway scripts in
  `/tmp/strata-refs/`. The module graph is drawable imports plus call bundles.

### What the tangle is made of (tempura)

- **Calls.** 316 edges: 225 same-module, 65 cross-module, 12 intra-class, 10
  constructs, 4 into-class; no back edges or import cycles. Today's overview
  draws about 350 line objects (304 call lines, 49 import lines).
- **Module pairs.** 55 ordered pairs; 43 carry the 76 cross-module calls, and
  each is also an import pair; 12 are import-only. Inside packages: 35 pairs
  (32 with calls, 58 calls). Across: 20 pairs (11 with calls, 18 calls).
- **Module levels** (longest path to a sink): 8 levels, widths 15, 10, 4, 4,
  4, 1, 1, 1. All 43 call pairs point strictly down the import levels.
- **Package graph.** Cyclic only through the root package, which mixes an
  orchestrator (`linear_dot_array`, level 6) with four foundations (`specs`,
  `_region`, `formatting`, `geometry_generators`, level 0). Split the root in
  two and the package graph is a chain: plotting > linear_dot_array > layout
  > electrostatics > strain > mesh > {meshing, foundations}.
- **Current placement** (tree order, 4 rows). Of 21 cross-unit pairs, 11 run
  back to front, 8 front to back, 2 within a row. Inside plates, 12 of 35 arcs
  run right to left, with 26 arc crossings.
- **Pane height does not separate levels:** most panes reach the top floor
  (public functions are roots), so ground position must carry the order.

So 76 % of cross-module calls stay inside a package and every dependency
points one way; screenshot 01 draws 300 lines on a placement that ignores it.

## 1. Module placement from dependency structure

### 1.1 Levelization: Lakos and the Structure101 LSM

Lakos, *Large-Scale C++ Software Design*, 1996 (not re-read); LSM docs:
https://www.sonarsource.com/structure101/docs/java/studio/content/restructure101/lsm

- **Computes.** A level per item: "every item depends on at least one item on
  the level immediately below it"; one level's items are independent. Cycles
  collapse into "tangles". No within-level order is specified.
- **Strata.** Level becomes a ground coordinate (depth); floors stay call
  depth. With no feedback edges in tempura, "item-to-item dependency arrows
  can be hidden without loss of context".
- **Risk.** Longest-path levels put all sinks on level 0 (15 of 40 modules);
  the unspecified within-level order decides crossings (section 3).

### 1.2 Sugiyama framework: the ranking choice matters

Sugiyama et al. 1981, https://doi.org/10.1109/TSMC.1981.4308636 ; Gansner et
al. 1993, https://doi.org/10.1109/32.221135 ; Coffman and Graham 1972,
https://doi.org/10.1007/BF00288685 (not re-read).

- **Computes.** Break cycles, rank, order within ranks by barycenter or
  median sweeps, assign coordinates. Longest-path ranks minimize height,
  network simplex minimizes total span, Coffman–Graham bounds rank width.
- **Strata.** Rank is row. Network simplex pulls a sink next to its only user:
  `formatting` would sit just in front of layout, not in the front row. Reuse
  the exact-fraction barycenter sweeps in `layout._order_cells`.
- **Risk.** Applied to modules, it splits packages across rows (3.1).

### 1.3 Layered drawings in 3D and 2.5D (Hong, Nikolov, Tarassov)

APVis 2005, https://pure.ul.ie/en/publications/layered-drawings-of-directed-graphs-in-three-dimensions/ ;
JGAA 11(2) 2007, https://jgaa.info/index.php/jgaa/article/view/paper151
(abstracts).

- **Computes.** Layers in parallel planes plus k ≥ 2 perpendicular "walls",
  each a 2D layered drawing; five wall-partitioning algorithms.
- **Strata** is this convention with walls fixed (panes) and layers as
  floors; wall order and spacing are the placement question. Their crossing
  results do not transfer, because their walls are chosen by algorithm.

### 1.4 Layered Software City (Dashuber, Philippsen, Weigend)

IVAPP 2021 (full text; figures not seen):
https://www.scitepress.org/Papers/2021/101802/101802.pdf

- **Computes.** Levels recursively per tree level (sibling classes, then the
  coarsened subpackage graph); layer = maximal path length. DFS cuts cycles at
  the lightest edge, ties by smaller source out-weight. Items in a layer go
  "in a random order".
- **Optimizes** drawn arcs: only edges against the layering are drawn ("these
  arcs often indicate architecture violations"); no bundling, since "too few
  arcs remain".
- **Evidence.** 30 participants on SolrJ (974 classes, 19,732 dependencies):
  the layered group was significantly more correct (median 100 % against
  57 %) and faster overall; the treemap group found hotspots faster.
- **Strata.** The closest precedent for plates ordered by level with modules
  ordered inside. Risk: random in-layer order, and the strict rule would draw
  no edges in tempura, while the owner wants connections visible.

### 1.5 DSM partitioning (Sangal et al., Lattix)

OOPSLA 2005 (full text): https://groups.csail.mit.edu/sdg/pubs/2005/oopsla05-dsm.pdf

- **Computes.** A permutation into block triangular form: entries below the
  diagonal or inside composite groups (Warfield; Gebala and Eppinger).
  Clustering (Hartigan) minimizes off-diagonal entries instead. "Partitioning
  finds layers and highlights cycles."
- **Strata.** The partition order is the reading order (left to right, back
  to front); entries above the diagonal are edges against the flow. Run it on
  packages to find cycles like the root's. Risk: a 1D order needs a wrap rule.

### 1.6 Containment and similarity placement: CodeCity, treemaps, cartography, galaxies

Kuhn, Loretan, Nierstrasz, WCRE 2008 (full text), https://arxiv.org/abs/1209.5490 ;
Bruls et al. 2000, https://diglib.eg.org/handle/10.2312/VisSym.VisSym00.033-042 ;
Shneiderman and Wattenberg 2001,
https://www.cs.umd.edu/users/ben/papers/Shneiderman2001Ordered.pdf ;
Software Galaxies, https://github.com/anvaka/pm (abstracts and README).

- **CodeCity** uses "a modified tree layout"; "within a package, elements are
  ordered by size", so a metric change moves everything. Position means
  containment only, and tree-order rows share this flaw.
- **Treemaps.** Squarified cells are near-square but unstable and lose
  order; ordered and strip treemaps keep "items near each other in the given
  order" near each other. A strip fed with dependency order is "wrap like
  text"; a row break then makes one edge run right to left.
- **Similarity.** Software Cartography places artifacts by vocabulary (LSI,
  then MDS), so "a short edge indicates that closely related artifacts are
  invoking each other"; Software Galaxies precomputes 3D force layouts. Both
  give clusters, not direction. Reject, except offline precomputation.

### 1.7 EvoStreets (Steinbrückner and Lewerentz)

Steinbrückner, PhD thesis 2013,
https://opus4.kobv.de/opus4-btu/frontdoor/index/index/docId/1681 ; Steinbeck,
Koschke, Rüdel, VISSOFT 2019 (full text),
https://see.uni-bremen.de/wp-content/uploads/2021/03/Comparing-the-EvoStreets-Visualization-Technique.pdf

- **Computes.** The package tree as streets that "fork orthogonally at each
  level change", leaves as blocks along them, dependencies as hierarchically
  bundled edges. Stable under change, costly in space.
- **Evidence.** 34 participants: no evidence that 2.5D or VR beat an
  orthographic view on correctness of edge tasks.
- **Strata.** Streets are free routing corridors; the study warns that depth
  alone does not untangle edges. Risk: placement ignores dependencies.

### 1.8 IslandViz and ExplorViz

Misiak et al. 2018, https://doi.org/10.1109/VISSOFT.2018.00020 ; poster (read),
https://cg.web.th-koeln.de/wp-content/uploads/2018/03/ImmersiveExplorationOSGI_ieee-vr-poster.pdf ;
Fittkau et al., SE 2016 (abstract), https://oceanrep.geomar.de/id/eprint/31687 ;
ELK users, https://arxiv.org/abs/2311.00533

- **IslandViz.** Islands grow from Voronoi cells; "ports, situated along the
  coast line, ... manage the incoming and outgoing dependencies"; vertical
  arcs with gradient and arrowhead, width = imported packages. The poster
  does not describe island placement.
- **ExplorViz.** A hierarchical 2D landscape over per-application 3D cities;
  "a statistically significant increase in task correctness" over a flat
  landscape, no time difference. An ELK user (landscape, I assume).
- **Strata.** Borrow ports on plate edges and hierarchical collapse at
  overview. Risk: ports concentrate edges and need a lane order (2.4).

### 1.9 Spectral and stress layouts for near-DAGs

Koren 2005, https://www.math.ucdavis.edu/~saito/data/acha.read.w12/koren-graph-drawing.pdf ;
Carmel, Harel, Koren 2004,
https://cris.huji.ac.il/en/publications/combining-hierarchy-and-energy-for-drawing-directed-graphs/ ;
DIG-CoLa (Dwyer and Koren 2005), https://patents.google.com/patent/US7714862
(abstracts).

- **Computes.** The Fiedler vector gives a 1D order minimizing
  Σ w·(x_i − x_j)². Carmel–Harel–Koren solve separate 1D problems for the
  hierarchy axis and the other axis. DIG-CoLa is stress with y_j ≥ y_i + δ per
  edge and "automatically identifies those parts of the digraph that contain
  hierarchical information".
- **Strata.** Use one axis at a time (x order in a row). The placement
  track's stress variant (`metrics.json`, 12:51, in progress) has the fewest
  straight-line crossings (24) and shortest length, but only 63 % of calls in
  reading order. Risk: continuous coordinates dissolve rows and districts,
  and eigenvector sign and ties need tie-breaking to stay byte-identical.

### 1.10 Flow-direction conventions

Graphviz `rankdir`, default `TB`: https://graphviz.org/docs/attrs/rankdir/ ;
LSM (1.1); DSM (1.5); Sonargraph arcs (digest 1.13).

- **Conventions.** Dependencies point down with foundations at the bottom
  (Graphviz, Sugiyama, LSM); a DSM reads top-left to bottom-right; arc
  diagrams fix one rotation sense, so an arc's side gives its direction.
- **Strata.** Floors already point down. Put high-level packages at the back
  and foundations in front: from the 38° Axonometric camera, back is higher
  on screen, so a dependency runs down the screen on both axes, and Plan (back
  at the top) reads as an LSM. Inside a row, run dependencies left to right.
- **Risk.** I found no study of flow direction on a 3D ground plane.

## 2. Edge structure and routing

### 2.1 Hierarchical edge bundling, and in 3D

Holten, TVCG 2006, https://doi.org/10.1109/TVCG.2006.147 (full text via
https://aviz.fr/wiki/uploads/Teaching2014/bundles_infovis.pdf); Caserta,
Zendra, Bodénès, VISSOFT 2011, https://doi.org/10.1109/VISSOF.2011.6069451
(abstract only).

- **Algorithm.** The control polygon runs from P_start up the containment
  tree to the LCA and down to P_end; a cubic B-spline follows it. Strength β
  straightens it: P'_i = β·P_i + (1 − β)(P_0 + i/(N − 1)·(P_{N−1} − P_0)),
  with β = 0.85 in the software examples. Remove the LCA so siblings do not
  bow toward the parent, but only with more than 3 control points. Draw short
  curves over long ones, long ones at lower opacity, caller-to-callee
  gradient.
- **3D.** Caserta et al. adapt HEB "to represent relations in a 3D space on
  top of city metaphors"; HAL blocked the PDF, so per-level heights are my
  assumption. Trade-off: at high β the calling module in a bundle is hidden.
- **Fit: high.** Shapes depend only on endpoints and the fixed hierarchy; in
  Strata the polygon is pane → plate port → plate port → pane.

### 2.2 Geometry-driven bundling: FDEB, divided, KDEEB, winding roads

Holten and van Wijk, EuroVis 2009 (full text),
https://classes.engineering.wustl.edu/cse557/readings/holten-edgebundling.pdf ;
Selassie et al., InfoVis 2011, https://idl.uw.edu/papers/divided-edge-bundling ;
Hurter, Ersoy, Telea, EuroVis 2012 (full text),
https://webspace.science.uu.nl/~telea001/uploads/PAPERS/EuroVis12/kdeeb.pdf ;
Lambert, Bourqui, Auber, CGF 2010, https://doi.org/10.1111/j.1467-8659.2009.01700.x

- **FDEB.** Subdivided edges attract compatible edges (angle × scale ×
  position × visibility). P0 = 1, S0 = 0.04, C = 6 cycles, I0 = 50; each cycle
  doubles P, halves S, and cuts I by 2/3 (141 steps). A 0.05 threshold cuts
  pair interactions to 25–50 %. Cost O(N·M²·K).
- **Divided bundling** adds direction lanes and bundles only related edges,
  because FDEB "bundles spatially proximal edges regardless of direction,
  weight, or graph connectivity".
- **KDEEB** splats edges into a density map, advects points up its gradient,
  and smooths (5–10 Laplacian passes); h_i = λ^i·h_max with h_max = mean
  inter-edge distance and λ ∈ [0.5, 0.9]; 8–10 iterations. 2D and image-space.
- **Winding roads** route edges as shortest paths on a grid around nodes and
  make used segments cheaper. The Strata analogue is Dijkstra over a fixed
  corridor graph (streets, avenues) with a fixed processing order.
- **Fit: low** (winding roads: medium). Shapes depend on all edges (a scoped
  re-run moves bundles; a global run leaves orphan kinks) and spatial bundles
  join unrelated packages.

### 2.3 Structure-following bundling: edge paths, confluence, compression

Wallinger et al., TVCG 2021 (full text), https://arxiv.org/abs/2108.05467 ;
Dickerson et al., JGAA 2005, https://arxiv.org/abs/cs/0212046 ; Dwyer et al.,
InfoVis 2013, https://doi.org/10.1109/TVCG.2013.151 (abstracts).

- **Edge-path bundling.** Longest edges first (weight = length^d); route an
  edge along the shortest weighted path between its endpoints if the detour
  is ≤ k × the straight distance, then lock that path. No "independent edge
  ambiguities", since bundles follow real paths.
- **Confluence and compression.** Confluent edges merge into crossing-free
  "train tracks". Compression replaces edges by edges to modules (identical
  neighbours, modular decomposition, power graphs), losslessly; each step is
  hypothesized to need "a higher degree of mental effort" (studies not read).
- **Strata.** A plate port is a confluence: all edges from P to Q merge into
  one track (fit: high). Edge paths suit at most the ground stratum: a route
  through pane B reads as "via B" (fit: medium).

### 2.4 Ordered bundles, metro lines, orthogonal routing

Bereg, Holroyd, Nachmanson, Pupyrev, GD 2011 (full text),
https://arxiv.org/abs/1209.4227 ; Pupyrev et al., GD 2010,
https://www.microsoft.com/en-us/research/publication/improving-layered-graph-layouts-with-edgebundling/ ;
Nöllenburg and Wolff 2011, https://i11www.iti.kit.edu/extra/publications/nw-dlhqm-10.pdf ;
libavoid, https://www.adaptagrams.org/documentation/libavoid.html

- **Algorithm.** Route over a sparse visibility graph minimizing
  k_ink·ink + k_len·Σ ℓ/|st| + k_cap·overflow; order paths inside bundles by
  metro-line crossing minimization; draw each edge as its own parallel curve
  with biarc hubs. Pupyrev et al. 2010 apply it after Sugiyama; libavoid
  nudges parallel orthogonal segments apart.
- **Against FDEB:** force bundles "are often ambiguous in a sense that it is
  hard to follow an individual edge".
- **Fit: high.** With fixed ports and a DAG, sort strands at the exit port by
  target position and at the entry port by source position; put unavoidable
  crossings once, at the trunk midpoint. Wide bundles cost space.

### 2.5 Aggregation by hierarchy level

Elmqvist and Fekete, TVCG 2010, https://cs.au.dk/~elm/pdf/hieragg.pdf ;
Balzer and Deussen, APVIS 2007, https://doi.org/10.1109/APVIS.2007.329288
(abstracts).

- **Technique.** Draw edges between aggregates at the current level of detail
  and expand on demand; Balzer and Deussen bundle edges between clusters in 2D
  or 3D, with transitions between levels.
- **Strata levels.** Unit pair (9 trunks with calls), module pair inside a
  package (32 ribbons), call (strand). Width precedents: IslandViz (imported
  packages) and Sourcetrail (edge count, digest 1.5).
- **Hides.** A trunk says only "some module of P calls some module of Q";
  keep members listable and strands visible on selection. **Fit: high.**

### 2.6 Layered strata and height tiers

GitHub globe, https://github.blog/engineering/how-we-built-the-github-globe/ ;
IslandViz (1.8); Hong et al. (1.3).

- **Technique.** One height band per edge kind, and arc height by distance
  class within a band. GitHub uses "three different orbits": "the longer the
  two points are apart, the further out we'll pull out any specific arc into
  space". IslandViz spreads service links "evenly across the available
  height".
- **Strata.** Keep today's kind strata (ground imports, pane same-module,
  plate lane within-package, sky cross-package). Replace the continuous
  bulge with fixed tiers by rows skipped (0 to 3), so same-span arcs run
  parallel.
- **Fit: high**, though tiers still overlap in projection (2.9).

### 2.7 Direction: tapers, gradients, and position

Holten and van Wijk, CHI 2009, as summarized by Holten, Isenberg, Fekete, van
Wijk, report 2010 (read), https://hal.science/hal-00696823 ; the PacificVis
2011 extension adds textured edges (not read).

- **Findings.** In 2009 a taper (wide at the source) "showed the best
  performance", and combining cues gave no significant gain. In the
  follow-up, tapered and animated beat biased curvature and did not differ,
  except at medium length, where tapered was faster.
- **Strata.** `Line2` has constant width, hence today's luminance gradient;
  mesh ribbons can taper. A levelled placement makes direction positional
  (forward and rightward), so tapers confirm rather than carry it.

### 2.8 Edge lenses and detail on demand

Wong, Carpendale, Greenberg, InfoVis 2003,
https://grouplab.cpsc.ucalgary.ca/grouplab/uploads/Publications/Publications/2003-EdgeLens.Infovis.pdf ;
Tominski et al., IV 2006, https://vca.informatik.uni-rostock.de/~ct/software/GraphLenses/

- **EdgeLens** bends edges away from the focus: reject, edges would move.
  The **local edge lens** shows only edges incident to nodes in the lens: it
  filters, so it fits. Extend hover to panes and plates; a trunk click lists
  its calls in the inspector (Nx).

### 2.9 Depth, transparency, and crossings of 3D lines

Everts et al. 2009 (poster), https://tobias.isenberg.cc/p/Everts2009DDH ; Ware
and Mitchell 2008, https://scholars.unh.edu/ccom/467 ; Zhang et al. 2025,
https://arxiv.org/abs/2508.00950 ; https://discourse.threejs.org/t/threejs-and-the-transparent-problem/11553 ;
McGuire and Bavoil 2013, https://jcgt.org/published/0002/02/09/

- **Depth-dependent halos.** A canvas-coloured halo grows with depth
  difference: "lines with the same distance to the viewer do not occlude one
  another", while a line behind shows a gap, so crossings read as over or
  under. In three.js: a wider canvas-colour pass with polygon offset first.
- **Depth cues.** With stereo and motion, observers traced paths in 333-node
  graphs with under 10 % error (Ware and Mitchell); Strata has neither by
  default. Lines apart in 3D can look crossed from a viewpoint and may cost
  like 2D crossings (Zhang et al.), so measure in the preset projections.
- **three.js.** Transparent objects sort per object, not per segment. Use
  opaque lines dimmed by mixing toward `#0b1016`, alpha only for glass, and
  `renderOrder` per stratum; weighted blended OIT is the fallback.

## 3. Combining placement and routing

### 3.1 Which placement makes routing easiest

| Placement (tempura) | Plates | Cross-unit pairs | Plate arcs against flow | Plate arc crossings | Package = one slab |
| --- | --- | --- | --- | --- | --- |
| Tree order, 4 rows (current) | 7 | 11 forward, 8 back, 2 in row | 12 of 35 | 26 | Yes |
| Global module levels | 25 fragments, 8 rows | all forward | n/a | n/a | No |
| Package plates by level, root split, topological inside | 8 | all forward | 0 of 35 | 10 | Yes |

Plate arc crossings are one-page crossings among arcs in each plate's front
lane (76 % of cross-module calls). The global row is the placement track's
`levels` variant (footprint 45.6 × 84 units).

- **Global module levels** split `mesh` (levels 0–3) and `electrostatics`
  (0–4) across rows: the majority traffic becomes cross-row, and a package is
  no longer one section slab. Reject as default.
- **Package plates by level** keep two regimes: calls inside a package run
  left to right in the plate's lane; calls across packages leave by the front
  port and enter the target's back port. Two rules and a lane order suffice.
- **Topological order alone is not enough.** Sorting by level (ties in tree
  order) raises plate crossings from 26 to 62; DFS reverse postorder gives 16,
  and dependency-preserving adjacent swaps 10. Direction comes free;
  crossings need the extra step.
- **The cost is span.** In 4 rows, 10 of 21 cross-unit pairs skip a row
  (current: 5). Test network-simplex rows, shared rows, and a side strip for
  foundations used by three or more packages (`specs`).

### 3.2 Recommended pairing

Placement (Python, view block):

1. Make units: one per package, except that a package on a package cycle
   splits into level slices. In tempura the root becomes `tempura·top`
   (`linear_dot_array`) and `tempura·base` (four foundations).
2. Order units by DSM partition and rank them by network simplex. Rows run
   back to front by descending level; adjacent levels may share a row, left
   to right, within a width budget.
3. Order panes in a plate by DFS reverse postorder, then by
   dependency-preserving swaps that reduce arc crossings; ties by tree order.
4. Order plates in a row by level, then by exact-fraction barycenter of
   their cross-row partners.

Routing (Python computes every control point; the renderer draws):

1. **Same module:** on the pane as now; at overview, faded to pane texture
   (the LSM rule: floors already say "down").
2. **Within a package:** one ribbon per ordered module pair in the plate's
   front lane, as a left-to-right arc tiered by panes spanned; calls as
   parallel strands.
3. **Across packages:** one trunk per unit pair through fixed ports (source
   front edge, target back edge), as a sky arc tiered by rows skipped; HEB
   polygon pane → port → port → pane; strands ordered as in 2.4.
4. **Imports:** dashed on the ground; at overview only import-only pairs (12
   module pairs, 6 unit pairs), since a ribbon or trunk stands for the rest.
5. **Rendering:** opaque lines dimmed by colour mixing, depth-dependent halos
   on trunks, short over long within a stratum, bright at the caller.

The overview then draws about 50 edge objects instead of about 350: 9 call
trunks, 6 import-only unit links, 32 ribbons, and 3 in-package import links.

### 3.3 Which routing degrades least under scope changes

- **Local routing survives scoping.** Ports, tiers, and lane offsets are
  computed once per snapshot, so strands keep their control points in every
  scope; scoping only dims, clips, and fades. FDEB, KDEEB, and winding roads
  couple edges: a scoped re-run moves bundles, a global run leaves orphan
  kinks.
- **Ports tidy the boundary.** At package scope, edges leave through one port
  and arrive through another: two stubs, not a fan of fading arcs. In face-on
  Elevation the stubs foreshorten, so mark them as screen-space portals
  naming the partner (the kinetic grid's idea). Leave hidden strands' lane
  offsets empty, so nothing shifts.

### 3.4 Metrics the builders should report

Report per variant against today's baseline; crossings lead (Purchase 1997:
"by far the most important aesthetic", https://research.monash.edu/en/publications/which-aesthetic-has-the-greatest-effect-on-human-understanding/).

1. Crossings between drawn edge objects at overview: in ground projection,
   and in the Axonometric and Plan screen projections at 1280×800.
2. One-page arc crossings inside plates (baseline 26; about 10 reachable).
3. Share of pairs and calls in the flow direction, back to front or left to
   right in a row (baseline 11 of 21 cross-unit pairs, 23 of 35 plate arcs).
4. Row spans of cross-package pairs (baseline 2/14/2/3 for spans 0/1/2/3)
   and total and mean edge length in ground projection.
5. Drawn edge objects at overview (about 350), draw calls (1,382), frame time
   (about 23 ms), aspect ratio (1.7:1), and row count.
6. Control points that differ between overview and any package scope
   (target 0).

### 3.5 Open questions for integration

- **Same-module calls at overview:** the LSM hides them; the owner wants all.
- **Ribbon width.** One strand per call is literal, not a metric scale; above
  a cap (for example 12 strands, likely at 10,000 functions), draw a solid
  ribbon with stepped width.
- **Back edges.** None in tempura; elsewhere the LSM rule draws exactly
  these, at full strength.

## 4. What the picture should look like

**Overview (Axonometric).** Four rows run back to front: plotting,
`linear_dot_array`, and layout; electrostatics and strain; mesh; meshing and
the foundations. Each plate carries a few nested left-to-right arcs in its
front lane; about nine trunks drop forward into the plates in front, higher
the more rows they skip. Same-module calls are faint pane texture, and no
arrowheads are needed: every edge runs forward, rightward, and down.

**Package scope (Elevation, `mesh`).** The slab shows 13 panes in dependency
order, `_raster_edits` and `_plan` on the left to `_canonical` and `_regions`
on the right, floors face-on. Seventeen call ribbons and one import link arc
rightward in the front lane with about nine crossings, strands visible. The
electrostatics trunk and the plotting and strain import links arrive at the
back port, the foundations link leaves at the front, and both ports show as
labelled portals rather than fading arcs.

**Module scope (Elevation, one pane).** Same-module calls stay on the face.
Incident ribbons unzip into strands that end on specific cards and keep their
trunk lane order, so they do not cross; partners are named where strands
leave the slab.

**Selected pipeline.** The reach set lights in place; within each ribbon and
trunk only the selected strands brighten, at fixed offsets, and the rest dims
to 30 %. The pipeline reads as a cascade from back left to front right and
down the floors, so any lit edge against that cascade is a back edge, the one
thing to check. Nothing moves except the wavefront and pulses.

## Uncertainties

- No paper figure was viewed. Caserta et al. 2011 is cited from its abstract
  (per-level heights in 2.1 are assumed); the 2009 CHI results come from the
  2010 follow-up's summary.
- Tempura numbers come from my scripts; straight pane-centre segments
  overstate in-plate crossings, hence one-page arc crossings in 3.1. The row
  assignment is a sketch, and the placement track's `metrics.json` was in
  progress when cited.
