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
  var PATH_COLORS = [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
    "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
    "#aec7e8", "#ffbb78", "#98df8a", "#ff9896", "#c5b0d5",
    "#c49c94", "#f7b6d2", "#c7c7c7", "#dbdb8d", "#9edae5",
  ];

  var payload = window.ATLAS_PAYLOAD;
  var model = payload.model;
  var tree = model.tree;

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
  var objectByMethodId = {};
  var objectMethodVisibility = {};
  var methodIdsByObject = {};
  objects.forEach(function (o) {
    objectById[o.id] = o;
    (objectsByModule[o.module] = objectsByModule[o.module] || []).push(o);
    var constructorId = o.constructor && o.constructor.method_id;
    if (constructorId) {
      objectByMethodId[constructorId] = o;
      objectMethodVisibility[constructorId] = "constructor";
    }
    (o.methods.public || []).forEach(function (id) {
      objectByMethodId[id] = o;
      objectMethodVisibility[id] = "public";
    });
    (o.methods.private || []).forEach(function (id) {
      objectByMethodId[id] = o;
      objectMethodVisibility[id] = "private";
    });
  });
  // Some analyzers can map a method to its class before the object summary has
  // classified its visibility. Keep those methods inside the class boundary.
  payload.symbols.forEach(function (symbol) {
    if (symbol.kind !== "function" || !symbol.class_id || !objectById[symbol.class_id]) return;
    if (!objectByMethodId[symbol.id]) objectByMethodId[symbol.id] = objectById[symbol.class_id];
    if (!objectMethodVisibility[symbol.id]) objectMethodVisibility[symbol.id] = symbol.is_private ? "private" : "public";
  });
  Object.keys(objectByMethodId).forEach(function (id) {
    var object = objectByMethodId[id];
    (methodIdsByObject[object.id] = methodIdsByObject[object.id] || []).push(id);
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
  var functionIdsByTreePath = {};
  (function indexTree(node) {
    treeByPath[node.path] = node;
    node.children.forEach(indexTree);
    var functionIds = (node.function_ids || []).slice();
    node.children.forEach(function (child) {
      functionIds = functionIds.concat(functionIdsByTreePath[child.path]);
    });
    var seenFunctionIds = {};
    functionIdsByTreePath[node.path] = functionIds.filter(function (id) {
      if (seenFunctionIds[id]) return false;
      seenFunctionIds[id] = true;
      return true;
    });
  })(tree);

  var state = {
    workspace: "graph",
    sidebarTab: "navigation",
    scope: tree.path,           // path of the package/module currently scoped
    mode: "global",
    globalView: "pipelines",
    focus: null,                // a function id when in neighborhood mode
    graphSelection: null,
    graphSelectionType: null,
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
    disabled: {},
    soloPath: null,
    expanded: { "": true },    // tree paths that are open
    navigationCollapsed: true,
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
  var lastLaidOutGraph = null;
  var renderedDetailKey = null;
  var detailReturnFocus = null;
  var navigation = { back: [], forward: [] };

  var canvas = document.getElementById("canvas");
  var treePanel = document.getElementById("tree");
  var sidebarTabs = document.getElementById("sidebarTabs");
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
    var hasLegacyGraphState = core.hasLegacyGraphHashState(params);
    if (params.mode === undefined && hasLegacyGraphState) state.mode = "functions";
    if (params.scope !== undefined && treeByPath[params.scope]) {
      state.scope = params.scope;
      expandTo(params.scope);
    }
    if (params.mode === "functions" || params.mode === "objects" || params.mode === "global") state.mode = params.mode;
    if (params.globalView === "files" || params.globalView === "pipelines") state.globalView = params.globalView;
    if (params.mode === "global" && params.globalView === undefined) state.globalView = "files";
    var requestedWorkspace = params.workspace || params.tab;
    var hasExplicitWorkspace = isWorkspace(requestedWorkspace);
    if (hasExplicitWorkspace) {
      state.workspace = requestedWorkspace;
    } else if (hasLegacyGraphState) {
      // Older links predate the workspace field. Their graph-specific state
      // still explicitly identifies the graph workspace.
      state.workspace = "graph";
    }
    var graphId = params.graph || params.sel;
    if (graphId) {
      if (params.type === "file" && treeByPath[graphId]) {
        state.graphSelection = graphId;
        state.graphSelectionType = "file";
      } else if (params.type === "object" && objectById[graphId]) {
        state.graphSelection = graphId;
        state.graphSelectionType = "object";
      } else if (nodeById[graphId] && !state.disabled[graphId]) {
        state.graphSelection = graphId;
        state.graphSelectionType = "function";
        state.traceStart = graphId;
      }
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
    if (!params.mode && state.mode !== "global" && objectDominated(treeByPath[state.scope] || tree)) state.mode = "objects";
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
    var pipelineLayout = publicPipelineGroups(active);
    var groups = pipelineLayout.groups;
    var workflows = pipelineLayout.workflows;
    var workflowById = pipelineLayout.workflowById;
    var primaryWorkflowByFunction = pipelineLayout.primaryWorkflowByFunction;
    var workflowIdsByFunction = pipelineLayout.workflowIdsByFunction;
    var visualByFunction = {};
    activeIds.forEach(function (id) {
      visualByFunction[id] = objectByMethodId[id] ? objectByMethodId[id].id : id;
    });
    var groupById = {};
    groups.forEach(function (groupInfo) { groupById[groupInfo.id] = groupInfo; });
    var items = activeIds.filter(function (id) { return !objectByMethodId[id]; }).map(function (id) {
      var item = fnItem(id);
      var workflow = workflowById[primaryWorkflowByFunction[id]];
      var groupInfo = workflow ? groupById[workflow.regionId] : null;
      item.objectId = groupInfo ? groupInfo.id : null;
      item.pipelineIndex = workflow ? workflow.colorIndex : null;
      item.isPipelineHead = !!workflow && workflow.root === id;
      return item;
    });
    objects.forEach(function (object) {
      var activeMethods = objectMethodIds(object).filter(function (id) { return active[id]; });
      if (!activeMethods.length) return;
      var item = objectItem(object, true);
      var objectWorkflows = workflows.filter(function (workflow) { return workflow.objectId === object.id; });
      var groupInfo = objectWorkflows.length ? groupById[objectWorkflows[0].regionId] : null;
      item.objectId = groupInfo ? groupInfo.id : null;
      item.pipelineIndex = objectWorkflows.length ? objectWorkflows[0].colorIndex : null;
      item.isPipelineHead = objectWorkflows.length > 0;
      item.activeFunctionIds = setOf(activeMethods);
      item.card = objectCardLayout(object, { active: active, allMethods: true });
      item.methodPathIndex = {};
      item.methodWorkflowIds = {};
      activeMethods.forEach(function (id) {
        var methodWorkflow = workflowById[primaryWorkflowByFunction[id]];
        if (methodWorkflow) item.methodPathIndex[id] = methodWorkflow.colorIndex;
        item.methodWorkflowIds[id] = (workflowIdsByFunction[id] || []).slice();
      });
      items.push(item);
    });

    var edges = [];
    model.edges.forEach(function (edgeInfo) {
      if (state.disabled[edgeInfo.source] || state.disabled[edgeInfo.target]) return;
      var key = edgeInfo.source + ">" + edgeInfo.target;
      var source = visualByFunction[edgeInfo.source];
      var target = visualByFunction[edgeInfo.target];
      if (!source || !target || source === target) return;
      var memberships = pipelineLayout.workflowIdsByEdge[key] || [];
      var sourceWorkflowId = primaryWorkflowByFunction[edgeInfo.source];
      var targetWorkflowId = primaryWorkflowByFunction[edgeInfo.target];
      var workflowId = memberships.indexOf(sourceWorkflowId) >= 0
        ? sourceWorkflowId
        : memberships.indexOf(targetWorkflowId) >= 0
          ? targetWorkflowId
          : memberships[0];
      var workflow = workflowById[workflowId];
      edges.push({
        source: source,
        target: target,
        sourceFunction: edgeInfo.source,
        targetFunction: edgeInfo.target,
        originalKey: key,
        workflowId: workflowId || null,
        workflowIds: memberships.slice(),
        pathIndex: workflow ? workflow.colorIndex : callPathIndexByEdge[key],
        pathId: workflow ? workflow.order : callPathIdByEdge[key],
        weight: 1,
      });
    });
    edges.sort(compareRouteEdges);
    return {
      items: items,
      edges: edges,
      groups: groups,
      freeItemIds: pipelineLayout.freeItemIds,
      workflows: workflows,
      workflowById: workflowById,
      primaryWorkflowByFunction: primaryWorkflowByFunction,
      workflowIdsByFunction: workflowIdsByFunction,
      visualByFunction: visualByFunction,
      kind: "pipeline-overview",
    };
  }

  // A workflow describes call-path membership; a region describes physical
  // ownership. Public class methods each own a workflow, but their workflows
  // share one class region and one object card. This avoids duplicating an
  // object while keeping its public entry points independently selectable.
  function publicPipelineGroups(active) {
    var activeOutgoing = {};
    Object.keys(active).forEach(function (id) { activeOutgoing[id] = []; });
    model.edges.forEach(function (edgeInfo) {
      if (!active[edgeInfo.source] || !active[edgeInfo.target]) return;
      activeOutgoing[edgeInfo.source].push(edgeInfo.target);
    });
    Object.keys(activeOutgoing).forEach(function (id) { activeOutgoing[id].sort(); });

    var seenRoots = {};
    var records = (architecture.pipelines || []).filter(function (pipeline) {
      var root = nodeById[pipeline.root];
      if (!active[pipeline.root] || !root || root.kind === "method" || root.is_private || seenRoots[pipeline.root]) return false;
      seenRoots[pipeline.root] = true;
      return true;
    }).map(function (pipeline) {
      return {
        root: pipeline.root,
        kind: "function",
        objectId: null,
        label: pipelineRootLabel(pipeline.root),
      };
    });
    var classRegionByObject = {};
    objects.slice().sort(function (left, right) {
      return left.module.localeCompare(right.module) || left.name.localeCompare(right.name);
    }).forEach(function (object, objectIndex) {
      classRegionByObject[object.id] = "class-workflows-" + objectIndex;
      (methodIdsByObject[object.id] || []).filter(function (id) {
        return active[id] && objectMethodVisibility[id] === "public";
      }).sort(function (left, right) {
        var leftNode = nodeById[left], rightNode = nodeById[right];
        return leftNode.line_start - rightNode.line_start || left.localeCompare(right);
      }).forEach(function (id) {
        if (seenRoots[id]) return;
        seenRoots[id] = true;
        records.push({
          root: id,
          kind: "class",
          objectId: object.id,
          label: object.name + "." + nodeById[id].name,
        });
      });
    });

    records.forEach(function (record, index) {
      record.id = "workflow-" + index;
      record.order = index;
      record.colorIndex = index % PATH_COLORS.length;
      record.regionId = record.kind === "class" ? classRegionByObject[record.objectId] : "function-workflow-" + index;
      record.functionSet = {};
      record.edgeKeys = {};
      record.distanceByFunction = {};
      record.functionSet[record.root] = true;
      record.distanceByFunction[record.root] = 0;
      var queued = {};
      var queue = [record.root];
      queued[record.root] = true;
      for (var head = 0; head < queue.length; head += 1) {
        var source = queue[head];
        (activeOutgoing[source] || []).forEach(function (target) {
          var decision = workflowTraversalDecision(record, target);
          if (!decision.include) return;
          record.edgeKeys[source + ">" + target] = true;
          record.functionSet[target] = true;
          var distance = record.distanceByFunction[source] + 1;
          if (record.distanceByFunction[target] === undefined || distance < record.distanceByFunction[target]) {
            record.distanceByFunction[target] = distance;
          }
          if (decision.continue && !queued[target]) {
            queued[target] = true;
            queue.push(target);
          }
        });
      }
      record.functionIds = Object.keys(record.functionSet).sort();
      record.edgeKeyList = Object.keys(record.edgeKeys).sort();
    });

    var workflowById = {};
    var workflowIdsByFunction = {};
    var workflowIdsByEdge = {};
    records.forEach(function (record) {
      workflowById[record.id] = record;
      record.functionIds.forEach(function (id) {
        (workflowIdsByFunction[id] = workflowIdsByFunction[id] || []).push(record.id);
      });
      record.edgeKeyList.forEach(function (key) {
        (workflowIdsByEdge[key] = workflowIdsByEdge[key] || []).push(record.id);
      });
    });

    var primaryWorkflowByFunction = {};
    Object.keys(workflowIdsByFunction).forEach(function (id) {
      var candidates = workflowIdsByFunction[id].map(function (workflowId) { return workflowById[workflowId]; });
      candidates.sort(function (left, right) {
        var leftIsRoot = left.root === id ? 0 : 1;
        var rightIsRoot = right.root === id ? 0 : 1;
        return leftIsRoot - rightIsRoot ||
          left.distanceByFunction[id] - right.distanceByFunction[id] ||
          left.order - right.order;
      });
      primaryWorkflowByFunction[id] = candidates[0].id;
    });

    var groupById = {};
    records.forEach(function (record) {
      if (groupById[record.regionId]) return;
      if (record.kind === "function") {
        groupById[record.regionId] = {
          id: record.regionId,
          kind: "function",
          label: record.label,
          itemIds: [],
          anchorId: record.root,
          rootIds: [record.root],
          colorIndex: record.colorIndex,
          pipelineCount: 1,
        };
        return;
      }
      var object = objectById[record.objectId];
      groupById[record.regionId] = {
        id: record.regionId,
        kind: "class",
        objectId: record.objectId,
        label: object.module.split(".").slice(-1)[0] + "." + object.name,
        itemIds: [record.objectId],
        anchorId: record.objectId,
        rootIds: [record.objectId],
        colorIndex: record.colorIndex,
        pipelineCount: 0,
      };
    });
    records.forEach(function (record) {
      if (record.kind === "class") groupById[record.regionId].pipelineCount += 1;
    });

    var freeItemIds = [];
    Object.keys(active).sort().forEach(function (id) {
      if (objectByMethodId[id]) return;
      var workflow = workflowById[primaryWorkflowByFunction[id]];
      if (!workflow) {
        freeItemIds.push(id);
        return;
      }
      groupById[workflow.regionId].itemIds.push(id);
    });
    objects.forEach(function (object) {
      var hasActiveMethods = objectMethodIds(object).some(function (id) { return active[id]; });
      if (hasActiveMethods && !groupById[classRegionByObject[object.id]]) freeItemIds.push(object.id);
    });
    var groups = Object.keys(groupById).map(function (id) { return groupById[id]; }).sort(function (left, right) {
      var leftWorkflow = records.filter(function (record) { return record.regionId === left.id; })[0];
      var rightWorkflow = records.filter(function (record) { return record.regionId === right.id; })[0];
      return leftWorkflow.order - rightWorkflow.order;
    });
    groups.forEach(function (groupInfo) {
      groupInfo.itemIds = groupInfo.itemIds.filter(function (id, index, ids) { return ids.indexOf(id) === index; });
    });
    return {
      groups: groups,
      workflows: records,
      workflowById: workflowById,
      workflowIdsByFunction: workflowIdsByFunction,
      workflowIdsByEdge: workflowIdsByEdge,
      primaryWorkflowByFunction: primaryWorkflowByFunction,
      freeItemIds: freeItemIds,
    };
  }

  function workflowTraversalDecision(workflow, targetId) {
    var object = objectByMethodId[targetId];
    if (!object) return { include: true, continue: true };
    var visibility = objectMethodVisibility[targetId] || "public";
    if (workflow.kind === "function") {
      return visibility === "public"
        ? { include: true, continue: false }
        : { include: false, continue: false };
    }
    if (object.id !== workflow.objectId) {
      return visibility === "public"
        ? { include: true, continue: false }
        : { include: false, continue: false };
    }
    if (visibility === "public" && targetId !== workflow.root) {
      return {
        include: true,
        continue: false,
      };
    }
    return { include: true, continue: true };
  }

  function pipelineRootLabel(rootId) {
    var node = nodeById[rootId];
    if (node.kind === "method") return rootId.slice(node.module.length + 1);
    return node.module.split(".").slice(-1)[0] + "." + node.name;
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
    var ids = (methodIdsByObject[object.id] || []).slice();
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
  // start new paths; pure cycles are assigned deterministically. The expanded
  // Tableau palette repeats, while path identity remains unique for routing.
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
        colorByEdge[key] = index % PATH_COLORS.length;
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
    if (graph.kind === "pipeline-overview") return applyPipelineTrace(graph, startId, endId);
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

  function applyPipelineTrace(graph, startId, endId) {
    var route = endId
      ? core.shortestDirectedPath(model.edges, startId, endId, state.disabled)
      : null;
    var workflow = !endId ? graph.workflowById[graph.primaryWorkflowByFunction[startId]] : null;
    var tracedIds = workflow
      ? workflow.functionIds.slice()
      : endId
        ? route || [startId, endId]
        : [startId]
          .concat((inAdj[startId] || []).filter(activeTraceFunction))
          .concat((outAdj[startId] || []).filter(activeTraceFunction));
    tracedIds = tracedIds.filter(function (id, index) { return tracedIds.indexOf(id) === index; });
    var traced = setOf(tracedIds);
    var traceEdges = workflow ? workflow.edgeKeys : {};
    if (!workflow && route) {
      for (var index = 0; index < route.length - 1; index += 1) {
        traceEdges[route[index] + ">" + route[index + 1]] = true;
      }
    } else if (!workflow && !endId) {
      (inAdj[startId] || []).forEach(function (source) { traceEdges[source + ">" + startId] = true; });
      (outAdj[startId] || []).forEach(function (target) { traceEdges[startId + ">" + target] = true; });
    }

    graph.edges = graph.edges.map(function (edgeInfo) {
      var copy = Object.assign({}, edgeInfo);
      copy.inTrace = workflow
        ? copy.workflowIds.indexOf(workflow.id) >= 0
        : !!traceEdges[copy.originalKey || copy.source + ">" + copy.target];
      if (workflow && copy.inTrace) copy.pathIndex = workflow.colorIndex;
      return copy;
    });
    var tracedVisuals = {};
    tracedIds.forEach(function (id) {
      var visualId = graph.visualByFunction[id];
      if (visualId) tracedVisuals[visualId] = true;
    });
    graph.items.forEach(function (item) {
      var matchingFunctions = item.kind === "object"
        ? objectMethodIds(item.node).filter(function (id) { return traced[id]; })
        : traced[item.id] ? [item.id] : [];
      if (!matchingFunctions.length) return;
      if (item.kind === "object") item.traceFunctionIds = setOf(matchingFunctions);
      item.traceRole = graph.visualByFunction[startId] === item.id ? "start" : "route";
      item.traceOrder = route ? route.reduce(function (first, id, index) {
        return first >= 0 || graph.visualByFunction[id] !== item.id ? first : index;
      }, -1) : null;
      item.activeWorkflowId = workflow ? workflow.id : null;
      item.activePathIndex = workflow ? workflow.colorIndex : null;
    });
    graph.center = graph.visualByFunction[startId] || startId;
    graph.traceActive = true;
    graph.traceStart = startId;
    graph.traceEnd = endId;
    graph.traceVisualIds = tracedVisuals;
    graph.activeWorkflowId = workflow ? workflow.id : null;
    graph.activePathIndex = workflow ? workflow.colorIndex : null;
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

    if (graph.kind === "function") {
      layoutCompactFunctionGrid(layers, byLayer, items);
    } else {
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
    }
    assignEdgeRoutes(graph);
  }

  // A stable reading-order grid prevents large files from becoming a single
  // off-screen row. Topological depth still determines ordering and colour;
  // the visual rows only use the canvas more efficiently.
  function layoutCompactFunctionGrid(layers, byLayer, items) {
    var ordered = [];
    layers.forEach(function (layer) { ordered = ordered.concat(byLayer[layer]); });
    var averageWidth = ordered.reduce(function (sum, item) { return sum + item.w; }, 0) / ordered.length;
    var cellWidth = averageWidth + 34;
    var cellHeight = NODE_H + 48;
    var columns = Math.max(1, Math.min(24, Math.round(Math.sqrt(
      ordered.length * 1.6 * cellHeight / cellWidth
    ))));
    var rows = [];
    for (var start = 0; start < ordered.length; start += columns) {
      var row = ordered.slice(start, start + columns);
      if (rows.length % 2) row.reverse();
      rows.push(row);
    }
    var y = 0;
    rows.forEach(function (row, rowIndex) {
      var width = row.reduce(function (sum, item) { return sum + item.w; }, 0) + (row.length - 1) * 34;
      var height = row.reduce(function (maximum, item) { return Math.max(maximum, item.h); }, NODE_H);
      var x = -width / 2;
      row.forEach(function (item) {
        item.semanticLayer = item.layer;
        item.visualRow = rowIndex;
        item.cx = x + item.w / 2;
        item.cy = y + item.h / 2;
        x += item.w + 34;
      });
      y += height + 48;
    });
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
    if (graph.kind === "pipeline-overview" || graph.kind === "function") {
      assignObstacleRoutes(graph, byId, minX, maxX);
      return;
    }
    var corridors = {}, outer = [];
    graph.edges.forEach(function (edgeInfo) {
      var source = byId[edgeInfo.source], target = byId[edgeInfo.target];
      if (!source || !target) return;
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

  // Compact grids need routes that consider every segment, not only a single
  // vertical lane. Candidate paths stay deterministic and prefer short,
  // obstacle-free corridors with minimal overlap between different colours.
  function obstacleRouteAnchor(item, functionId, other, outgoing, offset) {
    if (item.kind === "object" && functionId && objectCard(item).rowY[functionId] !== undefined) {
      var side = other.cx >= item.cx ? 1 : -1;
      return {
        x: item.cx + side * item.w / 2,
        y: item.cy - item.h / 2 + objectCard(item).rowY[functionId] + (offset || 0),
        side: side,
      };
    }
    return {
      x: item.cx + (offset || 0),
      y: item.cy + (outgoing ? item.h / 2 : -item.h / 2),
      side: 0,
    };
  }

  function assignObstacleRoutes(graph, byId, minX, maxX) {
    var nodeObstacles = graph.items.map(function (item) {
      return {
        id: item.id,
        left: item.cx - item.w / 2,
        right: item.cx + item.w / 2,
        top: item.cy - item.h / 2,
        bottom: item.cy + item.h / 2,
      };
    });
    var groupObstacles = (graph.groups || []).map(function (groupInfo) {
      return {
        id: groupInfo.id,
        left: groupInfo.left,
        right: groupInfo.left + groupInfo.width,
        top: groupInfo.top,
        bottom: groupInfo.bottom,
      };
    });
    var minY = Math.min.apply(null, nodeObstacles.map(function (obstacle) { return obstacle.top; }));
    var maxY = Math.max.apply(null, nodeObstacles.map(function (obstacle) { return obstacle.bottom; }));
    groupObstacles.forEach(function (obstacle) {
      minY = Math.min(minY, obstacle.top);
      maxY = Math.max(maxY, obstacle.bottom);
    });
    var groupObstacleById = {};
    groupObstacles.forEach(function (obstacle) { groupObstacleById[obstacle.id] = obstacle; });
    var obstacleIndex = createRouteObstacleIndex(nodeObstacles.concat(groupObstacles), 180);
    var segmentIndex = createRouteSegmentIndex(90);
    var groupXBoundaries = uniqueRouteValues(groupObstacles.reduce(function (values, obstacle) {
      return values.concat([obstacle.left - 10, obstacle.right + 10]);
    }, []));
    var groupYBoundaries = uniqueRouteValues(groupObstacles.reduce(function (values, obstacle) {
      return values.concat([obstacle.top - 10, obstacle.bottom + 10]);
    }, []));
    graph.routeLeft = minX;
    graph.routeRight = maxX;
    graph.routeTop = minY;
    graph.routeBottom = maxY;
    assignFunctionEdgePorts(graph.edges);

    graph.edges.slice().sort(compareRouteEdges).forEach(function (edgeInfo, edgeIndex) {
      var source = byId[edgeInfo.source], target = byId[edgeInfo.target];
      if (!source || !target) return;
      var sourceAnchor = obstacleRouteAnchor(source, edgeInfo.sourceFunction, target, true, edgeInfo.sourcePortOffset);
      var targetAnchor = obstacleRouteAnchor(target, edgeInfo.targetFunction, source, false, edgeInfo.targetPortOffset);
      var sourceExit = sourceAnchor.side
        ? { x: sourceAnchor.x + sourceAnchor.side * 20, y: sourceAnchor.y }
        : { x: sourceAnchor.x, y: sourceAnchor.y + 20 };
      var targetEntry = targetAnchor.side
        ? { x: targetAnchor.x + targetAnchor.side * 20, y: targetAnchor.y }
        : { x: targetAnchor.x, y: targetAnchor.y - 20 };
      var desired = (sourceExit.x + targetEntry.x) / 2;
      var candidateSet = {};
      function addCandidate(x) { candidateSet[String(Math.round(x))] = Math.round(x); }
      for (var offset = -60; offset <= 60; offset += 6) addCandidate(desired + offset);
      [source.cx - source.w / 2 - 10, source.cx + source.w / 2 + 10,
        target.cx - target.w / 2 - 10, target.cx + target.w / 2 + 10,
        minX - 24 - edgeIndex % 7 * 6, maxX + 24 + edgeIndex % 7 * 6].forEach(addCandidate);
      nearestRouteValues(groupXBoundaries, desired, 12).forEach(addCandidate);
      [groupObstacleById[source.objectId], groupObstacleById[target.objectId]].filter(Boolean).forEach(function (obstacle) {
        addCandidate(obstacle.left - 10);
        addCandidate(obstacle.right + 10);
      });
      var candidates = Object.keys(candidateSet).map(function (key) { return candidateSet[key]; }).sort(function (left, right) {
        return Math.abs(left - desired) - Math.abs(right - desired) || left - right;
      });
      var reversed = targetAnchor.y <= sourceAnchor.y;
      if (reversed) {
        var sideLeft = Math.min(source.cx - source.w / 2, target.cx - target.w / 2) - 10;
        var sideRight = Math.max(source.cx + source.w / 2, target.cx + target.w / 2) + 10;
        candidates = candidates.filter(function (candidate) {
          return candidate <= sideLeft || candidate >= sideRight;
        });
      }
      var bestPoints = null, bestSegments = null, bestScore = Infinity;
      var excludedObstacles = {};
      excludedObstacles[edgeInfo.source] = true;
      excludedObstacles[edgeInfo.target] = true;
      if (source.objectId) excludedObstacles[source.objectId] = true;
      if (target.objectId) excludedObstacles[target.objectId] = true;
      function considerRoute(points, outside) {
        points = compactRoutePoints(points);
        var segments = routeSegments(points);
        var obstacleCount = indexedRouteObstacleCount(segments, obstacleIndex, excludedObstacles);
        var score = obstacleCount * 1000000 + routeLength(segments) +
          routeInteractionCost(segments, segmentIndex, edgeInfo.pathIndex) +
          (outside ? 12 : 0);
        if (score < bestScore) {
          bestPoints = points;
          bestSegments = segments;
          bestScore = score;
        }
      }
      candidates.forEach(function (candidate) {
        considerRoute([
          sourceAnchor,
          sourceExit,
          { x: candidate, y: sourceExit.y },
          { x: candidate, y: targetEntry.y },
          targetEntry,
          targetAnchor,
        ], candidate < minX || candidate > maxX);
      });
      var desiredY = (sourceExit.y + targetEntry.y) / 2;
      var yCandidateSet = {};
      function addYCandidate(y) { yCandidateSet[String(Math.round(y))] = Math.round(y); }
      for (var yOffset = -60; yOffset <= 60; yOffset += 6) addYCandidate(desiredY + yOffset);
      [minY - 24 - edgeIndex % 7 * 6, maxY + 24 + edgeIndex % 7 * 6].forEach(addYCandidate);
      nearestRouteValues(groupYBoundaries, desiredY, 12).forEach(addYCandidate);
      [groupObstacleById[source.objectId], groupObstacleById[target.objectId]].filter(Boolean).forEach(function (obstacle) {
        addYCandidate(obstacle.top - 10);
        addYCandidate(obstacle.bottom + 10);
      });
      if (!reversed) {
        Object.keys(yCandidateSet).map(function (key) { return yCandidateSet[key]; }).sort(function (top, bottom) {
          return Math.abs(top - desiredY) - Math.abs(bottom - desiredY) || top - bottom;
        }).forEach(function (candidate) {
          considerRoute([
            sourceAnchor,
            sourceExit,
            { x: sourceExit.x, y: candidate },
            { x: targetEntry.x, y: candidate },
            targetEntry,
            targetAnchor,
          ], candidate < minY || candidate > maxY);
        });
      }
      var sourceBounds = groupObstacleById[source.objectId] || {
        left: source.cx - source.w / 2,
        right: source.cx + source.w / 2,
      };
      var targetBounds = groupObstacleById[target.objectId] || {
        left: target.cx - target.w / 2,
        right: target.cx + target.w / 2,
      };
      var outerLeft = minX - 30 - edgeIndex % 7 * 6;
      var outerRight = maxX + 30 + edgeIndex % 7 * 6;
      var sourceSides = uniqueRouteValues([sourceBounds.left - 10, sourceBounds.right + 10, outerLeft, outerRight]);
      var targetSides = uniqueRouteValues([targetBounds.left - 10, targetBounds.right + 10, outerLeft, outerRight]);
      sourceSides.forEach(function (sourceSide) {
        targetSides.forEach(function (targetSide) {
          [minY - 30 - edgeIndex % 7 * 6, maxY + 30 + edgeIndex % 7 * 6].forEach(function (outerY) {
            considerRoute([
              sourceAnchor,
              sourceExit,
              { x: sourceSide, y: sourceExit.y },
              { x: sourceSide, y: outerY },
              { x: targetSide, y: outerY },
              { x: targetSide, y: targetEntry.y },
              targetEntry,
              targetAnchor,
            ], true);
          });
        });
      });
      edgeInfo.route = "points";
      edgeInfo.routePoints = bestPoints;
      bestSegments.forEach(function (segment) {
        segment.pathIndex = edgeInfo.pathIndex;
        addRouteSegment(segmentIndex, segment);
      });
      bestPoints.forEach(function (point) {
        graph.routeLeft = Math.min(graph.routeLeft, point.x);
        graph.routeRight = Math.max(graph.routeRight, point.x);
        graph.routeTop = Math.min(graph.routeTop, point.y);
        graph.routeBottom = Math.max(graph.routeBottom, point.y);
      });
    });
  }

  function compactRoutePoints(points) {
    return points.filter(function (point, index) {
      return !index || point.x !== points[index - 1].x || point.y !== points[index - 1].y;
    });
  }

  function routeSegments(points) {
    var segments = [];
    for (var index = 1; index < points.length; index += 1) {
      var start = points[index - 1], end = points[index];
      if (start.x === end.x && start.y === end.y) continue;
      segments.push({
        x1: Math.min(start.x, end.x),
        x2: Math.max(start.x, end.x),
        y1: Math.min(start.y, end.y),
        y2: Math.max(start.y, end.y),
        vertical: start.x === end.x,
      });
    }
    return segments;
  }

  function routeObstacleCount(segments, obstacles) {
    var collisions = 0;
    segments.forEach(function (segment) {
      obstacles.forEach(function (obstacle) {
        if (routeSegmentHitsObstacle(segment, obstacle)) collisions += 1;
      });
    });
    return collisions;
  }

  function routeSegmentHitsObstacle(segment, obstacle) {
    if (segment.vertical) {
      return segment.x1 > obstacle.left - 5 && segment.x1 < obstacle.right + 5 &&
        segment.y2 > obstacle.top - 5 && segment.y1 < obstacle.bottom + 5;
    }
    return segment.y1 > obstacle.top - 5 && segment.y1 < obstacle.bottom + 5 &&
      segment.x2 > obstacle.left - 5 && segment.x1 < obstacle.right + 5;
  }

  function createRouteObstacleIndex(obstacles, cellSize) {
    var index = { cells: {}, cellSize: cellSize, obstacles: obstacles };
    obstacles.forEach(function (obstacle, obstacleIndex) {
      var left = Math.floor((obstacle.left - 5) / cellSize);
      var right = Math.floor((obstacle.right + 5) / cellSize);
      var top = Math.floor((obstacle.top - 5) / cellSize);
      var bottom = Math.floor((obstacle.bottom + 5) / cellSize);
      for (var x = left; x <= right; x += 1) {
        for (var y = top; y <= bottom; y += 1) {
          var key = x + ":" + y;
          (index.cells[key] = index.cells[key] || []).push(obstacleIndex);
        }
      }
    });
    return index;
  }

  function indexedRouteObstacleCount(segments, index, excluded) {
    var collisions = 0;
    segments.forEach(function (segment) {
      var seen = {};
      routeSegmentCells(segment, index.cellSize, 5).forEach(function (key) {
        (index.cells[key] || []).forEach(function (obstacleIndex) {
          if (seen[obstacleIndex]) return;
          seen[obstacleIndex] = true;
          var obstacle = index.obstacles[obstacleIndex];
          if (excluded[obstacle.id]) return;
          if (routeSegmentHitsObstacle(segment, obstacle)) collisions += 1;
        });
      });
    });
    return collisions;
  }

  function createRouteSegmentIndex(cellSize) {
    return { cells: {}, cellSize: cellSize };
  }

  function addRouteSegment(index, segment) {
    var orientation = segment.vertical ? "vertical" : "horizontal";
    var laneKey = String(segment.vertical ? segment.x1 : segment.y1);
    routeSegmentCells(segment, index.cellSize, 0).forEach(function (key) {
      var cell = index.cells[key] = index.cells[key] || {
        vertical: routeUsage(),
        horizontal: routeUsage(),
      };
      var usage = cell[orientation];
      addRouteUsage(usage, segment.pathIndex);
      var lane = usage.lanes[laneKey] = usage.lanes[laneKey] || routeUsage();
      addRouteUsage(lane, segment.pathIndex);
    });
  }

  function routeUsage() {
    return { total: 0, colors: {}, lanes: {} };
  }

  function addRouteUsage(usage, pathIndex) {
    var colorKey = String(pathIndex);
    usage.total += 1;
    usage.colors[colorKey] = (usage.colors[colorKey] || 0) + 1;
  }

  function routeSegmentCells(segment, cellSize, padding) {
    var left = Math.floor((segment.x1 - padding) / cellSize);
    var right = Math.floor((segment.x2 + padding) / cellSize);
    var top = Math.floor((segment.y1 - padding) / cellSize);
    var bottom = Math.floor((segment.y2 + padding) / cellSize);
    var cells = [];
    for (var x = left; x <= right; x += 1) {
      for (var y = top; y <= bottom; y += 1) cells.push(x + ":" + y);
    }
    return cells;
  }

  function uniqueRouteValues(values) {
    var seen = {};
    return values.filter(function (value) {
      var key = String(value);
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    }).sort(function (left, right) { return left - right; });
  }

  function nearestRouteValues(values, target, limit) {
    var low = 0, high = values.length;
    while (low < high) {
      var middle = Math.floor((low + high) / 2);
      if (values[middle] < target) low = middle + 1;
      else high = middle;
    }
    var left = low - 1, right = low, nearest = [];
    while (nearest.length < limit && (left >= 0 || right < values.length)) {
      if (left < 0) nearest.push(values[right++]);
      else if (right >= values.length) nearest.push(values[left--]);
      else if (Math.abs(values[left] - target) <= Math.abs(values[right] - target)) nearest.push(values[left--]);
      else nearest.push(values[right++]);
    }
    return nearest;
  }

  function routeLength(segments) {
    return segments.reduce(function (length, segment) {
      return length + segment.x2 - segment.x1 + segment.y2 - segment.y1;
    }, 0);
  }

  // Each occupied spatial cell stores aggregate lane and colour counts. Route
  // scoring therefore stays bounded even when thousands of edges share one
  // outer corridor; denser cells simply receive a larger penalty.
  function routeInteractionCost(segments, index, pathIndex) {
    var cost = 0;
    var colorKey = String(pathIndex);
    segments.forEach(function (segment) {
      var orientation = segment.vertical ? "vertical" : "horizontal";
      var crossingOrientation = segment.vertical ? "horizontal" : "vertical";
      var laneKey = String(segment.vertical ? segment.x1 : segment.y1);
      routeSegmentCells(segment, index.cellSize, 0).forEach(function (key) {
        var cell = index.cells[key];
        if (!cell) return;
        var sameLane = cell[orientation].lanes[laneKey];
        if (sameLane) {
          var sameLaneColor = sameLane.colors[colorKey] || 0;
          cost += sameLaneColor * 45 + (sameLane.total - sameLaneColor) * 220;
        }
        var crossing = cell[crossingOrientation];
        var crossingColor = crossing.colors[colorKey] || 0;
        cost += crossingColor * 8 + (crossing.total - crossingColor) * 24;
      });
    });
    return cost;
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
      items.forEach(function (item) {
        item.w = layerWidth;
        item.card.width = layerWidth;
        item.card.chars = Math.floor((layerWidth - 32) / 6.3);
      });
      var totalHeight = items.reduce(function (height, item) { return height + item.h; }, 0) + (items.length - 1) * 30;
      var y = -totalHeight / 2;
      items.forEach(function (item) {
        item.layer = layerIndex;
        item.cx = x + layerWidth / 2;
        item.cy = y + item.h / 2;
        y += item.h + 30;
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
      var laneOffsets = coloredLaneOffsets(laneEdges, 5, 3);
      var laneSpan = laneOffsets.length > 1 ? laneOffsets[laneOffsets.length - 1] - laneOffsets[0] : 0;
      x += layerWidth + Math.max(72, laneSpan + 36);
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
      var laneOffsets = coloredLaneOffsets(laneEdges, 5, 3);
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
    var outerLaneOffsets = coloredLaneOffsets(outerLaneEdges, 5, 3);
    var outerLaneStart = outerLaneOffsets.length ? outerLaneOffsets[0] : 0;
    outerLaneKeys.forEach(function (key, index) {
      outerLanes[key].forEach(function (edgeInfo) {
        edgeInfo.route = "outer";
        edgeInfo.routeY = graphTop - 24 - (outerLaneOffsets[index] - outerLaneStart);
      });
    });
    graph.routeTop = outerLaneKeys.length
      ? graphTop - 24 - (outerLaneOffsets[outerLaneOffsets.length - 1] - outerLaneStart)
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
      edgeInfo.sourceRailX = edgeInfo.sourceSide > 0
        ? sourceBounds.right + 16 + edgeInfo.sourceRailOffset
        : sourceBounds.left - 16 - edgeInfo.sourceRailOffset;
      edgeInfo.targetRailX = edgeInfo.targetSide > 0
        ? targetBounds.right + 16 + edgeInfo.targetRailOffset
        : targetBounds.left - 16 - edgeInfo.targetRailOffset;
      graph.routeLeft = Math.min(graph.routeLeft, edgeInfo.sourceRailX, edgeInfo.targetRailX);
      graph.routeRight = Math.max(graph.routeRight, edgeInfo.sourceRailX, edgeInfo.targetRailX);
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
        edgeInfo[property] = index * 5;
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

    var available = 1200;
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
        innerColumns = Math.max(1, Math.min(12, Math.round(Math.sqrt(
          groupItems.length * 1.6 * (NODE_H + 30) / (maxWidth + 22)
        ))));
        maxGroupWidth = innerColumns * maxWidth + (innerColumns - 1) * 22 + 40;
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
          var chunkHeight = chunk.reduce(function (height, item) { return Math.max(height, item.h); }, NODE_H);
          var localX = -contentWidth / 2;
          chunk.forEach(function (item) {
            item.localX = localX + item.w / 2;
            item.localY = localY + item.h / 2;
            item.layer = layerInfo.index;
            localX += item.w + 22;
          });
          localY += chunkHeight + 30;
        }
      });
      var usedWidth = Math.max.apply(null, groupItems.map(function (item) {
        return Math.abs(item.localX) * 2 + item.w;
      }));
      methodGroup.width = graph.kind === "pipeline-overview"
        ? Math.max(280, usedWidth + 40)
        : Math.min(available, Math.max(280, usedWidth + 40));
      methodGroup.height = localY + 2;
    });

    var leftEdge = -available / 2;
    graph.leftEdge = leftEdge;
    var cursorX = leftEdge;
    var cursorY = 0;
    var rowHeight = 0;
    if (graph.kind === "pipeline-overview") {
      var packing = packRegions(graph.groups.map(function (methodGroup, index) {
        return { id: methodGroup.id, width: methodGroup.width, height: methodGroup.height, order: index };
      }), groupGap, 1.6);
      available = Math.max(available, packing.width);
      graph.leftEdge = -packing.width / 2;
      graph.groups.forEach(function (methodGroup) {
        var placement = packing.placements[methodGroup.id];
        methodGroup.left = graph.leftEdge + placement.x;
        methodGroup.top = placement.y;
        methodGroup.bottom = placement.y + methodGroup.height;
        methodGroup.headerY = placement.y + 25;
        methodGroup.items.forEach(function (item) {
          item.cx = methodGroup.left + methodGroup.width / 2 + item.localX;
          item.cy = methodGroup.top + item.localY;
        });
      });
      cursorY = packing.height;
    } else {
      graph.groups.forEach(function (methodGroup) {
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
    }

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
      var freeHeight = freeRow.reduce(function (height, item) { return Math.max(height, item.h); }, NODE_H);
      var freeX = -freeWidth / 2;
      freeRow.forEach(function (item) {
        item.cx = freeX + item.w / 2;
        item.cy = freeY + item.h / 2;
        item.layer = Math.floor(freeStart / freeColumns);
        freeX += item.w + 28;
      });
      freeY += freeHeight + 34;
    }
    graph.freeBottom = freeItems.length ? freeY - 34 : graph.freeTop;
  }

  // Best-fit shelves keep variable-sized pipeline compartments in a compact
  // rectangle. Several deterministic widths are evaluated so one unusually
  // large pipeline does not force every smaller pipeline into a column.
  function packRegions(regions, gap, targetAspect) {
    if (!regions.length) return { width: 0, height: 0, placements: {} };
    var area = regions.reduce(function (sum, region) {
      return sum + (region.width + gap) * (region.height + gap);
    }, 0);
    var maximumWidth = regions.reduce(function (maximum, region) {
      return Math.max(maximum, region.width);
    }, 0);
    var baseWidth = Math.max(maximumWidth, Math.sqrt(area * targetAspect));
    var best = null;
    [0.8, 1, 1.2, 1.4, 1.6, 1.8].forEach(function (factor) {
      var targetWidth = Math.max(maximumWidth, baseWidth * factor);
      var shelves = [];
      var placements = {};
      regions.slice().sort(function (left, right) {
        return right.height - left.height || right.width - left.width || left.order - right.order;
      }).forEach(function (region) {
        var shelf = null, remaining = Infinity;
        shelves.forEach(function (candidate) {
          var nextX = candidate.used ? candidate.used + gap : 0;
          var unused = targetWidth - nextX - region.width;
          if (unused >= 0 && unused < remaining) {
            shelf = candidate;
            remaining = unused;
          }
        });
        if (!shelf) {
          var top = shelves.length
            ? shelves[shelves.length - 1].top + shelves[shelves.length - 1].height + gap
            : 0;
          shelf = { top: top, height: region.height, used: 0 };
          shelves.push(shelf);
        }
        var x = shelf.used ? shelf.used + gap : 0;
        placements[region.id] = { x: x, y: shelf.top };
        shelf.used = x + region.width;
      });
      var width = shelves.reduce(function (maximum, shelf) { return Math.max(maximum, shelf.used); }, 0);
      var lastShelf = shelves[shelves.length - 1];
      var height = lastShelf.top + lastShelf.height;
      var aspectError = Math.abs(width / Math.max(1, height) - targetAspect);
      var score = width * height * (1 + aspectError * 0.65);
      if (!best || score < best.score) {
        best = { width: width, height: height, placements: placements, score: score };
      }
    });
    return best;
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
    var rootIds = (methodGroup.rootIds || []).filter(function (id) { return present[id]; });
    var queue = rootIds.length
      ? rootIds.slice()
      : methodGroup.anchorId
        ? [methodGroup.anchorId]
        : ids.filter(function (id) { return incoming[id] === 0; });
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
    var prepared = prepareGraph();
    var graph = prepared.graph;
    var topologyChanged = prepared.topologyChanged;
    if (topologyChanged) fitView(graph);
    draw(graph);
    syncZoomReadout();
  }

  // Geometry is a function of topology, not selection. Reuse the laid-out
  // graph for emphasis-only interactions and copy over the fresh trace state.
  function prepareGraph() {
    var fresh = currentGraph();
    var topologyKey = graphTopologyKey(fresh);
    var topologyChanged = topologyKey !== lastTopologyKey || !lastLaidOutGraph;
    if (topologyChanged) {
      layout(fresh);
      lastLaidOutGraph = fresh;
      lastTopologyKey = topologyKey;
      return { graph: fresh, topologyChanged: true };
    }
    synchronizeTracePresentation(lastLaidOutGraph, fresh);
    return { graph: lastLaidOutGraph, topologyChanged: false };
  }

  function synchronizeTracePresentation(target, source) {
    ["center", "traceActive", "traceStart", "traceEnd", "traceVisualIds", "activeWorkflowId", "activePathIndex", "route", "noRoute"].forEach(function (property) {
      if (source[property] === undefined) delete target[property];
      else target[property] = source[property];
    });
    var sourceItems = {};
    source.items.forEach(function (item) { sourceItems[item.id] = item; });
    target.items.forEach(function (item) {
      var sourceItem = sourceItems[item.id] || {};
      ["traceOrder", "traceRole", "traceFile", "traceFunctionIds", "activeWorkflowId", "activePathIndex"].forEach(function (property) {
        if (sourceItem[property] === undefined) delete item[property];
        else item[property] = sourceItem[property];
      });
      if (!item.card) return;
      if (sourceItem.card && sourceItem.card.traceFunctionIds) {
        item.card.traceFunctionIds = sourceItem.card.traceFunctionIds;
      } else {
        delete item.card.traceFunctionIds;
      }
    });
    target.edges.forEach(function (edgeInfo, index) {
      var sourceEdge = source.edges[index] || {};
      ["inTrace", "pathIndex"].forEach(function (property) {
        if (sourceEdge[property] === undefined) delete edgeInfo[property];
        else edgeInfo[property] = sourceEdge[property];
      });
    });
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
      (graph.groups || []).map(function (groupInfo) {
        return groupInfo.id + ":" + (groupInfo.itemIds || []).slice().sort().join(",");
      }).join(";"),
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

    // Pipeline selection is an emphasis layer only: geometry remains fixed,
    // while nodes and paths outside the selected workflow recede.
    var lit = graph.traceActive && graph.traceVisualIds ? graph.traceVisualIds : null;
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
      makeSvgButton(title, "Select class " + methodGroup.label + "; double click to inspect source", function (event) {
        event.stopPropagation();
        selectObject(methodGroup.id, false);
      });
      bindDoubleClick(title, function () { selectObject(methodGroup.id, true); });
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
    var activeWorkflow = graph.activeWorkflowId && graph.workflowById[graph.activeWorkflowId];
    graph.groups.forEach(function (pipelineGroup, index) {
      var pathIndex = activeWorkflow && activeWorkflow.regionId === pipelineGroup.id
        ? activeWorkflow.colorIndex
        : pipelineGroup.colorIndex;
      var colorClass = " path-" + pathIndex;
      var contextClass = activeWorkflow && activeWorkflow.regionId !== pipelineGroup.id ? " workflow-context-region" : "";
      var typeClass = pipelineGroup.kind === "class" ? " class-workflow-compartment" : " function-workflow-compartment";
      var background = rect(pipelineGroup.width, pipelineGroup.height, "pipeline-compartment-box" + colorClass + typeClass + contextClass);
      background.setAttribute("x", pipelineGroup.left);
      background.setAttribute("y", pipelineGroup.top);
      layer.appendChild(background);
      layer.appendChild(text(
        pipelineGroup.left + 14,
        pipelineGroup.headerY,
        "pipeline-compartment-title" + colorClass + contextClass,
        (pipelineGroup.kind === "class" ? "CLASS WORKFLOWS " : "FUNCTION WORKFLOW ") +
          String(index + 1).padStart(2, "0") + " / " +
          truncate(pipelineGroup.label, Math.max(18, Math.floor((pipelineGroup.width - 190) / 6.3)))
      ));
      var count = text(
        pipelineGroup.left + pipelineGroup.width - 14,
        pipelineGroup.headerY,
        "pipeline-compartment-count" + contextClass,
        pipelineGroup.kind === "class"
          ? pipelineGroup.pipelineCount + " PUBLIC PATHS · " + pipelineGroup.itemIds.length + " NODES"
          : pipelineGroup.itemIds.length + " FUNCTIONS"
      );
      count.setAttribute("text-anchor", "end");
      layer.appendChild(count);
    });
    if (graph.freeItemIds.length) {
      layer.appendChild(text(
        graph.leftEdge,
        graph.freeHeaderY,
        "outside-functions-title pipeline-outside-title",
        "OUTSIDE PUBLIC PIPELINES / UNATTACHED · " + graph.freeItemIds.length
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
      makeSvgButton(label, "Select function " + row.name + "; double click to inspect source", function (event) {
        event.stopPropagation();
        selectFunction(row.id);
      });
      bindDoubleClick(label, function () { startTrace(row.id, true); });
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
      d = globalEdgePath(src, tgt, e);
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

  function globalEdgePath(source, target, edgeInfo) {
    if (edgeInfo.route === "corridor") {
      return "M" + source.x + "," + source.y +
        " H" + edgeInfo.routeX +
        " V" + target.y +
        " H" + target.x;
    }
    return "M" + source.x + "," + source.y +
      " H" + edgeInfo.sourceRailX +
      " V" + edgeInfo.routeY +
      " H" + edgeInfo.targetRailX +
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
    var pipelineIndex = it.activePathIndex === null || it.activePathIndex === undefined ? it.pipelineIndex : it.activePathIndex;
    var pipelineClass = it.isPipelineHead ? " pipeline-head path-" + pipelineIndex : "";
    var g = group("node " + statusClass(node) + traceClass + pipelineClass + (it.isConstructor ? " method-constructor" : "") + (on ? "" : " muted") + (it.id === center ? " center" : "") + (state.hovered === it.id ? " hover-link" : ""), it.cx - it.w / 2, it.cy - h / 2);
    g.setAttribute("data-function-focus", node.id);
    var r = rect(it.w, h, "");
    if (state.graphSelectionType === "function" && it.id === state.graphSelection) r.classList.add("selected-ring");
    if (state.graphPromptSelection.indexOf(it.id) >= 0) r.classList.add("graph-prompt-selected");
    g.appendChild(r);
    if (it.traceRole === "start" || it.traceRole === "end") {
      g.appendChild(text(0, -9, "trace-node-label", it.traceRole === "start" ? "ORIGIN" : "TARGET"));
    }
    g.appendChild(text(10, 18, "node-name", truncate(it.label, 24)));
    g.appendChild(text(10, 33, "node-meta", it.isPipelineHead ? "public pipeline head" : roleLabel(node)));
    makeSvgButton(g, "Select function " + (node.qualified_name || node.name) + "; double click to inspect source", function (event) {
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
    bindDoubleClick(g, function () { startTrace(node.id, true); });
    return g;
  }

  // One measured layout shared by the renderer and the sizing helpers, so
  // drawing and node dimensions can never drift apart.
  function objectCardLayout(object, options) {
    options = options || {};
    var LINE = 16;
    var rows = [];
    var rowY = {};
    var y = 60;
    function push(row) {
      row.y = y;
      rows.push(row);
      if (row.id) rowY[row.id] = row.y - 4;
      y += LINE;
    }
    function section(title) { y += 4; push({ kind: "section", text: title }); }
    function overflow(count, shown) {
      if (count > shown) push({ kind: "more", text: "+" + (count - shown) + " more" });
    }
    function isVisible(id) { return !id || !options.active || options.active[id]; }

    var ctor = object.constructor || { params: [], method_id: null };
    section("constructor");
    if (ctor.method_id && isVisible(ctor.method_id)) {
      push({ kind: "method", id: ctor.method_id, constructor: true, text: methodSignature(ctor.method_id, ctor.params) });
    } else {
      push({ kind: "text", text: "none" });
    }
    var fields = object.fields || [];
    fields.slice(0, 4).forEach(function (field) {
      var source = field.source_kind === "literal" ? "literal" : field.source_name || field.source_kind;
      var kind = field.collaborator_kind ? " (" + field.collaborator_kind + ")" : "";
      push({ kind: "text", text: field.name + " ← " + source + kind, collab: !!field.collaborator_kind });
    });
    overflow(fields.length, 4);

    var publicIds = objectMethodIds(object).filter(function (id) {
      return objectMethodVisibility[id] === "public" && isVisible(id);
    });
    var privateIds = objectMethodIds(object).filter(function (id) {
      return objectMethodVisibility[id] === "private" && isVisible(id);
    });
    var publicLimit = options.allMethods ? publicIds.length : 6;
    var privateLimit = options.allMethods ? privateIds.length : 4;
    section("public");
    if (!publicIds.length) push({ kind: "text", text: "none" });
    publicIds.slice(0, publicLimit).forEach(function (id) { push({ kind: "method", id: id, tick: true }); });
    overflow(publicIds.length, publicLimit);
    if (privateIds.length) {
      section("internal");
      privateIds.slice(0, privateLimit).forEach(function (id) { push({ kind: "method", id: id }); });
      overflow(privateIds.length, privateLimit);
    }

    var height = y + 8 + 29; // content + gap + state strip
    var longest = 18;
    rows.forEach(function (row) {
      var label = row.kind === "method" ? row.text || (nodeById[row.id] || { name: row.id }).name : row.text;
      longest = Math.max(longest, (label || "").length);
    });
    longest = Math.max(longest, object.name.length);
    var width = Math.min(360, Math.max(260, 36 + longest * 6.3));
    return { rows: rows, rowY: rowY, width: width, height: height, chars: Math.floor((width - 26) / 6.3) };
  }

  function objectCard(it) {
    if (!it.card) it.card = objectCardLayout(it.node);
    return it.card;
  }

  function objectBox(it, on) {
    var object = it.node;
    var card = objectCard(it);
    var h = card.height;
    var activePathIndex = it.activePathIndex === null || it.activePathIndex === undefined ? 0 : it.activePathIndex;
    var workflowClass = it.traceFunctionIds
      ? " object-workflow-active path-" + activePathIndex
      : "";
    var objectKindClass = it.isPipelineHead ? " class-workflow-object" : "";
    var g = group("node object-node" + objectKindClass + workflowClass + (on ? "" : " muted"), it.cx - it.w / 2, it.cy - h / 2);
    g.setAttribute("role", "group");
    g.setAttribute("aria-label", "Object " + object.name);
    var r = rect(it.w, h, "object-rect");
    if (state.graphSelectionType === "object" && it.id === state.graphSelection) r.classList.add("selected-ring");
    g.appendChild(r);
    var objectLabel = text(12, 18, "object-name", truncate(it.label, card.chars));
    objectLabel.setAttribute("data-object-focus", object.id);
    makeSvgButton(objectLabel, "Select object " + object.name + "; double click to inspect source", function (event) {
      event.stopPropagation();
      selectObject(object.id, false);
    });
    bindDoubleClick(objectLabel, function () { selectObject(object.id, true); });
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
        var pathIndex = it.methodPathIndex && it.methodPathIndex[row.id];
        var rowClass = row.tick ? "object-method public workflow-head" : "object-method";
        if (it.traceFunctionIds) {
          if (it.traceFunctionIds[row.id]) {
            rowClass += " workflow-active path-" + activePathIndex;
          } else {
            if (pathIndex !== undefined) rowClass += " path-" + pathIndex;
            rowClass += " workflow-muted";
          }
        } else if (pathIndex !== undefined) {
          rowClass += " path-" + pathIndex;
        }
        if (state.graphSelectionType === "function" && state.graphSelection === row.id) rowClass += " selected";
        var methodLabel = row.text || node.name;
        var label = text(row.tick ? 12 : 24, row.y, rowClass, truncate(methodLabel, card.chars));
        label.setAttribute("data-function-focus", row.id);
        makeSvgButton(label, "Select method " + node.name + "; double click to inspect source", function (event) {
          event.stopPropagation();
          selectObjectMethod(object.id, row.id, false);
        });
        bindDoubleClick(label, function () { selectObjectMethod(object.id, row.id, true); });
        g.appendChild(label);
      } else {
        var cls = row.kind === "more" ? "object-more" : row.collab ? "object-mini-label collab" : "object-mini-label";
        g.appendChild(text(row.kind === "more" ? 24 : 12, row.y, cls, truncate(row.text, card.chars)));
      }
    });
    drawStateStrip(g, object, it.w, h, card.chars);

    g.addEventListener("click", function (event) {
      event.stopPropagation();
      selectObject(object.id, false);
    });
    bindDoubleClick(g, function () { selectObject(object.id, true); });
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
      p.setAttribute("data-src", edgeInfo.sourceFunction || edgeInfo.source);
      p.setAttribute("data-tgt", edgeInfo.targetFunction || edgeInfo.target);
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
    if (edgeInfo && edgeInfo.routePoints && edgeInfo.routePoints.length) {
      return edgeInfo.routePoints.reduce(function (path, point, index) {
        return path + (index ? " L" : "M") + point.x + "," + point.y;
      }, "");
    }
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
        ? graph.items.length + " nodes · " + graph.workflows.length + " workflows · " + graph.freeItemIds.length + " unattached"
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
      ? "Trace highlighted · double-click source · Shift-click a target · layout remains fixed"
      : graph.kind === "global"
        ? "Cross-file calls · click to highlight · double-click source · drag and zoom are manual"
        : graph.kind === "pipeline-overview"
          ? "Public workflows · click to highlight · double-click source · layout remains fixed"
        : "Click a function to highlight calls · double-click source · Shift-click sets a target";
  }

  function edgeLegend() {
    return '<div class="edge-legend" aria-label="' + PATH_COLORS.length + ' independent call path colours">' +
      '<span class="edge-legend-label">Path colours</span>' +
      '<span class="edge-legend-swatches">' + PATH_COLORS.map(function (_, index) {
        return '<span class="edge-legend-swatch path-' + index + '" aria-hidden="true"></span>';
      }).join("") + "</span>" +
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
    var sourceId = edgeInfo.sourceFunction || edgeInfo.source;
    var targetId = edgeInfo.targetFunction || edgeInfo.target;
    path.classList.add("graph-prompt-edge");
    path.setAttribute("data-edge-source", sourceId);
    path.setAttribute("data-edge-target", targetId);
    path.setAttribute("data-src", sourceId);
    path.setAttribute("data-tgt", targetId);
    if (state.graphPromptTarget && state.graphPromptTarget.type === "dependency" &&
        state.graphPromptTarget.sourceId === sourceId && state.graphPromptTarget.targetId === targetId) {
      path.classList.add("graph-prompt-edge-active");
    }
    makeSvgButton(path, "Comment on dependency from " + graphPromptFunctionName(sourceId) +
      " to " + graphPromptFunctionName(targetId), function (event) {
      event.stopPropagation();
      openGraphPromptTarget(graphPromptDependencyTarget(sourceId, targetId));
    });
  }

  function bindTraceEdge(path, edgeInfo) {
    var sourceId = edgeInfo.sourceFunction || edgeInfo.source;
    var targetId = edgeInfo.targetFunction || edgeInfo.target;
    var call = callByEdge[sourceId + ">" + targetId];
    var location = call ? " at line " + call.line : "";
    path.setAttribute("data-edge-source", sourceId);
    path.setAttribute("data-edge-target", targetId);
    function selectTraceCall(showDetail) {
      state.graphSelection = sourceId;
      state.graphSelectionType = "function";
      state.detailSelection = showDetail ? { type: "function", id: sourceId } : null;
      state.sourceRange = showDetail && call ? {
        symbolId: sourceId,
        anchorLine: call.line,
        startLine: call.line,
        endLine: call.line,
      } : null;
      writeHash();
      redraw(false);
      renderDetail();
      syncTreeSelection();
    }
    makeSvgButton(path, "Select call from " + graphPromptFunctionName(sourceId) +
      " to " + graphPromptFunctionName(targetId) + location + "; double click to inspect source", function (event) {
      event.stopPropagation();
      selectTraceCall(false);
    });
    bindDoubleClick(path, function () { selectTraceCall(true); });
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
      ["graph", "Graph"],
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
      ["navigation", "Files"],
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
    if (!isWorkspace(workspace) || state.workspace === workspace) return;
    recordNavigation();
    clearGraphPromptState();
    clearTraceState();
    state.workspace = workspace;
    if (workspace === "graph") {
      state.scope = tree.path;
      state.mode = "global";
      state.focus = null;
      state.graphSelection = null;
      state.graphSelectionType = null;
      state.detailSelection = null;
      state.objectFocus = null;
      state.hovered = null;
    }
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
    viewPanel.hidden = state.sidebarTab !== "pages";
    treePanel.hidden = state.sidebarTab !== "navigation";
    if (state.sidebarTab === "navigation") renderTree();
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
      scope: state.scope,
      mode: state.mode,
      globalView: state.globalView,
      focus: state.focus,
      graphSelection: state.graphSelection,
      graphSelectionType: state.graphSelectionType,
      detailSelection: state.detailSelection && { type: state.detailSelection.type, id: state.detailSelection.id },
      objectFocus: state.objectFocus,
      traceStart: state.traceStart,
      traceEnd: state.traceEnd,
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
    state.scope = snapshot.scope;
    state.mode = snapshot.mode;
    state.globalView = snapshot.globalView || "files";
    state.focus = snapshot.focus;
    state.graphSelection = snapshot.graphSelection;
    state.graphSelectionType = snapshot.graphSelectionType;
    state.detailSelection = snapshot.detailSelection;
    state.objectFocus = snapshot.objectFocus || null;
    state.traceStart = snapshot.traceStart || null;
    state.traceEnd = snapshot.traceEnd || null;
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
    treePanel.querySelectorAll("[data-toggle-graph-node]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        var path = button.getAttribute("data-toggle-graph-node");
        toggleGraphNode(path);
        focusTreeItem("data-toggle-graph-node", path);
      });
    });
    treePanel.querySelectorAll("[data-solo-graph-node]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        var path = button.getAttribute("data-solo-graph-node");
        soloGraphNode(path);
        focusTreeItem("data-solo-graph-node", path);
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
    var hasChildren = node.children.length;
    var graphState = graphNodeState(node);
    var twirl = hasChildren
      ? '<button type="button" class="twirl" aria-expanded="' + !!open + '" aria-label="' +
        (open ? "Collapse " : "Expand ") + escapeAttr(node.path || "all") + '" data-twirl="' + escapeAttr(node.path) + '">' + (open ? "▾" : "▸") + "</button>"
      : '<span class="twirl empty"></span>';
    var html =
      '<div class="trow' + (graphState === "off" ? " graph-off" : graphState === "mixed" ? " graph-mixed" : "") + '" role="listitem" aria-level="' + (depth + 1) + '" data-path="' + escapeAttr(node.path) + '" style="--d:' + depth + '">' +
        twirl +
        '<button type="button" class="trow-action" aria-label="Open ' + escapeAttr(node.path || "all") + '" data-scope="' + escapeAttr(node.path) + '">' +
          '<span class="tname">' + escape(node.path === "" ? "all" : node.name) + (node.type === "package" ? "/" : "") + "</span>" +
          treeBadges(node.rollup) +
        "</button>" + graphNodeToggle(node, graphState) +
      "</div>";
    if (open) {
      node.children.forEach(function (child) { html += treeRows(child, depth + 1); });
    }
    return html;
  }

  function graphNodeToggle(node, graphState) {
    if (!node.path) return "";
    var functionIds = functionIdsByTreePath[node.path];
    var hasFunctions = functionIds.length > 0;
    var nodeKind = node.type === "module" ? "file" : "folder";
    var action = graphState === "off" ? "Add " + nodeKind + " to graph" : "Remove " + nodeKind + " from graph";
    var label = graphState === "mixed" ? "MIX" : graphState === "on" ? "ON" : "OFF";
    var pressed = graphState === "mixed" ? "mixed" : String(graphState === "on");
    var nodeLabel = node.path || "all";
    var unavailableLabel = "No analyzed functions in " + nodeLabel;
    var toggle = '<button type="button" class="graph-toggle ' + graphState +
      '" data-toggle-graph-node="' + escapeAttr(node.path) + '" aria-pressed="' + pressed + '" aria-label="' +
      escapeAttr(hasFunctions ? action + " " + nodeLabel : unavailableLabel) + '" title="' +
      escapeAttr(hasFunctions ? action : "No analyzed functions") + '"' + (hasFunctions ? "" : " disabled") + ">" + label + "</button>";
    var soloActive = state.soloPath === node.path;
    var solo = '<button type="button" class="graph-solo' + (soloActive ? " active" : "") +
      '" data-solo-graph-node="' + escapeAttr(node.path) + '" aria-pressed="' + soloActive + '" aria-label="' +
      escapeAttr(hasFunctions ? "Show only " + nodeLabel + " in graph" : unavailableLabel) + '" title="' +
      escapeAttr(hasFunctions ? "Show only this " + nodeKind : "No analyzed functions") + '"' +
      (hasFunctions ? "" : " disabled") + ">SOLO</button>";
    return '<span class="graph-toggle-actions">' + toggle + solo + "</span>";
  }

  function graphNodeState(node) {
    var functionIds = functionIdsByTreePath[node.path];
    if (!functionIds.length) return "empty";
    var activeCount = functionIds.filter(function (id) { return !state.disabled[id]; }).length;
    if (!activeCount) return "off";
    return activeCount === functionIds.length ? "on" : "mixed";
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
      var scoped = path === state.scope;
      var selected = state.graphSelectionType === "file" && path === state.graphSelection;
      row.classList.toggle("scoped", scoped);
      row.classList.toggle("active", selected);
      if (scopeAction && scoped) scopeAction.setAttribute("aria-current", "location");
      else if (scopeAction) scopeAction.removeAttribute("aria-current");
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
    startTrace(id, false);
  }

  function startTrace(id, showDetail) {
    if (!activeTraceFunction(id)) return;
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
    state.detailSelection = showDetail ? { type: "function", id: id } : null;
    state.sourceRange = null;
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
      startTrace(id, false);
      return;
    }
    state.traceEnd = id;
    state.workspace = "graph";
    state.focus = null;
    state.objectFocus = null;
    state.graphSelection = id;
    state.graphSelectionType = "function";
    state.detailSelection = null;
    state.sourceRange = null;
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
    state.detailSelection = null;
    state.sourceRange = null;
    rerender();
  }

  function clearTrace() {
    clearGraphSelection();
  }

  function clearTraceState() {
    state.traceStart = null;
    state.traceEnd = null;
  }

  function toggleGraphNode(path) {
    var graphNode = treeByPath[path];
    if (!graphNode) return;
    var functionIds = functionIdsByTreePath[path];
    if (!functionIds.length) return;
    clearGraphPromptState();
    state.soloPath = null;
    var enable = graphNodeState(graphNode) === "off";
    functionIds.forEach(function (id) {
      if (enable) delete state.disabled[id];
      else state.disabled[id] = true;
    });
    clearInactiveGraphState();
    rerender();
  }

  function soloGraphNode(path) {
    var graphNode = treeByPath[path];
    if (!graphNode) return;
    var functionIds = functionIdsByTreePath[path];
    if (!functionIds.length) return;
    clearGraphPromptState();
    var visibleFunctions = setOf(functionIds);
    model.nodes.forEach(function (node) {
      if (visibleFunctions[node.id]) delete state.disabled[node.id];
      else state.disabled[node.id] = true;
    });
    state.soloPath = path;
    clearInactiveGraphState();
    rerender();
  }

  function graphTargetIsActive(type, id) {
    if (type === "function") return !!nodeById[id] && !state.disabled[id];
    if (type === "file") return !!treeByPath[id] && graphNodeState(treeByPath[id]) !== "off";
    if (type === "object") {
      var object = objectById[id];
      return !!object && !!treeByPath[object.module] && graphNodeState(treeByPath[object.module]) !== "off";
    }
    return false;
  }

  function clearInactiveGraphState() {
    if (state.disabled[state.traceStart] || state.disabled[state.traceEnd]) clearTraceState();
    if (state.graphSelection && !graphTargetIsActive(state.graphSelectionType, state.graphSelection)) {
      state.graphSelection = null;
      state.graphSelectionType = null;
    }
    if (state.detailSelection && !graphTargetIsActive(state.detailSelection.type, state.detailSelection.id)) {
      state.detailSelection = null;
      state.sourceRange = null;
      detailReturnFocus = null;
    }
    if (state.disabled[state.hovered]) state.hovered = null;
    if (state.disabled[state.focus]) state.focus = null;
    if (state.lastFunctionClick && state.disabled[state.lastFunctionClick.id]) state.lastFunctionClick = null;
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
      var maximum = Math.max(360, shellWidth - 360);
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

  function selectObject(id, showDetail) {
    if (!objectById[id]) return;
    clearGraphPromptState();
    clearTraceState();
    state.graphSelection = id;
    state.workspace = "graph";
    state.graphSelectionType = "object";
    state.detailSelection = showDetail ? { type: "object", id: id } : null;
    state.sourceRange = null;
    state.objectFocus = null;
    state.hovered = null;
    state.focus = null;
    if (state.mode !== "global") {
      state.mode = "objects";
      state.scope = objectById[id].module;
      expandTo(state.scope);
    }
    rerender();
  }

  function selectObjectMethod(objectId, methodId, showDetail) {
    var object = objectById[objectId];
    if (!object || objectMethodIds(object).indexOf(methodId) < 0 || !nodeById[methodId]) return;
    if (state.mode !== "global") {
      state.mode = "objects";
      state.scope = object.module;
    }
    startTrace(methodId, showDetail);
  }

  // --- source inspector ---------------------------------------------------

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
    panel.querySelector(".detail-close").addEventListener("click", hideDetail);
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

  function hideDetail() {
    var closedSelection = state.detailSelection;
    resetInlinePrompt();
    state.detailSelection = null;
    state.sourceRange = null;
    rerender();
    restoreDetailFocus(closedSelection);
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
    restoreDetailFocus(closedSelection);
  }

  function restoreDetailFocus(closedSelection) {
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
    card.querySelector(".detail-close").addEventListener("click", hideDetail);
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
    if ((graph.kind === "global" || graph.kind === "pipeline-overview" || graph.kind === "function") && Number.isFinite(graph.routeLeft)) {
      minX = Math.min(minX, graph.routeLeft);
      maxX = Math.max(maxX, graph.routeRight);
      if (Number.isFinite(graph.routeTop)) minY = Math.min(minY, graph.routeTop);
      if (Number.isFinite(graph.routeBottom)) maxY = Math.max(maxY, graph.routeBottom);
    }
    var rect = canvas.getBoundingClientRect();
    var w = rect.width || 900, h = rect.height || 700;
    var toolbar = document.querySelector(".toolbar");
    var topInset = Math.max(MARGIN, (toolbar ? toolbar.getBoundingClientRect().height : 0) + 12);
    var leftInset = MARGIN;
    var availableWidth = Math.max(1, w - leftInset - MARGIN);
    var availableHeight = Math.max(1, h - topInset - MARGIN);
    var scale = Math.min(availableWidth / Math.max(1, maxX - minX), availableHeight / Math.max(1, maxY - minY), 1);
    view.scale = Math.max(scale, 0.01);
    var contentW = (maxX - minX) * view.scale;
    view.x = leftInset + (availableWidth - contentW) / 2 - minX * view.scale;
    var contentH = (maxY - minY) * view.scale;
    view.y = contentH < availableHeight
      ? topInset + (availableHeight - contentH) / 2 - minY * view.scale
      : topInset - minY * view.scale;
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
    var next = Math.min(2.5, Math.max(0.01, view.scale * factor));
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
    var prepared = prepareGraph();
    var graph = prepared.graph;
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
  function bindDoubleClick(element, activate) {
    element.addEventListener("dblclick", function (event) {
      event.stopPropagation();
      activate(event);
    });
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
    PATH_COLORS.forEach(function (color, index) {
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
