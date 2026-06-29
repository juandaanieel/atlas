// Atlas explorer. The Python analyzer is the single source of truth: it ships a
// fully classified model — functions, edges, defects, and a package/module tree
// with rolled-up defect counts. This file never classifies anything. It scopes
// the model to one place at a time so the graph never becomes a hairball, lays
// that scope out, and draws it. Defects live in colour and line style, never in
// a number printed inside a box.

(function () {
  "use strict";

  var SVGNS = "http://www.w3.org/2000/svg";
  var COL = 190;
  var ROW = 88;
  var NODE_H = 44;
  var MARGIN = 60;

  var payload = window.ATLAS_PAYLOAD;
  var model = payload.model;
  var tree = model.tree;

  var nodeById = {};
  model.nodes.forEach(function (n) { nodeById[n.id] = n; });
  var symbolById = {};
  payload.symbols.forEach(function (s) { symbolById[s.id] = s; });

  var outAdj = {}, inAdj = {};
  model.edges.forEach(function (e) {
    (outAdj[e.source] = outAdj[e.source] || []).push(e.target);
    (inAdj[e.target] = inAdj[e.target] || []).push(e.source);
  });

  var clonePartner = {};
  model.clones.forEach(function (group) {
    group.members.forEach(function (a) {
      clonePartner[a] = group.members.filter(function (b) { return b !== a; });
    });
  });

  var treeByPath = {};
  (function indexTree(node) {
    treeByPath[node.path] = node;
    node.children.forEach(indexTree);
  })(tree);

  var state = {
    scope: tree.path,           // path of the package/module currently scoped
    focus: null,                // a function id when in neighborhood mode
    selected: null,
    hovered: null,
    disabled: {},
    expanded: { "": true },     // tree paths that are open
  };
  var view = { x: MARGIN, y: MARGIN, scale: 1 };

  var canvas = document.getElementById("canvas");
  var treePanel = document.getElementById("tree");

  renderHead();
  renderTree();
  rerender();
  bindPanZoom();
  bindDetailResize();

  // --- scope -> graph -----------------------------------------------------

  function currentGraph() {
    if (state.focus) return focusGraph(state.focus);
    var node = treeByPath[state.scope] || tree;
    if (node.type === "module") return moduleGraph(node);
    return packageGraph(node);
  }

  function packageGraph(node) {
    var ownSet = setOf(node.function_ids);
    function groupOf(fnId) {
      if (ownSet[fnId]) return fnId;
      var module = nodeById[fnId].module;
      for (var i = 0; i < node.children.length; i += 1) {
        var c = node.children[i];
        if (module === c.path || module.indexOf(c.path + ".") === 0) return c.path;
      }
      return null;
    }
    var items = [];
    node.children.forEach(function (c) { if (activeFunctionIds(c).length) items.push(groupItem(c)); });
    activeFunctionIds(node).forEach(function (id) { if (ownSet[id]) items.push(fnItem(id)); });

    var agg = {};
    model.edges.forEach(function (e) {
      if (state.disabled[e.source] || state.disabled[e.target]) return;
      var gs = groupOf(e.source), gt = groupOf(e.target);
      if (!gs || !gt || gs === gt) return;
      agg[gs + ">" + gt] = (agg[gs + ">" + gt] || 0) + 1;
    });
    var edges = Object.keys(agg).map(function (k) {
      var p = k.split(">");
      return { source: p[0], target: p[1], weight: agg[k], mutual: !!agg[p[1] + ">" + p[0]] };
    });
    return { items: items, edges: edges, kind: "group" };
  }

  function moduleGraph(node) {
    var activeIds = activeFunctionIds(node);
    var ids = setOf(activeIds);
    var items = activeIds.map(fnItem);
    var edges = model.edges.filter(function (e) { return ids[e.source] && ids[e.target]; })
      .map(function (e) { return { source: e.source, target: e.target, weight: 1 }; });
    return { items: items, edges: edges, kind: "function", clones: cloneEdges(activeIds) };
  }

  function focusGraph(id) {
    if (state.disabled[id]) return moduleGraph(treeByPath[moduleOf(id)] || tree);
    var set = {};
    set[id] = true;
    (outAdj[id] || []).forEach(function (t) { if (!state.disabled[t]) set[t] = true; });
    (inAdj[id] || []).forEach(function (s) { if (!state.disabled[s]) set[s] = true; });
    var ids = Object.keys(set);
    var items = ids.map(fnItem);
    var edges = model.edges.filter(function (e) { return set[e.source] && set[e.target]; })
      .map(function (e) { return { source: e.source, target: e.target, weight: 1 }; });
    return { items: items, edges: edges, kind: "function", center: id, clones: cloneEdges(ids) };
  }

  function cloneEdges(ids) {
    var present = setOf(ids);
    var seen = {}, links = [];
    ids.forEach(function (id) {
      (clonePartner[id] || []).forEach(function (other) {
        if (!present[other]) return;
        var key = [id, other].sort().join(">");
        if (seen[key]) return;
        seen[key] = true;
        links.push({ source: id, target: other });
      });
    });
    return links;
  }

  function groupItem(child) {
    return { id: child.path, kind: "group", node: child, label: child.name };
  }
  function fnItem(id) {
    return { id: id, kind: "function", node: nodeById[id], label: nodeById[id].name };
  }

  // --- layered layout (presentation only) ---------------------------------

  function layout(graph) {
    var items = graph.items;
    if (!items.length) return;
    var rect = canvas.getBoundingClientRect();
    var available = Math.max(420, (rect.width || 900) - 2 * MARGIN);
    var maxColumns = graph.kind === "group" ? 5 : 4;
    var columns = Math.max(1, Math.min(maxColumns, Math.floor(available / COL)));
    var byId = {};
    items.forEach(function (it) {
      it.w = nodeWidth(it);
      byId[it.id] = it;
    });
    var out = {}, indeg = {};
    items.forEach(function (it) { indeg[it.id] = 0; });
    graph.edges.forEach(function (e) {
      if (!byId[e.source] || !byId[e.target] || e.source === e.target) return;
      (out[e.source] = out[e.source] || []).push(e.target);
      indeg[e.target] += 1;
    });

    var depth = {};
    var queue = items.filter(function (it) { return indeg[it.id] === 0; }).map(function (it) { return it.id; });
    if (!queue.length) queue = [items[0].id];                // all-cycle fallback
    queue.forEach(function (id) { depth[id] = 0; });
    var head = 0;
    while (head < queue.length) {
      var id = queue[head++];
      (out[id] || []).forEach(function (t) {
        if (depth[t] === undefined) { depth[t] = depth[id] + 1; queue.push(t); }
      });
    }
    items.forEach(function (it) { if (depth[it.id] === undefined) depth[it.id] = 0; });

    var byLayer = {};
    items.forEach(function (it) { (byLayer[depth[it.id]] = byLayer[depth[it.id]] || []).push(it); });
    var layers = Object.keys(byLayer).map(Number).sort(function (a, b) { return a - b; });
    var y = 0;
    layers.forEach(function (layer) {
      var row = byLayer[layer].sort(function (a, b) { return a.label.localeCompare(b.label); });
      for (var start = 0; start < row.length; start += columns) {
        var chunk = row.slice(start, start + columns);
        var total = chunk.reduce(function (sum, it) { return sum + it.w; }, 0) + (chunk.length - 1) * 28;
        var x = -total / 2;
        chunk.forEach(function (it) {
          it.cx = x + it.w / 2;
          it.cy = y + NODE_H / 2;
          x += it.w + 28;
        });
        y += ROW;
      }
      y += 18;
    });
  }

  // --- draw ---------------------------------------------------------------

  function rerender() {
    renderCrumbs();
    renderTools();
    var graph = currentGraph();
    layout(graph);
    fitView(graph);
    draw(graph);
    syncTreeSelection();
    renderDetail();
  }

  function draw(graph) {
    while (canvas.firstChild) canvas.removeChild(canvas.firstChild);
    var root = el("g");
    root.setAttribute("transform", "translate(" + view.x + "," + view.y + ") scale(" + view.scale + ")");
    canvas.appendChild(root);
    root.appendChild(defs());

    var lit = state.selected ? litSet(graph) : null;
    var center = graph.center || null;
    var edgeLayer = el("g"), nodeLayer = el("g");
    root.appendChild(edgeLayer); root.appendChild(nodeLayer);
    var pos = {};
    graph.items.forEach(function (it) { pos[it.id] = it; });

    graph.edges.forEach(function (e) {
      var a = pos[e.source], b = pos[e.target];
      if (!a || !b) return;
      var on = !lit || (lit[e.source] && lit[e.target]);
      edgeLayer.appendChild(edge(a, b, "edge" + (e.mutual ? " mutual" : "") + (on ? "" : " muted"), e.weight));
    });
    (graph.clones || []).forEach(function (c) {
      var a = pos[c.source], b = pos[c.target];
      if (a && b) edgeLayer.appendChild(edge(a, b, "clone-edge", 1));
    });
    graph.items.forEach(function (it) {
      nodeLayer.appendChild(it.kind === "group" ? groupBox(it, !lit || lit[it.id]) : fnBox(it, !lit || lit[it.id], center));
    });
  }

  function litSet(graph) {
    var set = {}; set[state.selected] = true;
    graph.edges.forEach(function (e) {
      if (e.source === state.selected) set[e.target] = true;
      if (e.target === state.selected) set[e.source] = true;
    });
    return set;
  }

  function isConnectedToSelected(id) {
    if (!state.selected || id === state.selected) return false;
    return (outAdj[state.selected] || []).indexOf(id) >= 0 || (inAdj[state.selected] || []).indexOf(id) >= 0;
  }

  function groupBox(it, on) {
    var node = it.node, r = node.rollup;
    var g = group("node group-node " + (r.dead || r.clones ? "flagged" : "") + (on ? "" : " muted"), it.cx - it.w / 2, it.cy - NODE_H / 2);
    g.appendChild(rect(it.w, NODE_H, "group-rect"));
    g.appendChild(text(10, 17, "node-name", truncate((node.type === "package" ? node.name + "/" : node.name), 20)));
    g.appendChild(text(10, 33, "node-meta", groupMeta(node)));
    g.addEventListener("click", function (ev) { ev.stopPropagation(); setScope(node.path); });
    return g;
  }

  function groupMeta(node) {
    var r = node.rollup, parts = [r.functions + " fn"];
    if (r.clones) parts.push(r.clones + "⧉");
    if (r.dead) parts.push(r.dead + "●");
    if (r.hubs) parts.push(r.hubs + "★");
    return parts.join("  ");
  }

  function fnBox(it, on, center) {
    var node = it.node;
    var g = group("node " + statusClass(node) + (on ? "" : " muted") + (it.id === center ? " center" : "") + (state.hovered === it.id ? " hover-link" : ""), it.cx - it.w / 2, it.cy - NODE_H / 2);
    var r = rect(it.w, NODE_H, "");
    if (it.id === state.selected) r.setAttribute("class", "selected-ring");
    g.appendChild(r);
    g.appendChild(text(10, 18, "node-name", truncate(node.name, 19)));
    g.appendChild(text(10, 33, "node-meta", roleLabel(node)));
    g.addEventListener("click", function (ev) { ev.stopPropagation(); selectFunction(node.id); });
    if (isConnectedToSelected(node.id)) {
      g.addEventListener("mouseenter", function () {
        state.hovered = node.id;
        renderDetail();
      });
      g.addEventListener("mouseleave", function () {
        if (state.hovered === node.id) {
          state.hovered = null;
          renderDetail();
        }
      });
    }
    return g;
  }

  function edge(a, b, cls, weight) {
    var p = el("path");
    var midY = (a.cy + b.cy) / 2;
    p.setAttribute("d", "M" + a.cx + "," + (a.cy + NODE_H / 2) + " C" + a.cx + "," + midY + " " + b.cx + "," + midY + " " + b.cx + "," + (b.cy - NODE_H / 2));
    p.setAttribute("class", cls);
    if (cls.indexOf("clone") === -1) {
      p.setAttribute("marker-end", cls.indexOf("mutual") >= 0 ? "url(#arrow-red)" : "url(#arrow)");
      if (weight > 1) p.setAttribute("stroke-width", Math.min(1.2 + weight * 0.35, 4));
    }
    return p;
  }

  // --- breadcrumb + tools -------------------------------------------------

  function renderCrumbs() {
    var crumbs = document.getElementById("crumbs");
    var parts = [];
    parts.push(crumb("all", "", !state.scope));
    if (state.scope) {
      var segs = state.scope.split(".");
      for (var i = 0; i < segs.length; i += 1) {
        var path = segs.slice(0, i + 1).join(".");
        if (treeByPath[path]) parts.push(crumb(segs[i], path, path === state.scope));
      }
    }
    crumbs.innerHTML = parts.join('<span class="sep">›</span>');
    crumbs.querySelectorAll("[data-path]").forEach(function (c) {
      c.addEventListener("click", function () {
        var path = c.getAttribute("data-path");
        setScope(path);
      });
    });
  }

  function crumb(label, path, active) {
    return '<button class="crumb' + (active ? " active" : "") + '" data-path="' + escapeAttr(path) + '">' + escape(label) + "</button>";
  }

  function renderTools() {
    var graph = currentGraph();
    var label = (treeByPath[state.scope] || tree).type === "module" ? "functions" : "subsystems";
    document.getElementById("tools").innerHTML =
      '<span class="count">' + graph.items.length + " " + label + "</span>" +
      disabledCountButton() +
      '<button id="reset" class="tool">fit</button>';
    document.getElementById("reset").addEventListener("click", function () { redraw(true); });
    var reactivate = document.getElementById("reactivateAll");
    if (reactivate) reactivate.addEventListener("click", function () {
      state.disabled = {};
      renderTree();
      rerender();
    });
    document.getElementById("hint").textContent = "drag to pan · scroll to zoom · click a function to highlight neighbors";
  }

  // --- tree ---------------------------------------------------------------

  function renderHead() {
    var s = model.summary;
    document.getElementById("head").innerHTML =
      '<div class="brand">atlas</div><div class="pkg">' + escape(model.package_name) + "</div>" +
      '<div class="chips">' +
        chip(s.dead_count, "dead", "dead") +
        chip(s.clone_group_count, "clone groups", "clone") +
        chip(s.load_bearing_count, "load-bearing", "crucial") +
        chip(s.layer_violation_count, "coupled", "violation") +
      "</div>" +
      '<div class="legend">' +
        leg("is-root", "entry point") + leg("is-crucial", "load-bearing") +
        leg("is-live", "reachable") + leg("is-dead", "dead") +
        '<div class="legend-row"><span class="swatch clone-swatch"></span>clone link</div>' +
      "</div>";
  }

  function renderTree() {
    treePanel.innerHTML = treeRows(tree, 0);
    treePanel.querySelectorAll("[data-twirl]").forEach(function (t) {
      t.addEventListener("click", function (ev) {
        ev.stopPropagation();
        var path = t.getAttribute("data-twirl");
        state.expanded[path] = !state.expanded[path];
        renderTree();
      });
    });
    treePanel.querySelectorAll("[data-scope]").forEach(function (r) {
      r.addEventListener("click", function () { setScope(r.getAttribute("data-scope")); });
    });
    treePanel.querySelectorAll("[data-fn]").forEach(function (r) {
      r.addEventListener("click", function () { selectFunction(r.getAttribute("data-fn")); });
    });
    treePanel.querySelectorAll("[data-toggle-fn]").forEach(function (b) {
      b.addEventListener("click", function (ev) {
        ev.stopPropagation();
        toggleFunction(b.getAttribute("data-toggle-fn"));
      });
    });
    syncTreeSelection();
  }

  function treeRows(node, depth) {
    var open = state.expanded[node.path];
    var hasKids = node.children.length || (node.function_ids && node.function_ids.length);
    var twirl = hasKids
      ? '<span class="twirl" data-twirl="' + escapeAttr(node.path) + '">' + (open ? "▾" : "▸") + "</span>"
      : '<span class="twirl empty"></span>';
    var html =
      '<div class="trow" data-scope="' + escapeAttr(node.path) + '" data-path="' + escapeAttr(node.path) + '" style="--d:' + depth + '">' +
        twirl +
        '<span class="tname">' + escape(node.path === "" ? "all" : node.name) + (node.type === "package" ? "/" : "") + "</span>" +
        treeBadges(node.rollup) +
      "</div>";
    if (open) {
      node.children.forEach(function (c) { html += treeRows(c, depth + 1); });
      if (node.type === "module") {
        node.function_ids.forEach(function (id) {
          var fn = nodeById[id];
          var off = state.disabled[id];
          html += '<div class="trow tfn ' + statusClass(fn) + (off ? " deactivated" : "") + '" data-fn="' + escapeAttr(id) + '" style="--d:' + (depth + 1) + '">' +
            '<span class="twirl empty"></span><span class="tdot"></span><span class="tname">' + escape(fn.name) + "</span>" +
            '<button class="fn-toggle" data-toggle-fn="' + escapeAttr(id) + '">' + (off ? "activate" : "deactivate") + "</button></div>";
        });
      }
    }
    return html;
  }

  function treeBadges(r) {
    var b = "";
    if (r.clones) b += '<span class="tb clone">' + r.clones + "</span>";
    if (r.dead) b += '<span class="tb dead">' + r.dead + "</span>";
    if (r.hubs) b += '<span class="tb hub">' + r.hubs + "</span>";
    return '<span class="tbadges">' + b + "</span>";
  }

  function syncTreeSelection() {
    treePanel.querySelectorAll(".trow").forEach(function (r) {
      var p = r.getAttribute("data-path");
      r.classList.toggle("scoped", p === state.scope);
      r.classList.toggle("active", r.getAttribute("data-fn") === state.selected);
      var fn = r.getAttribute("data-fn");
      r.classList.toggle("deactivated", !!state.disabled[fn]);
    });
  }

  // --- interaction --------------------------------------------------------

  function setScope(path) {
    if (treeByPath[path] === undefined) return;
    state.scope = path;
    state.focus = null;
    state.selected = null;
    state.hovered = null;
    expandTo(path);
    renderTree();
    rerender();
  }

  function selectFunction(id) {
    if (state.disabled[id]) return;
    state.selected = id;
    state.hovered = null;
    state.focus = null;
    state.scope = moduleOf(id);
    expandTo(moduleOf(id));
    renderTree();
    rerender();
  }

  function toggleFunction(id) {
    state.disabled[id] = !state.disabled[id];
    if (!state.disabled[id]) delete state.disabled[id];
    if (state.disabled[id] && state.selected === id) {
      state.selected = null;
      state.hovered = null;
      state.focus = null;
      state.scope = moduleOf(id);
    }
    if (state.disabled[id] && state.hovered === id) state.hovered = null;
    renderTree();
    rerender();
  }

  function expandTo(path) {
    var segs = path.split(".");
    for (var i = 0; i < segs.length; i += 1) state.expanded[segs.slice(0, i + 1).join(".")] = true;
    state.expanded[""] = true;
  }

  function moduleOf(id) {
    var m = nodeById[id].module;
    return treeByPath[m] ? m : state.scope;
  }

  // --- detail panel -------------------------------------------------------

  function renderDetail() {
    var card = document.getElementById("detail");
    if (!state.selected || !nodeById[state.selected]) {
      card.innerHTML =
        '<div class="detail-empty">' +
          '<h2>Details</h2>' +
          '<p>Select a function to inspect its metadata and source.</p>' +
        "</div>";
      return;
    }

    var node = nodeById[state.selected];
    var symbol = symbolById[node.id] || {};
    var callers = (inAdj[node.id] || []);
    var callees = (outAdj[node.id] || []);
    var highlight = state.hovered && isConnectedToSelected(state.hovered) ? nodeById[state.hovered] : null;
    card.innerHTML =
      '<div class="detail-head">' +
        '<h2>' + escape(node.name) + "</h2>" +
        '<button class="detail-close" aria-label="close">×</button>' +
      "</div>" +
      (node.load_bearing ? '<span class="detail-tag">' + roleLabel(node) + "</span>" : "") +
      (node.dead ? '<span class="detail-tag dead">dead code</span>' : "") +
      (clonePartner[node.id] ? '<span class="detail-tag clone">clone ×' + (clonePartner[node.id].length + 1) + "</span>" : "") +
      '<p class="detail-doc">' + escape(node.docstring_summary) + "</p>" +
      "<dl>" +
        "<dt>module</dt><dd>" + escape(node.module) + "</dd>" +
        "<dt>location</dt><dd>" + escape(node.file_id + ":" + node.line_start) + "</dd>" +
        "<dt>callers / callees</dt><dd>" + callers.length + " / " + callees.length + "</dd>" +
        "<dt>status</dt><dd>" + escape(roleLabel(node)) + "</dd>" +
      "</dl>" +
      '<h3 class="detail-section-title">Code</h3>' +
      (highlight ? '<div class="detail-hover">Highlighting references to <strong>' + escape(highlight.name) + "</strong></div>" : "") +
      sourceBlock(symbol, highlight ? highlight.name : null);
    card.querySelector(".detail-close").addEventListener("click", hideDetail);
  }

  function hideDetail() {
    state.selected = null;
    state.hovered = null;
    rerender();
  }

  function sourceBlock(symbol, highlightName) {
    if (!symbol.source_excerpt) return '<div class="source-empty">No source excerpt available.</div>';
    var start = symbol.line_start || 1;
    var rows = symbol.source_excerpt.split("\n").map(function (line, index) {
      return '<span class="source-line"><span class="source-no">' + (start + index) + '</span><code>' + highlightPython(line, highlightName) + "</code></span>";
    }).join("");
    return '<pre class="source-code">' + rows + "</pre>";
  }

  // --- view / pan / zoom --------------------------------------------------

  function fitView(graph) {
    if (!graph.items.length) { view = { x: MARGIN, y: MARGIN, scale: 1 }; return; }
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    graph.items.forEach(function (it) {
      minX = Math.min(minX, it.cx - it.w / 2); maxX = Math.max(maxX, it.cx + it.w / 2);
      minY = Math.min(minY, it.cy - NODE_H / 2); maxY = Math.max(maxY, it.cy + NODE_H / 2);
    });
    var rect = canvas.getBoundingClientRect();
    var w = rect.width || 900, h = rect.height || 700;
    var scale = Math.min((w - 2 * MARGIN) / Math.max(1, maxX - minX), (h - 2 * MARGIN) / Math.max(1, maxY - minY), 1);
    view.scale = Math.max(scale, 0.18);
    view.x = (w - (maxX + minX) * view.scale) / 2;
    var contentH = (maxY - minY) * view.scale;
    view.y = contentH < h - 2 * MARGIN ? (h - (maxY + minY) * view.scale) / 2 : MARGIN - minY * view.scale;
  }

  function bindPanZoom() {
    var dragging = false, last = null, moved = false;
    canvas.addEventListener("mousedown", function (e) { dragging = true; moved = false; last = { x: e.clientX, y: e.clientY }; });
    window.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      moved = true;
      view.x += e.clientX - last.x; view.y += e.clientY - last.y;
      last = { x: e.clientX, y: e.clientY };
      redraw(false);
    });
    window.addEventListener("mouseup", function () { dragging = false; });
    canvas.addEventListener("click", function () { if (!moved && state.selected) hideDetail(); });
    canvas.addEventListener("wheel", function (e) {
      e.preventDefault();
      var rect = canvas.getBoundingClientRect();
      var px = e.clientX - rect.left, py = e.clientY - rect.top;
      var factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      var next = Math.min(2.5, Math.max(0.12, view.scale * factor));
      view.x = px - (px - view.x) * (next / view.scale);
      view.y = py - (py - view.y) * (next / view.scale);
      view.scale = next;
      redraw(false);
    }, { passive: false });
  }

  function redraw(refit) {
    var graph = currentGraph();
    layout(graph);
    if (refit) fitView(graph);
    draw(graph);
  }

  function bindDetailResize() {
    var splitter = document.getElementById("detailSplitter");
    var shell = document.querySelector(".shell");
    if (!splitter || !shell) return;
    var dragging = false;
    splitter.addEventListener("mousedown", function () { dragging = true; });
    window.addEventListener("mousemove", function (event) {
      if (!dragging) return;
      var rect = shell.getBoundingClientRect();
      var width = Math.max(280, Math.min(780, rect.right - event.clientX));
      shell.style.setProperty("--detail-width", width + "px");
      var graph = currentGraph();
      layout(graph);
      fitView(graph);
      draw(graph);
    });
    window.addEventListener("mouseup", function () { dragging = false; });
  }

  // --- small helpers ------------------------------------------------------

  function statusClass(n) {
    if (n.dead) return "is-dead";
    if (n.load_bearing) return "is-crucial";
    if (n.is_root) return "is-root";
    return "is-live";
  }
  function roleLabel(n) {
    if (n.dead) return "dead";
    if (n.is_hub && n.is_orchestrator) return "hub + orchestrator";
    if (n.is_hub) return "hub · fan-in " + n.fan_in;
    if (n.is_orchestrator) return "orchestrator · fan-out " + n.fan_out;
    if (n.is_root) return "entry";
    return n.module.split(".").slice(-1)[0];
  }
  function chip(count, label, kind) {
    return '<div class="chip' + (count > 0 ? " on " + kind : " off") + '"><span class="chip-n">' + count + "</span>" + label + "</div>";
  }
  function leg(cls, label) { return '<div class="legend-row"><span class="swatch ' + cls + '"></span>' + label + "</div>"; }
  function setOf(list) { var s = {}; (list || []).forEach(function (x) { s[x] = true; }); return s; }
  function nodeWidth(it) {
    var labelWidth = Math.min(260, Math.max(150, 34 + it.label.length * 7));
    return it.kind === "group" ? Math.max(174, labelWidth) : Math.max(164, labelWidth);
  }
  function activeFunctionIds(node) {
    var ids = [];
    (function walk(n) {
      (n.function_ids || []).forEach(function (id) { if (!state.disabled[id]) ids.push(id); });
      (n.children || []).forEach(walk);
    })(node);
    return ids;
  }
  function disabledCountButton() {
    var count = Object.keys(state.disabled).length;
    return count ? '<button id="reactivateAll" class="tool">' + count + " inactive · activate all</button>" : "";
  }
  function highlightPython(line, highlightName) {
    var keywords = {
      "False": true, "None": true, "True": true, "and": true, "as": true, "assert": true, "async": true,
      "await": true, "break": true, "class": true, "continue": true, "def": true, "del": true, "elif": true,
      "else": true, "except": true, "finally": true, "for": true, "from": true, "global": true, "if": true,
      "import": true, "in": true, "is": true, "lambda": true, "nonlocal": true, "not": true, "or": true,
      "pass": true, "raise": true, "return": true, "try": true, "while": true, "with": true, "yield": true
    };
    var builtins = {
      "abs": true, "any": true, "bool": true, "callable": true, "dict": true, "enumerate": true, "float": true,
      "int": true, "len": true, "list": true, "max": true, "min": true, "range": true, "set": true, "str": true,
      "sum": true, "tuple": true, "zip": true
    };
    var html = "";
    for (var i = 0; i < line.length;) {
      var ch = line[i];
      if (ch === "#") {
        html += '<span class="py-comment">' + escape(line.slice(i)) + "</span>";
        break;
      }
      if (ch === "'" || ch === '"') {
        var quote = ch, j = i + 1;
        while (j < line.length) {
          if (line[j] === "\\" && j + 1 < line.length) { j += 2; continue; }
          if (line[j] === quote) { j += 1; break; }
          j += 1;
        }
        html += '<span class="py-str">' + escape(line.slice(i, j)) + "</span>";
        i = j;
        continue;
      }
      if (/[0-9]/.test(ch)) {
        var n = i + 1;
        while (n < line.length && /[0-9A-Fa-f_xXoObB.]/.test(line[n])) n += 1;
        html += '<span class="py-num">' + escape(line.slice(i, n)) + "</span>";
        i = n;
        continue;
      }
      if (/[A-Za-z_]/.test(ch)) {
        var k = i + 1;
        while (k < line.length && /[A-Za-z0-9_]/.test(line[k])) k += 1;
        var word = line.slice(i, k);
        if (highlightName && word === highlightName) {
          html += '<mark class="py-focus">' + escape(word) + "</mark>";
        } else {
          var cls = keywords[word] ? "py-kw" : builtins[word] ? "py-builtin" : "";
          html += cls ? '<span class="' + cls + '">' + escape(word) + "</span>" : escape(word);
        }
        i = k;
        continue;
      }
      if (ch === "@") {
        var d = i + 1;
        while (d < line.length && /[A-Za-z0-9_.]/.test(line[d])) d += 1;
        html += '<span class="py-decorator">' + escape(line.slice(i, d)) + "</span>";
        i = d;
        continue;
      }
      html += escape(ch);
      i += 1;
    }
    return html;
  }
  function el(name) { return document.createElementNS(SVGNS, name); }
  function group(cls, x, y) { var g = el("g"); g.setAttribute("class", cls); g.setAttribute("transform", "translate(" + x + "," + y + ")"); g.style.cursor = "pointer"; return g; }
  function rect(w, h, cls) { var r = el("rect"); r.setAttribute("width", w); r.setAttribute("height", h); r.setAttribute("rx", 7); if (cls) r.setAttribute("class", cls); return r; }
  function text(x, y, cls, t) { var e = el("text"); e.setAttribute("x", x); e.setAttribute("y", y); e.setAttribute("class", cls); e.textContent = t; return e; }
  function defs() {
    var d = el("defs");
    d.appendChild(marker("arrow", "#b9b7ad"));
    d.appendChild(marker("arrow-red", "#a32d2d"));
    return d;
  }
  function marker(id, color) {
    var m = el("marker");
    m.setAttribute("id", id); m.setAttribute("markerWidth", "7"); m.setAttribute("markerHeight", "7");
    m.setAttribute("refX", "6"); m.setAttribute("refY", "3"); m.setAttribute("orient", "auto");
    var t = el("path"); t.setAttribute("d", "M0,0 L7,3 L0,6 z"); t.setAttribute("fill", color);
    m.appendChild(t); return m;
  }
  function truncate(t, max) { return t.length > max ? t.slice(0, max - 1) + "…" : t; }
  function escape(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function escapeAttr(t) { return escape(t).replace(/"/g, "&quot;"); }
})();
