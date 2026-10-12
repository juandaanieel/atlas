import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { makeRouting, slotsOf, samplePath } from './routing.js';
import { THEMES, THEME_KEY, initialTheme } from './theme.js';
import { codeHtml, escapeHtml as esc } from './source.js';
import { fitCamera } from './camera.js';
import { documentationHtml } from './documentation.js';

function start() {
let rafPending = false;
// ---------------------------------------------------------------- palette
// Two themes from GitHub Primer's high-contrast palette.
// C (materials), TIER (neutral line tiers), T (text) and K (label canvas) hold the active
// theme's tokens; setTheme() swaps them and repaints every material in place.
// Four reserved hues, one meaning each: load-bearing blue, clone purple, dead yellow, import
// cycle red. Attention (hover, selection, trace) is maximum contrast against the canvas.
let THEME = initialTheme();
const C = {}, TIER = {}, T = {}, K = {};
// Visual hierarchy. Each view reads in three tiers:
// tier 1 the unit the view is about and the defect marks, tier 2 the connections that
// answer the view's question, tier 3 context. Neutral line tokens: strong (tier 1), link
// (tier 2), edge and rule (tier 3); text, muted, dim for labels; emphasis above every tier.
// One family, three sizes: L names the unit of the view, M names what is inside it,
// S captions and pointers. Nothing is drawn below S (9 px at 1280 x 800).
const TYPE = { L: 12, M: 10, S: 9 };
// How a module box looks at each tier: outline [colour, width], header fill, row rules,
// internal-band strength, glass column strength, foot line. BOX_TIER and STYLE are rebuilt from
// the tokens whenever the theme changes.
let BOX_TIER, STYLE;
// Lines and names per view, on the surface track's marks:
//   overview  plates and package names tier 1, package ribbons tier 2, boxes tier 3 (silhouettes)
//   plan      plates and package names tier 1, imports tier 2, boxes tier 3
//   package   boxes, their public rows and module names tier 1, module-pair tracks tier 2
//   module    the unfolded cards tier 1, calls tier 2, neighbour boxes tier 3
function loadTokens(name) {
  const t = THEMES[name];
  THEME = name;
  Object.assign(C, t.C); Object.assign(TIER, t.TIER); Object.assign(T, t.T); Object.assign(K, t.K);
  BOX_TIER = {
    1: { edge: [TIER.strong, 1.4], head: t.HEAD[1], rule: TIER.edge, internals: 0.75, column: 0.4, foot: TIER.edge },
    2: { edge: [TIER.link, 1.2], head: t.HEAD[2], rule: TIER.rule, internals: 0.55, column: 0.3, foot: TIER.rule },
    3: { edge: [TIER.edge, 1], head: t.HEAD[3], rule: TIER.rule, internals: 0.35, column: 0.18, foot: TIER.rule },
  };
  STYLE = {
    overview: { plate: [TIER.link, 1.2], pkg: T.text, box: 3, link: TIER.link, call: TIER.link, ribbon: TIER.link, imp: TIER.edge, card: [TIER.link, 1], block: [TIER.link, 1.2] },
    plan: { plate: [TIER.link, 1.2], pkg: T.text, box: 3, link: TIER.edge, call: TIER.edge, ribbon: TIER.rule, imp: TIER.link, card: [TIER.edge, 1], block: [TIER.edge, 1] },
    package: { plate: [TIER.edge, 1], pkg: T.muted, box: 1, link: TIER.link, call: TIER.link, ribbon: TIER.edge, imp: TIER.edge, card: [TIER.link, 1], block: [TIER.link, 1.2] },
    module: { plate: [TIER.rule, 1], pkg: T.dim, box: 3, link: TIER.edge, call: TIER.link, ribbon: TIER.edge, imp: TIER.edge, card: [TIER.strong, 1], block: [TIER.strong, 1.2] },
  };
}
loadTokens(THEME);
// The bold name is the entry surface, which the owner defines as the exported API: snapshot
// `exported` (in __all__ or re-exported by a package __init__).
const BOLD = (r) => r.exported;
// colour helpers: a hex token blended toward another (fills seen through their alpha)
const mixHex = (a, b, t) => new THREE.Color(a).lerp(new THREE.Color(b), t).getHex();
const cssHex = (n) => '#' + n.toString(16).padStart(6, '0');
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FONT = '"JetBrains Mono","SF Mono","SFMono-Regular",Menlo,Consolas,monospace';
// Reserve only the toolbar and rail; navigation and source share one right-hand panel.
const PAD_L = 0, PAD_T = 40, PAD_R = 0, PAD_B = 36;
const INSP_KEY = 'atlas.panel.width', INSP_MIN = 320, INSP_MAX = 960, INSP_DEFAULT = 480;
let inspW = (() => { const v = +localStorage.getItem(INSP_KEY); return v ? Math.max(INSP_MIN, Math.min(INSP_MAX, v)) : INSP_DEFAULT; })();
const frameEl = document.querySelector('#frame');
const viewW = () => frameEl.clientWidth, viewH = () => frameEl.clientHeight;
const DPR = Math.min(devicePixelRatio, 2);

const $ = (s) => document.querySelector(s);
// the picture width the inspector covers (its width plus the right margin and a gap)
const inspPx = () => ($('#panel').classList.contains('hidden') || W < 720 ? 0 : $('#panel').getBoundingClientRect().width + 24);
const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const lerp = (a, b, t) => a + (b - a) * t;
const easeOut = (t) => 1 - Math.pow(1 - t, 4.5);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const col = (hex) => new THREE.Color(hex);

// ---------------------------------------------------------------- data
// Embedded source excerpts and AST call positions for the inspector.
const { view, source: SOURCE, optimization_prompt: optimizationPrompt } = JSON.parse($('#atlasView').textContent);
$('#pkg').textContent = view.package;
if (!view.panes.length) {
  $('#status').textContent = 'No non-test functions or classes to display.';
  for (const id of ['panel', 'cameraTools', 'rail', 'modes', 'views']) $('#' + id).classList.add('hidden');
  return;
}
const SRC = SOURCE.symbols;
const D = view.dims;
const N = new Map();
view.nodes.forEach((n, i) => { n.i = i; N.set(n.id, n); });
const CL = new Map(view.classes.map((c) => [c.id, c]));
const PANE = new Map(view.panes.map((p) => [p.module, p]));
const PLATE = new Map(view.plates.map((p) => [p.unit, p]));
const DIST = new Map(view.districts.map((d) => [d.package, d]));
const F = view.floors;
$('#pkg').textContent = view.package;
const R = makeRouting(view);
const linkOfEdge = new Map();
view.links.forEach((l, li) => l.members.forEach((ei) => linkOfEdge.set(ei, li)));
const SLOT = new Map();
for (const p of view.panes) for (const s of slotsOf(p.box)) SLOT.set(`${p.module}|${s.slot}`, s);
// the reading path: the guide block (chapters, pipelines, signals), one resolved state per step
const GUIDE = view.guide;
const STEPS = GUIDE.steps;
const STEP_INDEX = new Map(STEPS.map((st, i) => [st.id, i]));

// guide: index of the step on screen, or null while the reader explores; resume: the
// step "Resume guide" returns to; pulse: the selection is an explicit pipeline (pulses run)
// inspect: what the inspector shows (outside the guide the selection; on the path a lit mark
// the reader clicked, the step's lighting unchanged); inspectBack: the inspector's back stack;
// hoverCall: the call lines the reader hovers in the source ({ edges, targets, line });
// proj: a scoped Elevation's camera (ortho by default; o toggles)
const state = { scope: null, selected: null, hover: null, hoverBox: null, hoverLine: null, open: new Set(), expanded: new Set(), view: 'axo', mouse: [0, 0], guide: null, resume: 0, pulse: false, proj: 'ortho', inspect: null, inspectBack: [], hoverCall: null };
let panelMode = 'guide', browsePackage = null, browseModule = null, browseScroll = 0;
let panelExpanded = false, orbit = true, ready = false;
const guideStep = () => (state.guide === null ? null : STEPS[state.guide]);
// the view the reader is in: decides every element's tier
function viewCtx() {
  const G = guideStep();
  if (G && G.lod === 'plate') return 'overview';
  if (state.scope) return state.scope.kind === 'module' ? 'module' : 'package';
  if (G) return 'package';
  return state.view === 'plan' ? 'plan' : 'overview';
}

// ---------------------------------------------------------------- renderer
const glCanvas = $('#gl');
const renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(DPR);
renderer.setClearColor(0x000000, 0);
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(C.bg, 60, 200);
// Two cameras: perspective for the Axonometric and Plan, orthographic for a scoped
// Elevation (the default; o toggles back to perspective). The orthographic camera stands
// ORTHO_D from its target: depth only orders and fogs, the scale is its zoom (px per unit).
const persp = new THREE.PerspectiveCamera(24, 1, 0.5, 3000);
const ortho = new THREE.OrthographicCamera(-640, 640, 400, -400, 0.5, 3000);
const ORTHO_D = 120;
let camera = persp;
const controls = new OrbitControls(camera, glCanvas);
controls.enableDamping = false;
controls.enableRotate = true;
controls.zoomSpeed = 0.65;
controls.screenSpacePanning = true;
controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
controls.minPolarAngle = 0.06;
controls.maxPolarAngle = Math.PI / 2 - 0.02;

// The section cut: in a scoped view every row in front of the scope's front
// row is cut away by one clipping plane, whatever the camera does.
const cutPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
const backPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
let cutBack = null; // Elevation also cuts the rows behind the scope (they would only show through its gaps)
const labelCanvas = $('#labels');
const lx = labelCanvas.getContext('2d');
let W = viewW(), H = viewH(), dirty = true; schedule();
const lineMats = [];

// ---------------------------------------------------------------- builders
function mkLine(pts, o = {}) {
  const geo = new LineGeometry();
  geo.setPositions(pts);
  geo.setColors(new Float32Array(pts.length).fill(1));
  const mat = new LineMaterial({
    color: 0xffffff, linewidth: o.width ?? 1, vertexColors: true, transparent: true,
    opacity: o.opacity ?? 1, dashed: !!o.dashed, dashSize: Math.max(2, (o.dash ?? 0.12) * 40), gapSize: Math.max(2, (o.gap ?? 0.1) * 40),
    depthWrite: false, fog: true,
  });
  mat.resolution.set(W, H);
  lineMats.push(mat);
  const line = new Line2(geo, mat);
  if (o.dashed) line.computeLineDistances();
  line.renderOrder = o.order ?? 3;
  return line;
}
function setLinePts(line, pts) {
  line.userData.paintKey = null;
  line.geometry.setPositions(pts);
  if (line.material.dashed) line.computeLineDistances();
}
function paintLine(line, a, b, n) {
  const key = `${a}|${b ?? a}|${n}`;
  if (line.userData.paintKey === key) return;
  line.userData.paintKey = key;
  const ca = col(a), cb = col(b ?? a), arr = new Float32Array(n * 3), c = new THREE.Color();
  for (let i = 0; i < n; i++) {
    c.copy(ca).lerp(cb, n > 1 ? i / (n - 1) : 0);
    arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b;
  }
  line.geometry.setColors(arr);
}
function mkSegments(pairs, o = {}) {
  const geo = new LineSegmentsGeometry();
  geo.setPositions(pairs);
  const mat = new LineMaterial({ color: o.color ?? 0xffffff, linewidth: o.width ?? 1, transparent: true, opacity: o.opacity ?? 1, dashed: !!o.dashed, dashSize: Math.max(2, (o.dash ?? 0.1) * 40), gapSize: Math.max(2, (o.gap ?? 0.08) * 40), depthWrite: false, fog: true });
  mat.resolution.set(W, H);
  lineMats.push(mat);
  const seg = new LineSegments2(geo, mat);
  if (o.dashed) seg.computeLineDistances();
  seg.renderOrder = o.order ?? 3;
  return seg;
}
function rectLoop(x, y, w, h, z) {
  return [x, y, z, x + w, y, z, x + w, y - h, z, x, y - h, z, x, y, z];
}
function bez(p0, c1, c2, p3, n = 24) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
    out.push(a * p0.x + b * c1.x + c * c2.x + d * p3.x, a * p0.y + b * c1.y + c * c2.y + d * p3.y, a * p0.z + b * c1.z + c * c2.z + d * p3.z);
  }
  return out;
}
function basic(color, opacity = 1, extra = {}) {
  return new THREE.MeshBasicMaterial({ color, transparent: true, opacity, ...extra });
}
// Every material and build-time line whose colour is a token is registered with that token,
// so a theme change re-colours it in place (setTheme). Lines repainted by applyEmphasis
// take their colours from the tokens at paint time and need no entry.
const TOKMATS = [], TOKLINES = [];
function tmat(key, opacity = 1, extra = {}) { const m = basic(C[key], opacity, extra); TOKMATS.push([m, key]); return m; }
function tpaint(line, key, n) { paintLine(line, C[key], null, n); TOKLINES.push([line, key, n]); return line; }
const planeGeo = new THREE.PlaneGeometry(1, 1);
// Decals test against solid geometry, but never occlude each other. A depth bias
// keeps them off the carrier face at distant zooms; renderOrder composes their layers.
function vplane(x, y, w, h, z, mat, order = 2.1) {
  mat.depthWrite = false;
  mat.polygonOffset = true;
  mat.polygonOffsetFactor = -1;
  mat.polygonOffsetUnits = -4;
  const m = new THREE.Mesh(planeGeo, mat);
  m.scale.set(w, h, 1);
  m.position.set(x + w / 2, y - h / 2, z);
  m.renderOrder = order;
  return m;
}
// ---------------------------------------------------------------- world bounds
const minX = Math.min(...view.plates.map((d) => d.x)) - 4;
const maxX = Math.max(...view.plates.map((d) => d.x + d.w)) + 4;
const minZ = Math.min(...view.plates.map((d) => d.z)) - 5;
const maxZ = Math.max(...view.plates.map((d) => d.z)) + 6;

// ---------------------------------------------------------------- ground and plates
// The ground is the canvas colour: it veils what drops below it (an unfolded pane in
// the Axonometric) and shows nothing else. No grid: the dots carried no meaning.
const ground = new THREE.Mesh(new THREE.PlaneGeometry(maxX - minX, maxZ - minZ), tmat('ground', 0.82, { depthWrite: false }));
ground.rotation.x = -Math.PI / 2;
ground.position.set((minX + maxX) / 2, F.ground - 0.01, (minZ + maxZ) / 2);
ground.renderOrder = 0;
scene.add(ground);
const plateObjs = new Map();
for (const d of view.plates) {
  const z0 = d.z - D.plate_back, z1 = d.z + D.plate_front;
  const plate = new THREE.Mesh(planeGeo, tmat('plate', 0.92, { depthWrite: false }));
  plate.scale.set(d.w, z1 - z0, 1);
  plate.rotation.x = -Math.PI / 2;
  plate.position.set(d.x + d.w / 2, F.ground + 0.004, (z0 + z1) / 2);
  plate.renderOrder = 0;
  const y = F.ground + 0.008;
  const outline = mkLine([d.x, y, z0, d.x + d.w, y, z0, d.x + d.w, y, z1, d.x, y, z1, d.x, y, z0], { width: 1, order: 1 });
  paintLine(outline, C.plateLine, null, 5);
  // One continuous package enclosure around its module boxes.
  const height = Math.max(...d.modules.map((m) => PANE.get(m).box.h)) + 0.6;
  const frame = mkSegments(Array.from(new THREE.EdgesGeometry(new THREE.BoxGeometry(d.w, height, z1 - z0)).attributes.position.array), { color: C.plateLine, width: 1, order: 1 });
  frame.position.set(d.x + d.w / 2, 0.3 - height / 2, (z0 + z1) / 2);
  // An open-front enclosure: opaque back, sides and floor hide packages behind it.
  const walls = new THREE.Group();
  const cy = 0.3 - height / 2, cz = (z0 + z1) / 2;
  for (const [w, h, x, y, z, ry, rx, key] of [
    [d.w, height, d.x + d.w / 2, cy, z0, 0, 0, 'plate'],
    [z1 - z0, height, d.x, cy, cz, Math.PI / 2, 0, 'boxSide'],
    [z1 - z0, height, d.x + d.w, cy, cz, Math.PI / 2, 0, 'boxSide'],
    [d.w, z1 - z0, d.x + d.w / 2, 0.3 - height, cz, 0, -Math.PI / 2, 'plate'],
  ]) {
    const wall = new THREE.Mesh(planeGeo, tmat(key, 1, { transparent: false, side: THREE.DoubleSide }));
    wall.scale.set(w, h, 1);
    wall.position.set(x, y, z);
    wall.rotation.set(rx, ry, 0);
    walls.add(wall);
  }
  scene.add(plate, outline, frame, walls);
  plateObjs.set(d.unit, { d, plate, outline, frame, walls, a: 1, ta: 1 });
}

// ---------------------------------------------------------------- module boxes
// A box hangs from the entry surface (y = 0). Header, then one row per public name
// (Python's rows), a "more" band of hairlines (one per hidden public name), the
// muted bottom band (internals), ghost rows (dead). Signals ride on the row, band or tail
// that holds them. Unfolding grows the body down to Python's open height; the rows
// give way to the cards on the module's own depth floors.
const unitBox = new THREE.BoxGeometry(1, 1, 1);
const unitEdges = Array.from(new THREE.EdgesGeometry(unitBox).attributes.position.array);
const modObjs = new Map();
let U_MS = 220;
for (const p of view.panes) {
  const b = p.box, g = new THREE.Group();
  g.position.set(b.x, 0, p.z);
  // the faces sit a few depth steps back (polygon offset): at the overview the camera is ~200
  // units away and one depth step is ~0.005 units, the depth of the row decals above the face
  const face = (key) => tmat(key, 1, { transparent: false, polygonOffset: true, polygonOffsetFactor: 2, polygonOffsetUnits: 4 });
  const mats = [face('boxSide'), face('boxSide'), face('boxTop'), face('boxSide'), face('modFront'), face('boxSide')];
  const body = new THREE.Mesh(unitBox, mats);
  body.userData = { type: 'module', id: p.module };
  body.renderOrder = 2;
  const edges = mkSegments(unitEdges, { color: C.modLine, width: 1.2, order: 2 });
  const bodyG = new THREE.Group();
  bodyG.add(body, edges);
  g.add(bodyG);
  const zf = b.d + 0.004, w = b.w;
  const head = vplane(0, 0, w, D.mod_header, zf, basic(C.modHead), 2.1); // styleBox colours it by tier
  g.add(head);
  const rowsG = [], sig = [], openG = [], lit = new Map();
  // role: what the tier styling repaints (rule, classEdge, more, ghost) or fades (internals)
  const LAYER = { cloneFill: 2.2, deadFill: 2.2, internals: 2.3, ghost: 2.4, tick: 2.5 };
  const put = (arr, obj, k = 1, role = null) => {
    obj.userData.k = k; obj.userData.role = role;
    if (obj.isLine2 || obj.isLineSegments2) obj.renderOrder = 2.4;
    else if (LAYER[role]) obj.renderOrder = LAYER[role];
    arr.push(obj); g.add(obj);
    return obj;
  };
  // Signals ride on the row, band or tail that holds them: load-bearing a blue bar on the
  // left; a clone a purple fill (rows only: a tail stands for many functions) and a heavy
  // purple underline. Dead rows are built below. A box holding a dead function or a clone
  // also carries a solid tick per signal at the right of its header: the mark that reads at
  // the overview, where rows are a few pixels tall.
  const sigMarks = (s, y0, h, inset = 0.1, fill = false) => {
    if (s.clone && fill) put(sig, vplane(0.03, y0 - 0.015, w - 0.06, h - 0.03, zf + 0.0012, tmat('cloneFill', 1, { depthWrite: false }), 2.1), C.cloneFillA, 'cloneFill');
    if (s.lb) put(sig, vplane(0.04, y0 - 0.05, 0.12, Math.max(0.08, h - 0.1), zf + 0.002, tmat('lb'), 2.5));
    if (s.clone) put(sig, tpaint(mkLine([inset + 0.06, y0 - h + 0.05, zf + 0.003, w - 0.1, y0 - h + 0.05, zf + 0.003], { width: 1.5, order: 2 }), 'clone', 2));
  };
  for (const r of b.rows) {
    const y0 = -r.y;
    const sep = mkLine([0.06, y0, zf + 0.001, w - 0.06, y0, zf + 0.001], { width: 1, order: 2 });
    paintLine(sep, C.rowLine, null, 2);
    put(rowsG, sep, 1, 'rule');
    if (r.kind === 'class') {
      // a class row is a class block in miniature: an inset face with its own edge
      put(rowsG, vplane(0.12, y0 - 0.05, w - 0.22, r.h - 0.1, zf + 0.001, tmat('classRow'), 2.1));
      const edge = mkLine(rectLoop(0.12, y0 - 0.05, w - 0.22, r.h - 0.1, zf + 0.0015), { width: 1, order: 2 });
      paintLine(edge, C.boxLine, null, 5);
      put(rowsG, edge, 1, 'classEdge');
    }
    sigMarks(r, y0, r.h, 0.1, true);
  }
  if (b.more) {
    // the book edge: one hairline per public name that did not get a row
    const n = Math.min(b.more.lines, 5), pairs = [];
    for (let k = 0; k < n; k++) { const y = -b.more.y - (k + 0.5) * (b.more.h / n); pairs.push(0.1, y, zf + 0.002, w - 0.1, y, zf + 0.002); }
    put(sig, mkSegments(pairs, { color: C.modLine, width: 1, order: 2 }), 0.9, 'more');
    sigMarks(b.more, -b.more.y, b.more.h);
  }
  if (b.tail) {
    const t = b.tail;
    put(sig, vplane(0.03, -t.y - 0.03, w - 0.06, t.h - 0.06, zf + 0.001, tmat('boxHead'), 2.1), 1, 'internals');
    sigMarks(t, -t.y, t.h);
  }
  for (const gr of b.ghosts) {
    // the dead never fold: a dead row under the tail, filled with an amber fill and solid border
    const gx = 0.06, gy = -gr.y - 0.03, gw = w - 0.12, gh = gr.h - 0.06;
    put(sig, vplane(gx, gy, gw, gh, zf + 0.0012, tmat('deadFill', 1, { depthWrite: false }), 2.1), C.deadFillA, 'deadFill');
    put(sig, tpaint(mkLine(rectLoop(gx, gy, gw, gh, zf + 0.002), { width: 1.2, order: 2 }), 'dead', 5), 1, 'ghost');
    if (gr.id === null) {
      const n = Math.min(gr.lines, 4), pairs = [];
      for (let k = 0; k < n; k++) { const y = -gr.y - 0.04 - (k + 0.5) * ((gr.h - 0.08) / n); pairs.push(0.14, y, zf + 0.002, w - 0.14, y, zf + 0.002); }
      put(sig, mkSegments(pairs, { color: C.dead, width: 1, order: 2 }), 1, 'deadLines');
    }
  }
  // the header ticks: dead rightmost, clone next to it
  const ticks = [];
  if (b.ghosts.length) ticks.push('dead');
  if (b.rows.some((r) => r.clone) || b.tail?.clone || b.more?.clone) ticks.push('clone');
  ticks.forEach((key, i) => { const s = 0.3; put(sig, vplane(w - 0.1 - s - i * (s + 0.08), -0.16, s, s, zf + 0.003, tmat(key), 2.1), 1, 'tick'); });
  // the box face, with its slots, lit by a selection or a hover
  for (const s of slotsOf(b)) {
    const ln = tpaint(mkLine(rectLoop(0.03, -s.y - 0.015, w - 0.06, s.h - 0.03, zf + 0.004), { width: 1.4, order: 2.5 }), 'lit', 5);
    ln.visible = false;
    g.add(ln);
    lit.set(s.slot, ln);
  }
  if (b.dead_top !== null) {
    const div = mkLine([0.1, b.dead_top, zf + 0.002, w - 0.1, b.dead_top, zf + 0.002], { width: 1, dashed: true, dash: 0.08, gap: 0.08, order: 2 });
    tpaint(div, 'ghost', 2);
    put(openG, div);
  }
  scene.add(g);
  // the module's column: faint glass from the box down to its plate, the room it unfolds into
  const column = vplane(b.x, -b.h, b.w, b.h + F.ground, p.z + b.d * 0.5, tmat('column', 0.45, { side: THREE.DoubleSide, depthWrite: false }), 1);
  const foot = mkLine(rectLoop(b.x, F.ground + 0.012, b.w, 0, p.z).slice(0, 6).concat([b.x + b.w, F.ground + 0.012, p.z + b.d, b.x, F.ground + 0.012, p.z + b.d, b.x, F.ground + 0.012, p.z]), { width: 1, order: 1 });
  paintLine(foot, C.paneLine, null, 5);
  scene.add(column, foot);
  const o = { p, b, g, bodyG, body, mats, edges, head, rowsG, sig, openG, lit, column, foot, a: 1, ta: 1, rowsA: 0, rowsTa: 0, zoomRows: false, u: 0, uTarget: 0, h: b.h, tier: null, ts: BOX_TIER[3] };
  setBodyH(o, b.h);
  modObjs.set(p.module, o);
  styleBox(o, 3);
}
// A box takes its tier's outline, header, rules, internal band and glass; signal hues never change.
function styleBox(o, tier) {
  if (o.tier === tier) return;
  o.tier = tier;
  const S = (o.ts = BOX_TIER[tier]);
  o.edges.material.color.set(S.edge[0]);
  o.edges.material.linewidth = S.edge[1];
  o.head.material.color.set(S.head);
  o.foot.userData.paintKey = null;
  paintLine(o.foot, S.foot, null, 5);
  for (const x of [...o.rowsG, ...o.sig]) {
    const role = x.userData.role;
    if (role === 'rule') paintLine(x, S.rule, null, 2);
    else if (role === 'classEdge') paintLine(x, S.rule, null, 5);
    else if (role === 'more') x.material.color.set(tier === 1 ? TIER.link : TIER.edge);
  }
}
function setBodyH(o, h) {
  o.h = h;
  o.bodyG.scale.set(o.b.w, h, o.b.d);
  o.bodyG.position.set(o.b.w / 2, -h / 2, o.b.d / 2);
  if (o.column) {
    const top = -h, bot = F.ground;
    o.column.visible = top > bot + 0.01;
    o.column.scale.y = Math.max(0.001, top - bot);
    o.column.position.y = (top + bot) / 2;
  }
}
const U = (m) => ease(modObjs.get(m).u);
function modAlpha(o) {
  const a = o.a, u = ease(o.u);
  // a silhouette (a box outside the scope): no fill, no depth, so it can hide nothing
  const f = o.sil ? 0 : 1;
  o.mats.forEach((m, i) => {
    const key = ['boxSide', 'boxSide', 'boxTop', 'boxSide', 'modFront', 'boxSide'][i];
    m.color.set(mixHex(C.bg, C[key], a));
  });
  o.body.visible = !o.sil;
  o.edges.material.opacity = a;
  o.head.material.opacity = a * f;
  for (const x of o.rowsG) { x.material.opacity = f * a * o.rowsA * (1 - u) * x.userData.k; x.visible = x.material.opacity > 0.003; }
  for (const x of o.sig) { x.material.opacity = f * a * (1 - u) * x.userData.k * (x.userData.role === 'internals' ? o.ts.internals : 1); x.visible = x.material.opacity > 0.003; }
  for (const x of o.openG) { x.material.opacity = f * a * u; x.visible = x.material.opacity > 0.003; }
  for (const ln of o.lit.values()) ln.material.opacity = f * Math.min(1, a * 1.4) * (1 - u);
  o.column.material.opacity = f * o.ts.column * a;
  o.foot.material.opacity = a;
}

// ---------------------------------------------------------------- function cards (unfolded panes)
const cardObjs = new Map();
// Signal outlines use solid strokes that remain legible when zoomed out.
function cardStyle(n) {
  if (n.dead) return { key: 'dead', width: 1.6 };
  if (n.clone !== null) return { key: 'clone', width: 2 };
  if (n.lb) return { key: 'lb', width: 1.6 };
  return { key: 'cardLine', width: 1 };
}
// A card is an opaque face (no line runs through a name); a dead or clone card adds the
// signal's fill over it and a solid tick in its top-right corner.
for (const n of view.nodes) {
  if (n.x === undefined) continue;
  const mesh = vplane(n.x, n.y, n.w, n.h, n.z + 0.012, tmat('card', 0), 2.1);
  // The card is the carrier surface; unlike its decals, it must occlude geometry.
  mesh.material.depthWrite = true;
  mesh.material.polygonOffsetFactor = 1;
  mesh.material.polygonOffsetUnits = 2;
  mesh.renderOrder = 2;
  mesh.userData = { type: 'node', id: n.id };
  const st = cardStyle(n);
  const border = mkLine(rectLoop(n.x, n.y, n.w, n.h, n.z + 0.014), { width: st.width, dashed: st.dashed, dash: st.dash, gap: st.gap, order: 2.4, opacity: 0 });
  paintLine(border, C[st.key], null, 5);
  mesh.visible = border.visible = false;
  scene.add(mesh, border);
  const sigKey = n.dead ? 'dead' : n.clone !== null ? 'clone' : null;
  const extra = [];
  if (sigKey) {
    extra.push([vplane(n.x, n.y, n.w, n.h, n.z + 0.0125, tmat(sigKey + 'Fill', 0), 2.2), sigKey + 'Fill']);
    extra.push([vplane(n.x + n.w - 0.17, n.y - 0.04, 0.13, 0.13, n.z + 0.017, tmat(sigKey, 0), 2.5), 'tick']);
  }
  if (n.lb && !n.dead) extra.push([vplane(n.x + 0.03, n.y - 0.05, 0.06, n.h - 0.1, n.z + 0.016, tmat('lb', 0), 2.5), 'bar']);
  for (const [m] of extra) { m.visible = false; scene.add(m); }
  cardObjs.set(n.id, { n, mesh, border, extra, st, a: 1, ta: 1 });
}
const extraAlpha = (role) => (role === 'deadFill' ? C.deadFillA : role === 'cloneFill' ? C.cloneFillA : 1);
// a card shows once its module is unfolded past it
function revealed(n) { const o = modObjs.get(n.module); return n.y - n.h >= -o.h - 1e-3; }
function cardAlpha(o) {
  const n = o.n, mo = modObjs.get(n.module), k = ease(mo.u) * (revealed(n) ? 1 : 0) * mo.a, a = o.a * k;
  o.mesh.material.opacity = a; o.border.material.opacity = a;
  o.mesh.visible = o.border.visible = a > 0.003;
  for (const [m, role] of o.extra) { m.material.opacity = a * extraAlpha(role); m.visible = a > 0.003; }
}

