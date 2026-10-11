# Strata: colour, defect marks, legend and themes

> Status: Prototype (2026-10-11). Runs on tempura at `prototypes/strata-theme/`, a
> copy of `prototypes/strata/` (v2) refreshed to snapshot version 8 and story
> version 2 (see Data refresh). This track changes colour, the dead and clone marks,
> the key and legend, and adds a light theme and a site theme switch. No coordinate
> changed: switching theme leaves the world signature and the camera identical in all
> 13 guide steps. Nothing under `src/`, `tests/`, `schema/` or `README.md` changed,
> and no other prototype changed.

The owner's request: "I think we can use colours in a smarter way: check the github
high contrast from the palette. Let's highlight more cloned and dead functions.
Perhaps we can add a small legend explaining what each colour is, for example now,
there is some green colour on the files and I have no fucking clue what it is. Also
we should support a light colour map and overall theme for the site."

## Answer in brief

- **Palette.** Both themes take every value from GitHub Primer's high-contrast
  themes (`@primer/primitives` 11.10.0): neutrals for the canvas, faces and the
  three line tiers, and four reserved hues, one meaning each: **load-bearing blue,
  clone purple, dead yellow, import cycle red**. Nothing else on the canvas has a
  hue, and the chrome no longer uses an accent blue: blue means load-bearing only.
- **Validated all-pairs** with the dataviz validator, both themes, all checks PASS:
  worst CVD pair ΔE 9.0 (dark, protan, load-bearing–clone) and 8.9 (light, deutan,
  dead–cycle), target 8; worst normal-vision pair 19.2 and 16.2, floor 15. Every
  signal stands at least ΔE 8.6 from every neutral line token under normal, protan
  and deutan vision; v2's teal stood 4.5 from the `link` grey under deutan simulation.
- **Dead and clone marks are filled.** A dead row is filled with the dead hue,
  hatched in it like caution tape and outlined with its dashes; a clone row is
  tinted purple with a heavy dotted underline. A box that holds either carries a
  solid square tick per signal at the right of its header, the mark that reads at
  the overview. At 1,280 × 800 a reader who knows the legend finds **5 of 5 dead
  functions and 8 of 8 clone members** at the overview in both themes (v2: 0 of 5
  and 6 of 8).
- **Legend.** An always-visible legend in the stage, bottom left, collapsible to a
  pill and remembered, lists exactly the marks drawn on screen, each with a swatch
  drawn like the mark. One table drives the legend, the `k` key overlay and the
  guide's "In the picture", and presence is read from the scene, so the three
  cannot disagree: in all 13 guide steps and 18 screenshots, both themes, the
  legend's list equals the drawn set.
- **Themes.** Dark and light through CSS custom properties for the chrome and a
  token object for three.js materials and the label canvas; a top-bar toggle and the
  `t` key; `prefers-color-scheme` decides when the reader has not chosen; the choice
  is remembered. A switch recolours in place: nothing moves and the camera stays.
- **Contrast.** Every label measured on the rendered pixels reads at 4.5:1 or more
  in both themes except deliberately dimmed context names (package names at 36 to 45 %
  alpha in guide steps, 1.7 to 2.2:1; one at 83 % in the light module scope, 4.2:1).
  Below 3:1 among marks: the tier-3 rules and edges and the signal fills, by design.

## Sources

Fetched from the npm package with curl (exact files, no summarising), stored under
`/tmp/atlas-shots/theme/primer/`:

| File (`@primer/primitives` 11.10.0, git head `3f51f80`) | SHA-256 (first 12) | Used for |
| --- | --- | --- |
| `src/tokens/base/color/dark/dark.high-contrast.json5` | `9c930058e2c1` | Dark hue scales (blue, purple, yellow, red, …) |
| `src/tokens/base/color/light/light.high-contrast.json5` | `33d4655be24b` | Light hue scales |
| `src/tokens/base/color/dark/dark.json5` | `6db5488ccc57` | Dark neutral scale (the high-contrast file extends it) |
| `src/tokens/base/color/light/light.json5` | `74e2228eb684` | Light neutral scale |
| `dist/css/functional/themes/dark-high-contrast.css` | `e1940144ba97` | Role tokens (`bgColor-*`, `fgColor-*`, `borderColor-*`), muted fills |
| `dist/css/functional/themes/light-high-contrast.css` | `dccc317340ae` | Same, light |

URLs: `https://cdn.jsdelivr.net/npm/@primer/primitives@11.10.0/<file>`. The display
scales (`--display-*-scale-*`) in the same CSS files were searched as candidates
and not used (see Rejected).

## Palette tables

Contrast is WCAG against the theme's canvas; L* is CIE L*. "Box face" below means
the module box's front (`raised` in dark, `fill` in light).

