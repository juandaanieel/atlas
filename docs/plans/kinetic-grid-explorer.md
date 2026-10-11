# Kinetic grid explorer

> Status: Proposed (2026-10-09). Prototype in `prototypes/kinetic-grid/`,
> tested on tempura. Awaiting veto before any change to `src/`.

## Goal

Keep the approved signal grid (module columns in tree order, call-depth
rows, dead band last, classes as compact boxes) and make it a living 2D
canvas: every level of connection has its own visible channel, structural
changes glide instead of jump, and a selection shows its call flow. Python
stays the source of semantics; the browser owns pixels, tweens, and hit
testing.

This plan extends `docs/plans/signal-grid-explorer.md`. Everything there
holds unless a section below says otherwise. The visual tokens (palette,
line widths, motion durations) follow section 4 of
`docs/plans/explorer-references.md`; the deltas are listed under
"Deviations from the shared visual language".

## Screenshots

All captures are tempura at a 1680 by 1050 window, 2x pixel density.

Overview: 40 module columns, bundles instead of individual cross-module
calls, import lane above the column names, teal load-bearing tiles, violet
clone chords, ghosted dead band at the bottom. Data-only classes (the eight
`tempura.specs` dataclasses) sit in a DATA band above the entry row.

![Overview](/tmp/atlas-shots/kinetic/01-overview.png)

Scope `tempura.electrostatics`: names readable, classes as boxes with
constructor and public rows and a hatched private tail, calls that leave
the scope end in named portals on the frame (`_region` on the left;
`mesh._plan`, `mesh._regions`, `strain.materials` on the right).

![Scoped package](/tmp/atlas-shots/kinetic/02-scope-electrostatics.png)

Pipeline `compile_mesh_inputs`, chosen from the Pipelines tab: the scope
moves to `tempura.mesh`, the 35-function call tree lights, the rest dims to
30 %, and bright dashes travel from caller to callee. The inspector sits
bottom right over empty canvas and never resizes it.

![Pipeline with pulses](/tmp/atlas-shots/kinetic/03-pipeline-compile-mesh-inputs.png)

`Device` expanded and framed by a double click, pointer on `add_layer`:
private rows appear under a PRIVATE rule, fields under a STATE rule. Arcs in
the left margin are calls inside the class; arcs in the right margin run
from a method row to the fields it writes (filled end) or reads (ring end).
The hovered row lights its own arcs, and related names turn bold.

![Expanded class, detail zoom](/tmp/atlas-shots/kinetic/04-expanded-class-device.png)

The same expansion at package zoom. Only the eight cards below `Device` in
`device.py` moved; every other column kept its pixels.

![Expanded class in context](/tmp/atlas-shots/kinetic/04b-expanded-in-context.png)

![Expand, mid transition](/tmp/atlas-shots/kinetic/04c-expand-mid.png)

Hover on `build_thomas_fermi_solver`: incident calls in the emphasis colour,
related names bold, nothing dims and nothing moves.

![Hover on a card](/tmp/atlas-shots/kinetic/05-hover-card.png)

Scope change from the overview into `tempura.electrostatics`, 130 ms into
the 320 ms morph: the package's columns widen left to right while the other
packages fade out.

![Scope change, mid transition](/tmp/atlas-shots/kinetic/06-transition-mid.png)

Hover on the `_thomas_fermi.py` column name: its import arcs light in the
lane, other arcs recede.

![Hover on a column](/tmp/atlas-shots/kinetic/07-hover-imports.png)

Scope `tempura.specs`: data-only classes as boxes of field rows.

![Data classes](/tmp/atlas-shots/kinetic/08-data-classes-specs.png)

## References

