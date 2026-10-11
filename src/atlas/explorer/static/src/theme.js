// Atlas Strata themes (docs/plans/strata-theme.md). Two token sets built from GitHub
// Primer's high-contrast themes, @primer/primitives 11.10.0:
//   neutrals  src/tokens/base/color/dark/dark.json5, src/tokens/base/color/light/light.json5
//   hues      src/tokens/base/color/dark/dark.high-contrast.json5,
//             src/tokens/base/color/light/light.high-contrast.json5
//   roles     dist/css/functional/themes/dark-high-contrast.css, light-high-contrast.css
// Every value below is a Primer step (the comment names it). The token object drives the
// three.js materials and the label canvas; style.css holds the same values as CSS custom
// properties for the chrome, and themeCheck() in app.js compares the shared ones.
//
// Signals: four hues, one meaning each, validated all-pairs (validate_palette.py):
//   load-bearing blue, clone purple, dead yellow, import cycle red.
// Everything else is neutral; attention (hover, selection, trace) is maximum contrast
// against the canvas: white on dark, near-black on light.
const hex = (s) => parseInt(s.slice(1), 16);

const DARK = {
  name: 'dark',
  css: {
    // role                         Primer dark high contrast
    canvas: '#010409',           // bgColor-default (base black)
    fill: '#0d1117',             // neutral-1
    raised: '#151b23',           // bgColor-muted, neutral-2
    raised2: '#212830',          // bgColor-neutral-muted, neutral-3
    rule: '#262c36',             // bgColor-disabled, neutral-4
    edge: '#3d444d',             // bgColor-emphasis, neutral-7
    border: '#656c76',           // fgColor-disabled, neutral-8
    link: '#9198a1',             // borderColor-translucent, neutral-9
    strong: '#b7bdc8',           // borderColor-default, neutral-10
    dim: '#9198a1',              // neutral-9 (text, 7.0:1)
    muted: '#b7bdc8',            // fgColor-muted, neutral-10
    textSoft: '#d1d7e0',         // fgColor-neutral, neutral-11
    text: '#f0f6fc',             // neutral-12
    emphasis: '#ffffff',         // fgColor-default
    lb: '#1e60d5',               // blue-8
    clone: '#a66bff',            // purple-6
    dead: '#c88508',             // yellow-6
    cycle: '#cc1421',            // red-8
    // fills under the signal: the hue over the box face (Primer's *-muted pattern)
    cloneFill: '#a66bff', cloneFillA: 0.3,
    deadFill: '#c88508', deadFillA: 0.3,
    panel: 'rgba(1, 4, 9, 0.9)', // overlay-bgColor #010409
  },
};
const LIGHT = {
  name: 'light',
  css: {
    // role                         Primer light high contrast
    canvas: '#ffffff',           // bgColor-default (neutral-0)
    fill: '#f6f8fa',             // neutral-1
    raised: '#eff2f5',           // bgColor-inset, neutral-2
    raised2: '#e6eaef',          // bgColor-muted, neutral-3
    rule: '#d1d9e0',             // neutral-6
    edge: '#c8d1da',             // neutral-7
    border: '#818b98',           // neutral-8
    link: '#59636e',             // borderColor-translucent, fgColor-disabled, neutral-9
    strong: '#454c54',           // borderColor-default, neutral-10
    dim: '#59636e',              // neutral-9 (text, 6.2:1)
    muted: '#454c54',            // fgColor-muted, neutral-10
    textSoft: '#393f46',         // fgColor-neutral, neutral-11
    text: '#25292e',             // neutral-12
    emphasis: '#010409',         // fgColor-default
    lb: '#0349b4',               // blue-5 (borderColor-accent-emphasis)
    clone: '#844ae7',            // purple-4
    dead: '#956400',             // yellow-4
    cycle: '#a0111f',            // red-5 (borderColor-danger-emphasis)
    cloneFill: '#e0c5ff', cloneFillA: 1, // purple-1
    deadFill: '#f0ce53', deadFillA: 1,   // yellow-1
    panel: 'rgba(255, 255, 255, 0.92)',  // overlay-bgColor #ffffff
  },
};