| Role | Use | Dark | Primer dark-high-contrast | vs canvas | L* | Light | Primer light-high-contrast | vs canvas | L* |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `canvas` | picture background | `#010409` | bgColor-default (black) | 1.00 | 1 | `#ffffff` | bgColor-default (neutral-0) | 1.00 | 100 |
| `fill` | plates, cards | `#0d1117` | neutral-1 | 1.09 | 5 | `#f6f8fa` | neutral-1 (box front) | 1.06 | 97 |
| `raised` | box front (dark), header band (light) | `#151b23` | bgColor-muted, neutral-2 | 1.19 | 10 | `#eff2f5` | bgColor-inset, neutral-2 | 1.12 | 95 |
| `raised2` | box top, header band (dark), box sides (light) | `#212830` | bgColor-neutral-muted, neutral-3 | 1.38 | 16 | `#e6eaef` | bgColor-muted, neutral-3 | 1.21 | 93 |
| `rule` | tier 3 rules | `#262c36` | bgColor-disabled, neutral-4 | 1.46 | 18 | `#d1d9e0` | neutral-6 | 1.43 | 86 |
| `edge` | tier 3 lines | `#3d444d` | bgColor-emphasis, neutral-7 | 2.09 | 29 | `#c8d1da` | neutral-7 | 1.55 | 83 |
| `border` | card borders | `#656c76` | fgColor-disabled, neutral-8 | 3.87 | 45 | `#818b98` | neutral-8 | 3.45 | 57 |
| `link` | tier 2 lines | `#9198a1` | borderColor-translucent, neutral-9 | 7.05 | 63 | `#59636e` | borderColor-translucent, neutral-9 | 6.11 | 41 |
| `strong` | tier 1 outlines | `#b7bdc8` | borderColor-default, neutral-10 | 10.88 | 76 | `#454c54` | borderColor-default, neutral-10 | 8.70 | 32 |
| `dim` | tier 3 text | `#9198a1` | neutral-9 | 7.05 | 63 | `#59636e` | fgColor-disabled, neutral-9 | 6.11 | 41 |
| `muted` | tier 2 text | `#b7bdc8` | fgColor-muted, neutral-10 | 10.88 | 76 | `#454c54` | fgColor-muted, neutral-10 | 8.70 | 32 |
| `soft` | class names, guide body | `#d1d7e0` | fgColor-neutral, neutral-11 | 14.19 | 86 | `#393f46` | fgColor-neutral, neutral-11 | 10.64 | 26 |
| `text` | names | `#f0f6fc` | neutral-12 | 18.87 | 97 | `#25292e` | neutral-12 | 14.63 | 16 |
| `emphasis` | hover, selection, trace, pulses | `#ffffff` | fgColor-default | 20.54 | 100 | `#010409` | fgColor-default | 20.54 | 1 |
| `lb` | load-bearing | `#1e60d5` | blue-8 | 3.61 | 43 | `#0349b4` | blue-5 (borderColor-accent-emphasis) | 8.03 | 34 |
| `clone` | clone | `#a66bff` | purple-6 | 6.03 | 58 | `#844ae7` | purple-4 | 5.10 | 46 |
| `dead` | dead | `#c88508` | yellow-6 | 6.66 | 61 | `#956400` | yellow-4 | 5.12 | 46 |
| `cycle` | import cycle | `#cc1421` | red-8 | 3.61 | 43 | `#a0111f` | red-5 (borderColor-danger-emphasis) | 8.09 | 34 |
| `cloneFill` | clone row tint | `#a66bff` × 0.3 | purple-6 over the face | | | `#e0c5ff` | purple-1 | | |
| `deadFill` | dead row fill | `#c88508` × 0.3 | yellow-6 over the face | | | `#f0ce53` | yellow-1 | | |

The tier ratios follow v2's hierarchy (strong, link, edge, rule as tier 1, 2, 3, 3)
with Primer's steps: in dark they are 10.9 / 7.1 / 2.1 / 1.5 (v2: 9.1 / 5.2 / 2.1 /
1.4), so tier 1 and 2 stand further from the canvas, as the high-contrast theme
intends. In light, Primer's neutral scale jumps from neutral-7 (1.55:1) to neutral-8
(3.45:1); `edge` takes neutral-7 so tier 3 stays context, and box faces carry the
silhouettes. Faces in light are paper: the front is the lightest face and the sides
one step darker; in dark the front is lit and the sides darker.

## Signal mapping

| Signal | Hue (dark / light) | Mark | Why this hue |
| --- | --- | --- | --- |
| Load-bearing (hub or orchestrator) | blue-8 `#1e60d5` / blue-5 `#0349b4` | Solid bar on the left of its row (0.12 units, was 0.1), 1.6 px outline on a card | Primer's accent: importance, not a defect. v2's teal is gone: no teal or green clears the CVD target next to a yellow and a red (best green set: ΔE 6.3 to 7.1), and the teal sat 4.5 from the neutral `link` grey under deutan simulation. The owner's "green on the files" had no explanation on screen; the legend now names it. |
| Clone | purple-6 `#a66bff` / purple-4 `#844ae7` | Row tinted purple, heavy dotted underline (2.4 px), header tick; dotted chord between copies (2.4 px, was 1.6) | Keeps v2's violet (Primer "done"); stays far from yellow and red. Pink was tried and rejected: under protan simulation it falls within ΔE 0.8 of the `link` grey. |
| Dead | yellow-6 `#c88508` / yellow-4 `#956400` | Row filled, hatched in the hue at 135° (caution tape), dashed outline, header tick; dead card the same | Primer "attention": a thing to act on. Yellow beats orange: dead–cycle stays 19.2 apart in dark (orange: 15.3). The opposite hatch direction to the private tail's neutral hatch keeps the two apart without colour. |
| Import cycle | red-8 `#cc1421` / red-5 `#a0111f` | Red dashed ground line and arrowhead (unchanged shape) | Primer "danger", as the brief fixes. Tempura has no import cycle, so red never appears there; it is validated with the others. |
| Exported (entry surface) | none: bold name | Bold row and card names | Snapshot v8's `exported` (in `__all__` or re-exported by a package `__init__`). The owner defined the entry surface as the exported API; a fifth hue would take the CVD margin below target. v7's `is_root` bold (public, no caller) is no longer drawn; it made `compile_mesh_inputs`, a function of a private module, bold. |
| Selection, hover, trace, pulses | emphasis `#ffffff` / `#010409` | Brightest (dark) or darkest (light) outline, heavier width | Attention is maximum contrast against the canvas, never a hue. Pulses add light on the dark canvas and lay ink on the light one. |

