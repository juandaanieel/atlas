"""Resolve validated story chapters into camera frames and highlighted symbols."""
from __future__ import annotations

from collections import defaultdict, deque

CONTEXT_DEPTH = {"0": 0, "1": 1, "2": 2, "all": None}
# A pipeline step whose reach leaves the root's row
# frames the whole reach from the raised Elevation when the off-row part is more than STUB_SHARE of
# the reach; otherwise it faces the root's row and every call that leaves the row ends in a labelled
# pill at the card edge (callee and package), with no line drawn off the row
STUB_SHARE = 1 / 4
SPAN_MARK = {"plate": "link_track", "row": "link_row", "cross_row": "link_arc"}

def build_guide(view, story):
    package = view["package"]
    N = {n["id"]: n for n in view["nodes"]}
    CLS = {c["id"]: c for c in view["classes"]}
    PANE = {p["module"]: p for p in view["panes"]}
    DIST = {d["package"]: d for d in view["districts"]}
    edges = view["edges"]
    out_edges = defaultdict(list)
    for k, e in enumerate(edges):
        if e["t"] in N:
            out_edges[e["s"]].append(k)
    for s in out_edges:
        out_edges[s].sort(key=lambda k: (edges[k]["t"], k))
    pane_order = {p["module"]: (p["row"], p["x"]) for p in view["panes"]}

    def drawn(i):
        return (i in N and N[i]["module"] in PANE) or i in CLS

    def short(i):
        if i in CLS:
            return CLS[i]["name"]
        n = N[i]
        return f"{CLS[n['cls']]['name']}.{n['name']}" if n["cls"] in CLS else n["name"]

    def module_name(m):
        return PANE[m]["name"] + ".py"

    def scope_of(path):
        """Story scope path -> Strata scope. The package root and '' are the whole map."""
        if not path or path == package:
            return None
        parts = path.split(".")
        while parts:
            p = ".".join(parts)
            if p in PANE:
                return {"kind": "module", "id": p}
            if p in DIST and p != package:
                return {"kind": "package", "id": p}
            parts.pop()
        return None

    def reach_from(root, same_module=False, cap=None):
        """BFS depth over resolved calls (the explorer's reach), optionally inside one module."""
        depth = {root: 0}
        queue = deque([root])
        while queue:
            u = queue.popleft()
            if cap is not None and depth[u] >= cap:
                continue
            for k in out_edges[u]:
                e = edges[k]
                if same_module and e["ms"] != e["mt"]:
                    continue
                if e["t"] not in depth:
                    depth[e["t"]] = depth[u] + 1
                    queue.append(e["t"])
        return depth

    def lit_edges(depth, same_module=False):
        """The calls a lit set draws: both ends lit, or a construction by a lit function."""
        out, classes = {}, set()
        for k, e in enumerate(edges):
            if same_module and e["ms"] != e["mt"]:
                continue
            if e["kind"] == "constructs":
                if e["s"] in depth:
                    out[k] = depth[e["s"]] + 1
                    classes.add(e["cls"])
            elif e["s"] in depth and e["t"] in depth:
                out[k] = max(0, depth[e["s"]] + 1)
        classes |= {N[i]["cls"] for i in depth if N[i]["cls"] in CLS}
        return out, classes

    def class_lit(cid, cross_file):
        """A class chapter lights the class's methods, its own calls, and its direct collaborators."""
        cl = CLS[cid]
        methods = [m for m in cl["public"] + cl["private"] + cl["dead_private"] if m in N]
        mset = set(methods)
        depth = {m: 0 for m in methods}
        out = {}
        for k, e in enumerate(edges):
            if not cross_file and e["ms"] != e["mt"]:
                continue
            s, t = e["s"], e["t"]
            if e["kind"] == "constructs":
                if e["cls"] == cid:
                    out[k] = 0
                    depth.setdefault(s, -1)
            elif s in mset and t in mset:
                out[k] = 1
            elif s in mset and t in N:
                out[k] = 1
                depth.setdefault(t, 1)
            elif t in mset:
                out[k] = 0
                depth.setdefault(s, -1)
        classes = {cid} | {N[i]["cls"] for i in depth if N[i]["cls"] in CLS}
        return depth, out, classes

    def trace_path(start, end, allowed):
        prev = {start: None}
        queue = deque([start])
        while queue and end not in prev:
            u = queue.popleft()
            for k in out_edges[u]:
                if k in allowed and edges[k]["t"] not in prev:
                    prev[edges[k]["t"]] = (u, k)
                    queue.append(edges[k]["t"])
        if end not in prev:
            return [], []
        path, ks = [end], []
        while prev[path[-1]] is not None:
            u, k = prev[path[-1]]
            ks.append(k)
            path.append(u)
        return path[::-1], ks[::-1]

    def camera_for(lod, modules):
        if lod == "plate":
            return "map"
        return "face" if len({PANE[m]["row"] for m in modules}) == 1 else "raised"

    def unfold_for(rec, depth):
        """The modules whose inside the step is about; everything else stays a box."""
        if rec["open"]:
            return sorted({CLS[c]["module"] for c in rec["open"]}, key=lambda m: pane_order[m])
        mods = {N[i]["module"] for i in depth}
        if len(mods) == 1 and any(N[i]["slot"] in ("tail", "more") for i in depth):
            return sorted(mods)
        if not depth and rec["scope"] and rec["scope"]["kind"] == "module":
            return [rec["scope"]["id"]]
        return []

    def marks_for(step):
        marks = []
        unf = set(step["unfold"])
        marks += ["plate", "box", "plate_ribbon"] if step["lod"] == "plate" else ["box"]
        shown_ids = [i for i, _ in step["lit"]] + [i for i in step["evidence"] if i in N]
        # at package level boxes are silhouettes: their rows and tails are not read
        slots = {N[i]["slot"] for i in shown_ids if N[i]["module"] not in unf} if step["lod"] != "plate" else set()
        if any(s and s[0] == "r" for s in slots):
            marks.append("row")
        if slots & {"tail", "more"}:
            marks.append("tail")
        if unf:
            marks.append("card")
        if step["signal"] == "dead":
            marks += ["dead"]
        if step["signal"] == "clones":
            marks += ["clone"]
        if step["signal"] == "load_bearing":
            marks += ["load_bearing"]
        if step["open"]:
            marks += ["class_open", "fields", "intra"]
        off = set(step["off_edges"])
        lit_e = [edges[k] for k, _ in step["lit_edges"] if k not in off]
        # a call inside a folded box is not drawn; inside an unfolded one it is a margin arc
        if any(e["ms"] == e["mt"] and e["ms"] in unf and e["kind"] != "intra_class" for e in lit_e):
            marks.append("margin_arc")
        spans = {e["span"] for e in lit_e if e["ms"] != e["mt"]}
        for span in ("plate", "row", "cross_row"):
            if span in spans:
                marks.append(SPAN_MARK[span])
        if any(e["kind"] == "into_class" and e["mt"] in unf for e in lit_e):
            marks.append("into_class")
        if any(e["kind"] == "constructs" and e["mt"] in unf for e in lit_e):
            marks.append("constructs")
        if step["trace"]:
            marks.append("trace")
        if step["pulses"]:
            marks.append("pulse")
        elif step["lit"] and not step["signal"]:
            marks.append("lit")
        # a lit call with one end outside the modules (or the row) the step is about ends as a labelled stub
        focus = set(step["focus"])
        if step["stub"] == "pill":
            marks.append("stub_pill")
        elif any(edges[k]["ms"] not in focus or edges[k]["mt"] not in focus for k, _ in step["lit_edges"]):
            marks.append("stub")
        if step["evidence"]:
            marks.append("evidence")
        # every signal hue the lit set shows is in the step's key, and nothing else
        shown = [N[i] for i, _ in step["lit"]] + [N[i] for i in step["evidence"] if i in N]
        if step["signal"] != "dead" and any(n["dead"] for n in shown):
            marks.append("dead")
        if step["signal"] != "clones" and any(n["clone"] is not None for n in shown):
            marks.append("clone")
        if step["signal"] != "load_bearing" and any(n["lb"] for n in shown):
            marks.append("load_bearing")
        return marks

    def grouped(ids):
        """Functions listed by module (placement order), then by depth and line."""
        by = defaultdict(list)
        for i, d in ids:
            by[N[i]["module"]].append((d, N[i]["line"], i))
        rows = []
        for m in sorted(by, key=lambda m: (min(d for d, _, _ in by[m]), pane_order[m])):
            rows.append({"module": m, "name": module_name(m), "ids": [i for _, _, i in sorted(by[m])]})
        return rows

    def step_record(**kw):
        rec = {
            "id": None, "part": None, "label": None, "title": None, "body": None, "evidence": [],
            "scope": None, "lod": "function", "cross_file": True, "selected": None,
            "lit": [], "lit_edges": [], "lit_classes": [], "trace": [], "trace_edges": [],
            "open": [], "pulses": False, "signal": None,
            "frame": {"nodes": [], "classes": [], "modules": []}, "focus": [], "camera": "map", "home_row": None,
            "list": None, "marks": [], "unfold": [],
            "stub": None, "pills": [], "off_edges": [],
        }
        rec.update(kw)
        return rec

    def finish(rec, depth, edge_depth, classes):
        rec["lit"] = [[i, d] for i, d in sorted(depth.items(), key=lambda kv: (kv[1], kv[0]))]
        rec["lit_edges"] = [[k, d] for k, d in sorted(edge_depth.items())]
        rec["lit_classes"] = sorted(classes)
        rec["unfold"] = unfold_for(rec, depth)
        focus = {N[i]["module"] for i in depth} | set(rec["frame"]["modules"])
        focus |= {CLS[c]["module"] for c in rec["frame"]["classes"]}
        if rec["scope"]:
            focus |= set(scope_modules(rec["scope"]))
        rec["focus"] = sorted(focus, key=lambda m: pane_order[m])
        if rec["scope"] and rec["scope"]["kind"] == "module" and rec["scope"]["id"] not in rec["unfold"]:
            rec["scope"] = {"kind": "package", "id": PANE[rec["scope"]["id"]]["district"]}
        rec["marks"] = marks_for(rec)
        return rec

    def scope_modules(scope):
        return [scope["id"]] if scope["kind"] == "module" else list(DIST[scope["id"]]["modules"])

    def row_rule(rec, root, depth, edge_depth, built):
        """The stub rule for a pipeline step whose reach leaves the root's row.

        More than STUB_SHARE of the reach off the row: the step frames the whole reach
        (stub "frame"; the caller's frame and camera_for give the raised Elevation).
        Otherwise (stub "pill") the step faces the root's row, frames what stands in it,
        and every lit call with one end off the row becomes a pill at the on-row end's
        edge naming the far end and its package; calls with both ends off the row are
        not drawn either (off_edges)."""
        row = PANE[N[root]["module"]]["row"]
        away = [i for i in depth if PANE[N[i]["module"]]["row"] != row]
        if not away:
            return
        if len(away) > STUB_SHARE * len(depth):
            rec["stub"] = "frame"
            return
        rec["stub"] = "pill"
        rec["home_row"] = row
        rec["frame"] = {"nodes": sorted(i for i in depth if i not in away),
                        "classes": [c for c in built if PANE[CLS[c]["module"]]["row"] == row], "modules": []}
        rec["camera"] = "face"
        pills, off = [], []
        for k in sorted(edge_depth):
            e = edges[k]
            s_in, t_in = PANE[e["ms"]]["row"] == row, PANE[e["mt"]]["row"] == row
            if s_in and t_in:
                continue
            off.append(k)
            if s_in == t_in:
                continue  # both ends off the row
            at, other = (e["s"], e["t"]) if s_in else (e["t"], e["s"])
            om = CLS[other]["module"] if other in CLS else N[other]["module"]
            pills.append({"edge": k, "at": at, "dir": "out" if s_in else "in", "other": other,
                          "name": short(other), "package": DIST[PANE[om]["district"]]["name"]})
        pills.sort(key=lambda q: (q["at"], q["dir"], q["name"], q["edge"]))
        rec["pills"], rec["off_edges"] = pills, off

    # ---- chapters: story view keys -> Strata state ----------------------------
    steps = []
    for number, ch in enumerate(story["chapters"], 1):
        v = ch["view"]
        kind = ch.get("kind", "chapter")
        scope = scope_of(v.get("scope", ""))
        cross_file = bool(v.get("cross_file", False))
        cap = CONTEXT_DEPTH[v.get("context", "all")]
        evidence = [i for i in ch["evidence"] if drawn(i)]
        focal = any(k in v for k in ("selection", "pipeline_root", "object", "trace_start", "signal"))
        level = v.get("level")
        lod = "plate" if level == "package" or (level is None and not (v.get("structure") or focal)) else "function"
        rec = step_record(id=ch["id"], part=kind, label=str(number), title=ch["title"], body=ch["body"],
                          evidence=evidence, scope=scope, lod=lod, cross_file=cross_file)
        depth, edge_depth, classes = {}, {}, set()
        if kind == "signal":
            # the whole class the signal names, each function at depth 0
            sig = v["signal"]
            rec["signal"] = sig
            if sig == "dead":
                ids = [i for i, n in N.items() if n["dead"]]
            elif sig == "clones":
                ids = sorted({i for g in view["clones"] for i in g if drawn(i) and i in N})
            elif sig == "load_bearing":
                ids = [i for i, n in N.items() if n["lb"]]
            else:  # import_cycles: modules, no functions
                ids = []
            depth = {i: 0 for i in sorted(ids) if drawn(i)}
            if sig == "dead":
                edge_depth = {k: 0 for k, e in enumerate(edges) if e["s"] in depth and e["t"] in depth}
            if sig == "clones":
                groups = [[i for i in g if i in depth] for g in view["clones"]]
                rec["list"] = [{"module": None, "name": f"group {k + 1}", "ids": g} for k, g in enumerate(g for g in groups if len(g) > 1)]
            else:
                rec["list"] = grouped(depth.items()) if depth else None
            mods = {N[i]["module"] for i in depth}
            if sig == "import_cycles":
                mods = {m for imp in view["imports"] if imp["cycle"] for m in (imp["s"], imp["t"])}
            rec["frame"] = {"nodes": sorted(depth), "classes": [], "modules": [] if depth else sorted(mods, key=lambda m: pane_order[m])}
        elif "object" in v and v["object"] in CLS:
            cid = v["object"]
            depth, edge_depth, classes = class_lit(cid, cross_file)
            rec.update(selected={"kind": "class", "id": cid}, open=[cid])
            # the class and the collaborators standing in its row; partners in other rows are stubs
            row = PANE[CLS[cid]["module"]]["row"]
            partners = sorted(i for i, d in depth.items() if d != 0 and PANE[N[i]["module"]]["row"] == row)
            rec["frame"] = {"nodes": partners, "classes": [cid], "modules": []}
        elif "pipeline_root" in v or "selection" in v:
            root = v.get("pipeline_root") or v["selection"]
            if drawn(root) and root in N:
                depth = reach_from(root, same_module=not cross_file, cap=cap)
                edge_depth, classes = lit_edges(depth, same_module=not cross_file)
                sel = v.get("selection", root)
                rec["selected"] = {"kind": "node", "id": sel if drawn(sel) and sel in N else root}
                rec["pulses"] = kind == "pipeline" or "pipeline_root" in v
                if "trace_start" in v and drawn(v["trace_start"]) and drawn(v.get("trace_end", "")):
                    rec["trace"], rec["trace_edges"] = trace_path(v["trace_start"], v["trace_end"], set(edge_depth))
                if kind == "pipeline":
                    rec["list"] = grouped(depth.items())
        # what the camera frames: what the text names, at a legible size. A package-level
        # chapter frames the map; a pipeline its reach; a chapter its lit set and the evidence
        # it cites (the entry surface: the exported names); a signal its class
        if lod == "plate":
            rec["frame"] = {"nodes": [], "classes": [], "modules": [p["module"] for p in view["panes"]]}
        elif kind == "signal" or rec["frame"]["classes"]:
            pass
        elif depth or evidence:
            nodes = set(depth)
            if depth and all(N[i]["dead"] for i in depth):
                modules = {N[i]["module"] for i in depth}
                nodes |= {i for i, n in N.items() if n["dead"] and n["module"] in modules}
            if kind == "chapter":
                nodes |= {i for i in evidence if i in N}
            node_classes = {N[i]["cls"] for i in nodes}
            built = classes - node_classes
            if kind == "chapter":
                built |= {i for i in evidence if i in CLS and i not in node_classes}
            rec["frame"] = {"nodes": sorted(nodes), "classes": sorted(built), "modules": []}
        elif scope:
            rec["frame"] = {"nodes": [], "classes": [], "modules": scope_modules(scope)}
        else:
            rec["frame"] = {"nodes": [], "classes": [], "modules": [p["module"] for p in view["panes"]]}
        fm = set(rec["frame"]["modules"]) | {N[i]["module"] for i in rec["frame"]["nodes"]} | {CLS[c]["module"] for c in rec["frame"]["classes"]}
        rec["camera"] = "plan" if v.get("camera") == "plan" else camera_for(lod, fm)
        if rec["pulses"] and depth:
            row_rule(rec, rec["selected"]["id"], depth, edge_depth, sorted(c for c in classes if c not in {N[i]["cls"] for i in depth}))
        # the story's unfold list, when it gives one, is the step's level of detail
        rec = finish(rec, depth, edge_depth, classes)
        if "unfold" in v:
            rec["unfold"] = sorted((m for m in v["unfold"] if m in PANE), key=lambda m: pane_order[m])
            if rec["scope"] is None and len(rec["unfold"]) == 1 and v.get("scope") in rec["unfold"]:
                rec["scope"] = {"kind": "module", "id": rec["unfold"][0]}
            rec["marks"] = marks_for(rec)
        steps.append(rec)

    return {
        "title": story["title"],
        "steps": steps,
    }