// ---------------------------------------------------------------- class blocks (unfolded panes)
const boxObjs = new Map();
function boxGeom(cl) {
  const o = boxObjs.get(cl.id);
  const open = o ? o.open : state.expanded.has(cl.id);
  const t = o ? ease(o.lift) : 0;
  const w = open ? cl.expanded.w : cl.w;
  const h = open ? cl.expanded.h : cl.h;
  const rows = cl.data_only ? [] : cl.public.concat(open ? cl.private : []);
  const zf = cl.z + cl.d + t * cl.expanded.lift;
  const tailY = !open && cl.private.length ? cl.y - h + D.box_tail / 2 + 0.03 : null;
  return { x0: cl.x, x1: cl.x + cl.w, xr: cl.x + w, w, h, rows, zf, tailY, open, cx: cl.x + w / 2 };
}
function rowY(cl, i) { return cl.y - D.box_head - D.box_row * (i + 0.5); }
function buildBox(cl) {
  const prev = boxObjs.get(cl.id);
  if (prev) scene.remove(prev.group);
  const open = state.expanded.has(cl.id);
  const g = new THREE.Group();
  const w = open ? cl.expanded.w : cl.w, h = open ? cl.expanded.h : cl.h, d = cl.d;
  const mats = [basic(C.boxSide), basic(C.boxSide), basic(C.boxTop), basic(C.boxSide), basic(C.boxFront), basic(C.boxSide)];
  const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats);
  box.position.set(w / 2, -h / 2, d / 2);
  box.renderOrder = 2;
  box.userData = { type: 'box', id: cl.id };
  g.add(box);
  const edges = mkSegments(Array.from(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)).attributes.position.array), { color: C.boxLine, width: 1.3, order: 2 });
  edges.position.set(w / 2, -h / 2, d / 2);
  g.add(edges);
  const zf = d + 0.004;
  const flat = [];
  const head = vplane(0, 0, w, D.box_head, zf, basic(C.boxHead), 2.1);
  g.add(head); flat.push(head);
  const mw = cl.w;
  const rows = cl.data_only ? [] : cl.public.concat(open ? cl.private : []);
  rows.forEach((m, i) => {
    const n = N.get(m), y = -D.box_head - D.box_row * i;
    if (n.clone !== null) {
      const f = vplane(0.03, y - 0.01, mw - 0.06, D.box_row - 0.02, zf + 0.0008, basic(C.cloneFill, C.cloneFillA), 2.2);
      f.userData.alpha = C.cloneFillA; g.add(f); flat.push(f);
      const u = mkLine([0.16, y - D.box_row + 0.035, zf + 0.002, mw - 0.12, y - D.box_row + 0.035, zf + 0.002], { width: 1.5, order: 2 });
      paintLine(u, C.clone, null, 2); g.add(u);
    }
    if (n.lb) { const bar = vplane(0.05, y - 0.05, 0.045, D.box_row - 0.1, zf + 0.001, basic(C.lb), 2.5); g.add(bar); flat.push(bar); }
  });
  if (open && cl.private.length) {
    const y = -D.box_head - D.box_row * cl.public.length;
    const div = vplane(0.03, y + 0.02, mw - 0.06, 0.05, zf + 0.001, basic(C.boxHead, 0.9), 2.1);
    g.add(div); flat.push(div);
  }
  if (!open && cl.private.length) {
    const tail = vplane(0.03, -h + D.box_tail + 0.01, w - 0.06, D.box_tail - 0.04, zf + 0.001, basic(C.boxHead, 0.85), 2.1);
    g.add(tail); flat.push(tail);
  }
  const fieldMarks = [];
  if (open && !cl.data_only && cl.fields.length) {
    const fx = cl.w + 0.3;
    const sep = mkLine([cl.w + 0.15, -D.box_head + 0.02, zf, cl.w + 0.15, -h + 0.06, zf], { width: 1, order: 2 });
    paintLine(sep, C.fieldSep, null, 2); g.add(sep);
    const fy = (j) => -D.box_head - D.box_field * (j + 0.5);
    const fieldIndex = new Map(cl.fields.map((f, j) => [f.name, j]));
    rows.forEach((m, i) => {
      const acc = cl.access[m];
      if (!acc) return;
      const y0 = -D.box_head - D.box_row * (i + 0.5);
      for (const [list, kind] of [[acc.writes, 'w'], [acc.reads, 'r']]) {
        for (const name of list) {
          if (!fieldIndex.has(name) || (kind === 'r' && acc.writes.includes(name))) continue;
          const y1 = fy(fieldIndex.get(name));
          const pts = bez(V(cl.w - 0.04, y0, zf + 0.003), V(cl.w + 0.1, y0, zf + 0.003), V(fx - 0.14, y1, zf + 0.003), V(fx - 0.02, y1, zf + 0.003), 12);
          const ln = mkLine(pts, { width: kind === 'w' ? 1.1 : 1, dashed: kind === 'r', dash: 0.03, gap: 0.04, opacity: 0.55, order: 2 });
          paintLine(ln, kind === 'w' ? C.write : C.read, null, 13);
          ln.userData = { method: m, kind };
          g.add(ln); fieldMarks.push(ln);
        }
      }
    });
  }
  for (const child of g.children) {
    if (child.isLine2 || child.isLineSegments2) child.renderOrder = 2.4;
  }
  g.position.set(cl.x, cl.y, cl.z);
  scene.add(g);
  const o = { cl, group: g, box, mats, edges, flat, fieldMarks, open, lift: prev ? prev.lift : 0, liftTarget: open ? 1 : 0, a: prev ? prev.a : 1, ta: prev ? prev.ta : 1 };
  g.position.z = cl.z + ease(o.lift) * cl.expanded.lift;
  boxObjs.set(cl.id, o);
  boxAlpha(o);
  return o;
}
function boxAlpha(o) {
  const mo = modObjs.get(o.cl.module);
  const k = ease(mo.u) * mo.a * (o.cl.y - o.cl.h >= -mo.h - 1e-3 ? 1 : 0), a = o.a * k;
  o.group.visible = a > 0.003;
  o.mats.forEach((m) => (m.opacity = a));
  o.edges.material.opacity = a;
  o.flat.forEach((m) => (m.material.opacity = a * (m.userData.alpha ?? 1)));
  o.group.children.forEach((c) => { if (c.isLine2) c.material.opacity = a * (c.userData.method ? 0.55 : 1); });
}
for (const cl of view.classes) buildBox(cl);

// ---------------------------------------------------------------- connections
// Python says which calls exist, their kind, span and folded slots, and groups the
// calls of a module pair into links (one per pair of slots). A link is one line
// between two folded boxes; when an end module unfolds, the link gives way to its
// member calls, which keep the link's lane and risers and end on cards.
class TaperMaterial extends LineMaterial {
  // LineMaterial plus a per-vertex width factor (taper reads as direction) and a
  // per-vertex alpha (a call leaving the scope fades out as a stub).
  constructor(p) {
    super(p);
    this.vertexShader = this.vertexShader
      .replace('attribute vec3 instanceColorEnd;', 'attribute vec3 instanceColorEnd;\n\t\tattribute float instanceWidthStart;\n\t\tattribute float instanceWidthEnd;\n\t\tattribute float instanceAlphaStart;\n\t\tattribute float instanceAlphaEnd;\n\t\tvarying float vAlpha;')
      .replace('void main() {', 'void main() {\n\t\t\tvAlpha = ( position.y < 0.5 ) ? instanceAlphaStart : instanceAlphaEnd;')
      .replace('offset *= linewidth;', 'offset *= linewidth * ( ( position.y < 0.5 ) ? instanceWidthStart : instanceWidthEnd );');
    this.fragmentShader = this.fragmentShader
      .replace('uniform float linewidth;', 'uniform float linewidth;\n\t\tvarying float vAlpha;')
      .replace('gl_FragColor = vec4( diffuseColor.rgb, alpha );', 'gl_FragColor = vec4( diffuseColor.rgb, alpha * vAlpha );');
  }
}
function fractions(arr) {
  const n = arr.length / 3, f = new Float32Array(n);
  let d = 0;
  for (let i = 1; i < n; i++) {
    d += Math.hypot(arr[i * 3] - arr[i * 3 - 3], arr[i * 3 + 1] - arr[i * 3 - 2], arr[i * 3 + 2] - arr[i * 3 - 1]);
    f[i] = d;
  }
  for (let i = 1; i < n; i++) f[i] /= d || 1;
  f.len = d;
  return f;
}
function pairAttr(geo, name, values) {
  const buf = new THREE.InstancedInterleavedBuffer(values, 2, 1);
  geo.setAttribute(name + 'Start', new THREE.InterleavedBufferAttribute(buf, 1, 0));
  geo.setAttribute(name + 'End', new THREE.InterleavedBufferAttribute(buf, 1, 1));
}
function setWidths(s) {
  const n = s.n, wid = new Float32Array(Math.max(0, n - 1) * 2);
  for (let i = 0; i < n - 1; i++) { wid[2 * i] = 1 - s.taper * s.f[i]; wid[2 * i + 1] = 1 - s.taper * s.f[i + 1]; }
  pairAttr(s.line.geometry, 'instanceWidth', wid);
}
function paintStrand(s, a, b, fade = null) {
  const key = `${a}|${b ?? a}|${s.n}|${fade ? `${fade.start}|${fade.f0}|${fade.f1}` : ''}`;
  if (s.paintKey === key) return;
  s.paintKey = key; s.lastA = a; s.lastB = b ?? a; s.lastFade = fade;
  const ca = col(a), cb = col(b ?? a), c = new THREE.Color(), arr = new Float32Array(s.n * 3), al = new Float32Array(s.n);
  for (let i = 0; i < s.n; i++) {
    const f = s.f[i];
    c.copy(ca).lerp(cb, f);
    arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b;
    const g = fade ? (fade.start ? f : 1 - f) : 0;
    al[i] = fade ? 1 - clamp((g - fade.f0) / Math.max(1e-3, fade.f1 - fade.f0), 0, 1) : 1;
  }
  s.line.geometry.setColors(arr);
  const seg = new Float32Array(Math.max(0, s.n - 1) * 2);
  for (let i = 0; i < s.n - 1; i++) { seg[2 * i] = al[i]; seg[2 * i + 1] = al[i + 1]; }
  pairAttr(s.line.geometry, 'instanceAlpha', seg);
}
function mkStrand(pts, o = {}) {
  const arr = Array.isArray(pts[0]) ? pts.flat() : pts;
  const geo = new LineGeometry();
  geo.setPositions(arr);
  const mat = new TaperMaterial({
    color: 0xffffff, linewidth: o.width ?? 1.5, vertexColors: true, transparent: true, opacity: 0,
    dashed: !!o.dashed, dashSize: Math.max(2, (o.dash ?? 0.1) * 40), gapSize: Math.max(2, (o.gap ?? 0.08) * 40), depthWrite: false, fog: true,
  });
  mat.resolution.set(W, H);
  lineMats.push(mat);
  const line = new Line2(geo, mat);
  if (o.dashed) line.computeLineDistances();
  line.renderOrder = o.order ?? 3;
  line.visible = false;
  const s = { line, pts: arr, n: arr.length / 3, f: fractions(arr), taper: o.taper ?? 0.5, a: 0, ta: 0 };
  setWidths(s);
  paintStrand(s, 0xffffff);
  return s;
}
function setStrandPts(s, pts) {
  const arr = Array.isArray(pts[0]) ? pts.flat() : pts;
  s.pts = arr; s.n = arr.length / 3; s.f = fractions(arr); s.paintKey = null;
  s.line.geometry.setPositions(arr);
  if (s.line.material.dashed) s.line.computeLineDistances();
  setWidths(s);
  paintStrand(s, s.lastA ?? 0xffffff, s.lastB, s.lastFade ?? null);
}

// ---- ends and variants. Python writes every call's path for every state of
// its two ends: f the module is a folded box, o unfolded, x unfolded with the end's class
// block opened. A call takes the path of the current state; while a block lifts open (or
// settles) the o and x paths, which have one shape, are blended by the lift.
function classOfEnd(item) {
  if (CL.has(item)) return item;
  const n = N.get(item);
  return n && n.cls && !n.dead && CL.has(n.cls) ? n.cls : null;
}
function endLift(item, m) {
  if (!state.open.has(m)) return null;
  const c = classOfEnd(item), bo = c ? boxObjs.get(c) : null;
  return bo ? ease(bo.lift) : 0;
}
function variantPts(ei, kind) {
  const e = view.edges[ei];
  const ls = endLift(e.s, e.ms), lt = endLift(e.t, e.mt);
  const k = (l) => (l === null ? 'f' : l >= 1 ? 'x' : 'o');
  const mid = (l) => l !== null && l > 0 && l < 1;
  if (!mid(ls) && !mid(lt)) {
    const key = k(ls) + k(lt);
    return R.call(ei, kind, key) ?? R.call(ei, kind, key.replace(/x/g, 'o'));
  }
  const t = mid(ls) ? ls : lt;
  const k0 = (mid(ls) ? 'o' : k(ls)) + (mid(lt) ? 'o' : k(lt)), k1 = (mid(ls) ? 'x' : k(ls)) + (mid(lt) ? 'x' : k(lt));
  const A = R.raw(ei, kind, k0) ?? R.raw(ei, kind, k0.replace(/x/g, 'o')), B = R.raw(ei, kind, k1) ?? A;
  if (!A) return null;
  if (A.length !== B.length) return samplePath(t < 0.5 ? A : B);
  return samplePath(A.map((v, i) => (i >= 3 && (i - 3) % 10 === 0 ? v : v + (B[i] - v) * t)));
}
function pointAt(o, f) {
  let j = 1;
  while (j < o.n - 1 && o.f[j] < f) j++;
  const i = j - 1, r = clamp((f - o.f[i]) / ((o.f[j] - o.f[i]) || 1), 0, 1);
  return [0, 1, 2].map((c) => lerp(o.pts[i * 3 + c], o.pts[j * 3 + c], r));
}
function fractionWhere(o, fromStart, g, lo = 0.02, hi = 0.98) {
  let prev = null;
  for (let k = 0; k < o.n; k++) {
    const i = fromStart ? k : o.n - 1 - k;
    const v = g(o.pts[i * 3], o.pts[i * 3 + 1], o.pts[i * 3 + 2]), f = fromStart ? o.f[i] : 1 - o.f[i];
    if (v >= 0) return clamp(prev && prev.v < 0 ? prev.f + (f - prev.f) * (-prev.v / (v - prev.v)) : f, lo, hi);
    prev = { v, f };
  }
  return 0.5;
}

// ---- strata: each kind of connection has its own line
const STRATUM = {
  pane: { color: C.same, width: 1.35, taper: 0.6, order: 3 }, // a margin lane, wide at the caller
  plate: { color: C.cross, width: 1.6, taper: 0.5, order: 3.1 },
  row: { color: C.pkg, width: 1.6, taper: 0.5, order: 3.15 },
  cross_row: { color: C.pkg, width: 1.6, taper: 0.5, order: 3.2 },
  intra: { color: C.intra, width: 1.1, taper: 0, order: 3 },
  curve: { color: C.cross, width: 1.7, taper: 0.62, order: 3.3 }, // one call of a pair in focus
};
const linkW = (c) => clamp(1.4 + 0.9 * Math.log2(c), 1.4, 3.6);
const edgeKind = (e) => (e.kind === 'intra_class' ? 'loop' : e.ms === e.mt ? 'margin' : 'track');
const anyPts = (ei, kind) => R.call(ei, kind, R.variants(ei, kind)[0] ?? '') ?? null;
// one strand per call: a margin lane or class loop inside a module, or, between modules,
// the call's stub on its pair's lane or arc (drawn while an end is unfolded and the pair
// leaves the scope); a call with no path in the current state keeps its points, undrawn
const edgeObjs = view.edges.map((e, ei) => {
  const kind = edgeKind(e);
  const st = STRATUM[e.kind === 'intra_class' ? 'intra' : e.span];
  const pts = variantPts(ei, kind);
  const o = mkStrand(pts ?? anyPts(ei, kind) ?? R.call(ei, 'curve', 'ff'), { width: st.width, taper: st.taper, dashed: e.dead, dash: 0.08, gap: 0.08, order: st.order });
  // a call with no path in the current state is parked on its first points (undrawn)
  Object.assign(o, { e, ei, st, kind, inner: e.ms === e.mt, m: e.ms, hasPath: !!pts, park: o.pts });
  o.line.userData = { type: 'call', id: ei };
  scene.add(o.line);
  return o;
});
// one curve per call between modules: drawn while its module pair is in focus
const curveObjs = view.edges.map((e, ei) => {
  if (e.ms === e.mt || e.kind === 'intra_class') return null;
  const st = STRATUM.curve;
  const o = mkStrand(variantPts(ei, 'curve'), { width: st.width, taper: st.taper, dashed: e.dead, dash: 0.08, gap: 0.08, order: st.order });
  Object.assign(o, { e, ei, st, kind: 'curve', bundle: view.links[linkOfEdge.get(ei)].bundle, hasPath: true });
  o.line.userData = { type: 'call', id: ei };
  scene.add(o.line);
  return o;
});
const curveList = curveObjs.filter(Boolean);
function refresh(o) {
  const p = variantPts(o.ei, o.kind);
  o.hasPath = !!p;
  if (p) setStrandPts(o, p);
  else if (o.park && o.pts !== o.park) setStrandPts(o, o.park);
}
const edgesOfModule = new Map();
for (const o of edgeObjs) for (const m of new Set([o.e.ms, o.e.mt])) { if (!edgesOfModule.has(m)) edgesOfModule.set(m, []); edgesOfModule.get(m).push(o); }
function rerouteModule(m) { for (const o of edgesOfModule.get(m) ?? []) { refresh(o); if (curveObjs[o.ei]) refresh(curveObjs[o.ei]); } }
const edgesTouching = (cid) => edgeObjs.filter((o) => o.e.cls === cid || N.get(o.e.s)?.cls === cid || N.get(o.e.t)?.cls === cid);
function rerouteClass(cid) {
  for (const o of edgesTouching(cid)) { refresh(o); if (curveObjs[o.ei]) refresh(curveObjs[o.ei]); }
  for (const o of cloneObjs) if (N.get(o.ida)?.cls === cid || N.get(o.idb)?.cls === cid) { o.pts = routeClone(o.ida, o.idb); setLinePts(o.line, o.pts); }
}
// one line per link: the module pair's calls between two slots of folded boxes
const linkObjs = view.links.map((l, li) => {
  const st = STRATUM[l.span];
  const o = mkStrand(R.link(li), { width: linkW(l.count), taper: 0.5, dashed: l.members.every((ei) => view.edges[ei].dead), dash: 0.08, gap: 0.08, order: st.order + 0.05 });
  Object.assign(o, { l, li, st, w: linkW(l.count), e: { ms: l.s, mt: l.t, span: l.span } });
  o.line.userData = { type: 'link', id: li };
  scene.add(o.line);
  return o;
});
// one ribbon per plate pair: the overview's only call lines
const plateW = (c) => clamp(2.2 + 1.3 * Math.log2(c), 2.2, 5.5);
const plateRibbonObjs = view.plate_bundles.map((pb, k) => {
  const w = plateW(pb.count);
  const o = mkStrand(R.ribbon(k), { width: w, taper: 0.45, order: 3.7 });
  Object.assign(o, { pb, k, w, color: C.ribPkg });
  o.line.userData = { type: 'plateribbon', id: k };
  scene.add(o.line);
  return o;
});

// ---------------------------------------------------------------- clone chords (between modules)
function cloneAnchor(id) {
  const n = N.get(id), m = n.module;
  if (state.open.has(m)) {
    if (n.x !== undefined && !(n.cls && CL.has(n.cls) && !n.dead)) return V(n.x + n.w / 2, n.y, n.z + 0.02);
    const cl = CL.get(n.cls), g = boxGeom(cl), ri = g.rows.indexOf(id);
    return V(g.xr, ri >= 0 ? rowY(cl, ri) : cl.y - g.h + 0.1, g.zf);
  }
  const b = PANE.get(m).box, s = SLOT.get(`${m}|${n.slot}`);
  return V(b.x + b.w * 0.62, -(s.y + s.h / 2), PANE.get(m).z + b.d + 0.02);
}
function routeClone(a, b) {
  const p0 = cloneAnchor(a), p3 = cloneAnchor(b), dist = p0.distanceTo(p3);
  const lift = 0.6 + 0.2 * dist;
  return bez(p0, V(p0.x, p0.y + lift, p0.z + 0.6 + 0.05 * dist), V(p3.x, p3.y + lift, p3.z + 0.6 + 0.05 * dist), p3, 32);
}
const cloneObjs = [];
view.clones.forEach((group) => {
  for (let k = 0; k + 1 < group.length; k++) {
    if (N.get(group[k]).module === N.get(group[k + 1]).module) continue; // the row's violet underline says it
    const pts = routeClone(group[k], group[k + 1]);
    // Heavy enough for the chord to read at the overview.
    const line = tpaint(mkLine(pts, { width: 2.4, dashed: true, dash: 0.05, gap: 0.07, order: 3 }), 'clone', pts.length / 3);
    scene.add(line);
    cloneObjs.push({ ida: group[k], idb: group[k + 1], line, pts, a: 1, ta: 1 });
  }
});
function rerouteClones(m) {
  for (const o of cloneObjs) if (N.get(o.ida).module === m || N.get(o.idb).module === m) { o.pts = routeClone(o.ida, o.idb); setLinePts(o.line, o.pts); }
}

// ---------------------------------------------------------------- imports on the ground
const importObjs = [];
{
  const foot = new Map();
  const slot = (m) => { const k = (foot.get(m) ?? 0) + 1; foot.set(m, k); return k; };
  const y = F.ground + 0.02;
  for (const imp of view.imports) {
    const a = PANE.get(imp.s).box, b = PANE.get(imp.t).box, za = PANE.get(imp.s).z, zb = PANE.get(imp.t).z;
    const ka = slot(imp.s), kb = slot(imp.t);
    const offA = ((ka % 5) - 2) * Math.min(0.18, a.w / 6), offB = ((kb % 5) - 2) * Math.min(0.18, b.w / 6);
    const p0 = V(a.x + a.w / 2 + offA, y, za + 0.5), p3 = V(b.x + b.w / 2 + offB, y, zb + 0.5);
    let c1, c2;
    if (imp.span !== 'cross_row') {
      const bow = 0.9 + 0.1 * Math.abs(p3.x - p0.x);
      c1 = V(p0.x, y, p0.z + Math.min(bow, 1.9)); c2 = V(p3.x, y, p3.z + Math.min(bow, 1.9));
    } else {
      c1 = V(p0.x, y, p0.z + 2.1); c2 = V(p3.x, y, p3.z + 2.1);
    }
    const pts = bez(p0, c1, c2, p3, 28);
    const line = mkLine(pts, { width: imp.cycle ? 1.5 : 1, order: 1, dashed: true, dash: 0.28, gap: 0.2 });
    const n = pts.length;
    const tip = V(pts[n - 3], y + 0.004, pts[n - 1]), back = V(pts[n - 9], y + 0.004, pts[n - 7]);
    const dir = tip.clone().sub(back).normalize(), side = V(-dir.z, 0, dir.x);
    const s = 0.2;
    const tri = new THREE.BufferGeometry();
    tri.setAttribute('position', new THREE.Float32BufferAttribute([
      tip.x, tip.y, tip.z,
      tip.x - dir.x * s * 1.6 + side.x * s * 0.7, tip.y, tip.z - dir.z * s * 1.6 + side.z * s * 0.7,
      tip.x - dir.x * s * 1.6 - side.x * s * 0.7, tip.y, tip.z - dir.z * s * 1.6 - side.z * s * 0.7,
    ], 3));
    const head = new THREE.Mesh(tri, basic(imp.cycle ? C.red : C.imp, 1, { side: THREE.DoubleSide, depthWrite: false }));
    head.renderOrder = 1;
    scene.add(line, head);
    importObjs.push({ imp, line, head, pts, a: 1, ta: 1 });
  }
}

// ---------------------------------------------------------------- pulses
const PULSE_MAX = 900;
const pulseGeo = new THREE.BufferGeometry();
pulseGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(PULSE_MAX * 3), 3));
pulseGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(PULSE_MAX * 3), 3));
pulseGeo.setDrawRange(0, 0);
const sprite = (() => {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d'), grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.25, 'rgba(255,255,255,0.75)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
})();
const pulses = new THREE.Points(pulseGeo, new THREE.PointsMaterial({ size: 11, sizeAttenuation: false, map: sprite, vertexColors: true, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending }));
pulses.renderOrder = 6;
pulses.frustumCulled = false;
scene.add(pulses);
let pulseList = [];
const PULSE_INK = new THREE.Color(), PULSE_BG = new THREE.Color(C.bg), PULSE_LIT = new THREE.Color(C.lit);
function themePulses() {
  PULSE_BG.set(C.bg); PULSE_LIT.set(C.lit);
  pulses.material.blending = K.pulseAdditive ? THREE.AdditiveBlending : THREE.NormalBlending;
  pulses.material.needsUpdate = true;
}
themePulses();

// ---------------------------------------------------------------- emphasis (lookups only)
// A package scope shows its package; a module scope shows the module's package with
// the module unfolded and its neighbours a step back.
function scopePackage() {
  if (!state.scope) return null;
  return state.scope.kind === 'module' ? PANE.get(state.scope.id).district : state.scope.id;
}
function scopeModules() {
  const p = scopePackage();
  return p ? new Set(DIST.get(p).modules) : null;
}
const focusModule = () => (state.scope?.kind === 'module' ? state.scope.id : null);
function moduleOf(id) { return N.get(id)?.module ?? CL.get(id)?.module; }
function slotOf(id) { return N.get(id)?.slot ?? CL.get(id)?.slot; }
// The folded view of a lit set: lit links (shallowest member), lit slots, lit modules.
function foldedView(depth, edges, classes) {
  const links = new Map(), slots = new Set(), modules = new Set(), bundles = new Set();
  for (const [o, d] of edges) {
    const li = linkOfEdge.get(o.ei);
    if (li !== undefined && (!links.has(li) || links.get(li) > d)) links.set(li, d);
    if (li !== undefined) bundles.add(view.links[li].bundle);
  }
  for (const id of depth.keys()) { const m = moduleOf(id); modules.add(m); slots.add(`${m}|${slotOf(id)}`); }
  for (const c of classes) { const m = CL.get(c).module; modules.add(m); slots.add(`${m}|${CL.get(c).slot}`); }
  return { links, slots, modules, bundles };
}
// A guide step lights exactly Python's set: nodes with depth, calls with depth, classes,
// and the trace path. No traversal here.
function guideSet(G) {
  const depth = new Map(G.lit.map(([id, d]) => [id, d]));
  const edges = new Map(G.lit_edges.map(([k, d]) => [edgeObjs[k], d]));
  const classes = new Set(G.lit_classes);
  const trace = new Set(G.trace_edges.map((k) => edgeObjs[k]));
  const traceLinks = new Set(G.trace_edges.map((k) => linkOfEdge.get(k)).filter((li) => li !== undefined));
  return { depth, edges, classes, ...foldedView(depth, edges, classes), trace, traceLinks, traceNodes: new Set(G.trace), ribbon: false, guide: true };
}
function selectionSet() {
  const G = guideStep();
  if (G) return G.lit.length ? guideSet(G) : null;
  const sel = state.selected;
  if (!sel) return null;
  const depth = new Map();
  const add = (id, d) => { if (!depth.has(id) || depth.get(id) > d) depth.set(id, d); };
  const edges = new Map(), classes = new Set();
  let ribbon = false;
  if (sel.kind === 'link' || sel.kind === 'ribbon' || sel.kind === 'plateribbon' || sel.kind === 'call') {
    // a line stands for its member calls: light exactly those, no wavefront
    ribbon = true;
    const idxs = sel.kind === 'call' ? [sel.id] : sel.kind === 'link' ? view.links[sel.id].members : sel.kind === 'ribbon' ? view.bundles[sel.id].members : view.plate_bundles[sel.id].bundles.flatMap((i) => view.bundles[i].members);
    for (const ei of idxs) {
      const e = view.edges[ei];
      add(e.s, 0);
      add(e.t, 1);
      if (e.cls) classes.add(e.cls);
      edges.set(edgeObjs[ei], 0);
    }
  } else {
    const reachOf = (id, base = 0) => { for (const [i, d] of view.reach[id]) add(view.nodes[i].id, base + d); };
    const callers = new Set();
    if (sel.kind === 'node') {
      reachOf(sel.id);
      for (const c of view.callers[sel.id]) callers.add(c);
    } else {
      const cl = CL.get(sel.id);
      for (const m of cl.public.concat(cl.private)) { reachOf(m, 1); for (const c of view.callers[m]) if (N.get(c).cls !== cl.id) callers.add(c); }
      for (const o of edgeObjs) if (o.e.kind === 'constructs' && o.e.cls === cl.id) callers.add(o.e.s);
    }
    for (const id of depth.keys()) if (N.get(id)?.cls) classes.add(N.get(id).cls);
    if (sel.kind === 'class') classes.add(sel.id);
    for (const o of edgeObjs) {
      const { s, t, kind } = o.e;
      if (kind !== 'constructs' && depth.has(s) && depth.has(t)) edges.set(o, depth.get(s) + 1);
      else if (kind !== 'constructs' && callers.has(s) && (depth.get(t) === 0 || (sel.kind === 'class' && N.get(t).cls === sel.id))) edges.set(o, 0);
      else if (kind === 'constructs' && depth.has(s)) { edges.set(o, depth.get(s) + 1); classes.add(o.e.cls); }
      else if (kind === 'constructs' && sel.kind === 'class' && o.e.cls === sel.id) edges.set(o, 0);
    }
    for (const c of callers) add(c, -1);
  }
  // folded view of the same set: lit links (shallowest member) and lit slots
  return { depth, edges, classes, ...foldedView(depth, edges, classes), ribbon };
}