Each hue means exactly one thing on the canvas and in the chrome; the side panel's
counts carry the same marks as the canvas in miniature (drawn by the legend's swatch
functions), each with a title such as "13 load-bearing functions".

## Validator output

`validate_palette.py` from the dataviz skill (OKLab ΔE × 100, Machado et al. 2009 at
severity 1.0), `--pairs all` because any two marks can stand side by side. Verbatim
in `/tmp/atlas-shots/theme/validator.txt`:

```text
$ validate_palette.py "#29a895,#936dd9,#d33a3c" --mode dark --surface "#0b1016" --pairs all   # v2 (before)
  [PASS] Lightness band         all 3 inside L 0.48–0.67
  [PASS] Chroma floor           all 3 >= 0.1
  [PASS] CVD separation         worst all-pairs #d33a3c↔#29a895 ΔE 12.0 (deutan) · tritan 13.8
  [PASS] Normal-vision floor    worst all-pairs #936dd9↔#29a895 ΔE 23.6 (normal)
  [PASS] Contrast vs surface    all 3 >= 3:1

$ validate_palette.py "#1e60d5,#a66bff,#c88508,#cc1421" --mode dark --surface "#010409" --pairs all
  [PASS] Lightness band         all 4 inside L 0.48–0.67
  [PASS] Chroma floor           all 4 >= 0.1
  [PASS] CVD separation         worst all-pairs #a66bff↔#1e60d5 ΔE 9.0 (protan) · tritan 13.7
  [PASS] Normal-vision floor    worst all-pairs #a66bff↔#1e60d5 ΔE 19.2 (normal)
  [PASS] Contrast vs surface    all 4 >= 3:1

$ validate_palette.py "#0349b4,#844ae7,#956400,#a0111f" --mode light --surface "#ffffff" --pairs all
  [PASS] Lightness band         all 4 inside L 0.43–0.77
  [PASS] Chroma floor           all 4 >= 0.1
  [PASS] CVD separation         worst all-pairs #a0111f↔#956400 ΔE 8.9 (deutan) · tritan 11.4
  [PASS] Normal-vision floor    worst all-pairs #a0111f↔#956400 ΔE 16.2 (normal)
  [PASS] Contrast vs surface    all 4 >= 3:1
```

The three hues tempura actually draws (no import cycle) pass on their own as well:
dark worst CVD 9.0, normal 19.2; light worst CVD 9.8 (protan, blue–purple), normal
17.6. All pairs, from `/tmp/atlas-shots/theme/tokens_report.md`:

| Pair | Dark normal | protan | deutan | tritan | Light normal | protan | deutan | tritan |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| load-bearing–clone | 19.2 | **9.0** | 13.0 | 14.9 | 17.6 | 9.8 | 11.6 | 11.4 |
| load-bearing–dead | 36.4 | 31.6 | 36.7 | 25.9 | 31.2 | 27.1 | 30.8 | 20.0 |
| load-bearing–cycle | 35.7 | 27.8 | 30.1 | 32.9 | 31.3 | 24.4 | 26.1 | 27.6 |
| clone–dead | 32.6 | 32.0 | 32.2 | 13.7 | 32.0 | 31.2 | 30.8 | 12.9 |
| clone–cycle | 31.6 | 33.9 | 30.3 | 25.1 | 30.2 | 32.7 | 29.4 | 23.2 |
| dead–cycle | 20.2 | 21.6 | 12.8 | 14.5 | **16.2** | 16.4 | **8.9** | 11.5 |

Every pair is also separated by shape (bar, hatched fill, dotted underline and
chord, dashed ground line), so no reading depends on hue alone.

## The marks

All marks sit on the box face, ordered (fill, hatch, outline, tick) and pushed in
front of the face by a polygon offset on the faces. Without it the row decals,
0.001 to 0.005 units in front of the face, z-fought at the overview, where the
camera stands about 200 units away and one depth step is about 0.005 units: in the
first light screenshot two of the three dead rows of `_plan.py` and the dead rows of
`_built.py` and `_canonical.py` did not draw at all. v2's dashed ghost rows sat at
the same offsets.

