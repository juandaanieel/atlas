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
    return ["scope", "mode", "graph", "sel", "focus", "source", "objectFocus"].some(function (key) {
      return Object.prototype.hasOwnProperty.call(params, key);
    });
  }

  function serializeHash(state) {
    var parts = ["workspace=" + encodeURIComponent(state.workspace)];
    if (state.navigationSurface !== "city") parts.push("nav=" + state.navigationSurface);
    if (state.scope) parts.push("scope=" + encodeURIComponent(state.scope));
    if (state.mode !== "functions") parts.push("mode=" + state.mode);
    if (state.graphSelection) {
      parts.push("graph=" + encodeURIComponent(state.graphSelection));
      parts.push("type=" + state.graphSelectionType);
    }
    if (state.focus) parts.push("focus=" + encodeURIComponent(state.focus));
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

  global.AtlasCore = Object.freeze({
    buildReviewPrompt: buildReviewPrompt,
    combineReviewPrompts: combineReviewPrompts,
    hasLegacyGraphHashState: hasLegacyGraphHashState,
    parseHash: parseHash,
    serializeHash: serializeHash,
  });
})(window);