let SEL = null;
// What the reader points at, as the brightest marks: the call lines hovered in the source
// (their calls and callees), or a lit function or class hovered in the picture while
// something is lit (it and its lit calls). The rest of the lit set steps down one notch.
function hoverFocus() {
  if (state.hoverCall) return state.hoverCall;
  const id = state.hover;
  if (!id || !SEL || !SEL.depth.has(id) && !SEL.classes.has(id)) return null;
  const edges = new Set();
  for (const [o] of SEL.edges) if (o.e.s === id || o.e.t === id || o.e.cls === id) edges.add(o.ei);
  return { edges, targets: new Set([id]) };
}
const FADE = { hover: 150, select: 150, scope: 320, unfold: U_MS, guide: 300 };
let fadeMs = 150;
const nowMs = () => performance.now();
function tgt(o, ta, delay = 0, crisp = false) {
  if (o.ta === ta && !delay) return;
  o.from = o.a; o.ta = ta; o.t0 = nowMs() + delay;
  // highlights come on at once (a scope, unfold or guide step fades its context in with
  // the change); fades out take fadeMs
  o.dur = REDUCED ? 100 : crisp || (ta > o.a && fadeMs !== FADE.scope && fadeMs !== FADE.unfold && fadeMs !== FADE.guide) ? 0 : fadeMs;
}
function mix(a, b, t) { return col(a).lerp(col(b), t).getHex(); }
// A call or link with one end outside the scope is a stub with a port label.
function stubOf(o, sIn) {
  const { ms, mt, span } = o.e;
  const own = PANE.get(sIn ? ms : mt), other = PANE.get(sIn ? mt : ms);
  if (span === 'row') {
    const port = R.sidePort(own.plate, other.plate), dir = port.side === 'right' ? 1 : -1;
    const f0 = fractionWhere(o, sIn, (x) => (x - port.x) * dir);
    const f1 = fractionWhere(o, sIn, (x) => (x - port.x) * dir - 1.1);
    return { fade: { start: sIn, f0, f1 }, label: { kind: 'port', key: `${own.plate}|${port.side}|${sIn}`, at: pointAt(o, sIn ? f0 : 1 - f0), x: port.x + dir * 0.55, side: port.side, other: other.plate, out: sIn, z: own.z } };
  }
  if (span === 'cross_row') {
    // a sky stub is the vertical riser only: it fades where it reaches the sky base
    // or bends more than half a unit away from its gutter, whichever comes first
    const top = R.skyBase(own.plate), i0 = sIn ? 1 : o.n - 2, x0 = o.pts[i0 * 3], z0 = o.pts[i0 * 3 + 2];
    const k = fractionWhere(o, sIn, (x, y, z) => Math.max(y - top, Math.hypot(x - x0, z - z0) - 0.6), 0.02, 0.6);
    return { fade: { start: sIn, f0: 0.6 * k, f1: k }, label: { kind: 'sky', key: `${own.module}|${sIn}`, at: pointAt(o, sIn ? k : 1 - k), other: other.plate, out: sIn, z: own.z, module: own.module } };
  }
  return { fade: { start: sIn, f0: 0.3, f1: 0.5 }, label: null };
}
// rows of a box are drawn in a scope, or at the overview once the reader zooms in
// far enough for a row to carry its name
function updateLod() {
  // a guide step pins its level of detail (the story's structure key)
  if (state.scope || flight || state.guide !== null) return;
  let changed = false;
  for (const o of modObjs.values()) {
    const b = o.b, A = scr(b.x, 0, o.p.z + b.d), B = scr(b.x, -(b.line + D.row_pad), o.p.z + b.d);
    const on = A[2] <= 1 && Math.abs(B[1] - A[1]) >= TYPE.S * 1.15;
    if (on !== o.zoomRows) { o.zoomRows = on; changed = true; }
  }
  if (changed) applyEmphasis('hover');
}
// Emphasis sets colour, width and alpha only; nothing moves. Every element takes the
// tier its view gives it (STYLE, BOX_TIER); a guide step adds its own three tiers:
// what its text names (lit, evidence), the modules it touches (focus), the rest.
function applyEmphasis(kind = 'hover') {
  fadeMs = FADE[kind] ?? 150;
  const prevSel = SEL;
  const G = guideStep();
  const scope = scopeModules(), focusM = focusModule();
  SEL = selectionSet();
  const ctx = viewCtx(), S = STYLE[ctx];
  // motion only on an explicit pipeline: a pipeline picked from the list (or p), or a guide step that walks one
  const pulsed = SEL && !SEL.ribbon && ((kind === 'select' && state.pulse) || (kind === 'guide' && G && G.pulses));
  const inScope = (m) => !scope || scope.has(m);
  const hov = state.hover, hb = state.hoverBox, hl = state.hoverLine;
  const LW = LEVEL_WEIGHT[state.view];
  const gFocus = G ? new Set(G.focus) : null, evid = G ? new Set(G.evidence) : new Set();
  const evidSlots = new Set([...evid].map((id) => `${moduleOf(id)}|${slotOf(id)}`));
  const hs = hov ? `${moduleOf(hov)}|${slotOf(hov)}` : null;
  // A call hovered in the picture isolates it: both ends take the lit outline.
  const hcEdge = hl && hl.startsWith('call:') ? view.edges[+hl.slice(5)] : null;
  const hcEnds = new Set(hcEdge ? [hcEdge.s, hcEdge.t] : []);
  // Call lines hovered in the source: their calls and callees are the
  // brightest marks, the rest of what is lit steps down one notch (colour only, nothing moves)
  const HC = hoverFocus(), hcT = HC ? HC.targets : new Set();
  const hcSlots = new Set([...hcEnds, ...hcT].map((id) => `${moduleOf(id)}|${slotOf(id)}`));
  const DOWN = () => TIER.link; // the lit set steps down to the tier-2 line colour
  const insp = state.inspect && (state.inspect.kind === 'node' || state.inspect.kind === 'class') ? state.inspect.id : null;
  // a pill step (the stub rule, prepare.py) draws no line off the root's row
  const offE = new Set(G && G.stub === 'pill' ? G.off_edges : []);
  // Nothing outside a scope may hide it: rows in front of the scope are cut
  // away, boxes outside it are silhouettes (outline only, no fill, no depth)
  const occ = occScope();
  updateCut(occ);
  // boxes: their tier, their rows, their lit slots
  for (const o of modObjs.values()) {
    const m = o.p.module;
    let a = inScope(m) ? 1 : 0.05, tier = S.box;
    if (ctx === 'module') tier = m === focusM ? 2 : 3;
    if (G) {
      if (G.lod === 'plate') tier = 3;
      else if (gFocus.has(m)) tier = 2;
      else { tier = 3; a = inScope(m) ? 0.4 : 0.16; }
    } else if (SEL) {
      if (!SEL.modules.has(m)) a = Math.min(a, 0.35 * a);
      else if (tier === 3) tier = 2;
    }
    const sil = !!occ && !occ.has(m);
    if (sil) { tier = 3; a = Math.max(a, 0.22); }
    if (cutBack !== null && o.p.z < cutBack) a = 0;
    if (sil !== o.sil) { o.sil = sil; modAlpha(o); }
    tgt(o, a);
    styleBox(o, tier);
    const hot = hb === m;
    o.edges.material.color.set(hot ? C.lit : o.ts.edge[0]);
    o.edges.material.linewidth = hot ? 2.2 : o.ts.edge[1];
    // rows: read in a scope, in a guide step about the module, on a lit module, or once
    // a reader zooms the overview in far enough for a row to carry its name
    o.rowsTa = (ctx === 'package' || ctx === 'module') && inScope(m) && (!G || tier <= 2) ? 1
      : G ? (G.lod !== 'plate' && tier <= 2 ? 1 : 0)
      : (SEL && SEL.modules.has(m)) || (ctx === 'overview' && o.zoomRows) ? 1 : 0;
    for (const [slot, ln] of o.lit) {
      const key = `${m}|${slot}`, hc = hcSlots.has(key);
      ln.visible = !!((SEL && SEL.slots.has(key)) || hs === key || evidSlots.has(key) || hc) && o.u < 0.5;
      paintLine(ln, HC && !hc ? DOWN() : C.lit, null, 5);
      ln.material.linewidth = hc ? 2.6 : 1.4;
    }
  }
  // cards and class blocks of unfolded modules
  for (const o of cardObjs.values()) {
    const n = o.n;
    let a = inScope(n.module) ? 1 : 0.04;
    const lit = (SEL && SEL.depth.has(n.id)) || evid.has(n.id);
    if (SEL && !lit) a = Math.min(a, 0.3 * a);
    if (G) a = lit ? 1 : gFocus.has(n.module) ? 0.7 : 0.2;
    tgt(o, a);
    const hot = hov === n.id || state.selected?.id === n.id || insp === n.id || hcT.has(n.id) || hcEnds.has(n.id);
    // a plain card takes its view's tier; a signal card keeps its hue and line style; a lit
    // dead card in the guide keeps its dashes but brightens (the step is about it)
    const plain = !n.dead && n.clone === null && !n.lb;
    const rest = plain ? (G ? [gFocus.has(n.module) ? TIER.link : TIER.edge, 1] : S.card) : [C[o.st.key], o.st.width];
    paintLine(o.border, hot ? C.hover : lit && (plain || (n.dead && G)) ? (HC ? DOWN() : C.lit) : rest[0], null, 5);
    o.border.material.linewidth = hot || SEL?.traceNodes?.has(n.id) ? rest[1] + 1 : lit ? Math.max(rest[1], 1.5) : rest[1];
  }
  for (const o of boxObjs.values()) {
    const cl = o.cl;
    let a = inScope(cl.module) ? 1 : 0.04;
    const lit = (SEL && SEL.classes.has(cl.id)) || evid.has(cl.id);
    if (SEL && !lit) a = Math.min(a, 0.3 * a);
    if (G) a = lit ? 1 : gFocus.has(cl.module) ? 0.7 : 0.2;
    tgt(o, a);
    const hot = state.selected?.id === cl.id || hov === cl.id || insp === cl.id || hcT.has(cl.id);
    const rest = G ? [gFocus.has(cl.module) ? TIER.link : TIER.edge, 1.2] : S.block;
    o.edges.material.color.set(hot ? C.lit : lit ? (HC ? DOWN() : C.lit) : rest[0]);
    o.edges.material.linewidth = hot ? 2.2 : lit ? 1.6 : rest[1];
  }
  for (const o of plateObjs.values()) {
    let a = !scope || o.d.modules.some((m) => scope.has(m)) ? 1 : 0.15;
    // a guide step keeps context plates at 45 %: their names remain as orientation
    if (G) a = G.lod === 'plate' || o.d.modules.some((m) => gFocus.has(m)) ? 1 : 0.45;
    tgt(o, a);
    // under a selection the lit calls are tier 1 and the plates become context
    const line = SEL ? [TIER.edge, 1] : S.plate;
    paintLine(o.outline, line[0], null, 5);
    o.outline.material.linewidth = line[1];
    o.frame.material.color.set(line[0]);
    o.frame.material.opacity = a * 0.6;
    o.frame.visible = !o.d.modules.some((m) => state.open.has(m));
    o.walls.visible = o.frame.visible && (!occ || o.d.modules.some((m) => occ.has(m)));
  }
  const maxD = SEL ? Math.max(1, ...SEL.edges.values()) : 1;
  const wave = REDUCED || !pulsed ? 0 : Math.min(35, 350 / (maxD + 1));
  const traced = SEL?.trace?.size > 0;
  // Module pairs drawn call by call: an unfolded end whose partner is in the
  // scope, or a pair hovered, selected, lit or clicked while both ends show their rows, or a
  // pair whose call the reader points at in the inspector's source
  const rowsOn = (m) => state.open.has(m) || modObjs.get(m).rowsTa === 1;
  // a call hovered in the picture keeps its own pair in focus, so its curve stays under the pointer
  const hcEdges = [...(HC ? HC.edges : []), ...(hl && hl.startsWith('call:') ? [+hl.slice(5)] : [])];
  const hcBundles = new Set(hcEdges.map((ei) => linkOfEdge.get(ei)).filter((li) => li !== undefined).map((li) => view.links[li].bundle));
  const focus = new Set();
  view.bundles.forEach((b, i) => {
    if (!rowsOn(b.s) || !rowsOn(b.t)) return;
    const both = inScope(b.s) && inScope(b.t);
    if (both && (state.open.has(b.s) || state.open.has(b.t))) focus.add(i);
    else if (both && hb && state.scope && (b.s === hb || b.t === hb)) focus.add(i);
    else if (SEL && SEL.bundles.has(i) && SEL.modules.has(b.s) && SEL.modules.has(b.t)) focus.add(i);
    else if (hcBundles.has(i)) focus.add(i);
  });
  for (const i of focus) for (const m of [view.bundles[i].s, view.bundles[i].t]) {
    const o = modObjs.get(m);
    if (o.tier === 3 && !o.sil && o.ta > 0.2) styleBox(o, 2);
  }
  // hover on one call isolates it: every other line falls to tier 3
  const hci = hl && hl.startsWith('call:') ? +hl.slice(5) : null;
  const iso = (a) => (hci === null ? a : Math.min(a, 0.55));
  for (const o of edgeObjs) {
    const { s, t, ms, mt } = o.e;
    const openEnd = state.open.has(ms) || state.open.has(mt);
    const focused = !o.inner && o.kind !== 'loop' && focus.has(curveObjs[o.ei].bundle);
    const sIn = inScope(ms), tIn = inScope(mt);
    const lit = SEL && SEL.edges.has(o);
    const tr = traced && SEL.trace.has(o);
    const hc = !!HC && HC.edges.has(o.ei);
    // on the path a hover lights only what the step lights (dimmed context is inert)
    const hot = ((hov && (s === hov || t === hov || o.e.cls === hov)) && (!G || lit)) || (hb && state.scope && (ms === hb || mt === hb)) || hc || hci === o.ei;
    let a = 0;
    if (openEnd && !focused && o.hasPath) {
      if (o.inner) a = sIn ? 0.75 * LW.call : 0;
      else if (state.scope) a = sIn || tIn ? (o.e.span === 'cross_row' ? LW.sky : LW.call) : 0;
      else a = LW.call;
      if (focusM && !o.inner && ms !== focusM && mt !== focusM) a = Math.min(a, 0.12);
      if (lit || hot) a = 1;
      if (SEL && !lit && !hot) a = Math.min(a, 0.06);
      if (hb && state.scope && !hot && !SEL) a = Math.min(a, 0.2);
      // the story's cross_file key: false keeps the reader inside the module
      if (G && !lit && !hot && ((!G.cross_file && ms !== mt) || !SEL)) a = 0;
      if (o.e.dead) a *= G && lit ? 0.8 : 0.45;
      if (hc) a = 1;
      if (o.e.kind === 'intra_class' && !boxObjs.get(o.e.cls)?.open) a = 0;
      if (o.inner && !state.open.has(ms)) a = 0;
    }
    if (hci !== null && hci !== o.ei) a = Math.min(a, 0.55);
    // the stub rule: a pill step's calls off the root's row end in pills, not lines
    if (offE.has(o.ei)) a = 0;
    if (pulsed && lit && a > 0) { o.a = Math.min(o.a, 0.06); tgt(o, a, wave * SEL.edges.get(o), true); } else tgt(o, a);
    // a traced path is the brightest line; the rest of its pipeline stays lit one step down
    const rest = G ? (gFocus.has(ms) && gFocus.has(mt) ? TIER.link : TIER.edge) : S.call;
    let base = hot || tr ? C.lit : lit ? (HC ? DOWN() : traced ? mix(C.lit, C.bg, 0.35) : C.lit) : o.e.dead ? C.dead : rest; // a dead call keeps the dead hue
    if (hci !== null && hci !== o.ei) base = TIER.edge;
    const cb = mix(base, C.bg, hot || lit ? 0.35 : 0.5);
    // a guide step draws a call between two modules it is about in full, never as a stub
    o.stub = state.scope && !o.inner && sIn !== tIn && o.e.kind !== 'intra_class' && !(G && gFocus.has(ms) && gFocus.has(mt)) ? stubOf(o, sIn) : null;
    paintStrand(o, base, cb, o.stub ? o.stub.fade : null);
    o.line.material.linewidth = hc ? o.st.width + 1.8 : hci === o.ei ? o.st.width + 1.2 : tr ? o.st.width + 1.4 : hot ? o.st.width + 1 : lit ? o.st.width + 0.6 : o.st.width;
  }
  // per-call curves of the pairs in focus
  for (const o of curveList) {
    const { s, t, ms, mt } = o.e;
    const sIn = inScope(ms), tIn = inScope(mt);
    const eo = edgeObjs[o.ei];
    const lit = SEL && SEL.edges.has(eo);
    const tr = traced && SEL.trace.has(eo);
    const hc = !!HC && HC.edges.has(o.ei);
    // on the path a hover lights only what the step lights (dimmed context is inert)
    const hot = ((hov && (s === hov || t === hov || o.e.cls === hov)) && (!G || lit)) || (hb && (ms === hb || mt === hb)) || hc || hci === o.ei;
    let a = 0;
    if (focus.has(o.bundle)) {
      a = state.scope ? (sIn && tIn ? LW.call : 0) : LW.call;
      if (focusM && ms !== focusM && mt !== focusM) a = Math.min(a, 0.12);
      if (lit || hot) a = 1;
      if (SEL && !lit && !hot) a = Math.min(a, 0.06);
      if (hb && state.scope && !hot && !SEL) a = Math.min(a, 0.2);
      if (G && !lit && !hot) a = 0;
      if (o.e.dead) a *= G && lit ? 0.8 : 0.45;
      if (hc) a = 1;
    }
    if (hci !== null && hci !== o.ei) a = Math.min(a, 0.55);
    // the stub rule: a pill step draws no curve off the root's row either
    if (offE.has(o.ei)) a = 0;
    if (pulsed && lit && a > 0) { o.a = Math.min(o.a, 0.06); tgt(o, a, wave * SEL.edges.get(eo), true); } else tgt(o, a);
    const rest = G ? (gFocus.has(ms) && gFocus.has(mt) ? TIER.link : TIER.edge) : S.call;
    let base = hot || tr ? C.lit : lit ? (HC ? DOWN() : traced ? mix(C.lit, C.bg, 0.35) : C.lit) : o.e.dead ? C.dead : rest;
    if (hci !== null && hci !== o.ei) base = TIER.edge;
    paintStrand(o, base, mix(base, C.bg, hot || lit ? 0.35 : 0.5));
    o.line.material.linewidth = hc ? o.st.width + 1.8 : hci === o.ei ? o.st.width + 1.2 : hot ? o.st.width + 0.6 : tr ? o.st.width + 1.4 : lit ? o.st.width + 0.5 : o.st.width;
  }
  // links between folded boxes: a pair in focus gives way to its curves
  for (const o of linkObjs) {
    const { s: ms, t: mt } = o.l;
    const replaced = state.open.has(ms) || state.open.has(mt) || focus.has(o.l.bundle);
    const sIn = inScope(ms), tIn = inScope(mt);
    const lit = SEL && SEL.links.has(o.li);
    const tr = traced && SEL.traceLinks?.has(o.li);
    const hc = !!HC && o.l.members.some((ei) => HC.edges.has(ei));
    const hot = (hb && (ms === hb || mt === hb)) || hl === `link:${o.li}` || (hov && (!G || lit) && o.l.members.some((ei) => view.edges[ei].s === hov || view.edges[ei].t === hov)) || hc;
    let a;
    if (replaced) a = 0;
    else if (!state.scope) a = hot || lit ? 1 : 0;
    else a = sIn || tIn ? (o.l.span === 'cross_row' ? LW.sky : LW.call) : 0;
    if (!replaced && focusM && ms !== focusM && mt !== focusM) a = Math.min(a, 0.14);
    if (!replaced && (lit || (hot && (state.scope ? sIn || tIn : true)))) a = Math.max(a, 1);
    if (SEL && !lit) a = Math.min(a, 0.06);
    if (hb && state.scope && !hot && !SEL) a = Math.min(a, 0.2);
    if (hc && !replaced) a = 1;
    // in the guide a link shows only when the step lights it (or the reader hovers it)
    if (G && !replaced) a = lit || hot ? 1 : 0;
    a = iso(a);
    // the stub rule: a link whose calls all leave a pill step's row is not drawn (pills name them)
    if (offE.size && o.l.members.every((ei) => offE.has(ei))) a = 0;
    if (pulsed && lit && a > 0) { o.a = Math.min(o.a, 0.06); tgt(o, a, wave * SEL.links.get(o.li), true); } else tgt(o, a);
    const base = hci !== null ? TIER.edge : hot || tr ? C.lit : lit ? (HC ? DOWN() : traced ? mix(C.lit, C.bg, 0.35) : C.lit) : S.link;
    o.stub = state.scope && sIn !== tIn ? stubOf(o, sIn) : null;
    paintStrand(o, base, mix(base, C.bg, hot || lit ? 0.35 : 0.5), o.stub ? o.stub.fade : null);
    o.line.material.linewidth = o.w + (hc ? 1.8 : tr ? 1.4 : hot || lit ? 0.8 : 0);
  }
  // plate-pair ribbons: the overview's call lines (tier 2), and the package map chapter's
  for (const r of plateRibbonObjs) {
    let a = !state.scope ? 1 : 0;
    const hot = hl === `plateribbon:${r.k}` || (state.selected?.kind === 'plateribbon' && state.selected.id === r.k);
    if (a && hb) a = 0.18;
    else if (a && SEL && !hot) a = 0.12;
    if (a && state.selected?.kind === 'plateribbon' && state.selected.id === r.k) a = 0.25;
    if (a && hot && !SEL) a = 1;
    if (G) a = G.lod === 'plate' ? 1 : 0;
    tgt(r, iso(a));
    const base = hot ? C.lit : S.ribbon;
    paintStrand(r, base, mix(base, C.bg, hot ? 0.3 : 0.45));
    r.line.material.linewidth = r.w + (hot ? 1 : 0);
  }
  for (const o of cloneObjs) {
    const ia = inScope(moduleOf(o.ida)), ib = inScope(moduleOf(o.idb));
    let a = ia && ib ? 1 : ia || ib ? 0.5 : 0.04;
    if (SEL && !(SEL.depth.has(o.ida) || SEL.depth.has(o.idb))) a = Math.min(a, 0.25);
    if (hb && !SEL && moduleOf(o.ida) !== hb && moduleOf(o.idb) !== hb) a = Math.min(a, 0.25);
    if (G) a = SEL && (SEL.depth.has(o.ida) || SEL.depth.has(o.idb)) ? 1 : 0.06;
    // a chord whose far end the section cut removed, or whose end box is an outline (no rows to
    // land on), would end in mid-air: it is not drawn; the row's tint and the box tick remain
    const ends = [moduleOf(o.ida), moduleOf(o.idb)];
    if (ends.some((m) => cutAway(m) || modObjs.get(m).sil)) a = 0;
    tgt(o, iso(a * LW.clone));
  }
  // imports stay on the ground: Plan shows them all; a scope shows its own; the
  // Axonometric overview shows only import cycles. No guide step talks about imports.
  for (const o of importObjs) {
    const touch = hb && (o.imp.s === hb || o.imp.t === hb) && state.view === 'plan';
    let a = inScope(o.imp.s) || inScope(o.imp.t) ? (state.view === 'plan' ? 1 : 0.85) : 0.05;
    if (!state.scope && state.view !== 'plan' && !o.imp.cycle) a = 0;
    if (SEL) a = Math.min(a, 0.2);
    if (hb && !touch) a = Math.min(a, 0.3);
    a *= LW.imp;
    if (touch) a = 1;
    if (G) a = 0;
    tgt(o, iso(a));
    const c = o.imp.cycle ? C.red : touch ? C.impLit : S.imp;
    paintLine(o.line, c, o.imp.cycle ? c : mix(c, C.bg, 0.45), o.pts.length / 3);
    o.head.material.color.set(c);
    o.line.material.linewidth = touch || o.imp.cycle ? 1.5 : 1;
  }
  // pulses: only on an explicit pipeline (list, p, or a guide step that walks one); hover never restarts them
  if (G) { if (kind === 'guide') { if (pulsed) startPulses(); else stopPulses(); } }
  else if (pulsed) startPulses();
  else if (kind === 'select' || (!SEL && prevSel)) stopPulses();
  renderInspector();
  syncSource();
  writeHash();
  dirty = true; schedule();
}

function stepA(o, now) {
  if (o.a === o.ta || o.t0 === undefined) return false;
  if (now < o.t0) return true;
  const t = o.dur ? clamp((now - o.t0) / o.dur, 0, 1) : 1;
  o.a = t >= 1 ? o.ta : lerp(o.from, o.ta, t);
  return true;
}
function stepAlphas(now) {
  let moving = false;
  const growing = new Set();
  for (const o of modObjs.values()) {
    let ch = stepA(o, now);
    if (o.rowsA !== o.rowsTa) { o.rowsA = REDUCED ? o.rowsTa : clamp(o.rowsA + Math.sign(o.rowsTa - o.rowsA) * 0.34, 0, 1); ch = true; }
    if (o.u !== o.uTarget) {
      if (o.uT0 === undefined) { o.uT0 = now; o.uFrom = o.u; }
      const t = REDUCED ? 1 : clamp((now - o.uT0) / U_MS, 0, 1);
      o.u = t >= 1 ? o.uTarget : lerp(o.uFrom, o.uTarget, t);
      if (t >= 1) o.uT0 = undefined;
      setBodyH(o, lerp(o.b.h, o.b.open_h, ease(o.u)));
      ch = true;
    }
    if (ch) { moving = true; modAlpha(o); growing.add(o.p.module); }
  }
  for (const o of cardObjs.values()) if (stepA(o, now) || growing.has(o.n.module)) { moving = true; cardAlpha(o); }
  for (const o of boxObjs.values()) {
    if (stepA(o, now) || growing.has(o.cl.module)) { moving = true; boxAlpha(o); }
    if (o.lift !== o.liftTarget) {
      moving = true;
      if (o.liftT0 === undefined) { o.liftT0 = now; o.liftFrom = o.lift; }
      const t = REDUCED ? 1 : clamp((now - o.liftT0) / 220, 0, 1);
      o.lift = t >= 1 ? o.liftTarget : lerp(o.liftFrom, o.liftTarget, t);
      if (t >= 1) o.liftT0 = undefined;
      o.group.position.z = o.cl.z + ease(o.lift) * o.cl.expanded.lift;
      rerouteClass(o.cl.id);
      if (o.lift === 0 && o.liftTarget === 0 && o.rebuildOnClose) { o.rebuildOnClose = false; buildBox(o.cl); rerouteClass(o.cl.id); applyEmphasis(); }
    }
  }
  for (const o of plateObjs.values()) if (stepA(o, now)) {
    moving = true;
    o.plate.material.opacity = 0.92 * (0.5 + 0.5 * o.a); o.outline.material.opacity = o.a;
    o.frame.material.opacity = o.a * 0.6;
  }
  for (const o of edgeObjs) if (stepA(o, now) || (o.inner && growing.has(o.m))) {
    moving = true;
    const k = o.inner ? U(o.m) : 1;
    o.line.material.opacity = o.a * k; o.line.visible = o.a * k > 0.002;
  }
  for (const o of linkObjs) if (stepA(o, now)) { moving = true; o.line.material.opacity = o.a; o.line.visible = o.a > 0.002; }
  for (const o of curveList) if (stepA(o, now)) { moving = true; o.line.material.opacity = o.a; o.line.visible = o.a > 0.002; }
  for (const o of plateRibbonObjs) if (stepA(o, now)) { moving = true; o.line.material.opacity = o.a; o.line.visible = o.a > 0.002; }
  for (const o of cloneObjs) if (stepA(o, now)) { moving = true; o.line.material.opacity = o.a; o.line.visible = o.a > 0.002; }
  for (const o of importObjs) if (stepA(o, now)) { moving = true; o.line.material.opacity = o.a; o.head.material.opacity = o.a; o.line.visible = o.head.visible = o.a > 0.002; }
  return moving;
}

// Pulses: after the wavefront, light dots run caller -> callee down the selected
// call tree (on links while their boxes are folded), for three passes or four
// seconds, whichever ends first. Then still.
const STEP = 0.34;
let pulseRun = null;
function startPulses() {
  pulseList = [];
  pulseGeo.setDrawRange(0, 0);
  pulseRun = null;
  if (!SEL || REDUCED || SEL.ribbon) return;
  for (const [o, d] of SEL.edges) { const c = curveObjs[o.ei]; if (c && c.ta > 0.05) pulseList.push({ o: c, d }); else if (o.ta > 0.05) pulseList.push({ o, d }); }
  for (const [li, d] of SEL.links) if (linkObjs[li].ta > 0.05) pulseList.push({ o: linkObjs[li], d });
  if (!pulseList.length) return;
  const maxD = Math.max(...pulseList.map((q) => q.d));
  const period = (maxD + 1) * STEP + 0.35;
  pulseRun = { t0: nowMs() / 1000 + 0.35, period, end: Math.min(3 * period, 4) };
}
function stopPulses() {
  pulseList = [];
  pulseGeo.setDrawRange(0, 0);
  pulseRun = null;
  dirty = true; schedule();
}
function stepPulses(t) {
  if (!pulseRun) return false;
  const el = t - pulseRun.t0;
  if (el < 0) return true;
  if (el > pulseRun.end) { pulseRun = null; pulseGeo.setDrawRange(0, 0); dirty = true; schedule(); return false; }
  const tm = el % pulseRun.period;
  const pos = pulseGeo.attributes.position.array, colr = pulseGeo.attributes.color.array;
  let k = 0;
  for (const { o, d } of pulseList) {
    const u = (tm - d * STEP) / STEP;
    if (u < 0 || u > 1.2) continue;
    for (const [lag, bright] of [[0, 1], [0.08, 0.45], [0.16, 0.2]]) {
      const uu = u - lag;
      if (uu < 0 || uu > 1 || k >= PULSE_MAX) continue;
      const p = pointAt(o, uu);
      pos[k * 3] = p[0]; pos[k * 3 + 1] = p[1]; pos[k * 3 + 2] = p[2];
      // additive light on the dark canvas; on the light canvas, ink blended from the canvas
      const fade = bright * Math.min(1, o.a * 1.2);
      const pc = PULSE_INK.copy(PULSE_BG).lerp(PULSE_LIT, fade);
      if (K.pulseAdditive) pc.copy(PULSE_LIT).multiplyScalar(fade);
      colr[k * 3] = pc.r; colr[k * 3 + 1] = pc.g; colr[k * 3 + 2] = pc.b;
      k++;
    }
  }
  pulseGeo.attributes.position.needsUpdate = true;
  pulseGeo.attributes.color.needsUpdate = true;
  pulseGeo.setDrawRange(0, k);
  return true;
}