| Mark | Folded box (rows) | Overview (rows hidden) | Unfolded card |
| --- | --- | --- | --- |
| Dead | Fill (`deadFill`), hatch in `dead` at 135°, 0.125-unit pitch, dashed `dead` outline; name in `text` with a halo in the fill so the hatch stays behind the letters | The same band (the dead rows never fold) plus a solid 0.3-unit `dead` tick at the right of the header | Card tinted, hatched, dashed `dead` outline (1.6 px), 0.13-unit tick in the top-right corner |
| Clone | Row tinted (`cloneFill`), dotted underline 2.4 px; a clone folded in the tail gets the underline only (the tail stands for many functions) | Header tick (left of the dead tick when a box has both); chords between copies | Card tinted, dotted outline (2 px), corner tick; a clone method in a class block gets the tint and the underline |
| Load-bearing | Blue bar on the left of the row or tail | The bars (v2's shape) | Blue outline and left bar |

Text on the fills (WCAG): dead fill 9.9:1 (dark) and 9.5:1 (light), clone fill
10.3:1 and 9.5:1. The hatch against its fill: 3.5:1 and 3.3:1. Ticks against the
headers they sit on: 3.8 to 5.6:1.

## The legend, the key and the guide's list

One table, `MARK_TABLE` in `app.js`, gives each mark an id, a section, short words
(legend), long words of at most 36 characters (key overlay and guide) and a swatch
function drawn with the current theme's tokens. `drawnMarks()` reads the scene, the
census's rule: an entry is present when one of its objects is visible at alpha 0.1
or more inside the picture area (plates, boxes, each row, band, ghost row and header
tick by its own rectangle, cards, class blocks, every line by sampled points, lit
outlines by their colour, pulses while they run, name pills from the label log).
After the picture settles the three lists are rebuilt when the set changes:

- **Legend** (stage, bottom left): every present entry, short words, signals first,
  at most three columns filled top to bottom. Collapses to a pill that still shows
  the signal swatches (`–` / `+`, or Shift+K); the state is kept in `localStorage`
  (`atlas.legend`). It steps aside while the key overlay is open, and labels treat
  it as an obstacle.
- **Key overlay** (`k`): every present entry in long words by section, plus the
  reading conventions of the view (flow, ports, click targets), in a multi-column
  flow sized to its words.
- **Guide, "In the picture"**: of the present entries, every colour and highlight
  (sections signals and attention) and the marks Python names for the step
  (`step.marks`), in long words. It is a subset of the legend's list, so the two
  cannot disagree, and every colour on screen appears in both.

| Id | Section | Legend | Key and guide | Swatch |
| --- | --- | --- | --- | --- |
| `load_bearing` | signals | load-bearing | load-bearing: blue bar on the row | A row with the blue bar |
| `dead` | signals | dead | dead: yellow hatched row, box tick | A filled, hatched, dashed row and a square tick |
| `clone` | signals | clone | clone: purple row, box tick | A tinted row with the dotted underline and a tick |
| `clone_chord` | signals | clone pair | clone pair: dotted purple chord | A dotted purple arc |
| `import_cycle` | signals | import cycle | import cycle: red dashed line | A red dashed curve with its arrowhead |
| `lit` | attention | lit | lit: named, selected or hovered | A row outlined in the emphasis colour |
| `trace` | attention | traced path | traced path: the heaviest lit line | A heavy tapered emphasis line |
| `pulse` | attention | pulses | pulses: caller → callee, 3 runs | A tapered line with a glow |
| `evidence` | attention | name pill | pill: a lit name too small to print | A pill with "name" |
| `plate` | units | package | package: a plate, name at the front | A plate in perspective |
| `box` | units | module | module: a box, rows fold inside | A box with its header, at the view's tier |
| `row` | units | public name | public name: a row on its box | A row with "fn" |
| `exported` | units | exported (bold) | bold name: exported (\_\_all\_\_) | A row with bold "fn" |
| `class_row` | units | class | class: an inset row | A row with an inset face |
| `more` | units | more names | more public names: hairlines | A row with three hairlines |
| `tail` | units | internals | internals: the hatched tail | A neutral hatched row |
| `wrapper` | units | wrapper | wrapper: small type | A row with small "fn" |
| `card` | units | function | unfolded module: cards by depth | A card |
| `class_block` | units | class block | class: a block of public rows | A heavier card |
| `class_open` | units | class opened | class opened: private rows below | A block with a hatched divider and ◆ ◇ |
| `fields` | units | state | state: ◆ owned, ◇ injected | An access curve to ◆ ◇ |
| `plate_ribbon` | calls | package pair | package to package: one ribbon | A wide tapered arc |
| `link_track` | calls | module pair | call in the package: track above | A square track |
| `link_row` | calls | along the row | call along the row: side track | A track between two plates |
| `link_arc` | calls | to another row | call to another row: arc overhead | A tapered arc |
| `margin_arc` | calls | call inside | call inside the module: margin arc | An arc in a card's margin |
| `into_class` | calls | into a class | call into a class: side port | A curve into a block's side |
| `constructs` | calls | constructs | constructs: bar on class header | A curve onto a header bar |
| `intra` | calls | inside a class | call inside the class: edge loop | A loop on a block's edge |
| `stub` | calls | leaves scope | call leaving: stub, → package | A fading riser with "→ pkg" |
| `import` | calls | import | import: dashed, on the ground | A grey dashed curve |
| `flow`, `ports`, `click` | reading | (key only) | flow; in left, out right; box: scope · header: unfold | Conventions, shown by view |

Counts in the screenshots: overview 9 legend entries, package scope 14 and 13,
module scope 19, dead-code stop 11, clone-groups stop 13, pipeline 10.

**Python's step marks against the picture.** v2's guide listed `step.marks` from
Python. Compared with what each step draws (`atlasProto.marksDiff()`), Python never
lists a mark the step lacks except three transient or conditional ones, and it
omits marks the reader sees, colours included:

| Step | Python lists, not drawn | Drawn, not in Python's list |
| --- | --- | --- |
| package-map | | dead, clone, lit, more, tail |
| pipeline stops (6) | pulse (after the three runs end) | lit and exported in all six; dead or clone marks on context boxes in four; plate, class_row, more or wrapper in most |
| state-and-collaboration | card, class_open, intra, evidence (no cards exist in `_quantum_petsc`, the class has no private rows, no intra call is lit, the cited class prints its own name) | clone, exported, class_row, tail, class_block |
| review-pressure | evidence (the row prints its name) | load_bearing, plate, row, exported, tail, wrapper |
| signal-dead (Dead code) | | load_bearing, lit, plate, row, exported, class_row, tail, wrapper |
| signal-clones (Clone groups) | | dead, clone_chord, lit, evidence, plate, exported, class_row, more |

The load-bearing bars at the v2 dead-band stop are the owner's case: drawn, and
unexplained in the step's list.

## Theme mechanism

- **Tokens.** `theme.js` holds both themes as role tables (the palette tables above,
  each value commented with its Primer token) and derives the three.js colours (`C`),
  the line tiers (`TIER`), text (`T`), the box header fills per tier and the label
  canvas's halos, pills and tooltips (`K`). Nothing outside `derive()` picks a colour.
- **Chrome.** `style.css` defines the same roles as custom properties under
  `:root[data-theme="dark"]` and `:root[data-theme="light"]`; every chrome colour is a
  `var()`. `atlasProto.themeCheck()` compares the shared values (canvas, text, soft,
  muted, dim, emphasis, the four hues) with the token object: 0 mismatches in both
  themes.
- **Choice.** An inline script in `index.html` sets `data-theme` before the first
  paint: `?theme=` (screenshots), else `localStorage['atlas.theme']`, else
  `prefers-color-scheme`. Without a stored choice the page follows the system
  setting as it changes. The top bar's `◐ dark` / `◐ light` button and the `t` key
  switch and store the choice. Checked in the preview with the colour scheme emulated
  to light: the page opened light, the button switched to dark and stored it, a
  reload kept dark.
- **In place.** `setTheme()` loads the tokens, recolours every registered material
  (`tmat`) and build-time line (`tpaint`), redraws the two hatch textures, sets the
  fog, switches the pulses between additive and normal blending, rebuilds the class
  blocks and the side panel, resets the tier styles and repaints through
  `applyEmphasis`. In each of the 13 guide steps the world signature and the camera
  key are equal before and after the switch.

## Measurements

At 1,280 × 800 CSS px, pixel ratio 2. "Before" is the unmodified v2 prototype
(snapshot 7) served from a copy; "after" is this prototype (snapshot 8), dark and
light, at the identical overview camera (`camKey` equal).

### Hues

| | v2 | Dark | Light |
| --- | --- | --- | --- |
| Reserved hues | 3 (teal, violet, red) | 4 (blue, purple, yellow, red) | 4 |
| Hue families on the overview (pixels with OKLCH C ≥ 0.05, 30° bins, ≥ 20 px) | 2: teal 180–210° (253 px), violet 270–300° (521 px) | 3: yellow 60–90° (4,563 px), blue 240–270° (416 px), purple 270–300° (1,226 px) | 3 in 5 bins: yellow 60–120° (4,595 px), blue 240–270° (369 px), purple 270–330° (1,199 px) |
| Hues in the chrome | accent blue (`#9ec5ff` guide titles, current step, Resume) and the canvas hues | the signal swatches only | the same |
| Worst pair, normal | 23.6 (teal–violet) | 19.2 (blue–purple) | 16.2 (yellow–red) |
| Worst pair, protan | 18.6 (teal–violet) | 9.0 (blue–purple) | 9.8 (blue–purple) |
| Worst pair, deutan | 12.0 (teal–red) | 12.8 (yellow–red) | 8.9 (yellow–red) |
| Worst pair, tritan | 13.8 (teal–violet) | 13.7 (purple–yellow) | 11.4 (blue–purple) |
| Closest signal to a neutral line token (min of normal, protan, deutan) | **4.5** (teal–`link`) | 9.0 (red–`edge`) | 8.6 (red–`strong`) |

The fourth hue costs CVD margin (worst 12.0 → 9.0 and 8.9), still above the target 8.

### Signal contrast

| Signal | v2 on `#0b1016` (on box face) | Dark on `#010409` (on box face, on card) | Light on `#ffffff` (on box face, on card) |
| --- | --- | --- | --- |
| Load-bearing | 6.48 (5.90) | 3.61 (3.04, 3.32) | 8.03 (7.54, 8.03) |
| Clone | 4.94 (4.49) | 6.03 (5.09, 5.56) | 5.10 (4.79, 5.10) |
| Dead | not a hue (ghost outline `#a3aebb`) | 6.66 (5.62, 6.14) | 5.12 (4.81, 5.12) |
| Import cycle | 4.04 (3.67) | 3.61 (3.04, 3.32) | 8.09 (7.60, 8.09) |
| Emphasis | 17.92 | 20.54 (17.31) | 20.54 (19.29) |

Dark load-bearing and cycle stand at 3.6:1 because the lightness band keeps them in
L 0.48 to 0.67 and blue and red must stay apart from purple and yellow; both carry a
shape of their own (bar, dashed line) and pass 3:1 on every surface.

### Findability of dead and clone marks at the overview

Test: the overview at 1,280 × 800 (`views.js` `V.overview()`), read from the
rendered picture (WebGL and label canvases on the canvas colour, panels masked). For
each dead function and each clone member, `measure.js` `findable()` projects its
marks to the screen (its row, the tail it folds into, or its card; and its box's
header tick region) and counts the pixels whose OKLCH chroma is at least 0.04 and
whose hue lies within 25° of the signal's hue. A function counts as findable when one
of its marks shows at least 16 CSS px² of its hue (a 4 × 4 px patch, my threshold
for a reader who has read the legend and scans for that colour). v2's dead marks are
neutral, so they are tested against the new dead hue and count 0 by construction; I
also inspected 1:1 crops by eye.

| | v2 | Dark | Light |
| --- | --- | --- | --- |
| Dead functions findable | **0 of 5** | **5 of 5** | **5 of 5** |
| Clone members findable | **6 of 8** | **8 of 8** | **8 of 8** |
| Dead hue px per function (row, tick) | 0, 0 | 549 to 1,695, 19 to 21 | 546 to 1,696, 17 to 20 |
| Clone hue px per member (row or tail, tick) | tails 29 to 78, rows 23 and 32, `Device` class row 0 | tails 9 to 87, rows 206 to 298, ticks 19 to 39 | the same within 4 px |

By eye on the crops: v2 shows one dotted rectangle on `_plan.py` (its three dead
rows not separable) and nothing at `_built.py` or `_canonical.py`; the violet
underline of `device.py`'s `Device` row does not show. After, every box holding a
defect shows its tick and a hued band. The two clone members that v2 missed are the
`Device` class row; the three tail-folded clones with 9 to 13 hue px on the tail
underline are found by their header ticks (19 to 20 px).

### Label contrast (rendered)

`measure.js` `labelContrast()`: for every label on the label canvas, the median
scene colour under it (WebGL canvas), the label's halo or pill composited over that,
the text colour at its alpha over the result; WCAG ratio. Per screenshot (labels,
minimum):

| View | Dark | Light |
| --- | --- | --- |
| 01 Overview | 8 labels, 13.1 | 8, 8.8 |
| 02 Package `electrostatics` | 50, 5.0 | 50, 6.0 |
| 03 Module `device.py` | 36, 5.1 | 36, **4.2** (`ELECTROSTATICS`, tier-3 package name at 83 % alpha) |
| 04 Dead code | 30, 6.5 | 30, 6.5 |
| 05 Clone groups | 15, **1.9** | 15, **1.8** |
| 06 Package `mesh` (legend open and collapsed) | 71, 6.0 | 71, 6.5 |
| 07 Overview with the key | 7, 13.1 | 7, 8.8 |
| 08 Pipeline `compile_mesh_inputs` | 15, 9.3 | 15, 7.0 |

Over all 13 guide steps the labels under 4.5:1 are only context package names the
guide dims to 36 to 45 % (four in Clone groups, two in `pipeline-build-device`, six in
`pipeline-device-plan-mesh`, five in `pipeline-build-thomas-fermi-solver`, one in
Load-bearing functions): 1.8 to 2.2:1, recessive by design as in v2 (2.9:1 there).
Chrome text: `dim`, the faintest chrome token, is 7.1:1 (dark) and 6.1:1 (light) on
the canvas and 5.4:1 or more on `raised`.

### Marks below 3:1

| Mark | Dark | Light | Why |
| --- | --- | --- | --- |
| Tier 3 lines (`edge`): box outlines at the overview, context cards, imports outside Plan | 2.09 (1.76 on the face) | 1.55 (1.45 on the face) | Context by design (v2: 2.1). In light the faces carry the silhouettes |
| Tier 3 rules (`rule`): row rules, plate outlines in a module scope | 1.46 | 1.43 | Context by design |
| Faces and plates (`fill`, `raised`, `raised2`) | 1.09 to 1.38 | 1.06 to 1.21 | Surfaces, not marks |
| Clone and dead fills against the face | 1.55 and 1.60 | 1.45 and 1.44 | The fill is never alone: the tick (3.8 to 5.6:1), the dead hatch (3.3 to 3.5:1 on its fill), the dashed dead outline (4.8 to 5.6:1 on the face) and the dotted clone underline (3.3:1 on its fill) carry the signal |
| Dimmed marks (guide context at 40 %, unselected at 30 %) | below 3:1 | below 3:1 | Dimming is the point |

## Data refresh

The Python track moved the story to version 2 while this track ran. The prototype
now runs on `/Users/jdtorresluna/Code/tempura/.atlas/atlas.json` (snapshot 8) and
`atlas-story.json` (story version 2), copied into `prototypes/strata-theme/`, and
`prepare.py` was changed to read them:

- Story chapters carry `kind`: `chapter`, `pipeline` (a tour stop with its
  `pipeline_root`; the panel lists its functions in call order) or `signal`
  (`view.signal`: `dead`, `clones`, `load_bearing`). A signal chapter becomes a
  review stop that lights every function the signal holds, with the story's title and
  body. When the story has signal chapters, Python adds no tour or review stops of its
  own and keeps the story's order: 13 steps (4 chapters, 6 pipeline stops, Review
  pressure, Dead code, Clone groups, Load-bearing functions).