- Holten and van Wijk, "A user study on visualizing directed edges in
  graphs", CHI 2009 (https://doi.org/10.1145/1518701.1519054), and Holten et
  al. 2011 (https://hal.archives-ouvertes.fr/hal-00696823). Tapered edges
  read direction best; animated edges perform alike. Borrowed: taper
  carries direction everywhere, pulses are optional polish.
- Bostock, "Object constancy" (https://bost.ocks.org/mike/constancy/).
  Borrowed: every mark is keyed by node id, so a scope change moves the
  same card to its new place instead of redrawing a new picture.
- sigma.js reducers and v4 state
  (https://v4.sigmajs.org/how-to/interactivity/hover-search/). Borrowed:
  hover and selection are applied at draw time from view state and never
  touch the geometry.
- Nx project graph (https://nx.dev/features/explore-graph). Borrowed: focus
  by folder and expand a composite node in place, which here are scope by
  package and expand a class box.
- Observable arc diagram (https://observablehq.com/@d3/arc-diagram).
  Borrowed: module imports as an arc lane with hover lighting.
- Meeks, particle Sankey (https://observablehq.com/@benjamesdavis/elijah-meeks-particle-sankey).
  Borrowed: marks travelling along links at constant screen speed.
- Holten, "Hierarchical edge bundling", IEEE TVCG 2006
  (https://doi.org/10.1109/TVCG.2006.147). Borrowed: at overview zoom one
  bundle per module pair, pulled toward the package centres.
- Cosmograph (https://cosmograph.app/docs-general/concept/). Borrowed:
  separate channels for highlight (dimming), outline (focus ring), and edge
  emphasis.

## Design decisions

### Geometry: the signal grid, unchanged in principle

- Columns are modules in tree order. Within a package, public modules come
  before private ones, then subpackages, so a package reads left to right
  from its public surface inward. Modules that only define classes get a
  column (`tempura.specs`).
- Rows are call depth: ENTRY is row 0, then 1, 2, ..., then the dead band.
  Data-only classes have no calls and sit in a DATA band above ENTRY.
- Class boxes, wrappers as half-height cards, dead cards ghosted in the dead
  band, clone members with dotted outlines: as in the signal grid plan.
- The header has three strips, top to bottom: package brackets, the import
  lane, module names. A left gutter labels the rows. Both stay fixed while
  the grid pans, like the frozen panes of a spreadsheet.

### Every connection level has its own channel

| Level | Geometry | Line style | Layer | Motion | Colour |
| --- | --- | --- | --- | --- | --- |
| Package > module | bracket over the module columns; one faint lane per column | 1 px rule | header, lanes at the back | scope morph | none |
| Module > class > method | box in its column; rows for constructor and public methods; hatched private tail | box border; 45° hatch | cards | expand and collapse | none |
| Call within a file | curve inside the column | solid, tapered 1.5 to 0.75 px | resting edges | pulse when selected | none |
| Call across files | curve across column gutters; at overview zoom one bundle per module pair | solid, tapered 1.1 to 0.55 px; bundles 1 to 4 px by log of member count | resting edges, bundles behind | pulse when selected | none |
| Call into a class | curve ends on the box side at the method row with a horizontal tangent and a 4 px port tick | as above | resting edges | pulse | none |
| Call inside a class | arcs in the left margin of an expanded box | tapered toward the callee | on the box | none | none |
| Class state | fields under a STATE rule (always for data-only classes); arcs in the right margin from method row to field; filled end writes, ring end reads; ◆ owned, ◇ injected collaborator | 1 px | on the box | none | none |
| Module import | arc in the lane above the column names, importer to imported | dashed 4/3 | header | fades with its toggle | none |
| Import cycle | same lane; column name underlined | dashed 4/3, 1.5 px | top of the lane | none | red, and only here |
| Clone group | straight chord between consecutive members | dotted 1/3, round caps | above resting edges | none | violet |
| Load-bearing | outline plus a 3 px left bar on cards, 2 px bar on rows | solid | cards | none | teal |
| Call leaving the scope | curve to a named portal on the frame, left or right by tree order | tapered | resting edges | pulse when selected | none |
| Pipeline (reach from the selection) | the downstream tree and direct callers stay bright; the rest dims to 30 % | lit edges in the emphasis colour, 2 px | emphasised edges | wavefront, then pulses | brightness only |
| Dead band | last row below a 1 px rule | dashed 3/3 ghost outline; incident edges at 25 % | cards | none | none |

Hue is reserved for three signals: teal load-bearing, violet clone, red
import cycle. Every kind of attention (hover, selection, pipeline, pulses)
uses brightness. Tempura has no import cycle, so its pictures contain no
red, which is the intended calm reading.

### Motion, and what each motion means

Motion has two meanings: the structure changed (glide), or the reader asked
to see call flow (wavefront and pulses). An idle canvas is still.

| Element | Trigger | Duration and easing |
| --- | --- | --- |
| Scope morph: shared cards glide to new places, new ones fade in, leaving ones fade out | scope change | 320 ms, cubic-bezier(0.2, 0, 0.38, 0.9), 10 ms per column stagger capped at 120 ms; leaving 150 ms |
| Camera move | scope change, fit, pipeline go-to, double click | 360 ms, cubic-bezier(0.16, 1, 0.3, 1) |
| Expand and collapse: the box unfolds, cards below it in its column slide | click the hatched tail or the PRIVATE rule, or `e` | 220 ms |
| Wavefront: lit edges switch on row by row from the selection | selection | 35 ms per depth step, capped at 350 ms |
| Pulses: a 10 px dash runs caller to callee at 160 px/s, starting when the dash into the caller arrives; a ring grows at each leaf | after the wavefront | at most 3 passes or 4 s, then still; `p` replays |
| Highlight on and off | hover, selection | on in 0 ms, off in 150 ms; context dims in 200 ms |
| Overview and reading zoom crossfade | card width crosses 56 px on screen (8 % hysteresis) | 150 ms |

With motion off (button, `m`, or `prefers-reduced-motion`), moves become
100 ms opacity crossfades, the camera jumps, and there is no wavefront or
pulse.

Kinetic elements tried and rejected:

- Springs (react-spring default, tension 170, friction 26) for every
  transition. They felt lively but end at no fixed time and blur the
  difference between a layout move and a camera move. Replaced by
  fixed-duration tweens that land on the layout coordinates.
- A slow breathing of the dead band. It kept the canvas moving forever and
  pulled the eye to dead code even when the reader was elsewhere; the ghost
  outline and the band already say "dead".
- Continuous comet pulses with a flash on every arrival. Busy on large
  trees and never at rest. Replaced by the capped pass with rings only at
  leaves.
- Dimming everything except the neighbours on hover. Sweeping the pointer
  across the grid made the whole picture flicker. Hover now lights incident
  edges and bolds related names only.
- Expanding a class by growing its shared row and widening its column. It
  moved every card in the package. The box now counts at its collapsed size
  for row and column sizing, grows into the column gap at most, and pushes
  only the cards below it in its own column. Cell order is computed from
  collapsed widths, so expanding never reorders cards.
- Animating clone links (marching dots). Motion would then mean two things;
  clones stay static.

### Emphasis never moves anything

Hover, selection, layer toggles, the inspector, and sidebar tabs change
only opacity, stroke colour, width, and weight. The inspector floats over
the bottom right of the canvas and never resizes it. Only a scope change,
expand or collapse, and explicit camera commands move marks.

### Semantic zoom

One grid, drawn at two levels of detail chosen by the on-screen card width.

- Overview (card under 56 px wide): tiles without names, class boxes with
  row ticks, module-pair bundles instead of individual cross-module calls,
  module names rotated.
- Reading (56 px and wider): names at a fixed 11 px screen size, every call
  edge, horizontal module names truncated in the middle
  (`_thomas…_core`) so similar names stay distinguishable.
- Detail is reading zoom on one box: double click a card or class to frame
  it; the expanded class then shows fields and both margin arcs legibly.

### Fit to the window

The layout fills the window without changing its structure. Once per scope
change the app tries 1, 2, and 3 cards per line inside a cell and keeps the
packing with the largest fit scale; spare vertical space then goes to the
row gaps, up to 2.2 times the base gap. Expand and collapse reuse both
choices, so a class grows in place. The result is deterministic for a given
window size; resizing the window refits the camera but does not relayout.

## Data plan

The prototype derives two things in JavaScript only because the snapshot
does not ship them yet; both belong in `model.py`:

- `rank` (the row of each live node) and the cell order. These are the
  `model.layout` block of the signal grid plan. Python should compute the
  cell order with one card per line; the renderer then wraps a cell into
  lines for the window, which is pixel spacing and stays in JavaScript.
- `reach`, the downstream closure of a node, used for selection emphasis
  and the wavefront depth. `architecture.pipelines` stops at
  `MAX_PIPELINE_NODES` (24): for `compile_mesh_inputs` it lists 24
  functions while the call graph reaches 35. Lighting the capped list would
  dim 11 real callees. Python should ship an uncapped reach list per root
  (and per node on demand), or drop the cap for the explorer.

Additions to `model.layout` beyond the signal grid plan:

```text
model.layout
  edges:        [{source, target, kind, back}]   # kind: same_file | cross_file | into_class | intra_class
  bundles:      [{source_module, target_module, members: [[s, t], ...]}]
  imports:      [[module, module], ...]          # every internal module pair, not only cycles
  data_classes: [class_id, ...]                  # placed in the DATA band
  reach:        {root_id: [node_id, ...]}        # uncapped, BFS order with depth
```

`kind` is read from the raw call records (`calls[].kind`), which already
say `same_file` or `cross_file`; `into_class` and `intra_class` follow from
`objects[].methods`. `back` marks calls that point against depth (cycles).
Field reads and writes already ship in `objects[].field_access`;
collaborator kinds in `objects[].fields[].collaborator_kind`. Package
facade imports (a module importing from a package `__init__`) are not drawn
until Python resolves the re-export to its defining module.

The browser then computes no graph property. It keeps: pixel sizes,
packing into lines, row-gap fill, fit, tweens, hit testing, and the pulse
schedule (which needs on-screen edge lengths).

## Interaction contract

| Input | Effect | Moves marks |
| --- | --- | --- |
| Hover card or row | incident calls in the emphasis colour, related names bold, outline on the item | no |
| Hover class header | the same for all its methods | no |
| Hover column name | its import arcs light, other arcs recede | no |
| Click card or row | select: downstream tree and direct callers lit, rest dims to 30 %, wavefront and pulses run, inspector opens | no |
| Click class header or field | select the class: union of its methods' trees | no |
| Click empty canvas, `Esc` | clear selection | no |
| Click hatched tail or PRIVATE rule, `e` | expand or collapse the class | its column below the box |
| Double click | frame the item at detail zoom (camera only) | camera |
| Click package bracket, module name, tree row, breadcrumb | change scope | yes (morph) |
| Click a portal | scope to the portal module's package | yes |
| Pipelines tab row | scope to the smallest package containing the reach, select the root, fit | yes |
| `u` or Backspace | scope up one package | yes |
| `f` | fit | camera |
| `p` | replay pulses | no |
| `i`, `m`, layer buttons | toggle imports, clones, state arcs, motion | no |
| Wheel, drag | zoom about the pointer, pan | camera |

The URL hash holds `scope`, `sel` or `cls`, `exp`, and `off` (layers turned
off), so a reload restores the view.

## Prototype

```text
prototypes/kinetic-grid/
  index.html    page shell; loads the scripts with a cache-busting query
  data.js       snapshot adapter (stand-in rank and reach marked as such)
  layout.js     grid layout in world units (stand-in for model.layout)
  motion.js     tweens, easings, duration tokens, camera
  render.js     Canvas 2D renderer and key swatches
  app.js        state, transitions, emphasis, input, sidebar, inspector
  capture.js    screenshot helper (development only)
  styles.css
  atlas.json    copy of tempura's snapshot
```

Run it with:

```sh
cd /Users/jdtorresluna/Code/atlas
pixi run python -B -m http.server 8796 --directory prototypes/kinetic-grid --bind 127.0.0.1
# open http://127.0.0.1:8796/  (add ?shot=1680x1050 to lay out at a fixed window size)
```

It uses plain Canvas 2D and no library: about 120 KB of JavaScript and CSS
without the snapshot and the capture helper. If a library were adopted
later (d3-transition, PixiJS), it would be vendored as a pinned minified
file with its licence under `src/atlas/explorer/static/vendor/`, copied by
`explorer/writer.py` like `elk.bundled.js` today, and never loaded from a
CDN, since Atlas runs offline.

Measured on tempura: 40 columns, 259 items at the overview (cards and 17
class boxes), 290 drawn calls, 49 module import pairs, 3 clone groups, 5
dead functions. A layout hash of every mark was identical across two
reloads. Selecting, hovering, and clearing in `tempura.mesh` left the hash
unchanged. Expanding `Device` moved 8 cards, all in `device.py`;
collapsing restored all 53 positions.

## Deviations from the shared visual language

Section 4 of `explorer-references.md` is adopted except:

- Cross-scope calls end in named portals on the frame instead of chevrons on
  the card edge. A portal says where the call goes without opening a panel,
  and portals collect calls from many cards into one mark per module.
- Module names rotate at overview widths. With 40 columns about 25 px wide,
  horizontal names would be three characters. At reading zoom they are
  horizontal and middle-truncated, as the spec asks.
- Field access is drawn as right-margin arcs to named field rows instead of
  a glyph strip, because a strip needs field column headers to be read.
  Calls inside a class therefore use the left margin and are tapered for
  direction.
- The private tail height grows with the number of private methods (10 to
  36 units) instead of a fixed 8 px, so hidden mass is visible.
- Same-file and cross-file calls differ slightly in width (1.5 and 1.1 px at
  the caller) besides locality.
- Lenses (keys 1 to 6) and bundle click-through are not prototyped.

## Implementation phases

1. **Python.** The signal grid plan's `model.layout`, plus edge kinds,
   bundles, all import pairs, data classes, and uncapped reach. Tests for
   each block and for the reach-versus-pipeline count on tempura.

   Exit: `data.js` loses its rank and reach code and the prototype renders
   from `model.layout` unchanged.

2. **Renderer.** Port `motion.js`, `render.js`, and the pixel half of
   `layout.js` into `src/atlas/explorer/static/src/`; delete ELK; keep the
   inspector, review collection, Guide, trace, and keyboard code. The key
   is generated from the same swatch functions as the canvas.

   Exit: the explorer contains no reachability, ordering, or ranking code.

3. **Story and docs.** As in the signal grid plan; view keys add `exp` and
   `off`.

4. **Verification.** The eight screenshots above regenerated from the
   shipped explorer; the motion checks below scripted in the browser.

## Acceptance criteria

- Each connection level in the table above is visible in at least one of
  overview, reading, or detail zoom without opening a panel, and the key
  names every mark and motion on screen.
- No number is printed inside a card or box; depth numbers appear only in
  the row gutter.
- Hover, selection, layer toggles, and the inspector never change a mark's
  position (layout hash unchanged).
- Expanding a class moves only cards below it in its own column; collapsing
  restores every position.
- A reload with the same hash and window gives the same layout hash.
- No automatic motion lasts longer than 4 s; with motion off, no element
  moves except by 100 ms crossfades and camera jumps.
- The selection lights the uncapped reach; its size in the inspector equals
  Python's reach count.
- Explorer assets stay under 200 KB; no CDN.

## Risks

- **Small windows.** At 1280 by 800 a nine-module package fits at about a
  third of full size and names disappear. Mitigation: semantic zoom shows
  tiles instead of clipped text, double click frames a box, and the scope
  tree narrows the view.
- **Canvas text is invisible to assistive technology.** Mitigation: the
  inspector and sidebar stay DOM; a hidden DOM list of the visible scope
  can mirror the canvas for screen readers.
- **Long pipelines.** Pulses travel at 160 px/s, so a tree with long
  cross-module edges finishes one pass in about 5 s and is cut at 4 s.
  Mitigation: the wavefront already shows the order; `p` replays.
- **Packing depends on the window size.** The same scope can wrap cells
  differently on two screens. Mitigation: the choice happens once per scope
  change and is pixel packing only; the cell order comes from Python.
- **Bundles hide individual cross-module calls at overview zoom.**
  Mitigation: hover and selection always draw the individual lit calls;
  zooming in crossfades back to single edges.