// ---------------------------------------------------------------- camera
function applyViewOffset() {
  persp.aspect = W / H;
  persp.setViewOffset(W, H, (PAD_R - PAD_L) / 2, (PAD_B - PAD_T) / 2, W, H);
  persp.updateProjectionMatrix();
  // the orthographic frustum is the frame in px; its zoom is px per world unit
  Object.assign(ortho, { left: -W / 2, right: W / 2, top: H / 2, bottom: -H / 2 });
  ortho.setViewOffset(W, H, (PAD_R - PAD_L) / 2, (PAD_B - PAD_T) / 2, W, H);
  ortho.updateProjectionMatrix();
}
// px per world unit at the target, for either camera
function pxPerUnit(cam = camera, target = controls.target) {
  return cam.isOrthographicCamera ? cam.zoom : H / (2 * cam.position.distanceTo(target) * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2));
}
// switch cameras where the reader stands, keeping the scale at the target
function useCamera(wantOrtho) {
  const next = wantOrtho ? ortho : persp;
  if (camera === next) return;
  // at boot the camera stands on its target: no scale to keep, take a neutral one
  let ppu = pxPerUnit();
  if (!Number.isFinite(ppu) || ppu <= 0) ppu = 30;
  const dir = camera.position.distanceTo(controls.target) > 1e-6 ? camera.position.clone().sub(controls.target).normalize() : V(0, 0, 1);
  if (wantOrtho) { ortho.zoom = ppu; ortho.position.copy(controls.target).addScaledVector(dir, ORTHO_D); }
  else persp.position.copy(controls.target).addScaledVector(dir, H / (2 * ppu * Math.tan(THREE.MathUtils.degToRad(persp.fov) / 2)));
  next.lookAt(controls.target);
  next.updateProjectionMatrix();
  camera = next;
  controls.object = next;
  controls.update();
  dirty = true; schedule();
}
// ---------------------------------------------------------------- scope protection
// In a scoped view nothing outside the scope may hide it: one clipping plane cuts away every
// row in front of the scope's front row (whatever the camera does: zoom, orbit, pan), and
// boxes outside the scope are silhouettes (outline only). The scope of a package or module
// scope is its package; of a pipeline (picked from the list and fitted), its modules; of a
// guide step, the modules it touches.
const CUT_FRONT = 3.2; // the scope's plate front edge and its package name stay in front of the cut
function occScope() {
  if (state.scope) return scopeModules();
  const G = guideStep();
  if (G) return stepScope(G);
  if (SEL && state.selected && (state.pulse || lastFit === 'sel')) return new Set(SEL.modules);
  return null;
}
// A guide step's scope is the modules it touches; a pill step uses the stub rule
// faces its root's row, so only that row's modules stand in front of the cut
function stepScope(G) {
  if (G.lod === 'plate') return null;
  const mods = G.stub === 'pill' && G.home_row !== null ? G.focus.filter((m) => PANE.get(m).row === G.home_row) : G.focus;
  return new Set(mods);
}
const CUT_BACK = 2.2;
// a module the section cut removes (in front of the cut, or behind the back cut)
const cutAway = (m) => (cut !== null && PANE.get(m).z > cut) || (cutBack !== null && PANE.get(m).z < cutBack); // the scope's plate back edge stays in front of the back cut
function updateCut(occ) {
  const zs = occ && occ.size ? [...occ].map((m) => PANE.get(m).z) : null;
  cut = zs ? Math.max(...zs) + CUT_FRONT : null;
  cutBack = zs && state.view === 'elev' ? Math.min(...zs) - CUT_BACK : null;
  const planes = [];
  if (cut !== null) planes.push(cutPlane.set(cutPlane.normal.set(0, 0, -1), cut));
  if (cutBack !== null) planes.push(backPlane.set(backPlane.normal.set(0, 0, 1), -cutBack));
  renderer.clippingPlanes = planes;
}
const boxBottom = (m) => -(state.open.has(m) ? PANE.get(m).box.open_h : PANE.get(m).box.h);
// Fit frames the boxes (and an unfolded pane), never the empty slot under a box.
function sceneBounds(modules, { plan = false, focus = false } = {}) {
  const pts = [];
  const all = modules.length === view.panes.length;
  const G = D.gutter;
  const crossStub = (m) => view.links.some((l) => (l.s === m || l.t === m) && l.span === 'cross_row');
  for (const m of modules) {
    const p = PANE.get(m), b = p.box;
    const roof = plan ? 0.6 : all ? 0.4 : crossStub(m) ? R.skyBase(p.plate) + 0.6 : R.bandTop(p.plate) + 0.45;
    for (const x of [b.x - G, b.x + b.w + G]) {
      if (plan) {
        for (const y of [Math.min(F.ground, boxBottom(m)), 0.9]) {
          pts.push(V(x, y, p.z + D.plate_front), V(x, y, p.z - D.plate_back - 0.6));
        }
      }
      else pts.push(V(x, roof, p.z + b.d), V(x, boxBottom(m) - 0.25, p.z + b.d));
      if (all && !plan) pts.push(V(x, F.ground, p.z + D.plate_front));
    }
  }
  if (!focus) {
    for (const unit of new Set(modules.map((m) => PANE.get(m).plate))) {
      const pl = PLATE.get(unit);
      if (pl.modules.some((m) => state.open.has(m))) continue;
      const bottom = plan ? F.ground : -Math.max(...pl.modules.map((m) => PANE.get(m).box.h)) - 0.3;
      for (const x of [pl.x, pl.x + pl.w]) for (const z of [pl.z - D.plate_back, pl.z + D.plate_front]) {
        pts.push(V(x, 0.9, z), V(x, bottom, z));
      }
    }
  }
  if (!all && !plan && !focus) {
    // row stubs leave through the plates' side ports: keep the street and its label in view
    const units = new Set(modules.map((m) => PANE.get(m).plate));
    const mods = new Set(modules);
    for (const u of units) {
      const pl = PLATE.get(u);
      for (const side of ['left', 'right']) {
        if (!pl.ports[side]) continue;
        // only the street a row stub actually leaves through (prepare.py's scope_extra measures the same)
        const used = view.links.some((l) => {
          if (l.span !== 'row' || mods.has(l.s) === mods.has(l.t)) return false;
          const own = mods.has(l.s) ? l.s : l.t, other = own === l.s ? l.t : l.s;
          return PANE.get(own).plate === u && (PLATE.get(PANE.get(other).plate).x > pl.x) === (side === 'right');
        });
        if (used) pts.push(V(pl.ports[side].x + (side === 'right' ? 3.2 : -3.2), R.bandTop(u), pl.z));
      }
    }
  }
  if (all && !plan) for (const r of plateRibbonObjs) for (let i = 0; i < r.n; i += 4) pts.push(V(r.pts[i * 3], r.pts[i * 3 + 1], r.pts[i * 3 + 2]));
  for (const c of view.classes) {
    const o = boxObjs.get(c.id);
    if (!o || !o.open || !modules.includes(c.module) || !state.open.has(c.module)) continue;
    const zf = c.z + c.d + c.expanded.lift;
    pts.push(V(c.x - 0.6, c.y + 0.5, zf), V(c.x + c.expanded.w + 0.2, c.y - c.expanded.h - 0.2, zf));
  }
  const b = new THREE.Box3().setFromPoints(pts);
  b.pts = pts;
  return b;
}
// the module scope frames the unfolded pane with its neighbours on the plate
function moduleFrame(m) {
  const p = PANE.get(m), row = view.placement.rows[p.row].modules, k = row.indexOf(m);
  const near = [row[k - 1], m, row[k + 1]].filter((q) => q && PANE.get(q).plate === p.plate);
  return near;
}
// the free picture rectangle a fit frames into [x0, x1, y0, y1]: beside the open inspector
function picRect() {
  const bottom = W < 720 && panelMode ? $('#panel').getBoundingClientRect().top - frameEl.getBoundingClientRect().top - 16 : H - PAD_B - 14;
  const top = PAD_T + 12;
  return [18, W - inspPx() - 18, top, Math.max(top + 100, bottom)];
}
function fitGoal(bounds, az, el, margin = 0.92, cutZ = null) {
  return fitCamera(state.proj === 'ortho' ? ortho : persp, bounds, {
    width: W, height: H, rect: picRect(), az, el, margin: Math.min(margin, 0.92), cutZ,
  });
}
let flight = null;
function flyTo(goal, ms = 360) {
  if (goal.box) {
    const distance = goal.position.distanceTo(goal.target);
    controls.minDistance = distance / 8; controls.maxDistance = distance * 4;
    controls.minZoom = (goal.zoom ?? 1) / 4; controls.maxZoom = (goal.zoom ?? 1) * 8;
    controls.cursor.copy(goal.target);
    controls.maxTargetRadius = Math.max(...sceneBounds(frameModules()).getSize(V()).toArray()) * 1.5;
  }
  if (REDUCED) ms = 0;
  if (!!goal.ortho !== !!camera.isOrthographicCamera) useCamera(!!goal.ortho);
  if (camera.isOrthographicCamera && goal.zoom === undefined) goal.zoom = camera.zoom;
  const from = { t: controls.target.clone(), p: camera.position.clone(), zoom: camera.zoom };
  const s0 = new THREE.Spherical().setFromVector3(from.p.clone().sub(from.t));
  const s1 = new THREE.Spherical().setFromVector3(goal.position.clone().sub(goal.target));
  let dTheta = s1.theta - s0.theta;
  if (dTheta > Math.PI) dTheta -= 2 * Math.PI;
  if (dTheta < -Math.PI) dTheta += 2 * Math.PI;
  flight = { start: performance.now(), ms, from, goal, s0, s1, dTheta, near0: camera.near, far0: camera.far };
  dirty = true; schedule();
  if (ms === 0) stepFlight(performance.now() + 1);
}
function stepFlight(now) {
  if (!flight) return false;
  const t = clamp((now - flight.start) / Math.max(1, flight.ms), 0, 1), k = easeOut(t);
  const { from, goal, s0, s1, dTheta } = flight;
  const target = from.t.clone().lerp(goal.target, k);
  const s = new THREE.Spherical(lerp(s0.radius, s1.radius, k), lerp(s0.phi, s1.phi, k), s0.theta + dTheta * k);
  camera.position.copy(target).add(V().setFromSpherical(s));
  controls.target.copy(target);
  camera.lookAt(target);
  if (camera.isOrthographicCamera && goal.zoom) { camera.zoom = Math.exp(lerp(Math.log(from.zoom), Math.log(goal.zoom), k)); camera.updateProjectionMatrix(); }
  if (goal.near !== undefined) {
    camera.near = t >= 1 || goal.near <= flight.near0 ? goal.near : flight.near0;
    camera.far = t >= 1 || goal.far >= flight.far0 ? goal.far : flight.far0;
    camera.updateProjectionMatrix();
  }
  if (t >= 1) { flight = null; controls.update(); }
  return true;
}
const PRESET = {
  axo: { az: -0.3, el: 0.82 },
  plan: { az: 0, el: 1.5 },
  elev: { az: 0, el: 0.06 },
};
const LEVEL_WEIGHT = {
  axo: { call: 1, sky: 1, imp: 0.6, clone: 1 },
  plan: { call: 0.1, sky: 0.05, imp: 1, clone: 0.3 },
  // imports lie on the ground: face-on they collapse into one band, so Elevation leaves them to Plan
  elev: { call: 1, sky: 1, imp: 0, clone: 1 },
};
function frameModules() {
  const f = focusModule();
  if (f) return moduleFrame(f);
  const s = scopeModules();
  return s ? [...s] : view.panes.map((p) => p.module);
}
let cut = null;
function goView(name, ms = 700) {
  state.view = name;
  applyEmphasis('scope');
  document.querySelectorAll('#views [data-view]').forEach((b) => b.classList.toggle('on', b.dataset.view === name));
  const pr = PRESET[name];
  const goal = fitGoal(sceneBounds(frameModules(), { plan: name === 'plan', focus: !!focusModule() }), pr.az, pr.el, name === 'plan' ? 0.93 : 1.02, cut);
  flyTo(goal, ms);
  lastFit = 'view';
  writeHash();
}
let lastFit = null;
// The section clipping plane follows the scope while the reader zooms or orbits.
controls.addEventListener('start', () => { flight = null; lastFit = null; });

