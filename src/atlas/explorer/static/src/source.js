// The inspector's source view (docs/plans/strata-inspector.md): a Python tokenizer
// (ported from the 2D explorer's highlightPythonLine, returning token ranges instead of
// HTML) and the excerpt as DOM lines whose call sites carry Python's linking.
// Python (source.py) decides what every call site is: a drawn call (its
// edge index), external, unresolved, recursive or undrawn, and its column range. This
// file only colours tokens and wraps Python's column ranges.

const KEYWORDS = new Set(('and as assert async await break case class continue def del elif else except finally for from global if import in is ' +
  'lambda match nonlocal not or pass raise return try while with yield').split(' '));
const CONSTANTS = new Set(['False', 'None', 'True', 'Ellipsis', 'NotImplemented']);
const BUILTINS = new Set(('abs all any bool bytes callable chr classmethod dict dir enumerate filter float frozenset getattr hasattr hash help hex ' +
  'id int isinstance issubclass iter len list map max memoryview min next object oct open ord pow print property range ' +
  'repr reversed round set setattr slice sorted staticmethod str sum super tuple type vars zip').split(' '));

function stringEnd(line, delim, start) {
  for (let i = start; i <= line.length - delim.length; i++) {
    if (line.slice(i, i + delim.length) !== delim) continue;
    let slashes = 0;
    for (let c = i - 1; c >= 0 && line[c] === '\\'; c--) slashes++;
    if (slashes % 2 === 0) return i;
  }
  return -1;
}

// One line -> [[kind, start, end], ...]; `st.triple` carries an open triple-quoted string
// across lines. Kinds: com str kw def dec con bi num op call name (gaps are plain text).
export function tokenizeLine(line, st) {
  const out = [];
  let i = 0, expectDef = false, decorator = false;
  while (i < line.length) {
    if (st.triple) {
      const e = stringEnd(line, st.triple, i);
      if (e < 0) { out.push(['str', i, line.length]); return out; }
      out.push(['str', i, e + st.triple.length]);
      i = e + st.triple.length;
      st.triple = null;
      continue;
    }
    const ch = line[i];
    if (ch === '#') { out.push(['com', i, line.length]); return out; }
    if (ch === '@') { out.push(['dec', i, i + 1]); decorator = true; i++; continue; }
    if (ch === "'" || ch === '"') {
      // a string prefix (f, r, b, rb, ...) was read as a name just before: fold it in
      const prev = out[out.length - 1];
      const tri = line.slice(i, i + 3), delim = tri === "'''" || tri === '"""' ? tri : ch;
      const e = stringEnd(line, delim, i + delim.length);
      let s0 = i;
      if (prev && prev[0] === 'name' && prev[2] === i && /^[rRbBfFuU]{1,2}$/.test(line.slice(prev[1], prev[2]))) { s0 = prev[1]; out.pop(); }
      if (e < 0) {
        if (delim.length === 3) st.triple = delim;
        out.push(['str', s0, line.length]);
        return out;
      }
      out.push(['str', s0, e + delim.length]);
      i = e + delim.length;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      let e = i + 1;
      while (e < line.length && /[A-Za-z0-9_]/.test(line[e])) e++;
      const w = line.slice(i, e);
      let kind = 'name';
      if (expectDef) { kind = 'def'; expectDef = false; }
      else if (decorator) { kind = 'dec'; decorator = false; }
      else if (KEYWORDS.has(w)) { kind = 'kw'; expectDef = w === 'def' || w === 'class'; }
      else if (CONSTANTS.has(w)) kind = 'con';
      else if (BUILTINS.has(w)) kind = 'bi';
      else if (line.slice(e).trimStart()[0] === '(') kind = 'call';
      out.push([kind, i, e]);
      i = e;
      continue;
    }
    if (/[0-9]/.test(ch)) {
      const m = line.slice(i).match(/^(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|[0-9][0-9_]*(?:\.[0-9_]*)?(?:[eE][+-]?[0-9_]+)?j?)/);
      const n = m ? m[0].length : 1;
      out.push(['num', i, i + n]);
      i += n;
      continue;
    }
    if (/[+\-*/%=&|^~<>!:]/.test(ch)) {
      let e = i + 1;
      while (e < line.length && /[+\-*/%=&|^~<>!:]/.test(line[e])) e++;
      out.push(['op', i, e]);
      i = e;
      continue;
    }
    i++;
  }
  return out;
}

export const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// The tooltip of a call site that is not drawn: the first word is its kind.
export const SITE_NOTE = {
  external: 'external: outside the package, not drawn',
  unresolved: 'unresolved: no static target, not drawn',
  recursive: 'recursive: calls itself, not drawn',
  undrawn: 'undrawn: the callee is not in the picture',
};

// The excerpt as HTML: one .cl per line (number, code). A site is a span over Python's
// column range: .site.e (a drawn call: data-si indexes `sites`, underlined, clickable) or
// .site.x (not drawn: a muted marker and a tooltip naming its kind).
// `title(site)` gives an edge site's tooltip.
export function codeHtml(rec, title) {
  const lines = rec.text.split('\n');
  const byLine = new Map();
  rec.sites.forEach((s, si) => {
    if (s[1] < 0) return;
    if (!byLine.has(s[0])) byLine.set(s[0], []);
    byLine.get(s[0]).push(si);
  });
  const st = { triple: null };
  const html = [];
  lines.forEach((line, k) => {
    const no = rec.start + k;
    const toks = tokenizeLine(line, st);
    const sites = (byLine.get(no) ?? []).map((si) => [si, rec.sites[si]]).sort((a, b) => a[1][1] - b[1][1]);
    // boundaries: every token edge and every site edge
    const cuts = new Set([0, line.length]);
    for (const [, a, b] of toks) { cuts.add(a); cuts.add(b); }
    for (const [, s] of sites) { cuts.add(s[1]); cuts.add(Math.min(line.length, s[2])); }
    const xs = [...cuts].sort((a, b) => a - b);
    const kindAt = (x) => { for (const [kd, a, b] of toks) if (x >= a && x < b) return kd; return null; };
    let h = '', open = null;
    const edgeSites = [];
    for (let j = 0; j < xs.length - 1; j++) {
      const a = xs[j], b = xs[j + 1];
      if (a === b) continue;
      const site = sites.find(([, s]) => s[1] === a);
      if (site && !open) {
        const [si, s] = site;
        open = s;
        if (s[3] === 'edge') { edgeSites.push(si); h += `<span class="site e" data-si="${si}" title="${escapeHtml(title(s))}">`; }
        else h += `<span class="site x" data-si="${si}" title="${escapeHtml(SITE_NOTE[s[3]] + ' · ' + s[5])}">`;
      }
      const kd = kindAt(a), t = escapeHtml(line.slice(a, b));
      h += kd && kd !== 'name' ? `<span class="tk-${kd}">${t}</span>` : t;
      if (open && b >= Math.min(line.length, open[2])) {
        h += open[3] === 'edge' ? '<i class="ul"></i></span>' : '<i class="mk"></i></span>';
        open = null;
      }
    }
    if (open) h += open[3] === 'edge' ? '<i class="ul"></i></span>' : '<i class="mk"></i></span>';
    // a wrapped line continues four columns in from its own indentation
    const ind = line.length - line.trimStart().length + 4;
    html.push(`<div class="cl${edgeSites.length ? ' ce' : ''}" data-l="${no}"${edgeSites.length ? ` data-sites="${edgeSites.join(',')}"` : ''}><span class="n">${no}</span><code data-indent="${ind}">${h || ' '}</code></div>`);
  });
  return html.join('');
}
