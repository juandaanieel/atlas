# Explorer references and visual language

> Status: Research (2026-10-09). Companion to `signal-grid-explorer.md`.
> Decides the visual language for the next explorer; does not change code.

## Scope and method

The owner asked for a more dynamic and visual explorer, possibly in three.js,
in which every level of connection is visible and distinguishable. This
document surveys prior art, measures candidate libraries, and fixes one visual
language that the implementation adopts.

Method and limits:

- Sources are project pages, documentation, papers, and the shipped CSS of
  product sites. Every claim carries its URL.
- Bundle sizes were measured on 2026-10-09 by downloading each package from
  unpkg and gzipping it at level 9. three.js was bundled to a single IIFE with
  esbuild 0.28.2 to measure what Atlas would actually vendor.
- Colour, font, and timing tokens for product sites were extracted from their
  live CSS, not estimated from screenshots.
- Screenshots were captured with headless Chromium or taken from project
  READMEs and saved under `/tmp/atlas-shots/refs/` (temporary; re-capture
  before relying on them). Where a capture failed or was not attempted, the
  entry says the visual was not seen.
- The palette in section 4 was checked with the dataviz skill's validator
  (OKLab ΔE, Machado 2009 CVD simulation, WCAG contrast) against the explorer's
  canvas colour `#0b1016`.

Data scale that the design must serve, from `tempura/.atlas/atlas.json`
(2026-10-09): 306 callables in the call map, 300 resolved internal edges,
39 modules that own callables, 88 files, 694 import statements, 18 classes
(64 methods), 101 roots, 43 load-bearing, 13 wrappers, 3 clone groups,
5 dead, 0 import cycles. The upper target is 10,000 nodes. The graph is
hierarchical (package > module > class > function) and directed, with a
small number of back edges.

---

## 1. Software-visualization references

### 1.1 CodeCity (Wettel and Lanza)

URL: https://wettel.github.io/codecity.html ; evaluation:
https://www.inf.unibz.it/~rrobbes/p/ICSE2011-codecity.pdf
Visual: not captured; described from the project page and paper.

CodeCity renders a system as a 3D city: classes are buildings, packages are
districts, and building dimensions encode chosen metrics (polymetric views).
It was built in Smalltalk on Moose with OpenGL. A controlled experiment with
41 participants (ICSE 2011) found higher correctness and lower completion time
than an Eclipse-plus-spreadsheet baseline on reverse-engineering tasks. As I
understand the paper (not re-read for this survey), the tasks centred on
metric and structural overview questions rather than call tracing.

- Borrow: a stable spatial map the reader learns once; districts as nested
  ground areas, which in 2D is the package bracket over module columns.
- Borrow: evaluation evidence that a consistent spatial metaphor helps
  overview tasks.
- Reject: height and footprint as metrics. Atlas dropped metric encodings as
  noisy (principle 2), so a third dimension would have nothing honest to show.
- Reject: no relation edges in the base metaphor; the evidence does not cover
  call-graph reading.

### 1.2 CodeCharta (and ExplorViz)

URLs: https://codecharta.com , https://github.com/MaibornWolff/codecharta ,
https://explorviz.dev
Visual: `/tmp/atlas-shots/refs/codecharta-hero.png` (README image).

![CodeCharta](/tmp/atlas-shots/refs/codecharta-hero.png)

CodeCharta is the maintained descendant of CodeCity: files are buildings,
folders are districts, and the user assigns metrics to area, height, and
colour. Edges show temporal coupling (files that change together). Analysis
and rendering run locally. ExplorViz applies the city metaphor to runtime
traces; I could not confirm its renderer from its public pages.

- Borrow: the mapping panel under the map (Area / Height / Color / Edges)
  states each channel binding in words. Atlas's key should be equally literal.
- Borrow: the delta view comparing two snapshots, for a later
  `atlas.previous.json` diff.
- Reject: green-to-red metric colouring; it spends hue on magnitude and turns
  the whole map into an alarm.
- Reject: temporal-coupling and runtime edges; Atlas draws static calls only
  (principle 5).
- Reject: labels as floating callouts over a tilted plane; they overlap and
  occlude buildings in the capture.

### 1.3 GitHub Next repository visualizer