// ---------------------------------------------------------------- labels
const _v = V();
function scr(x, y, z) {
  if ((cut !== null && z > cut) || (cutBack !== null && z < cutBack)) return [0, 0, 2];
  _v.set(x, y, z).project(camera);
  return [(_v.x + 1) / 2 * W, (1 - _v.y) / 2 * H, _v.z];
}
const measureCache = new Map();
function fitText(text, px, font) {
  lx.font = font;
  const key = font + '|' + text;
  let w = measureCache.get(key);
  if (w === undefined) { w = lx.measureText(text).width; measureCache.set(key, w); }
  if (w <= px) return text;
  const cw = w / text.length, n = Math.floor(px / cw) - 1;
  return n >= 3 ? text.slice(0, n) + '…' : null;
}
function textWidth(text, font) {
  const key = font + '|' + text;
  let w = measureCache.get(key);
  if (w === undefined) { lx.font = font; lx.letterSpacing = '0px'; w = lx.measureText(text).width; measureCache.set(key, w); }
  return w;
}
// Canvas labels must obey the same occlusion as the WebGL faces beneath them.
const labelRay = new THREE.Raycaster();
const labelPoint = new THREE.Vector3(), labelNdc = new THREE.Vector2();
let labelBodies = [];
function labelVisible(x, y, z) {
  labelPoint.set(x, y, z).project(camera);
  if (Math.abs(labelPoint.x) > 1 || Math.abs(labelPoint.y) > 1 || Math.abs(labelPoint.z) > 1) return false;
  labelNdc.set(labelPoint.x, labelPoint.y);
  labelRay.setFromCamera(labelNdc, camera);
  labelPoint.set(x, y, z);
  labelRay.far = labelRay.ray.origin.distanceTo(labelPoint) - 0.04;
  return !labelRay.intersectObjects(labelBodies, false).some((h) =>
    (cut === null || h.point.z <= cut) && (cutBack === null || h.point.z >= cutBack));
}
// every drawn label is logged (census: count, smallest size, cut names)
const labelLog = [];
// Text printed on a face, anchored at (x0,y) running toward (x1,y), at the first size in
// o.sizes the face can hold (o.room x size px tall) with at least o.minChars characters
// left after truncation (o.whole: the full text or nothing). Nothing is drawn below TYPE.S.
function onFace(x0, x1, y, z, text, o) {
  if (![x0, (x0 + x1) / 2, x1].every((x) => labelVisible(x, y, z))) return false;
  const A = scr(x0, y, z), B = scr(x1, y, z);
  if (A[2] > 1 || B[2] > 1) return false;
  const len = Math.hypot(B[0] - A[0], B[1] - A[1]);
  const hpx = (o.h ?? 0.4) * len / Math.max(0.01, x1 - x0);
  let pick = null;
  for (const size of o.sizes ?? [TYPE.M, TYPE.S]) {
    if (hpx < size * (o.room ?? 1.15)) continue;
    const font = `${o.weight ?? 400} ${size}px ${FONT}`;
    const t = fitText(text, len - 2, font);
    if (!t || (t !== text && (o.whole || (o.minChars && t.length - 1 < o.minChars)))) continue;
    if (t === text) { pick = { t, font, size }; break; }
    if (!pick || t.length > pick.t.length) pick = { t, font, size };
  }
  if (!pick) return false;
  const { t, font, size } = pick;
  lx.save();
  lx.globalAlpha = o.alpha ?? 1;
  lx.translate(A[0], A[1]);
  lx.rotate(Math.atan2(B[1] - A[1], B[0] - A[0]));
  lx.font = font;
  lx.fillStyle = o.color ?? T.text;
  lx.textBaseline = 'middle';
  if (o.spacing) lx.letterSpacing = o.spacing;
  // a halo in the face's own fill, so a call passing over the face never runs through the letters
  if (o.halo) { lx.lineWidth = 3; lx.lineJoin = 'round'; lx.strokeStyle = o.halo; lx.strokeText(t, 0, 0); }
  lx.fillText(t, 0, 0);
  lx.restore();
  if ((o.alpha ?? 1) > 0.25) labelLog.push({ size, text: t, full: text, x: A[0], y: A[1], w: textWidth(t, font), ang: Math.atan2(B[1] - A[1], B[0] - A[0]), kind: o.kind ?? 'face', color: o.color ?? T.text, alpha: o.alpha ?? 1, ground: o.halo ?? null });
  // a name printed on a face is an obstacle for the pills and port labels placed after it
  if (o.obstacle) {
    const L = textWidth(t, font), dx = (B[0] - A[0]) / (len || 1), dy = (B[1] - A[1]) / (len || 1);
    const ex = A[0] + dx * L, ey = A[1] + dy * L;
    placed.push([Math.min(A[0], ex) - 2, Math.min(A[1], ey) - size * 0.6, Math.max(A[0], ex) + 2, Math.max(A[1], ey) + size * 0.6]);
  }
  return t === text ? 'full' : 'cut';
}
// Wrapped text on a face: Python's lines at Python's pitch, one size for every line,
// the largest of o.sizes at which every line fits whole. Returns true if drawn.
function onFaceLines(x0, x1, yTop, h, pitch, z, lines, o) {
  const A = scr(x0, yTop, z), B = scr(x1, yTop, z);
  if (A[2] > 1 || B[2] > 1) return false;
  const len = Math.hypot(B[0] - A[0], B[1] - A[1]), ppu = len / Math.max(0.01, x1 - x0);
  const n = lines.length, step = n === 1 ? h : pitch;
  for (const size of o.sizes ?? [TYPE.M, TYPE.S]) {
    if (step * ppu < size * (o.room ?? 1.1)) continue;
    const font = `${o.weight ?? 400} ${size}px ${FONT}`;
    if (lines.some((t) => textWidth(t, font) > len - 2)) continue;
    // close up, the lines of one name keep a type-sized spacing, centred in the row
    const sp = Math.min(pitch, (size * 1.3) / ppu), top = yTop - (h - n * sp) / 2;
    lines.forEach((t, j) => onFace(x0, x1, n === 1 ? yTop - h / 2 : top - sp / 2 - j * sp, z, t, { ...o, h: n === 1 ? h : pitch, sizes: [size], room: o.room ?? 1.1, whole: true, obstacle: true }));
    return true;
  }
  return false;
}
const placed = [];
const overlaps = (r, q) => r[0] < q[2] && r[2] > q[0] && r[1] < q[3] && r[3] > q[1];
function freeRect(r) {
  for (const q of placed) if (overlaps(r, q)) return false;
  placed.push(r);
  return true;
}
function labelRect(P, text, o) {
  const font = `${o.weight ?? 400} ${o.size ?? 11}px ${FONT}`;
  lx.font = font;
  lx.letterSpacing = o.spacing ?? '0px';
  const w = lx.measureText(text).width, sz = o.size ?? 11;
  let x0 = P[0] + (o.dx ?? 0) - (o.align === 'center' ? w / 2 : o.align === 'right' ? w : 0);
  const y0 = P[1] + (o.dy ?? 0);
  // a label whose anchor is in the picture stays whole inside it
  if (P[0] >= PAD_L && P[0] <= picRight) x0 = clamp(x0, PAD_L + 6, picRight - 10 - w);
  return { w, x0, y0, rect: [x0 - (o.pill ? 6 : 3), y0 - sz * (o.pill ? 1.05 : 0.8), x0 + w + (o.pill ? 6 : 3), y0 + sz * 0.5] };
}
function drawTag(text, L, o) {
  const sz = o.size ?? 11;
  if ((o.alpha ?? 1) > 0.25) labelLog.push({ size: sz, text, full: o.full ?? text, x: L.x0, y: L.y0, w: L.w, ang: 0, kind: o.kind ?? 'tag', color: o.color ?? T.muted, alpha: o.alpha ?? 1, ground: o.pill ? K.pill : o.halo ? K.halo : null });
  lx.font = `${o.weight ?? 400} ${sz}px ${FONT}`;
  lx.letterSpacing = o.spacing ?? '0px';
  lx.globalAlpha = o.alpha ?? 1;
  if (o.pill) {
    lx.fillStyle = K.pill; lx.strokeStyle = o.pillLine ?? K.pillLine; lx.lineWidth = 1;
    lx.beginPath(); lx.roundRect(L.x0 - 4, L.y0 - sz * 0.95, L.w + 8, sz * 1.35, 3); lx.fill(); lx.stroke();
  } else if (o.halo) {
    // the halo (and a backdrop for names where calls rise) stays nearly opaque when the
    // name is dimmed, so a lit call never runs through a dimmed name
    lx.globalAlpha = Math.min(1, (o.alpha ?? 1) * 1.6);
    if (o.backdrop) { lx.fillStyle = K.backdrop; lx.fillRect(L.x0 - 2, L.y0 - sz * 0.82, L.w + 4, sz * 1.12); }
    lx.lineWidth = 4; lx.lineJoin = 'round'; lx.strokeStyle = K.halo; lx.strokeText(text, L.x0, L.y0);
    lx.globalAlpha = o.alpha ?? 1;
  }
  lx.fillStyle = o.color ?? T.muted;
  lx.fillText(text, L.x0, L.y0);
  lx.letterSpacing = '0px';
  lx.globalAlpha = 1;
}
function tag(x, y, z, text, o = {}) {
  if (!o.at && !labelVisible(x, y, z)) return false;
  const P = o.at ?? scr(x, y, z);
  if (P[2] > 1) return false;
  const L = labelRect(P, text, o);
  if (o.inside && (L.rect[0] < PAD_L + 4 || L.rect[2] > W - 8 || L.rect[1] < PAD_T + 12 || L.rect[3] > H - PAD_B)) return false;
  if (o.force) placed.push(L.rect);
  else if (!freeRect(L.rect)) return false;
  drawTag(text, L, o);
  return true;
}
function tagSearch(x, y, z, text, o, offsets) {
  if (!o.at && !labelVisible(x, y, z)) return false;
  const P = o.at ?? scr(x, y, z);
  if (P[2] > 1) return false;
  let best = null;
  for (const [dx, dy] of offsets) {
    const L = labelRect(P, text, { ...o, dx: (o.dx ?? 0) + dx, dy: (o.dy ?? 0) + dy });
    const cost = placed.reduce((s, q) => s + (overlaps(L.rect, q) ? (Math.min(L.rect[2], q[2]) - Math.max(L.rect[0], q[0])) * (Math.min(L.rect[3], q[3]) - Math.max(L.rect[1], q[1])) : 0), 0);
    if (!best || cost < best.cost) best = { L, cost };
    if (cost === 0) break;
  }
  if (best.cost > 0 && !o.force) return false;
  placed.push(best.L.rect);
  drawTag(text, best.L, o);
  return true;
}
function fogAlpha(x, y, z) {
  const d = camera.position.distanceTo(_v.set(x, y, z));
  return 1 - clamp((d - scene.fog.near) / (scene.fog.far - scene.fog.near), 0, 0.85);
}
function boxRect(o) {
  const b = o.b, z = o.p.z + b.d;
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (const [x, y] of [[b.x, 0], [b.x + b.w, 0], [b.x, -o.h], [b.x + b.w, -o.h]]) {
    const P = scr(x, y, z);
    if (P[2] > 1) return null;
    x0 = Math.min(x0, P[0]); x1 = Math.max(x1, P[0]); y0 = Math.min(y0, P[1]); y1 = Math.max(y1, P[1]);
  }
  return [x0, y0, x1, y1];
}
// world point at the top of an id's mark: its card or class row when its module is
// unfolded, else its slot on the folded box (row, tail, band or ghost row)
function anchorTop(id) {
  const n = N.get(id), m = moduleOf(id);
  if (state.open.has(m)) {
    if (n && n.x !== undefined && !(n.cls && CL.has(n.cls) && !n.dead)) return [n.x + n.w / 2, n.y, n.z + 0.02];
    const cl = CL.get(n ? n.cls : id), g = boxGeom(cl), ri = n ? g.rows.indexOf(id) : -1;
    if (ri >= 0) return [cl.x + cl.w / 2, rowY(cl, ri) + D.box_row / 2, g.zf];
    return [g.cx, cl.y, g.zf];
  }
  const p = PANE.get(m), b = p.box, s = SLOT.get(`${m}|${slotOf(id)}`);
  return [b.x + b.w / 2, -s.y, p.z + b.d + 0.01];
}
let hoverLabelDrawn = false, picRight = 1280;
const CALLOUT_BUDGET = 6; // floating labels supplement the face text without covering the map
function drawLabels() {
  lx.setTransform(DPR, 0, 0, DPR, 0, 0);
  lx.clearRect(0, 0, W, H);
  placed.length = 0;
  labelLog.length = 0;
  labelBodies = [
    ...[...plateObjs.values()].filter((o) => o.walls.visible).flatMap((o) => o.walls.children),
    ...[...modObjs.values()].filter((o) => o.body.visible && !cutAway(o.p.module)).map((o) => o.body),
    ...[...boxObjs.values()].filter((o) => o.group.visible).map((o) => o.box),
  ];
  hoverLabelDrawn = false;
  const G = guideStep(), ctx = viewCtx();
  const gFocus = G ? new Set(G.focus) : null;
  const HC = hoverFocus();
  const hcLine = state.hoverLine?.startsWith('call:') ? view.edges[+state.hoverLine.slice(5)] : null;
  const hotId = (id) => state.hover === id || state.selected?.id === id || state.inspect?.id === id || (!!HC && HC.targets.has(id)) || (!!hcLine && (hcLine.s === id || hcLine.t === id));
  // Label budget per view, on the surface track's marks:
  //   overview  package names (L); on hover or selection, the modules involved (M)
  //   plan      package names (L), module names (S)
  //   package   module names (L) in a header row, public rows (M or S), port labels (S)
  //   module    module name (L), cards, class rows (M or S), neighbours' names (M), port labels (S)
  //   guide     the step's modules (L, muted), its lit rows and cards (M), evidence in pills (M)
  // the panels are obstacles: a label never hides under the side panel, the top bar or the rail
  const insp = inspPx();
  picRight = W - insp;
  placed.push([0, 0, PAD_L, H], [0, 0, W, PAD_T + 10], [PAD_L, H - PAD_B + 4, W, H]);
  if (insp) placed.push([W - insp, 0, W, H]);
  for (const id of ['#key', '#help', '#panel', '#cameraTools']) if (!$(id).classList.contains('hidden')) { const r = $(id).getBoundingClientRect(), f = frameEl.getBoundingClientRect(); placed.push([r.left - f.left - 4, r.top - f.top - 4, r.right - f.left + 4, r.bottom - f.top + 4]); }
  lx.textBaseline = 'alphabetic';
  // ---- one package name on its enclosure; Plan keeps the label on the base
  const pkgColour = G ? (G.lod === 'plate' ? T.text : T.muted) : ctx === 'module' ? T.dim : ctx === 'package' || SEL ? T.muted : T.text;
  const fronts = state.view === 'plan' ? [] : [...modObjs.values()].filter((o) => o.a > 0.2).map((o) => ({ row: o.p.row, open: o.u > 0.05, r: boxRect(o) })).filter((q) => q.r);
  // wide plates first: a narrow plate's name may overhang its edge, never another name
  for (const o of [...plateObjs.values()].sort((a, b) => b.d.w - a.d.w)) {
    const d = o.d;
    const labelY = state.view === 'plan' ? F.ground : 0.9;
    const labelZ = state.view === 'plan' ? d.z + D.plate_front : d.z - D.plate_back;
    if (o.a < 0.4) continue;
    const A = scr(d.x, labelY, labelZ), B = scr(d.x + d.w, labelY, labelZ);
    if (A[2] > 1 || B[2] > 1 || Math.abs(B[0] - A[0]) < 24) continue;
    const focusPlate = !G || G.lod === 'plate' || d.modules.some((m) => gFocus.has(m));
    const text = d.name.toUpperCase(), opt = { size: TYPE.L, spacing: '0.14em', color: focusPlate ? pkgColour : T.dim, weight: 700, halo: true, dy: -4, kind: 'plate' };
    const cover = fronts.filter((q) => q.row > d.row || q.open).map((q) => q.r);
    let best = null;
    for (let k = 0; k < 9; k++) {
      const x = d.x + 0.3 + (k / 8) * Math.max(0, d.w - 0.6);
      const P = scr(x, labelY, labelZ), L = labelRect(P, text, opt);
      if (L.rect[2] > Math.max(A[0], B[0]) + 4) break;
      if (placed.some((q) => overlaps(L.rect, q))) continue;
      const hit = cover.reduce((s, r) => s + (overlaps(L.rect, r) ? (Math.min(L.rect[2], r[2]) - Math.max(L.rect[0], r[0])) * (Math.min(L.rect[3], r[3]) - Math.max(L.rect[1], r[1])) : 0), 0);
      if (!best || hit < best.hit) best = { L, hit, x };
      if (hit === 0) break;
    }
    if (!best) {
      // a plate narrower than its name: the name overhangs the edge where free
      const P = scr(d.x + 0.3, labelY, labelZ), L = labelRect(P, text, opt);
      if (placed.some((q) => overlaps(L.rect, q))) continue;
      best = { L, x: d.x + 0.3 };
    }
    placed.push(best.L.rect);
    drawTag(text, best.L, { ...opt, alpha: o.a * fogAlpha(best.x, labelY, labelZ) });
  }
  // ---- module names, by the view's budget
  const involved = new Set();
  if (ctx === 'overview' && !G) {
    const hb = state.hoverBox, hl = state.hoverLine;
    if (hb) for (const l of view.links) if (l.s === hb || l.t === hb) { involved.add(l.s); involved.add(l.t); }
    if (hl) { const [k, id] = hl.split(':'); const ls = k === 'link' ? [view.links[+id]] : view.plate_bundles[+id].bundles.flatMap((i) => view.bundles[i].links.map((li) => view.links[li])); for (const l of ls) { involved.add(l.s); involved.add(l.t); } }
    if (SEL) for (const m of SEL.modules) involved.add(m);
  }
  const named = [];
  for (const o of modObjs.values()) {
    if (o.a < 0.2) continue;
    const m = o.p.module, hot = state.hoverBox === m;
    let size, color, weight = 700;
    if (G && G.lod !== 'plate') { if (!gFocus.has(m)) continue; [size, color] = [TYPE.L, hot ? T.lit : state.open.has(m) ? T.text : T.muted]; }
    else if (G) { if (!hot) continue; [size, color] = [TYPE.M, T.lit]; }
    else if (ctx === 'package') { if (!scopeModules().has(m)) continue; [size, color] = [TYPE.L, hot ? T.lit : T.text]; }
    else if (ctx === 'module') { if (!scopeModules().has(m)) continue; [size, color] = m === focusModule() ? [TYPE.L, T.text] : [TYPE.M, hot ? T.lit : T.muted]; }
    else if (ctx === 'plan') [size, color, weight] = [TYPE.S, hot ? T.lit : T.muted, 400];
    else if (hot) [size, color] = [TYPE.M, T.lit];
    else if (involved.has(m)) [size, color, weight] = [TYPE.M, T.muted, 400];
    else continue;
    named.push({ o, size, color, weight, hot });
  }
  // In a face-on scope (or a guide step) the names stand in a header row above the plate's
  // track band, so no track passes behind them; elsewhere above the box header. One size per
  // name; left to right a name takes the first free line of three, else it is cut to its box.
  const faceOn = state.view === 'elev';
  const lines = new Map();
  named.sort((a, b) => b.o.p.row - a.o.p.row || a.o.b.x - b.o.b.x);
  for (const h of named) {
    const o = h.o, b = o.b, z = o.p.z + b.d + 0.01;
    const y = faceOn ? R.bandTop(o.p.plate) + 0.42 : state.view === 'plan' ? 0 : 0.12;
    const P = scr(b.x + (faceOn ? 0.04 : b.w / 2), y, faceOn ? z : state.view === 'plan' ? o.p.z + b.d / 2 : z);
    if (P[2] > 1 || !labelVisible(b.x + b.w / 2, y, z)) continue;
    // a guide frame can be tighter than the header row: the name then stands just above its box
    if (faceOn && P[1] < PAD_T + 16 + 2 * (h.size + 4)) { const Q = scr(b.x + 0.04, 0.16, z); if (Q[2] <= 1) { P[0] = Q[0]; P[1] = Q[1]; } }
    const name = o.p.name + (faceOn ? '.py' : ''), font = `${h.weight} ${h.size}px ${FONT}`;
    const opt = { size: h.size, weight: h.weight, color: h.color, alpha: o.a * fogAlpha(b.x, 0, o.p.z), halo: true, backdrop: true, align: faceOn ? 'left' : 'center', dy: -4, kind: 'module', full: name };
    const key = faceOn ? o.p.plate : 'all';
    if (!lines.has(key)) lines.set(key, [[], [], []]);
    const L3 = lines.get(key), step = h.size + 4;
    const boxPx = Math.abs(scr(b.x + b.w, y, z)[0] - scr(b.x, y, z)[0]);
    const cut = fitText(name, Math.max(boxPx - 4, 40), font);
    let done = false;
    for (const [li, text] of [[0, name], [1, name], [2, name], [0, cut]]) {
      if (!text) continue;
      const L = labelRect([P[0], P[1] - li * step], text, opt);
      if (L.rect[1] < PAD_T + 12) continue;
      if (L3[li].some((r) => overlaps(L.rect, r)) || placed.some((q) => overlaps(L.rect, q))) continue;
      L3[li].push(L.rect); placed.push(L.rect); drawTag(text, L, opt);
      if (h.hot && text === name) hoverLabelDrawn = true;
      done = true;
      break;
    }
    if (!done && h.size === TYPE.S) continue; // Plan: a name with no free spot is left to the hover
  }
  // Top-down views show modules and imports; function rows would overlap edge-on.
  if (state.view === 'plan' || (ctx === 'overview' && !state.selected && !state.hover)) return;
  // ---- rows of the folded boxes: public names and ghost names, Python's lines at the
  // box's pitch, one size per name (M or S); a name that does not fit whole is not drawn
  // (a lit one gets a callout under its box, where the slot is always empty)
  const rowCallouts = [], drawnIds = new Set();
  // an opened class block stands in front of its neighbours: no neighbour name prints through it
  const occ = [];
  for (const bo of boxObjs.values()) {
    if (!bo.open || !bo.group.visible) continue;
    const cl = bo.cl, g = boxGeom(cl), A = scr(cl.x - 0.1, cl.y + 0.1, g.zf), B = scr(cl.x + g.w + 0.1, cl.y - g.h - 0.1, g.zf);
    if (A[2] <= 1 && B[2] <= 1) occ.push([Math.min(A[0], B[0]), Math.min(A[1], B[1]), Math.max(A[0], B[0]), Math.max(A[1], B[1])]);
  }
  const hidden = (b, z, y0, y1) => {
    if (!occ.length) return false;
    const A = scr(b.x, y0, z), B = scr(b.x + b.w, y1, z), r = [Math.min(A[0], B[0]), Math.min(A[1], B[1]), Math.max(A[0], B[0]), Math.max(A[1], B[1])];
    return occ.some((q) => overlaps(r, q));
  };
  for (const o of modObjs.values()) {
    const ra = o.a * o.rowsA * (1 - ease(o.u));
    const m = o.p.module;
    if (SEL && SEL.modules.has(m) && o.a > 0.5 && o.u < 0.5) for (const r of o.b.rows) if (SEL.slots.has(`${m}|${r.slot}`)) rowCallouts.push({ o, r });
    if (ra < 0.2) continue;
    // names inside a box: tier 1 in a scope, tier 2 for a guide step's module, none on a neighbour (tier 3)
    if (o.tier === 3) continue;
    const b = o.b, z = o.p.z + b.d + 0.012, fa = ra * fogAlpha(b.x, 0, o.p.z);
    for (const r of b.rows) {
      if (hidden(b, z, -r.y, -r.y - r.h)) continue;
      const lit = SEL && SEL.slots.has(`${m}|${r.slot}`);
      const hot = hotId(r.id);
      const color = hot ? T.lit : lit ? (HC ? T.muted : T.lit) : o.tier === 1 ? (r.kind === 'class' ? T.soft : T.text) : T.muted;
      const x0 = b.x + (r.kind === 'class' ? 0.2 : 0.18);
      // row names keep a halo in their face colour (a clone row's in its tint), so a curve that
      // crosses a box runs under its letters and the purple underline never cuts a letter
      const halo = r.clone ? cssHex(mixHex(C.modFront, C.cloneFill, C.cloneFillA)) : hex(r.kind === 'class' ? C.classRow : C.modFront);
      const ok = onFaceLines(x0, b.x + b.w - 0.08, -r.y, r.h, b.line, z, r.lines, { sizes: r.wrapper ? [TYPE.S] : [TYPE.M, TYPE.S], weight: BOLD(r) ? 700 : 400, color, alpha: fa * (SEL && !lit && !G ? 0.45 : 1), halo, kind: 'row' });
      if (ok) {
        drawnIds.add(r.id);
        if (hot) hoverLabelDrawn = true;
        const k = rowCallouts.findIndex((q) => q.r === r);
        if (k >= 0) rowCallouts.splice(k, 1);
      }
    }
    for (const gr of b.ghosts) {
      if (gr.id === null || hidden(b, z, -gr.y, -gr.y - gr.h)) continue;
      const lit = SEL && SEL.depth.has(gr.id);
      if (onFaceLines(b.x + 0.18, b.x + b.w - 0.1, -gr.y, gr.h, b.line, z, gr.lines, { sizes: [TYPE.S], color: lit ? T.lit : T.text, alpha: fa, halo: cssHex(mixHex(C.modFront, C.deadFill, C.deadFillA)), kind: 'row' })) drawnIds.add(gr.id);
    }
  }
  // ---- class blocks in unfolded panes: name, caption, rows, fields
  const inner = ctx === 'module' ? T.text : T.muted;
  const rowNamed = new Set();
  for (const o of boxObjs.values()) {
    const mo = modObjs.get(o.cl.module), ka = o.a * mo.a * ease(mo.u);
    if (ka < 0.2 || !o.group.visible) continue;
    const cl = o.cl, g = boxGeom(cl), z = g.zf + 0.01, fa = ka * fogAlpha(cl.x, cl.y, cl.z);
    const hotBox = hotId(cl.id);
    const litBox = SEL && SEL.classes.has(cl.id);
    const A = scr(cl.x, cl.y, z), B = scr(cl.x + g.w, cl.y, z);
    const headPx = D.box_head * Math.hypot(B[0] - A[0], B[1] - A[1]) / g.w;
    // the caption (CLASS, DATACLASS) only where the header holds two lines
    const two = headPx >= 2.4 * TYPE.S;
    const ok = onFace(cl.x + 0.1, cl.x + g.w - 0.1, cl.y - D.box_head * (two ? 0.36 : 0.5), z, cl.name, { h: two ? D.box_head * 0.5 : D.box_head, sizes: [TYPE.M, TYPE.S], room: 1.05, weight: 700, color: hotBox ? T.lit : litBox ? T.text : inner, alpha: fa, halo: hex(C.boxHead), kind: 'card' });
    if (!ok) continue;
    if (ok === 'full') drawnIds.add(cl.id);
    if (two) onFace(cl.x + 0.1, cl.x + g.w - 0.1, cl.y - D.box_head * 0.78, z, cl.data_only ? 'DATACLASS' : 'CLASS', { h: D.box_head * 0.5, sizes: [TYPE.S], room: 1, color: T.dim, alpha: fa, spacing: '0.06em', kind: 'caption' });
    g.rows.forEach((m, i) => {
      const n = N.get(m), y = rowY(cl, i);
      const lit = SEL && SEL.depth.has(m);
      const color = hotId(m) ? T.lit : lit ? T.text : n.private ? T.muted : inner;
      const r = onFace(cl.x + 0.16, cl.x + cl.w - 0.08, y, z, n.name + (m === cl.ctor ? '(' + n.params.filter((p) => p !== 'self').join(', ') + ')' : ''), { h: D.box_row, sizes: [TYPE.M, TYPE.S], room: 1.05, minChars: 7, weight: BOLD(n) ? 700 : 400, color, alpha: fa * (SEL && !lit ? 0.4 : 1), halo: hex(C.boxFront), kind: 'card' });
      if (r === 'full') { rowNamed.add(m); drawnIds.add(m); }
    });
    if (cl.data_only) cl.fields.forEach((f, j) => onFace(cl.x + 0.12, cl.x + g.w - 0.08, cl.y - D.box_head - D.box_field * (j + 0.5), z, (f.kind === 'owned' ? '◆ ' : f.kind === 'injected' ? '◇ ' : '  ') + f.name, { h: D.box_field, sizes: [TYPE.S], room: 0.95, color: T.muted, alpha: fa, kind: 'card' }));
    if (g.open && cl.fields.length && !cl.data_only) {
      const fx = cl.x + cl.w + 0.45;
      onFace(fx - 0.15, cl.x + g.w - 0.06, cl.y - D.box_head * 0.78, z, 'state', { h: D.box_head * 0.55, sizes: [TYPE.S], room: 0.95, color: T.dim, alpha: fa, kind: 'caption' });
      cl.fields.forEach((f, j) => onFace(fx - 0.15, cl.x + g.w - 0.06, cl.y - D.box_head - D.box_field * (j + 0.5), z, (f.kind === 'owned' ? '◆ ' : f.kind === 'injected' ? '◇ ' : '  ') + f.name, { h: D.box_field, sizes: [TYPE.S], room: 0.95, color: f.kind ? inner : T.dim, alpha: fa, kind: 'card' }));
    }
  }
  // ---- function cards in unfolded panes: Python's lines, one size for every line
  const callouts = [];
  for (const o of cardObjs.values()) {
    if (!o.border.visible || o.border.material.opacity < 0.3) continue;
    const n = o.n, fa = o.border.material.opacity * fogAlpha(n.x, n.y, n.z);
    if (occ.length) { const A = scr(n.x, n.y, n.z), B = scr(n.x + n.w, n.y - n.h, n.z); if (occ.some((q) => overlaps([Math.min(A[0], B[0]), Math.min(A[1], B[1]), Math.max(A[0], B[0]), Math.max(A[1], B[1])], q))) continue; }
    const hot = hotId(n.id);
    const lit = SEL && SEL.depth.has(n.id);
    const color = hot ? T.lit : n.dead || lit || (!G && ctx === 'module') ? T.text : T.muted;
    // names on a signal card keep a halo in the card's tinted fill
    const face = n.dead ? mixHex(C.card, C.deadFill, C.deadFillA) : n.clone !== null ? mixHex(C.card, C.cloneFill, C.cloneFillA) : C.card;
    const lines = n.lines ?? [n.name];
    const ok = onFaceLines(n.x + 0.1, n.x + n.w - 0.05, n.y, n.h, Math.min(0.24, n.h / lines.length), n.z + 0.02, lines, { sizes: n.wrapper ? [TYPE.S] : [TYPE.M, TYPE.S], room: 1.05, weight: BOLD(n) ? 700 : 400, alpha: fa, color, halo: cssHex(face), kind: 'card' });
    if (ok) { drawnIds.add(n.id); if (hot) hoverLabelDrawn = true; }
    else if (lit) callouts.push([SEL.depth.get(n.id), n, n.cls ? `${CL.get(n.cls).name}.${n.name}` : n.name]);
  }
  // ---- evidence: name visible guide evidence in collision-free pills when it cannot
  // fit on its face; the panel retains the complete evidence list.
  let budget = CALLOUT_BUDGET;
  if (G) {
    for (const id of G.evidence) {
      if (budget <= 0) break;
      const n = N.get(id);
      if (drawnIds.has(id) || rowNamed.has(id)) continue;
      const P = anchorTop(id);
      const label = n ? (n.cls ? `${CL.get(n.cls)?.name}.${n.name}` : n.name) : CL.get(id).name;
      if (tagSearch(P[0], P[1], P[2], label, { size: TYPE.M, align: 'center', dy: -6, pill: true, pillLine: K.pillLineStrong, color: T.lit, weight: 700, kind: 'callout' }, [[0, 0], [0, -18], [0, 16], [0, -36], [-90, 0], [90, 0]])) budget--;
    }
  }
  // ---- the stub rule's pills: a pill step ends each call that leaves the root's row at the
  // card edge (right edge going out, left edge coming in), naming the far end and its package
  if (G && G.stub === 'pill') drawPills(G, HC);
  // ---- callouts for lit rows and cards too small for their names
  const perModule = new Set(G && G.part === 'pipeline' ? G.evidence.map((id) => moduleOf(id)) : []);
  {
    const below = new Map();
    for (const { o, r } of rowCallouts) {
      if (!hotId(r.id)) continue;
      if (G && G.evidence.includes(r.id)) continue;
      if (hidden(o.b, o.p.z + o.b.d, -r.y, -r.y - r.h)) continue; // behind an opened class block
      if (G && G.part === 'pipeline') { if (perModule.has(o.p.module)) continue; perModule.add(o.p.module); }
      if (budget-- <= 0) break;
      const j = below.get(o) ?? 0;
      below.set(o, j + 1);
      const b = o.b;
      tagSearch(b.x + b.w / 2, -o.h, o.p.z + b.d, r.name, { size: TYPE.M, align: 'center', dy: 18 + j * 18, pill: true, color: T.text, weight: BOLD(r) ? 700 : 400, kind: 'callout' }, [[0, 0], [0, 18], [0, 36], [-70, 0], [70, 0], [0, 54], [-70, 18], [70, 18], [0, 72]]);
    }
  }
  callouts.sort((a, b) => (b[1].id === state.selected?.id) - (a[1].id === state.selected?.id) || a[0] - b[0] || a[1].y - b[1].y);
  for (const [, n, label] of callouts) {
    if (G && G.evidence.includes(n.id)) continue;
    if (G && G.part === 'pipeline') { if (perModule.has(n.module)) continue; perModule.add(n.module); }
    if (budget-- <= 0) break;
    const o = { size: TYPE.M, align: 'center', dy: -5, pill: true, color: T.text, weight: BOLD(n) ? 700 : 400, force: n.id === state.selected?.id, kind: 'callout' };
    if (G) tagSearch(n.x + n.w / 2, n.y, n.z + 0.02, label, o, [[0, 0], [0, -16], [0, 16], [-70, 0], [70, 0], [0, -32]]);
    else tag(n.x + n.w / 2, n.y, n.z + 0.02, label, o);
  }
  // ---- port labels: where calls leave or enter the scope, name the partner plates
  if (state.scope) {
    const groups = new Map();
    for (const o of [...edgeObjs, ...linkObjs]) {
      if (!o.stub?.label || o.a < (G ? 0.5 : 0.3)) continue; // the guide labels only its lit stubs
      const lb = o.stub.label;
      if (!groups.has(lb.key)) groups.set(lb.key, { ...lb, pts: [], others: new Set() });
      groups.get(lb.key).pts.push(lb.at);
      groups.get(lb.key).others.add(PLATE.get(lb.other).name);
    }
    const UP = [[0, 0], [0, -12], [0, -24], [0, -36], [-60, 0], [60, 0], [-60, -12], [60, -12], [0, -48]];
    for (const g of [...groups.values()].sort((a, b) => a.key.localeCompare(b.key))) {
      const text = `${g.out ? '→' : '←'} ${[...g.others].sort().join(' · ')}`;
      let y = Math.max(...g.pts.map((v) => v[1]));
      if (g.kind === 'sky') {
        y = Math.max(y, R.skyBase(PANE.get(g.module).plate) - 0.2);
        const x = g.pts.reduce((s, v) => s + v[0], 0) / g.pts.length;
        tagSearch(x, y, g.z, text, { size: TYPE.S, align: 'center', color: T.muted, halo: true, dy: -4, kind: 'port' }, UP);
      } else {
        const right = g.side === 'right';
        tagSearch(g.x, y, g.z, text, { size: TYPE.S, align: right ? 'left' : 'right', dx: right ? 2 : -2, color: T.muted, halo: true, dy: -5, kind: 'port' }, [[0, 0], [0, -12], [0, 12], [0, -24], [0, 24]]);
      }
    }
  }
  // ---- hover tooltip when the hovered thing does not carry its own full name
  const hid = state.hover;
  if (hid && !hoverLabelDrawn) {
    const n = N.get(hid), cl = CL.get(hid);
    tooltip(n ? (n.cls ? `${CL.get(n.cls).name}.${n.name}` : n.name) : cl ? cl.name : '', n ? n.module : cl ? cl.module : '');
  } else if (state.hoverBox && !hid && !hoverLabelDrawn) {
    const p = PANE.get(state.hoverBox), b = p.box;
    const pub = b.rows.length + (b.more ? b.more.lines : 0);
    tooltip(p.name + '.py', pub ? `${p.module}` : `${p.module} · no public names`);
  } else if (state.hoverLine?.startsWith('call:')) {
    callPill(+state.hoverLine.slice(5));
  } else if (state.hoverLine) {
    const [kind, id] = state.hoverLine.split(':');
    tooltip(lineTitle(kind, +id), lineSub(kind, +id));
  }
}
// the signal a function carries, as a token name (dead, clone, load-bearing), or null
const sigKey = (id) => { const n = N.get(id); return !n ? null : n.dead ? 'dead' : n.clone !== null ? 'clone' : n.lb ? 'lb' : null; };
function sigBar(x, y, h, id) { const k = sigKey(id); if (!k) return; lx.fillStyle = hex(C[k]); lx.fillRect(x + 2, y + 3, 3, h - 6); }
// the hovered call, caller -> callee, in a pill by the pointer (module names below, dim)
function callPill(ei) {
  const e = view.edges[ei];
  const text = `${endName(e.s)} → ${endName(e.t)}`;
  const sub = e.ms === e.mt ? `inside ${PANE.get(e.ms).name}.py` : `${PANE.get(e.ms).name}.py → ${PANE.get(e.mt).name}.py`;
  const [mx, my] = state.mouse;
  lx.font = `700 ${TYPE.M}px ${FONT}`; lx.letterSpacing = '0px';
  const w1 = lx.measureText(text).width;
  lx.font = `400 ${TYPE.S}px ${FONT}`;
  const w2 = lx.measureText(sub).width;
  const w = Math.max(w1, w2) + 14, h = 32;
  // the first spot around the pointer that leaves both ends of the call in sight
  const ends = [e.s, e.t].map((id) => {
    const r = frameRect(id, state.open, state.expanded), A = scr(r.x0, r.y0, r.z), B = scr(r.x1, r.y1, r.z);
    return [Math.min(A[0], B[0]) - 4, Math.min(A[1], B[1]) - 4, Math.max(A[0], B[0]) + 4, Math.max(A[1], B[1]) + 4];
  });
  // the first spot that leaves both ends and every placed name in sight; else both ends
  const spots = [[12, -h - 16], [-w - 12, -h - 16], [12, 16], [-w - 12, 16], [-w - 16, -h / 2], [16, -h / 2], [12, -h - 44], [-w - 12, -h - 44], [12, 44], [-w - 12, 44], [12, -h - 80], [-w - 12, -h - 80], [-w / 2, -h - 110], [12, 80], [-w - 12, 80], [-w / 2, 120]]
    .map(([dx, dy]) => [clamp(mx + dx, PAD_L + 4, picRight - w - 6), clamp(my + dy, PAD_T + 14, H - PAD_B - h - 4)]);
  const clear = (q) => !ends.some((r) => overlaps([q[0], q[1], q[0] + w, q[1] + h], r));
  const free = (q) => clear(q) && !placed.some((r) => overlaps([q[0], q[1], q[0] + w, q[1] + h], r));
  const [x, y] = spots.find(free) ?? spots.find(clear) ?? spots[0];
  lx.globalAlpha = 1;
  lx.fillStyle = K.pill; lx.strokeStyle = K.pillLineStrong; lx.lineWidth = 1;
  lx.beginPath(); lx.roundRect(x, y, w, h, 4); lx.fill(); lx.stroke();
  sigBar(x, y, h, e.t);
  lx.fillStyle = T.lit; lx.font = `700 ${TYPE.M}px ${FONT}`; lx.fillText(text, x + 7, y + 13);
  lx.fillStyle = T.dim; lx.font = `400 ${TYPE.S}px ${FONT}`; lx.fillText(sub, x + 7, y + 26);
  labelLog.push({ size: TYPE.M, text, full: text, x, y, kind: 'pill' });
}
// A pill: "→ callee · package" (out) or "← caller · package" (in), at the edge of the mark
// that makes the call. A folded box's slot hangs its pills under the box, where the glass
// column is always empty, on a short tick down the box's right (out) or left (in) edge; an
// unfolded card puts them beside its edge. Pills of one mark stack; a hovered call's pill
// lights. Python lists the pills (prepare.py row_rule); nothing is drawn off the row.
function drawPills(G, HC) {
  const stack = new Map();
  // boxes on screen are obstacles too: a pill never covers a box's rows
  const boxes = [...modObjs.values()].filter((o) => o.a > 0.15).map((o) => ({ m: o.p.module, r: boxRect(o) })).filter((q) => q.r);
  const blocked = (rc, own) => placed.some((pr) => overlaps(rc, pr)) || boxes.some((q) => q.m !== own && overlaps(rc, q.r));
  for (const q of G.pills) {
    const r = frameRect(q.at, state.open, state.expanded), out = q.dir === 'out';
    const m = moduleOf(q.at), folded = !state.open.has(m);
    const yc = (r.y0 + r.y1) / 2, E = scr(out ? r.x1 : r.x0, yc, r.z);
    if (E[2] > 1) continue;
    const key = folded ? `${m}|${q.dir}` : `${q.at}|${q.dir}`, j = stack.get(key) ?? 0;
    stack.set(key, j + 1);
    const hot = !!HC && HC.edges.has(q.edge);
    const name = `${out ? '→' : '←'} ${q.name}`, pkg = ` · ${q.package}`;
    const f1 = `700 ${TYPE.M}px ${FONT}`, f2 = `400 ${TYPE.S}px ${FONT}`;
    const w = textWidth(name, f1) + textWidth(pkg, f2) + 12, h = 16, gap = 4;
    let x, y, tick;
    if (folded) {
      // under the box: the tick runs down the box edge from the slot to the pill
      const o = modObjs.get(m), b = o.b, B = scr(out ? b.x + b.w : b.x, -o.h, r.z);
      const tx = E[0] + (out ? 5 : -5);
      x = out ? tx - 8 : tx + 8 - w;
      // a pill stays whole in the picture: near its edge it hangs the other way from the tick
      if (x + w > picRight - 8) x = tx + 8 - w;
      if (x < PAD_L + 6) x = tx - 8;
      y = B[1] + 8 + j * (h + gap);
      for (let k = 0; k < 40 && blocked([x, y, x + w, y + h], m); k++) y += 6;
      tick = [[E[0], E[1]], [tx, E[1]], [tx, y]];
    } else {
      x = out ? E[0] + 14 : E[0] - 14 - w;
      x = clamp(x, PAD_L + 6, picRight - 8 - w);
      y = E[1] - h / 2 + j * (h + gap);
      for (let k = 0; k < 12 && blocked([x, y, x + w, y + h], m); k++) y += h + gap;
      tick = [[E[0], E[1]], [out ? x : x + w, y + h / 2]];
    }
    placed.push([x - 2, y - 2, x + w + 2, y + h + 2]);
    lx.save();
    lx.globalAlpha = 1;
    lx.strokeStyle = hot ? T.lit : T.muted; lx.lineWidth = hot ? 1.6 : 1;
    lx.beginPath(); tick.forEach(([px, py], i) => (i ? lx.lineTo(px, py) : lx.moveTo(px, py))); lx.stroke();
    lx.fillStyle = K.pill; lx.strokeStyle = hot ? T.lit : K.pillLine; lx.lineWidth = 1;
    lx.beginPath(); lx.roundRect(x, y, w, h, 3); lx.fill(); lx.stroke();
    sigBar(x - 1, y, h, q.other);
    lx.textBaseline = 'middle';
    lx.font = f1; lx.fillStyle = hot ? T.lit : T.text; lx.fillText(name, x + 6, y + h / 2 + 0.5);
    lx.font = f2; lx.fillStyle = T.muted; lx.fillText(pkg, x + 6 + textWidth(name, f1), y + h / 2 + 0.5);
    lx.restore();
    labelLog.push({ size: TYPE.S, text: name + pkg, full: name + pkg, x, y, kind: 'stubpill', edge: q.edge });
  }
  lx.textBaseline = 'alphabetic';
}
function tooltip(text, sub) {
  const [mx, my] = state.mouse;
  lx.font = `700 ${TYPE.L}px ${FONT}`;
  const w1 = lx.measureText(text).width;
  lx.font = `400 ${TYPE.S}px ${FONT}`;
  const w2 = lx.measureText(sub).width;
  const w = Math.max(w1, w2) + 16, x = clamp(mx + 14, 0, W - w - 4), y = my + 14;
  lx.globalAlpha = 1;
  lx.fillStyle = K.tooltip; lx.strokeStyle = K.tooltipLine;
  lx.beginPath(); lx.roundRect(x, y, w, 34, 5); lx.fill(); lx.stroke();
  lx.fillStyle = T.text; lx.font = `700 ${TYPE.L}px ${FONT}`; lx.fillText(text, x + 8, y + 15);
  lx.fillStyle = T.dim; lx.font = `400 ${TYPE.S}px ${FONT}`; lx.fillText(sub, x + 8, y + 28);
  labelLog.push({ size: TYPE.S, text, full: text, x, y, kind: 'tooltip' });
}
// ---------------------------------------------------------------- picking
const raycaster = new THREE.Raycaster();
function slotAt(o, ly) {
  for (const s of slotsOf(o.b)) if (ly >= s.y && ly < s.y + s.h) return s;
  return null;
}
function pick(cx, cy) {
  const ndc = new THREE.Vector2((cx / W) * 2 - 1, -(cy / H) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  // Only what is drawn can be hit: a hit beyond the clipping plane, or beyond the
  // camera's near and far planes, is no hit. Silhouettes are not click targets.
  raycaster.near = 0; raycaster.far = Infinity;
  const fwd = camera.getWorldDirection(V());
  const drawnHit = (h) => {
    const d = h.point.clone().sub(camera.position).dot(fwd);
    if (d < camera.near || d > camera.far) return false;
    return !((cut !== null && h.point.z > cut + 1e-3) || (cutBack !== null && h.point.z < cutBack - 1e-3));
  };
  const walls = [...plateObjs.values()].filter((o) => o.walls.visible).flatMap((o) => o.walls.children);
  const wallHit = raycaster.intersectObjects(walls, false).find(drawnHit);
  if (wallHit) raycaster.far = wallHit.distance;
  if (state.view === 'plan') {
    const bodies = [...modObjs.values()].filter((o) => o.a > 0.1 && !o.sil).map((o) => o.body);
    const hit = raycaster.intersectObjects(bodies, false).find(drawnHit);
    return hit ? { kind: 'module', id: hit.object.userData.id, part: 'head' } : null;
  }
  // a single call (a curve, a margin lane, a stub) under the pointer, within 4 px
  raycaster.params.Line2 = { threshold: 4 };
  const callLines = [...curveList, ...edgeObjs].filter((o) => o.line.visible && o.a > 0.25).map((o) => o.line);
  const ch = raycaster.intersectObjects(callLines, false).filter(drawnHit);
  if (ch.length) return { kind: 'call', id: ch[0].object.userData.id };
  const targets = [];
  for (const o of cardObjs.values()) if (o.mesh.visible && o.border.material.opacity > 0.2) targets.push(o.mesh);
  for (const o of boxObjs.values()) if (o.group.visible && o.mats[4].opacity > 0.1) targets.push(o.box);
  for (const o of modObjs.values()) if (o.a > 0.1 && !o.sil) targets.push(o.body);
  const hits = raycaster.intersectObjects(targets, false).filter(drawnHit);
  if (hits.length) {
    const h = hits[0], ud = h.object.userData;
    if (ud.type === 'node') return { kind: 'node', id: ud.id };
    if (ud.type === 'module') {
      const o = modObjs.get(ud.id), ly = -h.point.y;
      if (ly < D.mod_header) return { kind: 'module', id: ud.id, part: 'head' };
      if (o.u > 0.5) return { kind: 'module', id: ud.id, part: 'body' };
      const s = slotAt(o, ly);
      if (!s) return { kind: 'module', id: ud.id, part: 'body' };
      if (s.slot === 'more' || s.slot === 'tail' || (s.slot === 'ghost')) return { kind: 'module', id: ud.id, part: s.slot === 'more' ? 'more' : 'tail' };
      if (s.kind === 'class') return { kind: 'class', id: s.id, module: ud.id };
      return { kind: 'node', id: s.id, module: ud.id };
    }
    const cl = CL.get(ud.id), g = boxGeom(cl);
    const ly = cl.y - h.point.y;
    if (ly < D.box_head) return { kind: 'class', id: cl.id, part: 'head' };
    if (g.tailY !== null && h.point.y < g.tailY + D.box_tail / 2) return { kind: 'class', id: cl.id, part: 'tail' };
    const ri = Math.floor((ly - D.box_head) / D.box_row);
    if (!cl.data_only && ri >= 0 && ri < g.rows.length) return { kind: 'node', id: g.rows[ri] };
    return { kind: 'class', id: cl.id, part: 'body' };
  }
  raycaster.params.Line2 = { threshold: 5 };
  const lines = [...linkObjs, ...plateRibbonObjs].filter((o) => o.a > 0.25).map((o) => o.line);
  const rh = raycaster.intersectObjects(lines, false).filter(drawnHit);
  if (rh.length) return { kind: rh[0].object.userData.type, id: rh[0].object.userData.id };
  return null;
}
// On the guide path, only what the step lights responds.
// A lit function, class or link (tier 1: the step's lit set and its evidence) opens in the
// inspector, the path and the camera stay; tier 2 and tier 3 marks, ground and ribbons are
// inert to hover and click. The path is left only through Esc or Map.
function guideClickable(hit) {
  const G = guideStep();
  if (!G || !hit) return null;
  const ev = G.evidence.includes(hit.id);
  if (hit.kind === 'node' && (SEL?.depth.has(hit.id) || ev)) return { kind: 'node', id: hit.id };
  if (hit.kind === 'class' && (SEL?.classes.has(hit.id) || ev)) return { kind: 'class', id: hit.id };
  if (hit.kind === 'link' && SEL?.links.has(hit.id)) return { kind: 'link', id: hit.id };
  if (hit.kind === 'call' && SEL?.edges.has(edgeObjs[hit.id])) return { kind: 'call', id: hit.id };
  return null;
}
let downAt = null, dragged = false;
glCanvas.addEventListener('pointerdown', (ev) => {
  dragged = downAt !== null;
  downAt = [ev.clientX, ev.clientY];
});
glCanvas.addEventListener('pointercancel', () => { downAt = null; });
glCanvas.addEventListener('pointermove', (ev) => {
  const bounds = glCanvas.getBoundingClientRect();
  state.mouse = [ev.clientX - bounds.left, ev.clientY - bounds.top];
  if (ev.buttons) {
    if (downAt && Math.hypot(ev.clientX - downAt[0], ev.clientY - downAt[1]) > 4) {
      dragged = true;
      if (orbit && ev.buttons === 1 && !ev.ctrlKey && !ev.metaKey && !ev.shiftKey && state.view !== 'axo') {
        state.view = 'axo';
        document.querySelectorAll('#views [data-view]').forEach((b) => b.classList.toggle('on', b.dataset.view === 'axo'));
        applyEmphasis('scope'); writeHash();
      }
    }
    return;
  }
  const rect = glCanvas.getBoundingClientRect();
  const hit = pick(ev.clientX - rect.left, ev.clientY - rect.top);
  let hover = null, hb = null, hl = null;
  if (state.guide !== null) {
    const c = guideClickable(hit);
    if (c?.kind === 'link' || c?.kind === 'call') hl = `${c.kind}:${c.id}`;
    else if (c) hover = c.id;
  } else {
    const rowsShown = hit?.module && modObjs.get(hit.module).rowsA > 0.5;
    hover = hit && (hit.kind === 'node' || hit.kind === 'class') && (!hit.module || rowsShown) ? hit.id : null;
    hb = hit && (hit.kind === 'module' || (hit.module && !rowsShown)) ? hit.id && hit.kind === 'module' ? hit.id : hit.module : null;
    hl = hit && (hit.kind === 'link' || hit.kind === 'plateribbon' || hit.kind === 'call') ? `${hit.kind}:${hit.id}` : null;
  }
  // the cursor promises a click: pointer only where a click does something
  glCanvas.style.cursor = hover || hb || hl ? 'pointer' : 'default';
  if (hover !== state.hover || hb !== state.hoverBox || hl !== state.hoverLine) {
    state.hover = hover; state.hoverBox = hb; state.hoverLine = hl;
    applyEmphasis();
  } else if (hover || hb || hl) { dirty = true; schedule(); }
});
glCanvas.addEventListener('pointerleave', () => {
  if (state.hover || state.hoverBox || state.hoverLine) { state.hover = state.hoverBox = state.hoverLine = null; applyEmphasis(); }
});
glCanvas.addEventListener('pointerup', (ev) => {
  const click = downAt && !dragged && Math.hypot(ev.clientX - downAt[0], ev.clientY - downAt[1]) <= 4 && ev.button === 0;
  downAt = null;
  if (!click) return;
  const rect = glCanvas.getBoundingClientRect();
  const hit = pick(ev.clientX - rect.left, ev.clientY - rect.top);
  if (state.guide !== null) {
    const c = guideClickable(hit);
    if (c) openInspector(c, { fresh: true });
    return;
  }
  if (!hit) { select(null); return; }
  if (state.view === 'plan' && hit.kind === 'module') { setScope({ kind: 'module', id: hit.id }); showPanel('browse'); return; }
  if (hit.module && !state.scope) { setScope({ kind: 'package', id: PANE.get(hit.module).district }); return; }
  if (hit.kind === 'node') select({ kind: 'node', id: hit.id });
  else if (hit.kind === 'class' && hit.module) select({ kind: 'class', id: hit.id });
  else if (hit.kind === 'class' && (hit.part === 'head' || hit.part === 'tail')) {
    if (hit.part === 'tail' || state.selected?.id === hit.id) toggleClass(hit.id);
    select({ kind: 'class', id: hit.id });
  } else if (hit.kind === 'class') select({ kind: 'class', id: hit.id });
  else if (hit.kind === 'module') {
    if (!state.scope) setScope({ kind: 'package', id: PANE.get(hit.id).district });
    else if (hit.part !== 'body' || state.open.has(hit.id)) toggleModule(hit.id);
  } else if (hit.kind === 'link' || hit.kind === 'plateribbon' || hit.kind === 'call') select({ kind: hit.kind, id: hit.id });
});
// ---------------------------------------------------------------- keyboard
// The arrow keys move the view by a fixed share of the picture (Shift: three times as far),
// + and - zoom about the picture's centre, Home fits the scope again, Esc goes up one level.
// In the guide Left and Right keep stepping and Up and Down pan. Every key is an explicit
// command: the camera moves, nothing else does.
const PAN = 0.15, PAN_SHIFT = 0.45, ZOOM_STEP = 1.25, KEY_MS = 160;
function camBase() {
  if (flight) return { target: flight.goal.target.clone(), position: flight.goal.position.clone(), zoom: flight.goal.zoom ?? camera.zoom };
  return { target: controls.target.clone(), position: camera.position.clone(), zoom: camera.zoom };
}
function panBy(fx, fy) {
  const b = camBase();
  const rect = picRect(), pw = rect[1] - rect[0], ph = rect[3] - rect[2];
  const perPx = camera.isOrthographicCamera ? 1 / b.zoom : (2 * b.position.distanceTo(b.target) * Math.tan(THREE.MathUtils.degToRad(persp.fov) / 2)) / H;
  camera.updateMatrixWorld();
  const right = V().setFromMatrixColumn(camera.matrixWorld, 0), up = V().setFromMatrixColumn(camera.matrixWorld, 1);
  const d = right.multiplyScalar(fx * pw * perPx).add(up.multiplyScalar(fy * ph * perPx));
  const target = b.target.clone().add(d).sub(controls.cursor).clampLength(0, controls.maxTargetRadius).add(controls.cursor);
  d.copy(target).sub(b.target);
  flyTo({ target: b.target.add(d), position: b.position.add(d), zoom: b.zoom, ortho: !!camera.isOrthographicCamera }, KEY_MS);
  lastFit = null;
}
function zoomBy(k) {
  const b = camBase();
  if (camera.isOrthographicCamera) flyTo({ target: b.target, position: b.position, zoom: clamp(b.zoom * k, controls.minZoom, controls.maxZoom), ortho: true }, KEY_MS);
  else flyTo({ target: b.target, position: b.target.clone().add(b.position.clone().sub(b.target).setLength(clamp(b.position.distanceTo(b.target) / k, controls.minDistance, controls.maxDistance))), ortho: false }, KEY_MS);
  lastFit = null;
}
// Home: the frame the current state started from
function fitHome(ms = 360) {
  if (state.guide !== null) flyTo(stepGoal(STEPS[state.guide]), ms);
  else if (SEL && state.selected && state.pulse) fitSelection(ms);
  else goView(state.view, ms);
}
// Esc has one precedence for every state: close the help or the key overlay if open;
// else close the inspector if open; else clear the reader's selection; else, on the path,
// leave the guide one level above the step's scope (a module step lands on its package, any
// other on the whole map); else go up one scope level: module -> package -> all packages.
// On the path the step's selection is Python's, so Esc never clears it.
function escape() {
  if (!$('#help').classList.contains('hidden')) { toggleHelp(false); return; }
  if (!$('#key').classList.contains('hidden')) { toggleKey(false); return; }
  if (panelMode === 'source') { inspectorBack(); return; }
  if (panelMode) { showPanel(null); return; }
  if (state.guide !== null) {
    const st = STEPS[state.guide];
    if (st.scope?.kind === 'module') { leaveGuide(); setScope({ kind: 'package', id: PANE.get(st.scope.id).district }); }
    else leaveGuide({ map: true });
    return;
  }
  if (state.selected) { select(null); return; }
  if (state.scope?.kind === 'module') setScope({ kind: 'package', id: PANE.get(state.scope.id).district });
  else if (state.scope) setScope(null);
  else if (lastFit !== 'view' || state.view !== 'axo') toMap();
}
function toggleProjection(want) {
  state.proj = want ?? (state.proj === 'ortho' ? 'persp' : 'ortho');
  $('#projBtn').classList.toggle('on', state.proj === 'ortho');
  $('#projBtn').textContent = state.proj === 'ortho' ? 'Orthographic' : 'Perspective';
  fitHome();
  writeHash();
}
function toggleHelp(on) {
  const h = $('#help'), show = on ?? h.classList.contains('hidden');
  h.classList.toggle('hidden', !show);
  $('#helpBtn').classList.toggle('on', show);
  dirty = true; schedule();
}
addEventListener('keydown', (ev) => {
  if (ev.metaKey || ev.ctrlKey || ev.altKey || ev.target.closest('input, textarea, select, [contenteditable="true"]')) return;
  const k = ev.key, inGuide = state.guide !== null, step = ev.shiftKey ? PAN_SHIFT : PAN;
  // Backspace: the inspector's back control (a step it took from a call site or a link)
  if (k === 'Backspace') { if (panelMode) { ev.preventDefault(); inspectorBack(); } return; }
  if (k === 'ArrowLeft' || k === 'ArrowRight') {
    ev.preventDefault();
    if (inGuide) guideGo(state.guide + (k === 'ArrowRight' ? 1 : -1));
    else panBy(k === 'ArrowRight' ? step : -step, 0);
    return;
  }
  if (k === 'ArrowUp' || k === 'ArrowDown') { ev.preventDefault(); panBy(0, k === 'ArrowUp' ? step : -step); return; }
  if (inGuide && (k === 'PageDown' || k === 'PageUp')) { ev.preventDefault(); guideGo(state.guide + (k === 'PageDown' ? 1 : -1)); return; }
  if (k === '+' || k === '=') { zoomBy(ZOOM_STEP); return; }
  if (k === '-' || k === '_') { zoomBy(1 / ZOOM_STEP); return; }
  if (k === 'Home') { ev.preventDefault(); fitHome(); return; }
  if (k === 'Escape') { escape(); return; }
  if (k === '?' || k === 'h' || k === 'H') { toggleHelp(); return; }
  if (k === 'o' || k === 'O') { toggleProjection(); return; }
  if (k === 'k') { toggleKey(); return; }
  if (k === 'K') { toggleKey(); return; }
  if (k === 'b' || k === 'B') { showPanel('browse'); $('#symbolSearch').focus(); return; }
  if (k === 't' || k === 'T') { setTheme(THEME === 'dark' ? 'light' : 'dark'); return; }
  // p replays the pulses of the lit set: an explicit request
  if (k === 'p' || k === 'P') { startPulses(); dirty = true; schedule(); return; }
  if (!inGuide && (k === 'g' || k === 'G')) { resumeGuide(); return; }
  if (['1', '2', '3'].includes(k)) { leaveGuide(); goView({ 1: 'axo', 2: 'plan', 3: 'elev' }[k]); return; }
  if (inGuide) return;
  if ((k === 'e' || k === 'E') && state.selected) {
    const cid = state.selected.kind === 'class' ? state.selected.id : N.get(state.selected.id)?.cls;
    if (cid && state.open.has(CL.get(cid).module)) toggleClass(cid);
  }
  if ((k === 'u' || k === 'U') && state.scope) {
    const m = state.hoverBox ?? (state.selected && state.selected.kind !== 'call' ? moduleOf(state.selected.id) : null);
    if (m) toggleModule(m);
  }
});
// the key map, in the help overlay (?): one source for the overlay and the doc
const KEYMAP = [
  ['Move', null],
  ['← → ↑ ↓', 'move the view by 15 % of the picture (in the guide ← → step, ↑ ↓ move)'],
  ['Shift + arrow', 'move by 45 %'],
  ['+  −', 'zoom in and out about the centre'],
  ['Home', 'fit the scope again (in the guide: the step)'],
  ['mouse / touch', 'drag orbits · right-drag pans · wheel or pinch zooms'],
  ['Esc, in this order', null],
  ['1 · overlay', 'close the help or the key'],
  ['2 · panel', 'return to Browse or Guide, then close the panel'],
  ['3 · selection', 'clear the selection'],
  ['4 · guide', 'leave the guide, one level above its step'],
  ['5 · scope', 'up one level: module → package → all'],
  ['Explore', null],
  ['click box · header', 'scope its package · unfold the module'],
  ['click row · call', 'select it and read its source'],
  ['Backspace', 'inspector: back to what it showed before'],
  ['u · e', 'unfold the hovered module · open the selected class'],
  ['Views', null],
  ['1  2  3', 'Axonometric · Plan · Elevation (leaves the guide)'],
  ['o', 'orthographic or perspective projection'],
  ['b · k', 'browse / search symbols · show the key'],
  ['t', 'dark or light theme'],
  ['?', 'this help'],
  ['Guide', null],
  ['← → · PgUp PgDn', 'previous and next step'],
  ['click a lit mark', 'read its source; the step stays'],
  ['g', 'resume the guide where you left it'],
  ['p', 'replay the pulses of the lit pipeline'],
  ['Calls', null],
  ['hover a call', 'isolate it: caller → callee in a pill'],
  ['hover a source line', 'light its drawn calls and callees'],
];
function renderHelp() {
  const h = ['<div class="hh">Keys</div><div class="hg">'];
  for (const [a, b] of KEYMAP) h.push(b === null ? `<div class="hs">${esc(a)}</div>` : `<div class="hk">${esc(a)}</div><div class="hv">${esc(b)}</div>`);
  h.push('</div>');
  $('#help').innerHTML = h.join('');
}
controls.addEventListener('change', () => { dirty = true; schedule(); });

// ---------------------------------------------------------------- actions
// A selection lights in place. Wavefront and pulses run only for an explicit pipeline
// (picked from the pipeline list), never for a click on a row or card.
function select(sel, { pulse = false, keepBack = false } = {}) {
  state.selected = sel;
  state.pulse = !!sel && pulse;
  // outside the guide the inspector shows the selection; a selection made in the picture
  // starts a fresh back stack, one made from the inspector keeps it
  if (!keepBack) state.inspectBack = [];
  state.inspect = sel;
  state.hoverCall = null;
  if (sel) showPanel('source');
  else if (panelMode === 'source') showPanel('browse');
  applyEmphasis('select');
}
// Open a mark in the inspector. On the path it changes the inspector only: the step's lit
// set, the camera and the path stay. Off the path it is a selection (lights in place).
// fresh: a click in the picture or the guide panel (new back stack); otherwise a step from
// the inspector itself (a call site, a caller), which the back control undoes.
function openInspector(sel, { fresh = false } = {}) {
  if (fresh) state.inspectBack = [];
  else if (state.inspect) state.inspectBack.push({ ...state.inspect, scroll: $('#inspector .ibody')?.scrollTop ?? 0 });
  if (state.guide !== null) { state.inspect = sel; state.hoverCall = null; showPanel('source'); applyEmphasis('hover'); }
  else select(sel, { keepBack: true });
}
function inspectorBack() {
  const prev = state.inspectBack.pop();
  if (panelMode !== 'source' || !prev) {
    if (panelMode === 'browse' && browseModule) browseModule = null;
    else if (panelMode === 'browse' && browsePackage) browsePackage = null;
    else { showPanel(state.guide === null ? 'browse' : 'guide'); return; }
    $('#symbolSearch').value = ''; renderTree(); return;
  }
  if (state.guide !== null) { state.inspect = prev; state.hoverCall = null; applyEmphasis('hover'); }
  else select(prev, { keepBack: true });
  $('#inspector .ibody').scrollTop = prev.scroll ?? 0;
}
function toggleClass(cid, on) {
  const open = on ?? !state.expanded.has(cid);
  if (open === state.expanded.has(cid)) return;
  if (open) {
    state.expanded.add(cid);
    buildBox(CL.get(cid)).liftTarget = 1;
  } else {
    state.expanded.delete(cid);
    const o = boxObjs.get(cid);
    o.liftTarget = 0;
    o.rebuildOnClose = true;
  }
  rerouteClass(cid);
  applyEmphasis('select');
}
// Unfolding is the one structural change: the box grows down to Python's open
// height in 220 ms, its rows give way to its cards, and the links touching it give
// way to their member calls. Nothing else moves.
function setOpen(m, open) {
  if (open === state.open.has(m)) return false;
  if (open) state.open.add(m);
  else {
    state.open.delete(m);
    for (const c of view.classes) if (c.module === m && state.expanded.has(c.id)) { state.expanded.delete(c.id); const o = buildBox(c); o.lift = 0; o.liftTarget = 0; o.group.position.z = c.z; }
  }
  modObjs.get(m).uTarget = open ? 1 : 0;
  rerouteModule(m);
  rerouteClones(m);
  return true;
}
function toggleModule(m, on) {
  if (setOpen(m, on ?? !state.open.has(m))) { renderTree(); applyEmphasis('unfold'); }
}
function setScope(scope, { fly = true, ms = 360 } = {}) {
  state.scope = scope;
  browsePackage = scope ? (scope.kind === 'package' ? scope.id : PANE.get(scope.id).district) : null;
  browseModule = scope?.kind === 'module' ? scope.id : null;
  const want = new Set(scope?.kind === 'module' ? [scope.id] : []);
  for (const m of [...state.open]) if (!want.has(m)) setOpen(m, false);
  for (const m of want) setOpen(m, true);
  renderTree();
  renderCrumbs();
  applyEmphasis('scope');
  if (fly) goView(scope ? (state.view === 'plan' ? 'plan' : 'elev') : 'axo', ms);
}
function fitSelection(ms = 360) {
  if (!SEL) return;
  const mods = [...SEL.modules];
  const name = new Set(mods.map((m) => PANE.get(m).row)).size === 1 ? 'elev' : 'axo';
  state.view = name;
  document.querySelectorAll('#views [data-view]').forEach((b) => b.classList.toggle('on', b.dataset.view === name));
  const pr = PRESET[name];
  const cutZ = Math.max(...mods.map((m) => PANE.get(m).z)) + CUT_FRONT;
  // frame the lit boxes and the lit lines between them
  const pts = [];
  for (const m of mods) {
    const p = PANE.get(m), b = p.box;
    pts.push(V(b.x - D.gutter, 0.4, p.z + b.d), V(b.x + b.w + D.gutter, boxBottom(m) - 0.25, p.z + b.d));
  }
  for (const li of SEL.links.keys()) {
    const o = linkObjs[li];
    if (o.l.span === 'cross_row' || !mods.includes(o.l.s) || !mods.includes(o.l.t)) continue;
    for (let i = 0; i < o.n; i += 3) pts.push(V(o.pts[i * 3], o.pts[i * 3 + 1], o.pts[i * 3 + 2]));
  }
  const b = new THREE.Box3().setFromPoints(pts);
  b.pts = pts;
  lastFit = 'sel';
  const goal = fitGoal(b, pr.az, pr.el, 0.92, cutZ);
  flyTo(goal, ms);
  applyEmphasis('scope');
}

// ---------------------------------------------------------------- the guide (reading path)
// A step is Python's resolved state. Applying it sets scope, selection, the unfolded
// modules and open classes, lights the step's set, and flies the camera to the step's
// frame (360 ms). Unfolding and opening a class are the step's only structural changes,
// and both land on Python's positions.
let MAP_EL = 0.98;
// the rectangle an id occupies in the step's geometry: its card or class block when its
// module unfolds, else its slot on the folded box
function frameRect(id, open, openClasses) {
  const n = N.get(id), m = moduleOf(id), p = PANE.get(m), b = p.box;
  if (open.has(m)) {
    if (n && n.x !== undefined && !(n.cls && CL.has(n.cls) && !n.dead)) return { x0: n.x, x1: n.x + n.w, y0: n.y, y1: n.y - n.h, z: n.z };
    const cl = CL.get(n ? n.cls : id), on = openClasses.has(cl.id);
    return { x0: cl.x, x1: cl.x + (on ? cl.expanded.w : cl.w), y0: cl.y, y1: cl.y - (on ? cl.expanded.h : cl.h), z: cl.z + cl.d + (on ? cl.expanded.lift : 0) };
  }
  const s = SLOT.get(`${m}|${slotOf(id)}`);
  return { x0: b.x, x1: b.x + b.w, y0: -s.y, y1: -(s.y + s.h), z: p.z + b.d };
}
function stepGoal(st) {
  if (st.camera === 'plan') {
    state.view = 'plan';
    return fitGoal(sceneBounds(view.panes.map((p) => p.module), { plan: true }), PRESET.plan.az, PRESET.plan.el, 0.93);
  }
  if (st.camera === 'map') {
    state.view = 'axo';
    // the package map looks down a little steeper than the Axonometric: plates read as a map
    return fitGoal(sceneBounds(view.panes.map((p) => p.module)), PRESET.axo.az, st.lod === 'plate' ? MAP_EL : PRESET.axo.el, 1.02);
  }
  // Multi-row guide steps use the same clear viewing angle as the map.
  state.view = st.camera === 'raised' ? 'axo' : 'elev';
  const open = new Set(st.unfold), openClasses = new Set(st.open);
  const mods = new Set(st.frame.modules), pts = [];
  // a module chapter frames its module the way the module scope does
  if (st.frame.modules.length && !st.frame.nodes.length && !st.frame.classes.length) pts.push(...sceneBounds(st.frame.modules).pts);
  const header = (m) => { const p = PANE.get(m), b = p.box; pts.push(V(b.x - D.gutter, 0.7, p.z + b.d), V(b.x + b.w + D.gutter, 0.7, p.z + b.d)); };
  for (const id of st.frame.nodes) {
    const m = moduleOf(id), r = frameRect(id, open, openClasses);
    mods.add(m);
    pts.push(V(r.x0 - 0.3, r.y0 + 0.3, r.z), V(r.x1 + 0.3, r.y1 - 0.4, r.z));
    header(m); // the module's name stays in the picture
  }
  for (const cid of st.frame.classes) {
    const cl = CL.get(cid), r = frameRect(cid, open, openClasses);
    mods.add(cl.module);
    pts.push(V(r.x0 - 0.5, r.y0 + 0.9, r.z), V(r.x1 + 0.5, r.y1 - 0.3, r.z));
    header(cl.module);
  }
  // the lit tracks between modules stay in frame (arcs overhead do not: they would shrink the picture)
  for (const [k] of st.lit_edges) {
    const e = view.edges[k];
    if (e.ms === e.mt) continue;
    const li = linkOfEdge.get(k), o = open.has(e.ms) || open.has(e.mt) ? edgeObjs[k] : linkObjs[li];
    if (st.off_edges.includes(k)) continue; // a pill step: the call ends in a pill at its card edge
    if (e.span !== 'plate' && e.span !== 'row') continue;
    if (st.home_row !== null && PANE.get(e.ms).row !== PANE.get(e.mt).row) continue;
    for (let i = 0; i < o.n; i += 3) pts.push(V(o.pts[i * 3], o.pts[i * 3 + 1], o.pts[i * 3 + 2]));
  }
  const b = new THREE.Box3().setFromPoints(pts);
  b.pts = pts;
  const ms = [...mods];
  const sc = [...(stepScope(st) ?? [])];
  const cutZ = Math.max(...(sc.length ? sc : ms).map((m) => PANE.get(m).z)) + CUT_FRONT;
  const pr = st.camera === 'raised' ? PRESET.axo : PRESET.elev;
  const goal = fitGoal(b, pr.az, pr.el, 0.92, cutZ);
  // a small frame never zooms past STEP_SCALE px per unit: the step's marks keep their
  // neighbours as context and wrapped names stay compact
  if (goal.ortho) goal.zoom = Math.min(goal.zoom, STEP_SCALE);
  else {
    const dir = goal.position.clone().sub(goal.target), dist = dir.length();
    const dMin = H / (2 * STEP_SCALE * Math.tan(THREE.MathUtils.degToRad(persp.fov) / 2));
    if (dist < dMin) goal.position.copy(goal.target).addScaledVector(dir.normalize(), dMin);
  }
  return goal;
}
const STEP_SCALE = 64;
// open exactly these class blocks (each lifts or settles in 220 ms)
function setClasses(list) {
  const want = new Set(list);
  for (const cid of [...state.expanded]) if (!want.has(cid)) {
    state.expanded.delete(cid);
    const o = boxObjs.get(cid);
    o.liftTarget = 0; o.rebuildOnClose = true;
    rerouteClass(cid);
  }
  for (const cid of want) if (!state.expanded.has(cid)) {
    state.expanded.add(cid);
    buildBox(CL.get(cid)).liftTarget = 1;
    rerouteClass(cid);
  }
}
function guideGo(i, { ms = 360 } = {}) {
  if (i < 0 || i >= STEPS.length) return;
  const st = STEPS[i];
  state.guide = i; state.resume = i;
  state.scope = st.scope ? { kind: st.scope.kind, id: st.scope.id } : null;
  state.selected = st.selected ? { kind: st.selected.kind, id: st.selected.id } : null;
  state.pulse = false;
  state.hover = state.hoverBox = state.hoverLine = null;
  // Each step starts in the shared guide panel with no stale source selection.
  state.inspect = null; state.inspectBack = []; state.hoverCall = null;
  showPanel('guide', false);
  // unfold exactly the step's modules (Python's rule), then open exactly its classes
  const want = new Set(st.unfold);
  for (const m of [...state.open]) if (!want.has(m)) setOpen(m, false);
  for (const m of want) setOpen(m, true);
  setClasses(st.open);
  renderTree(); renderCrumbs(); renderGuide();
  renderInspector();
  const goal = stepGoal(st);
  applyEmphasis('guide');
  document.querySelectorAll('#views [data-view]').forEach((b) => b.classList.toggle('on', b.dataset.view === state.view));
  flyTo(goal, ms);
  lastFit = 'guide';
  writeHash();
}
// Leaving the path keeps the camera where it is; only "Map" (or Esc) flies to the whole map.
function leaveGuide({ map = false } = {}) {
  if (state.guide === null) return;
  state.guide = null;
  state.inspect = null; state.inspectBack = []; state.hoverCall = null;
  showPanel('browse', false);
  renderGuide();
  if (map) { toMapState(); goView('axo'); }
  else { renderTree(); renderCrumbs(); applyEmphasis('scope'); }
  writeHash();
}
function toMapState() {
  state.selected = null; state.scope = null; state.pulse = false;
  browsePackage = browseModule = null;
  state.inspect = null; state.inspectBack = []; state.hoverCall = null;
  showPanel('browse', false);
  for (const m of [...state.open]) setOpen(m, false);
  setClasses([]);
  stopPulses();
  renderTree(); renderCrumbs();
}
function resumeGuide(i = state.resume) { guideGo(i); }
function toMap() {
  if (state.guide !== null) { leaveGuide({ map: true }); return; }
  toMapState();
  goView('axo');
}
function renderGuide() {
  const on = state.guide !== null;
  $('#guide').classList.toggle('hidden', panelMode !== 'guide');
  renderRail();
  if (!on) return;
  const i = state.guide, st = STEPS[i];
  const same = STEPS.filter((x) => x.part === st.part), k = same.indexOf(st) + 1;
  const where = st.part === 'chapter' ? `Step ${st.label} · chapter ${k} of ${same.length}` : st.part === 'pipeline' ? `Step ${st.label} · pipeline ${k} of ${same.length}` : `Step ${st.label} · signal ${k} of ${same.length}`;
  // qualified names may break after a dot
  const brk = (t) => esc(t).replace(/\.(?=[A-Za-z_])/g, '.​');
  const h = ['<div class="guide-content">', `<div class="gh"><b>Guide</b> · ${esc(GUIDE.title)}</div>`, `<div class="gp">${where}</div>`, `<h2>${esc(st.title)}</h2>`, `<p class="gb">${brk(st.body)}</p>`];

  if (st.evidence.length && !st.list) {
    // A guide step cites up to a dozen names (the entry surface): the list scrolls, the nav stays
    h.push('<div class="gs">Evidence</div><div class="fl-wrap ev-wrap">');
    for (const id of st.evidence) {
      const n = N.get(id), cl = CL.get(id);
      const name = cl ? cl.name : n.cls ? `${CL.get(n.cls).name}.${n.name}` : n.name;
      h.push(`<div class="ev" data-ev="${esc(id)}">${esc(name)} <span>${esc((cl ?? n).module.split('.').pop())}.py</span></div>`);
    }
    h.push('</div>');
  }
  h.push('<details class="guide-key"><summary>Reading this view</summary><div id="gmarks"></div></details>');
  if (st.list) {
    const total = st.list.reduce((k2, g) => k2 + g.ids.length, 0);
    h.push(`<div class="gs">${total} functions · ${st.list.length} modules</div><div class="fl-wrap">`);
    for (const g of st.list) {
      const label = st.list.filter((other) => other.name === g.name).length > 1 ? g.module || g.name : g.name;
      h.push(`<details class="fl"${g.ids.includes(st.selected?.id) ? ' open' : ''}><summary><span>${esc(label)}</span><span class="fm">${g.ids.length}</span></summary>`);
      for (const id of g.ids) {
        const n = N.get(id);
        const name = n.cls ? `${CL.get(n.cls).name}.${n.name}` : n.name;
        h.push(`<button class="fn" data-ev="${esc(id)}">${esc(name)}</button>`);
      }
      h.push('</details>');
    }
    h.push('</div>');
  }
  h.push('</div>');
  const el = $('#guide');
  el.innerHTML = h.join('');
  // The guide's key follows the scene after the step settles.
  renderGuideMarks(marksOn);
  marksKey = null;
  // a name in the panel opens in the inspector; the path and the camera stay
  el.querySelectorAll('[data-ev]').forEach((a) => a.addEventListener('click', () => {
    const id = a.dataset.ev;
    openInspector({ kind: CL.has(id) ? 'class' : 'node', id }, { fresh: true });
  }));
}
// One labeled selector replaces the old progress dots and duplicated next buttons.
function renderRail() {
  const away = state.guide === null, current = away ? state.resume : state.guide;
  $('#guideStep').innerHTML = STEPS.map((st, i) => `<option value="${i}"${i === current ? ' selected' : ''}>${i + 1} · ${esc(st.title)}</option>`).join('');
  $('#navProgress').textContent = `${away ? 'Resume' : 'Step'} ${current + 1} / ${STEPS.length}`;
  $('#guidePrev').disabled = current === 0;
  const last = current === STEPS.length - 1;
  $('#guideNext').textContent = last ? 'Prompt ↗' : '→';
  $('#guideNext').setAttribute('aria-label', last ? 'Open cleanup prompt' : 'Next tutorial step');
  $('#guideNext').title = last ? 'Open cleanup prompt' : 'Next tutorial step';
  $('#mapBtn').classList.toggle('on', away);
  $('#rail').innerHTML = `<span>${away ? 'Exploring' : 'Guide'} · ${esc(STEPS[current].title)}</span><span class="count">${current + 1} / ${STEPS.length}</span>`;
}
function toggleKey(on) {
  const k = $('#key'), show = on ?? k.classList.contains('hidden');
  k.classList.toggle('hidden', !show);
  $('#keyBtn').classList.toggle('on', show);
  $('#keyBtn').setAttribute('aria-expanded', String(show));

  dirty = true; schedule();
}

// ---------------------------------------------------------------- unified browse / guide / source panel
function showPanel(mode, reframe = true) {
  const wasOpen = !$('#panel').classList.contains('hidden');
  if (panelMode === 'browse') browseScroll = $('#browser').scrollTop;
  panelMode = mode;
  $('#panel').classList.toggle('hidden', !mode);
  $('#browser').classList.toggle('hidden', mode !== 'browse');
  $('#guide').classList.toggle('hidden', mode !== 'guide');
  $('#navigation').classList.toggle('hidden', mode !== 'guide');
  $('#inspector').classList.toggle('hidden', mode !== 'source');
  $('#prompt').classList.toggle('hidden', mode !== 'prompt');
  $('#legend').classList.toggle('hidden', mode === 'prompt');
  for (const b of document.querySelectorAll('[data-panel]')) {
    b.classList.toggle('on', b.dataset.panel === mode);
    b.setAttribute('aria-selected', String(b.dataset.panel === mode));
    b.tabIndex = b.dataset.panel === mode ? 0 : -1;
    b.disabled = b.dataset.panel === 'source' && !state.inspect;
  }
  $('#browseBtn').classList.toggle('on', mode === 'browse');
  $('#expandPanel').classList.toggle('hidden', !mode);
  setInspectorWidth(inspW);
  if (mode === 'browse') { renderTree(); $('#browser').scrollTop = browseScroll; }
  if (mode === 'source') renderInspector();
  $('#panelBack').disabled = (mode === 'guide' || mode === 'prompt') || (mode === 'browse' && !browsePackage && !browseModule);
  dirty = true; schedule();
  if (ready && reframe && wasOpen !== !!mode) fitHome();
}
function setOrbit(on) {
  orbit = on;
  controls.enableRotate = on;
  controls.mouseButtons.LEFT = on ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN;
  controls.touches.ONE = on ? THREE.TOUCH.ROTATE : THREE.TOUCH.PAN;
  $('#orbitBtn').setAttribute('aria-pressed', String(on));
  $('#orbitBtn').classList.toggle('on', on);
  $('#cameraHint').textContent = on ? 'Drag to orbit · right-drag to pan · scroll to zoom' : 'Drag to pan · scroll to zoom';
}
function wirePanel() {
  wireGrip($('#panel .grip'));
  setOrbit(true);
  $('#optimizationPrompt').value = optimizationPrompt;
  $('#promptMeta').textContent = `${optimizationPrompt.trim().split(/\s+/).length} words · full evidence in .atlas/atlas.json`;
  $('#copyPrompt').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(optimizationPrompt);
      $('#copyStatus').textContent = 'Copied. Paste into your coding agent.';
      $('#copyPrompt').textContent = 'Copied';
    } catch {
      $('#optimizationPrompt').focus(); $('#optimizationPrompt').select();
      $('#copyStatus').textContent = 'Prompt selected. Press Ctrl+C or ⌘C to copy.';
    }
  });
  $('#guideStep').addEventListener('change', (event) => guideGo(+event.target.value));
  $('#guidePrev').addEventListener('click', () => guideGo((state.guide ?? state.resume) - 1));
  $('#guideNext').addEventListener('click', () => {
    const current = state.guide ?? state.resume;
    if (current === STEPS.length - 1) showPanel('prompt');
    else guideGo(current + 1);
  });
  $('#panelNav').addEventListener('keydown', (event) => {
    if (!event.target.matches('[data-panel]') || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); event.stopPropagation();
    const tabs = [...document.querySelectorAll('[data-panel]:not(:disabled)')];
    const next = tabs[(tabs.indexOf(event.target) + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    next.click(); next.focus();
  });
  $('#browseBtn').addEventListener('click', () => showPanel('browse'));
  $('#panelBack').addEventListener('click', inspectorBack);
  $('#closePanel').addEventListener('click', () => showPanel(null));
  $('#expandPanel').addEventListener('click', () => {
    panelExpanded = !panelExpanded;
    setInspectorWidth(inspW);
    $('#expandPanel').setAttribute('aria-label', panelExpanded ? 'Restore panel width' : 'Expand panel');
    fitHome();
  });
  document.querySelectorAll('[data-panel]').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.panel === 'guide' && state.guide === null) resumeGuide();
    else showPanel(b.dataset.panel);
  }));
  $('#symbolSearch').addEventListener('input', () => { browseScroll = 0; renderTree(); });
  $('#fitBtn').addEventListener('click', () => fitHome());
  $('#zoomIn').addEventListener('click', () => zoomBy(ZOOM_STEP));
  $('#zoomOut').addEventListener('click', () => zoomBy(1 / ZOOM_STEP));
  $('#orbitBtn').addEventListener('click', () => setOrbit(!orbit));
}
function marks(r) {
  return `<span class="counts">${[
    ['dead', r.dead, 'dead'], ['clone', r.clones, 'clones'], ['lb', r.load_bearing, 'load-bearing'],
  ].filter(([, n]) => n).map(([kind, n, label]) => `<span class="count-${kind}" title="${n} ${label}">${n} ${label}</span>`).join('')}</span>`;
}
function renderTree() {
  const query = $('#symbolSearch').value.trim().toLowerCase();
  const rows = [];
  const symbols = [...view.nodes.map((n) => ({ ...n, kind: 'node' })), ...view.classes.map((c) => ({ ...c, kind: 'class' }))];
  const symbolRow = (n) => `<button class="row symbol ${state.inspect?.id === n.id ? 'on' : ''}" data-symbol="${esc(n.id)}" data-kind="${n.kind}" title="${esc(n.id)}"><span class="symbol-icon">${n.kind === 'class' ? 'C' : 'ƒ'}</span><span class="nm">${esc(fullName(n.id))}</span>${n.dead ? '<span class="symbol-meta">dead</span>' : ''}</button>`;
  for (const d of view.districts) {
    const panes = d.modules.map((m) => PANE.get(m)).sort((a, b) => a.name.localeCompare(b.name));
    const matching = panes.filter((p) => !query || p.module.toLowerCase().includes(query) || symbols.some((n) => n.module === p.module && n.id.toLowerCase().includes(query)));
    if (!matching.length) continue;
    const open = query || browsePackage === d.package;
    rows.push(`<button class="row pkg ${browsePackage === d.package ? 'current' : ''}" data-pkg="${esc(d.package)}" aria-expanded="${!!open}"><span class="chevron">${open ? '⌄' : '›'}</span><span class="nm">${esc(d.name)}</span><span class="symbol-meta">${panes.length} modules</span></button>`);
    if (!open) continue;
    for (const p of matching) {
      const expanded = query || browseModule === p.module;
      rows.push(`<button class="row mod ${browseModule === p.module ? 'current' : ''}" data-mod="${esc(p.module)}" aria-expanded="${!!expanded}" title="${esc(p.module)}"><span class="chevron">${expanded ? '⌄' : '›'}</span><span class="nm">${esc(p.name)}.py</span></button>`);
      if (!expanded) continue;
      if (!query && (p.dead || p.clones || p.load_bearing)) rows.push(`<div class="module-signals">${marks(p)}</div>`);
      const items = symbols.filter((n) => n.module === p.module && (!query || n.id.toLowerCase().includes(query))).sort((a, b) => a.line - b.line);
      rows.push(...items.map(symbolRow));
    }
  }
  $('#tree').innerHTML = rows.join('') || '<p class="empty-search">No matching modules or symbols.</p>';
  $('#browseSummary').textContent = `${view.districts.length} packages · ${view.panes.length} modules · ${view.nodes.length} functions`;
  $('#tree').querySelectorAll('[data-pkg]').forEach((b) => b.addEventListener('click', () => {
    const id = b.dataset.pkg, close = browsePackage === id;
    leaveGuide(); setScope(close ? null : { kind: 'package', id });
    showPanel('browse');
  }));
  $('#tree').querySelectorAll('[data-mod]').forEach((b) => b.addEventListener('click', () => {
    const id = b.dataset.mod, close = browseModule === id;
    leaveGuide(); setScope(close ? { kind: 'package', id: PANE.get(id).district } : { kind: 'module', id });
    showPanel('browse');
  }));
  $('#tree').querySelectorAll('[data-symbol]').forEach((b) => b.addEventListener('click', () => {
    const id = b.dataset.symbol;
    browseScroll = $('#browser').scrollTop;
    leaveGuide(); setScope({ kind: 'module', id: modOfId(id) }, { fly: false });
    openInspector({ kind: b.dataset.kind, id }, { fresh: true });
    fitHome();
  }));
  $('#panelBack').disabled = (panelMode === 'guide' || panelMode === 'prompt') || (panelMode === 'browse' && !browsePackage && !browseModule);
}
function renderCrumbs() {
  const el = $('#crumbs');
  const parts = [`<a data-c="">all packages</a>`];
  if (state.scope) {
    const pkg = scopePackage();
    parts.push(`<span class="gt">›</span><a data-c="pkg:${pkg}" class="${state.scope.kind === 'package' ? 'cur' : ''}">${DIST.get(pkg).name}</a>`);
    if (state.scope.kind === 'module') parts.push(`<span class="gt">›</span><a class="cur">${PANE.get(state.scope.id).name}.py</a>`);
  }
  el.innerHTML = parts.join(' ');
  el.querySelectorAll('[data-c]').forEach((a) => a.addEventListener('click', () => {
    leaveGuide();
    const c = a.dataset.c;
    setScope(c ? { kind: 'package', id: c.slice(4) } : null);
  }));
}
function nodeLink(id) {
  const n = N.get(id);
  const nm = n.cls ? `${CL.get(n.cls)?.name}.${n.name}` : n.name;
  return `<button class="ln" data-sel="${esc(id)}">${esc(nm)} <span class="dim">${esc(n.module.split('.').pop())}</span></button>`;
}
const KIND_NAME = { same_module: 'same module', cross_module: 'call', into_class: 'into class', intra_class: 'inside class', constructs: 'constructs' };
const SPAN_NAME = { plate: 'same plate · track', row: 'same row · via side ports', cross_row: 'other row · arc' };
const endName = (id) => { const n = N.get(id); return n ? (n.cls ? `${CL.get(n.cls)?.name}.${n.name}` : n.name) : `${CL.get(id).name}()`; };
const slotName = (m, slot) => { const s = SLOT.get(`${m}|${slot}`); return slot === 'tail' ? 'internals' : slot === 'more' ? 'more public names' : s?.name ?? 'dead'; };
function lineTitle(kind, id) {
  if (kind === 'plateribbon') { const pb = view.plate_bundles[id]; return `${PLATE.get(pb.s).name} → ${PLATE.get(pb.t).name}`; }
  const l = view.links[id];
  return `${PANE.get(l.s).name}.${slotName(l.s, l.ss)} → ${PANE.get(l.t).name}.${slotName(l.t, l.ts)}`;
}
function lineSub(kind, id) {
  if (kind === 'plateribbon') { const pb = view.plate_bundles[id]; return `package pair · ${pb.count} call${pb.count === 1 ? '' : 's'} in ${pb.bundles.length} module pair${pb.bundles.length === 1 ? '' : 's'}`; }
  const l = view.links[id];
  return `${SPAN_NAME[l.span]} · ${l.count} call${l.count === 1 ? '' : 's'}`;
}
// ---------------------------------------------------------------- the inspector (right side)
// Header (name, module, line range, signal badges), then Python's source excerpt with its
// Call sites link both ways to the picture:
//   source -> picture  hovering a line whose sites resolve to drawn calls lights exactly those
//                      calls and their callees (state.hoverCall); the rest of the lit set steps
//                      down one notch; clicking a site opens the callee (back returns)
//   picture -> source  hovering a card, row, class, box or track lights the lines that call it
//                      and scrolls the first into view
// Source navigation keeps the camera steady; changing the panel's size reframes the map.
let inspKey = null, curSrc = null, codeEl = null, lastHot = null;
let sourceTab = 'documentation';
const fullName = (id) => { const n = N.get(id); if (n) return n.cls && CL.has(n.cls) ? `${CL.get(n.cls).name}.${n.name}` : n.name; return CL.get(id)?.name ?? String(id); };
const modOfId = (id) => (N.get(id) ?? CL.get(id))?.module;
function siteTitle(s) {
  const e = view.edges[s[4]];
  return `calls ${fullName(e.t)} · ${modOfId(e.t).split('.').pop()}.py · ${KIND_NAME[e.kind]} (click to open)`;
}
function sourceBlock(id) {
  const rec = SRC[id];
  if (!rec) return '<div class="v pad">no source excerpt in the snapshot</div>';
  curSrc = rec;
  const k = (kind) => rec.sites.filter((s) => s[3] === kind).length;
  const drawn = k('edge'), other = rec.sites.length - drawn;
  const labels = { external: 'External calls', unresolved: 'Unresolved targets', excluded: 'Excluded targets' };
  const omitted = [...new Set(rec.sites.filter((site) => site[3] !== 'edge').map((site) => site[3]))];
  const explanation = other ? `<details class="source-note"><summary>${other} calls outside this map</summary>${omitted.map((kind) => `<p>${esc(labels[kind] ?? kind)} · ${k(kind)}</p>`).join('')}<p>These calls remain in the source. Hover their dotted markers for details.</p></details>` : '';
  return `<div class="s">Source <span class="sk">${drawn} linked calls</span></div>${explanation}<div class="code">${codeHtml(rec, siteTitle)}</div>`;
}
function signalTags(n) {
  const tags = [];
  if (n.exported) tags.push(`<span class="tag bold" title="exported from ${esc(n.exported_from.join(', '))}">entry surface · ${esc(n.exported_from[0] ?? '')}</span>`);
  if (n.hub) tags.push('<span class="tag lb">load-bearing · hub</span>');
  if (n.orch) tags.push('<span class="tag lb">load-bearing · orchestrator</span>');
  if (n.clone !== null) tags.push('<span class="tag clone">structural clone</span>');
  if (n.wrapper) tags.push('<span class="tag">pass-through wrapper</span>');
  if (n.dead) tags.push('<span class="tag dead">dead: private, unreachable</span>');
  if (n.slot === 'tail') tags.push('<span class="tag">folded: internals</span>');
  return tags.join('');
}
function renderInspector() {
  const el = $('#inspector');
  const sel = state.inspect;
  if (!sel || panelMode !== 'source') {
    if (!el.classList.contains('hidden')) { el.classList.add('hidden'); dirty = true; schedule(); }
    inspKey = null; curSrc = null; codeEl = null; lastHot = null;
    return;
  }
  const key = `${sel.kind}:${sel.id}|${state.inspectBack.length}`;
  if (key === inspKey && !el.classList.contains('hidden')) return; // emphasis changes keep the panel (and its scroll)
  inspKey = key; curSrc = null; codeEl = null; lastHot = null;
  el.classList.remove('hidden');

  dirty = true; schedule();
  const module = sel.kind === 'node' || sel.kind === 'class' ? modOfId(sel.id) : sel.kind === 'call' ? view.edges[sel.id].ms : null;
  const pane = PANE.get(module);
  const nav = `<nav class="source-crumbs" aria-label="Source location"><button data-browse="root">${esc(view.package)}</button>${pane ? `<span>/</span><button data-browse="package">${esc(DIST.get(pane.district).name)}</button><span>/</span><button data-browse="module">${esc(pane.name)}.py</button>` : ''}</nav>`;
  let head = '', body = '';
  if (sel.kind === 'node') {
    const n = N.get(sel.id), rec = SRC[n.id];
    const tags = signalTags(n);
    head = `<div class="t">${esc(fullName(n.id))}</div><div class="q">${esc(n.module)} · ${rec ? `lines ${rec.start}–${rec.end}` : `line ${n.line}`}</div>${tags ? `<div class="tags">${tags}</div>` : ''}`;
    body += sourceBlock(n.id);
    const callers = view.callers[n.id];
    const calls = [...new Set(view.edges.filter((e) => e.s === n.id).map((e) => e.t))];
    const reach = view.reach[n.id].filter(([, depth]) => depth > 0).map(([index]) => view.nodes[index].id);
    const related = (ids) => ids.map((id) => N.has(id) ? nodeLink(id) : `<button class="ln" data-cls="${esc(id)}">${esc(fullName(id))}</button>`).join('');
    body += `<div class="relationships"><details${callers.length ? ' open' : ''}><summary>Callers <span>${callers.length}</span></summary>${related(callers) || '<p>No resolved callers</p>'}</details><details><summary>Calls <span>${calls.length}</span></summary>${related(calls) || '<p>No resolved calls</p>'}</details><details><summary>Reaches ${reach.length} functions</summary>${related(reach) || '<p>No further functions</p>'}</details></div>`;
  } else if (sel.kind === 'call') {
    // One call: both ends, and the caller's source with the call's sites lit
    const e = view.edges[sel.id];
    head = `<div class="t">${esc(endName(e.s))} → ${esc(endName(e.t))}</div><div class="q">${esc(PANE.get(e.ms).name)}.py → ${esc(PANE.get(e.mt).name)}.py · ${KIND_NAME[e.kind]}${e.ms !== e.mt ? ' · ' + SPAN_NAME[e.span] : ''}</div>`;
    body += `<div class="s">caller</div>${nodeLink(e.s)}`;
    body += `<div class="s">callee</div>${N.get(e.t) ? nodeLink(e.t) : `<div class="ln" data-cls="${esc(e.t)}">${esc(CL.get(e.t).name)}</div>`}`;
    body += sourceBlock(e.s);
  } else if (sel.kind === 'link' || sel.kind === 'plateribbon') {
    head = `<div class="t">${esc(lineTitle(sel.kind, sel.id))}</div><div class="q">${esc(lineSub(sel.kind, sel.id))}</div>`;
    const groups = sel.kind === 'link' ? [view.links[sel.id].members] : view.plate_bundles[sel.id].bundles.map((i) => view.bundles[i].members);
    for (const mem of groups) {
      const e0 = view.edges[mem[0]];
      body += `<div class="s">${esc(PANE.get(e0.ms).name)}.py → ${esc(PANE.get(e0.mt).name)}.py</div>`;
      for (const ei of mem) {
        const e = view.edges[ei];
        body += `<div class="ln" data-sel="${esc(e.s)}">${esc(fullName(e.s))} <span class="dim">→</span> ${esc(fullName(e.t))} <span class="dim">${KIND_NAME[e.kind]}</span></div>`;
      }
    }
  } else {
    const cl = CL.get(sel.id), rec = SRC[cl.id];
    head = `<div class="t">${esc(cl.name)}</div><div class="q">${esc(cl.module)} · ${rec ? `lines ${rec.start}–${rec.end}` : `line ${cl.line}`}</div><div class="tags">${cl.exported ? `<span class="tag bold" title="exported from ${esc(cl.exported_from.join(', '))}">entry surface · ${esc(cl.exported_from[0] ?? '')}</span>` : ''}<span class="tag">${cl.data_only ? 'data class' : 'class'}</span>${cl.dead_private.length ? `<span class="tag dead">${cl.dead_private.length} dead private</span>` : ''}</div>`;
    const mlink = (id) => { const n = N.get(id); return `<span class="ml" data-sel="${esc(id)}">${esc(n.name)}${id === cl.ctor ? '()' : ''}</span>`; };
    if (cl.public.length) body += `<div class="s">constructor and public methods</div><div class="mls">${cl.public.map(mlink).join('')}</div>`;
    if (cl.private.length) body += `<div class="s">private methods</div><div class="mls">${cl.private.map(mlink).join('')}</div>`;
    if (cl.dead_private.length) body += `<div class="s">dead private methods</div><div class="mls">${cl.dead_private.map(mlink).join('')}</div>`;
    if (cl.fields.length) body += `<div class="s">state</div><div class="mls">${cl.fields.map((f) => `<span class="fd">${f.kind === 'owned' ? '◆ ' : f.kind === 'injected' ? '◇ ' : ''}${esc(f.name)}</span>`).join('')}</div>`;
    const makers = [...new Set(view.edges.filter((e) => e.cls === cl.id && (e.kind === 'constructs' || (e.kind === 'into_class' && e.t === cl.ctor))).map((e) => e.s))];
    body += `<div class="s">constructed by</div>${makers.length ? makers.map(nodeLink).join('') : '<div class="v">no resolved constructor call</div>'}`;
    body += sourceBlock(cl.id);
  }
  const docRec = sel.kind === 'node' || sel.kind === 'class' ? SRC[sel.id] : null;
  let tabs = '';
  if (docRec) {
    head += `<pre class="signature"><code>${esc(docRec.signature)}</code></pre>`;
    tabs = `<div class="source-tabs" role="tablist" aria-label="Symbol details">${[['documentation', 'Documentation'], ['code', 'Code']].map(([id, title]) => `<button id="source-tab-${id}" role="tab" data-source-tab="${id}" aria-controls="source-${id}" aria-selected="${sourceTab === id}" tabindex="${sourceTab === id ? 0 : -1}">${title}</button>`).join('')}</div>`;
    body = `<section id="source-documentation" role="tabpanel" aria-labelledby="source-tab-documentation" class="docstring${sourceTab === 'documentation' ? '' : ' hidden'}">${documentationHtml(docRec.docstring)}</section><section id="source-code" role="tabpanel" aria-labelledby="source-tab-code" class="${sourceTab === 'code' ? '' : 'hidden'}">${body}</section>`;
  }
  el.innerHTML = `<div class="ihead">${nav}${head}</div>${tabs}<div class="ibody">${body}</div>`;
  el.querySelectorAll('[data-source-tab]').forEach((button) => button.addEventListener('click', () => {
    sourceTab = button.dataset.sourceTab;
    for (const tab of el.querySelectorAll('[data-source-tab]')) {
      const selected = tab.dataset.sourceTab === sourceTab;
      tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1;
      $(`#source-${tab.dataset.sourceTab}`).classList.toggle('hidden', !selected);
    }
    state.hoverCall = null; lastHot = null; applyEmphasis('hover');
  }));
  el.querySelector('.source-tabs')?.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault(); event.stopPropagation();
    const next = event.key === 'Home' ? 'documentation' : event.key === 'End' ? 'code' : sourceTab === 'code' ? 'documentation' : 'code';
    const button = $(`#source-tab-${next}`); button.click(); button.focus();
  });
  el.querySelectorAll('[data-browse]').forEach((b) => b.addEventListener('click', () => {
    browsePackage = b.dataset.browse === 'root' ? null : pane.district;
    browseModule = b.dataset.browse === 'module' ? module : null;
    $('#symbolSearch').value = '';
    browseScroll = 0; showPanel('browse');
  }));
  el.querySelectorAll('[data-sel]').forEach((a) => a.addEventListener('click', () => openInspector({ kind: 'node', id: a.dataset.sel })));
  el.querySelectorAll('[data-cls]').forEach((a) => a.addEventListener('click', () => openInspector({ kind: 'class', id: a.dataset.cls })));

  codeEl = el.querySelector('.code');
  for (const code of el.querySelectorAll('code[data-indent]')) {
    code.style.paddingLeft = code.dataset.indent + 'ch';
    code.style.textIndent = '-' + code.dataset.indent + 'ch';
  }
  // a linked site whose callee carries a signal takes the signal's hue on its underline
  codeEl?.querySelectorAll('.site.e').forEach((sp) => {
    const t = view.edges[curSrc.sites[+sp.dataset.si][4]].t, n = N.get(t);
    const sg = n ? (n.dead ? 'dead' : n.clone !== null ? 'clone' : n.lb ? 'lb' : null) : null;
    if (sg) sp.classList.add(`sg-${sg}`);
  });
  if (codeEl) {
    // a call site opens its callee in the inspector (no camera move); back returns
    codeEl.addEventListener('click', (ev) => {
      const sp = ev.target.closest('.site.e');
      if (!sp) return;
      const t = view.edges[curSrc.sites[+sp.dataset.si][4]].t;
      openInspector({ kind: CL.has(t) ? 'class' : 'node', id: t });
    });
    codeEl.addEventListener('mouseover', (ev) => hoverSourceAt(ev.target));
    codeEl.addEventListener('mouseleave', () => hoverSourceAt(null));
  }
}
// The hovered source line (or one site on it): its drawn calls and their callees light.
function hoverSourceAt(target) {
  const line = target?.closest?.('.cl');
  const sp = target?.closest?.('.site.e');
  const si = !line || !curSrc ? [] : sp ? [+sp.dataset.si] : (line.dataset.sites ? line.dataset.sites.split(',').map(Number) : []);
  const key = si.length ? si.join(',') : null;
  if ((state.hoverCall?.key ?? null) === key) return;
  if (!key) state.hoverCall = null;
  else {
    const edges = new Set(si.map((i) => curSrc.sites[i][4]));
    state.hoverCall = { key, sites: new Set(si), edges, targets: new Set([...edges].map((k) => view.edges[k].t)), line: +line.dataset.l };
  }
  applyEmphasis('hover');
}
// Light the source lines that match what the reader hovers, here or in the picture.
function syncSource() {
  if (!codeEl || !curSrc || codeEl.closest('.hidden')) return;
  let hot = new Set(), fromPicture = false;
  if (state.hoverCall) hot = state.hoverCall.sites;
  else if (state.hover || state.hoverBox || state.hoverLine) {
    fromPicture = true;
    const id = state.hover, hb = state.hoverBox, hl = state.hoverLine;
    // a track lights its member calls' sites; a call hovered in the picture (a per-call curve,
    // a margin lane) lights exactly its own sites
    const members = hl && hl.startsWith('link:') ? new Set(view.links[+hl.slice(5)].members) : hl && hl.startsWith('call:') ? new Set([+hl.slice(5)]) : null;
    curSrc.sites.forEach((s, i) => {
      if (s[3] !== 'edge') return;
      const e = view.edges[s[4]], t = e.t;
      if ((id && (t === id || N.get(t)?.cls === id || e.cls === id)) || (hb && modOfId(t) === hb) || (members && members.has(s[4]))) hot.add(i);
    });
  }
  const key = [...hot].sort((a, b) => a - b).join(',');
  if (key === lastHot) return;
  lastHot = key;
  codeEl.querySelectorAll('.hot').forEach((x) => x.classList.remove('hot'));
  let first = null;
  for (const i of hot) {
    const sp = codeEl.querySelector(`.site[data-si="${i}"]`);
    if (!sp) continue;
    sp.classList.add('hot');
    const ln = sp.closest('.cl');
    ln.classList.add('hot');
    if (!first || +ln.dataset.l < +first.dataset.l) first = ln;
  }
  if (fromPicture && first) scrollToLine(first);
}
// scroll the inspector body (never the page) so the line stands a third of the way down
function scrollToLine(line) {
  const body = $('#inspector .ibody');
  if (!body) return;
  const br = body.getBoundingClientRect(), lr = line.getBoundingClientRect();
  if (lr.top >= br.top + 24 && lr.bottom <= br.bottom - 24) return;
  body.scrollTop += lr.top - br.top - body.clientHeight / 3;
}
function setInspectorWidth(w, save = false) {
  inspW = Math.round(clamp(w, INSP_MIN, INSP_MAX));
  const width = Math.min(panelExpanded ? W * 0.7 : inspW, W - 280);
  $('#panel').style.width = W < 720 ? 'calc(100% - 24px)' : `${Math.max(280, width)}px`;
  $('#panel .grip').setAttribute('aria-valuemin', '280');
  $('#panel .grip').setAttribute('aria-valuemax', String(Math.max(280, W - 280)));
  $('#panel .grip').setAttribute('aria-valuenow', String(Math.round(width)));
  frameEl.style.setProperty('--panel-space', panelMode && W >= 720 ? `${Math.max(280, width) + 12}px` : '0px');
  if (save) localStorage.setItem(INSP_KEY, String(inspW));
  dirty = true; schedule();
}
function wireGrip(g) {
  g.addEventListener('keydown', (ev) => {
    if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
    ev.preventDefault(); ev.stopPropagation(); panelExpanded = false;
    setInspectorWidth(inspW + (ev.key === 'ArrowLeft' ? 40 : -40), true);
    fitHome(0);
  });
  g.addEventListener('pointerdown', (ev) => {
    ev.preventDefault(); panelExpanded = false;
    g.setPointerCapture(ev.pointerId);
    const x0 = ev.clientX, w0 = $('#panel').getBoundingClientRect().width;
    const move = (e) => { setInspectorWidth(w0 + x0 - e.clientX); fitHome(0); };
    const up = () => {
      g.removeEventListener('pointermove', move); g.removeEventListener('pointerup', up); g.removeEventListener('pointercancel', up);
      setInspectorWidth(inspW, true); fitHome(0);
    };
    g.addEventListener('pointermove', move);
    g.addEventListener('pointerup', up); g.addEventListener('pointercancel', up);
  });
}

