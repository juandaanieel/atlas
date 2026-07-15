// Atlas explorer. The Python analyzer is the single source of truth: it ships a
// fully classified model — functions, edges, defects, and a package/module tree
// with rolled-up defect counts. This file derives only presentation facts from
// that payload, scopes stable file/function/object views, lays each topology out
// deterministically, and draws it. Selection only changes emphasis.

(function () {
  "use strict";

  var core = window.AtlasCore;
  if (!core) throw new Error("AtlasCore must be loaded before app.js");

  var SVGNS = "http://www.w3.org/2000/svg";
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
  var exampleModules = {};
  var internalFunctions = {};
  payload.symbols.forEach(function (symbol) {
    if (symbol.kind !== "function" || symbol.class_id) return;
    internalFunctions[symbol.id] = true;
    if (symbol.name === "main") exampleModules[symbol.module] = true;
  });
  var nonTestModules = {};
  (payload.files || []).forEach(function (file) {
    if (!file.is_test) nonTestModules[file.module] = true;
  });
  var importedFunctionsByModule = {};
  (payload.imports || []).forEach(function (importInfo) {
    if (importInfo.kind !== "from" || importInfo.name === "*" || !nonTestModules[importInfo.module]) return;
    var base = resolveImportBase(importInfo.module, importInfo.imported_module, importInfo.level);
    var target = base ? base + "." + importInfo.name : importInfo.name;
    if (!internalFunctions[target]) return;
    (importedFunctionsByModule[importInfo.module] = importedFunctionsByModule[importInfo.module] || {})[target] = true;
  });
  var orchestratorModules = {};
  var maximumImportedFunctions = Object.keys(importedFunctionsByModule).reduce(function (maximum, modulePath) {
    return Math.max(maximum, Object.keys(importedFunctionsByModule[modulePath]).length);
  }, 0);
  Object.keys(importedFunctionsByModule).forEach(function (modulePath) {
    if (Object.keys(importedFunctionsByModule[modulePath]).length === maximumImportedFunctions) {
      orchestratorModules[modulePath] = maximumImportedFunctions;
    }
  });
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
  var callPaths = buildCallPaths(model.edges);
  var callPathIndexByEdge = callPaths.colorByEdge;
  var callPathIdByEdge = callPaths.idByEdge;
  var callByEdge = {};
  (payload.calls || []).forEach(function (call) {
    if (!call.resolved || !call.target) return;
    var key = call.source + ">" + call.target;
    if (!callByEdge[key] || call.line < callByEdge[key].line) callByEdge[key] = call;
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
    globalView: "files",
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
    traceStart: null,
    traceEnd: null,
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
  };
  var view = { x: MARGIN, y: MARGIN, scale: 1 };
  var graphRoot = null;
  var lastTopologyKey = null;
  var renderedDetailKey = null;
  var detailReturnFocus = null;
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
  var traceDock = document.getElementById("traceDock");

  // The SVG contains focusable controls, so expose its descendants instead
  // of presenting the entire graph as one opaque image.
  canvas.setAttribute("role", "group");
  canvas.setAttribute("aria-describedby", "hint");

  readHash();
  renderHead();
  bindDetailResize();
  renderViews();
  renderNavigationSurface();
  rerender();
  bindPanZoom();
  bindKeyboardShortcuts();

  // --- deep links -----------------------------------------------------------

  function readHash() {
    var params = core.parseHash(location.hash);
    if (!Object.keys(params).length) return;
    if (params.scope !== undefined && treeByPath[params.scope]) {
      state.scope = params.scope;
      expandTo(params.scope);
    }
    if (params.mode === "functions" || params.mode === "objects" || params.mode === "global") state.mode = params.mode;
    if (params.globalView === "pipelines") state.globalView = "pipelines";
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
      if (state.mode !== "global") synchronizeGraphWithCityPath(params.city);
    }
    var graphId = params.graph || params.sel;
    if (graphId) {
      if (params.type === "file" && treeByPath[graphId]) {
        state.graphSelection = graphId;
        state.graphSelectionType = "file";
      } else if (params.type === "object" && objectById[graphId]) {
        state.graphSelection = graphId;
        state.graphSelectionType = "object";
        if (!params.detail) state.detailSelection = { type: "object", id: graphId };
      } else if (nodeById[graphId] && !state.disabled[graphId]) {
        state.graphSelection = graphId;
        state.graphSelectionType = "function";
        state.traceStart = graphId;
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
      state.scope = objectById[params.objectFocus].module;
      state.mode = "objects";
      if (!hasExplicitWorkspace) state.workspace = "graph";
    }
    if (params.detailType === "object" && params.detail && objectById[params.detail]) {
      state.detailSelection = { type: "object", id: params.detail };
      state.scope = objectById[params.detail].module;
      state.mode = "objects";
    }
    if (params.detailType === "function" && params.detail && nodeById[params.detail] && !state.disabled[params.detail]) {
      state.detailSelection = { type: "function", id: params.detail };
    }
    if (params.source && nodeById[params.source] && !state.disabled[params.source]) {
      state.detailSelection = { type: "function", id: params.source };
    }
    if (params.traceStart && activeTraceFunction(params.traceStart)) {
      state.traceStart = params.traceStart;
      if (params.scope === undefined && state.mode !== "global") {
        state.scope = moduleOf(params.traceStart);
        expandTo(state.scope);
      }
    }
    if (params.traceEnd && activeTraceFunction(params.traceEnd)) state.traceEnd = params.traceEnd;
    if (state.mode === "global") state.scope = tree.path;
    if (!params.mode && objectDominated(treeByPath[state.scope] || tree)) state.mode = "objects";
    state.objectFocus = null;
  }

  function writeHash() {
    history.replaceState(null, "", core.serializeHash(state));
  }

  // --- scope -> graph -----------------------------------------------------

  function currentGraph() {
    var graph = baseGraph();
    return state.traceStart && nodeById[state.traceStart]
      ? applyTrace(graph, state.traceStart, state.traceEnd)
      : graph;
  }

  function baseGraph() {
    var graph;
    if (state.mode === "global") {
      return state.globalView === "pipelines" ? globalPipelineGraph() : globalFunctionGraph();
    }
    var node = treeByPath[state.scope] || tree;
    if (!graph && state.mode === "objects" && node.type === "module" && scopeObjects(node).length) graph = objectGraph(node);
    if (!graph && node.type === "module") graph = moduleGraph(node);
    if (!graph) graph = packageGraph(node);
    return graph;
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
      var edgeKey = e.source + ">" + e.target;
      var pathIndex = callPathIndexByEdge[edgeKey];
      var pathId = callPathIdByEdge[edgeKey];
      var key = gs + ">" + gt + "|" + pathId;
      var rec = agg[key] = agg[key] || {
        source: gs,
        target: gt,
        pathIndex: pathIndex,
        pathId: pathId,
        weight: 0,
        src: {},
        tgt: {},
      };
      rec.weight += 1;
      rec.src[e.source] = (rec.src[e.source] || 0) + 1;
      rec.tgt[e.target] = (rec.tgt[e.target] || 0) + 1;
    });
    var edges = Object.keys(agg).map(function (k) {
      var rec = agg[k];
      return {
        source: rec.source,
        target: rec.target,
        pathIndex: rec.pathIndex,
        pathId: rec.pathId,
        weight: rec.weight,
        srcCounts: rec.src, tgtCounts: rec.tgt,
      };
    });
    return { items: items, edges: edges, kind: "group" };
  }

  function globalFunctionGraph() {
    var functionIdsByModule = {};
    model.nodes.forEach(function (node) {
      if (state.disabled[node.id]) return;
      (functionIdsByModule[node.module] = functionIdsByModule[node.module] || {})[node.id] = true;
    });
    var crossFileEdges = model.edges.filter(function (edgeInfo) {
      if (state.disabled[edgeInfo.source] || state.disabled[edgeInfo.target]) return false;
      var source = nodeById[edgeInfo.source], target = nodeById[edgeInfo.target];
      return source && target && source.module !== target.module;
    });
    var modulePaths = Object.keys(functionIdsByModule).sort();
    var items = modulePaths.map(function (modulePath) {
      return globalFileItem(modulePath, Object.keys(functionIdsByModule[modulePath]));
    });
    var edges = crossFileEdges.map(function (edgeInfo) {
      var source = nodeById[edgeInfo.source], target = nodeById[edgeInfo.target];
      return {
        source: source.module,
        target: target.module,
        sourceFunction: source.id,
        targetFunction: target.id,
        pathIndex: callPathIndexByEdge[source.id + ">" + target.id],
        pathId: callPathIdByEdge[source.id + ">" + target.id],
        weight: 1,
      };
    }).sort(function (left, right) {
      return left.source.localeCompare(right.source) ||
        left.target.localeCompare(right.target) ||
        left.sourceFunction.localeCompare(right.sourceFunction) ||
        left.targetFunction.localeCompare(right.targetFunction);
    });
    return { items: items, edges: edges, kind: "global" };
  }

  function globalPipelineGraph() {
    var activeIds = model.nodes.filter(function (node) {
      return !state.disabled[node.id];
    }).map(function (node) { return node.id; });
    var active = setOf(activeIds);
    var families = pipelineFamilies(active);
    var claimed = {};
    families.forEach(function (family) {
      family.itemIds.forEach(function (id) { claimed[id] = family.id; });
    });
    var items = activeIds.map(function (id) {
      var item = fnItem(id);
      if (item.node.kind === "method") item.label = id.slice(item.node.module.length + 1);
      item.objectId = claimed[id] || null;
      return item;
    });
    var edges = model.edges.filter(function (edgeInfo) {
      return !state.disabled[edgeInfo.source] && !state.disabled[edgeInfo.target];
    }).map(function (edgeInfo) {
      var key = edgeInfo.source + ">" + edgeInfo.target;
      return {
        source: edgeInfo.source,
        target: edgeInfo.target,
        pathIndex: callPathIndexByEdge[key],
        pathId: callPathIdByEdge[key],
        weight: 1,
      };
    }).sort(compareRouteEdges);
    return {
      items: items,
      edges: edges,
      groups: families,
      freeItemIds: activeIds.filter(function (id) { return !claimed[id]; }),
      kind: "pipeline-overview",
    };
  }

  function pipelineFamilies(active) {
    var activeOutgoing = {};
    Object.keys(active).forEach(function (id) { activeOutgoing[id] = []; });
    model.edges.forEach(function (edgeInfo) {
      if (!active[edgeInfo.source] || !active[edgeInfo.target]) return;
      activeOutgoing[edgeInfo.source].push(edgeInfo.target);
    });
    Object.keys(activeOutgoing).forEach(function (id) { activeOutgoing[id].sort(); });

    function reachableFrom(rootId) {
      var reached = {}, queue = [rootId];
      reached[rootId] = true;
      for (var index = 0; index < queue.length; index += 1) {
        (activeOutgoing[queue[index]] || []).forEach(function (target) {
          if (reached[target]) return;
          reached[target] = true;
          queue.push(target);
        });
      }
      return Object.keys(reached).sort();
    }

    var records = (architecture.pipelines || []).map(function (pipeline, index) {
      return {
        index: index,
        id: pipeline.id,
        title: pipeline.title,
        root: pipeline.root,
        functionIds: active[pipeline.root] ? reachableFrom(pipeline.root) : [],
      };
    }).filter(function (pipeline) { return pipeline.functionIds.length; });
    var parent = {};
    records.forEach(function (pipeline) { parent[pipeline.index] = pipeline.index; });
    function find(index) {
      while (parent[index] !== index) {
        parent[index] = parent[parent[index]];
        index = parent[index];
      }
      return index;
    }
    function unite(left, right) {
      var leftRoot = find(left), rightRoot = find(right);
      if (leftRoot === rightRoot) return;
      if (leftRoot < rightRoot) parent[rightRoot] = leftRoot;
      else parent[leftRoot] = rightRoot;
    }
    var ownerByFunction = {};
    records.forEach(function (pipeline) {
      pipeline.functionIds.forEach(function (id) {
        if (ownerByFunction[id] !== undefined) unite(pipeline.index, ownerByFunction[id]);
        else ownerByFunction[id] = pipeline.index;
      });
    });
    var grouped = {};
    records.forEach(function (pipeline) {
      var root = find(pipeline.index);
      (grouped[root] = grouped[root] || []).push(pipeline);
    });
    return Object.keys(grouped).map(Number).sort(function (left, right) {
      return left - right;
    }).map(function (root, familyIndex) {
      var pipelines = grouped[root].slice().sort(function (left, right) {
        return left.index - right.index;
      });
      var itemSet = {}, roots = [];
      pipelines.forEach(function (pipeline) {
        pipeline.functionIds.forEach(function (id) { itemSet[id] = true; });
        if (active[pipeline.root] && roots.indexOf(pipeline.root) < 0) roots.push(pipeline.root);
      });
      roots.sort();
      var label = pipelines[0].title;
      if (roots.length > 1) {
        var additionalRoots = roots.length - 1;
        label += " + " + additionalRoots + (additionalRoots === 1 ? " entry root" : " entry roots");
      }
      return {
        id: "pipeline-family-" + familyIndex,
        label: label,
        itemIds: Object.keys(itemSet).sort(),
        anchorId: roots[0] || Object.keys(itemSet).sort()[0],
        rootIds: roots,
        pipelineCount: pipelines.length,
      };
    }).sort(function (left, right) {
      return right.itemIds.length - left.itemIds.length || left.label.localeCompare(right.label);
    });
  }

  function moduleGraph(node) {
    var activeIds = activeFunctionIds(node);
    var ids = setOf(activeIds);
    var items = activeIds.map(fnItem);
    var edges = model.edges.filter(function (e) { return ids[e.source] && ids[e.target]; })
      .map(function (e) {
        var key = e.source + ">" + e.target;
        return {
          source: e.source,
          target: e.target,
          pathIndex: callPathIndexByEdge[key],
          pathId: callPathIdByEdge[key],
          weight: 1,
        };
      });
    return { items: items, edges: edges, kind: "function" };
  }

  function objectGraph(node) {
    if (node.type !== "module") return objectRelationshipGraph(node);

    var activeIds = activeFunctionIds(node);
    var active = setOf(activeIds);
    var claimed = {};
    var groups = scopeObjects(node).map(function (object) {
      var itemIds = objectMethodIds(object).filter(function (id) { return active[id]; });
      var constructorId = object.constructor && object.constructor.method_id;
      itemIds.forEach(function (id) { claimed[id] = object.id; });
      return {
        id: object.id,
        object: object,
        label: object.name,
        itemIds: itemIds,
        anchorId: itemIds.indexOf(constructorId) >= 0 ? constructorId : null,
      };
    });
    var items = activeIds.map(function (id) {
      var item = fnItem(id);
      item.objectId = claimed[id] || null;
      item.isConstructor = !!item.objectId && groups.some(function (methodGroup) {
        return methodGroup.id === item.objectId && methodGroup.anchorId === id;
      });
      return item;
    });
    var edges = model.edges.filter(function (edgeInfo) {
      return active[edgeInfo.source] && active[edgeInfo.target];
    }).map(function (edgeInfo) {
      return {
        source: edgeInfo.source,
        target: edgeInfo.target,
        pathIndex: callPathIndexByEdge[edgeInfo.source + ">" + edgeInfo.target],
        pathId: callPathIdByEdge[edgeInfo.source + ">" + edgeInfo.target],
        weight: 1,
      };
    }).sort(compareEdges);
    return {
      items: items,
      edges: edges,
      groups: groups,
      freeItemIds: activeIds.filter(function (id) { return !claimed[id]; }),
      kind: "object-overview",
    };
  }

  function objectRelationshipGraph(node) {
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
      return {
        source: edgeInfo.source,
        target: edgeInfo.target,
        pathIndex: callPathIndexByEdge[edgeInfo.source + ">" + edgeInfo.target],
        pathId: callPathIdByEdge[edgeInfo.source + ">" + edgeInfo.target],
        weight: 1,
      };
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
    var items = methodIds.map(function (id) {
      var item = fnItem(id);
      item.isConstructor = id === constructorId;
      return item;
    });
    return {
      items: items,
      edges: callEdges,
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

  function compareEdges(left, right) {
    return left.source.localeCompare(right.source) ||
      left.target.localeCompare(right.target) ||
      (left.pathIndex || 0) - (right.pathIndex || 0) ||
      (left.pathId === undefined ? -1 : left.pathId) - (right.pathId === undefined ? -1 : right.pathId) ||
      String(left.sourceFunction || "").localeCompare(String(right.sourceFunction || "")) ||
      String(left.targetFunction || "").localeCompare(String(right.targetFunction || ""));
  }

  function compareRouteEdges(left, right) {
    return (left.pathIndex === undefined ? 0 : left.pathIndex) -
      (right.pathIndex === undefined ? 0 : right.pathIndex) ||
      (left.pathId === undefined ? -1 : left.pathId) -
      (right.pathId === undefined ? -1 : right.pathId) ||
      compareEdges(left, right);
  }

  // Each path is one maximal, non-branching chain of resolved calls. Branches
  // start new paths; pure cycles are assigned deterministically. The first five
  // tab10 colours repeat, while path identity remains unique for routing.
  function buildCallPaths(edges) {
    var orderedEdges = edges.slice().sort(compareEdges);
    var incoming = {}, outgoing = {};
    orderedEdges.forEach(function (edgeInfo) {
      (incoming[edgeInfo.target] = incoming[edgeInfo.target] || []).push(edgeInfo);
      (outgoing[edgeInfo.source] = outgoing[edgeInfo.source] || []).push(edgeInfo);
    });
    Object.keys(incoming).forEach(function (id) { incoming[id].sort(compareEdges); });
    Object.keys(outgoing).forEach(function (id) { outgoing[id].sort(compareEdges); });

    var assigned = {}, paths = [];
    function edgeKey(edgeInfo) { return edgeInfo.source + ">" + edgeInfo.target; }
    function collectPath(firstEdge) {
      var path = [];
      var edgeInfo = firstEdge;
      while (edgeInfo && !assigned[edgeKey(edgeInfo)]) {
        var key = edgeKey(edgeInfo);
        assigned[key] = true;
        path.push(key);
        var target = edgeInfo.target;
        edgeInfo = (incoming[target] || []).length === 1 && (outgoing[target] || []).length === 1
          ? outgoing[target][0]
          : null;
      }
      if (path.length) paths.push(path);
    }

    orderedEdges.forEach(function (edgeInfo) {
      var source = edgeInfo.source;
      if ((incoming[source] || []).length !== 1 || (outgoing[source] || []).length !== 1) collectPath(edgeInfo);
    });
    orderedEdges.forEach(function (edgeInfo) { collectPath(edgeInfo); });
    paths.sort(function (left, right) { return left[0].localeCompare(right[0]); });

    var colorByEdge = {}, idByEdge = {};
    paths.forEach(function (path, index) {
      path.forEach(function (key) {
        colorByEdge[key] = index % 5;
        idByEdge[key] = index;
      });
    });
    return { colorByEdge: colorByEdge, idByEdge: idByEdge, count: paths.length };
  }

  function traceGraph(startId, endId) {
    return applyTrace(baseGraph(), startId, endId);
  }

  // Tracing is an emphasis layer over the scoped graph. Keeping the base
  // graph intact preserves unrelated and orphaned functions while the static
  // route remains unmistakable.
  function applyTrace(graph, startId, endId) {
    if (graph.kind === "global") return applyGlobalTrace(graph, startId, endId);
    if (graph.kind !== "function" && graph.kind !== "object-overview" && graph.kind !== "pipeline-overview") return graph;
    var route = endId
      ? core.shortestDirectedPath(model.edges, startId, endId, state.disabled)
      : null;
    var tracedIds = endId
      ? route || [startId, endId]
      : [startId]
        .concat((inAdj[startId] || []).filter(activeTraceFunction))
        .concat((outAdj[startId] || []).filter(activeTraceFunction));
    tracedIds = tracedIds.filter(function (id, index) { return tracedIds.indexOf(id) === index; });

    var traceEdges = {};
    if (route) {
      for (var index = 0; index < route.length - 1; index += 1) {
        traceEdges[route[index] + ">" + route[index + 1]] = true;
      }
    } else if (!endId) {
      (inAdj[startId] || []).forEach(function (source) { traceEdges[source + ">" + startId] = true; });
      (outAdj[startId] || []).forEach(function (target) { traceEdges[startId + ">" + target] = true; });
    }

    graph.edges = graph.edges.map(function (edgeInfo) {
      var copy = Object.assign({}, edgeInfo);
      var key = copy.source + ">" + copy.target;
      copy.inTrace = !!traceEdges[key];
      return copy;
    });

    graph.items.forEach(function (item) {
      item.traceOrder = route ? route.indexOf(item.id) : null;
      if (item.id === startId) item.traceRole = "start";
      else if (item.id === endId) item.traceRole = "end";
      else if (tracedIds.indexOf(item.id) >= 0) item.traceRole = "route";
    });
    graph.center = startId;
    graph.traceActive = true;
    graph.traceStart = startId;
    graph.traceEnd = endId;
    graph.route = route;
    graph.noRoute = !!endId && !route;
    return graph;
  }

  function applyGlobalTrace(graph, startId, endId) {
    var route = endId
      ? core.shortestDirectedPath(model.edges, startId, endId, state.disabled)
      : null;
    var tracedIds = endId
      ? route || [startId, endId]
      : [startId]
        .concat((inAdj[startId] || []).filter(activeTraceFunction))
        .concat((outAdj[startId] || []).filter(activeTraceFunction));
    tracedIds = tracedIds.filter(function (id, index) { return tracedIds.indexOf(id) === index; });
    var traced = setOf(tracedIds);
    var traceEdges = {};
    if (route) {
      for (var index = 0; index < route.length - 1; index += 1) {
        traceEdges[route[index] + ">" + route[index + 1]] = true;
      }
    } else if (!endId) {
      (inAdj[startId] || []).forEach(function (source) { traceEdges[source + ">" + startId] = true; });
      (outAdj[startId] || []).forEach(function (target) { traceEdges[startId + ">" + target] = true; });
    }
    graph.edges = graph.edges.map(function (edgeInfo) {
      var copy = Object.assign({}, edgeInfo);
      copy.inTrace = !!traceEdges[copy.sourceFunction + ">" + copy.targetFunction];
      return copy;
    });
    graph.items.forEach(function (item) {
      item.card.traceFunctionIds = traced;
      item.traceFile = item.card.rows.some(function (row) { return traced[row.id]; });
    });
    graph.traceActive = true;
    graph.traceStart = startId;
    graph.traceEnd = endId;
    graph.route = route;
    graph.noRoute = !!endId && !route;
    return graph;
  }

  function activeTraceFunction(id) {
    return !!nodeById[id] && !state.disabled[id];
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

  function globalFileItem(modulePath, functionIds) {
    var moduleNode = treeByPath[modulePath];
    var item = { id: modulePath, kind: "file", node: moduleNode, label: moduleNode.name };
    item.card = globalFileCardLayout(moduleNode, functionIds);
    item.isExample = !!exampleModules[modulePath];
    item.isOrchestrator = !!orchestratorModules[modulePath];
    item.importedFunctionCount = orchestratorModules[modulePath] || 0;
    return item;
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
    return { rows: rows, rowY: rowY, width: width, height: y + 6, chars: Math.floor((width - 30) / 6.3) };
  }

  function globalFileCardLayout(moduleNode, functionIds) {
    var rows = functionIds.map(function (id) { return nodeById[id]; }).sort(function (left, right) {
      return left.line_start - right.line_start || left.name.localeCompare(right.name);
    }).map(function (node, index) {
      var name = node.kind === "method" ? node.id.slice(node.module.length + 1) : node.name;
      return { id: node.id, name: name, y: 58 + index * 18 };
    });
    var rowY = {};
    rows.forEach(function (row) { rowY[row.id] = row.y - 4; });
    var longest = moduleNode.name.length + 10;
    rows.forEach(function (row) { longest = Math.max(longest, row.name.length); });
    var width = Math.min(310, Math.max(200, 42 + longest * 6.3));
    return {
      rows: rows,
      rowY: rowY,
      width: width,
      height: 58 + rows.length * 18 + 10,
      chars: Math.floor((width - 32) / 6.3),
      global: true,
    };
  }

  // --- layered layout (presentation only) ---------------------------------

  function layout(graph) {
    if (graph.kind === "global") {
      layoutGlobalGraph(graph);
      return;
    }
    if (graph.kind === "pipeline-overview") {
      layoutObjectOverviewGraph(graph);
      assignEdgeRoutes(graph);
      return;
    }
    if (graph.kind === "object-overview") {
      layoutObjectOverviewGraph(graph);
      assignEdgeRoutes(graph);
      return;
    }
    if (graph.kind === "object-method") {
      layoutObjectMethodGraph(graph);
      assignEdgeRoutes(graph);
      return;
    }
    if (graph.kind === "trace") {
      layoutTraceGraph(graph);
      return;
    }
    var items = graph.items;
    if (!items.length) return;
    var byId = {};
    items.forEach(function (it) {
      it.w = nodeWidth(it);
      it.h = nodeHeight(it);
      byId[it.id] = it;
    });
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
      var total = row.reduce(function (sum, it) { return sum + it.w; }, 0) + (row.length - 1) * 58;
      var rowHeight = row.reduce(function (max, it) { return Math.max(max, it.h || NODE_H); }, NODE_H);
      var x = -total / 2;
      row.forEach(function (it) {
        it.cx = x + it.w / 2;
        it.cy = y + (it.h || NODE_H) / 2;
        x += it.w + 58;
      });
      y += rowHeight + 92;
    });
    assignEdgeRoutes(graph);
  }

  function assignEdgeRoutes(graph) {
    if (!graph.items.length) return;
    var byId = {};
    graph.items.forEach(function (item) { byId[item.id] = item; });
    var minX = Math.min.apply(null, graph.items.map(function (item) { return item.cx - item.w / 2; }));
    var maxX = Math.max.apply(null, graph.items.map(function (item) { return item.cx + item.w / 2; }));
    (graph.groups || []).forEach(function (groupInfo) {
      if (groupInfo.left === undefined || groupInfo.width === undefined) return;
      minX = Math.min(minX, groupInfo.left);
      maxX = Math.max(maxX, groupInfo.left + groupInfo.width);
    });
    var corridors = {}, outer = [];
    graph.edges.forEach(function (edgeInfo) {
      var source = byId[edgeInfo.source], target = byId[edgeInfo.target];
      if (!source || !target) return;
      if (graph.kind === "pipeline-overview") {
        outer.push(edgeInfo);
        return;
      }
      var sameZone = (source.objectId || "outside") === (target.objectId || "outside");
      if (sameZone && target.layer === source.layer + 1) {
        var key = (source.objectId || "outside") + ":" + source.layer + ">" + target.layer;
        (corridors[key] = corridors[key] || []).push(edgeInfo);
      } else {
        outer.push(edgeInfo);
      }
    });
    Object.keys(corridors).forEach(function (key) {
      var edges = corridors[key].sort(compareRouteEdges);
      var routedEdges = edges.slice(0, 12);
      var offsets = coloredLaneOffsets(routedEdges, 5, 5);
      edges.forEach(function (edgeInfo, index) {
        if (index >= 12) {
          outer.push(edgeInfo);
          return;
        }
        var source = byId[edgeInfo.source], target = byId[edgeInfo.target];
        var sourceBottom = source.cy + source.h / 2;
        var targetTop = target.cy - target.h / 2;
        edgeInfo.route = "corridor";
        edgeInfo.routeY = (sourceBottom + targetTop) / 2 + offsets[index];
      });
    });
    var outerLaneState = {
      "-1": { distance: 0, color: null, count: 0 },
      "1": { distance: 0, color: null, count: 0 },
    };
    outer.sort(compareRouteEdges).forEach(function (edgeInfo) {
      edgeInfo.route = "outer";
      edgeInfo.routeSide = (edgeInfo.pathIndex || 0) % 2 ? -1 : 1;
      var laneState = outerLaneState[String(edgeInfo.routeSide)];
      if (laneState.count && laneState.color !== edgeInfo.pathIndex) laneState.distance += 8;
      var distance = laneState.distance;
      laneState.distance += 13;
      laneState.color = edgeInfo.pathIndex;
      laneState.count += 1;
      edgeInfo.routeX = edgeInfo.routeSide > 0
        ? maxX + 54 + distance
        : minX - 54 - distance;
    });
    graph.routeLeft = outer.reduce(function (left, edgeInfo) { return Math.min(left, edgeInfo.routeX); }, minX);
    graph.routeRight = outer.reduce(function (right, edgeInfo) { return Math.max(right, edgeInfo.routeX); }, maxX);
    assignFunctionEdgePorts(graph.edges);
  }

  function layoutGlobalGraph(graph) {
    var byId = {};
    graph.items.forEach(function (item) {
      item.w = nodeWidth(item);
      item.h = nodeHeight(item);
      byId[item.id] = item;
    });
    if (!graph.items.length) return;

    var outgoing = {}, incoming = {};
    graph.items.forEach(function (item) {
      outgoing[item.id] = {};
      incoming[item.id] = {};
    });
    graph.edges.forEach(function (edgeInfo) {
      if (!byId[edgeInfo.source] || !byId[edgeInfo.target] || edgeInfo.source === edgeInfo.target) return;
      if (outgoing[edgeInfo.source][edgeInfo.target]) return;
      outgoing[edgeInfo.source][edgeInfo.target] = true;
      incoming[edgeInfo.target][edgeInfo.source] = true;
    });
    var connectedIds = Object.keys(byId).filter(function (id) {
      return Object.keys(outgoing[id]).length || Object.keys(incoming[id]).length;
    }).sort();
    var disconnectedIds = Object.keys(byId).filter(function (id) {
      return !Object.keys(outgoing[id]).length && !Object.keys(incoming[id]).length;
    }).sort();

    var visited = {}, finishOrder = [];
    function visitForward(id) {
      if (visited[id]) return;
      visited[id] = true;
      Object.keys(outgoing[id]).sort().forEach(visitForward);
      finishOrder.push(id);
    }
    connectedIds.forEach(visitForward);

    var componentById = {}, components = [];
    function visitReverse(id, component) {
      if (componentById[id] !== undefined) return;
      componentById[id] = components.length;
      component.push(id);
      Object.keys(incoming[id]).sort().forEach(function (source) { visitReverse(source, component); });
    }
    finishOrder.reverse().forEach(function (id) {
      if (componentById[id] !== undefined) return;
      var component = [];
      visitReverse(id, component);
      component.sort();
      components.push(component);
    });

    var componentOutgoing = {}, componentIncoming = {}, remainingComponents = {};
    components.forEach(function (_, index) {
      componentOutgoing[index] = {};
      componentIncoming[index] = 0;
      remainingComponents[index] = true;
    });
    graph.edges.forEach(function (edgeInfo) {
      var sourceComponent = componentById[edgeInfo.source];
      var targetComponent = componentById[edgeInfo.target];
      if (sourceComponent === targetComponent || componentOutgoing[sourceComponent][targetComponent]) return;
      componentOutgoing[sourceComponent][targetComponent] = true;
      componentIncoming[targetComponent] += 1;
    });

    var layers = [];
    while (Object.keys(remainingComponents).length) {
      var readyComponents = Object.keys(remainingComponents).map(Number).filter(function (index) {
        return componentIncoming[index] === 0;
      }).sort(function (left, right) {
        return components[left][0].localeCompare(components[right][0]);
      });
      var layerIds = [];
      readyComponents.forEach(function (componentIndex) {
        layerIds = layerIds.concat(components[componentIndex]);
        delete remainingComponents[componentIndex];
        Object.keys(componentOutgoing[componentIndex]).forEach(function (target) {
          if (remainingComponents[target]) componentIncoming[target] -= 1;
        });
      });
      layers.push(layerIds);
    }
    if (disconnectedIds.length) layers.push(disconnectedIds);

    var layerById = {}, order = {};
    layers.forEach(function (ids, layerIndex) {
      ids.forEach(function (id, index) {
        layerById[id] = layerIndex;
        order[id] = index;
      });
    });
    function reorderLayer(layerIndex, neighborMap) {
      layers[layerIndex] = layers[layerIndex].map(function (id, index) {
        var neighbors = Object.keys(neighborMap[id] || {}).filter(function (neighbor) {
          return order[neighbor] !== undefined;
        });
        var average = neighbors.length
          ? neighbors.reduce(function (sum, neighbor) { return sum + order[neighbor]; }, 0) / neighbors.length
          : index;
        return { id: id, average: average, index: index };
      }).sort(function (left, right) {
        return left.average - right.average || left.index - right.index || left.id.localeCompare(right.id);
      }).map(function (entry) { return entry.id; });
      layers[layerIndex].forEach(function (id, index) { order[id] = index; });
    }
    for (var pass = 0; pass < 4; pass += 1) {
      for (var forward = 1; forward < layers.length; forward += 1) reorderLayer(forward, incoming);
      for (var backward = layers.length - 2; backward >= 0; backward -= 1) reorderLayer(backward, outgoing);
    }

    var corridorLaneKeys = {};
    graph.edges.forEach(function (edgeInfo) {
      var sourceLayer = layerById[edgeInfo.source], targetLayer = layerById[edgeInfo.target];
      if (targetLayer !== sourceLayer + 1) return;
      var boundary = sourceLayer + ">" + targetLayer;
      var laneKey = edgeInfo.pathId + "|" + edgeInfo.sourceFunction + ">" + edgeInfo.targetFunction;
      (corridorLaneKeys[boundary] = corridorLaneKeys[boundary] || {})[laneKey] = edgeInfo;
    });
    var x = 0;
    graph.layerBounds = [];
    layers.forEach(function (ids, layerIndex) {
      var items = ids.map(function (id) { return byId[id]; });
      var layerWidth = items.reduce(function (width, item) { return Math.max(width, item.w); }, 200);
      var totalHeight = items.reduce(function (height, item) { return height + item.h; }, 0) + (items.length - 1) * 54;
      var y = -totalHeight / 2;
      items.forEach(function (item) {
        item.layer = layerIndex;
        item.cx = x + layerWidth / 2;
        item.cy = y + item.h / 2;
        y += item.h + 54;
      });
      graph.layerBounds.push({
        left: x,
        right: x + layerWidth,
        top: -totalHeight / 2,
        bottom: totalHeight / 2,
      });
      var boundary = layerIndex + ">" + (layerIndex + 1);
      var laneEdges = Object.keys(corridorLaneKeys[boundary] || {}).map(function (key) {
        return corridorLaneKeys[boundary][key];
      }).sort(compareRouteEdges);
      var laneOffsets = coloredLaneOffsets(laneEdges, 12, 8);
      var laneSpan = laneOffsets.length > 1 ? laneOffsets[laneOffsets.length - 1] - laneOffsets[0] : 0;
      x += layerWidth + Math.max(220, laneSpan + 108);
    });

    var adjacent = {}, outer = [];
    graph.edges.forEach(function (edgeInfo) {
      var sourceLayer = layerById[edgeInfo.source], targetLayer = layerById[edgeInfo.target];
      if (targetLayer === sourceLayer + 1) {
        var key = sourceLayer + ">" + targetLayer;
        var laneKey = edgeInfo.pathId + "|" + edgeInfo.sourceFunction + ">" + edgeInfo.targetFunction;
        var lanes = adjacent[key] = adjacent[key] || {};
        (lanes[laneKey] = lanes[laneKey] || []).push(edgeInfo);
      } else {
        outer.push(edgeInfo);
      }
    });
    Object.keys(adjacent).forEach(function (key) {
      var lanes = adjacent[key];
      var laneKeys = Object.keys(lanes).sort(function (left, right) {
        return compareRouteEdges(lanes[left][0], lanes[right][0]);
      });
      var firstEdge = lanes[laneKeys[0]][0];
      var sourceLayer = layerById[firstEdge.source];
      var left = graph.layerBounds[sourceLayer].right;
      var right = graph.layerBounds[sourceLayer + 1].left;
      var laneEdges = laneKeys.map(function (laneKey) { return lanes[laneKey][0]; });
      var laneOffsets = coloredLaneOffsets(laneEdges, 12, 8);
      laneKeys.forEach(function (laneKey, index) {
        var routeX = (left + right) / 2 + laneOffsets[index];
        lanes[laneKey].forEach(function (edgeInfo) {
          edgeInfo.route = "corridor";
          edgeInfo.routeX = routeX;
        });
      });
    });
    var graphTop = Math.min.apply(null, graph.layerBounds.map(function (bounds) { return bounds.top; }));
    var outerLanes = {};
    outer.forEach(function (edgeInfo) {
      var key = edgeInfo.pathId + "|" + edgeInfo.sourceFunction + ">" + edgeInfo.targetFunction;
      (outerLanes[key] = outerLanes[key] || []).push(edgeInfo);
    });
    var outerLaneKeys = Object.keys(outerLanes).sort(function (left, right) {
      return compareRouteEdges(outerLanes[left][0], outerLanes[right][0]);
    });
    var outerLaneEdges = outerLaneKeys.map(function (key) { return outerLanes[key][0]; });
    var outerLaneOffsets = coloredLaneOffsets(outerLaneEdges, 11, 8);
    var outerLaneStart = outerLaneOffsets.length ? outerLaneOffsets[0] : 0;
    outerLaneKeys.forEach(function (key, index) {
      outerLanes[key].forEach(function (edgeInfo) {
        edgeInfo.route = "outer";
        edgeInfo.routeY = graphTop - 48 - (outerLaneOffsets[index] - outerLaneStart);
      });
    });
    graph.routeTop = outerLaneKeys.length
      ? graphTop - 48 - (outerLaneOffsets[outerLaneOffsets.length - 1] - outerLaneStart)
      : graphTop;
    assignGlobalEdgePorts(graph, byId);
  }

  function assignFunctionEdgePorts(edges) {
    var sourceGroups = {}, targetGroups = {};
    edges.forEach(function (edgeInfo) {
      (sourceGroups[edgeInfo.source] = sourceGroups[edgeInfo.source] || []).push(edgeInfo);
      (targetGroups[edgeInfo.target] = targetGroups[edgeInfo.target] || []).push(edgeInfo);
    });
    assignPortOffsets(sourceGroups, "sourcePortOffset", 22);
    assignPortOffsets(targetGroups, "targetPortOffset", 22);
  }

  function assignGlobalEdgePorts(graph, byId) {
    var sourcePorts = {}, targetPorts = {}, sourceRails = {}, targetRails = {};
    graph.routeLeft = Infinity;
    graph.routeRight = -Infinity;
    graph.edges.forEach(function (edgeInfo) {
      var source = byId[edgeInfo.source], target = byId[edgeInfo.target];
      var sourceSide = target.cx >= source.cx ? 1 : -1;
      var targetSide = -sourceSide;
      edgeInfo.sourceSide = sourceSide;
      edgeInfo.targetSide = targetSide;
      (sourcePorts[edgeInfo.sourceFunction + "|" + sourceSide] =
        sourcePorts[edgeInfo.sourceFunction + "|" + sourceSide] || []).push(edgeInfo);
      (targetPorts[edgeInfo.targetFunction + "|" + targetSide] =
        targetPorts[edgeInfo.targetFunction + "|" + targetSide] || []).push(edgeInfo);
      if (edgeInfo.route !== "outer") return;
      (sourceRails[edgeInfo.source + "|" + sourceSide] =
        sourceRails[edgeInfo.source + "|" + sourceSide] || []).push(edgeInfo);
      (targetRails[edgeInfo.target + "|" + targetSide] =
        targetRails[edgeInfo.target + "|" + targetSide] || []).push(edgeInfo);
    });
    assignPortOffsets(sourcePorts, "sourcePortOffset", 10);
    assignPortOffsets(targetPorts, "targetPortOffset", 10);
    assignRailOffsets(sourceRails, "sourceRailOffset");
    assignRailOffsets(targetRails, "targetRailOffset");
    graph.edges.forEach(function (edgeInfo) {
      if (edgeInfo.route !== "outer") return;
      var sourceBounds = graph.layerBounds[byId[edgeInfo.source].layer];
      var targetBounds = graph.layerBounds[byId[edgeInfo.target].layer];
      var sourceRail = edgeInfo.sourceSide > 0
        ? sourceBounds.right + 28 + edgeInfo.sourceRailOffset
        : sourceBounds.left - 28 - edgeInfo.sourceRailOffset;
      var targetRail = edgeInfo.targetSide > 0
        ? targetBounds.right + 28 + edgeInfo.targetRailOffset
        : targetBounds.left - 28 - edgeInfo.targetRailOffset;
      graph.routeLeft = Math.min(graph.routeLeft, sourceRail, targetRail);
      graph.routeRight = Math.max(graph.routeRight, sourceRail, targetRail);
    });
  }

  function assignPortOffsets(groups, property, span) {
    Object.keys(groups).forEach(function (key) {
      var edges = groups[key].sort(compareRouteEdges);
      var gap = edges.length > 1 ? Math.min(4, span / (edges.length - 1)) : 0;
      edges.forEach(function (edgeInfo, index) {
        edgeInfo[property] = (index - (edges.length - 1) / 2) * gap;
      });
    });
  }

  function coloredLaneOffsets(edges, spacing, colorGap) {
    if (!edges.length) return [];
    var offsets = [0];
    for (var index = 1; index < edges.length; index += 1) {
      var gap = spacing;
      if (edges[index - 1].pathIndex !== edges[index].pathIndex) gap += colorGap;
      offsets.push(offsets[index - 1] + gap);
    }
    var center = (offsets[0] + offsets[offsets.length - 1]) / 2;
    return offsets.map(function (offset) { return offset - center; });
  }

  function assignRailOffsets(groups, property) {
    Object.keys(groups).forEach(function (key) {
      groups[key].sort(compareRouteEdges).forEach(function (edgeInfo, index) {
        edgeInfo[property] = index * 7;
      });
    });
  }

  function layoutObjectOverviewGraph(graph) {
    var itemsById = {};
    graph.items.forEach(function (item) {
      item.w = nodeWidth(item);
      item.h = nodeHeight(item);
      itemsById[item.id] = item;
    });

    var available = graph.kind === "pipeline-overview"
      ? Math.min(3600, Math.max(1600, Math.ceil(Math.sqrt(graph.items.length)) * 210))
      : 1200;
    var groupGap = 28;
    graph.groups.forEach(function (methodGroup) {
      var groupItems = methodGroup.itemIds.map(function (id) { return itemsById[id]; }).filter(Boolean);
      methodGroup.items = groupItems;
      if (!groupItems.length) {
        methodGroup.width = Math.min(320, available);
        methodGroup.height = 92;
        return;
      }

      var maxWidth = groupItems.reduce(function (width, item) { return Math.max(width, item.w); }, 164);
      var innerColumns = groupItems.length > 3 && available >= 760 ? 2 : 1;
      var maxGroupWidth = Math.max(280, Math.min(620, available));
      if (graph.kind === "pipeline-overview") {
        maxGroupWidth = Math.min(1100, available);
        innerColumns = Math.max(1, Math.min(4, Math.floor((maxGroupWidth - 40) / (maxWidth + 22))));
      }
      while (innerColumns > 1 && innerColumns * maxWidth + (innerColumns - 1) * 22 + 40 > maxGroupWidth) {
        innerColumns -= 1;
      }
      var layers = methodGroupLayers(methodGroup, graph.edges);
      var localY = 46;
      layers.forEach(function (layerInfo) {
        var row = layerInfo.ids.map(function (id) { return itemsById[id]; }).filter(Boolean).sort(compareMethodItems);
        for (var start = 0; start < row.length; start += innerColumns) {
          var chunk = row.slice(start, start + innerColumns);
          var contentWidth = chunk.reduce(function (sum, item) { return sum + item.w; }, 0) + (chunk.length - 1) * 22;
          var localX = -contentWidth / 2;
          chunk.forEach(function (item) {
            item.localX = localX + item.w / 2;
            item.localY = localY + item.h / 2;
            item.layer = layerInfo.index;
            localX += item.w + 22;
          });
          localY += NODE_H + 30;
        }
      });
      var usedWidth = Math.max.apply(null, groupItems.map(function (item) {
        return Math.abs(item.localX) * 2 + item.w;
      }));
      methodGroup.width = Math.min(available, Math.max(280, usedWidth + 40));
      methodGroup.height = localY + 2;
    });

    var leftEdge = -available / 2;
    graph.leftEdge = leftEdge;
    var cursorX = leftEdge;
    var cursorY = 0;
    var rowHeight = 0;
    graph.groups.forEach(function (methodGroup) {
      if (graph.kind === "pipeline-overview") {
        methodGroup.left = -methodGroup.width / 2;
        methodGroup.top = cursorY;
        methodGroup.bottom = cursorY + methodGroup.height;
        methodGroup.headerY = cursorY + 25;
        methodGroup.items.forEach(function (item) {
          item.cx = item.localX;
          item.cy = cursorY + item.localY;
        });
        cursorY = methodGroup.bottom + groupGap;
        return;
      }
      if (cursorX > leftEdge && cursorX + methodGroup.width > available / 2) {
        cursorX = leftEdge;
        cursorY += rowHeight + groupGap;
        rowHeight = 0;
      }
      methodGroup.left = cursorX;
      methodGroup.top = cursorY;
      methodGroup.bottom = cursorY + methodGroup.height;
      methodGroup.headerY = cursorY + 25;
      methodGroup.items.forEach(function (item) {
        item.cx = cursorX + methodGroup.width / 2 + item.localX;
        item.cy = cursorY + item.localY;
      });
      cursorX += methodGroup.width + groupGap;
      rowHeight = Math.max(rowHeight, methodGroup.height);
    });

    var freeItems = graph.freeItemIds.map(function (id) { return itemsById[id]; }).filter(Boolean).sort(compareMethodItems);
    graph.freeTop = graph.groups.length
      ? graph.kind === "pipeline-overview" ? cursorY + 30 : cursorY + rowHeight + 58
      : 18;
    graph.freeHeaderY = graph.freeTop;
    var freeY = graph.freeTop + 30;
    var maxFreeWidth = freeItems.reduce(function (width, item) { return Math.max(width, item.w); }, 164);
    var maximumFreeColumns = graph.kind === "pipeline-overview" ? 12 : 4;
    var freeColumns = Math.max(1, Math.min(maximumFreeColumns, Math.floor((available + 28) / (maxFreeWidth + 28))));
    for (var freeStart = 0; freeStart < freeItems.length; freeStart += freeColumns) {
      var freeRow = freeItems.slice(freeStart, freeStart + freeColumns);
      var freeWidth = freeRow.reduce(function (sum, item) { return sum + item.w; }, 0) + (freeRow.length - 1) * 28;
      var freeX = -freeWidth / 2;
      freeRow.forEach(function (item) {
        item.cx = freeX + item.w / 2;
        item.cy = freeY + item.h / 2;
        item.layer = Math.floor(freeStart / freeColumns);
        freeX += item.w + 28;
      });
      freeY += NODE_H + 34;
    }
    graph.freeBottom = freeItems.length ? freeY - 34 : graph.freeTop;
  }

  function layoutObjectMethodGraph(graph) {
    var itemsById = {};
    graph.items.forEach(function (item) {
      item.w = nodeWidth(item);
      item.h = nodeHeight(item);
      itemsById[item.id] = item;
    });
    if (!graph.items.length) return;

    var available = 1200;
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

  function layoutTraceGraph(graph) {
    graph.items.forEach(function (item) {
      item.w = nodeWidth(item);
      item.h = nodeHeight(item);
    });
    if (!graph.items.length) return;

    var fileOrder = [];
    graph.items.forEach(function (item) {
      var fileId = item.node.file_id;
      if (fileOrder.indexOf(fileId) < 0) fileOrder.push(fileId);
    });
    if (!graph.route) fileOrder.sort();
    var columnByFile = {};
    var visibleColumns = Math.min(3, fileOrder.length);
    fileOrder.forEach(function (fileId, index) {
      columnByFile[fileId] = (index % visibleColumns - (visibleColumns - 1) / 2) * 220;
    });

    if (graph.route) {
      graph.items.forEach(function (item) {
        item.cx = columnByFile[item.node.file_id];
        item.cy = item.traceOrder * 124;
        item.layer = item.traceOrder;
      });
    } else if (graph.noRoute) {
      graph.items.forEach(function (item, index) {
        item.cx = (index - (graph.items.length - 1) / 2) * 280;
        item.cy = 0;
        item.layer = 0;
      });
    } else {
      var callers = graph.items.filter(function (item) {
        return item.id !== graph.traceStart && (inAdj[graph.traceStart] || []).indexOf(item.id) >= 0;
      }).sort(compareMethodItems);
      var callees = graph.items.filter(function (item) {
        return item.id !== graph.traceStart && callers.indexOf(item) < 0;
      }).sort(compareMethodItems);
      var center = graph.items.filter(function (item) { return item.id === graph.traceStart; })[0];
      center.cx = 0;
      center.cy = 0;
      center.layer = 0;
      layoutTraceTier(callers, -1);
      layoutTraceTier(callees, 1);
    }
    traceCompartments(graph, fileOrder);
  }

  function layoutTraceTier(items, direction) {
    items.forEach(function (item, index) {
      item.cx = (index % 2 ? 1 : -1) * 128;
      item.cy = direction * (142 + Math.floor(index / 2) * 104);
      item.layer = direction;
    });
  }

  function traceCompartments(graph, fileOrder) {
    graph.compartments = fileOrder.map(function (fileId) {
      var items = graph.items.filter(function (item) { return item.node.file_id === fileId; });
      var left = Math.min.apply(null, items.map(function (item) { return item.cx - item.w / 2; })) - 22;
      var right = Math.max.apply(null, items.map(function (item) { return item.cx + item.w / 2; })) + 22;
      var top = Math.min.apply(null, items.map(function (item) { return item.cy - item.h / 2; })) - 54;
      var bottom = Math.max.apply(null, items.map(function (item) { return item.cy + item.h / 2; })) + 24;
      return { fileId: fileId, left: left, top: top, width: right - left, height: bottom - top };
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
    return left.node.module.localeCompare(right.node.module) ||
      left.node.line_start - right.node.line_start ||
      left.label.localeCompare(right.label);
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
    renderTraceDock();
    if (isReviewWorkspace(state.workspace)) {
      renderTabContent();
      return;
    }
    showGraph();
    renderCrumbs();
    renderTools();
    var graph = currentGraph();
    var topologyKey = graphTopologyKey(graph);
    var topologyChanged = topologyKey !== lastTopologyKey;
    layout(graph);
    if (topologyChanged) fitView(graph);
    draw(graph);
    lastTopologyKey = topologyKey;
    syncZoomReadout();
  }

  function graphTopologyKey(graph) {
    return [
      state.scope,
      state.mode,
      state.globalView,
      graph.kind,
      graph.items.map(function (item) { return item.id; }).sort().join(","),
      graph.edges.map(function (edgeInfo) {
        return (edgeInfo.sourceFunction || edgeInfo.source) + ">" + (edgeInfo.targetFunction || edgeInfo.target);
      }).sort().join(","),
    ].join("|");
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

    // Selection is expressed with rings and path weight. The rest of the
    // system stays fully legible instead of fading into the background.
    var lit = null;
    var center = graph.center || null;
    var groupLayer = el("g"), edgeLayer = el("g"), nodeLayer = el("g");
    root.appendChild(groupLayer); root.appendChild(edgeLayer); root.appendChild(nodeLayer);
    if (graph.kind === "object-overview") drawObjectOverviewGroups(groupLayer, graph);
    if (graph.kind === "pipeline-overview") drawPipelineOverviewGroups(groupLayer, graph);
    if (graph.kind === "object-method") drawObjectMethodGroups(groupLayer, graph);
    if (graph.kind === "trace") drawTraceCompartments(groupLayer, graph);
    var pos = {};
    graph.items.forEach(function (it) { pos[it.id] = it; });

    graph.edges.forEach(function (e) {
      var a = pos[e.source], b = pos[e.target];
      if (!a || !b) return;
      var on = !lit || (lit[e.source] && lit[e.target]);
      if (a.kind === "file" || b.kind === "file") {
        edgeLayer.appendChild(fileEdge(a, b, e, on, graph));
        return;
      }
      var base = "edge path-edge path-" + (e.pathIndex === undefined ? 0 : e.pathIndex);
      if (graph.traceActive || graph.kind === "trace") base += e.inTrace ? " trace-edge" : " trace-context-edge";
      var path = edge(a, b, base + (on ? "" : " muted"), e.weight, e);
      if ((graph.traceActive || graph.kind === "trace") && e.inTrace) bindTraceEdge(path, e);
      else if (graph.kind === "function" || graph.kind === "object-overview" || graph.kind === "pipeline-overview") bindGraphPromptEdge(path, e);
      edgeLayer.appendChild(path);
    });
    graph.items.forEach(function (it) {
      var element;
      if (it.kind === "group") {
        element = groupBox(it, !lit || lit[it.id]);
      } else if (it.kind === "file") {
        element = fileBox(it, !lit || lit[it.id]);
      } else if (it.kind === "object") {
        element = objectBox(it, !lit || lit[it.id]);
      } else {
        element = fnBox(it, !lit || lit[it.id], center);
      }
      nodeLayer.appendChild(element);
    });
  }

  function drawObjectOverviewGroups(layer, graph) {
    graph.groups.forEach(function (methodGroup) {
      var background = rect(methodGroup.width, methodGroup.height, "object-compartment-box");
      background.setAttribute("x", methodGroup.left);
      background.setAttribute("y", methodGroup.top);
      if (state.graphSelectionType === "object" && state.graphSelection === methodGroup.id) {
        background.classList.add("selected");
      }
      layer.appendChild(background);
      var title = text(
        methodGroup.left + 14,
        methodGroup.headerY,
        "object-compartment-title",
        "CLASS / " + truncate(methodGroup.label, Math.max(10, Math.floor((methodGroup.width - 126) / 6.3)))
      );
      title.setAttribute("data-object-focus", methodGroup.id);
      makeSvgButton(title, "Inspect class " + methodGroup.label, function (event) {
        event.stopPropagation();
        selectObject(methodGroup.id);
      });
      layer.appendChild(title);
      var countLabel = methodGroup.itemIds.length + (methodGroup.itemIds.length === 1 ? " METHOD" : " METHODS");
      var count = text(
        methodGroup.left + methodGroup.width - 14,
        methodGroup.headerY,
        "object-compartment-count",
        countLabel
      );
      count.setAttribute("text-anchor", "end");
      layer.appendChild(count);
      if (!methodGroup.itemIds.length) {
        layer.appendChild(text(methodGroup.left + 14, methodGroup.top + 58, "object-compartment-empty", "NO ANALYZED METHODS"));
      }
    });
    if (graph.freeItemIds.length) {
      layer.appendChild(text(graph.leftEdge, graph.freeHeaderY, "outside-functions-title", "OUTSIDE FUNCTIONS / ORPHANS"));
    }
  }

  function drawPipelineOverviewGroups(layer, graph) {
    graph.groups.forEach(function (pipelineGroup, index) {
      var background = rect(pipelineGroup.width, pipelineGroup.height, "pipeline-compartment-box");
      background.setAttribute("x", pipelineGroup.left);
      background.setAttribute("y", pipelineGroup.top);
      layer.appendChild(background);
      layer.appendChild(text(
        pipelineGroup.left + 14,
        pipelineGroup.headerY,
        "pipeline-compartment-title",
        "PIPELINE " + String(index + 1).padStart(2, "0") + " / " +
          truncate(pipelineGroup.label, Math.max(18, Math.floor((pipelineGroup.width - 190) / 6.3)))
      ));
      var count = text(
        pipelineGroup.left + pipelineGroup.width - 14,
        pipelineGroup.headerY,
        "pipeline-compartment-count",
        pipelineGroup.itemIds.length + " FUNCTIONS"
      );
      count.setAttribute("text-anchor", "end");
      layer.appendChild(count);
    });
    if (graph.freeItemIds.length) {
      layer.appendChild(text(
        graph.leftEdge,
        graph.freeHeaderY,
        "outside-functions-title pipeline-outside-title",
        "NOT IN A ROOTED PIPELINE / ORPHANS · " + graph.freeItemIds.length
      ));
    }
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
    var legend = text(graph.groups[0].left, graph.groups[0].top - 14, "method-map-legend", "resolved call paths");
    layer.appendChild(legend);
  }

  function drawTraceCompartments(layer, graph) {
    graph.compartments.forEach(function (compartment, index) {
      var background = rect(compartment.width, compartment.height, "trace-compartment-box");
      background.setAttribute("x", compartment.left);
      background.setAttribute("y", compartment.top);
      layer.appendChild(background);
      layer.appendChild(text(
        compartment.left + 12,
        compartment.top + 19,
        "trace-compartment-index",
        "FILE / " + String(index + 1).padStart(2, "0")
      ));
      layer.appendChild(text(
        compartment.left + 12,
        compartment.top + 37,
        "trace-compartment-title",
        truncate(compartment.fileId, Math.max(18, Math.floor((compartment.width - 24) / 6.3)))
      ));
    });
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

  function fileBox(it, on) {
    var node = it.node, card = it.card;
    var selectedFile = state.graphSelectionType === "file" && state.graphSelection === it.id;
    var g = group("node file-node" + (card.global ? " global-file" : "") +
      (it.isExample ? " example-file" : "") + (it.isOrchestrator ? " orchestrator-file" : "") +
      (it.traceFile ? " trace-file" : "") + (selectedFile ? " selected-file" : "") +
      (on ? "" : " muted"), it.cx - it.w / 2, it.cy - it.h / 2);
    g.setAttribute("role", "group");
    g.setAttribute("aria-label", "Module " + node.path);
    g.appendChild(rect(it.w, it.h, "file-rect"));
    var accent = line(1, 42, 49, 42, "file-accent");
    var fileLabel = (card.global ? "FILE / " : "") + node.name + ".py";
    var moduleLabel = text(10, 18, "node-name", truncate(fileLabel, card.chars));
    moduleLabel.setAttribute("data-scope-focus", node.path);
    makeSvgButton(moduleLabel, "Open module " + node.path, function (event) {
      event.stopPropagation();
      setScope(node.path);
    });
    g.appendChild(moduleLabel);
    var metadata = card.global ? globalFileMeta(it) : groupMeta(node);
    g.appendChild(text(10, 34, "node-meta", truncate(metadata, card.chars + 8)));
    g.appendChild(line(0, 42, it.w, 42, "object-divider"));
    g.appendChild(accent);

    card.rows.forEach(function (row) {
      if (!row.id) {
        g.appendChild(text(10, row.y, "object-more", truncate(row.more, card.chars)));
        return;
      }
      g.appendChild(line(0, row.y - 4, 8, row.y - 4, row.unused ? "file-tick unused" : "file-tick"));
      var rowClass = "file-fn";
      if (card.traceFunctionIds && card.traceFunctionIds[row.id]) rowClass += " trace-function";
      if (state.graphSelectionType === "function" && state.graphSelection === row.id) rowClass += " selected";
      var label = text(12, row.y, rowClass, truncate(row.name, card.chars));
      label.setAttribute("data-function-focus", row.id);
      makeSvgButton(label, "Inspect function " + row.name, function (event) {
        event.stopPropagation();
        selectFunction(row.id);
      });
      g.appendChild(label);
    });

    g.addEventListener("click", function (ev) {
      ev.stopPropagation();
      if (card.global) selectGlobalFile(node.path);
      else setScope(node.path);
    });
    return g;
  }

  function globalFileMeta(item) {
    var labels = [];
    if (item.isExample) labels.push("EXAMPLE · main()");
    if (item.isOrchestrator) labels.push("ORCHESTRATOR · " + item.importedFunctionCount + " imports");
    if (!labels.length) labels.push(item.card.rows.length + " functions");
    return labels.join(" / ");
  }

  // Edge between file cards, anchored at the exact source and target rows and
  // routed as an independently identifiable coloured path.
  function fileEdge(a, b, e, on, graph) {
    var src = e.sourceFunction
      ? functionRowAnchor(a, e.sourceFunction, b.cx >= a.cx ? 1 : -1, e.sourcePortOffset)
      : rowAnchor(a, b, e.srcCounts);
    var tgt = e.targetFunction
      ? functionRowAnchor(b, e.targetFunction, b.cx >= a.cx ? -1 : 1, e.targetPortOffset)
      : rowAnchor(b, a, e.tgtCounts);
    var p = el("path");
    var d;
    if (graph.kind === "global" && src && tgt) {
      d = globalEdgePath(src, tgt, a, b, e, graph);
    } else if (src && tgt && e.route === "corridor") {
      d = "M" + src.x + "," + src.y + " V" + e.routeY + " H" + tgt.x + " V" + tgt.y;
    } else if (src && tgt && e.route === "outer") {
      d = "M" + src.x + "," + src.y + " H" + e.routeX + " V" + tgt.y + " H" + tgt.x;
    } else if (src && tgt) {
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
    var selectedFileEdge = state.graphSelectionType === "file" &&
      (state.graphSelection === e.source || state.graphSelection === e.target);
    var cls = "edge file-edge path-edge path-" + (e.pathIndex === undefined ? 0 : e.pathIndex) + (on ? "" : " muted");
    if (graph.traceActive) cls += e.inTrace ? " trace-edge" : " trace-context-edge";
    if (state.graphSelectionType === "file") cls += selectedFileEdge ? " file-selection-edge" : " trace-context-edge";
    p.setAttribute("class", cls);
    p.setAttribute("data-src", e.source);
    p.setAttribute("data-tgt", e.target);
    p.setAttribute("data-source-function", e.sourceFunction || "");
    p.setAttribute("data-target-function", e.targetFunction || "");
    p.setAttribute("data-path-id", e.pathId === undefined ? "" : e.pathId);
    p.setAttribute("marker-end", "url(#arrow-path-" + (e.pathIndex === undefined ? 0 : e.pathIndex) + ")");
    return p;
  }

  function functionRowAnchor(item, functionId, side, offset) {
    return {
      x: item.cx + side * item.w / 2,
      y: item.cy - item.h / 2 + item.card.rowY[functionId] + (offset || 0),
      side: side,
    };
  }

  function globalEdgePath(source, target, sourceItem, targetItem, edgeInfo, graph) {
    if (edgeInfo.route === "corridor") {
      return "M" + source.x + "," + source.y +
        " H" + edgeInfo.routeX +
        " V" + target.y +
        " H" + target.x;
    }
    var sourceBounds = graph.layerBounds[sourceItem.layer];
    var targetBounds = graph.layerBounds[targetItem.layer];
    var sourceRail = source.side > 0
      ? sourceBounds.right + 28 + (edgeInfo.sourceRailOffset || 0)
      : sourceBounds.left - 28 - (edgeInfo.sourceRailOffset || 0);
    var targetRail = target.side > 0
      ? targetBounds.right + 28 + (edgeInfo.targetRailOffset || 0)
      : targetBounds.left - 28 - (edgeInfo.targetRailOffset || 0);
    return "M" + source.x + "," + source.y +
      " H" + sourceRail +
      " V" + edgeInfo.routeY +
      " H" + targetRail +
      " V" + target.y +
      " H" + target.x;
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
    var traceClass = it.traceRole ? " trace-node trace-" + it.traceRole : "";
    var g = group("node " + statusClass(node) + traceClass + (it.isConstructor ? " method-constructor" : "") + (on ? "" : " muted") + (it.id === center ? " center" : "") + (state.hovered === it.id ? " hover-link" : ""), it.cx - it.w / 2, it.cy - h / 2);
    g.setAttribute("data-function-focus", node.id);
    var r = rect(it.w, h, "");
    if (state.graphSelectionType === "function" && it.id === state.graphSelection) r.classList.add("selected-ring");
    if (state.graphPromptSelection.indexOf(it.id) >= 0) r.classList.add("graph-prompt-selected");
    g.appendChild(r);
    if (it.traceRole === "start" || it.traceRole === "end") {
      g.appendChild(text(0, -9, "trace-node-label", it.traceRole === "start" ? "ORIGIN" : "TARGET"));
    }
    g.appendChild(text(10, 18, "node-name", truncate(it.label, 24)));
    g.appendChild(text(10, 33, "node-meta", roleLabel(node)));
    makeSvgButton(g, "Inspect function " + (node.qualified_name || node.name), function (event) {
      event.stopPropagation();
      if (event.shiftKey) {
        selectTraceEndpoint(node.id);
        return;
      }
      if (event.metaKey || event.ctrlKey) {
        toggleGraphPromptSelection(node.id);
        return;
      }
      selectFunction(node.id);
    });
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

  function edge(a, b, cls, weight, edgeInfo) {
    var p = el("path");
    p.setAttribute("d", edgePath(a, b, edgeInfo));
    p.setAttribute("class", cls);
    if (edgeInfo) {
      p.setAttribute("data-src", edgeInfo.source);
      p.setAttribute("data-tgt", edgeInfo.target);
      p.setAttribute("data-path-id", edgeInfo.pathId === undefined ? "" : edgeInfo.pathId);
    }
    if (cls.indexOf("clone") === -1) {
      var markerId = edgeInfo && edgeInfo.pathIndex !== undefined ? "arrow-path-" + edgeInfo.pathIndex : "arrow-path-0";
      p.setAttribute("marker-end", "url(#" + markerId + ")");
    }
    return p;
  }

  function edgePath(a, b, edgeInfo) {
    var ah = a.h || NODE_H;
    var bh = b.h || NODE_H;
    var x1 = a.cx + ((edgeInfo && edgeInfo.sourcePortOffset) || 0);
    var y1 = a.cy + ah / 2;
    var x2 = b.cx + ((edgeInfo && edgeInfo.targetPortOffset) || 0);
    var y2 = b.cy - bh / 2;
    if (edgeInfo && edgeInfo.route === "corridor") {
      return "M" + x1 + "," + y1 +
        " V" + edgeInfo.routeY +
        " H" + x2 +
        " V" + y2;
    }
    if (edgeInfo && edgeInfo.route === "outer") {
      var sourceExit = y1 + 24;
      var targetEntry = y2 - 24;
      return "M" + x1 + "," + y1 +
        " V" + sourceExit +
        " H" + edgeInfo.routeX +
        " V" + targetEntry +
        " H" + x2 +
        " V" + y2;
    }
    var midY = (y1 + y2) / 2;
    return "M" + x1 + "," + y1 + " V" + midY + " H" + x2 + " V" + y2;
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
    var scopedNode = treeByPath[state.scope] || tree;
    var objectModeAvailable = scopedNode.type === "module" && scopeObjects(scopedNode).length > 0;
    var label = "files";
    if (graph.kind === "object") label = "objects";
    if (graph.kind === "function" || graph.kind === "object-overview" || graph.kind === "pipeline-overview") label = "visible functions";
    var count = graph.kind === "global"
      ? graph.items.length + " files · " + graph.edges.length + " cross-file calls"
      : graph.kind === "pipeline-overview"
        ? graph.items.length + " functions · " + graph.groups.length + " pipeline groups · " + graph.freeItemIds.length + " unassigned"
      : graph.items.length + " " + label;
    document.getElementById("tools").innerHTML =
      modeToggle(scopedNode, objectModeAvailable) +
      (state.mode === "global" ? globalViewToggle() : "") +
      '<span class="count">' + count + "</span>" +
      edgeLegend() +
      '<div class="zoom-control" aria-label="Graph zoom">' +
        '<button id="zoomOut" class="tool tool-icon" aria-label="Zoom out" title="Zoom out">−</button>' +
        '<span id="zoomReadout" class="zoom-readout">' + zoomLabel() + "</span>" +
        '<button id="zoomIn" class="tool tool-icon" aria-label="Zoom in" title="Zoom in">+</button>' +
      "</div>" +
      '<button id="reset" class="tool">Fit graph</button>';
    document.getElementById("reset").addEventListener("click", function () { redraw(true); });
    document.getElementById("zoomOut").addEventListener("click", function () { zoomBy(1 / 1.2); });
    document.getElementById("zoomIn").addEventListener("click", function () { zoomBy(1.2); });
    document.getElementById("modeFiles").addEventListener("click", showFilesGraph);
    var functionButton = document.getElementById("modeFunctions");
    functionButton.addEventListener("click", function () { if (!functionButton.disabled) setMode("functions"); });
    var objectButton = document.getElementById("modeObjects");
    objectButton.addEventListener("click", function () { if (!objectButton.disabled) setMode("objects"); });
    document.getElementById("modeGlobal").addEventListener("click", function () { setMode("global"); });
    var globalFilesButton = document.getElementById("globalFiles");
    if (globalFilesButton) globalFilesButton.addEventListener("click", function () { setGlobalView("files"); });
    var globalPipelinesButton = document.getElementById("globalPipelines");
    if (globalPipelinesButton) globalPipelinesButton.addEventListener("click", function () { setGlobalView("pipelines"); });
    document.getElementById("hint").textContent = graph.traceActive
      ? "Trace highlighted · Shift-click a target · layout remains fixed"
      : graph.kind === "global"
        ? "Cross-file calls · click a file or function to highlight · drag and zoom are manual"
        : graph.kind === "pipeline-overview"
          ? "Rooted pipeline groups · all remaining functions stay visible · drag and zoom are manual"
        : "Click a function to highlight calls · Shift-click sets a target · drag and zoom are manual";
  }

  function edgeLegend() {
    return '<div class="edge-legend" aria-label="Independent call path colours">' +
      '<span class="legend-path-0">Path 1</span>' +
      '<span class="legend-path-1">Path 2</span>' +
      '<span class="legend-path-2">Path 3</span>' +
      '<span class="legend-path-3">Path 4</span>' +
      '<span class="legend-path-4">Path 5</span>' +
    "</div>";
  }

  function graphPromptTools(graph) {
    if ((graph.kind !== "function" && graph.kind !== "object-overview" && graph.kind !== "pipeline-overview") || state.graphPromptSelection.length < 2) return "";
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

  function bindTraceEdge(path, edgeInfo) {
    var call = callByEdge[edgeInfo.source + ">" + edgeInfo.target];
    var location = call ? " at line " + call.line : "";
    path.setAttribute("data-edge-source", edgeInfo.source);
    path.setAttribute("data-edge-target", edgeInfo.target);
    makeSvgButton(path, "Inspect call from " + graphPromptFunctionName(edgeInfo.source) +
      " to " + graphPromptFunctionName(edgeInfo.target) + location, function (event) {
      event.stopPropagation();
      state.graphSelection = edgeInfo.source;
      state.graphSelectionType = "function";
      state.detailSelection = { type: "function", id: edgeInfo.source };
      state.sourceRange = call ? {
        symbolId: edgeInfo.source,
        anchorLine: call.line,
        startLine: call.line,
        endLine: call.line,
      } : null;
      writeHash();
      redraw(false);
      renderDetail();
      syncTreeSelection();
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

  function renderTraceDock() {
    if (state.workspace !== "graph" || !state.traceStart || !nodeById[state.traceStart]) {
      traceDock.hidden = true;
      traceDock.innerHTML = "";
      return;
    }
    var graph = traceGraph(state.traceStart, state.traceEnd);
    var route = graph.route || [];
    var fileCount = {};
    route.forEach(function (id) { fileCount[nodeById[id].file_id] = true; });
    var status;
    if (!state.traceEnd) {
      status = "Select a target with Shift-click";
    } else if (graph.noRoute) {
      status = "No static route found";
    } else {
      status = route.length + " functions / " + Object.keys(fileCount).length + " files / " + Math.max(0, route.length - 1) + " calls";
    }
    var routeText = route.length
      ? route.map(function (id) { return nodeById[id].name; }).join("  >>>  ")
      : state.traceEnd
        ? nodeById[state.traceStart].name + "  ///  " + nodeById[state.traceEnd].name
        : nodeById[state.traceStart].name + "  >>>  [ SELECT TARGET ]";
    traceDock.hidden = false;
    traceDock.classList.toggle("trace-failed", graph.noRoute);
    traceDock.innerHTML =
      '<div class="trace-dock-identity"><span>[ STATIC TRACE ]</span><strong>' + escape(status) + "</strong></div>" +
      '<output class="trace-route">' + escape(routeText) + "</output>" +
      '<div class="trace-dock-actions">' +
        (state.traceEnd ? '<button type="button" data-trace-swap>Swap</button>' : "") +
        '<button type="button" data-trace-clear>Clear trace</button>' +
      "</div>";
    var swap = traceDock.querySelector("[data-trace-swap]");
    if (swap) swap.addEventListener("click", swapTrace);
    traceDock.querySelector("[data-trace-clear]").addEventListener("click", clearTrace);
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
    clearTraceState();
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
      globalView: state.globalView,
      focus: state.focus,
      graphSelection: state.graphSelection,
      graphSelectionType: state.graphSelectionType,
      mapSelection: state.mapSelection && { kind: state.mapSelection.kind, path: state.mapSelection.path },
      detailSelection: state.detailSelection && { type: state.detailSelection.type, id: state.detailSelection.id },
      objectFocus: state.objectFocus,
      traceStart: state.traceStart,
      traceEnd: state.traceEnd,
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
    state.globalView = snapshot.globalView || "files";
    state.focus = snapshot.focus;
    state.graphSelection = snapshot.graphSelection;
    state.graphSelectionType = snapshot.graphSelectionType;
    state.mapSelection = snapshot.mapSelection;
    state.detailSelection = snapshot.detailSelection;
    state.objectFocus = snapshot.objectFocus || null;
    state.traceStart = snapshot.traceStart || null;
    state.traceEnd = snapshot.traceEnd || null;
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

  function modeToggle(scopedNode, objectModeAvailable) {
    var moduleScope = scopedNode.type === "module";
    var filesActive = state.mode === "functions" && !moduleScope;
    return '<div class="mode-toggle" aria-label="Graph mode">' +
      '<button id="modeFiles" class="mode-button' + (filesActive ? " active" : "") + '">Files</button>' +
      '<button id="modeFunctions" class="mode-button' + (state.mode === "functions" && moduleScope ? " active" : "") + '"' + (moduleScope ? "" : " disabled") + '>Functions</button>' +
      '<button id="modeObjects" class="mode-button' + (state.mode === "objects" ? " active" : "") + '"' + (objectModeAvailable ? "" : " disabled") + '>Objects</button>' +
      '<button id="modeGlobal" class="mode-button' + (state.mode === "global" ? " active" : "") + '">Global calls</button>' +
      "</div>";
  }

  function globalViewToggle() {
    return '<div class="mode-toggle global-view-toggle" aria-label="Global call presentation">' +
      '<button id="globalFiles" class="mode-button' + (state.globalView === "files" ? " active" : "") + '">File bounds</button>' +
      '<button id="globalPipelines" class="mode-button' + (state.globalView === "pipelines" ? " active" : "") + '">Pipelines</button>' +
      "</div>";
  }

  // --- sidebar ------------------------------------------------------------

  function renderHead() {
    document.getElementById("head").innerHTML =
      '<div class="head-top"><div><div class="brand">ATLAS / SYSTEM FIELD</div><div class="pkg">' + escape(model.package_name) +
        '</div><div class="head-status">SNAPSHOT ' + escape(String(payload.snapshot_id || "unknown").slice(0, 10)) +
        " / " + model.nodes.length + ' FUNCTIONS</div></div><button class="rail-collapse" id="railCollapse" aria-label="' +
        (state.navigationCollapsed ? "Expand navigation" : "Collapse navigation") + '" title="' +
        (state.navigationCollapsed ? "Expand navigation" : "Collapse navigation") + '">' +
        (state.navigationCollapsed ? "+" : "−") + "</button></div>";
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
      row.addEventListener("click", function (event) {
        var functionId = row.getAttribute("data-fn");
        if (event.shiftKey) selectTraceEndpoint(functionId);
        else selectFunction(functionId);
      });
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
    clearTraceState();
    state.scope = path;
    state.workspace = "graph";
    state.focus = null;
    state.graphSelection = null;
    state.graphSelectionType = null;
    state.detailSelection = null;
    state.sourceRange = null;
    state.objectFocus = null;
    state.hovered = null;
    var scopedNode = treeByPath[path] || tree;
    state.mode = objectDominated(scopedNode) ? "objects" : "functions";
    expandTo(path);
    renderTree();
    rerender();
  }

  function selectFunction(id) {
    startTrace(id);
  }

  function startTrace(id) {
    if (!activeTraceFunction(id)) return;
    if (state.traceStart === id && state.graphSelection === id && detailIsFunction(id)) {
      clearGraphSelection();
      return;
    }
    var globalMode = state.mode === "global";
    var preferObjects = state.mode === "objects";
    var modulePath = moduleOf(id);
    var moduleNode = treeByPath[modulePath] || tree;
    clearGraphPromptState();
    state.traceStart = id;
    state.traceEnd = null;
    state.workspace = "graph";
    if (!globalMode) {
      state.mode = preferObjects && scopeObjects(moduleNode).length ? "objects" : "functions";
    }
    state.focus = null;
    state.objectFocus = null;
    state.graphSelection = id;
    state.graphSelectionType = "function";
    state.detailSelection = { type: "function", id: id };
    state.hovered = null;
    if (!globalMode) state.scope = modulePath;
    expandTo(modulePath);
    rerender();
  }

  function selectGlobalFile(modulePath) {
    if (state.mode !== "global" || !treeByPath[modulePath]) return;
    if (state.graphSelectionType === "file" && state.graphSelection === modulePath) {
      clearGraphSelection();
      return;
    }
    clearGraphPromptState();
    clearTraceState();
    state.graphSelection = modulePath;
    state.graphSelectionType = "file";
    state.detailSelection = null;
    state.focus = null;
    state.objectFocus = null;
    state.hovered = null;
    rerender();
  }

  function selectTraceEndpoint(id) {
    if (!activeTraceFunction(id)) return;
    if (!state.traceStart) {
      startTrace(id);
      return;
    }
    state.traceEnd = id;
    state.workspace = "graph";
    state.focus = null;
    state.objectFocus = null;
    state.graphSelection = id;
    state.graphSelectionType = "function";
    state.detailSelection = { type: "function", id: id };
    state.hovered = null;
    expandTo(moduleOf(id));
    rerender();
  }

  function swapTrace() {
    if (!state.traceStart || !state.traceEnd) return;
    var start = state.traceStart;
    state.traceStart = state.traceEnd;
    state.traceEnd = start;
    state.graphSelection = state.traceEnd;
    state.detailSelection = { type: "function", id: state.traceEnd };
    rerender();
  }

  function clearTrace() {
    clearGraphSelection();
  }

  function clearTraceState() {
    state.traceStart = null;
    state.traceEnd = null;
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
    if (state.disabled[id] && (state.traceStart === id || state.traceEnd === id)) clearTraceState();
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

  function resolveImportBase(currentModule, importedModule, level) {
    if (!level) return importedModule;
    var currentParts = currentModule.split(".");
    var parts = currentParts.slice(0, Math.max(0, currentParts.length - level));
    if (importedModule) parts = parts.concat(importedModule.split("."));
    return parts.filter(Boolean).join(".");
  }

  function showFilesGraph() {
    if (state.mode === "functions" && state.scope === tree.path && !state.graphSelection && !state.traceStart) return;
    recordNavigation();
    clearGraphPromptState();
    clearTraceState();
    state.workspace = "graph";
    state.scope = tree.path;
    state.mode = "functions";
    state.focus = null;
    state.graphSelection = null;
    state.graphSelectionType = null;
    state.detailSelection = null;
    state.sourceRange = null;
    state.objectFocus = null;
    state.hovered = null;
    rerender();
  }

  function setMode(mode) {
    if (state.mode === mode) return;
    clearGraphPromptState();
    clearTraceState();
    state.mode = mode;
    state.focus = null;
    state.graphSelection = null;
    state.graphSelectionType = null;
    state.detailSelection = null;
    state.sourceRange = null;
    state.objectFocus = null;
    state.hovered = null;
    if (mode === "global") state.scope = tree.path;
    expandTo(tree.path);
    rerender();
  }

  function setGlobalView(viewName) {
    if ((viewName !== "files" && viewName !== "pipelines") || state.globalView === viewName) return;
    state.globalView = viewName;
    if (viewName === "pipelines" && state.graphSelectionType === "file") {
      state.graphSelection = null;
      state.graphSelectionType = null;
    }
    state.hovered = null;
    rerender();
  }

  function toggleNavigationCollapsed() {
    state.navigationCollapsed = !state.navigationCollapsed;
    renderHead();
    rerender();
  }

  function bindDetailResize() {
    var resize = document.getElementById("detailResize");
    var shell = document.querySelector(".shell");
    var panel = document.getElementById("detail");
    var pointerId = null;

    function panelWidth() {
      return panel.getBoundingClientRect().width || 672;
    }

    function setPanelWidth(width) {
      var shellWidth = shell.getBoundingClientRect().width || window.innerWidth;
      var sidebarWidth = document.querySelector(".sidebar").getBoundingClientRect().width || 0;
      var maximum = Math.max(360, shellWidth - sidebarWidth - 360);
      var next = Math.round(Math.max(360, Math.min(maximum, width)));
      shell.style.setProperty("--detail-width", next + "px");
      resize.setAttribute("aria-valuemin", "360");
      resize.setAttribute("aria-valuemax", String(Math.round(maximum)));
      resize.setAttribute("aria-valuenow", String(next));
    }

    resize.addEventListener("pointerdown", function (event) {
      if (event.button !== 0) return;
      pointerId = event.pointerId;
      resize.setPointerCapture(pointerId);
      shell.classList.add("detail-resizing");
      event.preventDefault();
    });
    resize.addEventListener("pointermove", function (event) {
      if (event.pointerId !== pointerId) return;
      setPanelWidth(shell.getBoundingClientRect().right - event.clientX);
    });
    function stopResize(event) {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      shell.classList.remove("detail-resizing");
    }
    resize.addEventListener("pointerup", stopResize);
    resize.addEventListener("pointercancel", stopResize);
    resize.addEventListener("lostpointercapture", function () {
      pointerId = null;
      shell.classList.remove("detail-resizing");
    });
    resize.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      setPanelWidth(panelWidth() + (event.key === "ArrowLeft" ? 24 : -24));
    });
    resize.addEventListener("dblclick", function () { setPanelWidth(672); });
    if (!window.matchMedia || window.matchMedia("(min-width: 1121px)").matches) setPanelWidth(panelWidth());
  }

  function selectObject(id) {
    if (!objectById[id]) return;
    if (state.graphSelectionType === "object" && state.graphSelection === id &&
        state.detailSelection && state.detailSelection.type === "object" && state.detailSelection.id === id) {
      clearGraphSelection();
      return;
    }
    clearGraphPromptState();
    clearTraceState();
    state.graphSelection = id;
    state.workspace = "graph";
    state.graphSelectionType = "object";
    state.detailSelection = { type: "object", id: id };
    state.objectFocus = null;
    state.hovered = null;
    state.focus = null;
    state.mode = "objects";
    var module = objectById[id].module;
    state.scope = module;
    expandTo(module);
    rerender();
  }

  function selectObjectMethod(objectId, methodId) {
    var object = objectById[objectId];
    if (!object || objectMethodIds(object).indexOf(methodId) < 0 || !nodeById[methodId]) return;
    state.mode = "objects";
    state.scope = object.module;
    startTrace(methodId);
  }

  // --- source inspector + city-map rail ----------------------------------

  function renderDetail() {
    var panel = document.getElementById("detail");
    var resize = document.getElementById("detailResize");
    var shell = document.querySelector(".shell");
    var selection = state.detailSelection;
    if (!selection) {
      renderedDetailKey = null;
      panel.hidden = true;
      resize.hidden = true;
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
    resize.hidden = false;
    shell.classList.add("source-open");
    if (selection.type === "object" && objectById[selection.id]) {
      renderObjectDetail(panel, objectById[selection.id]);
      return;
    }
    if (selection.type !== "function" || !nodeById[selection.id]) {
      state.detailSelection = null;
      renderedDetailKey = null;
      panel.hidden = true;
      resize.hidden = true;
      panel.innerHTML = "";
      shell.classList.remove("source-open");
      return;
    }

    var sourceId = selection.id;
    var node = nodeById[sourceId];
    var symbol = symbolById[node.id] || {};
    panel.innerHTML =
      '<button class="detail-close" aria-label="Close source inspector">×</button>' +
      sourceBlock(symbol, null, {
        symbolId: node.id,
        sourceRange: state.sourceRange,
      });
    panel.querySelector(".detail-close").addEventListener("click", clearGraphSelection);
    bindInlinePromptActions(panel, node.id);
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
    clearTraceState();
    state.scope = scope;
    state.mode = objectDominated(treeByPath[scope] || tree) ? "objects" : "functions";
    state.focus = null;
    state.graphSelection = null;
    state.graphSelectionType = null;
    state.detailSelection = null;
    state.sourceRange = null;
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
    selectFunction(id);
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
    clearGraphSelection();
  }

  function clearGraphSelection() {
    var closedSelection = state.detailSelection;
    clearGraphPromptState();
    resetInlinePrompt();
    clearTraceState();
    state.graphSelection = null;
    state.graphSelectionType = null;
    state.detailSelection = null;
    state.objectFocus = null;
    state.hovered = null;
    state.focus = null;
    state.sourceRange = null;
    rerender();
    var focusTarget = detailReturnFocus && detailReturnFocus !== document.body &&
      detailReturnFocus.isConnected && !detailReturnFocus.closest("[hidden]")
      ? detailReturnFocus
      : detailFocusTarget(closedSelection);
    detailReturnFocus = null;
    if (focusTarget) focusTarget.focus();
  }

  function detailFocusTarget(selection) {
    if (!selection) return document.getElementById("modeGlobal");
    var attribute = selection.type === "object" ? "data-object-focus" : "data-function-focus";
    var candidates = document.querySelectorAll("[" + attribute + "]");
    for (var index = 0; index < candidates.length; index += 1) {
      if (candidates[index].getAttribute(attribute) === selection.id && !candidates[index].closest("[hidden]")) {
        return candidates[index];
      }
    }
    return document.getElementById("modeGlobal");
  }

  function renderObjectDetail(card, object) {
    card.innerHTML =
      '<button class="detail-close" aria-label="Close source inspector">×</button>' +
      sourceBlock(object, null);
    card.querySelector(".detail-close").addEventListener("click", clearGraphSelection);
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
    if (!graph.items.length && !(graph.kind === "object-overview" && graph.groups.length)) {
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
    if (graph.kind === "object-overview" || graph.kind === "pipeline-overview") {
      graph.groups.forEach(function (methodGroup) {
        minX = Math.min(minX, methodGroup.left);
        maxX = Math.max(maxX, methodGroup.left + methodGroup.width);
        minY = Math.min(minY, methodGroup.top);
        maxY = Math.max(maxY, methodGroup.bottom);
      });
      if (graph.freeItemIds.length) minY = Math.min(minY, graph.freeHeaderY - 18);
    }
    if (graph.kind === "trace") {
      graph.compartments.forEach(function (compartment) {
        minX = Math.min(minX, compartment.left);
        maxX = Math.max(maxX, compartment.left + compartment.width);
        minY = Math.min(minY, compartment.top);
        maxY = Math.max(maxY, compartment.top + compartment.height);
      });
    }
    if (graph.kind === "global") minY = Math.min(minY, graph.routeTop);
    if ((graph.kind === "global" || graph.kind === "pipeline-overview") && Number.isFinite(graph.routeLeft)) {
      minX = Math.min(minX, graph.routeLeft);
      maxX = Math.max(maxX, graph.routeRight);
    }
    var rect = canvas.getBoundingClientRect();
    var w = rect.width || 900, h = rect.height || 700;
    var scale = Math.min((w - 2 * MARGIN) / Math.max(1, maxX - minX), (h - 2 * MARGIN) / Math.max(1, maxY - minY), 1);
    var globalScale = graph.kind === "global" || graph.kind === "pipeline-overview";
    view.scale = Math.max(scale, globalScale ? 0.04 : 0.18);
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
      applyGraphTransform();
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
      if (state.detailSelection || state.graphSelection || state.traceStart || state.focus) clearGraphSelection();
    });
    canvas.addEventListener("wheel", function (e) {
      e.preventDefault();
      var rect = canvas.getBoundingClientRect();
      var px = e.clientX - rect.left, py = e.clientY - rect.top;
      var factor = Math.max(0.88, Math.min(1.14, Math.exp(-e.deltaY * 0.0015)));
      zoomAt(px, py, factor);
    }, { passive: false });
  }

  function bindKeyboardShortcuts() {
    document.addEventListener("keydown", function (event) {
      var tag = event.target && event.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (event.key === "Escape" && (state.detailSelection || state.graphSelection || state.traceStart || state.focus)) {
        clearGraphSelection();
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

  function zoomBy(factor) {
    var rect = canvas.getBoundingClientRect();
    zoomAt((rect.width || 900) / 2, (rect.height || 700) / 2, factor);
  }

  function zoomAt(px, py, factor) {
    var next = Math.min(2.5, Math.max(0.04, view.scale * factor));
    view.x = px - (px - view.x) * (next / view.scale);
    view.y = py - (py - view.y) * (next / view.scale);
    view.scale = next;
    applyGraphTransform();
  }

  function zoomLabel() { return Math.round(view.scale * 100) + "%"; }
  function syncZoomReadout() {
    var readout = document.getElementById("zoomReadout");
    if (readout) readout.textContent = zoomLabel();
  }

  function applyGraphTransform() {
    if (graphRoot) {
      graphRoot.setAttribute("transform", "translate(" + view.x + "," + view.y + ") scale(" + view.scale + ")");
    }
    syncZoomReadout();
  }

  function redraw(refit) {
    var graph = currentGraph();
    layout(graph);
    if (refit) fitView(graph);
    draw(graph);
    lastTopologyKey = graphTopologyKey(graph);
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
  function objectDominated(node) {
    if (!node || node.type !== "module") return false;
    var activeIds = activeFunctionIds(node);
    var claimed = {};
    scopeObjects(node).forEach(function (object) {
      objectMethodIds(object).forEach(function (id) { claimed[id] = true; });
    });
    var methodCount = activeIds.filter(function (id) { return claimed[id]; }).length;
    return methodCount > 0 && methodCount > activeIds.length - methodCount;
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
  function rect(w, h, cls) { var r = el("rect"); r.setAttribute("width", w); r.setAttribute("height", h); r.setAttribute("rx", 0); if (cls) r.setAttribute("class", cls); return r; }
  function line(x1, y1, x2, y2, cls) { var l = el("line"); l.setAttribute("x1", x1); l.setAttribute("y1", y1); l.setAttribute("x2", x2); l.setAttribute("y2", y2); if (cls) l.setAttribute("class", cls); return l; }
  function text(x, y, cls, t) { var e = el("text"); e.setAttribute("x", x); e.setAttribute("y", y); e.setAttribute("class", cls); e.textContent = t; return e; }
  function defs() {
    var d = el("defs");
    ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"].forEach(function (color, index) {
      d.appendChild(marker("arrow-path-" + index, color));
    });
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
