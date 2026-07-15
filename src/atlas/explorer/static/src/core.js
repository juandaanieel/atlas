// Pure helpers for the Atlas explorer. This classic script deliberately uses
// a window namespace so generated file:// reports need no module loader.
(function (global) {
  "use strict";

  function parseHash(hash) {
    var raw = String(hash || "").replace(/^#/, "");
    var params = {};
    if (!raw) return params;
    raw.split("&").forEach(function (pair) {
      var separator = pair.indexOf("=");
      if (separator > 0) {
        params[pair.slice(0, separator)] = decodeHashValue(pair.slice(separator + 1));
      }
    });
    return params;
  }

  function decodeHashValue(value) {
    try {
      return decodeURIComponent(value);
    } catch (error) {
      return value;
    }
  }

  function hasLegacyGraphHashState(params) {
    return ["scope", "mode", "globalView", "graph", "sel", "focus", "source", "objectFocus", "traceStart", "traceEnd"].some(function (key) {
      return Object.prototype.hasOwnProperty.call(params, key);
    });
  }

  function serializeHash(state) {
    var parts = ["workspace=" + encodeURIComponent(state.workspace)];
    if (state.navigationSurface !== "city") parts.push("nav=" + state.navigationSurface);
    if (state.scope) parts.push("scope=" + encodeURIComponent(state.scope));
    if (state.workspace === "graph" || state.mode !== "functions") parts.push("mode=" + state.mode);
    if (state.mode === "global" && state.globalView === "pipelines") parts.push("globalView=pipelines");
    if (state.graphSelection) {
      parts.push("graph=" + encodeURIComponent(state.graphSelection));
      parts.push("type=" + state.graphSelectionType);
    }
    if (state.traceStart) parts.push("traceStart=" + encodeURIComponent(state.traceStart));
    if (state.traceEnd) parts.push("traceEnd=" + encodeURIComponent(state.traceEnd));
    if (state.cityPath) parts.push("city=" + encodeURIComponent(state.cityPath));
    if (state.mapSelection) {
      parts.push("map=" + encodeURIComponent(state.mapSelection.path));
      parts.push("mapType=" + state.mapSelection.kind);
    }
    if (state.objectFocus) parts.push("objectFocus=" + encodeURIComponent(state.objectFocus));
    if (state.detailSelection) {
      if (state.detailSelection.type === "function") {
        parts.push("source=" + encodeURIComponent(state.detailSelection.id));
      } else {
        parts.push("detail=" + encodeURIComponent(state.detailSelection.id));
        parts.push("detailType=object");
      }
    }
    return "#" + parts.join("&");
  }

  function buildReviewPrompt(context) {
    return [
      "--------",
      "File: " + context.file,
      "Line: " + lineRange(context.target),
      "Involved functions:",
    ].concat(context.involvedFunctions).concat([
      "Comment:",
      context.comment,
      "--------",
    ]).join("\n");
  }

  function lineRange(target) {
    return target.startLine === target.endLine
      ? String(target.startLine)
      : target.startLine + "–" + target.endLine;
  }

  function combineReviewPrompts(prompts) {
    if (!prompts.length) return "";
    return prompts.join("\n\n") +
      "\n\nNote: Related functions include only statically resolved callers and callees. Verify indirect, dynamic, and external use separately.";
  }

  function shortestDirectedPath(edges, sourceId, targetId, disabled) {
    if (sourceId === targetId) return [sourceId];
    var outgoing = {};
    edges.forEach(function (edge) {
      if (disabled[edge.source] || disabled[edge.target]) return;
      (outgoing[edge.source] = outgoing[edge.source] || []).push(edge.target);
    });
    Object.keys(outgoing).forEach(function (id) { outgoing[id].sort(); });

    var previous = {};
    var visited = {};
    var queue = [sourceId];
    visited[sourceId] = true;
    for (var index = 0; index < queue.length; index += 1) {
      var source = queue[index];
      var targets = outgoing[source] || [];
      for (var targetIndex = 0; targetIndex < targets.length; targetIndex += 1) {
        var target = targets[targetIndex];
        if (visited[target]) continue;
        visited[target] = true;
        previous[target] = source;
        if (target === targetId) return restorePath(previous, sourceId, targetId);
        queue.push(target);
      }
    }
    return null;
  }

  function restorePath(previous, sourceId, targetId) {
    var path = [targetId];
    while (path[0] !== sourceId) path.unshift(previous[path[0]]);
    return path;
  }

  global.AtlasCore = Object.freeze({
    buildReviewPrompt: buildReviewPrompt,
    combineReviewPrompts: combineReviewPrompts,
    hasLegacyGraphHashState: hasLegacyGraphHashState,
    parseHash: parseHash,
    serializeHash: serializeHash,
    shortestDirectedPath: shortestDirectedPath,
  });
})(window);
