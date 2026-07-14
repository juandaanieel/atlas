// Atlas explorer. The Python analyzer is the single source of truth: it ships a
// fully classified model — functions, edges, defects, and a package/module tree
// with rolled-up defect counts. This file never classifies anything. It scopes
// the model to one place at a time so the graph never becomes a hairball, lays
// that scope out, and draws it. Defects live in colour and line style, never in
// a number printed inside a box.

(function () {
  "use strict";

  var core = window.AtlasCore;
  if (!core) throw new Error("AtlasCore must be loaded before app.js");

  var SVGNS = "http://www.w3.org/2000/svg";
  var COL = 220;
  var ROW = 110;
  var NODE_H = 44;
  var MARGIN = 52;

  var payload = window.ATLAS_PAYLOAD;
  var model = payload.model;
  var tree = model.tree;
  var citymap = payload.citymap || { files: [], dirs: [], layout: {} };
  var cityDirByPath = {};
  citymap.dirs.forEach(function (directory) { cityDirByPath[directory.path] = directory; });
  var cityFileByPath = {};
  citymap.files.forEach(function (file) { cityFileByPath[file.path] = file; });

  var nodeById = {};
  model.nodes.forEach(function (n) { nodeById[n.id] = n; });
  var symbolById = {};
  payload.symbols.forEach(function (s) { symbolById[s.id] = s; });
  var objects = payload.objects || [];
  var objectById = {};
  var objectsByModule = {};
  objects.forEach(function (o) {
    objectById[o.id] = o;
    (objectsByModule[o.module] = objectsByModule[o.module] || []).push(o);
  });
  var architecture = payload.architecture || { functions: [], pipelines: [], use_cases: [], functionalities: [] };
  var architectureById = {};
  architecture.functions.forEach(function (functionInfo) { architectureById[functionInfo.id] = functionInfo; });

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
    workspace: "summary",
    navigationSurface: "city",
    sidebarTab: "pages",
    scope: tree.path,           // path of the package/module currently scoped
    mode: "functions",
    focus: null,                // a function id when in neighborhood mode
    graphSelection: null,
    graphSelectionType: null,
    mapSelection: null,
    detailSelection: null,
    objectFocus: null,
    sourceRange: null,
    commentDraft: "",
    quickPromptType: null,
    reviewPromptItems: [],
    reviewPromptText: "",
    reviewPromptFeedback: "",
    graphPromptSelection: [],
    graphPromptTarget: null,
    graphPromptDraft: "",
    graphPromptText: "",
    graphPromptFeedback: "",
    hovered: null,
    cityPath: "",
    disabled: {},
    expanded: { "": true },    // tree paths that are open
    navigationCollapsed: false,
    useCaseSelections: {},
    useCaseLayerSelections: {},
    collapsedUseCases: {},
    collapsedFunctionSections: {},
    collapsedFunctionClasses: {},
    lastFunctionClick: null,
    theme: document.documentElement.getAttribute("data-theme") || "light",
  };
  var view = { x: MARGIN, y: MARGIN, scale: 1 };
  var graphRoot = null;
  var graphTransformFrame = null;
  var graphResizeFrame = null;
  var renderedDetailKey = null;
  var detailReturnFocus = null;
  var detailFocusFrame = null;
  var navigation = { back: [], forward: [] };

  var canvas = document.getElementById("canvas");
  var treePanel = document.getElementById("tree");
  var cityMapRail = document.getElementById("cityMapRail");
  var sidebarTabs = document.getElementById("sidebarTabs");
  var navigationModes = document.getElementById("navigationModes");
  var viewPanel = document.getElementById("views");
  var tabContent = document.getElementById("tabContent");
  var historyPanel = document.getElementById("history");
  var graphPromptComposer = document.getElementById("graphPromptComposer");

  // The SVG contains focusable controls, so expose its descendants instead
  // of presenting the entire graph as one opaque image.
  canvas.setAttribute("role", "group");
  canvas.setAttribute("aria-describedby", "hint");

  readHash();
  renderHead();
  bindToolbarActions();
  renderViews();
  renderNavigationSurface();
  rerender();
  bindPanZoom();
  bindGraphResize();
  bindKeyboardShortcuts();

  // --- deep links -----------------------------------------------------------

  function readHash() {
    var params = core.parseHash(location.hash);
    if (!Object.keys(params).length) return;
    if (params.scope !== undefined && treeByPath[params.scope]) {
      state.scope = params.scope;
      expandTo(params.scope);
    }
    if (params.mode === "objects") state.mode = "objects";
    var requestedWorkspace = params.workspace || params.tab;
    var hasExplicitWorkspace = isWorkspace(requestedWorkspace);
    if (hasExplicitWorkspace) {
      state.workspace = requestedWorkspace;
    } else if (core.hasLegacyGraphHashState(params)) {
      // Older links predate the workspace field. Their graph-specific state
      // still needs to open the graph rather than the default Summary page.
      state.workspace = "graph";
    }
    if (params.nav === "tree" || params.nav === "city") state.navigationSurface = params.nav;
    if (params.city !== undefined && (params.city === "" || cityDirByPath[params.city])) {
      state.cityPath = params.city;
      synchronizeGraphWithCityPath(params.city);
    }
    var graphId = params.graph || params.sel;
    if (graphId) {
      if (params.type === "object" && objectById[graphId]) {
        state.graphSelection = graphId;
        state.graphSelectionType = "object";
        state.objectFocus = graphId;
        if (!params.detail) state.detailSelection = { type: "object", id: graphId };
      } else if (nodeById[graphId] && !state.disabled[graphId]) {
        state.graphSelection = graphId;
        state.graphSelectionType = "function";
        if (!params.source && !params.detail) state.detailSelection = { type: "function", id: graphId };
      }
    }
    if (params.map && params.mapType === "file" && cityFileByPath[params.map]) {
      state.mapSelection = { kind: "file", path: params.map };
    }
    if (params.map && params.mapType === "dir" && cityDirByPath[params.map]) {
      state.mapSelection = { kind: params.mapType, path: params.map };
    }
    if (params.objectFocus && objectById[params.objectFocus]) {
      state.objectFocus = params.objectFocus;
    }
    if (params.detailType === "object" && params.detail && objectById[params.detail]) {
      state.detailSelection = { type: "object", id: params.detail };
      state.objectFocus = params.detail;
    }
    if (params.detailType === "function" && params.detail && nodeById[params.detail] && !state.disabled[params.detail]) {
      state.detailSelection = { type: "function", id: params.detail };
    }
    if (params.source && nodeById[params.source] && !state.disabled[params.source]) {
      state.detailSelection = { type: "function", id: params.source };
    }
    if (params.focus && nodeById[params.focus]) state.focus = params.focus;
    if (state.objectFocus) {
      if (!hasExplicitWorkspace) state.workspace = "graph";
      state.mode = "objects";
    }
  }

  function writeHash() {
    history.replaceState(null, "", core.serializeHash(state));
  }

  // --- scope -> graph -----------------------------------------------------

  function currentGraph() {
    if (state.objectFocus && objectById[state.objectFocus]) return objectMethodGraph(objectById[state.objectFocus]);
    if (state.focus) return focusGraph(state.focus);
    var node = treeByPath[state.scope] || tree;
    if (state.mode === "objects" && scopeObjects(node).length) return objectGraph(node);
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
    node.children.forEach(function (c) {
      if (!activeFunctionIds(c).length) return;
      items.push(c.type === "module" ? fileItem(c) : groupItem(c));
    });
    activeFunctionIds(node).forEach(function (id) { if (ownSet[id]) items.push(fnItem(id)); });

    var agg = {};
    model.edges.forEach(function (e) {
      if (state.disabled[e.source] || state.disabled[e.target]) return;
      var gs = groupOf(e.source), gt = groupOf(e.target);
      if (!gs || !gt || gs === gt) return;
      var rec = agg[gs + ">" + gt] = agg[gs + ">" + gt] || { weight: 0, src: {}, tgt: {} };
      rec.weight += 1;
      rec.src[e.source] = (rec.src[e.source] || 0) + 1;
      rec.tgt[e.target] = (rec.tgt[e.target] || 0) + 1;
    });
    var edges = Object.keys(agg).map(function (k) {
      var p = k.split(">");
      var rec = agg[k];
      return {
        source: p[0], target: p[1], weight: rec.weight, mutual: !!agg[p[1] + ">" + p[0]],
        srcCounts: rec.src, tgtCounts: rec.tgt,
      };
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

  function objectGraph(node) {
    var moduleObjectsList = scopeObjects(node);
    var present = {};
    moduleObjectsList.forEach(function (object) { present[object.id] = true; });
    var multiModule = node.type !== "module";
    var items = moduleObjectsList.map(function (object) { return objectItem(object, multiModule); });
    var seen = {};
    var edges = [];
    moduleObjectsList.forEach(function (object) {
      object.fields.forEach(function (field) {
        if (!field.collaborator_id || !present[field.collaborator_id]) return;
        var key = object.id + ">" + field.collaborator_id;
        if (seen[key]) return;
        seen[key] = true;
        edges.push({
          source: object.id,
          target: field.collaborator_id,
          weight: 1,
          label: field.name,
        });
      });
      (object.bases || []).forEach(function (base) {
        if (!base.collaborator_id || !present[base.collaborator_id] || base.collaborator_id === object.id) return;
        var key = object.id + ">" + base.collaborator_id + ">extends";
        if (seen[key]) return;
        seen[key] = true;
        edges.push({
          source: object.id,
          target: base.collaborator_id,
          weight: 1,
          relation: "extends",
        });
      });
    });
    return { items: items, edges: edges, kind: "object" };
  }

  // A class map is deliberately built from Atlas's existing resolved method
  // calls and field-access facts. It does not infer runtime behaviour.
  function objectMethodGraph(object) {
    var methodIds = objectMethodIds(object);
    var present = setOf(methodIds);
    var constructorId = object.constructor && object.constructor.method_id;
    var callEdges = model.edges.filter(function (edgeInfo) {
      return present[edgeInfo.source] && present[edgeInfo.target];
    }).map(function (edgeInfo) {
      return { source: edgeInfo.source, target: edgeInfo.target, weight: 1 };
    }).sort(compareEdges);
    var initializationIds = constructorId && present[constructorId]
      ? reachableMethodIds(constructorId, callEdges)
      : {};
    var groups = [
      {
        id: "initialization",
        label: constructorId ? "Initialization path" : "No constructor",
        itemIds: methodIds.filter(function (id) { return initializationIds[id]; }),
        anchorId: constructorId || null,
      },
      {
        id: "unreached",
        label: "Not reached from __init__",
        itemIds: methodIds.filter(function (id) { return !initializationIds[id]; }),
        anchorId: null,
      },
    ];
    var stateLinks = stateLinksForObject(object, methodIds, callEdges);
    var items = methodIds.map(function (id) {
      var item = fnItem(id);
      item.isConstructor = id === constructorId;
      return item;
    });
    return {
      items: items,
      edges: callEdges,
      stateLinks: stateLinks,
      groups: groups,
      kind: "object-method",
      object: object,
      emptyMessage: "No analyzed methods are declared by this class.",
    };
  }

  function objectMethodIds(object) {
    var constructorId = object.constructor && object.constructor.method_id;
    var ids = [];
    if (constructorId) ids.push(constructorId);
    ids = ids.concat((object.methods && object.methods.public) || []);
    ids = ids.concat((object.methods && object.methods.private) || []);
    var seen = {};
    return ids.filter(function (id) {
      if (seen[id] || !nodeById[id]) return false;
      seen[id] = true;
      return true;
    }).sort(function (left, right) {
      return nodeById[left].line_start - nodeById[right].line_start || left.localeCompare(right);
    });
  }

  function reachableMethodIds(startId, edges) {
    var outgoing = {};
    edges.forEach(function (edgeInfo) {
      (outgoing[edgeInfo.source] = outgoing[edgeInfo.source] || []).push(edgeInfo.target);
    });
    Object.keys(outgoing).forEach(function (id) { outgoing[id].sort(); });
    var reached = {}, queue = [startId];
    reached[startId] = true;
    for (var index = 0; index < queue.length; index += 1) {
      (outgoing[queue[index]] || []).forEach(function (target) {
        if (reached[target]) return;
        reached[target] = true;
        queue.push(target);
      });
    }
    return reached;
  }

  function stateLinksForObject(object, methodIds, callEdges) {
    var constructor = object.constructor || { method_id: null, assigned_fields: [] };
    if (!constructor.method_id || !constructor.assigned_fields.length) return [];
    var initialized = setOf(constructor.assigned_fields);
    var directCalls = {};
    callEdges.forEach(function (edgeInfo) { directCalls[edgeInfo.source + ">" + edgeInfo.target] = true; });
    return (object.field_access || []).filter(function (access) {
      return access.method_id !== constructor.method_id && methodIds.indexOf(access.method_id) >= 0;
    }).map(function (access) {
      var fields = access.reads.concat(access.writes).filter(function (field) { return initialized[field]; });
      return {
        source: constructor.method_id,
        target: access.method_id,
        fields: fields.filter(function (field, index) { return fields.indexOf(field) === index; }).sort(),
      };
    }).filter(function (link) {
      // A direct call already explains the relationship; keep the optional
      // state links sparse enough to remain readable.
      return link.fields.length && !directCalls[link.source + ">" + link.target];
    }).sort(compareEdges);
  }

  function compareEdges(left, right) {
    return left.source.localeCompare(right.source) || left.target.localeCompare(right.target);
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
  function objectItem(object, withModule) {
    var label = withModule ? object.module.split(".").slice(-1)[0] + "." + object.name : object.name;
    return { id: object.id, kind: "object", node: object, label: label };
  }
  function fileItem(child) {
    var it = { id: child.path, kind: "file", node: child, label: child.name };
    it.card = fileCardLayout(child);
    return it;
  }

  // Measured card for a module: public top-level functions as rows, so edges
  // can anchor at the exact row of the function they involve.
  function fileCardLayout(child) {
    var LINE = 16;
    var publicFns = (child.function_ids || [])
      .map(function (id) { return nodeById[id]; })
      .filter(function (n) { return n && n.kind === "function" && !n.is_private && !state.disabled[n.id]; })
      .sort(function (a, b) { return a.name.localeCompare(b.name); });
    var rows = [];
    var y = 58;
    publicFns.slice(0, 8).forEach(function (n) {
      rows.push({ id: n.id, name: n.name, y: y, unused: n.is_root && n.fan_in === 0 });
      y += LINE;
    });
    var hidden = publicFns.length - rows.length;
    if (hidden > 0) { rows.push({ more: "+" + hidden + " more", y: y }); y += LINE; }
    if (!publicFns.length) { rows.push({ more: "no public functions", y: y }); y += LINE; }

    var rowY = {};
    rows.forEach(function (row) { if (row.id) rowY[row.id] = row.y - 4; });
    var longest = child.name.length + 1;
    rows.forEach(function (row) { longest = Math.max(longest, (row.name || row.more || "").length); });
    var width = Math.min(300, Math.max(190, 40 + longest * 6.3));
    return { rows: rows, rowY: rowY, width: width, height: y + 6, chars: Math.floor((width - 30) / 6.3), hue: hueIndex(child.path) };
  }

  function hueIndex(path) {
    var h = 0;
    for (var i = 0; i < path.length; i += 1) h = (h * 31 + path.charCodeAt(i)) % 8;
    return h;
  }

  // --- layered layout (presentation only) ---------------------------------

  function layout(graph) {
    if (graph.kind === "object-method") {
      layoutObjectMethodGraph(graph);
      return;
    }
    var items = graph.items;
    if (!items.length) return;
    var rect = canvas.getBoundingClientRect();
    var available = Math.max(420, (rect.width || 900) - 2 * MARGIN);
    var maxColumns = graph.kind === "group" ? 4 : 4;
    var byId = {};
    var totalW = 0;
    items.forEach(function (it) {
      it.w = nodeWidth(it);
      it.h = nodeHeight(it);
      totalW += it.w;
      byId[it.id] = it;
    });
    var slotW = Math.max(COL, totalW / items.length + 28);
    var columns = Math.max(1, Math.min(maxColumns, Math.floor(available / slotW)));
    var out = {}, inc = {}, indeg = {};
    items.forEach(function (it) { indeg[it.id] = 0; });
    graph.edges.forEach(function (e) {
      if (!byId[e.source] || !byId[e.target] || e.source === e.target) return;
      (out[e.source] = out[e.source] || []).push(e.target);
      (inc[e.target] = inc[e.target] || []).push(e.source);
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
    items.forEach(function (it) {
      if (depth[it.id] === undefined) depth[it.id] = 0;
      it.layer = depth[it.id];
    });

    var byLayer = {};
    items.forEach(function (it) { (byLayer[depth[it.id]] = byLayer[depth[it.id]] || []).push(it); });
    var layers = Object.keys(byLayer).map(Number).sort(function (a, b) { return a - b; });

    // Order each layer to reduce edge crossings: start from a deterministic
    // alphabetical order, then run barycenter sweeps — sort each layer by the
    // average position of its neighbors in the adjacent layers.
    var order = {};
    layers.forEach(function (layer) {
      byLayer[layer].sort(function (a, b) { return a.label.localeCompare(b.label); });
      byLayer[layer].forEach(function (it, i) { order[it.id] = i; });
    });
    function reorder(layer, neighbors) {
      var row = byLayer[layer];
      var scored = row.map(function (it, i) {
        var ns = neighbors[it.id] || [];
        var sum = 0, count = 0;
        ns.forEach(function (n) { if (order[n] !== undefined) { sum += order[n]; count += 1; } });
        return { it: it, key: count ? sum / count : i, tie: i };
      });
      scored.sort(function (a, b) { return a.key - b.key || a.tie - b.tie; });
      byLayer[layer] = scored.map(function (s) { return s.it; });
      byLayer[layer].forEach(function (it, i) { order[it.id] = i; });
    }
    for (var pass = 0; pass < 4; pass += 1) {
      for (var d = 1; d < layers.length; d += 1) reorder(layers[d], inc);      // down: follow callers
      for (var u = layers.length - 2; u >= 0; u -= 1) reorder(layers[u], out); // up: follow callees
    }

    var y = 0;
    layers.forEach(function (layer) {
      var row = byLayer[layer];
      for (var start = 0; start < row.length; start += columns) {
        var chunk = row.slice(start, start + columns);
        var total = chunk.reduce(function (sum, it) { return sum + it.w; }, 0) + (chunk.length - 1) * 34;
        var rowHeight = chunk.reduce(function (max, it) { return Math.max(max, it.h || NODE_H); }, NODE_H);
        var x = -total / 2;
        chunk.forEach(function (it) {
          it.cx = x + it.w / 2;
          it.cy = y + (it.h || NODE_H) / 2;
          x += it.w + 34;
        });
        y += rowHeight + (ROW - NODE_H);
      }
      y += 18;
    });
  }

  function layoutObjectMethodGraph(graph) {
    var itemsById = {};
    graph.items.forEach(function (item) {
      item.w = nodeWidth(item);
      item.h = nodeHeight(item);
      itemsById[item.id] = item;
    });
    if (!graph.items.length) return;

    var rect = canvas.getBoundingClientRect();
    var available = Math.max(420, (rect.width || 900) - 2 * MARGIN);
    var y = 0;
    graph.groups.forEach(function (methodGroup) {
      var groupItems = methodGroup.itemIds.map(function (id) { return itemsById[id]; }).filter(Boolean);
      methodGroup.headerY = y + 18;
      methodGroup.top = y;
      y += 38;
      if (!groupItems.length) {
        methodGroup.emptyY = y + 12;
        methodGroup.left = -Math.min(available / 2, 280);
        methodGroup.width = Math.min(available, 560);
        methodGroup.bottom = y + 30;
        y = methodGroup.bottom + 28;
        return;
      }

      var layers = methodGroupLayers(methodGroup, graph.edges);
      layers.forEach(function (layer) {
        var row = layer.ids.map(function (id) { return itemsById[id]; });
        row.sort(compareMethodItems);
        var maxWidth = row.reduce(function (max, item) { return Math.max(max, item.w); }, 164);
        var columns = Math.max(1, Math.min(4, Math.floor(available / (maxWidth + 34))));
        for (var start = 0; start < row.length; start += columns) {
          var chunk = row.slice(start, start + columns);
          var total = chunk.reduce(function (sum, item) { return sum + item.w; }, 0) + (chunk.length - 1) * 34;
          var height = chunk.reduce(function (max, item) { return Math.max(max, item.h); }, NODE_H);
          var x = -total / 2;
          chunk.forEach(function (item) {
            item.cx = x + item.w / 2;
            item.cy = y + item.h / 2;
            item.layer = layer.index;
            x += item.w + 34;
          });
          y += height + (ROW - NODE_H);
        }
      });
      var minX = Math.min.apply(null, groupItems.map(function (item) { return item.cx - item.w / 2; }));
      var maxX = Math.max.apply(null, groupItems.map(function (item) { return item.cx + item.w / 2; }));
      methodGroup.left = minX - 24;
      methodGroup.width = maxX - minX + 48;
      methodGroup.bottom = y - (ROW - NODE_H) + 18;
      y = methodGroup.bottom + 34;
    });
  }

  function methodGroupLayers(methodGroup, edges) {
    var ids = methodGroup.itemIds;
    var present = setOf(ids);
    var outgoing = {}, incoming = {}, depth = {};
    ids.forEach(function (id) {
      outgoing[id] = [];
      incoming[id] = 0;
    });
    edges.forEach(function (edgeInfo) {
      if (!present[edgeInfo.source] || !present[edgeInfo.target] || edgeInfo.source === edgeInfo.target) return;
      outgoing[edgeInfo.source].push(edgeInfo.target);
      incoming[edgeInfo.target] += 1;
    });
    Object.keys(outgoing).forEach(function (id) { outgoing[id].sort(); });
    var queue = methodGroup.anchorId ? [methodGroup.anchorId] : ids.filter(function (id) { return incoming[id] === 0; });
    if (!queue.length) queue = [ids[0]];
    queue.forEach(function (id) { depth[id] = 0; });
    for (var index = 0; index < queue.length; index += 1) {
      var source = queue[index];
      outgoing[source].forEach(function (target) {
        var nextDepth = depth[source] + 1;
        if (depth[target] === undefined) {
          depth[target] = nextDepth;
          queue.push(target);
        }
      });
    }
    ids.forEach(function (id) { if (depth[id] === undefined) depth[id] = 0; });
    var byDepth = {};
    ids.forEach(function (id) { (byDepth[depth[id]] = byDepth[depth[id]] || []).push(id); });
    return Object.keys(byDepth).map(Number).sort(function (left, right) { return left - right; }).map(function (index) {
      return { index: index, ids: byDepth[index] };
    });
  }

  function compareMethodItems(left, right) {
    return left.node.line_start - right.node.line_start || left.label.localeCompare(right.label);
  }

  // --- draw ---------------------------------------------------------------

  function rerender() {
    resetInlinePrompt();
    writeHash();
    renderViews();
    renderNavigation();
    renderSidebarTabs();
    renderNavigationSurface();
    renderReviewPromptPanel();
    renderDetail();
    renderGraphPromptComposer();
    if (isReviewWorkspace(state.workspace)) {
      renderTabContent();
      return;
    }
    showGraph();
    renderCrumbs();
    renderTools();
    var graph = currentGraph();
    layout(graph);
    fitView(graph);
    draw(graph);
  }

  function draw(graph) {
    while (canvas.firstChild) canvas.removeChild(canvas.firstChild);
    var root = el("g");
    root.setAttribute("transform", "translate(" + view.x + "," + view.y + ") scale(" + view.scale + ")");
    canvas.appendChild(root);
    graphRoot = root;
    root.appendChild(defs());

    if (graph.kind === "object-method" && !graph.items.length) {
      drawObjectMethodEmpty(root, graph);
      return;
    }

    // Object focus switches to a graph of that object's methods. The object
    // id is not a node in that graph, so it must not dim every method.
    var selectionIsVisible = graph.items.some(function (item) { return item.id === state.graphSelection; });
    var lit = state.graphSelection && selectionIsVisible ? litSet(graph) : null;
    var center = graph.center || null;
    var groupLayer = el("g"), edgeLayer = el("g"), nodeLayer = el("g");
    root.appendChild(groupLayer); root.appendChild(edgeLayer); root.appendChild(nodeLayer);
    if (graph.kind === "object-method") drawObjectMethodGroups(groupLayer, graph);
    var pos = {};
    graph.items.forEach(function (it) { pos[it.id] = it; });

    graph.edges.forEach(function (e) {
      var a = pos[e.source], b = pos[e.target];
      if (!a || !b) return;
      var on = !lit || (lit[e.source] && lit[e.target]);
      if (a.kind === "file" || b.kind === "file") {
        edgeLayer.appendChild(fileEdge(a, b, e, on));
        return;
      }
      var base = e.relation === "extends" ? "edge extends-edge" : "edge";
      var path = edge(a, b, base + (e.mutual ? " mutual" : "") + (on ? "" : " muted"), e.weight);
      if (graph.kind === "function") bindGraphPromptEdge(path, e);
      edgeLayer.appendChild(path);
    });
    (graph.stateLinks || []).forEach(function (link) {
      var a = pos[link.source], b = pos[link.target];
      if (!a || !b) return;
      var on = !lit || (lit[link.source] && lit[link.target]);
      edgeLayer.appendChild(stateEdge(a, b, link, on));
    });
    (graph.clones || []).forEach(function (c) {
      var a = pos[c.source], b = pos[c.target];
      if (a && b) edgeLayer.appendChild(edge(a, b, "clone-edge", 1));
    });
    graph.items.forEach(function (it) {
      if (it.kind === "group") {
        nodeLayer.appendChild(groupBox(it, !lit || lit[it.id]));
      } else if (it.kind === "file") {
        nodeLayer.appendChild(fileBox(it, !lit || lit[it.id], edgeLayer));
      } else if (it.kind === "object") {
        nodeLayer.appendChild(objectBox(it, !lit || lit[it.id]));
      } else {
        nodeLayer.appendChild(fnBox(it, !lit || lit[it.id], center));
      }
    });
  }

  function drawObjectMethodGroups(layer, graph) {
    graph.groups.forEach(function (methodGroup) {
      var background = rect(methodGroup.width, methodGroup.bottom - methodGroup.top, "method-group-box");
      background.setAttribute("x", methodGroup.left);
      background.setAttribute("y", methodGroup.top);
      layer.appendChild(background);
      layer.appendChild(text(methodGroup.left + 14, methodGroup.headerY, "method-group-title", methodGroup.label));
      if (!methodGroup.itemIds.length) {
        var message = methodGroup.id === "initialization"
          ? "Methods are listed below."
          : "No methods in this group.";
        layer.appendChild(text(methodGroup.left + 14, methodGroup.emptyY, "method-group-empty", message));
      }
    });
    var legend = text(graph.groups[0].left, graph.groups[0].top - 14, "method-map-legend", "solid = resolved call   dashed = shared initialized state");
    layer.appendChild(legend);
  }

  function drawObjectMethodEmpty(root, graph) {
    var object = graph.object;
    var box = group("method-map-empty", -210, -54);
    box.style.cursor = "default";
    box.appendChild(rect(420, 108, "method-map-empty-box"));
    box.appendChild(text(22, 38, "method-map-empty-title", object.name));
    box.appendChild(text(22, 64, "method-map-empty-copy", graph.emptyMessage));
    root.appendChild(box);
  }

  function litSet(graph) {
    var set = {}; set[state.graphSelection] = true;
    graph.edges.forEach(function (e) {
      if (e.source === state.graphSelection) set[e.target] = true;
      if (e.target === state.graphSelection) set[e.source] = true;
    });
    return set;
  }

  function isConnectedToSelected(id) {
    if (!state.graphSelection || id === state.graphSelection) return false;
    return (outAdj[state.graphSelection] || []).indexOf(id) >= 0 || (inAdj[state.graphSelection] || []).indexOf(id) >= 0;
  }

  function groupBox(it, on) {
    var node = it.node, r = node.rollup;
    var h = it.h || NODE_H;
    var g = group("node group-node " + (r.dead || r.clones ? "flagged" : "") + (on ? "" : " muted"), it.cx - it.w / 2, it.cy - h / 2);
    g.appendChild(rect(it.w, h, "group-rect"));
    g.appendChild(text(10, 17, "node-name", truncate((node.type === "package" ? node.name + "/" : node.name), 20)));
    g.appendChild(text(10, 33, "node-meta", groupMeta(node)));
    makeSvgButton(g, "Open " + node.type + " " + (node.path || node.name), function (event) {
      event.stopPropagation();
      setScope(node.path);
    });
    return g;
  }

  function groupMeta(node) {
    var r = node.rollup, parts = [r.functions + " fn"];
    if (r.clones) parts.push(r.clones + "⧉");
    if (r.dead) parts.push(r.dead + "●");
    if (r.hubs) parts.push(r.hubs + "★");
    return parts.join("  ");
  }

  function fileBox(it, on, edgeLayer) {
    var node = it.node, card = it.card;
    var g = group("node file-node" + (on ? "" : " muted"), it.cx - it.w / 2, it.cy - it.h / 2);
    g.setAttribute("role", "group");
    g.setAttribute("aria-label", "Module " + node.path);
    g.appendChild(rect(it.w, it.h, "file-rect"));
    var accent = line(1, 42, 49, 42, "file-accent");
    accent.style.stroke = "var(--file-hue-" + card.hue + ")";
    var moduleLabel = text(10, 18, "node-name", truncate(node.name + ".py", card.chars));
    moduleLabel.setAttribute("data-scope-focus", node.path);
    makeSvgButton(moduleLabel, "Open module " + node.path, function (event) {
      event.stopPropagation();
      setScope(node.path);
    });
    g.appendChild(moduleLabel);
    g.appendChild(text(10, 34, "node-meta", groupMeta(node)));
    g.appendChild(line(0, 42, it.w, 42, "object-divider"));
    g.appendChild(accent);

    card.rows.forEach(function (row) {
      if (!row.id) {
        g.appendChild(text(10, row.y, "object-more", truncate(row.more, card.chars)));
        return;
      }
      g.appendChild(line(0, row.y - 4, 8, row.y - 4, row.unused ? "file-tick unused" : "file-tick"));
      var label = text(12, row.y, "file-fn", truncate(row.name, card.chars));
      label.setAttribute("data-function-focus", row.id);
      makeSvgButton(label, "Inspect function " + row.name, function (event) {
        event.stopPropagation();
        selectFunction(row.id);
      });
      g.appendChild(label);
    });

    g.addEventListener("click", function (ev) { ev.stopPropagation(); setScope(node.path); });
    g.addEventListener("pointerenter", function () { litFileEdges(edgeLayer, it.id, true); });
    g.addEventListener("pointerleave", function () { litFileEdges(edgeLayer, it.id, false); });
    return g;
  }

  function litFileEdges(edgeLayer, id, on) {
    if (!edgeLayer) return;
    edgeLayer.querySelectorAll(".file-edge").forEach(function (p) {
      var touches = p.getAttribute("data-src") === id || p.getAttribute("data-tgt") === id;
      p.classList.toggle("lit", on && touches);
      p.classList.toggle("dim", on && !touches);
    });
  }

  // Edge between file cards: anchored at the specific function row when that
  // function is listed, tinted with the source file's hue, faint by default.
  function fileEdge(a, b, e, on) {
    var src = rowAnchor(a, b, e.srcCounts);
    var tgt = rowAnchor(b, a, e.tgtCounts);
    var p = el("path");
    var d;
    if (src && tgt) {
      var reach = Math.max(34, Math.min(90, Math.abs(tgt.x - src.x) / 3));
      d = "M" + src.x + "," + src.y +
        " C" + (src.x + src.side * reach) + "," + src.y +
        " " + (tgt.x + tgt.side * reach) + "," + tgt.y +
        " " + tgt.x + "," + tgt.y;
    } else {
      var midY = (a.cy + b.cy) / 2;
      d = "M" + a.cx + "," + (a.cy + a.h / 2) + " C" + a.cx + "," + midY + " " + b.cx + "," + midY + " " + b.cx + "," + (b.cy - b.h / 2);
    }
    p.setAttribute("d", d);
    p.setAttribute("class", "edge file-edge" + (e.mutual ? " mutual" : "") + (on ? "" : " muted"));
    p.setAttribute("data-src", e.source);
    p.setAttribute("data-tgt", e.target);
    var hue = a.card ? a.card.hue : hueIndex(String(e.source));
    if (!e.mutual) {
      p.style.stroke = "var(--file-hue-" + hue + ")";
      p.setAttribute("marker-end", "url(#arrow-hue-" + hue + ")");
    } else {
      p.setAttribute("marker-end", "url(#arrow-red)");
    }
    if (e.weight > 1) p.setAttribute("stroke-width", Math.min(1.2 + e.weight * 0.35, 4));
    return p;
  }

  function rowAnchor(item, other, counts) {
    if (item.kind !== "file" || !item.card) return null;
    var best = null, bestCount = 0;
    Object.keys(counts || {}).forEach(function (fnId) {
      if (item.card.rowY[fnId] === undefined) return;
      if (counts[fnId] > bestCount) { best = fnId; bestCount = counts[fnId]; }
    });
    var y = best ? item.cy - item.h / 2 + item.card.rowY[best] : item.cy;
    var side = other.cx >= item.cx ? 1 : -1;
    if (Math.abs(other.cx - item.cx) < (item.w + other.w) / 2 + 20) {
      // stacked cards: leave from the facing horizontal border instead
      return best
        ? { x: item.cx + side * item.w / 2, y: y, side: side }
        : { x: item.cx, y: item.cy + (other.cy > item.cy ? item.h / 2 : -item.h / 2), side: 0 };
    }
    return { x: item.cx + side * item.w / 2, y: y, side: side };
  }

  function fnBox(it, on, center) {
    var node = it.node;
    var h = it.h || NODE_H;
    var g = group("node " + statusClass(node) + (it.isConstructor ? " method-constructor" : "") + (on ? "" : " muted") + (it.id === center ? " center" : "") + (state.hovered === it.id ? " hover-link" : ""), it.cx - it.w / 2, it.cy - h / 2);
    g.setAttribute("data-function-focus", node.id);
    var r = rect(it.w, h, "");
    if (state.graphSelectionType === "function" && it.id === state.graphSelection) r.classList.add("selected-ring");
    if (state.graphPromptSelection.indexOf(it.id) >= 0) r.classList.add("graph-prompt-selected");
    g.appendChild(r);
    g.appendChild(text(10, 18, "node-name", truncate(node.name, 19)));
    g.appendChild(text(10, 33, "node-meta", roleLabel(node)));
    makeSvgButton(g, "Inspect function " + (node.qualified_name || node.name), function (event) {
      event.stopPropagation();
      if ((event.metaKey || event.ctrlKey) && !state.objectFocus) {
        toggleGraphPromptSelection(node.id);
        return;
      }
      if (state.objectFocus) selectObjectMethod(state.objectFocus, node.id);
      else selectFunction(node.id);
    });
    if (isConnectedToSelected(node.id)) {
      g.addEventListener("pointerenter", function () {
        state.hovered = node.id;
        renderDetail();
      });
      g.addEventListener("pointerleave", function () {
        if (state.hovered === node.id) {
          state.hovered = null;
          renderDetail();
        }
      });
    }
    return g;
  }

  // One measured layout shared by the renderer and the sizing helpers, so
  // drawing and node dimensions can never drift apart.
  function objectCardLayout(object) {
    var LINE = 16;
    var rows = [];
    var y = 60;
    function push(row) { row.y = y; rows.push(row); y += LINE; }
    function section(title) { y += 4; push({ kind: "section", text: title }); }
    function overflow(count, shown) {
      if (count > shown) push({ kind: "more", text: "+" + (count - shown) + " more" });
    }

    var ctor = object.constructor || { params: [], method_id: null };
    section("constructor");
    push({ kind: "text", text: ctor.method_id ? methodSignature(ctor.method_id, ctor.params) : "none" });
    var fields = object.fields || [];
    fields.slice(0, 4).forEach(function (field) {
      var source = field.source_kind === "literal" ? "literal" : field.source_name || field.source_kind;
      var kind = field.collaborator_kind ? " (" + field.collaborator_kind + ")" : "";
      push({ kind: "text", text: field.name + " ← " + source + kind, collab: !!field.collaborator_kind });
    });
    overflow(fields.length, 4);

    var publicIds = object.methods.public || [];
    var privateIds = object.methods.private || [];
    section("public");
    if (!publicIds.length) push({ kind: "text", text: "none" });
    publicIds.slice(0, 6).forEach(function (id) { push({ kind: "method", id: id, tick: true }); });
    overflow(publicIds.length, 6);
    if (privateIds.length) {
      section("internal");
      privateIds.slice(0, 4).forEach(function (id) { push({ kind: "method", id: id }); });
      overflow(privateIds.length, 4);
    }

    var height = y + 8 + 29; // content + gap + state strip
    var longest = 18;
    rows.forEach(function (row) {
      var label = row.kind === "method" ? (nodeById[row.id] || { name: row.id }).name : row.text;
      longest = Math.max(longest, (label || "").length);
    });
    longest = Math.max(longest, object.name.length);
    var width = Math.min(360, Math.max(260, 36 + longest * 6.3));
    return { rows: rows, width: width, height: height, chars: Math.floor((width - 26) / 6.3) };
  }

  function objectCard(it) {
    if (!it.card) it.card = objectCardLayout(it.node);
    return it.card;
  }

  function objectBox(it, on) {
    var object = it.node;
    var card = objectCard(it);
    var h = card.height;
    var g = group("node object-node" + (on ? "" : " muted"), it.cx - it.w / 2, it.cy - h / 2);
    g.setAttribute("role", "group");
    g.setAttribute("aria-label", "Object " + object.name);
    var r = rect(it.w, h, "object-rect");
    if (state.graphSelectionType === "object" && it.id === state.graphSelection) r.classList.add("selected-ring");
    g.appendChild(r);
    var objectLabel = text(12, 18, "object-name", truncate(it.label, card.chars));
    objectLabel.setAttribute("data-object-focus", object.id);
    makeSvgButton(objectLabel, "Inspect object " + object.name, function (event) {
      event.stopPropagation();
      selectObject(object.id);
    });
    g.appendChild(objectLabel);
    g.appendChild(text(12, 35, "object-doc", truncate(object.docstring_summary || "No docstring", card.chars + 4)));
    g.appendChild(line(0, 44, it.w, 44, "object-divider"));

    card.rows.forEach(function (row) {
      if (row.kind === "section") {
        g.appendChild(text(12, row.y, "object-section", row.text));
      } else if (row.kind === "method") {
        var node = nodeById[row.id];
        if (!node) return;
        if (row.tick) g.appendChild(line(0, row.y - 4, 8, row.y - 4, "object-surface-tick"));
        var label = text(row.tick ? 12 : 24, row.y, row.tick ? "object-method public" : "object-method", truncate(node.name, card.chars));
        label.setAttribute("data-function-focus", row.id);
        makeSvgButton(label, "Inspect method " + node.name, function (event) {
          event.stopPropagation();
          selectObjectMethod(object.id, row.id);
        });
        g.appendChild(label);
      } else {
        var cls = row.kind === "more" ? "object-more" : row.collab ? "object-mini-label collab" : "object-mini-label";
        g.appendChild(text(row.kind === "more" ? 24 : 12, row.y, cls, truncate(row.text, card.chars)));
      }
    });
    drawStateStrip(g, object, it.w, h, card.chars);

    g.addEventListener("click", function (ev) { ev.stopPropagation(); selectObject(object.id); });
    return g;
  }

  function drawStateStrip(root, object, w, h, chars) {
    var fields = object.fields || [];
    root.appendChild(line(0, h - 29, w, h - 29, "object-divider"));
    if (!fields.length) {
      root.appendChild(text(12, h - 11, "object-state", "state: none"));
      return;
    }
    var access = fieldAccessCounts(object);
    var labels = fields.slice(0, 3).map(function (field) {
      var count = access[field.name] || { reads: 0, writes: 0 };
      return field.name + " r" + count.reads + "/w" + count.writes;
    });
    if (fields.length > 3) labels.push("+" + (fields.length - 3));
    root.appendChild(text(12, h - 11, "object-state", truncate("state: " + labels.join("  "), chars + 6)));
  }

  function edge(a, b, cls, weight) {
    var p = el("path");
    var ah = a.h || NODE_H;
    var bh = b.h || NODE_H;
    var x1 = a.cx, y1 = a.cy + ah / 2, x2 = b.cx, y2 = b.cy - bh / 2;
    var span = a.layer !== undefined && b.layer !== undefined ? Math.abs(a.layer - b.layer) : 1;
    var d;
    if (span > 1) {
      // Bow long edges sideways so they pass beside intermediate layers
      // instead of cutting through them. Rows are centred on x = 0, so the
      // endpoints' side of that midline picks the bow direction.
      var side = (x1 + x2) / 2 >= 0 ? 1 : -1;
      var bow = 46 + span * 22;
      var bx1 = x1 + side * bow, bx2 = x2 + side * bow;
      d = "M" + x1 + "," + y1 +
        " C" + bx1 + "," + (y1 + (y2 - y1) * 0.3) +
        " " + bx2 + "," + (y1 + (y2 - y1) * 0.7) +
        " " + x2 + "," + y2;
    } else {
      var midY = (y1 + y2) / 2;
      d = "M" + x1 + "," + y1 + " C" + x1 + "," + midY + " " + x2 + "," + midY + " " + x2 + "," + y2;
    }
    p.setAttribute("d", d);
    p.setAttribute("class", cls);
    if (cls.indexOf("clone") === -1) {
      p.setAttribute("marker-end", cls.indexOf("mutual") >= 0 ? "url(#arrow-red)" : "url(#arrow)");
      if (weight > 1) p.setAttribute("stroke-width", Math.min(1.2 + weight * 0.35, 4));
    }
    return p;
  }

  function stateEdge(a, b, link, on) {
    var p = el("path");
    var y1 = a.cy + (a.h || NODE_H) / 2;
    var y2 = b.cy - (b.h || NODE_H) / 2;
    var side = a.cx <= b.cx ? -1 : 1;
    var bow = 54;
    p.setAttribute("d", "M" + a.cx + "," + y1 +
      " C" + (a.cx + side * bow) + "," + (y1 + 24) +
      " " + (b.cx + side * bow) + "," + (y2 - 24) +
      " " + b.cx + "," + y2);
    p.setAttribute("class", "edge state-edge" + (on ? "" : " muted"));
    p.setAttribute("data-state-fields", link.fields.join(", "));
    var label = text((a.cx + b.cx) / 2 + side * bow, (y1 + y2) / 2 - 4, "state-edge-label" + (on ? "" : " muted"), "state: " + link.fields.join(", "));
    var groupNode = el("g");
    groupNode.appendChild(p);
    groupNode.appendChild(label);
    return groupNode;
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
    if (graph.kind === "object-method") {
      renderObjectMethodTools(graph);
      return;
    }
    var scopedNode = treeByPath[state.scope] || tree;
    var objectModeAvailable = scopeObjects(scopedNode).length > 0;
    var label = graph.kind === "object" ? "objects" : scopedNode.type === "module" ? "functions" : "files";
    var focusAvailable = !!state.focus || (state.graphSelectionType === "function" && !!nodeById[state.graphSelection]);
    document.getElementById("tools").innerHTML =
      '<span class="count">' + graph.items.length + " " + label + "</span>" +
      modeToggle(objectModeAvailable) +
      disabledCountButton() +
      '<div class="zoom-control" aria-label="Graph zoom">' +
        '<button id="zoomOut" class="tool tool-icon" aria-label="Zoom out" title="Zoom out">−</button>' +
        '<span id="zoomReadout" class="zoom-readout">' + zoomLabel() + "</span>" +
        '<button id="zoomIn" class="tool tool-icon" aria-label="Zoom in" title="Zoom in">+</button>' +
      "</div>" +
      '<button id="focusSelected" class="tool"' + (focusAvailable ? "" : " disabled") + '>' + (state.focus ? "clear focus" : "focus selection") + "</button>" +
      '<button id="reset" class="tool">fit</button>' +
      graphPromptTools(graph);
    document.getElementById("reset").addEventListener("click", function () { redraw(true); });
    document.getElementById("zoomOut").addEventListener("click", function () { zoomBy(1 / 1.2); });
    document.getElementById("zoomIn").addEventListener("click", function () { zoomBy(1.2); });
    document.getElementById("focusSelected").addEventListener("click", function () { if (focusAvailable) toggleFocus(); });
    document.getElementById("modeFunctions").addEventListener("click", function () { setMode("functions"); });
    var objectButton = document.getElementById("modeObjects");
    if (objectButton) objectButton.addEventListener("click", function () { if (objectModeAvailable) setMode("objects"); });
    var reactivate = document.getElementById("reactivateAll");
    if (reactivate) reactivate.addEventListener("click", function () {
      state.disabled = {};
      rerender();
    });
    bindGraphPromptToolbar(graph);
    document.getElementById("hint").textContent = state.mode === "objects"
      ? "drag to pan · scroll or use +/− to zoom · click an object or method"
      : "drag to pan · scroll or use +/− to zoom · click a function to highlight neighbors · ⌘/Ctrl-click functions to select them for a prompt";
  }

  function renderObjectMethodTools(graph) {
    var tools = document.getElementById("tools");
    tools.innerHTML =
      '<span class="count object-method-count">' + escape(graph.object.name) + " · " + graph.items.length + " methods</span>" +
      '<button id="backToObjectRelationships" class="tool tool-primary">Back to object relationships</button>' +
      '<div class="zoom-control" aria-label="Graph zoom">' +
        '<button id="zoomOut" class="tool tool-icon" aria-label="Zoom out" title="Zoom out">−</button>' +
        '<span id="zoomReadout" class="zoom-readout">' + zoomLabel() + "</span>" +
        '<button id="zoomIn" class="tool tool-icon" aria-label="Zoom in" title="Zoom in">+</button>' +
      "</div>" +
      '<button id="reset" class="tool">fit</button>';
    document.getElementById("backToObjectRelationships").addEventListener("click", backToObjectRelationships);
    document.getElementById("reset").addEventListener("click", function () { redraw(true); });
    document.getElementById("zoomOut").addEventListener("click", function () { zoomBy(1 / 1.2); });
    document.getElementById("zoomIn").addEventListener("click", function () { zoomBy(1.2); });
    document.getElementById("hint").textContent =
      "drag to pan · scroll or use +/− to zoom · click a method to inspect its callers and callees";
  }

  function graphPromptTools(graph) {
    if (graph.kind !== "function" || state.graphPromptSelection.length < 2) return "";
    var pipeline = graphPromptPipelineOrder(state.graphPromptSelection, graph.edges);
    return '<div class="graph-prompt-tools" role="group" aria-label="Graph prompt selection">' +
      '<span class="graph-prompt-count">' + state.graphPromptSelection.length + " selected</span>" +
      '<button id="commentOnGraphSelection" class="tool">Comment on selection</button>' +
      (pipeline ? '<button id="commentOnGraphPipeline" class="tool">Comment on pipeline</button>' : "") +
      '<button id="clearGraphPromptSelection" class="tool">Clear</button>' +
    "</div>";
  }

  function bindGraphPromptToolbar(graph) {
    var selection = document.getElementById("commentOnGraphSelection");
    if (selection) selection.addEventListener("click", function () {
      openGraphPromptTarget(graphPromptSelectionTarget(state.graphPromptSelection, graph.edges));
    });
    var pipeline = document.getElementById("commentOnGraphPipeline");
    if (pipeline) pipeline.addEventListener("click", function () {
      var order = graphPromptPipelineOrder(state.graphPromptSelection, graph.edges);
      if (order) openGraphPromptTarget(graphPromptPipelineTarget(order, graph.edges));
    });
    var clear = document.getElementById("clearGraphPromptSelection");
    if (clear) clear.addEventListener("click", clearTemporaryGraphPromptSelection);
  }

  // Graph prompts are deliberately local to the current graph. The selection
  // never becomes a source-inspector or navigation selection.
  function toggleGraphPromptSelection(functionId) {
    var index = state.graphPromptSelection.indexOf(functionId);
    if (index >= 0) state.graphPromptSelection.splice(index, 1);
    else state.graphPromptSelection.push(functionId);
    if (state.graphPromptTarget && state.graphPromptTarget.type !== "dependency") clearGraphPromptTarget();
    refreshGraphPromptUi();
  }

  function clearTemporaryGraphPromptSelection() {
    state.graphPromptSelection = [];
    if (state.graphPromptTarget && state.graphPromptTarget.type !== "dependency") clearGraphPromptTarget();
    refreshGraphPromptUi();
  }

  function clearGraphPromptState() {
    state.graphPromptSelection = [];
    clearGraphPromptTarget();
  }

  function clearGraphPromptTarget() {
    state.graphPromptTarget = null;
    state.graphPromptDraft = "";
    state.graphPromptText = "";
    state.graphPromptFeedback = "";
  }

  function refreshGraphPromptUi() {
    if (state.workspace !== "graph") {
      renderGraphPromptComposer();
      return;
    }
    renderTools();
    redraw(false);
    renderGraphPromptComposer();
  }

  function bindGraphPromptEdge(path, edgeInfo) {
    path.classList.add("graph-prompt-edge");
    path.setAttribute("data-edge-source", edgeInfo.source);
    path.setAttribute("data-edge-target", edgeInfo.target);
    path.setAttribute("data-src", edgeInfo.source);
    path.setAttribute("data-tgt", edgeInfo.target);
    if (state.graphPromptTarget && state.graphPromptTarget.type === "dependency" &&
        state.graphPromptTarget.sourceId === edgeInfo.source && state.graphPromptTarget.targetId === edgeInfo.target) {
      path.classList.add("graph-prompt-edge-active");
    }
    makeSvgButton(path, "Comment on dependency from " + graphPromptFunctionName(edgeInfo.source) +
      " to " + graphPromptFunctionName(edgeInfo.target), function (event) {
      event.stopPropagation();
      openGraphPromptTarget(graphPromptDependencyTarget(edgeInfo.source, edgeInfo.target));
    });
  }

  function graphPromptPipelineOrder(selectedIds, edges) {
    if (selectedIds.length < 2) return null;
    var selected = setOf(selectedIds);
    var directEdges = edges.filter(function (edgeInfo) {
      return selected[edgeInfo.source] && selected[edgeInfo.target];
    });
    if (directEdges.length !== selectedIds.length - 1) return null;

    var next = {}, previous = {};
    for (var index = 0; index < directEdges.length; index += 1) {
      var edgeInfo = directEdges[index];
      if (next[edgeInfo.source] || previous[edgeInfo.target]) return null;
      next[edgeInfo.source] = edgeInfo.target;
      previous[edgeInfo.target] = edgeInfo.source;
    }

    var starts = selectedIds.filter(function (id) { return !previous[id]; });
    var ends = selectedIds.filter(function (id) { return !next[id]; });
    if (starts.length !== 1 || ends.length !== 1) return null;

    var ordered = [], seen = {}, current = starts[0];
    while (current) {
      if (seen[current]) return null;
      seen[current] = true;
      ordered.push(current);
      current = next[current];
    }
    return ordered.length === selectedIds.length ? ordered : null;
  }

  function graphPromptDependencyTarget(sourceId, targetId) {
    return {
      type: "dependency",
      sourceId: sourceId,
      targetId: targetId,
      functionIds: [sourceId, targetId],
      edges: [{ source: sourceId, target: targetId }],
    };
  }

  function graphPromptSelectionTarget(functionIds, edges) {
    var selected = setOf(functionIds);
    return {
      type: "selection",
      functionIds: functionIds.slice(),
      edges: edges.filter(function (edgeInfo) {
        return selected[edgeInfo.source] && selected[edgeInfo.target];
      }).map(graphPromptEdge),
    };
  }

  function graphPromptPipelineTarget(functionIds, edges) {
    var links = [];
    for (var index = 0; index < functionIds.length - 1; index += 1) {
      var sourceId = functionIds[index], targetId = functionIds[index + 1];
      var match = edges.filter(function (edgeInfo) {
        return edgeInfo.source === sourceId && edgeInfo.target === targetId;
      })[0];
      if (match) links.push(graphPromptEdge(match));
    }
    return { type: "pipeline", functionIds: functionIds.slice(), edges: links };
  }

  function graphPromptEdge(edgeInfo) {
    return { source: edgeInfo.source, target: edgeInfo.target };
  }

  function openGraphPromptTarget(target) {
    clearGraphPromptTarget();
    state.graphPromptTarget = target;
    state.graphPromptText = buildGraphCodexPrompt(target);
    redraw(false);
    renderGraphPromptComposer();
  }

  function renderGraphPromptComposer() {
    if (state.workspace !== "graph" || !state.graphPromptTarget) {
      graphPromptComposer.hidden = true;
      graphPromptComposer.innerHTML = "";
      return;
    }

    var target = state.graphPromptTarget;
    state.graphPromptText = buildGraphCodexPrompt(target);
    var feedback = state.graphPromptFeedback
      ? '<p class="graph-prompt-feedback" role="status">' + escape(state.graphPromptFeedback) + "</p>"
      : "";
    graphPromptComposer.hidden = false;
    graphPromptComposer.innerHTML =
      '<div class="graph-prompt-heading"><h2>Codex graph prompt</h2><button type="button" class="graph-prompt-close" data-cancel-graph-prompt aria-label="Cancel graph prompt">×</button></div>' +
      '<p class="graph-prompt-summary">' + escape(graphPromptSummary(target)) + "</p>" +
      '<label for="graphPromptDraft">Question for Codex</label>' +
      '<textarea id="graphPromptDraft" data-graph-prompt-draft rows="3" placeholder="What should Codex inspect?">' + escape(state.graphPromptDraft) + "</textarea>" +
      '<label for="graphPromptText">Prompt for Codex</label>' +
      '<textarea id="graphPromptText" data-graph-prompt-text rows="11" readonly spellcheck="false">' + escape(state.graphPromptText) + "</textarea>" +
      '<div class="graph-prompt-actions"><button type="button" class="graph-prompt-primary" data-copy-graph-prompt>Copy prompt</button><button type="button" data-cancel-graph-prompt>Cancel</button></div>' +
      feedback;

    var draft = graphPromptComposer.querySelector("[data-graph-prompt-draft]");
    draft.addEventListener("input", function () {
      state.graphPromptDraft = draft.value;
      state.graphPromptText = buildGraphCodexPrompt(state.graphPromptTarget);
      graphPromptComposer.querySelector("[data-graph-prompt-text]").value = state.graphPromptText;
    });
    graphPromptComposer.querySelectorAll("[data-cancel-graph-prompt]").forEach(function (button) {
      button.addEventListener("click", cancelGraphPrompt);
    });
    graphPromptComposer.querySelector("[data-copy-graph-prompt]").addEventListener("click", copyGraphPrompt);
  }

  function graphPromptSummary(target) {
    if (target.type === "dependency") {
      return "Dependency: " + graphPromptFunctionName(target.sourceId) + " → " + graphPromptFunctionName(target.targetId);
    }
    if (target.type === "pipeline") {
      return "Pipeline: " + target.functionIds.map(graphPromptFunctionName).join(" → ");
    }
    return "Selection: " + target.functionIds.length + " functions";
  }

  function buildGraphCodexPrompt(target) {
    var question = state.graphPromptDraft.trim() || "Review this graph context.";
    var functions = target.functionIds.map(graphPromptFunctionLocation);
    var edges = target.edges.length
      ? target.edges.map(function (edgeInfo) {
        return "- " + graphPromptFunctionName(edgeInfo.source) + " → " + graphPromptFunctionName(edgeInfo.target);
      })
      : ["- No direct calls between the selected functions."];
    return [
      "Review question: " + question,
      "",
      "Target type: " + graphPromptTargetLabel(target.type),
      "",
      "Functions:",
    ].concat(functions).concat([
      "",
      "Statically resolved direct calls:",
    ]).concat(edges).concat([
      "",
      "Inspect the referenced implementation in repository context before making any change.",
      "Explain findings and supporting evidence before proposing or making changes.",
      "Atlas reports only statically resolved calls; indirect, dynamic, and external callers need separate verification.",
    ]).join("\n");
  }

  function graphPromptTargetLabel(type) {
    if (type === "pipeline") return "statically resolved pipeline";
    return type;
  }

  function graphPromptFunctionLocation(functionId) {
    var node = nodeById[functionId] || {};
    var symbol = symbolById[functionId] || {};
    var file = symbol.file_id || node.file_id;
    var start = symbol.line_start || node.line_start;
    var end = symbol.line_end || start;
    return "- " + graphPromptFunctionName(functionId) + " — " + file + ":" + start + "–" + end;
  }

  function graphPromptFunctionName(functionId) {
    var node = nodeById[functionId] || {};
    var symbol = symbolById[functionId] || {};
    return symbol.qualified_name || node.qualified_name || functionId;
  }

  function cancelGraphPrompt() {
    clearGraphPromptState();
    rerender();
  }

  function copyGraphPrompt() {
    if (!state.graphPromptText) return;
    copyPromptText(state.graphPromptText, function () {
      clearGraphPromptState();
      rerender();
    }, function () {
      state.graphPromptFeedback = "Copy failed. Select the prompt text and copy it manually.";
      renderGraphPromptComposer();
      var prompt = graphPromptComposer.querySelector("[data-graph-prompt-text]");
      prompt.focus();
      prompt.select();
    });
  }

  // --- repository views ---------------------------------------------------

  function renderViews() {
    var views = [
      ["summary", "Summary"],
      ["use-cases", "Use cases"],
      ["functions", "Functions"],
    ];
    viewPanel.innerHTML = views.map(function (viewInfo) {
      var id = viewInfo[0], label = viewInfo[1];
      return '<button class="view-tab' + (state.workspace === id ? " active" : "") + '" data-workspace="' + id + '"' +
        (state.workspace === id ? ' aria-current="page"' : "") + ">" + label + "</button>";
    }).join("");
    viewPanel.querySelectorAll("[data-workspace]").forEach(function (button) {
      button.addEventListener("click", function () { setWorkspace(button.getAttribute("data-workspace")); });
    });
  }

  function renderSidebarTabs() {
    var tabs = [
      ["pages", "Pages"],
      ["navigation", "Navigation"],
      ["review", "Review"],
    ];
    sidebarTabs.innerHTML = tabs.map(function (tab) {
      var id = tab[0], label = tab[1];
      return '<button class="sidebar-tab' + (state.sidebarTab === id ? " active" : "") + '" data-sidebar-tab="' + id + '" aria-pressed="' + (state.sidebarTab === id) + '">' + label + "</button>";
    }).join("");
    sidebarTabs.querySelectorAll("[data-sidebar-tab]").forEach(function (button) {
      button.addEventListener("click", function () { setSidebarTab(button.getAttribute("data-sidebar-tab")); });
    });
  }

  function isWorkspace(workspace) {
    return ["graph", "summary", "use-cases", "functions"].indexOf(workspace) >= 0;
  }

  function isReviewWorkspace(workspace) {
    return ["summary", "use-cases", "functions"].indexOf(workspace) >= 0;
  }

  function setWorkspace(workspace) {
    if (!isReviewWorkspace(workspace) || state.workspace === workspace) return;
    recordNavigation();
    clearGraphPromptState();
    state.workspace = workspace;
    rerender();
  }

  function setSidebarTab(tab) {
    if (["pages", "navigation", "review"].indexOf(tab) < 0 || state.sidebarTab === tab) return;
    state.sidebarTab = tab;
    rerender();
  }

  function renderNavigationSurface() {
    var shell = document.querySelector(".shell");
    shell.classList.toggle("rail-collapsed", state.navigationCollapsed);
    navigationModes.innerHTML =
      '<button class="navigation-mode' + (state.navigationSurface === "tree" ? " active" : "") + '" data-navigation="tree" aria-pressed="' + (state.navigationSurface === "tree") + '">Tree</button>' +
      '<button class="navigation-mode' + (state.navigationSurface === "city" ? " active" : "") + '" data-navigation="city" aria-pressed="' + (state.navigationSurface === "city") + '">City map</button>';
    navigationModes.querySelectorAll("[data-navigation]").forEach(function (button) {
      button.addEventListener("click", function () { setNavigationSurface(button.getAttribute("data-navigation")); });
    });
    viewPanel.hidden = state.sidebarTab !== "pages";
    navigationModes.hidden = state.sidebarTab !== "navigation";
    treePanel.hidden = state.sidebarTab !== "navigation" || state.navigationSurface !== "tree";
    cityMapRail.hidden = state.sidebarTab !== "navigation" || state.navigationSurface !== "city";
    if (state.sidebarTab === "navigation" && state.navigationSurface === "tree") renderTree();
    if (state.sidebarTab === "navigation" && state.navigationSurface === "city") renderCityMapRail();
  }

  function setNavigationSurface(surface) {
    if ((surface !== "tree" && surface !== "city") || state.navigationSurface === surface) return;
    recordNavigation();
    state.navigationSurface = surface;
    rerender();
  }

  function renderCityMapRail() {
    if (!citymap.files.length) {
      cityMapRail.innerHTML = '<p class="city-map-rail-empty">No repository files were found.</p>';
      return;
    }

    var path = state.cityPath || "";
    var parent = path ? cityDirByPath[path] : { content_rect: citymap.layout.root_content_rect || { x: 0, z: 0, w: 120, d: 120 } };
    var items = cityMapItems(path);
    var svg = '<svg class="city-map-svg" viewBox="0 0 120 120" role="group" aria-label="Repository city map for ' +
      escapeAttr(path || "repository") + '"><title>' + escape(path || "repository") + " city map</title>" +
      '<rect class="city-map-ground" x="0" y="0" width="120" height="120"></rect>';
    items.forEach(function (item) {
      svg += item.kind === "dir"
        ? cityMapDirectoryTile(item, parent.content_rect)
        : cityMapFileTile(item, parent.content_rect);
    });
    svg += "</svg>";

    cityMapRail.innerHTML =
      '<div class="city-map-rail-head"><span>City map</span><button data-city-path="">Root</button></div>' +
      cityMapBreadcrumb(path) +
      '<div class="city-map-rail-canvas">' + svg + "</div>" +
      '<section class="city-information" aria-live="polite">' + cityMapInformation() + "</section>";
    bindCityMapRailActions();
  }

  function renderNavigation() {
    historyPanel.innerHTML =
      '<button class="history-button" data-history="back" aria-label="Back"' + (navigation.back.length ? "" : " disabled") + ">‹</button>" +
      '<button class="history-button" data-history="forward" aria-label="Forward"' + (navigation.forward.length ? "" : " disabled") + ">›</button>";
    historyPanel.querySelectorAll("[data-history]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (button.getAttribute("data-history") === "back") goBack();
        else goForward();
      });
    });
  }

  function recordNavigation() {
    navigation.back.push(navigationSnapshot());
    if (navigation.back.length > 40) navigation.back.shift();
    navigation.forward = [];
  }

  function navigationSnapshot() {
    return {
      workspace: state.workspace,
      navigationSurface: state.navigationSurface,
      scope: state.scope,
      mode: state.mode,
      focus: state.focus,
      graphSelection: state.graphSelection,
      graphSelectionType: state.graphSelectionType,
      mapSelection: state.mapSelection && { kind: state.mapSelection.kind, path: state.mapSelection.path },
      detailSelection: state.detailSelection && { type: state.detailSelection.type, id: state.detailSelection.id },
      objectFocus: state.objectFocus,
      cityPath: state.cityPath,
      useCaseSelections: Object.assign({}, state.useCaseSelections),
      useCaseLayerSelections: Object.assign({}, state.useCaseLayerSelections),
      collapsedUseCases: Object.assign({}, state.collapsedUseCases),
      collapsedFunctionSections: Object.assign({}, state.collapsedFunctionSections),
      collapsedFunctionClasses: Object.assign({}, state.collapsedFunctionClasses),
    };
  }

  function restoreNavigation(snapshot) {
    clearGraphPromptState();
    state.workspace = snapshot.workspace;
    state.navigationSurface = snapshot.navigationSurface || "city";
    state.scope = snapshot.scope;
    state.mode = snapshot.mode;
    state.focus = snapshot.focus;
    state.graphSelection = snapshot.graphSelection;
    state.graphSelectionType = snapshot.graphSelectionType;
    state.mapSelection = snapshot.mapSelection;
    state.detailSelection = snapshot.detailSelection;
    state.objectFocus = snapshot.objectFocus || null;
    state.cityPath = snapshot.cityPath || "";
    state.hovered = null;
    state.lastFunctionClick = null;
    state.useCaseSelections = Object.assign({}, snapshot.useCaseSelections);
    state.useCaseLayerSelections = Object.assign({}, snapshot.useCaseLayerSelections);
    state.collapsedUseCases = Object.assign({}, snapshot.collapsedUseCases);
    state.collapsedFunctionSections = Object.assign({}, snapshot.collapsedFunctionSections);
    state.collapsedFunctionClasses = Object.assign({}, snapshot.collapsedFunctionClasses);
    expandTo(state.scope);
    rerender();
  }

  function goBack() {
    if (!navigation.back.length) return;
    navigation.forward.push(navigationSnapshot());
    restoreNavigation(navigation.back.pop());
  }

  function goForward() {
    if (!navigation.forward.length) return;
    navigation.back.push(navigationSnapshot());
    restoreNavigation(navigation.forward.pop());
  }

  function showGraph() {
    canvas.hidden = false;
    canvas.style.display = "block";
    tabContent.hidden = true;
    tabContent.style.display = "none";
    document.getElementById("hint").hidden = false;
  }

  function renderTabContent() {
    canvas.hidden = true;
    canvas.style.display = "none";
    tabContent.hidden = false;
    tabContent.style.display = "block";
    document.getElementById("hint").hidden = true;
    document.getElementById("crumbs").innerHTML = "";
    document.getElementById("tools").innerHTML = "";
    if (state.workspace === "summary") tabContent.innerHTML = summaryView();
    if (state.workspace === "use-cases") tabContent.innerHTML = useCasesView();
    if (state.workspace === "functions") tabContent.innerHTML = functionsView();
    tabContent.querySelectorAll("[data-select-function]").forEach(function (button) {
      button.addEventListener("click", function () { activateFunction(button.getAttribute("data-select-function")); });
    });
    tabContent.querySelectorAll("[data-use-case-function]").forEach(function (button) {
      button.addEventListener("click", function () {
        activateFunction(
          button.getAttribute("data-use-case-function"),
          button.getAttribute("data-use-case"),
          button.getAttribute("data-use-case-stage")
        );
      });
    });
    tabContent.querySelectorAll("[data-collapse-use-case]").forEach(function (button) {
      button.addEventListener("click", function () {
        toggleUseCase(button.getAttribute("data-collapse-use-case"));
      });
    });
    tabContent.querySelectorAll("[data-collapse-function-section]").forEach(function (button) {
      button.addEventListener("click", function () {
        toggleFunctionSection(button.getAttribute("data-collapse-function-section"));
      });
    });
    tabContent.querySelectorAll("[data-collapse-function-class]").forEach(function (button) {
      button.addEventListener("click", function () {
        toggleFunctionClass(button.getAttribute("data-collapse-function-class"));
      });
    });
  }

  function summaryView() {
    var overview = payload.overview;
    var functionalityIssues = architecture.functionality_issues || [];
    return '<div class="content-page">' +
      '<section class="content-section"><h1>Summary</h1><dl class="summary-list">' +
        summaryItem("Files", overview.file_count) +
        summaryItem("Functions and methods", overview.function_count + overview.method_count) +
        summaryItem("Statically resolved cross-file calls", overview.cross_file_call_count) +
        summaryItem("Documented example workflows", architecture.use_cases.length) +
        summaryItem("Functionality definition issues", functionalityIssues.length) +
      "</dl></section>" +
      functionalityIssuesView(functionalityIssues) +
      '<section class="content-section"><h2>Static-analysis limits</h2><p class="content-copy">' +
        overview.unresolved_call_count + " unresolved calls and " + overview.external_call_count +
        " external calls remain outside the local call graph.</p></section>" +
      "</div>";
  }

  function functionalityIssuesView(issues) {
    if (!issues.length) return "";
    return '<section class="content-section"><h2>Functionality definition issues</h2>' +
      issues.map(function (issue) {
        return '<p><code>' + escape(issue.path) + "</code>: " + escape(issue.message) + "</p>";
      }).join("") + "</section>";
  }

  function useCasesView() {
    return '<div class="content-page use-case-page"><section class="content-section"><h1>Example architectures</h1>' +
      '<p class="content-copy">Each card starts with a documented example and follows its resolved implementation calls.</p>' +
      listOrEmpty(architecture.use_cases.map(useCaseArchitectureCard), "No documented examples match files in examples/.") +
      "</section></div>";
  }

  function useCaseArchitectureCard(useCase) {
    var topology = useCase.architecture || { workflow_ids: useCase.function_ids };
    var activeId = state.useCaseSelections[useCase.id] || topology.workflow_ids[0];
    var activeFunction = architectureById[activeId] || nodeById[activeId] || { qualified_name: activeId || "function" };
    var firstLayerIds = directCallees(activeId);
    var activeLayerId = state.useCaseLayerSelections[useCase.id] || firstLayerIds[0];
    var activeLayerFunction = architectureById[activeLayerId] || nodeById[activeLayerId] || { qualified_name: activeLayerId || "function" };
    var secondLayerIds = directCallees(activeLayerId);
    var examplePath = useCase.example_paths.join(", ");
    var collapsed = !!state.collapsedUseCases[useCase.id];
    var nextTrace = activeLayerId && secondLayerIds.length
      ? '<div class="architecture-row">' +
          selectedLayerStage(activeLayerFunction) +
          '<div class="architecture-arrow" aria-hidden="true">→</div>' +
          architectureStage("Next implementation layer", secondLayerIds, "implementation") +
        "</div>"
      : "";
    var body = collapsed ? "" : '<div class="architecture-trace">' +
      '<div class="architecture-row">' +
      workflowStage(useCase.id, topology.workflow_ids, activeId) +
      '<div class="architecture-arrow" aria-hidden="true">→</div>' +
      implementationStage("Direct implementation of " + activeFunction.name, firstLayerIds, useCase.id, "first") +
      "</div>" + nextTrace + "</div><footer class=\"architecture-card-footer\">" + escape(useCase.path) + "</footer>";
    return '<article class="architecture-card' + (collapsed ? " collapsed" : "") + '"><header class="architecture-card-header">' +
      '<button class="architecture-card-toggle" data-collapse-use-case="' + escapeAttr(useCase.id) + '" aria-expanded="' + (!collapsed) + '">' +
      '<span class="architecture-collapse-mark" aria-hidden="true">' + (collapsed ? "+" : "−") + '</span>' +
      '<span class="architecture-card-title">' + escape(useCase.title) + '</span>' +
      '<span class="content-source">' + escape(examplePath) + "</span></button></header>" + body + "</article>";
  }

  function workflowStage(useCaseId, functionIds, activeId) {
    var nodes = functionIds.map(function (id) {
      var functionInfo = architectureById[id] || nodeById[id];
      if (!functionInfo) return "";
      return architectureFunctionButton(functionInfo, "workflow", useCaseId, id === activeId);
    }).join("");
    return '<section class="architecture-stage workflow"><h3>Documented workflow</h3><div class="architecture-nodes">' +
      (nodes || '<span class="content-source">No resolved functions</span>') + "</div></section>";
  }

  function implementationStage(title, functionIds, useCaseId, layer) {
    var activeId = state.useCaseLayerSelections[useCaseId] || functionIds[0];
    var nodes = functionIds.map(function (id) {
      var functionInfo = architectureById[id] || nodeById[id];
      return functionInfo ? architectureFunctionButton(functionInfo, layer, useCaseId, id === activeId) : "";
    }).join("");
    return '<section class="architecture-stage implementation"><h3>' + escape(title) + '</h3><div class="architecture-nodes">' +
      (nodes || '<span class="content-source">No resolved calls</span>') + "</div></section>";
  }

  function selectedLayerStage(functionInfo) {
    var content = functionInfo.id ? architectureFunctionButton(functionInfo, "selected", "", true) : '<span class="content-source">No implementation function selected</span>';
    return '<section class="architecture-stage selected-layer"><h3>Selected implementation</h3><div class="architecture-nodes">' + content + "</div></section>";
  }

  function architectureStage(title, functionIds, kind) {
    var nodes = functionIds.map(function (id) {
      var functionInfo = architectureById[id] || nodeById[id];
      return functionInfo ? architectureFunctionButton(functionInfo, "inspect", "", false) : "";
    }).join("");
    return '<section class="architecture-stage ' + kind + '"><h3>' + escape(title) + "</h3><div class=\"architecture-nodes\">" +
      (nodes || '<span class="content-source">No resolved functions</span>') + "</div></section>";
  }

  function architectureFunctionButton(functionInfo, stage, useCaseId, active) {
    var attributes = ' data-select-function="' + escapeAttr(functionInfo.id) + '"';
    if (stage === "workflow" || stage === "first") {
      attributes = ' data-use-case="' + escapeAttr(useCaseId) + '" data-use-case-stage="' + stage +
        '" data-use-case-function="' + escapeAttr(functionInfo.id) + '"';
    }
    return '<button class="architecture-function-button' + (active ? " active" : "") + '"' + attributes +
      ' aria-pressed="' + active + '"><span class="architecture-function-name">' + escape(functionInfo.name) +
      '</span><span class="architecture-function-module">' + escape(functionInfo.module) + "</span></button>";
  }

  function directCallees(functionId) {
    var functionInfo = architectureById[functionId];
    return functionInfo ? functionInfo.callees.map(function (call) { return call.id; }) : [];
  }

  function toggleUseCase(useCaseId) {
    recordNavigation();
    state.collapsedUseCases[useCaseId] = !state.collapsedUseCases[useCaseId];
    rerender();
  }

  function functionsView() {
    var functions = architecture.functions.slice().sort(function (left, right) {
      return left.module.localeCompare(right.module) || left.id.localeCompare(right.id);
    });
    return '<div class="content-page"><section class="content-section"><h1>Functions</h1>' +
      '<p class="content-copy">Functions and methods are grouped by package, module, and class. Collapse sections to focus on the code you are tracking, then open a callable to inspect its interface, source, callers, and callees.</p>' +
      functionSectionsView(functionSectionTree(functions, objects)) + "</section></div>";
  }

  function functionSectionTree(functions, classes) {
    var root = { children: {}, functions: [], classes: [], path: "" };
    functions.forEach(function (functionInfo) {
      if (functionInfo.kind === "function") {
        functionSectionForModule(root, functionInfo.module).functions.push(functionInfo);
      }
    });
    classes.forEach(function (object) {
      functionSectionForModule(root, object.module).classes.push(object);
    });
    return root;
  }

  function functionSectionForModule(root, module) {
    var section = root;
    var path = [];
    module.split(".").forEach(function (part) {
      path.push(part);
      section.children[part] = section.children[part] || {
        children: {},
        functions: [],
        classes: [],
        name: part,
        path: path.join("."),
      };
      section = section.children[part];
    });
    return section;
  }

  function functionSectionsView(root) {
    var sections = Object.keys(root.children).sort().map(function (name) {
      return functionSectionView(root.children[name], 0);
    });
    return sections.length ? '<div class="function-sections">' + sections.join("") + "</div>" :
      '<p class="content-empty">No functions were found.</p>';
  }

  function functionSectionView(section, depth) {
    var collapsed = !!state.collapsedFunctionSections[section.path];
    var children = Object.keys(section.children).sort().map(function (name) {
      return functionSectionView(section.children[name], depth + 1);
    }).join("");
    var count = functionSectionCallableCount(section);
    var rows = section.functions.length ? functionRows(section.functions) : "";
    var classes = section.classes.slice().sort(function (left, right) {
      return left.name.localeCompare(right.name);
    }).map(function (object) {
      return functionClassView(object);
    }).join("");
    var contents = collapsed ? "" : rows + classes + children;
    return '<section class="function-section' + (collapsed ? " collapsed" : "") + '" style="--function-section-indent: ' + (depth * 18) + 'px">' +
      '<button class="function-section-toggle" data-collapse-function-section="' + escapeAttr(section.path) + '" aria-expanded="' + (!collapsed) + '" aria-label="' +
        (collapsed ? "Expand " : "Collapse ") + escapeAttr(section.path) + '">' +
        '<span class="function-section-mark" aria-hidden="true">' + (collapsed ? "+" : "−") + '</span>' +
        '<span class="function-section-name">' + escape(section.name) + '</span>' +
        '<span class="function-section-count">' + count + (count === 1 ? " callable" : " callables") + "</span>" +
      "</button>" + contents + "</section>";
  }

  function functionSectionCallableCount(section) {
    var classMethods = section.classes.reduce(function (count, object) {
      return count + objectMethodIds(object).length;
    }, 0);
    return section.functions.length + classMethods + Object.keys(section.children).reduce(function (count, name) {
      return count + functionSectionCallableCount(section.children[name]);
    }, 0);
  }

  function functionClassView(object) {
    var collapsed = !!state.collapsedFunctionClasses[object.id];
    var methods = objectMethodIds(object).map(function (id) { return architectureById[id]; }).filter(Boolean);
    return '<section class="function-class' + (collapsed ? " collapsed" : "") + '">' +
      '<button class="function-class-toggle" data-collapse-function-class="' + escapeAttr(object.id) + '" aria-expanded="' + (!collapsed) + '" aria-label="' +
        (collapsed ? "Expand class " : "Collapse class ") + escapeAttr(object.name) + '">' +
        '<span class="function-section-mark" aria-hidden="true">' + (collapsed ? "+" : "−") + '</span>' +
        '<span class="function-class-name">class ' + escape(object.name) + '</span>' +
        '<span class="function-section-count">' + methods.length + (methods.length === 1 ? " method" : " methods") + "</span>" +
      "</button>" + (collapsed || !methods.length ? "" : functionRows(methods)) + "</section>";
  }

  function functionRows(functions) {
    return '<table class="function-table"><thead><tr><th>Function</th><th>Role</th><th>State</th><th>Calls</th></tr></thead><tbody>' +
      functions.map(function (functionInfo) {
        return "<tr><td>" + functionButton(functionInfo, functionInfo.name) + '</td><td class="function-role">' +
          escape(functionInfo.role) + "</td><td>" + escape(functionInfo.state) + "</td><td>" + functionInfo.callers.length + " / " + functionInfo.callees.length + "</td></tr>";
      }).join("") + "</tbody></table>";
  }

  function toggleFunctionSection(path) {
    recordNavigation();
    state.collapsedFunctionSections[path] = !state.collapsedFunctionSections[path];
    rerender();
  }

  function toggleFunctionClass(id) {
    recordNavigation();
    state.collapsedFunctionClasses[id] = !state.collapsedFunctionClasses[id];
    rerender();
  }

  function summaryItem(label, value) {
    return "<div><dt>" + escape(label) + "</dt><dd>" + value + "</dd></div>";
  }

  function listOrEmpty(items, empty) {
    return items.length ? '<div class="content-list">' + items.join("") + "</div>" : '<p class="content-empty">' + escape(empty) + "</p>";
  }

  function functionButton(functionInfo, label) {
    var text = label || functionInfo.name;
    if (functionInfo.in_static_map && nodeById[functionInfo.id]) {
      return '<button class="content-link" data-select-function="' + escapeAttr(functionInfo.id) + '">' + escape(text) + "</button>";
    }
    return '<span class="content-unmapped" title="This callable is outside the static map.">' + escape(text) +
      '<span class="content-unmapped-note">not in static map</span></span>';
  }

  function activateFunction(functionId, useCaseId, stage) {
    var now = Date.now();
    var previous = state.lastFunctionClick;
    if (previous && previous.id === functionId && now - previous.at < 450) {
      state.lastFunctionClick = null;
      navigateToGraph(functionId);
      return;
    }
    state.lastFunctionClick = { id: functionId, at: now };
    if (useCaseId) selectUseCaseFunction(useCaseId, functionId, stage);
    else selectFunctionInPlace(functionId);
  }

  function selectUseCaseFunction(useCaseId, functionId, stage) {
    if (!nodeById[functionId]) return;
    var selectedId = stage === "first" ? state.useCaseLayerSelections[useCaseId] : state.useCaseSelections[useCaseId];
    if (selectedId === functionId && state.graphSelection === functionId && detailIsFunction(functionId)) return;
    recordNavigation();
    if (stage === "first") {
      state.useCaseLayerSelections[useCaseId] = functionId;
    } else {
      state.useCaseSelections[useCaseId] = functionId;
      delete state.useCaseLayerSelections[useCaseId];
    }
    state.graphSelection = functionId;
    state.graphSelectionType = "function";
    state.detailSelection = { type: "function", id: functionId };
    state.objectFocus = null;
    state.hovered = null;
    rerender();
  }

  function selectFunctionInPlace(id) {
    if (!nodeById[id] || (state.graphSelection === id && detailIsFunction(id))) return;
    recordNavigation();
    state.graphSelection = id;
    state.graphSelectionType = "function";
    state.detailSelection = { type: "function", id: id };
    state.objectFocus = null;
    state.hovered = null;
    rerender();
  }

  function navigateToGraph(id) {
    if (!nodeById[id]) return;
    recordNavigation();
    state.workspace = "graph";
    selectFunction(id);
  }

  function modeToggle(objectModeAvailable) {
    return '<div class="mode-toggle" aria-label="Graph mode">' +
      '<button id="modeFunctions" class="mode-button' + (state.mode === "functions" ? " active" : "") + '">Functions</button>' +
      '<button id="modeObjects" class="mode-button' + (state.mode === "objects" ? " active" : "") + (objectModeAvailable ? "" : " disabled") + '">Objects</button>' +
      "</div>";
  }

  // --- sidebar ------------------------------------------------------------

  function renderHead() {
    document.getElementById("head").innerHTML =
      '<div class="head-top"><div><div class="brand">atlas</div><div class="pkg">' + escape(model.package_name) +
        '</div></div><button class="rail-collapse" id="railCollapse" aria-label="' + (state.navigationCollapsed ? "Expand navigation" : "Collapse navigation") + '" title="' + (state.navigationCollapsed ? "Expand navigation" : "Collapse navigation") + '">' + (state.navigationCollapsed ? "›" : "‹") + "</button></div>";
    document.getElementById("railCollapse").addEventListener("click", toggleNavigationCollapsed);
  }

  function renderTree() {
    treePanel.setAttribute("role", "list");
    treePanel.setAttribute("aria-label", "Repository structure");
    treePanel.innerHTML = treeRows(tree, 0);
    treePanel.querySelectorAll("[data-twirl]").forEach(function (twirl) {
      twirl.addEventListener("click", function (event) {
        event.stopPropagation();
        var path = twirl.getAttribute("data-twirl");
        state.expanded[path] = !state.expanded[path];
        renderTree();
        focusTreeItem("data-twirl", path);
      });
    });
    treePanel.querySelectorAll("[data-scope]").forEach(function (row) {
      row.addEventListener("click", function () { setScope(row.getAttribute("data-scope")); });
    });
    treePanel.querySelectorAll("[data-fn]").forEach(function (row) {
      row.addEventListener("click", function () { selectFunction(row.getAttribute("data-fn")); });
    });
    treePanel.querySelectorAll("[data-toggle-fn]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleFunction(button.getAttribute("data-toggle-fn"));
      });
    });
    syncTreeSelection();
  }

  function focusTreeItem(attribute, value) {
    var items = treePanel.querySelectorAll("[" + attribute + "]");
    for (var index = 0; index < items.length; index += 1) {
      if (items[index].getAttribute(attribute) === value) {
        items[index].focus();
        return;
      }
    }
  }

  function treeRows(node, depth) {
    var open = state.expanded[node.path];
    var hasChildren = node.children.length || (node.function_ids && node.function_ids.length);
    var twirl = hasChildren
      ? '<button type="button" class="twirl" aria-expanded="' + !!open + '" aria-label="' +
        (open ? "Collapse " : "Expand ") + escapeAttr(node.path || "all") + '" data-twirl="' + escapeAttr(node.path) + '">' + (open ? "▾" : "▸") + "</button>"
      : '<span class="twirl empty"></span>';
    var html =
      '<div class="trow" role="listitem" aria-level="' + (depth + 1) + '" data-path="' + escapeAttr(node.path) + '" style="--d:' + depth + '">' +
        twirl +
        '<button type="button" class="trow-action" aria-label="Open ' + escapeAttr(node.path || "all") + '" data-scope="' + escapeAttr(node.path) + '">' +
          '<span class="tname">' + escape(node.path === "" ? "all" : node.name) + (node.type === "package" ? "/" : "") + "</span>" +
          treeBadges(node.rollup) +
        "</button>" +
      "</div>";
    if (open) {
      node.children.forEach(function (child) { html += treeRows(child, depth + 1); });
      if (node.type === "module") {
        node.function_ids.forEach(function (id) {
          var fn = nodeById[id];
          var inactive = state.disabled[id];
          html += '<div class="trow tfn ' + statusClass(fn) + (inactive ? " deactivated" : "") + '" role="listitem" aria-level="' + (depth + 2) + '" style="--d:' + (depth + 1) + '">' +
            '<span class="twirl empty"></span><button type="button" class="trow-action" aria-label="Inspect function ' + escapeAttr(fn.name) + '" data-fn="' + escapeAttr(id) + '"><span class="tdot"></span><span class="tname">' + escape(fn.name) + "</span></button>" +
            '<button class="fn-toggle" data-toggle-fn="' + escapeAttr(id) + '">' + (inactive ? "activate" : "deactivate") + "</button></div>";
        });
      }
    }
    return html;
  }

  function treeBadges(rollup) {
    var badges = "";
    if (rollup.clones) badges += '<span class="tb clone">' + rollup.clones + "</span>";
    if (rollup.dead) badges += '<span class="tb dead">' + rollup.dead + "</span>";
    if (rollup.hubs) badges += '<span class="tb hub">' + rollup.hubs + "</span>";
    return '<span class="tbadges">' + badges + "</span>";
  }

  function syncTreeSelection() {
    treePanel.querySelectorAll(".trow").forEach(function (row) {
      var path = row.getAttribute("data-path");
      var scopeAction = row.querySelector("[data-scope]");
      var functionAction = row.querySelector("[data-fn]");
      var scoped = path === state.scope;
      var functionId = functionAction ? functionAction.getAttribute("data-fn") : null;
      var selected = functionId === state.graphSelection;
      row.classList.toggle("scoped", scoped);
      row.classList.toggle("active", selected);
      if (scopeAction && scoped) scopeAction.setAttribute("aria-current", "location");
      else if (scopeAction) scopeAction.removeAttribute("aria-current");
      if (functionAction) functionAction.setAttribute("aria-pressed", String(selected));
      row.classList.toggle("deactivated", !!state.disabled[functionId]);
    });
  }

  // --- interaction --------------------------------------------------------

  function setScope(path) {
    if (treeByPath[path] === undefined) return;
    recordNavigation();
    clearGraphPromptState();
    state.scope = path;
    state.workspace = "graph";
    state.focus = null;
    state.graphSelection = null;
    state.graphSelectionType = null;
    state.objectFocus = null;
    state.hovered = null;
    var scopedNode = treeByPath[path] || tree;
    if (!scopeObjects(scopedNode).length) state.mode = "functions";
    expandTo(path);
    renderTree();
    rerender();
  }

  function selectFunction(id) {
    if (state.disabled[id]) return;
    clearGraphPromptState();
    state.graphSelection = id;
    state.workspace = "graph";
    state.graphSelectionType = "function";
    state.detailSelection = { type: "function", id: id };
    state.objectFocus = null;
    state.hovered = null;
    state.focus = null;
    state.mode = "functions";
    state.scope = moduleOf(id);
    expandTo(moduleOf(id));
    renderTree();
    rerender();
  }

  function toggleFunction(id) {
    clearGraphPromptState();
    state.disabled[id] = !state.disabled[id];
    if (!state.disabled[id]) delete state.disabled[id];
    if (state.disabled[id] && state.graphSelection === id) {
      state.graphSelection = null;
      state.graphSelectionType = null;
      state.hovered = null;
      state.focus = null;
      state.scope = moduleOf(id);
    }
    if (state.disabled[id] && detailIsFunction(id)) state.detailSelection = null;
    if (state.disabled[id] && state.hovered === id) state.hovered = null;
    renderTree();
    rerender();
  }

  function expandTo(path) {
    var segments = path.split(".");
    for (var index = 0; index < segments.length; index += 1) {
      state.expanded[segments.slice(0, index + 1).join(".")] = true;
    }
    state.expanded[""] = true;
  }

  function moduleOf(id) {
    var m = nodeById[id].module;
    return treeByPath[m] ? m : state.scope;
  }

  function setMode(mode) {
    if (state.mode === mode) return;
    clearGraphPromptState();
    state.mode = mode;
    state.focus = null;
    state.graphSelection = null;
    state.graphSelectionType = null;
    state.objectFocus = null;
    state.hovered = null;
    expandTo(tree.path);
    rerender();
  }

  function toggleFocus() {
    clearGraphPromptState();
    if (state.focus) {
      state.focus = null;
    } else if (state.graphSelectionType === "function" && nodeById[state.graphSelection]) {
      state.focus = state.graphSelection;
    }
    rerender();
  }

  function setTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("atlas-theme", theme); } catch (error) { /* session-only theme */ }
    renderThemeToggle();
  }

  function toggleNavigationCollapsed() {
    state.navigationCollapsed = !state.navigationCollapsed;
    renderHead();
    rerender();
  }

  function bindToolbarActions() {
    document.getElementById("fullGraph").addEventListener("click", showFullGraph);
    document.getElementById("themeToggle").addEventListener("click", function () {
      setTheme(state.theme === "dark" ? "light" : "dark");
    });
    renderThemeToggle();
  }

  function renderThemeToggle() {
    var button = document.getElementById("themeToggle");
    var nextTheme = state.theme === "dark" ? "light" : "dark";
    button.setAttribute("aria-pressed", state.theme === "dark");
    button.setAttribute("aria-label", "Switch to " + nextTheme + " mode");
    button.setAttribute("title", "Switch to " + nextTheme + " mode");
    button.innerHTML = '<span class="theme-icon" aria-hidden="true">' + (state.theme === "dark" ? "☼" : "◐") +
      "</span><span>" + (state.theme === "dark" ? "Light" : "Dark") + "</span>";
  }

  function showFullGraph() {
    if (state.workspace === "graph" && state.scope === tree.path && !state.focus && !state.graphSelection) return;
    recordNavigation();
    clearGraphPromptState();
    state.workspace = "graph";
    state.scope = tree.path;
    state.mode = "functions";
    state.focus = null;
    state.graphSelection = null;
    state.graphSelectionType = null;
    state.objectFocus = null;
    state.hovered = null;
    rerender();
  }

  function selectObject(id) {
    if (!objectById[id]) return;
    clearGraphPromptState();
    state.graphSelection = id;
    state.workspace = "graph";
    state.graphSelectionType = "object";
    state.detailSelection = { type: "object", id: id };
    state.objectFocus = id;
    state.hovered = null;
    state.focus = null;
    state.mode = "objects";
    var module = objectById[id].module;
    var inScope = state.scope === "" || module === state.scope || module.indexOf(state.scope + ".") === 0;
    if (!inScope) state.scope = module;
    expandTo(module);
    rerender();
  }

  function selectObjectMethod(objectId, methodId) {
    var object = objectById[objectId];
    if (!object || objectMethodIds(object).indexOf(methodId) < 0 || !nodeById[methodId]) return;
    clearGraphPromptState();
    state.workspace = "graph";
    state.graphSelection = methodId;
    state.graphSelectionType = "function";
    state.detailSelection = { type: "function", id: methodId };
    state.objectFocus = objectId;
    state.hovered = null;
    state.focus = null;
    state.mode = "objects";
    rerender();
  }

  function backToObjectRelationships() {
    if (!state.objectFocus) return;
    recordNavigation();
    clearGraphPromptState();
    state.objectFocus = null;
    state.graphSelection = null;
    state.graphSelectionType = null;
    state.focus = null;
    state.mode = "objects";
    rerender();
  }

  // --- source inspector + city-map rail ----------------------------------

  function renderDetail() {
    var panel = document.getElementById("detail");
    var shell = document.querySelector(".shell");
    var selection = state.detailSelection;
    if (!selection) {
      renderedDetailKey = null;
      panel.hidden = true;
      panel.innerHTML = "";
      shell.classList.remove("source-open");
      return;
    }

    var detailKey = selection.type + ":" + selection.id;
    var detailChanged = detailKey !== renderedDetailKey;
    if (detailChanged && !panel.contains(document.activeElement)) {
      detailReturnFocus = document.activeElement;
    }
    renderedDetailKey = detailKey;

    panel.hidden = false;
    shell.classList.add("source-open");
    if (selection.type === "object" && objectById[selection.id]) {
      renderObjectDetail(panel, objectById[selection.id]);
      if (detailChanged) focusNewDetail(panel);
      return;
    }
    if (selection.type !== "function" || !nodeById[selection.id]) {
      state.detailSelection = null;
      renderedDetailKey = null;
      panel.hidden = true;
      panel.innerHTML = "";
      shell.classList.remove("source-open");
      return;
    }

    var sourceId = selection.id;
    var node = nodeById[sourceId];
    var symbol = symbolById[node.id] || {};
    var functionInfo = architectureById[node.id];
    var callers = inAdj[node.id] || [];
    var callees = outAdj[node.id] || [];
    var highlight = state.hovered && isConnectedToSelected(state.hovered) ? nodeById[state.hovered] : null;
    var signature = functionSignature(symbol, node);
    panel.innerHTML =
      '<div class="detail-head">' +
        '<h2>' + escape(node.name) + "</h2>" +
        '<button class="detail-close" aria-label="Close source inspector">×</button>' +
      "</div>" +
      quickPromptActions() +
      (node.load_bearing ? '<span class="detail-tag">' + roleLabel(node) + "</span>" : "") +
      (node.dead ? '<span class="detail-tag dead">dead code</span>' : "") +
      (clonePartner[node.id] ? '<span class="detail-tag clone">clone ×' + (clonePartner[node.id].length + 1) + "</span>" : "") +
      '<p class="detail-doc">' + escape(node.docstring_summary) + "</p>" +
      (functionInfo && functionInfo.role !== node.docstring_summary
        ? '<p class="detail-role"><strong>Atlas role:</strong> ' + escape(functionInfo.role) + "</p>"
        : "") +
      '<p class="detail-signature"><code>' + escape(signature) + "</code></p>" +
      "<dl>" +
        "<dt>module</dt><dd>" + escape(node.module) + "</dd>" +
        "<dt>location</dt><dd>" + escape(node.file_id + ":" + node.line_start) + "</dd>" +
        "<dt>inputs</dt><dd>" + escape(functionInputs(symbol)) + "</dd>" +
        "<dt>output</dt><dd>" + escape(symbol.return_annotation || "not declared") + "</dd>" +
        "<dt>callers / callees</dt><dd>" + callers.length + " / " + callees.length + "</dd>" +
        "<dt>status</dt><dd>" + escape(roleLabel(node)) + "</dd>" +
      "</dl>" +
      '<h3 class="detail-section-title">Code</h3>' +
      (highlight ? '<div class="detail-hover">Highlighting references to <strong>' + escape(highlight.name) + "</strong></div>" : "") +
      sourceBlock(symbol, highlight ? highlight.name : null, {
        symbolId: node.id,
        sourceRange: state.sourceRange,
      });
    panel.querySelector(".detail-close").addEventListener("click", hideDetail);
    bindInlinePromptActions(panel, node.id);
    if (detailChanged) focusNewDetail(panel);
  }

  function focusNewDetail(panel) {
    if (detailFocusFrame !== null) cancelAnimationFrame(detailFocusFrame);
    detailFocusFrame = requestAnimationFrame(function () {
      detailFocusFrame = null;
      var close = panel.querySelector(".detail-close");
      if (!panel.hidden && close) close.focus();
    });
  }

  function renderReviewPromptPanel() {
    var panel = document.getElementById("reviewPromptPanel");
    if (state.sidebarTab !== "review") {
      panel.hidden = true;
      panel.innerHTML = "";
      return;
    }

    var items = state.reviewPromptItems.length
      ? '<ol class="review-prompt-items">' + state.reviewPromptItems.map(function (item, index) {
        var lineRange = item.startLine === item.endLine ? item.startLine : item.startLine + "–" + item.endLine;
        return '<li><span>' + escape(item.file + ":" + lineRange) + '</span><button type="button" data-remove-review-prompt-item="' + index + '">Remove</button></li>';
      }).join("") + "</ol>"
      : '<p class="review-prompt-empty">Add comments from the source inspector to collect them here.</p>';
    var feedback = state.reviewPromptFeedback
      ? '<p class="review-prompt-feedback" role="status">' + escape(state.reviewPromptFeedback) + "</p>"
      : "";
    panel.hidden = false;
    panel.innerHTML =
      '<h2 class="review-prompt-title">Prompt</h2>' +
      items +
      '<label class="review-prompt-label" for="reviewPromptText">Prompt for Codex</label>' +
      '<textarea id="reviewPromptText" data-review-prompt-text rows="18" readonly spellcheck="false" placeholder="Collected comments will appear here…">' + escape(state.reviewPromptText) + "</textarea>" +
      '<div class="review-prompt-actions">' +
        '<button type="button" class="review-prompt-primary" data-copy-review-prompt' + (state.reviewPromptText ? "" : " disabled") + ">Copy prompt</button>" +
        '<button type="button" data-clear-review-prompt' + (state.reviewPromptItems.length ? "" : " disabled") + ">Clear all</button>" +
      "</div>" + feedback;
    panel.querySelectorAll("[data-remove-review-prompt-item]").forEach(function (button) {
      button.addEventListener("click", function () {
        removeReviewPromptItem(Number(button.getAttribute("data-remove-review-prompt-item")));
      });
    });
    var copy = panel.querySelector("[data-copy-review-prompt]");
    if (copy) copy.addEventListener("click", copyReviewPrompt);
    var clear = panel.querySelector("[data-clear-review-prompt]");
    if (clear) clear.addEventListener("click", clearReviewPrompt);
  }

  function addReviewPromptItem(sourceId) {
    var node = nodeById[sourceId];
    var symbol = symbolById[sourceId] || {};
    var target = promptTarget(sourceId);
    var comment = state.commentDraft.trim();
    if (!comment || !target) return false;
    state.reviewPromptItems.push({
      file: symbol.file_id || node.file_id,
      startLine: target.startLine,
      endLine: target.endLine,
      prompt: buildCodexPrompt(sourceId, comment),
    });
    state.reviewPromptText = reviewPromptText();
    state.reviewPromptFeedback = "";
    resetInlinePrompt();
    renderReviewPromptPanel();
    renderDetail();
    return true;
  }

  function removeReviewPromptItem(index) {
    state.reviewPromptItems.splice(index, 1);
    state.reviewPromptText = reviewPromptText();
    state.reviewPromptFeedback = "";
    renderReviewPromptPanel();
  }

  function clearReviewPrompt() {
    state.reviewPromptItems = [];
    state.reviewPromptText = "";
    state.reviewPromptFeedback = "";
    renderReviewPromptPanel();
  }

  function reviewPromptText() {
    return core.combineReviewPrompts(
      state.reviewPromptItems.map(function (item) { return item.prompt; })
    );
  }

  function bindCityMapRailActions() {
    cityMapRail.querySelectorAll("[data-city-path]").forEach(function (button) {
      button.addEventListener("click", function () { openCityPath(button.getAttribute("data-city-path")); });
    });
    cityMapRail.querySelectorAll("[data-city-directory]").forEach(function (tile) {
      function open() {
        openCityPath(tile.getAttribute("data-city-directory"));
      }
      tile.addEventListener("click", open);
      tile.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        open();
      });
    });
    cityMapRail.querySelectorAll("[data-city-select]").forEach(function (tile) {
      function select() {
        selectCityItem(tile.getAttribute("data-city-kind"), tile.getAttribute("data-city-select"));
      }
      tile.addEventListener("click", select);
      tile.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        select();
      });
    });
    cityMapRail.querySelectorAll("[data-city-callable]").forEach(function (button) {
      button.addEventListener("click", function () { selectCityCallable(button.getAttribute("data-city-callable")); });
    });
  }

  function cityMapInformation() {
    if (!state.mapSelection) {
      return '<div class="city-information-empty"><h2>Map information</h2><p>Select a file or directory to inspect its structural facts.</p></div>';
    }
    if (state.mapSelection.kind === "dir") return cityDirectoryInformation(cityDirByPath[state.mapSelection.path]);
    return cityFileInformation(cityFileByPath[state.mapSelection.path]);
  }

  function cityDirectoryInformation(directory) {
    if (!directory) return "";
    var facts = directory.facts;
    return '<div><h2>' + escape(directory.path) + "</h2>" +
      '<p class="city-information-type">Directory</p>' +
      cityFactsList(facts) +
    "</div>";
  }

  function cityFileInformation(file) {
    if (!file) return "";
    var facts = file.facts;
    if (facts.kind !== "code") {
      return '<div><h2>' + escape(file.path) + "</h2>" +
        '<p class="city-information-type">Non-code file</p><dl>' +
          "<dt>language</dt><dd>" + escape(file.lang) + "</dd>" +
          "<dt>lines</dt><dd>" + formatNumber(file.lines) + "</dd>" +
          "<dt>size</dt><dd>" + formatBytes(file.bytes) + "</dd>" +
        "</dl></div>";
    }
    var callableList = facts.callable_ids.length
      ? '<ul class="city-callables">' + facts.callable_ids.map(function (id) {
        var node = nodeById[id];
        if (!node) {
          var symbol = symbolById[id];
          return '<li><span title="This callable is outside the static map.">' +
            escape(symbol ? symbol.name : id) + " (outside static map)</span></li>";
        }
        return '<li><button data-city-callable="' + escapeAttr(id) + '">' + escape(node.name) + "</button></li>";
      }).join("") + "</ul>"
      : '<p class="city-callables-empty">No callable source is available.</p>';
    return '<div><h2>' + escape(file.path) + "</h2>" +
      '<p class="city-information-type">' + (facts.is_test ? "Test file" : "Code file") + "</p>" +
      cityFactsList(facts) +
      '<h3>Callables</h3>' + callableList +
    "</div>";
  }

  function cityFactsList(facts) {
    return "<dl>" +
      "<dt>code LOC</dt><dd>" + formatNumber(facts.code_loc) + "</dd>" +
      "<dt>callables</dt><dd>" + formatNumber(facts.callable_count) + "</dd>" +
      "<dt>classes</dt><dd>" + formatNumber(facts.class_count) + "</dd>" +
      "<dt>warnings</dt><dd>" + formatNumber(facts.warning_count) + (facts.warning_types.length ? " (" + escape(facts.warning_types.join(", ")) + ")" : "") + "</dd>" +
      "<dt>unresolved calls</dt><dd>" + formatNumber(facts.unresolved_calls) + "</dd>" +
      "<dt>dead functions</dt><dd>" + formatNumber(facts.dead_function_count) + "</dd>" +
      "<dt>clone groups</dt><dd>" + formatNumber(facts.clone_group_ids.length) + "</dd>" +
      "<dt>load-bearing</dt><dd>" + formatNumber(facts.load_bearing_function_count) + "</dd>" +
      (facts.large_function_loc ? "<dt>largest flagged function</dt><dd>" + formatNumber(facts.large_function_loc) + " LOC</dd>" : "") +
      (facts.functionality_ids.length ? "<dt>accepted functionality</dt><dd>" + escape(facts.functionality_ids.join(", ")) + "</dd>" : "") +
      (facts.layer_violation_ids.length ? "<dt>layer violations</dt><dd>" + formatNumber(facts.layer_violation_ids.length) + "</dd>" : "") +
    "</dl>";
  }

  function cityMapItems(path) {
    var directories = citymap.dirs.filter(function (directory) {
      return cityParentPath(directory.path) === path;
    });
    var files = citymap.files.filter(function (file) { return file.dir === path; });
    return directories.map(function (directory) { return { kind: "dir", value: directory }; })
      .concat(files.map(function (file) { return { kind: "file", value: file }; }))
      .sort(function (left, right) {
        var a = left.value.rect, b = right.value.rect;
        return a.z - b.z || a.x - b.x || left.value.path.localeCompare(right.value.path);
      });
  }

  function cityMapDirectoryTile(item, parentRect) {
    var directory = item.value;
    var rect = cityLocalRect(directory.rect, parentRect);
    var header = cityLocalRect(directory.header_rect, parentRect);
    var label = cityMapLabel(directory.path);
    var selected = state.mapSelection && state.mapSelection.kind === "dir" && state.mapSelection.path === directory.path;
    var text = rect.w > 10 && header.h > 2
      ? '<text class="city-map-tile-label city-map-dir-label" x="' + (header.x + 1.6) + '" y="' + (header.y + header.h / 2) + '" dominant-baseline="middle">' + escape(truncate(label, Math.max(3, Math.floor(rect.w / 3.3)))) + "</text>"
      : "";
    return '<g class="city-map-item city-map-dir risk-' + directory.facts.risk + (selected ? " selected" : "") + '" role="button" tabindex="0" data-city-directory="' + escapeAttr(directory.path) + '" aria-label="Open ' + escapeAttr(directory.path) + '">' +
      '<title>' + escape(directory.path) + " · " + formatCount(directory.file_count, "file") + " · " + formatNumber(directory.facts.code_loc) + " code LOC</title>" +
      '<rect class="city-map-dir-body" x="' + rect.x + '" y="' + rect.y + '" width="' + rect.w + '" height="' + rect.h + '"></rect>' +
      '<rect class="city-map-dir-header" x="' + header.x + '" y="' + header.y + '" width="' + header.w + '" height="' + header.h + '"></rect>' + text + "</g>";
  }

  function cityMapFileTile(item, parentRect) {
    var file = item.value;
    var rect = cityLocalRect(file.rect, parentRect);
    var label = cityMapLabel(file.path);
    var selected = state.mapSelection && state.mapSelection.kind === "file" && state.mapSelection.path === file.path;
    var text = rect.w > 10 && rect.h > 7
      ? '<text class="city-map-tile-label city-map-file-label" x="' + (rect.x + 1.6) + '" y="' + (rect.y + rect.h / 2) + '" dominant-baseline="middle">' + escape(truncate(label, Math.max(3, Math.floor(rect.w / 3.3)))) + "</text>"
      : "";
    return '<g class="city-map-item city-map-file tone-' + cityFileTone(file) + (selected ? " selected" : "") + '" role="button" tabindex="0" data-city-kind="file" data-city-select="' + escapeAttr(file.path) + '" aria-label="Select ' + escapeAttr(file.path) + '">' +
      '<title>' + escape(file.path) + " · " + formatNumber(file.lines) + " lines · " + formatBytes(file.bytes) + "</title>" +
      '<rect x="' + rect.x + '" y="' + rect.y + '" width="' + rect.w + '" height="' + rect.h + '"></rect>' + text + "</g>";
  }

  function cityFileTone(file) {
    var facts = file.facts;
    if (facts.kind !== "code" || facts.is_test) return "slate";
    if (facts.risk === "severe") return "red";
    if (facts.risk === "elevated") return "amber";
    return "stone";
  }

  function cityMapBreadcrumb(path) {
    var parts = [{ label: "root", path: "" }];
    if (path) {
      var segments = path.split("/");
      for (var i = 0; i < segments.length; i += 1) {
        parts.push({ label: segments[i], path: segments.slice(0, i + 1).join("/") });
      }
    }
    return '<nav class="city-map-breadcrumb" aria-label="Repository map path">' + parts.map(function (part, index) {
      return '<button class="city-map-crumb' + (part.path === path ? " active" : "") + '" data-city-path="' + escapeAttr(part.path) + '">' + escape(part.label) + "</button>" +
        (index < parts.length - 1 ? '<span aria-hidden="true">›</span>' : "");
    }).join("") + "</nav>";
  }

  function cityLocalRect(rect, parent) {
    return {
      x: ((rect.x - parent.x) / parent.w) * 120,
      y: ((rect.z - parent.z) / parent.d) * 120,
      w: (rect.w / parent.w) * 120,
      h: (rect.d / parent.d) * 120,
    };
  }

  function cityParentPath(path) {
    var slash = path.lastIndexOf("/");
    return slash < 0 ? "" : path.slice(0, slash);
  }

  function cityMapLabel(path) {
    var slash = path.lastIndexOf("/");
    return slash < 0 ? path : path.slice(slash + 1);
  }

  function openCityPath(path) {
    if (path !== "" && !cityDirByPath[path]) return;
    recordNavigation();
    state.cityPath = path;
    state.mapSelection = path ? { kind: "dir", path: path } : null;
    synchronizeGraphWithCityPath(path);
    rerender();
  }

  function synchronizeGraphWithCityPath(path) {
    var scope = cityGraphScope(path);
    if (scope === state.scope) return;
    clearGraphPromptState();
    state.scope = scope;
    state.mode = "functions";
    state.focus = null;
    state.graphSelection = null;
    state.graphSelectionType = null;
    state.objectFocus = null;
    state.hovered = null;
  }

  function cityGraphScope(path) {
    var modules = [];
    citymap.files.forEach(function (file) {
      if (path && file.dir !== path && file.dir.indexOf(path + "/") !== 0) return;
      (file.facts.callable_ids || []).forEach(function (id) {
        var node = nodeById[id];
        if (node) modules.push(node.module);
      });
    });
    if (!modules.length) return tree.path;

    var shared = modules[0].split(".");
    modules.slice(1).forEach(function (module) {
      var parts = module.split(".");
      var length = 0;
      while (length < shared.length && shared[length] === parts[length]) length += 1;
      shared = shared.slice(0, length);
    });
    while (shared.length && !treeByPath[shared.join(".")]) shared.pop();
    return shared.join(".");
  }

  function selectCityItem(kind, path) {
    recordNavigation();
    state.mapSelection = { kind: kind, path: path };
    rerender();
  }

  function selectCityCallable(id) {
    if (!nodeById[id]) return;
    recordNavigation();
    state.detailSelection = { type: "function", id: id };
    rerender();
  }

  function formatCount(count, singular) {
    return formatNumber(count) + " " + (count === 1 ? singular : singular + "s");
  }

  function formatNumber(value) {
    return Number(value || 0).toLocaleString();
  }

  function formatBytes(value) {
    if (value < 1024) return formatNumber(value) + " B";
    if (value < 1024 * 1024) return (value / 1024).toFixed(1) + " KB";
    return (value / (1024 * 1024)).toFixed(1) + " MB";
  }

  function hideDetail() {
    var closedSelection = state.detailSelection;
    if (detailFocusFrame !== null) {
      cancelAnimationFrame(detailFocusFrame);
      detailFocusFrame = null;
    }
    clearGraphPromptState();
    resetInlinePrompt();
    state.detailSelection = null;
    rerender();
    var focusTarget = detailReturnFocus && detailReturnFocus !== document.body &&
      detailReturnFocus.isConnected && !detailReturnFocus.closest("[hidden]")
      ? detailReturnFocus
      : detailFocusTarget(closedSelection);
    detailReturnFocus = null;
    if (focusTarget) focusTarget.focus();
  }

  function detailFocusTarget(selection) {
    if (!selection) return document.getElementById("fullGraph");
    var attribute = selection.type === "object" ? "data-object-focus" : "data-function-focus";
    var candidates = document.querySelectorAll("[" + attribute + "]");
    for (var index = 0; index < candidates.length; index += 1) {
      if (candidates[index].getAttribute(attribute) === selection.id && !candidates[index].closest("[hidden]")) {
        return candidates[index];
      }
    }
    return document.getElementById("fullGraph");
  }

  function renderObjectDetail(card, object) {
    var constructor = object.constructor || { params: [], assigned_fields: [] };
    var fields = object.fields || [];
    var collaborators = fields.filter(function (field) { return field.collaborator_kind; });
    var methodRows = (object.field_access || []).map(function (access) {
      var method = nodeById[access.method_id];
      if (!method) return "";
      var calls = (access.collaborator_calls || []).map(function (call) {
        return call.field + "." + call.method + "()";
      }).join(", ");
      return "<tr><td><button type=\"button\" class=\"object-method-link\" data-object-method=\"" + escapeAttr(access.method_id) + "\">" + escape(method.name) + "</button></td><td>" + escape(access.reads.join(", ") || "none") + "</td><td>" + escape(access.writes.join(", ") || "none") + "</td><td>" + escape(calls || "none") + "</td></tr>";
    }).join("");
    card.innerHTML =
      '<div class="detail-head">' +
        '<h2>' + escape(object.name) + "</h2>" +
        '<button class="detail-close" aria-label="Close object inspector">×</button>' +
      "</div>" +
      '<span class="detail-tag">object</span>' +
      '<p class="detail-doc">' + escape(object.docstring_summary || "No docstring") + "</p>" +
      "<dl>" +
        "<dt>module</dt><dd>" + escape(object.module) + "</dd>" +
        "<dt>location</dt><dd>" + escape(object.file_id + ":" + object.line_start) + "</dd>" +
        "<dt>constructor</dt><dd>" + escape(constructor.method_id ? methodSignature(constructor.method_id, constructor.params) : "none") + "</dd>" +
        "<dt>fields</dt><dd>" + fields.length + "</dd>" +
      "</dl>" +
      '<h3 class="detail-section-title">Code</h3>' +
      sourceBlock(object, null) +
      '<h3 class="detail-section-title">Fields</h3>' +
      objectFieldTable(fields) +
      '<h3 class="detail-section-title">Collaborators</h3>' +
      objectCollaboratorList(collaborators) +
      '<h3 class="detail-section-title">Method State Access</h3>' +
      '<table class="object-detail-table"><thead><tr><th>method</th><th>reads</th><th>writes</th><th>calls</th></tr></thead><tbody>' +
      (methodRows || '<tr><td colspan="4" class="object-detail-empty">No recorded field access.</td></tr>') + "</tbody></table>";
    card.querySelector(".detail-close").addEventListener("click", hideDetail);
    card.querySelectorAll("[data-object-method]").forEach(function (button) {
      button.addEventListener("click", function () {
        selectObjectMethod(object.id, button.getAttribute("data-object-method"));
      });
    });
  }

  function objectFieldTable(fields) {
    if (!fields.length) return '<div class="source-empty">No initialized fields found.</div>';
    return '<table class="object-detail-table"><thead><tr><th>field</th><th>source</th><th>collaborator</th></tr></thead><tbody>' +
      fields.map(function (field) {
        var collaborator = field.collaborator_id ? field.collaborator_id : field.collaborator_kind ? "external " + field.collaborator_kind : "none";
        return "<tr><td>" + escape(field.name) + "</td><td>" + escape(field.source_kind + ": " + (field.source_name || "")) + "</td><td>" + escape(collaborator) + "</td></tr>";
      }).join("") +
      "</tbody></table>";
  }

  function objectCollaboratorList(fields) {
    if (!fields.length) return '<div class="source-empty">No collaborator fields found.</div>';
    return '<ul class="object-collaborators">' + fields.map(function (field) {
      var target = field.collaborator_id || "external";
      return '<li><strong>' + escape(field.name) + "</strong> " + escape(field.collaborator_kind) + " -> " + escape(target) + "</li>";
    }).join("") + "</ul>";
  }

  function sourceBlock(symbol, highlightName, options) {
    if (!symbol.source_excerpt) return '<div class="source-empty">No source excerpt available.</div>';
    var start = symbol.line_start || 1;
    var target = options && options.symbolId ? promptTarget(options.symbolId) : null;
    var rows = symbol.source_excerpt.split("\n").map(function (line, index) {
      var lineNumber = start + index;
      var selected = isSelectedSourceLine(options && options.sourceRange, options && options.symbolId, lineNumber);
      var gutter = options && options.symbolId
        ? '<button type="button" class="source-no source-gutter" data-source-symbol-id="' + escapeAttr(options.symbolId) + '" data-source-line="' + lineNumber + '" aria-label="Select line ' + lineNumber + '; Shift-click to extend the range" aria-pressed="' + selected + '">' + lineNumber + "</button>"
        : '<span class="source-no">' + lineNumber + "</span>";
      var row = '<div class="source-line' + (selected ? " source-line-selected" : "") + '">' + gutter + "<code>" + highlightPython(line, highlightName) + "</code></div>";
      if (target && target.startLine === lineNumber) row += inlinePromptComposer(options.symbolId, target);
      return row;
    }).join("");
    return '<div class="source-code">' + rows + "</div>";
  }

  function quickPromptActions() {
    return '<div class="quick-prompts" role="group" aria-label="Quick prompts">' +
      '<span class="quick-prompts-label">Quick prompts</span>' +
      '<button type="button" data-quick-prompt="make-function">Make function</button>' +
      '<button type="button" data-quick-prompt="remove-function">Remove function</button>' +
      '<button type="button" data-quick-prompt="remove-defensive-coding">Remove defensive coding</button>' +
    "</div>";
  }

  function inlinePromptComposer(sourceId, target) {
    return '<section class="inline-prompt-composer" aria-label="Comment composer">' +
      '<div class="inline-prompt-heading"><span>Comment for lines ' + escape(target.startLine + "–" + target.endLine) + "</span></div>" +
      '<label class="inline-prompt-label" for="inlinePromptDraft">Comment</label>' +
      '<textarea id="inlinePromptDraft" data-prompt-draft rows="4" placeholder="Describe what you observed…">' + escape(state.commentDraft) + "</textarea>" +
      '<div class="inline-prompt-actions">' +
        '<button type="button" class="inline-prompt-primary" data-add-comment>Add comment</button>' +
        '<button type="button" data-cancel-prompt>Cancel</button>' +
      "</div>" +
    "</section>";
  }

  function bindInlinePromptActions(panel, sourceId) {
    panel.querySelectorAll("[data-source-symbol-id]").forEach(function (gutter) {
      gutter.addEventListener("click", function (event) {
        selectSourceRange(
          gutter.getAttribute("data-source-symbol-id"),
          Number(gutter.getAttribute("data-source-line")),
          event.shiftKey
        );
      });
    });
    panel.querySelectorAll("[data-quick-prompt]").forEach(function (button) {
      button.addEventListener("click", function () {
        openQuickPrompt(button.getAttribute("data-quick-prompt"), sourceId);
      });
    });
    var draft = panel.querySelector("[data-prompt-draft]");
    if (draft) {
      draft.addEventListener("input", function () {
        draft.setCustomValidity("");
        state.commentDraft = draft.value;
      });
    }
    var cancel = panel.querySelector("[data-cancel-prompt]");
    if (cancel) {
      cancel.addEventListener("click", function () {
        resetInlinePrompt();
        renderDetail();
      });
    }
    var add = panel.querySelector("[data-add-comment]");
    if (add) add.addEventListener("click", function () {
      if (!state.commentDraft.trim()) {
        draft.setCustomValidity("Write a comment before adding it to Review.");
        draft.reportValidity();
        return;
      }
      addReviewPromptItem(sourceId);
    });
  }

  function selectSourceRange(symbolId, lineNumber, extend) {
    state.quickPromptType = null;
    var previous = state.sourceRange;
    var anchorLine = extend && previous && previous.symbolId === symbolId
      ? previous.anchorLine
      : lineNumber;
    state.sourceRange = {
      symbolId: symbolId,
      anchorLine: anchorLine,
      startLine: Math.min(anchorLine, lineNumber),
      endLine: Math.max(anchorLine, lineNumber),
    };
    renderDetail();
  }

  function openQuickPrompt(type, sourceId) {
    resetInlinePrompt();
    state.quickPromptType = type;
    state.commentDraft = quickPromptRequest(type);
    renderDetail();
  }

  function resetInlinePrompt() {
    state.sourceRange = null;
    state.commentDraft = "";
    state.quickPromptType = null;
  }

  function isSelectedSourceLine(sourceRange, symbolId, lineNumber) {
    return sourceRange && sourceRange.symbolId === symbolId &&
      lineNumber >= sourceRange.startLine && lineNumber <= sourceRange.endLine;
  }

  function promptTarget(sourceId) {
    var symbol = symbolById[sourceId] || {};
    if (state.quickPromptType) return fullSourceTarget(symbol);
    var range = state.sourceRange;
    if (!range || range.symbolId !== sourceId) return null;
    return {
      startLine: range.startLine,
      endLine: range.endLine,
    };
  }

  function fullSourceTarget(symbol) {
    var startLine = symbol.line_start || 1;
    return {
      startLine: startLine,
      endLine: symbol.line_end || startLine,
    };
  }

  function buildCodexPrompt(sourceId, comment) {
    var node = nodeById[sourceId];
    var symbol = symbolById[sourceId] || {};
    var target = promptTarget(sourceId);
    return core.buildReviewPrompt({
      comment: comment,
      file: symbol.file_id || node.file_id,
      target: target,
      involvedFunctions: promptInvolvedFunctions(sourceId),
    });
  }

  function promptInvolvedFunctions(sourceId) {
    var related = (inAdj[sourceId] || []).concat(outAdj[sourceId] || []).filter(function (id, index, ids) {
      return id !== sourceId && ids.indexOf(id) === index;
    }).sort(function (left, right) {
      return graphPromptFunctionName(left).localeCompare(graphPromptFunctionName(right));
    });
    return [sourceId].concat(related).map(function (id) {
      return "- " + graphPromptFunctionName(id);
    });
  }

  function quickPromptRequest(type) {
    if (type === "make-function") {
      return "Assess whether this code would be clearer as a focused function. Preserve behavior and propose an extraction only if the surrounding implementation supports it.";
    }
    if (type === "remove-function") {
      return "This should be a function. Write the code directly and add a comment.";
    }
    return "Remove guards, fallback paths, exception handlers, and null or existence checks.";
  }

  function copyReviewPrompt() {
    var prompt = state.reviewPromptText;
    if (!prompt) return;
    copyPromptText(prompt, function () {
      showReviewPromptFeedback("Copied. Paste it into Codex.");
    }, function () {
      showReviewPromptFeedback("Copy failed. Select the prompt text and copy it manually.", true);
    });
  }

  function copyPromptText(prompt, onSuccess, onFailure) {
    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
      navigator.clipboard.writeText(prompt).then(function () {
        onSuccess();
      }, function () {
        if (copyPromptTextWithFallback(prompt)) onSuccess();
        else onFailure();
      });
      return;
    }
    if (copyPromptTextWithFallback(prompt)) onSuccess();
    else onFailure();
  }

  function copyPromptTextWithFallback(prompt) {
    var temporary = document.createElement("textarea");
    temporary.value = prompt;
    temporary.setAttribute("readonly", "");
    temporary.style.position = "fixed";
    temporary.style.opacity = "0";
    document.body.appendChild(temporary);
    temporary.select();
    var copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }
    document.body.removeChild(temporary);
    return copied;
  }

  function showReviewPromptFeedback(message, selectPrompt) {
    state.reviewPromptFeedback = message;
    renderReviewPromptPanel();
    if (!selectPrompt) return;
    var prompt = document.querySelector("[data-review-prompt-text]");
    prompt.focus();
    prompt.select();
  }

  function functionSignature(symbol, node) {
    var prefix = symbol.is_async ? "async " : "";
    var output = symbol.return_annotation ? " -> " + symbol.return_annotation : "";
    var inputs = parameterList(symbol.parameters || []);
    return prefix + "def " + (symbol.name || node.name) + "(" + inputs + ")" + output;
  }

  function functionInputs(symbol) {
    var parameters = symbol.parameters || [];
    return parameters.length ? parameterList(parameters) : "none";
  }

  function parameterList(parameters) {
    var labels = [];
    var hasVariadic = parameters.some(function (parameter) {
      return parameter.kind === "variadic";
    });
    var insertedKeywordSeparator = false;
    parameters.forEach(function (parameter, index) {
      if (parameter.kind === "keyword-only" && !hasVariadic && !insertedKeywordSeparator) {
        labels.push("*");
        insertedKeywordSeparator = true;
      }
      labels.push(parameterLabel(parameter));
      if (
        parameter.kind === "positional-only" &&
        (!parameters[index + 1] || parameters[index + 1].kind !== "positional-only")
      ) {
        labels.push("/");
      }
    });
    return labels.join(", ");
  }

  function parameterLabel(parameter) {
    var prefix = parameter.kind === "variadic" ? "*" : parameter.kind === "keyword-variadic" ? "**" : "";
    var annotation = parameter.annotation ? ": " + parameter.annotation : "";
    var defaultValue = parameter.default ? " = " + parameter.default : "";
    return prefix + parameter.name + annotation + defaultValue;
  }

  // --- view / pan / zoom --------------------------------------------------

  function fitView(graph) {
    if (!graph.items.length) {
      if (graph.kind === "object-method") {
        var emptyRect = canvas.getBoundingClientRect();
        view = { x: (emptyRect.width || 900) / 2, y: (emptyRect.height || 700) / 2, scale: 1 };
      } else {
        view = { x: MARGIN, y: MARGIN, scale: 1 };
      }
      return;
    }
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    graph.items.forEach(function (it) {
      minX = Math.min(minX, it.cx - it.w / 2); maxX = Math.max(maxX, it.cx + it.w / 2);
      minY = Math.min(minY, it.cy - (it.h || NODE_H) / 2); maxY = Math.max(maxY, it.cy + (it.h || NODE_H) / 2);
    });
    if (graph.kind === "object-method") {
      graph.groups.forEach(function (methodGroup) {
        minX = Math.min(minX, methodGroup.left);
        maxX = Math.max(maxX, methodGroup.left + methodGroup.width);
        minY = Math.min(minY, methodGroup.top - 16);
        maxY = Math.max(maxY, methodGroup.bottom);
      });
    }
    var rect = canvas.getBoundingClientRect();
    var w = rect.width || 900, h = rect.height || 700;
    var scale = Math.min((w - 2 * MARGIN) / Math.max(1, maxX - minX), (h - 2 * MARGIN) / Math.max(1, maxY - minY), 1);
    view.scale = Math.max(scale, 0.18);
    view.x = (w - (maxX + minX) * view.scale) / 2;
    var contentH = (maxY - minY) * view.scale;
    view.y = contentH < h - 2 * MARGIN ? (h - (maxY + minY) * view.scale) / 2 : MARGIN - minY * view.scale;
  }

  function bindPanZoom() {
    var draggingPointer = null, last = null, moved = false;
    canvas.addEventListener("pointerdown", function (event) {
      if (event.button !== 0 || event.target.closest(".node, [role=button]")) return;
      draggingPointer = event.pointerId;
      moved = false;
      last = { x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener("pointermove", function (event) {
      if (event.pointerId !== draggingPointer) return;
      moved = true;
      view.x += event.clientX - last.x;
      view.y += event.clientY - last.y;
      last = { x: event.clientX, y: event.clientY };
      scheduleGraphTransform();
    });
    function endDrag(event) {
      if (event.pointerId === draggingPointer) draggingPointer = null;
    }
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("lostpointercapture", endDrag);
    canvas.addEventListener("click", function () {
      if (moved) return;
      if (state.workspace === "graph" && state.graphPromptSelection.length) {
        clearTemporaryGraphPromptSelection();
        return;
      }
      if (state.detailSelection) hideDetail();
    });
    canvas.addEventListener("wheel", function (e) {
      e.preventDefault();
      var rect = canvas.getBoundingClientRect();
      var px = e.clientX - rect.left, py = e.clientY - rect.top;
      zoomAt(px, py, e.deltaY < 0 ? 1.1 : 1 / 1.1);
      scheduleGraphTransform();
    }, { passive: false });
  }

  function bindKeyboardShortcuts() {
    document.addEventListener("keydown", function (event) {
      var tag = event.target && event.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (event.key === "Escape" && state.detailSelection) {
        hideDetail();
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (state.workspace !== "graph") return;
      if (event.key === "f") {
        event.preventDefault();
        redraw(true);
      }
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        zoomBy(1.2);
      }
      if (event.key === "-") {
        event.preventDefault();
        zoomBy(1 / 1.2);
      }
    });
  }

  function bindGraphResize() {
    var lastWidth = -1, lastHeight = -1;
    var observer = new ResizeObserver(function (entries) {
      var bounds = entries[0].contentRect;
      if (bounds.width === lastWidth && bounds.height === lastHeight) return;
      lastWidth = bounds.width;
      lastHeight = bounds.height;
      if (state.workspace !== "graph" || graphResizeFrame !== null) return;
      graphResizeFrame = requestAnimationFrame(function () {
        graphResizeFrame = null;
        if (state.workspace === "graph") redraw(true);
      });
    });
    observer.observe(canvas);
  }

  function zoomBy(factor) {
    var rect = canvas.getBoundingClientRect();
    zoomAt((rect.width || 900) / 2, (rect.height || 700) / 2, factor);
    scheduleGraphTransform();
  }

  function zoomAt(px, py, factor) {
    var next = Math.min(2.5, Math.max(0.12, view.scale * factor));
    view.x = px - (px - view.x) * (next / view.scale);
    view.y = py - (py - view.y) * (next / view.scale);
    view.scale = next;
  }

  function zoomLabel() { return Math.round(view.scale * 100) + "%"; }
  function syncZoomReadout() {
    var readout = document.getElementById("zoomReadout");
    if (readout) readout.textContent = zoomLabel();
  }

  function scheduleGraphTransform() {
    if (graphTransformFrame !== null) return;
    graphTransformFrame = requestAnimationFrame(function () {
      graphTransformFrame = null;
      if (graphRoot) {
        graphRoot.setAttribute("transform", "translate(" + view.x + "," + view.y + ") scale(" + view.scale + ")");
      }
      syncZoomReadout();
    });
  }

  function redraw(refit) {
    var graph = currentGraph();
    layout(graph);
    if (refit) fitView(graph);
    draw(graph);
    syncZoomReadout();
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
  function setOf(list) { var s = {}; (list || []).forEach(function (x) { s[x] = true; }); return s; }
  function detailIsFunction(id) {
    return state.detailSelection && state.detailSelection.type === "function" && state.detailSelection.id === id;
  }
  function scopeObjects(node) {
    var list = [];
    (function walk(n) {
      if (n.module) list = list.concat(objectsByModule[n.module] || []);
      (n.children || []).forEach(walk);
    })(node);
    return list.slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
  }
  function nodeWidth(it) {
    if (it.kind === "object") return objectCard(it).width;
    if (it.kind === "file") return it.card.width;
    var labelWidth = Math.min(260, Math.max(150, 34 + it.label.length * 7));
    return it.kind === "group" ? Math.max(174, labelWidth) : Math.max(164, labelWidth);
  }
  function nodeHeight(it) {
    if (it.kind === "object") return objectCard(it).height;
    if (it.kind === "file") return it.card.height;
    return NODE_H;
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
  function fieldAccessCounts(object) {
    var counts = {};
    (object.fields || []).forEach(function (field) { counts[field.name] = { reads: 0, writes: 0 }; });
    object.field_access.forEach(function (access) {
      access.reads.forEach(function (name) { if (counts[name]) counts[name].reads += 1; });
      access.writes.forEach(function (name) { if (counts[name]) counts[name].writes += 1; });
    });
    return counts;
  }
  function methodSignature(methodId, params) {
    var method = nodeById[methodId];
    return (method ? method.name : "__init__") + "(" + parameterList(params || []) + ")";
  }
  function makeSvgButton(element, label, activate) {
    element.setAttribute("role", "button");
    element.setAttribute("tabindex", "0");
    element.setAttribute("aria-label", label);
    bindNonNativeButton(element, activate);
  }
  function bindNonNativeButton(element, activate) {
    element.addEventListener("click", activate);
    element.addEventListener("keydown", function (event) {
      if (event.target !== element || (event.key !== "Enter" && event.key !== " ") || event.repeat) return;
      event.preventDefault();
      activate(event);
    });
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
  function line(x1, y1, x2, y2, cls) { var l = el("line"); l.setAttribute("x1", x1); l.setAttribute("y1", y1); l.setAttribute("x2", x2); l.setAttribute("y2", y2); if (cls) l.setAttribute("class", cls); return l; }
  function text(x, y, cls, t) { var e = el("text"); e.setAttribute("x", x); e.setAttribute("y", y); e.setAttribute("class", cls); e.textContent = t; return e; }
  function defs() {
    var d = el("defs");
    d.appendChild(marker("arrow", "var(--edge)"));
    d.appendChild(marker("arrow-red", "var(--red)"));
    for (var i = 0; i < 8; i += 1) d.appendChild(marker("arrow-hue-" + i, "var(--file-hue-" + i + ")"));
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
