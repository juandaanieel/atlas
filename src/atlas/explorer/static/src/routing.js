// Connection geometry for Strata. Pure
// functions, no three.js. Python (prepare.py, build_routes) decides every path: the
// module-pair tracks and sky arcs, the plate ribbons, each call's stub, its per-call
// curve, its margin lane inside an unfolded module, and the loops inside an opened
// class, each in every state of its two ends. This module only samples Python's cubic
// pieces and answers lookups; nothing here routes, orders or offsets a line.
//
// A path is a flat list: a start point, then pieces of 10 numbers (n, c1, c2, p): a
// cubic from the previous point through controls c1 and c2 to p, sampled at n steps.

export function samplePath(a) {
  const out = [[a[0], a[1], a[2]]];
  for (let i = 3; i + 9 < a.length + 0; i += 10) {
    const n = a[i], p0 = out[out.length - 1];
    const c1 = [a[i + 1], a[i + 2], a[i + 3]], c2 = [a[i + 4], a[i + 5], a[i + 6]], p3 = [a[i + 7], a[i + 8], a[i + 9]];
    for (let k = 1; k <= n; k++) {
      const t = k / n, u = 1 - t, A = u * u * u, B = 3 * u * u * t, C = 3 * u * t * t, D = t * t * t;
      out.push([0, 1, 2].map((j) => A * p0[j] + B * c1[j] + C * c2[j] + D * p3[j]));
    }
  }
  return out;
}

export function slotsOf(box) {
  return [...box.rows, ...(box.more ? [box.more] : []), ...(box.tail ? [box.tail] : []), ...box.ghosts];
}

export function makeRouting(view) {
  const RT = view.routes;
  const PLATE = new Map(view.plates.map((p) => [p.unit, p]));
  // a row stub leaves its plate through the side port that faces the partner plate
  function sidePort(unit, toward) {
    const p = PLATE.get(unit), o = PLATE.get(toward);
    const right = o.x > p.x;
    const port = p.ports[right ? 'right' : 'left'];
    return { x: port ? port.x : right ? p.x + p.w : p.x, z: p.z, side: right ? 'right' : 'left' };
  }
  return {
    bandTop: (unit) => RT.plates[unit].band_top,
    skyBase: (unit) => RT.plates[unit].sky_base,
    sidePort,
    link: (li) => samplePath(RT.links[li]),
    ribbon: (k) => samplePath(RT.ribbons[k]),
    // a call's path of one kind (track | curve | margin | loop) in one variant (two of f o x)
    has: (ei, kind, key) => !!RT.calls[ei][kind]?.[key],
    raw: (ei, kind, key) => RT.calls[ei][kind]?.[key] ?? null,
    call: (ei, kind, key) => { const a = RT.calls[ei][kind]?.[key]; return a ? samplePath(a) : null; },
    variants: (ei, kind) => Object.keys(RT.calls[ei][kind] ?? {}),
  };
}