- `exported` (snapshot v8) is copied onto view nodes, rows and classes; the bold
  name follows it.
- `view.json` is byte-identical across two runs (SHA-256 `2a48d672ca6d…`). The v7
  `view.json` is kept at `/tmp/atlas-shots/theme/view-v7.json`.

The dead and clone screenshots use the story's Dead code and Clone groups stops.
Because the data changed, the geometry hash is not v2's; the theme switch is checked
against the world signature instead (equal in every step).

## Evidence

All screens 1,280 × 800 CSS px at pixel ratio 2, from the prototype's compositor, in
`/tmp/atlas-shots/theme/`, each view in both themes:

- `/tmp/atlas-shots/theme/01-overview-dark.png`, `/tmp/atlas-shots/theme/01-overview-light.png`
- `/tmp/atlas-shots/theme/02-package-electrostatics-dark.png`, `/tmp/atlas-shots/theme/02-package-electrostatics-light.png`
- `/tmp/atlas-shots/theme/03-module-device-dark.png`, `/tmp/atlas-shots/theme/03-module-device-light.png`
- `/tmp/atlas-shots/theme/04-review-dead-code-dark.png`, `/tmp/atlas-shots/theme/04-review-dead-code-light.png`
- `/tmp/atlas-shots/theme/05-review-clone-groups-dark.png`, `/tmp/atlas-shots/theme/05-review-clone-groups-light.png`
- `/tmp/atlas-shots/theme/06a-legend-expanded-dark.png`, `/tmp/atlas-shots/theme/06a-legend-expanded-light.png` (package `mesh`, 13 entries)
- `/tmp/atlas-shots/theme/06b-legend-collapsed-dark.png`, `/tmp/atlas-shots/theme/06b-legend-collapsed-light.png` (the same view, the pill)
- `/tmp/atlas-shots/theme/07-key-overlay-dark.png`, `/tmp/atlas-shots/theme/07-key-overlay-light.png`
- `/tmp/atlas-shots/theme/08-pipeline-selected-dark.png`, `/tmp/atlas-shots/theme/08-pipeline-selected-light.png`
- Before and after crops at the overview: `/tmp/atlas-shots/theme/crop-dead-before.png`,
  `/tmp/atlas-shots/theme/crop-dead-after-dark.png`, `/tmp/atlas-shots/theme/crop-dead-after-light.png`,
  `/tmp/atlas-shots/theme/crop-clone-before.png`, `/tmp/atlas-shots/theme/crop-clone-after-dark.png`,
  `/tmp/atlas-shots/theme/crop-clone-after-light.png` (before from
  `/tmp/atlas-shots/strata-v2/02-overview-map-esc-from-guide.png`)