// ---------------------------------------------------------------- visual key
// The key and guide share the marks currently visible in the scene.
// a swatch drawn in a 34 x 14 box, shown at cw x ch CSS px (the side panel's markers are smaller)
function keySwatch(draw, w = 34, h = 14, cw = w, ch = h) {
  const c = document.createElement('canvas');
  c.width = cw * 2; c.height = ch * 2;
  c.style.width = `${cw}px`; c.style.height = `${ch}px`;
  const g = c.getContext('2d');
  g.scale((2 * cw) / w, (2 * ch) / h);
  draw(g);
  return c;
}
const hex = (n) => '#' + n.toString(16).padStart(6, '0');
const mixCss = (css, t) => '#' + col(parseInt(css.slice(1), 16)).lerp(col(C.bg), t).getHexString();
const rgbaHex = (n, a) => `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
// swatches, drawn with the current theme's tokens (called at render time)
function swatches() {
  const S = STYLE[viewCtx()], BT = BOX_TIER[S.box];
  const face = hex(C.modFront);
  const row = (extra, edge = TIER.link) => (g) => { g.fillStyle = face; g.fillRect(3, 2, 28, 10); g.strokeStyle = hex(edge); g.lineWidth = 1; g.strokeRect(3.5, 2.5, 27, 9); if (extra) extra(g); };
  const text = (s, weight = 400, size = 8, color = T.text) => (g) => { g.fillStyle = color; g.font = `${weight} ${size}px ${FONT}`; g.fillText(s, 6, 10); };
  const tick = (key, x = 26, y = 1) => (g) => { g.fillStyle = hex(C[key]); g.fillRect(x, y, 6, 6); };
  const mbox = (edge = BT.edge[0], extra) => (g) => {
    g.fillStyle = face; g.fillRect(7, 1, 20, 12.5); g.fillStyle = hex(BT.head); g.fillRect(7, 1, 20, 3.2);
    g.strokeStyle = hex(edge); g.lineWidth = 1; g.strokeRect(7.5, 1.5, 19, 11.5);
    if (extra) extra(g);
  };
  const card = (stroke, width = 1, dash = null, fill = hex(C.card), h = 9) => (g) => {
    g.fillStyle = fill; g.strokeStyle = stroke; g.lineWidth = width; if (dash) g.setLineDash(dash);
    g.fillRect(4, 7 - h / 2, 26, h); g.strokeRect(4, 7 - h / 2, 26, h); g.setLineDash([]);
  };
  const arrow = (g, x, y, dx, dy) => { g.beginPath(); g.moveTo(x, y); g.lineTo(x - 3 * dx + 2 * dy, y - 3 * dy - 2 * dx); g.lineTo(x - 3 * dx - 2 * dy, y - 3 * dy + 2 * dx); g.closePath(); g.fill(); };
  const path = (shape, t) => {
    if (shape === 'arc') return [3 + 28 * t, 13 - 13 * Math.sin(Math.PI * t) ** 0.8];
    if (shape === 'flat') return [3 + 28 * t, 7];
    if (shape === 'metro') return t < 0.2 ? [5, 13 - 45 * t] : t < 0.8 ? [5 + 24 * (t - 0.2) / 0.6, 4] : [29, 4 + 45 * (t - 0.8)];
    if (shape === 'row') return t < 0.15 ? [4, 13 - 60 * t] : t < 0.85 ? [4 + 26 * (t - 0.15) / 0.7, 4] : [30, 4 + 60 * (t - 0.85)];
    return [3, 7];
  };
  const taper = (stroke, w, shape, extra = null) => (g) => {
    if (extra) extra(g);
    const n = 24, P = [];
    for (let i = 0; i <= n; i++) P.push(path(shape, i / n));
    const left = [], right = [];
    P.forEach((p, i) => {
      const q = P[Math.min(i + 1, n)], o = P[Math.max(i - 1, 0)];
      const dx = q[0] - o[0], dy = q[1] - o[1], L = Math.hypot(dx, dy) || 1, hw = (w / 2) * (1 - 0.5 * i / n);
      left.push([p[0] - dy / L * hw, p[1] + dx / L * hw]); right.push([p[0] + dy / L * hw, p[1] - dx / L * hw]);
    });
    const grd = g.createLinearGradient(3, 0, 31, 0);
    grd.addColorStop(0, stroke); grd.addColorStop(1, mixCss(stroke, 0.5));
    g.fillStyle = grd;
    g.beginPath();
    left.forEach((p, i) => (i ? g.lineTo(...p) : g.moveTo(...p)));
    right.reverse().forEach((p) => g.lineTo(...p));
    g.closePath(); g.fill();
  };
  const glow = (g) => { const grd = g.createRadialGradient(17, 7, 0, 17, 7, 5); grd.addColorStop(0, rgbaHex(C.lit, 1)); grd.addColorStop(1, rgbaHex(C.lit, 0)); g.fillStyle = grd; g.fillRect(10, 0, 14, 14); };
  const twoPlates = (g) => { g.fillStyle = hex(C.plate); g.strokeStyle = hex(TIER.edge); g.lineWidth = 1; g.fillRect(1, 11, 13, 3); g.fillRect(20, 11, 13, 3); };
  const ports = (g) => {
    for (const x of [2, 20]) { g.fillStyle = face; g.fillRect(x, 2, 12, 11); g.strokeStyle = hex(TIER.link); g.lineWidth = 1; g.strokeRect(x + 0.5, 2.5, 11, 10); }
    g.strokeStyle = hex(S.link); g.lineWidth = 1.4; g.beginPath(); g.moveTo(14, 9); g.lineTo(16, 9); g.lineTo(16, 0.8); g.lineTo(18, 0.8); g.lineTo(18, 6); g.lineTo(20, 6); g.stroke();
  };
  // a pair in focus: two boxes, each call its own curve from a row to a row
  const curves = (stroke) => (g) => {
    for (const x of [1, 22]) { g.fillStyle = hex(C.modFront); g.fillRect(x, 1, 11, 12.5); g.strokeStyle = hex(TIER.link); g.lineWidth = 1; g.strokeRect(x, 1, 11, 12.5); }
    g.strokeStyle = stroke; g.lineWidth = 1.2;
    for (const [a, b] of [[4, 3.5], [7, 9], [10.5, 12]]) { g.beginPath(); g.moveTo(12, a); g.bezierCurveTo(17, a, 17, b, 22, b); g.stroke(); }
  };
  const lanes = (stroke) => (g) => {
    g.strokeStyle = hex(TIER.strong); g.lineWidth = 1; for (const y of [1, 5.5, 10]) g.strokeRect(16, y, 16, 3.2);
    g.strokeStyle = stroke; g.lineWidth = 1.1;
    for (const [y0, y1, x] of [[2.6, 7.1, 12], [2.6, 11.6, 8], [7.1, 11.6, 12]]) { g.beginPath(); g.moveTo(16, y0); g.lineTo(x, y0); g.lineTo(x, y1); g.lineTo(16, y1); g.stroke(); }
  };
  const flow = (g) => {
    g.fillStyle = hex(C.boxLine); g.strokeStyle = T.muted; g.lineWidth = 1.2;
    g.fillRect(2, 2, 7, 4); g.fillRect(15, 2, 7, 4); g.fillRect(24, 9.5, 8, 4);
    g.beginPath(); g.moveTo(9.5, 4); g.lineTo(13, 4); g.moveTo(22.5, 4); g.lineTo(28, 4); g.lineTo(28, 7); g.stroke();
    g.fillStyle = T.muted; arrow(g, 14.5, 4, 1, 0); arrow(g, 28, 9, 0, 1);
  };
  const stub = (g) => {
    const grd = g.createLinearGradient(0, 13, 0, 2); grd.addColorStop(0, hex(S.link)); grd.addColorStop(0.6, hex(S.link)); grd.addColorStop(1, rgbaHex(S.link, 0));
    g.strokeStyle = grd; g.lineWidth = 1.6; g.beginPath(); g.moveTo(5, 13); g.lineTo(5, 2); g.stroke();
    g.fillStyle = T.muted; g.font = `400 7px ${FONT}`; g.fillText('→ pkg', 9, 6.5);
  };
  const plate = (g) => { g.fillStyle = hex(C.plate); g.strokeStyle = hex(TIER.link); g.lineWidth = 1; g.beginPath(); g.moveTo(3, 12); g.lineTo(28, 12); g.lineTo(32, 5); g.lineTo(7, 5); g.closePath(); g.fill(); g.stroke(); g.fillStyle = T.text; g.fillRect(6, 9.5, 9, 1.4); };
  const curveGround = (stroke) => (g) => { g.strokeStyle = stroke; g.lineWidth = 1.2; g.setLineDash([4, 3]); g.beginPath(); g.moveTo(3, 10); g.bezierCurveTo(12, 4, 20, 4, 27, 8); g.stroke(); g.setLineDash([]); g.fillStyle = stroke; g.beginPath(); g.moveTo(31, 10); g.lineTo(25, 5.5); g.lineTo(24, 10.5); g.closePath(); g.fill(); };
  // the signal swatches match the solid fills, row bars and dotted clone chords
  const deadRow = (g) => {
    g.fillStyle = face; g.fillRect(1, 2, 24, 10);
    g.fillStyle = rgbaHex(C.deadFill, C.deadFillA); g.fillRect(1, 2, 24, 10);
    g.strokeStyle = hex(C.dead); g.lineWidth = 1.2; g.strokeRect(1.5, 2.5, 23, 9); g.setLineDash([]);
    tick('dead', 27, 4)(g);
  };
  const cloneRow = (g) => {
    g.fillStyle = face; g.fillRect(1, 2, 24, 10);
    g.fillStyle = rgbaHex(C.cloneFill, C.cloneFillA); g.fillRect(1, 2, 24, 10);
    g.strokeStyle = hex(TIER.link); g.lineWidth = 1; g.strokeRect(1.5, 2.5, 23, 9);
    g.strokeStyle = hex(C.clone); g.lineWidth = 2; g.beginPath(); g.moveTo(3, 10); g.lineTo(23, 10); g.stroke(); g.setLineDash([]);
    tick('clone', 27, 4)(g);
  };
  const cloneChord = (g) => { g.strokeStyle = hex(C.clone); g.lineWidth = 2; g.lineCap = 'round'; g.setLineDash([0.1, 3]); g.beginPath(); g.moveTo(3, 12); g.bezierCurveTo(6, 0, 28, 0, 31, 12); g.stroke(); g.setLineDash([]); g.lineCap = 'butt'; };
  const lbRow = row((g) => { g.fillStyle = hex(C.lb); g.fillRect(4, 3, 3, 8); });
  const block = (g) => { g.fillStyle = hex(C.boxFront); g.fillRect(3, 1, 17, 12); g.fillStyle = hex(C.boxHead); g.fillRect(3, 1, 17, 3); g.strokeStyle = hex(TIER.strong); g.lineWidth = 1; g.strokeRect(3.5, 1.5, 16, 11); g.fillStyle = hex(C.boxHead); g.fillRect(4, 8.5, 15, 1.6); g.fillStyle = T.muted; g.font = `400 6px ${FONT}`; g.fillText('◆', 23, 6); g.fillText('◇', 23, 12); };
  const fields = (g) => { g.strokeStyle = hex(C.write); g.lineWidth = 1; g.beginPath(); g.moveTo(3, 4); g.bezierCurveTo(10, 4, 12, 10, 19, 10); g.stroke(); g.fillStyle = T.text; g.font = `400 8px ${FONT}`; g.fillText('◆ ◇', 20, 11); };
  const port = (stroke) => (g) => { g.strokeStyle = stroke; g.lineWidth = 1.4; g.beginPath(); g.moveTo(2, 4); g.bezierCurveTo(10, 4, 12, 9, 20, 9); g.stroke(); g.fillStyle = hex(C.boxFront); g.fillRect(20, 3, 12, 10); g.strokeStyle = hex(TIER.strong); g.lineWidth = 1; g.strokeRect(20.5, 3.5, 11, 9); g.fillStyle = stroke; g.fillRect(19, 7.5, 3, 3); };
  const header = (stroke) => (g) => { g.strokeStyle = stroke; g.lineWidth = 1.4; g.beginPath(); g.moveTo(2, 2); g.bezierCurveTo(10, 2, 14, 2, 18, 5); g.stroke(); g.fillStyle = hex(C.boxFront); g.fillRect(14, 5, 18, 8); g.strokeStyle = hex(TIER.strong); g.lineWidth = 1; g.strokeRect(14.5, 5.5, 17, 7); g.fillStyle = stroke; g.fillRect(15, 4, 16, 1.6); };
  const loop = (stroke) => (g) => { g.fillStyle = hex(C.boxFront); g.fillRect(14, 1, 18, 12); g.strokeStyle = hex(TIER.strong); g.lineWidth = 1; g.strokeRect(14.5, 1.5, 17, 11); g.strokeStyle = stroke; g.lineWidth = 1.1; g.beginPath(); g.moveTo(14, 4); g.bezierCurveTo(6, 4, 6, 10, 14, 10); g.stroke(); };
  const pill = (g) => { g.fillStyle = K.pill; g.strokeStyle = K.pillLineStrong; g.lineWidth = 1; g.beginPath(); g.roundRect(3, 2, 28, 10, 2.5); g.fill(); g.stroke(); g.fillStyle = T.lit; g.font = `700 7px ${FONT}`; g.fillText('name', 7, 9.5); };
  const litSlot = row((g) => { g.strokeStyle = hex(C.lit); g.lineWidth = 1.6; g.strokeRect(4, 3, 26, 8); });
  return {
    call: taper(hex(TIER.link), 2.4, 'arc'),
    load_bearing: lbRow, dead: deadRow, clone: cloneRow, clone_chord: cloneChord, import_cycle: curveGround(hex(C.red)),
    outline: (g) => { g.strokeStyle = hex(TIER.link); g.globalAlpha = 0.6; g.lineWidth = 1; g.strokeRect(7.5, 1.5, 19, 11.5); g.globalAlpha = 1; },
    stub_pill: (g) => { g.fillStyle = face; g.fillRect(1, 3, 7, 9); g.strokeStyle = hex(TIER.link); g.lineWidth = 1; g.strokeRect(1.5, 3.5, 6, 8); g.strokeStyle = T.muted; g.beginPath(); g.moveTo(8, 7.5); g.lineTo(12, 7.5); g.stroke(); g.fillStyle = K.pill; g.strokeStyle = K.pillLine; g.beginPath(); g.roundRect(12, 3, 21, 9, 2.5); g.fill(); g.stroke(); g.fillStyle = T.text; g.font = `700 6px ${FONT}`; g.fillText('→ fn', 14, 9.5); },
    site_linked: (g) => { g.fillStyle = T.text; g.font = `400 8px ${FONT}`; g.fillText('fn()', 6, 9); g.fillStyle = hex(TIER.link); g.fillRect(6, 11, 14, 1); g.fillStyle = hex(C.lb); g.fillRect(22, 10.5, 9, 1.5); },
    site_other: (g) => { g.fillStyle = T.muted; g.font = `400 8px ${FONT}`; g.fillText('len()', 4, 9); g.fillStyle = hex(TIER.link); g.beginPath(); g.arc(29, 4, 1.6, 0, 7); g.fill(); },
    call_pill: (g) => { g.fillStyle = K.pill; g.strokeStyle = K.pillLineStrong; g.lineWidth = 1; g.beginPath(); g.roundRect(1, 2, 32, 10, 2.5); g.fill(); g.stroke(); g.fillStyle = T.lit; g.font = `700 6px ${FONT}`; g.fillText('a → b', 4, 9.3); },
    lit: litSlot, trace: taper(hex(C.lit), 3, 'flat'), pulse: (g) => { taper(hex(C.lit), 2, 'flat')(g); glow(g); }, evidence: pill,
    plate, box: mbox(), row: row(text('fn')), exported: row(text('fn', 700)), class_row: row((g) => { g.fillStyle = hex(C.classRow); g.fillRect(6, 4, 22, 6); g.strokeStyle = hex(TIER.edge); g.strokeRect(6.5, 4.5, 21, 5); }),
    more: row((g) => { g.strokeStyle = hex(TIER.link); g.lineWidth = 1; for (const y of [5.5, 7.5, 9.5]) { g.beginPath(); g.moveTo(5, y); g.lineTo(29, y); g.stroke(); } }),
    tail: row((g) => { g.fillStyle = hex(C.boxHead); g.fillRect(4, 3, 26, 8); }), wrapper: row(text('fn', 400, 6)),
    card: card(hex(S.card[0])), class_block: card(hex(S.block[0]), 1.2), class_open: block, fields,
    plate_ribbon: taper(hex(S.ribbon === TIER.rule ? TIER.link : S.ribbon), 5, 'arc'),
    link_track: taper(hex(S.link), 2.4, 'metro'), link_row: taper(hex(S.link), 2.4, 'row', twoPlates), link_arc: taper(hex(S.link), 2.4, 'arc'),
    margin_arc: lanes(hex(S.call)), curve: curves(hex(S.call)), into_class: port(hex(S.call)), constructs: header(hex(S.call)), intra: loop(hex(S.call)), stub,
    import: curveGround(hex(TIER.link)),
    flow, ports, click: mbox(TIER.link, (g) => { g.strokeStyle = T.lit; g.lineWidth = 1.2; g.strokeRect(7.5, 1.5, 19, 3.2); }),
  };
}
// [id, section, short words (legend), long words (key, guide), reading views (o n p m)]
const MARK_TABLE = [
  ['load_bearing', 'signals', 'Load-bearing', 'blue bar: widely called function or one that calls many others'],
  ['dead', 'signals', 'Possibly unused', 'amber fill: unreachable from known entry points; possibly unused'],
  ['clone', 'signals', 'Structural clone', 'purple fill / tick: matching code structure elsewhere'],
  ['clone_chord', 'signals', 'clone pair', 'clone pair: dotted purple chord'],
  ['import_cycle', 'signals', 'Import cycle', 'import cycle: red dashed line'],
  ['lit', 'attention', 'lit', 'lit: named, selected or hovered'],
  ['trace', 'attention', 'traced path', 'traced path: the heaviest lit line'],
  ['pulse', 'attention', 'pulses', 'pulses: caller → callee, 3 runs'],
  ['evidence', 'attention', 'name pill', 'pill: a lit name too small to print'],
  ['call_pill', 'attention', 'hovered call', 'hovered call: caller → callee pill'],
  ['plate', 'units', 'package', 'package: one enclosing box and labeled base'],
  ['box', 'units', 'module', 'module: a box, rows fold inside'],
  ['outline', 'units', 'outside scope', 'module outside the scope: outline only'],
  ['row', 'units', 'public name', 'public name: a row on its box'],
  ['exported', 'units', 'exported (bold)', 'bold name: exported (__all__)'],
  ['class_row', 'units', 'class', 'class: an inset row'],
  ['more', 'units', 'more names', 'more public names: hairlines'],
  ['tail', 'units', 'internals', 'internals: muted band at the bottom'],
  ['wrapper', 'units', 'wrapper', 'wrapper: small type'],
  ['card', 'units', 'function', 'unfolded module: cards by depth'],
  ['class_block', 'units', 'class block', 'class: a block of public rows'],
  ['class_open', 'units', 'class opened', 'class opened: private rows below'],
  ['fields', 'units', 'state', 'state: ◆ owned, ◇ injected'],
  ['call', 'calls', 'Function call', 'solid line: resolved function call'],
  ['plate_ribbon', 'calls', 'package pair', 'package to package: one ribbon'],
  ['link_track', 'calls', 'module pair', 'call in the package: track above'],
  ['link_row', 'calls', 'along the row', 'call along the row: side track'],
  ['link_arc', 'calls', 'to another row', 'call to another row: arc overhead'],
  ['curve', 'calls', 'call by call', 'two modules in focus: a curve per call'],
  ['margin_arc', 'calls', 'margin lane', 'call inside the module: margin lane'],
  ['into_class', 'calls', 'into a class', 'call into a class: side port'],
  ['constructs', 'calls', 'constructs', 'constructs: bar on class header'],
  ['intra', 'calls', 'inside a class', 'call inside the class: edge loop'],
  ['stub', 'calls', 'leaves scope', 'call leaving: stub, → package'],
  ['stub_pill', 'calls', 'off-row call', 'off-row call: pill → name · pkg'],
  ['site_linked', 'source', 'drawn call', 'source: underline = a drawn call (hue: callee signal)'],
  ['site_other', 'source', 'not drawn', 'source: dot = external or unresolved call'],
  ['import', 'calls', 'import', 'import: dashed, on the ground'],
  ['flow', 'reading', '', 'flow: → in a row, ↓ row to row', 'onp'],
  ['ports', 'reading', '', 'in on the left, out on the right', 'pm'],
  ['click', 'reading', '', 'box: scope · header: unfold', 'op'],
];
const SECTION_NAME = { signals: 'signals', attention: 'attention', units: 'units', calls: 'calls', source: 'source', reading: 'reading' };
const SPAN_MARK = { plate: 'link_track', row: 'link_row', cross_row: 'link_arc' };
// What the picture draws now: every entry whose mark is on screen at alpha 0.1 or more,
// read from the scene's own objects (the census's rule).
function onScreenPts(pts) {
  const insp = inspPx();
  const x0 = PAD_L, x1 = W - insp, y0 = PAD_T, y1 = H - PAD_B;
  for (const p of pts) { const P = scr(p[0], p[1], p[2]); if (P[2] <= 1 && P[0] >= x0 && P[0] <= x1 && P[1] >= y0 && P[1] <= y1) return true; }
  return false;
}
function drawnMarks(thr = 0.1) {
  const on = new Set();
  const vis = (pts) => onScreenPts(pts);
  const sp = (o) => { const out = []; for (let i = 0; i < o.n; i += Math.max(1, Math.floor(o.n / 12))) out.push([o.pts[i * 3], o.pts[i * 3 + 1], o.pts[i * 3 + 2]]); out.push([o.pts[o.n * 3 - 3], o.pts[o.n * 3 - 2], o.pts[o.n * 3 - 1]]); return out; };
  const isLit = (line) => line.userData.paintKey && Number(line.userData.paintKey.split('|')[0]) === C.lit;
  for (const o of plateObjs.values()) if (o.a >= thr && vis([[o.d.x, F.ground, o.d.z], [o.d.x + o.d.w, F.ground, o.d.z]])) on.add('plate');
  for (const o of modObjs.values()) {
    if (o.a < thr) continue;
    const b = o.b, z = o.p.z + b.d;
    if (!vis([[b.x, 0, z], [b.x + b.w, 0, z], [b.x, -o.h, z], [b.x + b.w, -o.h, z]])) continue;
    // A box outside a scope is a silhouette: its outline only, no rows
    if (o.sil) { on.add('outline'); continue; }
    on.add('box');
    if (o.edges.material.color.getHex() === C.lit) on.add('lit');
    const fold = o.a * (1 - ease(o.u));
    if (fold < thr) continue;
    const slotOn = (y, h) => vis([[b.x, -y, z], [b.x + b.w, -y, z], [b.x, -y - h, z], [b.x + b.w, -y - h, z]]);
    const rowsOn = o.rowsA * fold >= thr;
    for (const r of b.rows) {
      if (!slotOn(r.y, r.h)) continue;
      if (rowsOn) { on.add(r.kind === 'class' ? 'class_row' : 'row'); if (BOLD(r)) on.add('exported'); if (r.wrapper) on.add('wrapper'); }
      if (r.lb) on.add('load_bearing');
      if (r.clone) on.add('clone');
    }
    for (const band of [b.more, b.tail]) {
      if (!band || !slotOn(band.y, band.h)) continue;
      on.add(band === b.more ? 'more' : 'tail');
      if (band.lb) on.add('load_bearing');
      if (band.clone) on.add('clone');
    }
    for (const gr of b.ghosts) if (slotOn(gr.y, gr.h)) on.add('dead');
    if (slotOn(0, D.mod_header)) {
      if (b.ghosts.length) on.add('dead');
      if (b.rows.some((r) => r.clone) || b.tail?.clone || b.more?.clone) on.add('clone');
    }
    for (const ln of o.lit.values()) if (ln.visible && ln.material.opacity >= thr) on.add('lit');
  }
  for (const o of cardObjs.values()) {
    const n = o.n;
    if (!o.border.visible || o.border.material.opacity < thr || !vis([[n.x, n.y, n.z], [n.x + n.w, n.y - n.h, n.z]])) continue;
    on.add('card');
    if (n.dead) on.add('dead'); else if (n.lb) on.add('load_bearing');
    if (n.clone !== null) on.add('clone');
    if (BOLD(n)) on.add('exported');
    if (n.wrapper) on.add('wrapper');
    if (isLit(o.border)) on.add('lit');
  }
  for (const o of boxObjs.values()) {
    const cl = o.cl;
    if (!o.group.visible || o.mats[4].opacity < thr || !vis([[cl.x, cl.y, cl.z], [cl.x + cl.w, cl.y - cl.h, cl.z]])) continue;
    on.add('class_block');
    if (o.open && cl.private.length) on.add('class_open');
    if (cl.fields.length && (cl.data_only || o.open)) on.add('fields');
    for (const m of boxGeom(cl).rows) { const n = N.get(m); if (n.lb) on.add('load_bearing'); if (n.clone !== null) on.add('clone'); if (BOLD(n)) on.add('exported'); }
    if (!o.open && cl.private.length) on.add('tail');
    if (o.edges.material.color.getHex() === C.lit) on.add('lit');
  }
  for (const o of edgeObjs) {
    if (!o.line.visible || o.line.material.opacity < thr || !vis(sp(o))) continue;
    const e = o.e;
    if (e.kind === 'intra_class') on.add('intra');
    else {
      if (e.kind === 'constructs') on.add('constructs');
      if (e.kind === 'into_class') on.add('into_class');
      on.add(o.inner ? 'margin_arc' : SPAN_MARK[e.span]);
    }
    if (o.stub) on.add('stub');
    if (o.lastA === C.lit) on.add('lit');
    if (o.lastA === C.dead) on.add('dead');
    if (SEL?.trace?.has(o)) on.add('trace');
  }
  for (const o of linkObjs) {
    if (!o.line.visible || o.line.material.opacity < thr || !vis(sp(o))) continue;
    on.add(SPAN_MARK[o.l.span]);
    if (o.stub) on.add('stub');
    if (o.lastA === C.lit) on.add('lit');
    if (SEL?.traceLinks?.has(o.li)) on.add('trace');
  }
  for (const o of curveList) {
    if (!o.line.visible || o.line.material.opacity < thr || !vis(sp(o))) continue;
    on.add('curve');
    if (o.lastA === C.lit) on.add('lit');
    if (o.lastA === C.dead) on.add('dead');
    if (SEL?.trace?.has(edgeObjs[o.ei])) on.add('trace');
  }
  for (const o of plateRibbonObjs) if (o.line.visible && o.line.material.opacity >= thr && vis(sp(o))) { on.add('plate_ribbon'); if (o.lastA === C.lit) on.add('lit'); }
  for (const o of cloneObjs) if (o.line.visible && o.line.material.opacity >= thr && vis(sp({ pts: o.pts, n: o.pts.length / 3 }))) on.add('clone_chord');
  for (const o of importObjs) if (o.line.visible && o.line.material.opacity >= thr && vis(sp({ pts: o.pts, n: o.pts.length / 3 }))) on.add(o.imp.cycle ? 'import_cycle' : 'import');
  if (pulseRun) on.add('pulse');
  if (labelLog.some((l) => l.kind === 'callout')) on.add('evidence');
  if (labelLog.some((l) => l.kind === 'pill')) on.add('call_pill');
  if (labelLog.some((l) => l.kind === 'stubpill')) on.add('stub_pill');
  // The inspector's source: its linked sites and its not-drawn markers.
  if (codeEl && !$('#inspector').classList.contains('hidden')) {
    if (codeEl.querySelector('.site.e')) on.add('site_linked');
    if (codeEl.querySelector('.site.x')) on.add('site_other');
  }
  return on;
}
const MARK_ROW = (e, words, sw, cls = 'k', size = [34, 14]) => {
  const r = document.createElement('div');
  r.className = cls + (e[1] === 'signals' ? ' sig' : '');
  r.dataset.mark = e[0];
  r.appendChild(keySwatch(sw[e[0]], 34, 14, ...size));
  const s = document.createElement('span');
  s.textContent = words;
  r.appendChild(s);
  return r;
};
let marksOn = new Set(), marksKey = null;
// the key overlay (k): the same marks in long words, by section, plus the view's conventions
function renderKey(set = marksOn) {
  const el = $('#key'), sw = swatches();
  const tagOf = { overview: 'o', plan: 'n', package: 'p', module: 'm' }[viewCtx()];
  const list = MARK_TABLE.filter((e) => (e[1] === 'reading' ? e[4].includes(tagOf) : e[1] === 'signals' || e[0] === 'call' || e[0] === 'import' || set.has(e[0])));
  const secs = [...new Set(list.map((e) => e[1]))];
  el.innerHTML = '<header class="legend-title"><strong>Map legend</strong><button type="button" aria-label="Close legend">×</button></header>';
  el.querySelector('button').addEventListener('click', () => toggleKey(false));
  const compact = $('#legendMarks');
  compact.replaceChildren();
  for (const [id, words] of [['load_bearing', 'Load-bearing'], ['clone', 'Structural clone'], ['dead', 'Possibly unused'], ['import_cycle', 'Import cycle'], ['call', 'Solid: function call'], ['import', 'Dashed: import'], ['clone_chord', 'Dotted: clone pair'], ['tail', 'Muted band: internals']]) {
    compact.appendChild(MARK_ROW(MARK_TABLE.find((e) => e[0] === id), words, sw));
  }
  for (const sec of secs) {
    const colEl = document.createElement('div');
    const h = document.createElement('div');
    h.className = 'kh'; h.textContent = SECTION_NAME[sec];
    colEl.appendChild(h);
    for (const e of list.filter((x) => x[1] === sec)) colEl.appendChild(MARK_ROW(e, e[3], sw));
    el.appendChild(colEl);
  }
}
// The guide's "In the picture": of the marks on screen, every colour and highlight (signals,
// attention) and the marks the step is about (Python's step.marks), in long words. It is a
// subset of the key, retaining the current step's signals and highlights.
const STEP_ALIAS = { hub: 'load_bearing' };
function guideMarkSet(set = marksOn) {
  const G = guideStep();
  const about = new Set((G?.marks ?? []).map((m) => STEP_ALIAS[m] ?? m));
  if (about.has('row')) about.add('exported');
  if (about.has('clone')) about.add('clone_chord');
  return new Set([...set].filter((id) => { const e = MARK_TABLE.find((x) => x[0] === id); return e && (e[1] === 'signals' || e[1] === 'attention' || about.has(id)); }));
}
function renderGuideMarks(set = marksOn) {
  const box = document.querySelector('#gmarks');
  if (!box) return;
  const sw = swatches(), show = guideMarkSet(set);
  box.innerHTML = '';
  for (const e of MARK_TABLE) if (e[1] !== 'reading' && show.has(e[0])) box.appendChild(MARK_ROW(e, e[3], sw));
}
// Rebuild the key and guide after the picture settles and the marks change.
function updateMarks(force = false) {
  const set = drawnMarks();
  const key = [...set].sort().join(',') + '|' + THEME + '|' + viewCtx();
  if (!force && key === marksKey) return false;
  marksKey = key; marksOn = set;
  renderKey(set); renderGuideMarks(set);
  return true;
}

// ---------------------------------------------------------------- hash state
// On the path the hash is #guide=<step-id>; off the path it is the explorer's state plus
// at=<step-id>, the step "Resume guide" returns to.
function writeHash() {
  const p = new URLSearchParams();
  if (state.guide !== null) {
    p.set('guide', STEPS[state.guide].id);
    if (state.proj !== 'ortho') p.set('proj', state.proj);
    history.replaceState(null, '', '#' + p.toString());
    return;
  }
  if (state.scope) p.set('scope', `${state.scope.kind}:${state.scope.id}`);
  if (state.selected) p.set('sel', `${state.selected.kind}:${state.selected.id}`);
  const extra = [...state.open].filter((m) => m !== focusModule());
  if (extra.length) p.set('unfold', extra.join(','));
  if (state.expanded.size) p.set('open', [...state.expanded].join(','));
  p.set('view', state.view);
  if (state.proj !== 'ortho') p.set('proj', state.proj);
  p.set('at', STEPS[state.resume].id);
  history.replaceState(null, '', '#' + p.toString());
}
// An empty hash lands on the first step; #guide=<id> on that step; anything else is free
// exploration (#map: the whole map).
function readHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  if (p.get('proj') === 'persp') state.proj = 'persp';
  if (!location.hash.slice(1) || p.has('guide')) return { guide: STEP_INDEX.get(p.get('guide')) ?? 0 };
  state.resume = STEP_INDEX.get(p.get('at')) ?? 0;
  const sp = (v) => {
    if (!v) return null;
    const i = v.indexOf(':'), kind = v.slice(0, i), id = v.slice(i + 1);
    return { kind, id: kind === 'link' || kind === 'plateribbon' || kind === 'call' ? +id : id };
  };
  state.scope = sp(p.get('scope'));
  state.selected = sp(p.get('sel'));
  state.inspect = state.selected; // off the path the inspector shows the selection
  const want = [...(state.scope?.kind === 'module' ? [state.scope.id] : []), ...(p.get('unfold') || '').split(',').filter((m) => PANE.has(m))];
  for (const m of want) { setOpen(m, true); const o = modObjs.get(m); o.u = 1; setBodyH(o, o.b.open_h); }
  for (const c of (p.get('open') || '').split(',').filter(Boolean)) {
    if (!CL.has(c) || !state.open.has(CL.get(c).module)) continue;
    state.expanded.add(c);
    const o = buildBox(CL.get(c));
    o.lift = 1; o.liftTarget = 1;
    o.group.position.z = CL.get(c).z + CL.get(c).expanded.lift;
    rerouteClass(c);
  }
  state.view = p.get('view') || 'axo';
  return { guide: null };
}

// ---------------------------------------------------------------- loop
function resize() {
  W = viewW(); H = viewH();
  setInspectorWidth(inspW);
  renderer.setSize(W, H, false);
  labelCanvas.width = W * DPR; labelCanvas.height = H * DPR;
  applyViewOffset();
  for (const m of lineMats) m.resolution.set(W, H);
  dirty = true; schedule();
  if (ready) fitHome(0);
}
addEventListener('resize', () => { resize(); });

function schedule() { if (!rafPending) { rafPending = true; requestAnimationFrame((t) => { rafPending = false; frame(t); }); } }
function frame(now) {
  const flying = stepFlight(now);
  const fading = stepAlphas(now);
  const pulsing = stepPulses(now / 1000);
  const moved = flying ? false : controls.update();
  if (flying || fading || pulsing || moved) schedule();
  if (!(dirty || flying || fading || pulsing || moved)) { scheduleMarks(); return; }
  if (!flying && (moved || dirty)) updateLod();
  const dist = camera.position.distanceTo(controls.target);
  scene.fog.near = dist * 0.9; scene.fog.far = dist * 2.6;
  const ppu = pxPerUnit();
  for (const mat of lineMats) if (mat.dashed) mat.dashScale = ppu;
  renderer.render(scene, camera);
  drawLabels();
  dirty = false;
  // The key and guide follow the picture once it settles: the scene read
  // (drawnMarks, 2 to 3 ms) runs once, 120 ms after the last drawn frame, never inside a frame
  if (!flying && !fading) scheduleMarks();
}
let marksTimer = 0;
function scheduleMarks() {
  clearTimeout(marksTimer);
  marksTimer = setTimeout(() => {
    updateMarks();
  }, 120);
}

// ---------------------------------------------------------------- theme
// A theme change swaps the tokens and re-colours everything in place: registered materials
// and build-time lines, fog, pulses, box tiers, the class blocks (rebuilt), and
// every line applyEmphasis paints. Nothing moves; the camera stays.
function setTheme(name, { persist = true } = {}) {
  if (!THEMES[name]) return;
  loadTokens(name);
  document.documentElement.dataset.theme = name;
  if (persist) { try { localStorage.setItem(THEME_KEY, name); } catch { /* storage off */ } }
  for (const [m, key] of TOKMATS) m.color.set(C[key]);
  for (const [line, key, n] of TOKLINES) { line.userData.paintKey = null; paintLine(line, C[key], null, n); }
  scene.fog.color.set(C.bg);
  themePulses();
  for (const o of modObjs.values()) {
    for (const x of o.sig) {
      const r = x.userData.role;
      if (r === 'cloneFill') x.userData.k = C.cloneFillA;
      else if (r === 'deadFill') x.userData.k = C.deadFillA;
      else if (r === 'deadLines') x.material.color.set(C.dead);
    }
    o.tier = null;
    modAlpha(o);
  }
  for (const o of cardObjs.values()) { o.border.userData.paintKey = null; cardAlpha(o); }
  for (const cl of view.classes) buildBox(cl);
  for (const o of [...edgeObjs, ...linkObjs, ...plateRibbonObjs, ...curveList]) o.paintKey = null;
  for (const o of importObjs) o.line.userData.paintKey = null;
  for (const o of plateObjs.values()) o.outline.userData.paintKey = null;
  $('#themeBtn .tn').textContent = name;
  renderTree();
  applyEmphasis('hover');
  updateMarks(true);
  dirty = true; schedule();
}
resize();
const boot = readHash();
panelMode = boot.guide !== null ? 'guide' : state.inspect ? 'source' : 'browse';
browsePackage = scopePackage(); browseModule = focusModule();
showPanel(panelMode, false);
renderTree(); renderCrumbs();
$('#themeBtn .tn').textContent = THEME;

for (const o of modObjs.values()) modAlpha(o);
if (boot.guide !== null) guideGo(boot.guide, { ms: 0 });
else { renderGuide(); applyEmphasis(); goView(state.view, 0); }
document.querySelectorAll('#views [data-view]').forEach((b) => b.addEventListener('click', () => { leaveGuide(); goView(b.dataset.view); }));
$('#mapBtn').addEventListener('click', () => toMap());
$('#keyBtn').addEventListener('click', () => toggleKey());
$('#legendMore').addEventListener('click', () => toggleKey(true));
$('#helpBtn').addEventListener('click', () => toggleHelp());
$('#projBtn').addEventListener('click', () => toggleProjection());
ready = true;
wirePanel();
renderHelp();
$('#projBtn').classList.toggle('on', state.proj === 'ortho');
$('#projBtn').textContent = state.proj === 'ortho' ? 'Orthographic' : 'Perspective';
$('#themeBtn').addEventListener('click', () => setTheme(THEME === 'dark' ? 'light' : 'dark'));
// without a stored choice the page follows the system setting as it changes
matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
  let stored = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch { /* storage off */ }
  if (!stored && !new URLSearchParams(location.search).get('theme')) setTheme(e.matches ? 'light' : 'dark', { persist: false });
});
$('#status').classList.add('hidden');
schedule();


}
start();