URL: https://githubnext.com/projects/repo-visualization/
Visual: not seen (the essay's figures did not render in headless capture).

Circle packing of the file tree: each file and folder is a circle, colour is
file type, size is file size. An optional mode scans imports and shows, on
hover, which files import or are imported by the hovered file. A GitHub Action
renders the diagram to a static SVG. The author frames it as a "fingerprint"
that lets a reader recognise a repository at a glance.

- Borrow: the fingerprint goal. The overview zoom of the grid should be
  recognisable and comparable across snapshots.
- Borrow: import relations stay quiet until hovered, then become explicit.
- Reject: colour by file extension; identity hue spent on trivia.
- Reject: circle packing has no axis for direction or depth and wastes area.

### 1.4 Gource

URL: https://gource.io
Visual: `/tmp/atlas-shots/refs/gource-linux.jpg` (project image).

An animated tree of the repository (directories as branches, files as leaves)
driven by commit history, with contributors moving between files. OpenGL,
camera can orbit.

- Borrow: motion that tells a story about change over time. If Atlas ever
  animates, history (snapshot to snapshot) is the honest use.
- Reject: continuous physics motion and a layout that never settles; it is a
  film, not a reading surface, and contradicts "a healthy codebase looks calm".

### 1.5 Sourcetrail

URLs: https://github.com/CoatiSoftware/Sourcetrail ,
https://github.com/CoatiSoftware/Sourcetrail/blob/master/DOCUMENTATION.md
Visual: `/tmp/atlas-shots/refs/sourcetrail-ui.png` (README image).

![Sourcetrail](/tmp/atlas-shots/refs/sourcetrail-ui.png)

An offline source explorer (C, C++, Java, Python; archived end of 2021). The
graph centres on the active symbol. Class nodes nest their members under
PUBLIC and PRIVATE sections; by default only members with edges are shown and
an expander reveals the rest. Edges attach to the member row. Edge kinds are
coloured (calls yellow, variable use blue, the rest grey). Parallel edges
bundle into one stroke whose thickness shows how many it carries. A depth
slider extends the graph; a `?` button opens the legend.

- Borrow: classes as compact boxes whose rows are members, edges entering at
  the member's row, private members collapsed behind an expander. This is the
  closest precedent for Atlas's class box.
- Borrow: bundled edges with thickness, for module-pair aggregation at
  overview zoom.
- Borrow: graph and code side by side; the legend one keystroke away.
- Reject: one hue per relation kind. It leaves no hue for defects; Atlas
  encodes relation kind by line style and geometry instead.
- Reject: re-centring and re-laying out on every navigation (moves things).

### 1.6 SciTools Understand (and CodeCompass)

URLs: https://docs.scitools.com/graphs/index.html , https://scitools.com/graphs ,
https://github.com/Ericsson/CodeCompass
Visual: not seen.

Understand offers dozens of graph types (Calls, Called By, Butterfly,
Dependencies, UML Class, Control Flow, Architecture, cluster variants that
group functions by file or architecture). CodeCompass (Ericsson) is a
web-based comprehension tool for C/C++, C#, and Python with function-call,
class, and include diagrams.

- Borrow: the butterfly graph (callers on one side, callees on the other) as
  the model for selection emphasis: direct callers plus downstream tree.
- Borrow: clustering functions by file, which the module columns already do.
- Reject: many graph types and variants. Atlas keeps one geometry.
- Reject: per-query Graphviz relayout.

### 1.7 Obsidian graph view

URL: https://obsidian.md/help/plugins/graph
Visual: not captured.

A force-directed graph of notes and links with a global and a local view. The
local view has a depth slider. Display options include arrows, a text fade
threshold, node size, link thickness; forces (centre, repel, link force, link
distance) are user-tunable. Hover highlights a note's links.

- Borrow: the text fade threshold, which is semantic zoom for labels.
- Borrow: local depth control; Atlas dims beyond N hops instead of hiding.
- Reject: tunable physics; positions depend on parameters and history, not on
  the code.
- Reject: colour groups defined by arbitrary search queries.

### 1.8 Nx project graph

URL: https://nx.dev/docs/features/explore-graph
Visual: not seen (the documentation page's figures did not render).

Interactive project and task graphs for monorepos. Composite nodes stand for
all projects in a folder and expand in place; focus plus a proximity control
narrows the graph; a Start/End pair traces the dependency chain; clicking an
edge lists the files that create the dependency.

- Borrow: composite nodes that expand in place, which matches expanding a
  class box or collapsing a package at overview.
- Borrow: clicking an aggregated edge lists its member calls in the
  inspector.
- Reject: focus that re-lays out the graph.

### 1.9 dependency-cruiser

URL: https://github.com/sverweij/dependency-cruiser
Visual: `/tmp/atlas-shots/refs/depcruise-sample.png` (README image).

![dependency-cruiser](/tmp/atlas-shots/refs/depcruise-sample.png)

Validates JavaScript/TypeScript dependencies against rules (forbidden paths,
circular dependencies, orphans) and reports as dot, HTML, Mermaid, JSON, or
text. In the sample, folders are nested rounded clusters, a violating edge is
thick red, and external modules are ghosted grey outside the clusters.

- Borrow: one red for a rule violation, black or grey for everything else.
- Borrow: out-of-scope targets drawn ghosted rather than hidden, the same
  honesty as Atlas's scope chevrons.
- Reject: yellow node fills and Graphviz re-layout on every change.

### 1.10 Madge and pydeps

URLs: https://github.com/pahen/madge , https://github.com/thebjorn/pydeps
Visual: not embedded (`madge.svg` and `pydeps.svg` downloaded to the refs
folder but not reviewed in detail).

Madge graphs JavaScript module imports with Graphviz and colours nodes blue
(has dependencies), green (no dependencies), red (circular). pydeps reads
Python import opcodes from bytecode, renders with Graphviz, colours modules
by cluster, and `--show-cycles` reduces the graph to the modules and edges in
import cycles.

- Borrow: `--show-cycles` as an interaction. Selecting a red import arc solos
  that cycle by emphasis.
- Reject: colour for non-defects (Madge blue/green, pydeps cluster hues).

### 1.11 IntelliJ Dependency Structure Matrix

URL: https://www.jetbrains.com/help/idea/dsm-analysis.html ; evidence:
https://hal.archives-ouvertes.fr/hal-00343819 (Ghoniem, Fekete, Castagliola,
InfoVis 2004)
Visual: not captured.

Rows and columns are the module/package/class tree, ordered so that the most
used items sink to the bottom; a well-structured project produces a
lower-left triangle. Shading and numbers show dependency counts; mutual
dependencies are red; selecting a row marks dependents green and
dependencies yellow. Ghoniem et al. found matrices more readable than
node-link diagrams above about 20 vertices for most tasks, with path finding
the exception.

- Borrow: an ordering under which a healthy system has a recognisable shape,
  the same idea as the grid's downward calls.
- Borrow: a matrix where it wins, i.e. the class methods-by-fields blueprint
  in the inspector, not the main canvas, which serves path reading.
- Reject: numbers in cells and count shading (principle 1).

### 1.12 Structure101 levelized structure map

URL: https://www.sonarsource.com/structure101/docs/java/studio/content/restructure101/lsm
Visual: `/tmp/atlas-shots/refs/structure101-lsm-crop.png` (documentation
image, cropped).

![Structure101 LSM](/tmp/atlas-shots/refs/structure101-lsm-crop.png)

The direct ancestor of the signal grid. Items are levelized into rows so that
each item depends on something on the row below and items in one row do not
depend on each other. Because the rows already say "depends downward", the
documentation recommends hiding item-to-item arrows and showing only feedback
(upward) dependencies plus those of the current selection. Cyclic groups
("tangles") can be collapsed into one component; containment nests and
drills down by double-click.

- Borrow: show the exceptions, not the rule. At overview zoom, downward call
  edges can recede almost entirely while back edges and defects stay visible.
- Borrow: drill-down in place for containment.
- Reject: boxes nested five deep with grey bevelled chrome and small icons.

### 1.13 Sonargraph

URL: https://www.hello2morrow.com/products/sonargraph/architect
Visual: `/tmp/atlas-shots/refs/sonargraph-exploration.png` (product page
image, cropped).

![Sonargraph exploration view](/tmp/atlas-shots/refs/sonargraph-exploration.png)

Static analysis with an architecture DSL (Python 3 supported). The exploration
view lists packages vertically and draws dependencies as arcs on one side,
running counter-clockwise; cyclic groups are red. The graph view draws any
selection as a layered graph; a cycle view isolates one cyclic group, and a
"break-up computer" proposes the smallest set of edges to cut.

- Borrow: an arc diagram along an axis of modules for imports. In Atlas this
  becomes an import lane above the column headers, with cycles red.
- Borrow (later, in Python): the minimal cut for a cycle, listed in the
  inspector.
- Reject: green for ordinary dependencies; it spends a hue on the healthy
  case.

### 1.14 Hierarchical edge bundling

URLs: https://doi.org/10.1109/TVCG.2006.147 (Holten, TVCG 2006) ,
https://observablehq.com/@d3/hierarchical-edge-bundling
Visual: not captured (the notebook chart did not render headless).

Adjacency edges are drawn as B-splines bent toward the path through the
containment tree, controlled by a bundling strength β; Holten's software
call-graph example uses β = 0.85. Bundling reduces clutter and exposes
relations between subsystems. The d3 notebook (`d3.curveBundle.beta(0.85)`)
recolours incoming and outgoing edges and bolds the related labels on hover
without moving anything.

- Borrow: route aggregated edges along the containment hierarchy at overview
  zoom so module-to-module traffic reads as a few bundles.
- Borrow: hover changes stroke and label weight only.
- Reject: the radial layout; Atlas has left the sunburst behind.
- Reject: bundling at reading zoom, where it hides which card calls which.

### 1.15 Flame graphs and speedscope

URL: https://github.com/jlfwong/speedscope
Visual: `/tmp/atlas-shots/refs/speedscope.png` (README image).

![speedscope](/tmp/atlas-shots/refs/speedscope.png)

A profile viewer that runs entirely in the browser with WebGL rendering. Rows
are stack depth; labels are monospace, clipped with ellipses inside fixed-height
bars; a minimap gives the overview. "Sandwich" lists callers and callees of
one function.

- Borrow: depth as rows with clipped monospace labels in fixed-height bars,
  and a minimap; fully offline in-browser operation.
- Borrow: the sandwich idea for the inspector (callers above, callees below).
- Reject: colour by hashed function name; a rainbow of identity hues.

---

## 2. Graph and WebGL libraries

Constraints from Atlas: the explorer opens from `file://` with no build step.
Module scripts fail there: MDN states that loading an HTML file from a
`file://` URL "you'll run into CORS errors due to JavaScript module security
requirements"
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
Every vendored library must therefore be one classic script (UMD or IIFE),
as `elk.bundled.js` is today. The approved plan caps explorer assets at
200 KB.

Sizes are minified bytes as published (or as bundled with esbuild where
noted), measured 2026-10-09.

| Library (version) | One classic file | Raw / gzip | Rendering | Determinism | Verdict |
| --- | --- | --- | --- | --- | --- |
| three.js (0.186.1) | No: ESM only since r161; needs a one-off esbuild IIFE | 537 KB / 134 KB (minimal IIFE); 743 KB / 189 KB (full) | WebGL2 (WebGPU optional) | No layout; deterministic given positions | Reject |
| 3d-force-graph (1.80.1) | Yes (UMD, bundles three) | 1,390 KB / 364 KB | three.js WebGL | d3-force-3d seeded LCG, but `cooldownTime` defaults to 15 s of wall clock | Reject |
| cosmos.gl (@cosmos.gl/graph 3.5.1) | Yes (`index.min.js` UMD) | 744 KB / 194 KB | WebGL2 via luma.gl, GPU simulation | `randomSeed`; fixed positions with simulation off | Reject |
| sigma.js (4.0.0) + graphology (0.26.0) | Yes (UMD each) | 391 KB / 103 KB + 74 KB / 14 KB | WebGL2 marks, 2D canvas contexts (labels) | Positions supplied; layouts seedable | Fallback only |
| G6 (5.1.1) | Yes (UMD) | 1,383 KB / 391 KB | Canvas, SVG, or WebGL via @antv/g | Layout-dependent | Reject |
| PixiJS (8.22.0) | Yes (IIFE) | 841 KB / 237 KB | WebGL / WebGPU scene graph | No layout | Reject |
| d3 (7.9.0) and modules | Yes (UMD per module) | full 280 KB / 92 KB; d3-force 8 KB; d3-hierarchy 15 KB; d3-shape 31 KB; d3-zoom 10 KB plus its deps | SVG or Canvas (user draws) | d3-force uses a fixed-seed LCG and phyllotaxis start | Optional micro-vendor; prefer hand code |
| elkjs (0.12.0) | Yes | 1,610 KB / 467 KB | Layout only | Layered is deterministic; `randomSeed` option | Remove (as planned) |
| dagre (@dagrejs/dagre 3.1.1) | Yes (UMD) | 49 KB / 17 KB | Layout only | Deterministic | Not needed |
| cytoscape.js (3.34.3) | Yes (UMD) | 436 KB / 136 KB | Canvas; WebGL preview since 3.31 | `preset` layout; others take `randomize` | Reject |
| deck.gl (9.4.0) | Yes (`dist.min.js`) | 2,073 KB / 575 KB | WebGL2 / WebGPU via luma.gl | No graph layout | Reject |
| regl (2.1.1) | Yes (UMD) | 87 KB / 29 KB | WebGL1 functional wrapper | Not applicable | Reserve |

Notes per library:

- **three.js.** https://threejs.org . The last UMD build (`build/three.min.js`)
  exists for 0.160.1 and is gone from 0.161.0. A minimal scene (orthographic
  camera, instanced meshes, line segments, raycaster) bundles to 537 KB,
  2.7 times the whole asset budget. There is no text: labels need SDF text
  libraries or DOM overlays. Interaction is raycasting plus add-on camera
  controls. Verdict: reject for this data (section 5).
- **3d-force-graph.** https://github.com/vasturiano/3d-force-graph . Physics
  via d3-force-3d (`randomSource`, phyllotaxis start) or ngraph. `dagMode`
  constrains one axis (`td`, `lr`, `radialout`, ...) and by default throws on
  cycles; Atlas call graphs contain recursion. `cooldownTime` defaults to
  15,000 ms, so the number of ticks, and therefore the final layout, depends
  on frame rate unless `cooldownTicks` is fixed. `linkDirectionalParticles`
  gives flow pulses. Capture of the official tree example in `td` mode:
  `/tmp/atlas-shots/refs/3d-force-graph-dag.png`. The layered tree collapses
  into a few overlapping discs with no readable labels.

  ![3d-force-graph DAG mode](/tmp/atlas-shots/refs/3d-force-graph-dag.png)
- **cosmos.gl.** https://github.com/cosmograph-org/cosmos . All simulation and
  drawing on the GPU, aimed at hundreds of thousands of points. `randomSeed`
  at init, `setPointPositions` plus `enableSimulation: false` for fixed
  layouts, curved links, per-link width and colour, hover and click events.
  No built-in labels in the documentation I read. Points, not boxes with rows.
- **sigma.js.** https://www.sigmajs.org , https://github.com/jacomyal/sigma.js .
  WebGL renderer on graphology for "thousands of nodes and edges"; v4 replaces
  per-type programs with declarative primitives (node shapes and layers, edge
  paths and extremities;
  https://v4.sigmajs.org/how-to/technical/migration-v3-v4/). The v4 bundle creates one WebGL2 and several 2D
  canvas contexts, which I take to be the label layers (not verified in
  docs). Reducers give emphasis without moving nodes. Fallback if a measured
  need for WebGL appears, but class boxes with rows are not its native shape
  and it alone is twice the budget.
- **G6.** https://g6.antv.antgroup.com/en/manual/introduction . Full framework:
  combos (nested groups), ten-plus layouts including dagre, behaviours
  (hover-activate, collapse-expand), animation, 3D extension. The deleted July
  plan chose it; it is seven times the budget.
- **PixiJS.** https://pixijs.com/8.x/guides/getting-started/intro . A capable
  WebGL/WebGPU 2D scene graph with bitmap text and vector graphics. No graph
  model or layout. Too large for what Atlas draws.
- **d3.** https://d3js.org/d3-force/simulation . `d3-force` defaults to a
  fixed-seed linear congruential generator and places nodes without
  coordinates in a phyllotaxis arrangement "to ensure a deterministic, uniform
  distribution". `d3-hierarchy` offers tree, cluster, partition (icicle),
  treemap, pack. `d3-shape` has `curveBundle`. None is required: Python owns
  coordinates, and Atlas's curves are cubic Béziers.
- **ELK.** https://eclipse.dev/elk/reference/options/org-eclipse-elk-randomSeed.html .
  The vendored file matches elkjs 0.12.0 byte for byte in size (1,609,707
  bytes). Python's rank and barycenter ordering replace it.
- **dagre.** https://github.com/dagrejs/dagre/wiki . Sugiyama-style layered
  layout (network-simplex, tight-tree, or longest-path ranking) with cluster
  support. Useful as a reading reference for the Python layout; nothing to
  vendor.
- **cytoscape.js.** https://js.cytoscape.org ,
  https://blog.js.cytoscape.org/2025/01/13/webgl-preview/ . Compound nodes,
  stylesheet model, preset layout. Its WebGL mode (about 1,200 nodes and
  16,000 edges went from 20 to over 100 FPS on an M1) does not support dashed
  lines, which Atlas needs for imports and clones.
- **deck.gl.** https://deck.gl/docs . Layered WebGL2/WebGPU rendering with
  picking, `autoHighlight`, `OrthographicView`; graph layers only in the
  community repository. Geospatial in orientation and ten times the budget.
- **regl.** https://github.com/regl-project/regl . Functional WebGL wrapper
  used by Bokeh and Deepscatter. If Canvas 2D ever proves too slow, a raw
  WebGL2 instanced pass for rectangles and line quads is a few hundred lines;
  regl is the fallback if that grows.

Verdict for the section: ship no graph or rendering library. Canvas 2D for
the picture, DOM for panels and tooltips, hand-written pan and zoom. Keep a
WebGL2 instanced edge pass as a measured escape hatch (section 5).

---

## 3. Modern visual language references

Product sites were captured where possible; colour, type, and timing tokens
come from each site's shipped CSS on 2026-10-09.

### 3.1 Linear

URLs: https://linear.app , https://linear.app/now/how-we-redesigned-the-linear-ui
Visual: `/tmp/atlas-shots/refs/linear.png`.

![Linear](/tmp/atlas-shots/refs/linear.png)

Measured tokens: background levels `#08090a`, `#0f1011`, `#141516`,
`#191a1b`; text `#f7f8f8`, `#d0d6e0`, `#8a8f98`, `#62666d`; accent `#7170ff`;
monospace "Berkeley Mono" with system fallbacks; `--speed-quickTransition: .1s`,
`--speed-regularTransition: .25s`, `--speed-highlightFadeIn: 0s`,
`--speed-highlightFadeOut: .15s`. The redesign post describes generating
themes from three variables (base, accent, contrast) in LCH and deliberately
reducing chroma and chrome.

- Borrow: four background levels separated by tiny lightness steps; a
  four-step text ramp; highlight on in 0 ms and off in 150 ms.
- Borrow: tokens derived in a perceptual space from few inputs.
- Reject: the marketing page's multi-second decorative loops (1.6 to 3.2 s
  animations in its CSS) and the brand indigo; Atlas has no brand colour on
  the canvas.

### 3.2 Vercel Geist

URL: https://vercel.com/geist/colors
Visual: not embedded.

Geist defines ten-step scales where the step number is a role: 100 to 300
component backgrounds (default, hover, active), 400 to 600 borders, 700 to 800
high-contrast fills, 900 to 1000 text and icons. The site's CSS uses short
transitions (0.15 to 0.25 s dominate) and `cubic-bezier(.4,0,.2,1)`.

- Borrow: name tokens by role (fill, rule, edge, border, text), not by hue.
- Reject: ten hue families times ten steps; Atlas needs three hues.

### 3.3 Stripe

URLs: https://stripe.com/blog/accessible-color-systems , https://docs.stripe.com
Visual: not embedded.

Stripe built its palette in CIELAB so equal lightness looks equal across
hues, with the rule that colours five levels apart are safe for small text.
The docs site uses 150 ms and 240 ms transitions with
`cubic-bezier(0, .09, .4, 1)`.

- Borrow: validate colours numerically in a perceptual space; guarantee
  contrast by construction.
- Reject: animated mesh gradients on the marketing site (known from public
  writing, not seen here); gradients carry no structure.

### 3.4 GitHub globe

URL: https://github.blog/engineering/engineering-principles/how-we-built-the-github-globe/
Visual: not captured.

three.js globe of live pull requests: a static SVG placeholder shows
instantly and crossfades into WebGL; four quality tiers drop pixel density,
raycast frequency, and geometry when frame rate falls below 55.5 FPS; merge
arcs land with a solid dot that stays and a ring that scales up and fades.

- Borrow: render something static and correct first, then add motion.
- Borrow: a landing cue when a pulse reaches its target (dot stays, ring
  fades), used once per pipeline pass.
- Reject: a 3D object chosen for spectacle; glow halos that hide aliasing.

### 3.5 Raycast

URL: https://www.raycast.com
Visual: `/tmp/atlas-shots/refs/raycast.png`.

![Raycast](/tmp/atlas-shots/refs/raycast.png)

Measured: near-black backgrounds `#07080a`, `#0c0d0f`, `#111214`; accent
`#ff6363`; Inter and Geist Mono; durations 0.2 to 0.3 s; easings
`cubic-bezier(.23,1,.32,1)` and `cubic-bezier(.16,1,.3,1)`.

- Borrow: keyboard-first operation (a command palette maps to Atlas's go-to
  and scope); fast ease-out curves; elevation by one or two lightness steps.
- Reject: glass and blur backdrops; a red brand accent (Atlas's red means
  import cycle and nothing else).

### 3.6 Warp

URL: https://www.warp.dev
Visual: `/tmp/atlas-shots/refs/warp-factory-grid.png` (rendered in light mode
by the headless browser).

![Warp factory grid](/tmp/atlas-shots/refs/warp-factory-grid.png)

The homepage's "[ fig. 1 — the factory ]" is an 8 × 28 grid of squares whose
state is encoded by fill, with a glyph legend in the text: queued ▩, working
■, waiting ▨, shipped □. Monospace captions frame the figure. CSS uses
`cubic-bezier(.16,1,.3,1)` and 0.15 s transitions.

- Borrow: state encoded by fill pattern (solid, hatched, outline, faint) in
  a grid, with the legend written in the same glyphs. This is the vocabulary
  of Atlas's ghost cards and hatched private tails.
- Borrow: figure captions in monospace brackets for the key and panels.
- Reject: a long decorative loop (a 44 s animation in its CSS) unrelated to
  data.

### 3.7 Cosmograph

URL: https://cosmograph.app
Visual: `/tmp/atlas-shots/refs/cosmograph.png`.

![Cosmograph](/tmp/atlas-shots/refs/cosmograph.png)

GPU force graphs for very large networks and embeddings, with histogram and
timeline filters linked to the graph, running locally.

- Borrow: linked filters (a click on a tree badge or key entry filters the
  picture by emphasis).
- Reject: the hairball-with-glow aesthetic in the capture: a dense blue link
  mass with multicoloured points. It is striking and says nothing about
  structure. This is the picture Atlas must not become.

### 3.8 Observable and d3 notebooks

URL: https://observablehq.com/@d3/hierarchical-edge-bundling
Visual: not captured (chart did not render headless).

The notebook's hover handler raises the hovered node's incoming and outgoing
paths, recolours them, and bolds the related labels; on mouse out it restores
them. Nothing moves.

- Borrow: emphasis by stroke, z-order, and label weight only; the notebook
  form as the model for Atlas's Guide.
- Reject: `mix-blend-mode: multiply` and two hues for in and out; both assume
  a light background, and Atlas uses taper and luminance for direction.

### 3.9 IBM Carbon motion

URL: https://carbondesignsystem.com/elements/motion/overview/
Visual: not applicable (specification).

Carbon separates productive motion ("efficiency and responsiveness, while
remaining subtle") from expressive motion. Durations: 70, 110, 150, 240, 400,
700 ms. Productive easings: standard `cubic-bezier(0.2, 0, 0.38, 0.9)`,
entrance `cubic-bezier(0, 0, 0.38, 0.9)`, exit `cubic-bezier(0.2, 0, 1, 0.9)`.

- Borrow: productive motion only, with Carbon's curves and duration scale.
- Reject: expressive motion for routine operations.

### 3.10 Bret Victor, Up and Down the Ladder of Abstraction

URL: https://worrydream.com/LadderOfAbstraction/
Visual: not captured.

An interactive essay that moves between concrete states and abstractions of
them (one run, all runs over time as a trace, all parameter values) with
direct controls.

- Borrow: semantic zoom as a ladder: the same picture aggregated over one
  dimension at each level, never a different picture.
- Reject: nothing specific; it is light-themed and pedagogical.

---

## 4. Visual-language specification

### 4.1 Channel grammar

Each channel has one job. Every mark uses at least two channels, so nothing
depends on colour alone.

| Channel | Job | Never used for |
| --- | --- | --- |
| Position | Containment (column, box, row in box) and call depth (row) | Emphasis; selection never moves a mark |
| Line style | On edges, relation kind: solid call, dashed import, dotted clone. On card outlines, state: solid live, dashed dead, dotted clone member | Anything else; separators and rules are always solid |
| Hue | Signal class: teal load-bearing, violet clone, red import cycle | Relation kind, file type, magnitude, selection |
| Luminance and opacity | Attention: selection, hover, trace, pipeline, lens, dimming; ghost for dead | Identity |
| Width and taper | Direction (wide at caller, narrow at callee) and emphasis | Counts in reading zoom |
| Fill pattern | Hidden content (hatched tail) and absence (ghost outline) | Decoration |
| Layer (z-order) | Precedence: what may cover what | Meaning on its own |
| Motion | Change of view state, and one transient flow cue on an explicit pipeline selection | Moving a mark on hover or selection; an idle canvas |

Two deliberate deviations from `signal-grid-explorer.md`:

- **Trace becomes bright, not green.** The current trace green `#75d2ad`
  sits ΔE 5.2 from the mock's teal `#3cc8a8` under normal vision and 3.7
  under protan simulation (validator floor 15). Teal means load-bearing, so
  the trace uses the emphasis luminance plus flow pulses.
- **Intra-class calls are drawn in expanded classes** as small arcs in the
  box margin, because the owner asked for every level to be visible. They stay
  hidden while the class is collapsed, as planned.

### 4.2 Connection levels and their marks

| Level | Geometry | Line style | Layer | Motion | Reserved colour |
| --- | --- | --- | --- | --- | --- |
| Package > module | Bracket over the module columns of a package; one column per module | Bracket and column rules 1 px `rule` | 0 | Scope morph | None |
| Module > class | Class box inside its module column, at the row of its shallowest public method | Box border 1 px `border` | 5 | Expand/collapse | None |
| Class > method | Rows: constructor first, public methods in source order; private methods as a hatched tail | Hatch 1 px `rule` at 45°, 4 px pitch | 5 | Expand/collapse | None |
| Module > function | Card in the module column at its depth row | Card border 1 px `border` | 5 | Scope morph | None |
| Call, same module | Cubic curve inside the column, caller bottom-centre to callee top-centre | Solid, tapered 1.5 to 0.75 px, `edge` | 2 | Pulse only in a selected pipeline | None |
| Call, cross module | Same curve, crossing column gutters; at overview, one bundle per module pair | Solid tapered; bundle width 1 to 4 px by log of member count | 2 (bundles 1) | As above | None |
| Call into a class | Curve ends on the box side at the method's row with a horizontal tangent and a 4 px port tick; calls from collapsed private methods leave from the tail | Solid tapered | 2 | As above | None |
| Call within a class | Collapsed: not drawn. Expanded: arcs in the box's right margin between rows | Solid 1 px `edge`, no taper; arc height encodes row distance | 5 (on the box, above its fill) | None | None |
| Call against depth (recursion, call cycle) | Curve leaves the caller's right side and loops upward; self-call is a 6 px loop at the card's right edge | Solid tapered | 2 | None | None |
| Module import | Arc in the import lane above the column headers, from importer to imported | Dashed 4/3, 1 px `rule`; tapered toward the imported module | 3 | None | None |
| Import cycle | Same lane, arcs of the cycle; both column headers underlined | Dashed 4/3, 1.5 px | 3 (top of lane) | None | Red |
| Clone link | Straight chord between consecutive members of a clone group (straight, so it never reads as a call) | Dotted 1/3, round caps, 1.5 px | 3 | None | Violet |
| Clone member | Card outline or class-row underline | Dotted outline 1.5 px; dotted underline in rows | 5 | None | Violet |
| Class fields | Field section under the method rows (detail zoom, or always for data-only classes) | Row text; glyph prefix | 5 | Expand/collapse | None |
| Owned vs injected collaborator | Glyph before the field name: ◆ owned (constructed in the class), ◇ injected (passed in); at detail zoom or on selection, a thin line from the glyph to the collaborator's class box | Solid 1 px `edge`, no taper | 2 | None | None |
| Method reads and writes fields | Access strip right of the method rows (detail zoom, expanded class, at most 12 fields): ● writes, ○ reads; the full matrix stays in the inspector | Glyphs only | 5 | None | None |
| Pipeline (reach from a root) | Selecting a root lights its reachable set as listed by the snapshot; everything else dims | Edges in the set at 2 px `emphasis`, tapered | 4 (above resting edges, below cards) | Wavefront reveal, then flow pulses | None |
| Cross-scope calls | Chevron on the card edge: bottom for calls leaving the scope, top for calls arriving from outside | 5 px chevron `border`; on hover a 24 px stub toward the side of the off-scope column | 7 | None | None |
| Dead band | Last row, below a solid 1 px `rule` line and an extra 24 px gap, labelled DEAD in the row gutter; dead cards in their module column | Ghost: dashed 3/3 outline 1 px `edge`, no fill, ghost text; incident edges at 25 % opacity | 5 | None | None |
| Entry surface | Row 0 | Name in bold | 6 | None | None |
| Load-bearing | Any card or class row | 1.5 px border plus a 3 px left bar on cards, 2 px left bar on rows | 5 | None | Teal |
| Wrapper | Half-height card (14 px instead of 28 px) | Normal border | 5 | None | None |

Every pair of connection kinds differs in at least two of geometry, line
style, layer, and colour, except same-module and cross-module calls, which
are one relation and differ only in locality; the column gutter shows that by
construction.

Layer order, back to front: 0 canvas, rules, gutters, dead-band rule;
1 overview bundles; 2 resting call and collaborator edges; 3 import lane and
clone chords; 4 emphasised edges and pulses; 5 cards, boxes, rows, hatch,
glyphs, intra-class arcs; 6 labels; 7 chevrons, focus ring, hover outline;
8 DOM tooltip and panels. Every edge, emphasised or not, passes behind the
opaque card fills, so no line ever crosses a name.

Data needed from Python (an addition to the plan's `model.layout`): an edge
list with `kind` (`same_module`, `cross_module`, `into_class`, `intra_class`)
and a `back` flag; all module import pairs for the lane, not only cycles;
module-pair bundle member counts for overview; per-class field access (already
in `objects[].field_access` as `reads` and `writes`). The browser computes no
graph property.

### 4.3 Palette (dark)

Reserved hues, validated against canvas `#0b1016` with all pairs compared
(all-pairs, because any two marks can sit side by side): lightness band PASS,
chroma floor PASS, CVD worst pair red-teal ΔE 12.0 (deutan; target 8),
normal-vision worst pair violet-teal ΔE 23.6 (floor 15), contrast PASS.

| Token | Hex | Role | Contrast on canvas |
| --- | --- | --- | --- |
| `canvas` | `#0b1016` | Picture background (unchanged) | n/a |
| `fill` | `#111922` | Card and box fill | 1.08 |
| `raised` | `#18212b` | Class header band, tooltip, hover fill | 1.17 |
| `rule` | `#26313d` | Column rules, gutters, hatch, resting import arcs | 1.44 |
| `edge` | `#3e4a57` | Resting call edges, ghost outlines, collaborator lines | 2.11 |
| `border` | `#5b6878` | Card and box borders, chevrons | 3.36 |
| `ghost-text` | `#6b7787` | Dead card names | 4.19 |
| `muted` | `#97a3b1` | Secondary text, column headers, gutter labels | 7.45 |
| `text` | `#e8edf2` | Names | 16.21 |
| `emphasis` | `#f5f8fc` | Selected, hovered, traced, pipeline edges and pulses | 17.92 |
| `teal` | `#29a895` | Load-bearing only | 6.48 |
| `violet` | `#936dd9` | Clone only | 4.94 |
| `red` | `#d33a3c` | Import cycle only (later: declared-layer violation) | 4.04 |

Rules:

- Three hues and nothing else on the canvas. The panels' existing accent
  `#69a9ff` stays in panels and controls and never enters the picture.
- Resting edges (`edge`, 2.11:1) are below the WCAG 1.4.11 3:1 guideline for
  graphics on purpose: they are context. Any edge the reader is asked to
  follow (hover, selection, trace, pipeline) is drawn in `emphasis` at
  17.9:1.
- Dimming multiplies opacity by 0.3 for marks and 0.35 for text (dimmed text
  `#585d63`, 2.9:1, readable on demand, recessive by design).
- Hues apply to strokes, bars, and glyphs; fills stay neutral, so a
  load-bearing card is a neutral card with a teal outline, not a teal block.
- Red, teal, and violet differ from `border` by at least ΔE 8.9 under protan
  and deutan simulation, so signals separate from neutral structure for
  colour-blind readers, and each also has its own line style or bar.

### 4.4 Type

- Family: the existing `--mono` stack (`"SFMono-Regular", "Cascadia Code",
  "Roboto Mono", Consolas, monospace`); no web fonts, since the explorer is
  offline.
- Card and row names: 11 px, line height 16 px, weight 400; entry surface
  weight 700. Names truncate with a trailing ellipsis to the card width; the
  full name is in the tooltip and inspector.
- Class header: 11 px weight 700 name; `class` or `dataclass` tag in 9 px
  `muted` uppercase with 0.06 em tracking.
- Column header: 11 px weight 600 `muted`, horizontal, truncated; never
  rotated (tilted text is hard to read).
- Package bracket label and row gutter labels (ENTRY, 1, 2, ..., DEAD): 9 px
  uppercase, 0.08 em tracking, `muted`.
- Key and panel captions: 11 px; panel titles 13 px.
- Text is drawn at a fixed screen size. It is drawn only when the card is at
  least 56 px wide on screen, which is also the overview threshold.

### 4.5 Lines

| Mark | Width | Dash | Caps |
| --- | --- | --- | --- |
| Call edge (resting) | 1.5 px tapering to 0.75 px | solid | butt |
| Call edge (emphasised) | 2.0 px tapering to 1.0 px | solid | butt |
| Overview bundle | 1 to 4 px (log of member count) | solid | round |
| Import arc | 1 px | 4 3 | butt |
| Import-cycle arc | 1.5 px | 4 3 | butt |
| Clone chord and outline | 1.5 px | 1 3 | round |
| Dead outline | 1 px | 3 3 | butt |
| Card and box border | 1 px; load-bearing 1.5 px | solid | n/a |
| Load-bearing bar | 3 px on cards, 2 px on rows | solid | n/a |
| Hatch (private tail) | 1 px at 45°, 4 px pitch | solid | n/a |
| Pulse dash | width of the emphasised edge | 10 px dash, 30 px gap | round |

Direction is carried by taper (wide at caller), following Holten and van Wijk
(CHI 2009, https://doi.org/10.1145/1518701.1519054), where tapered edges
outperformed arrows; no arrowheads. Most calls also point downward by
construction.

### 4.6 Motion

Durations and easings:

| Token | Duration | Easing | Used for |
| --- | --- | --- | --- |
| `highlight-in` | 0 ms | n/a | Hover and selection emphasis on |
| `highlight-out` | 150 ms | `cubic-bezier(0, 0, 0.38, 0.9)` | Emphasis off |
| `dim` | 200 ms | `cubic-bezier(0, 0, 0.38, 0.9)` | Context dims or restores |
| `zoom-level` | 150 ms | linear crossfade | Switching overview / reading / detail |
| `expand` | 220 ms | `cubic-bezier(0.2, 0, 0.38, 0.9)` | Class rows unfold; cards below in that column shift |
| `scope` | 320 ms plus 10 ms per column, stagger capped at 120 ms | `cubic-bezier(0.2, 0, 0.38, 0.9)` | Columns move and compact on scope change |
| `camera` | 360 ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Explicit fit, go-to, Guide step |
| `wavefront` | 35 ms per row, total capped at 350 ms | linear | Pipeline edges light row by row from the root |
| `pulse` | constant 160 px/s on screen | linear | Dashes move caller to callee along the pipeline |
| `land` | 300 ms | `cubic-bezier(0, 0, 0.38, 0.9)` | Ring at a leaf callee scales 1.0 to 1.6 and fades, once per pass |

What animates: scope morph, expand and collapse, semantic zoom crossfade,
explicit camera moves, and the pipeline wavefront and pulses.

What never moves: any mark on hover, click, trace, context change, lens
toggle, search highlight, inspector open or close, sidebar tab change, or
review note. The camera moves only on an explicit command, or by the
smallest pan that keeps a keyboard-focused card on screen. There is no idle
animation: a canvas with nothing selected is still.

Rules:

- Pulses run for three passes or four seconds, whichever ends first, then the
  pipeline stays lit and still. This keeps every automatic motion under the
  five-second limit of WCAG 2.2.2
  (https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). A replay
  key (proposed `p`, if free in the current shortcut map) runs them again.
- Pulses add attention, not legibility: Holten et al. (2010, report
  https://hal.archives-ouvertes.fr/hal-00696823) found animated and tapered
  directed edges perform alike, with tapered faster at medium lengths. The
  static taper therefore carries direction, and pulses are optional polish.
- With `prefers-reduced-motion: reduce`
  (https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion),
  movement transitions become 100 ms opacity crossfades, the camera jumps,
  the wavefront and pulses are off.
- Interpolation is time-based, not frame-counted, and every transition ends
  exactly on the Python coordinates, so the same snapshot and view state give
  the same picture on any machine. A transition interrupted by another starts
  from the current interpolated state. No physics.

### 4.7 Semantic zoom

Thresholds use the on-screen width `w` of a standard card (168 px at zoom
1.0), with 8 % hysteresis. Each level is the same grid, aggregated.

| Level | When | Shows |
| --- | --- | --- |
| Overview | `w` < 56 px; default fit when more than about 600 cards | Columns as bars of tiles; class boxes as solid blocks with row ticks; no card names; column headers and package brackets at fixed screen size; module-pair bundles instead of individual call edges; downward bundles at 50 % opacity so back edges, teal tiles, violet chords, the ghosted dead tail, and red import arcs dominate; import lane aggregated to packages when there are more than 60 columns |
| Reading | 56 ≤ `w` < 240 px | Cards with names; class boxes with constructor and public rows and hatched tails; every resting call edge, tapered; import lane by module; chevrons |
| Detail | `w` ≥ 240 px, or a class is expanded | Private rows inside expanded classes; intra-class arcs; field section with ◆/◇ glyphs and collaborator lines; read/write access strip |

### 4.8 Classes stay compact

- One box per class with analysed methods, in its module column, at the row
  of its shallowest public method.
- Header band (`raised`): class name and kind tag. Rows: constructor, then
  public methods in source order, 16 px each, carrying the same marks as
  cards (bold entry, teal bar, violet dotted underline, small type for
  wrappers).
- Private methods collapse into an 8 px hatched tail. Clicking the tail, or
  pressing `e` with the class focused, expands them as `muted` rows; this is a
  structural change and may shift cards below in that column only.
- Calls attach at the method's row on the side facing the other end; calls
  from collapsed private methods attach at the tail.
- Data-only classes are a box of field rows with ◆/◇ glyphs and no tail.
- Dead private methods still fall into the dead band under their module
  column as ghost cards.
- Boxes never exceed 14 visible rows at reading zoom; longer public surfaces
  scroll inside the box at detail zoom rather than growing the row band.

### 4.9 Interaction

- Hover a card or row: incident edges go to `emphasis`, the related names go
  bold, instantly; nothing else changes.
- Click: the selection's downstream tree and direct callers light; the rest
  dims to 0.3. Positions do not change.
- Double-click: open source (unchanged).
- Click a key entry, or press 1 to 6 (if free in the current shortcut map),
  to apply a lens: Calls, Imports,
  Clones, State, Pipelines, Dead. A lens dims everything not of that kind to
  0.15. Lenses and selection combine.
- Click a red import arc: solo that cycle (pydeps `--show-cycles` by
  emphasis).
- Select a root, then `f` to fit its pipeline (the camera command); the
  wavefront and pulses run on selection.
- Click an overview bundle: the inspector lists its member calls.

### 4.10 Key

The key lists every mark and nothing else. Text as rendered:

```text
STRUCTURE
  column ............... one module; a bracket above groups a package
  row .................. call depth; the top row is the entry surface
  card ................. function (name only)
  box with rows ........ class: constructor and public methods
  hatched tail ......... private methods, collapsed (click to expand)
  box of fields ........ data-only class
  bold name ............ entry surface: public with no caller, or main/run/cli/app
  half-height card ..... wrapper: body is one pass-through call
  ghost card, DEAD row . dead: private and unreachable

CONNECTIONS
  solid curve .......... static call, wide at the caller, narrow at the callee
  curve into box side .. call to a class method, at that method's row
  arc in box margin .... call between methods of one expanded class
  curve looping up ..... call against depth order (recursion or call cycle)
  dashed arc, top lane . module import
  dotted violet line ... same structural fingerprint (clone)
  ◆ / ◇ before field ... owned / injected collaborator
  ● / ○ in strip ....... method writes / reads the field
  chevron .............. call leaves the scope (bottom) or arrives from outside (top)
  thick bundle ......... many calls between two modules (overview only)

SIGNALS (the only colours)
  teal border or bar ... load-bearing: hub or orchestrator
  violet dotted ........ member of a clone group
  red dashed arc ....... circular import; both headers underlined red

EMPHASIS
  bright ............... hovered, selected, traced, or in the selected pipeline
  moving dashes ........ selected pipeline, caller to callee (three passes)
  dimmed ............... outside the selection, context, or lens
```

---

## 5. Recommendation

**Use a 2D canvas system on the Python-computed signal grid. three.js and 3D
do not earn their place for this data.** Of the two running prototype tracks,
this specification favours the 2D kinetic grid
(`prototypes/kinetic-grid/`).

Reasons:

1. **Both screen axes are already semantic, and there is no honest third
   variable.** Columns are modules; rows are call depth. CodeCity and
   CodeCharta use the third dimension for metrics (height = complexity or
   size); Atlas removed metric encodings as noisy (principle 2). The only
   candidate left is "connection kind as stacked planes", which layer order and
   lenses deliver in 2D without occlusion.
2. **The content is text.** Atlas is read by function and module names.
   Munzner's rule "no unjustified 3D" names occlusion, perspective distortion
   of size, and illegible tilted text as the costs
   (https://cs.ubc.ca/~tmm/talks/vad/VAD-rules.pdf). three.js has no text
   primitive; labels would be SDF meshes or DOM overlays tracking a camera.
3. **3D needs movement to be read, and principle 3 forbids movement on
   selection.** Occlusion in 3D is resolved by orbiting the camera, which
   moves every mark. The evidence that 3D helps graph reading (Ware and
   Mitchell, ACM TAP 2008, https://scholars.unh.edu/ccom/467: about an order of
   magnitude more nodes traceable than in 2D) relied on a high-resolution
   stereoscopic display with motion cues; the abstract does not describe a
   layered layout. Atlas runs on ordinary monitors, and its layered grid
   reduces crossings by construction (downward edges, barycenter ordering);
   crossings are the aesthetic with the largest effect on understanding
   (Purchase, GD 1997,
   https://research.monash.edu/en/publications/which-aesthetic-has-the-greatest-effect-on-human-understanding/).
4. **The layered structure collapses in 3D.** The 3d-force-graph tree example
   in top-down DAG mode renders as a few overlapping discs with no labels
   (capture in section 2), and its DAG mode throws on cycles by default; Atlas
   call graphs contain recursion.
5. **Delivery cost.** three.js ships ESM only since r161, so it needs a
   one-off IIFE bundle to load from `file://`; the minimal bundle is 537 KB
   raw, 2.7 times the 200 KB budget for all explorer assets.
   3d-force-graph is 1.39 MB. Canvas 2D costs zero bytes.
6. **Scale does not require WebGL at reading zoom.** At 10,000 nodes the
   overview draws module-pair bundles (at most a few thousand strokes), and
   reading zoom culls to the viewport. Canvas 2D with strokes batched by style
   should hold 60 FPS; this is an estimate, not a measurement. Gate: build a
   synthetic 10,000-node snapshot; if pan or zoom falls below 50 FPS on the
   owner's machine, move resting edges to a WebGL2 instanced pass (hand
   written, regl as fallback) and keep text on Canvas 2D.

What makes it dynamic without 3D: the scope morph, expand and collapse, the
semantic-zoom crossfade, explicit camera flights, and the pipeline wavefront
with flow pulses (section 4.6). Motion marks a change of view or the flow of
a selected pipeline; it never decorates an idle canvas.

What to take from the three.js track if it shows something good: camera
easing for fit and go-to, the landing ring on callees, and any evidence about
which connection kinds readers confused. Do not take orbit controls, depth
fog, perspective, or physics.

When to revisit 3D: if Atlas gains a third honest structural variable (for
example user-declared layers that must be compared against call depth), or a
transient "exploded layers" inspection view proves useful in a 2D build. Even
then it would be a secondary mode, not the reading surface.

## Uncertainties

- Product-site impressions for Vercel, Stripe, GitHub's globe, Obsidian, Nx,
  CodeCity, Understand, and the Observable notebook come from text and CSS,
  not from seeing the visuals.
- The sigma.js label layer is inferred from its bundle, not its docs.
- The Canvas 2D frame-rate estimate at 10,000 nodes is untested; section 5
  sets the gate.
- The palette was validated against `#0b1016` only. A light theme would need
  its own steps and a new validation run.
- Captures in `/tmp/atlas-shots/refs/` are temporary.