- Static tables: `/tmp/atlas-shots/theme/tokens_report.md`, `/tmp/atlas-shots/theme/validator.txt`

![Overview, dark](/tmp/atlas-shots/theme/01-overview-dark.png)
![Overview, light](/tmp/atlas-shots/theme/01-overview-light.png)
![Dead code, dark](/tmp/atlas-shots/theme/04-review-dead-code-dark.png)
![Dead code, light](/tmp/atlas-shots/theme/04-review-dead-code-light.png)
![Clone groups, dark](/tmp/atlas-shots/theme/05-review-clone-groups-dark.png)
![Module device.py, light](/tmp/atlas-shots/theme/03-module-device-light.png)

## Rejected

| Option | Why not |
| --- | --- |
| Keep teal (or Primer green, display teal or pine) for load-bearing | Next to yellow and red no green or teal step clears the CVD target: best sets ΔE 6.3 to 7.1 (dark) and 4.3 to 7.1 (light). v2's teal also sat 4.5 from the neutral grey under deutan. |
| Pink (Primer sponsors) for clone | Under protan simulation `#e456a3` lands within ΔE 0.8 of the `link` grey: a clone would read as a plain line. |
| Orange (Primer severe) for dead | Closer to red: dead–cycle normal ΔE 15.3 against 19.2 for yellow. |
| Primer's foreground steps (`fgColor-success` `#2bd853`, `fgColor-done` `#d3abff`, …) as mark hues on dark | Outside the dark lightness band (L > 0.67): they glare beside the names and lose the equal weight of the four signals. |
| Primer's muted fills as they ship (dark 10 to 15 % alpha; light `#fcf7be`, `#faf0fe`) | Light ones are 1.05:1 on white and the dark ones barely tint the face: at the overview the row did not show. Dark uses 30 %, light uses step 1. |
| A fifth hue for exported functions | Would push the all-pairs CVD margin under the target; bold weight carries it without colour. |
| A strike through dead names | Hurts reading the very names the dead-code stop is about; the hatch sits behind haloed names instead. |
| A tick at the right end of each row | Collides with the end of the longest wrapped names (Python sizes boxes to them). |
| Ticks as tabs outside the box | The gutter is 0.24 units and holds the risers of the tracks. |
| Legend in the side panel | The brief asks for it in the stage; the side panel scrolls and the guide replaces it. |
| A legend that reserves picture space in the camera fit | Collapsing it would move the camera; the legend overlays the corner instead and labels avoid it. |
| Python's `step.marks` as the guide's list | Lists marks the step does not draw and leaves out drawn colours (table above). |
| Switching theme by reloading the page | Loses the reader's camera; the in-place switch moves nothing. |

