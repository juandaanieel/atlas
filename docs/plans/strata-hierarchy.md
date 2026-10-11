# Strata: visual hierarchy

> Status: Prototype (2026-10-09). Runs on tempura at
> `prototypes/strata-hierarchy/`, a copy of `prototypes/strata/`. This track
> changes appearance and visibility only: colours, widths, opacities, which
> labels a view draws, and their type. No coordinate changed; the geometry hash
> `ed95c4fa` from `strata.md` holds in every view (`93986f4e` with the class
> `Device` open, the same as the original). Nothing under `src/`, `tests/`,
> `schema/` or the other prototypes changed.

## Answer in brief

The owner found the integrated prototype hard to digest. The audit gives a
measured reason: every view drew its context brighter than its subject.

- **Overview.** The 25 module names (8.5 px, `#e8edf2`, up to 16:1) were the
  brightest text; the 8 package names were dimmer (11 px, `#97a3b1`, 6:1).
  The 193 plain card borders (`#6b7787`, 4.2:1) sat 9 L* below the ribbons
  between packages (5.9:1), and the plates (the view's unit) were 1.04:1
  against a ground of 1.02:1. Neutral marks spread over 11 luminance levels
  from L* 12 to 59 with no gap wider than 9 L*.
- **Package and module scope.** The marks that answer the view's question
  (module-pair tracks at package scope, individual calls at module scope) sat
  at 2.1 to 3.6:1, below the plain card borders (4.2:1) and the class port
  squares (7.5:1). Names came in 6 to 8 sizes from 7 to 12 px, and 57 of 68
  labels in `electrostatics` were below 9 px.

The fix assigns every element class to one of three tiers per view, gives each
tier one neutral line token, and draws labels in one family at three sizes with
a 9 px floor. Results at 1,280 × 800:

| View | Luminance tiers (neutral marks) | Labels | Labels below 9 px | Ink in the mid band (L* 40–62) |
| --- | --- | --- | --- | --- |
| Overview | 6 → **3** | 33 → **8** | 24 → **0** | 34.6 % → **16.0 %** |
| Package scope `electrostatics` | 6 → **4** | 68 → **20** | 57 → **0** | 17.8 % → 32.9 % (the tracks, now tier 2) |
| Module scope `device.py` | 6 → **4** | 26 → 25 | 20 → **0** | 29.0 % → 33.9 % (the calls, now tier 2) |
| Pipeline `compile_mesh_inputs` | 4 → 4 | 17 → 14 | 8 → **0** | 17.2 % → 16.2 % |

Within a glance the overview now reads as 8 named packages and the calls
between them, a package scope as named module boxes joined by tracks, and a
module scope as named cards and their calls.

## Measurement

`audit()` in `app.js` walks every object the current view draws (inside the
camera frustum, opacity above 0.02) and records its element class, resting
colour, opacity and width. Effective colour is the colour blended over the
canvas `#0b1016` by its opacity, in sRGB as the framebuffer blends; contrast is
the WCAG ratio against the canvas. A mark below L* 12 (canvas L* 4.5) counts as
a ghost: drawn, but dimmed out of scope. Luminance tiers cluster the effective
L* of the neutral marks (not fills, not the three hues): a new tier starts 5 L*
or more above the start of the current one. Labels are counted by wrapping the
label canvas for one redraw. `views.js` sets up each view through
`window.atlasProto` and adds `ink()`: the share of drawn pixels (L* ≥ 15) in
each L* band of the picture area, read from the WebGL and label canvases.
The before numbers come from the unmodified `prototypes/strata/app.js` with the
same `audit()` and `views.js` added (a measurement copy outside the repository).

| View | Element classes | Marks drawn (ghosts) | Distinct L* levels | Tiers: L* ranges | Labels | Label sizes (px) | Ink, % of picture | Ink share L* 15–40 / 40–62 / 62–88 / 88+ / hue |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Overview, before | 31 | 542 (3) | 11 | 12–14, 18–23, 27, 43–48, 50, 59 | 33 | 8.5, 9, 11 | 8.8 | 51 / 35 / 6 / 3 / 5 |
| Overview, after | 26 | 465 (0) | 6 | 18–23, 27–31, 56 | 8 | 12 | 8.0 | 74 / 16 / 3 / 1 / 6 |
| `electrostatics`, before | 29 | 187 (35) | 11 | 12–14, 20–23, 31, 41–45, 50, 66 | 68 | 7, 7.5, 8, 8.5, 9.5, 11, 11.5, 12 | 6.9 | 61 / 18 / 12 / 3 / 7 |
| `electrostatics`, after | 28 | 186 (35) | 4 | 20, 31, 56, 73 | 20 | 9, 12 | 6.8 | 47 / 33 / 12 / 2 / 7 |
| `device.py`, before | 29 | 54 (71) | 11 | 12–14, 20–23, 31, 41–45, 50, 66 | 26 | 7, 7.5, 8, 9.5, 11, 12 | 2.3 | 47 / 29 / 10 / 8 / 6 |
| `device.py`, after | 28 | 53 (71) | 4 | 20, 31, 56, 73 | 25 | 9, 10, 12 | 2.4 | 33 / 34 / 17 / 11 / 6 |
| Pipeline, before | 28 | 150 (63) | 8 | 12–17, 19–21, 29, 97 | 17 | 8.5, 10, 11 | 4.5 | 40 / 17 / 15 / 27 / 1 |
| Pipeline, after | 24 | 147 (37) | 6 | 13–16, 21, 31, 97 | 14 | 10, 12 | 3.7 | 36 / 16 / 16 / 30 / 2 |
| Plan, before → after | 30 → 26 | 557 → 508 | 8 → 6 | 5 → 4 tiers | 26 → 29 | 8.5, 11 → 9, 12 | 4.9 → 5.0 | |
| Hover `device.py`, before → after | 31 → 26 | 487 → 410 | 9 → 7 | 6 → 5 tiers | 35 → 16 | 5 sizes → 3 | 7.4 → 6.4 | |
| Far zoom, before → after | 28 → 25 | 511 → 462 | 10 → 6 | 6 → 3 tiers | 11 → 6 | 8.5, 11 → 12 | 3.4 → 3.4 | |

Effective contrast of the element classes that changed, against the canvas:

| Element class | Before | After |
| --- | --- | --- |
| Package name, overview | 11 px `#97a3b1`, 5.8–7.1:1 | 12 px `#e8edf2`, 12.1–15.3:1 |
| Module name, overview | 25 × 8.5 px `#e8edf2`, 12–16:1 | not drawn (hover and selection only) |
| Plate outline / plate fill / ground, overview | `#26313d` 1.4 / 1.04 / 1.02 | `#7b8797` 5.2 / 1.07 / canvas |
| Ribbon between packages, overview | `#8390a0` 5.9:1 | `#7b8797` 5.2:1 |
| Ribbon inside a package, overview | `#66737f` 3.9:1 | `#3e4a57` 2.1:1 |
| Plain card border (193), overview | `#6b7787` 4.2:1 | `#3e4a57` 2.1:1 |
| Pane rim and block edges, overview | `#5b6878` 3.4:1 | `#3e4a57` 2.1:1 |
| Pane rim / pane frame, package scope | `#5b6878` 3.4 / `#2c3846` 1.6 | `#a9b4c0` 9.1 / `#7b8797` 5.2 |
| Module-pair track and stubs, package scope | `#55626f` 3.1, `#5f6c79` 3.6 | `#7b8797` 5.2:1 |
| Class port square, construction bar | `#97a3b1` 7.5:1 | the call's tier, `#7b8797` 5.2:1 |
| Plain card border, module scope | `#6b7787` 4.2:1 | `#a9b4c0` 9.1:1 |
| Call on the pane, module scope | `#3e4a57` 2.1:1 | `#7b8797` 5.2:1 |
| Teal, violet (signals) | 6.5:1, 4.9:1 | unchanged |

## Tiers per view

Neutral line tokens, contrast on the canvas `#0b1016`:

| Token | Hex | Contrast | L* | Use |
| --- | --- | --- | --- | --- |
| `strong` | `#a9b4c0` | 9.1 | 72.8 | Tier 1 outlines (new token, between `muted` and `text`) |
| `link` | `#7b8797` | 5.2 | 55.9 | Tier 2 connections (new token) |
| `edge` | `#3e4a57` | 2.1 | 30.9 | Tier 3 lines (spec 4.3) |
| `rule` | `#26313d` | 1.4 | 19.8 | Tier 3 rules (spec 4.3) |
| `text` / `muted` / `dim` | `#e8edf2` / `#97a3b1` / `#6b7787` | 16.2 / 7.5 / 4.2 | | Labels of tier 1 / 2 / 3 |
| `emphasis` | `#f5f8fc` | 17.9 | 97.5 | Hover and selection, above every tier |

The three hues (teal `#29a895`, violet `#936dd9`, red `#d33a3c`) are tier 1 in
every view and keep their widths and line styles. `STYLE` in `app.js` holds the
table below; `viewCtx()` picks the row from scope and level of detail.

| View | Tier 1, read first | Tier 2, read second | Tier 3, context |
| --- | --- | --- | --- |
| Overview | Plates: fill `#111922`, outline `link` 1.2 px; package names L `text`. Signals | Ribbons between packages (row and sky) `link` 1.5–4.5 px by log of calls | Panes: glass `#131c26` × 0.45, frame `rule` 1 px, rim `edge` 1.2 px. Cards `edge` 1 px, blocks `edge` 1 px, ribbons inside a package `edge`, imports `edge` × 0.51 |
| Far zoom | As overview | Plate ribbons `link` 2.4–6 px | As overview; ribbons inside a package `edge` × 0.7 |
| Plan | As overview | Imports `link` × 0.85, dashed 1 px; module names S `muted` | Panes, cards, blocks as overview |
| Package scope | Panes: rim `strong` 1.6 px, frame `link` 1 px, glass × 0.6; module names L `text`. Signals | Module-pair tracks, row tracks, arc stubs `link` 1.6 px; class ports and construction bars `link`; port labels S `muted` | Cards `edge` 1 px, blocks `edge`, calls inside one module `edge` 1.3 px, floors and entry datum `rule`, plate outline `edge`, package name L `muted`, public card names M or S `muted` |
| Module scope | Cards `strong` 1 px, blocks `strong` 1.2 px; card, class and row names M or S `text`; module name L `text`. Signals | Every call in scope `link` (1.3 px on the pane, 1.6 px tracks and stubs), ports `link`, pane rim `link` 1.2 px, port labels S `muted` | Pane frame `edge`, floors and datum `rule`, neighbours at 4 %, package name L `dim` |
| Selection (pipeline, ribbon, class) | Lit cards and calls `emphasis`; callouts M `text` | Names of the modules the selection touches, M `muted` | Everything else dimmed (cards × 0.3, calls × 0.06); plate outlines drop to `edge`, package names to `muted` |
| Hover a pane (overview) | The pane's rim and ribbons `emphasis`; its name M bold `emphasis` | Partner modules' names M `muted` | Other ribbons × 0.16 |

A deliberate exception: overview plate outlines use `link`, not `strong`. A 9:1
outline at ground level shows through the glass panes of the row in front and
competed with the ribbons; the package name and the plate fill carry tier 1.

## Labels and type

One family (the `--mono` stack, JetBrains Mono first), three sizes:

| Size | Px | Weight | Used for |
| --- | --- | --- | --- |
| L | 12 | 700 | The view's unit: package names (uppercase, 0.14 em tracking), module names in a package scope, the module name in a module scope, tooltip titles |
| M | 10 | 400; 700 for entry surface and class names | Names inside the unit: cards, classes, class rows, hovered and partner modules, selection callouts |
| S | 9 | 400 | Captions and pointers: port labels, datum captions, `CLASS`, `private ▸`, fields, module names in Plan, tooltip subtitles |

- **Minimum size.** Nothing draws below 9 px at 1,280 × 800 (18 device px at
  the screenshot's pixel ratio 2). A name that does not fit is dropped; its card
  stays, and the tooltip and inspector give the name.
- **Fit rule.** A name on a face takes the first allowed size that shows it in
  full; failing that, the size that shows the most characters (at least 7). A
  face holds text only when it is at least 1.15 × the size tall (1.05 for class
  rows and headers).
- **Module names in a package scope** keep one size. Left to right, a name
  takes its full width on the header line, else on a second line one L step
  above, else it is truncated to its pane; a third line is the last resort. All
  9 names in `electrostatics` and all 13 in `mesh` draw in full at 12 px
  (before: 6 of 9 full at nine sizes from 7.5 to 12 px, and 9 of 13).
- **Halos.** Names on a face get a 3 px halo in the face's fill; names on a rim
  get a canvas-coloured backdrop; both stay opaque when the name is dimmed, so
  a lit call never runs through a name.

Label budget per view, as drawn on tempura:

| View | Drawn | Count |
| --- | --- | --- |
| Overview | Package names (L) | 8 |
| Far zoom | Package names (L) that fit without overlap | 6 of 8 |
| Plan | Package names (L), module names (S) | 8 + 21 |
| Package scope | Module names (L), package name (L), port labels (S), datum caption (S), public card and class names where they fit at 9 px or more | 9 + 1 + 5 + 1 + 4 |
| Module scope | Module name (L), card, class and row names (M or S), port labels (S), datum and package name | 25 |
| Selection | Adds callouts (M) for lit cards too small for a name, names of the modules involved (M) | 14 (pipeline) |
| Hover | Adds the hovered module (M), its partners (M), a tooltip (L + S) | 16 |

A package scope names public functions first: a private helper's name appears
only when the reader zooms in until its card is 2.3 × the type size tall.

## What was removed and why

| Removed | Where | Why |
| --- | --- | --- |
| Ground grid dots | Everywhere | Decoration: 4,620 points, one per world unit, with no meaning |
| Ground tint | Everywhere | The ground at 1.02:1 made the plates (1.04:1) disappear. The ground is the canvas colour and still veils buried dead code |
| Radial vignette | Page background and compositor | Decoration; the canvas is flat `#0b1016` |
| Pane texture (calls inside one module) | Overview | 28 batches answering a module-scope question; they read as noise on the panes |
| Floor rules and entry datum | Overview, far, Plan | Repeat what the card rows show; kept in scopes at `rule` |
| Module names | Overview, far | 25 labels below 9 px, brighter than the package names; they return on hover and selection |
| Names below 9 px | Everywhere | 24 to 57 per view were 7–8.5 px truncations such as `_readonl…` |
| Continuous name sizes | Package and module scope | Names shrank to fit (7 to 12.5 px); replaced by three sizes and the fit rule |
| `CLASS` caption | Unless the header holds two lines | The block shape already says class |
| Key entries for marks the view does not draw | Key | 24 entries in every view; 12 at the overview, 9 at far and Plan, 20 at package scope, 21 at module scope. Key text is `dim` until the reader hovers the key |
| Brighter sidebar package rows, CSS hues | Side panel | Rows take `muted`; CSS teal, violet and red match the canvas hues |

## What never moves

Every change sets colour, width, opacity, visibility or label typography.
`geomSignature()` gives `ed95c4fa` at the overview, Plan, far zoom, both scopes,
pipeline, hover and ribbon selection, and `93986f4e` with `Device` open, equal
to the unmodified prototype. In a scope a hover changes a label's colour only:
the label list with and without a pane hover differs by the tooltip alone. At
the overview a hover shows the hovered and partner module names; it moves
nothing. No motion was added.

## Evidence

All screens are 1,280 × 800 CSS px at pixel ratio 2, from the prototype's
compositor. Before and after pairs:

- Overview: `/tmp/atlas-shots/hierarchy/overview-before.png`,
  `/tmp/atlas-shots/hierarchy/overview-after.png`
- Plan: `/tmp/atlas-shots/hierarchy/plan-before.png`,
  `/tmp/atlas-shots/hierarchy/plan-after.png`
- Package scope `electrostatics`: `/tmp/atlas-shots/hierarchy/electrostatics-before.png`,
  `/tmp/atlas-shots/hierarchy/electrostatics-after.png`
- Module scope `device.py`: `/tmp/atlas-shots/hierarchy/device-before.png`,
  `/tmp/atlas-shots/hierarchy/device-after.png`
- Pipeline `compile_mesh_inputs`: `/tmp/atlas-shots/hierarchy/pipeline-before.png`,
  `/tmp/atlas-shots/hierarchy/pipeline-after.png`
- Hover `device.py` at the overview: `/tmp/atlas-shots/hierarchy/hover-before.png`,
  `/tmp/atlas-shots/hierarchy/hover-after.png`
- Far zoom: `/tmp/atlas-shots/hierarchy/far-before.png`,
  `/tmp/atlas-shots/hierarchy/far-after.png`

Further pairs: package scope `mesh` (`mesh-*.png`), `Device` open and
selected (`deviceopen-*.png`), hover on a card in `electrostatics`
(`hovercard-*.png`), ribbon `device.py → materials.py` selected
(`ribbon-*.png`). Raw audits: `/tmp/atlas-shots/hierarchy/audit-before.json`
and `audit-after.json`.

![Overview before](/tmp/atlas-shots/hierarchy/overview-before.png)
![Overview after](/tmp/atlas-shots/hierarchy/overview-after.png)
![electrostatics before](/tmp/atlas-shots/hierarchy/electrostatics-before.png)
![electrostatics after](/tmp/atlas-shots/hierarchy/electrostatics-after.png)
![device.py before](/tmp/atlas-shots/hierarchy/device-before.png)
![device.py after](/tmp/atlas-shots/hierarchy/device-after.png)
![Pipeline before](/tmp/atlas-shots/hierarchy/pipeline-before.png)
![Pipeline after](/tmp/atlas-shots/hierarchy/pipeline-after.png)
![Hover before](/tmp/atlas-shots/hierarchy/hover-before.png)
![Hover after](/tmp/atlas-shots/hierarchy/hover-after.png)

## Carry into the main prototype

1. The tier tokens (`strong`, `link`, `edge`, `rule`), `STYLE` and `viewCtx()`:
   `applyEmphasis` paints plates, panes, plain cards, blocks, calls, ribbons,
   imports and ports from the view's row; signal cards keep their hue.
2. The type scale (`TYPE` 12 / 10 / 9), the 9 px floor and the fit rule in
   `onFace`; the per-view label budget in `drawLabels`; the staggered
   single-size header for module names.
3. The overview budget: package names only, module names on hover and
   selection with their partners, no pane texture, no floors or datum.
4. Selection steps the plates and package names back to tier 3.
5. Ground in the canvas colour, no grid dots, no vignette (`style.css` and
   `shoot.js`).
6. The per-view key and its `dim` text; sidebar rows and CSS hues aligned with
   the canvas tokens.
7. Optionally `audit()` and `views.js` as a check: the tier count and the
   labels-below-9-px count per view make good regression numbers.

## Limitations

- **Far zoom drops a name.** `MESHING` is wider than its plate and its overhang
  would cover `MESH`; it is dropped (6 of 8 names).
- **Plan names 21 modules at 9 px.** They are tier 2 there (Plan is about module
  imports) but crowd the `mesh` row; a hover-only rule like the overview's is
  the alternative.
- **Module-scope cards truncate.** At the fitted camera, `device.py` cards are
  77 × 16 px and class rows 9.9 px apart, so most names draw at 9 px and
  several truncate (`_normalize…`). The camera fit is placement and stayed as is.
- **Tier 3 at the overview is still busy.** The 193 card borders at `edge`
  read as texture on the panes. `rule` (1.4:1) would quiet them further but
  makes the cards hard to find; not tried in screenshots beyond this choice.
- **Panels.** The side panel, inspector and key keep their own sizes (10–13 px);
  only the canvas labels follow the three-size scale.
- **Ink share is a proxy.** It counts pixels by luminance band, not attention;
  antialiased edges of bright text fall into the middle bands.

## How to run

```text
pixi run python -B -m http.server 8780 --directory prototypes/strata-hierarchy --bind 127.0.0.1
# http://127.0.0.1:8780/?size=1280x800
# in the page: const v = await import('./views.js'); v.V.electrostatics(); atlasProto.audit(); v.ink();
# v.run([...views], 'after') shoots each view and posts the audit to the receiver
pixi run python -B /tmp/atlas-shots/receiver-hierarchy.py   # port 8781, writes /tmp/atlas-shots/hierarchy/
```