// The three.js and label-canvas tokens of a theme, derived from its roles. Each 3D
// material names the role it takes; nothing outside this function picks a colour.
function derive(t) {
  const c = t.css, dark = t.name === 'dark';
  const C = {
    bg: hex(c.canvas), ground: hex(c.canvas),
    plate: hex(c.fill), plateLine: hex(c.rule),
    card: dark ? hex(c.fill) : hex(c.canvas), cardLine: hex(c.border),
    ghost: hex(c.border),
    lb: hex(c.lb), clone: hex(c.clone), dead: hex(c.dead), red: hex(c.cycle),
    cloneFill: hex(c.cloneFill), deadFill: hex(c.deadFill), cloneFillA: c.cloneFillA, deadFillA: c.deadFillA,
    lit: hex(c.emphasis), hover: hex(c.emphasis),
    same: hex(c.border), cross: hex(c.link), pkg: hex(c.link), klass: hex(c.border), intra: hex(c.border),
    imp: hex(c.edge), impLit: hex(c.emphasis), ribPkg: hex(c.link),
    // faces: dark boxes are lit from the front (front lighter than the sides), light boxes
    // are paper (front lightest, sides one step darker)
    boxFront: dark ? hex(c.raised) : hex(c.canvas),
    boxSide: dark ? hex(c.fill) : hex(c.raised2),
    boxTop: dark ? hex(c.raised2) : hex(c.fill),
    boxHead: dark ? hex(c.raised2) : hex(c.raised),
    boxLine: hex(c.border),
    modFront: dark ? hex(c.raised) : hex(c.fill),
    modHead: dark ? hex(c.raised2) : hex(c.raised),
    modLine: hex(c.border), rowLine: hex(c.rule),
    classRow: dark ? hex(c.raised2) : hex(c.raised),
    write: hex(c.strong), read: hex(c.border), port: hex(c.strong),
    column: dark ? hex(c.raised) : hex(c.raised2),
    paneLine: dark ? hex('#2f3742') /* neutral-6 */ : hex(c.edge),
    fieldSep: hex(c.edge),
  };
  const TIER = { strong: hex(c.strong), link: hex(c.link), edge: hex(c.edge), rule: hex(c.rule) };
  const T = { text: c.text, muted: c.muted, dim: c.dim, soft: c.textSoft, lit: c.emphasis, ghost: c.text };
  // box header fill per tier: tier 1 stands furthest from the face
  const HEAD = dark ? { 1: hex('#262c36') /* neutral-4 */, 2: hex(c.raised2), 3: hex(c.raised) }
    : { 1: hex('#dae0e7') /* neutral-5 */, 2: hex('#e0e6eb') /* neutral-4 */, 3: hex(c.raised2) };
  const rgb = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
  const rgba = (s, a) => `rgba(${rgb(s).join(',')},${a})`;
  const K = {
    // label canvas: halos and pills in the canvas colour, pill rims in the emphasis colour
    halo: rgba(c.canvas, 0.92), backdrop: rgba(c.canvas, 0.88), pill: rgba(c.canvas, 0.94),
    pillLine: rgba(c.emphasis, 0.35), pillLineStrong: rgba(c.emphasis, 0.6),
    tooltip: dark ? rgba(c.raised, 0.96) : rgba(c.canvas, 0.97), tooltipLine: c.edge,
    hatch: dark ? rgba(c.link, 0.55) : rgba(c.link, 0.5),
    hatchKey: dark ? rgba(c.link, 0.75) : rgba(c.link, 0.7),
    // pulses: additive light on the dark canvas, plain dark ink on the light one
    pulseAdditive: dark,
  };
  return { name: t.name, css: c, C, TIER, T, HEAD, K };
}

export const THEMES = { dark: derive(DARK), light: derive(LIGHT) };
export const THEME_KEY = 'atlas.theme';
// ?theme= wins (screenshots), then the reader's last choice, then the system setting
export function initialTheme() {
  const q = new URLSearchParams(location.search).get('theme');
  if (q === 'dark' || q === 'light') return q;
  try { const s = localStorage.getItem(THEME_KEY); if (s === 'dark' || s === 'light') return s; } catch (e) { /* storage off */ }
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