## Carry into the integration step

1. `theme.js` (both token sets with their Primer sources) and the custom properties
   in `style.css`, with `themeCheck()`; every colour literal in `app.js` replaced by a
   token (`C`, `TIER`, `T`, `K`), `BOX_TIER` and `STYLE` rebuilt by `loadTokens()`.
2. The material registry (`tmat`, `tpaint`, `HATCHES`) and `setTheme()`; the inline
   theme script in `index.html`; the `◐` toggle and the `t` key; pulses blending per
   theme; the compositor's background from `--bg`.
3. The polygon offset on module box faces and header, and the decal layers
   (`LAYER`: fills, hatches, outlines, ticks). This fixes a depth fight v2 also had.
4. The marks: dead rows (fill, 135° hatch, dashed outline), clone row tint and 2.4 px
   underline, header ticks, signal cards (tint, hatch, corner tick), the heavier
   clone chord, the 0.12-unit load-bearing bar, halos in the fill colour.
5. `MARK_TABLE`, `drawnMarks()`, `renderLegend`, `renderKey`, `renderGuideMarks` with
   the subset rule, `updateMarks()` after the picture settles, and the side panel's
   markers drawn by the same swatches. Candidate for Python: the table's ids and words
   (`view.legend`), so the explorer and the report share the vocabulary; presence
   stays in the renderer, which alone knows what it drew. Python's `step.marks` should
   either follow the renderer's rules or be dropped.
6. Bold names from `exported` (snapshot v8), with `is_root` no longer drawn; the
   inspector's `exported` tag.
7. `prepare.py`'s story v2 handling (`signal_step`, `PART`, `GUIDE_RULE_V2`) belongs
   to `build_guide` in `src/atlas/analyzer/layout.py` when it moves.
8. No chrome accent hue: current step, guide titles and Resume use the emphasis
   colour and weight.
9. Optionally `measure.js` (`findable`, `hueCensus`, `labelContrast`) and the
   `views.js` `run()` set as regression checks.

## Limitations

- **Dimmed context labels** stay below 4.5:1 (1.8 to 2.2:1 in guide steps, 4.2:1
  for the light module scope's package name); v2 dimmed them on purpose. A floor
  for context names would trade the guide's focus for their legibility.
- **Light tier 3 is fainter than dark tier 3** (1.55 against 2.09:1): Primer's light
  scale has no step between neutral-7 and neutral-8.
- **Red is untested on screen**: tempura has no import cycle.
- **The legend covers a corner of the picture**, up to about 430 × 120 px in a module
  scope (19 entries). It stays clear of the subject in every screenshot here; a wider
  repository could need the pill.
- **The findability threshold** (16 CSS px² of the hue) is my assumption; the test
  measures visibility, not attention or search time.
- **Hue census bins**: light families straddle bin edges (yellow 60–120°, purple
  270–330°); I count families, not bins.
- **The compositor** paints a CSS border in one colour on all sides (the inspector's
  load-bearing tag shows a full blue border in screenshots, a left bar on screen).
- **Ports.** Port 8770 was held by a stale server from 9 October (serving
  `/tmp/strata-baseline`); I did not stop a process I had not started and served on
  8790 instead (receiver 8771, the v2 copy for before numbers on 8797). The server
  sends `Cache-Control: no-store`: the preview kept stale modules otherwise.

## How to run

```text
pixi run python -B prototypes/strata-theme/prepare.py   # view.json from atlas.json (snapshot 8) and atlas-story.json (story 2)
pixi run python -B /tmp/atlas-shots/theme/tools/serve.py 8790 prototypes/strata-theme   # static, no-store
# (pixi run python -B -m http.server 8790 --directory prototypes/strata-theme --bind 127.0.0.1 also works; reload with a new query after edits)
# http://127.0.0.1:8790/?size=1280x800              system theme, or the stored choice
# http://127.0.0.1:8790/?size=1280x800&theme=light  forced theme (screenshots)
pixi run python -B /tmp/atlas-shots/receiver-theme.py   # port 8771, writes /tmp/atlas-shots/theme/
# in the page: const v = await import('./views.js'); await v.run();   # the 18 screenshots and their measurements
#              const m = await import('./measure.js'); m.findable({ hues: { dead: atlasProto.tokens().dead, clone: atlasProto.tokens().clone } });
pixi run python -B /tmp/atlas-shots/theme/tools/tokens_report.py   # the static tables
```

Keys: `t` theme, `k` key overlay, Shift+K legend, plus v2's keys. `window.atlasProto`
adds `setTheme`, `theme`, `themeCheck`, `tokens`, `drawnMarks`, `legend`,
`legendShown`, `keyShown`, `guideShown`, `marksDiff`, `updateMarks`.
