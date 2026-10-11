"""Deterministic module boxes, package placement and call-depth cards."""
from __future__ import annotations

import itertools
import math
import re
from collections import defaultdict, deque

# World units. One floor is one call-depth rank.
CARD_W, CARD_H, WRAP_H = 1.9, 0.40, 0.26
GAP, SUB_GAP, FLOOR_GAP = 0.10, 0.08, 0.62
PANE_PAD, PANE_HEADER, PANE_GAP = 0.16, 0.46, 0.1
BOX_W, BOX_HEAD, BOX_ROW, BOX_FIELD, BOX_TAIL, BOX_D = 2.1, 0.40, 0.24, 0.21, 0.22, 0.55
DIST_PAD, GROUND_GAP, BASEMENT_GAP = 0.45, 0.55, 0.9
EXPAND_LIFT = 1.4
# Ground plan. The flow axis is +z: callers stand at the back, callees toward
# the reader. Rows are ROW_GAP apart; plates in one row are STREET apart.
ROW_GAP, STREET = 13.0, 1.6
# A plate covers z from (row z - PLATE_BACK) to (row z + PLATE_FRONT); panes
# stand on the row line, the front strip carries labels and in-row imports.
PLATE_BACK, PLATE_FRONT = 1.3, 2.6
IMPORT_WEIGHT = 0.5  # an import without a resolved call counts half a call
CROSS_WEIGHT = 2.0  # one crossing of in-plate arcs costs 2 units of call-weighted span
SLICE = "·"  # package·1, package·2: slices of a package split by the cycle rule
# Module boxes (surface track). A module is a box in the class block's family:
# header, one row per public name, a "more" band, a hatched tail for the
# internals, ghost rows for the dead. Every box hangs from the entry surface
# (y = 0); the ground sits just under the tallest box. An unfolded box grows
# down into its pane (one column of cards on the module's own depth floors).
BOX_HEADER, MOD_TAIL, MOD_D, BOX_FOOT, GHOST_GAP = 0.62, 0.28, 0.36, 0.06, 0.1
WRAP_LINES = 3  # a name wraps after an underscore or before a capital, in at most 3 lines
# Type calibration (strata-v2: the surface track's boxes at the hierarchy track's
# type floor). Every row of a box must carry its whole name at 9 px or more when
# its package is scoped face-on at 1280 x 800, where the picture between the
# 300 px left panel and the right edge is about FRAME_PX wide. A package of n
# modules spreads them across that width, so each package takes the longest line
# length (LINE_MAX down to LINE_MIN characters) whose boxes, each as wide as its
# longest line at that scale, still fit the frame no wider than MOD_W_MAX. Line
# pitch and row height then follow from the smallest scale of any package.
FRAME_PX, TYPE_FLOOR, CHAR_EM, LINE_ROOM = 880.0, 9.0, 0.63, 1.12
SCALE_CAP = 60.0  # px per unit: a small package's scope is bound by height, not by width
SCALE_CAP_SPLIT = 36.0  # a package split over rows is scoped from the raised Elevation, bound by height
STUB_STREET = 3.2  # a package scope keeps the street of each side port its row stubs use in frame
CHAR_PX = TYPE_FLOOR * CHAR_EM  # one character at the floor, with a margin over the 0.6 em mono advance
LINE_MIN, LINE_MAX = 7, 18
PITCH_MIN = 0.34  # line pitch of a package scoped at a large scale (the surface track's row rhythm)
TEXT_PAD = 0.26  # row text inset inside a box (left 0.18, right 0.08)
ROW_PAD, WRAP_PAD, GHOST_PAD = 0.12, 0.02, 0.06  # a row is one line pitch plus this; a wrapper row is shorter

MOD_MORE0, MOD_MORE_STEP = 0.08, 0.05  # "more" band: one hairline step per hidden row, at most 5
ROW_CAP, GHOST_CAP = 6, 3
MOD_W_MIN, MOD_W_MAX = 2.0, 3.8  # box width from its longest label line, at its package's scale
GUTTER = 0.24  # each side of a box: calls enter on the left, leave on the right
ARC_MARGIN = 0.6  # unfolded pane: left margin for the arc diagram of calls inside the module
# strata-lines: the margin holds one lane per overlapping call inside the module (interval
# colouring, shortest first). A module whose calls need more lanes than ARC_MARGIN holds at
# MARGIN_LANE apart gets a wider margin, taken from its cards (never below CARD_MIN_W, the
# width of a CARD_LINE card line); the box keeps its width, so the placement does not move.
MARGIN_IN, MARGIN_OUT, MARGIN_LANE = 0.1, 0.05, 0.075
U_PAD, U_FLOOR_GAP, U_SUB_GAP, U_DEAD_GAP = 0.16, 0.34, 0.10, 0.5
# Cards of an unfolded pane: a name wraps at CARD_LINE characters; a character takes
# CARD_CHAR_U units, 9 px at the module scope's scale (height-bound at about 42 px per
# unit for the tallest panes); a box is at least as wide as its widest card line needs.
CARD_LINE2, CARD_CHAR_U, CARD_LINE = 0.24, 0.135, 13
CARD_MIN_W = 0.17 + CARD_CHAR_U * CARD_LINE
SURFACE_GROUND_GAP = 0.9
ORDER_SLOT = 3.0  # the in-plate order measures span in uniform slots of this width


# ============================================================== semantic facts


def analyse(snapshot: dict, frame_extra: dict | None = None) -> dict:
    """Everything that does not depend on where modules stand on the ground.

    `frame_extra` (per package, world units): what a package's scope frame holds
    beyond its modules' slots, measured on a previous placement (scope_extra).
    """
    model = snapshot["model"]
    layout = model["layout"]
    nodes = {n["id"]: n for n in model["nodes"]}
    wrappers = set(model["wrappers"])
    files = {f["module"]: f for f in snapshot["files"]}
    test_modules = {m for m, f in files.items() if f["is_test"]}
    symbols = {s["id"]: s for s in snapshot["symbols"]}

    clone_of = {}
    for gi, group in enumerate(model["clones"]):
        for member in group["members"]:
            clone_of[member] = gi

    # ---- class units -------------------------------------------------------
    classes, class_of = {}, {}
    for ob in snapshot["objects"]:
        if ob["module"] in test_modules:
            continue
        ctor = ob["constructor"]["method_id"]
        public = [m for m in ob["methods"]["public"] if m in nodes and m != ctor]
        public.sort(key=lambda m: nodes[m]["line_start"])
        if ctor in nodes:
            public.insert(0, ctor)
        private = sorted((m for m in ob["methods"]["private"] if m in nodes), key=lambda m: nodes[m]["line_start"])
        if not public and not private and not ob["fields"]:
            continue
        access = {a["method_id"]: {"reads": sorted(a["reads"]), "writes": sorted(a["writes"])} for a in ob["field_access"]}
        classes[ob["id"]] = {
            "id": ob["id"],
            "name": ob["name"],
            "module": ob["module"],
            "line": ob["line_start"],
            "doc": ob["docstring_summary"],
            "exported": bool(ob.get("exported", False)),  # snapshot v8
            "exported_from": list(ob.get("exported_from") or []),
            "ctor": ctor if ctor in nodes else None,
            "public": public,
            "private": [m for m in private if not nodes[m]["dead"]],
            "dead_private": [m for m in private if nodes[m]["dead"]],
            "fields": [
                {"name": f["name"], "kind": f["collaborator_kind"], "source": f["source_name"]}
                for f in ob["fields"]
            ],
            "access": access,
            "data_only": not public and not private,
        }
        for m in public + private:
            class_of[m] = ob["id"]

    # v7: Python's layout carries the call-depth row of every free card and
    # every class box (longest path from a root after cycle breaking).
    dead_row = layout["dead_row"]
    rank = {nid: cell["row"] for nid, cell in layout["nodes"].items() if cell["row"] != dead_row}
    class_rank = {cid: min(layout["classes"][cid]["row"], dead_row - 1) for cid in classes}

    # ---- modules, packages, tree order --------------------------------------
    columns = [c for c in layout["columns"] if c["module"] not in test_modules]
    pane_modules = [c["module"] for c in columns]
    package_of = {c["module"]: c["package"] for c in columns}
    tree_index = {m: i for i, m in enumerate(pane_modules)}
    packages = list(dict.fromkeys(c["package"] for c in columns))
    modules_by_package = defaultdict(list)
    for m in pane_modules:
        modules_by_package[package_of[m]].append(m)

    # ---- module boxes: the folded surface and the unfolded pane of each module
    ext_in = defaultdict(int)  # calls from other modules, per function and per class
    for e in model["edges"]:
        s, t = e["source"], e["target"]
        if s not in nodes or (t not in nodes and t not in classes):
            continue
        mt = nodes[t]["module"] if t in nodes else classes[t]["module"]
        if nodes[s]["module"] != mt:
            ext_in[t] += 1
            if class_of.get(t):
                ext_in[class_of[t]] += 1
    same_calls = defaultdict(set)  # strata-lines: calls inside one module (margin lanes)
    for e in model["edges"]:
        s_, t_ = e["source"], e["target"]
        if s_ not in nodes or (t_ not in nodes and t_ not in classes) or e["kind"] == "intra_class":
            continue
        mt_ = nodes[t_]["module"] if t_ in nodes else classes[t_]["module"]
        if nodes[s_]["module"] == mt_:
            same_calls[mt_].add((s_, t_))
    F0 = {"nodes": nodes, "classes": classes, "class_of": class_of, "wrappers": wrappers, "clone_of": clone_of, "rank": rank, "class_rank": class_rank,
          "same_calls": {m_: sorted(v_) for m_, v_ in same_calls.items()}}
    calib = calibrate_type(modules_by_package, F0, ext_in, frame_extra or {})
    boxes = {m: box_layout(m, F0, ext_in, calib["line"][package_of[m]], calib["char_u"][package_of[m]], calib["pitch"][package_of[m]]) for m in pane_modules}
    panes = {m: {"width": round(b["w"] + 2 * GUTTER, 3), "box": b} for m, b in boxes.items()}
    floors = {"ground": max(b["box_h"] for b in boxes.values()) + SURFACE_GROUND_GAP}  # positive-down
    dead_by_pane = {m: [i for i in nodes if nodes[i]["module"] == m and nodes[i]["dead"]] for m in pane_modules}
    boxes_by_pane = defaultdict(list)
    for cid, cl in classes.items():
        boxes_by_pane[cl["module"]].append(cid)

    # ---- module graph: resolved calls, then imports -------------------------
    pm = set(pane_modules)
    calls = defaultdict(int)
    for b in layout["bundles"]:
        a, t = b["source_module"], b["target_module"]
        if a in pm and t in pm and a != t:
            calls[(a, t)] += b["count"]
    imports = sorted({(a, t) for a, t in layout["imports"] if a in pm and t in pm and a != t})
    cycle_pairs = {tuple(p) for p in layout["import_cycles"]}
    succ, dropped = module_dag(pane_modules, calls, imports)
    weight = defaultdict(lambda: defaultdict(float))  # undirected affinity
    for (a, t), c in calls.items():
        weight[a][t] += c
        weight[t][a] += c
    for a, t in imports:
        if (a, t) not in calls and (t, a) not in calls:
            weight[a][t] += IMPORT_WEIGHT
            weight[t][a] += IMPORT_WEIGHT
    level = module_levels(pane_modules, succ, calls, package_of)

    return {
        "snapshot": snapshot,
        "model": model,
        "nodes": nodes,
        "classes": classes,
        "class_of": class_of,
        "class_rank": class_rank,
        "rank": rank,
        "wrappers": wrappers,
        "clone_of": clone_of,
        "symbols": symbols,
        "test_modules": test_modules,
        "pane_modules": pane_modules,
        "package_of": package_of,
        "packages": packages,
        "tree_index": tree_index,
        "modules_by_package": modules_by_package,
        "panes": panes,
        "floors": floors,
        "dead_by_pane": dead_by_pane,
        "boxes_by_pane": boxes_by_pane,
        "calls": dict(calls),
        "imports": imports,
        "cycle_pairs": cycle_pairs,
        "succ": succ,
        "dropped": dropped,
        "weight": weight,
        "level": level,
        "width": {m: panes[m]["width"] for m in pane_modules},
        "calib": calib,
    }


def calibrate_type(modules_by_package, F0, ext_in, frame_extra):
    """Line length and character width per package, so every row reads at TYPE_FLOOR.

    For a package of n modules with longest lines l_m, box m is TEXT_PAD + l_m * c
    wide (at least MOD_W_MIN) and the scope frame shows the package's modules,
    gutters and stub streets at a scale of FRAME_PX / width px per unit (at most
    SCALE_CAP); c is the world width of one character at the floor at that scale (a
    fixed point, found by iteration). The longest line length whose widest box
    stays within MOD_W_MAX wins. Dense packages cannot keep every name above
    the text floor at once: cap character width at one world unit and let the
    user zoom in instead of expanding the frame without bound.
    """
    line, char_u, scale, pitch = {}, {}, {}, {}
    for p, mods in modules_by_package.items():
        tried = []  # (fits, widest box, line length, c)
        need = {m: box_layout(m, F0, ext_in, LINE_MAX, 0.2, 0.5)["pane_need"] for m in mods}
        for L in range(LINE_MAX, LINE_MIN - 1, -1):
            longest = {m: box_layout(m, F0, ext_in, L, 0.2, 0.5)["longest"] for m in mods}
            c = 0.2
            for _ in range(60):
                widths = [max(MOD_W_MIN, need[m], TEXT_PAD + longest[m] * c) for m in mods]
                frame_w = sum(w + 2 * GUTTER for w in widths) + (len(mods) - 1) * PANE_GAP + frame_extra.get(p, 2 * DIST_PAD)
                c_new = min(1.0, CHAR_PX / min(FRAME_PX / frame_w, SCALE_CAP_SPLIT if p in frame_extra.get("split", ()) else SCALE_CAP))
                if abs(c_new - c) < 1e-6:
                    c = c_new
                    break
                c = c_new
            widest = max(max(need[m], TEXT_PAD + longest[m] * c) for m in mods)
            tried.append((widest <= MOD_W_MAX, widest, L, c))
            if widest <= MOD_W_MAX:
                break
        # the longest line length that fits; failing that (a name token longer than any
        # line), the one with the narrowest widest box, then the longer line
        _, _, L, c = next((t for t in tried if t[0]), None) or min(tried, key=lambda t: (t[1], -t[2]))
        line[p], char_u[p], scale[p] = L, round(c, 4), round(CHAR_PX / c, 2)
        # a line of 9 px text with room at the package's scale
        pitch[p] = max(PITCH_MIN, math.ceil(TYPE_FLOOR * LINE_ROOM / scale[p] * 100) / 100)
    return {"line": line, "char_u": char_u, "scale_px": scale, "pitch": pitch}


def wrap_name(name, width):
    """The name in at most WRAP_LINES lines, split after underscores or before capitals.

    The split leaves no line longer than `width` if it can; then it uses the fewest
    lines; then the shortest longest line.
    """
    tokens = [t for t in re.findall(r"[^_A-Z]*_+|[A-Z][a-z0-9]*_*|[^_A-Z]+", name) if t]
    if "".join(tokens) != name or len(name) <= width:
        return [name]
    best = None
    n = len(tokens)
    for k in range(1, min(WRAP_LINES, n) + 1):
        for cuts in itertools.combinations(range(1, n), k - 1):
            bounds = (0,) + cuts + (n,)
            lines = ["".join(tokens[bounds[i]:bounds[i + 1]]) for i in range(k)]
            longest = max(len(x) for x in lines)
            key = (max(0, longest - width), k, longest)
            if best is None or key < best[0]:
                best = (key, lines)
    return best[1]


def column_lanes(seq, calls, classes):
    """Margin lanes of the calls inside one unfolded module (strata-lines).

    seq: the pane's column top to bottom, ("class", id) or ("fn", id); calls: (s, t)
    pairs inside the module. A call spans the column between its two ends (a class
    member sits inside its block, a private one at the block's foot); calls are
    coloured shortest first (ties by sorted ids), each taking the first lane no
    overlapping call holds. Calls that only touch at a card share a lane: their ports
    on that card stand one above the other. Returns ({(s, t): lane}, lanes).
    """
    pos = {}
    for k, (kind, key) in enumerate(seq):
        if kind == "fn":
            pos[key] = float(k)
            continue
        cl = classes[key]
        pos[key] = float(k)
        pub = cl["public"]
        for i, mm in enumerate(pub):
            pos[mm] = k + (i + 1) / (len(pub) + 2)
        for mm in cl["private"]:
            pos[mm] = k + (len(pub) + 1) / (len(pub) + 2)
    iv = {c: tuple(sorted((pos[c[0]], pos[c[1]]))) for c in calls if c[0] in pos and c[1] in pos}
    lane, used = {}, []
    for c in sorted(iv, key=lambda c: (iv[c][1] - iv[c][0], c)):
        lo, hi = iv[c]
        k = 0
        while k < len(used) and any(lo < b - 1e-6 and hi > a + 1e-6 for a, b in used[k]):
            k += 1
        if k == len(used):
            used.append([])
        used[k].append((lo, hi))
        lane[c] = k
    return lane, max(1, len(used))


def box_layout(m, F, ext_in, line_chars, char_u, pitch):
    """Rows, band, tail, ghosts and the unfolded pane of one module.

    Names wrap at `line_chars` characters; the box is as wide as its longest line
    at `char_u` units per character; a line of text takes `pitch` units.
    """
    MOD_ROW, MOD_WRAP, MOD_GHOST = pitch + ROW_PAD, pitch + WRAP_PAD, pitch + GHOST_PAD
    nodes, classes, class_of = F["nodes"], F["classes"], F["class_of"]
    wrappers, clone_of, rank, class_rank = F["wrappers"], F["clone_of"], F["rank"], F["class_rank"]
    ids = sorted((i for i in nodes if nodes[i]["module"] == m), key=lambda i: (nodes[i]["line_start"], i))
    cids = sorted((c for c in classes if classes[c]["module"] == m), key=lambda c: (classes[c]["line"], c))

    def private_name(name):
        return name.startswith("_") and not (name.startswith("__") and name.endswith("__"))

    def signals(members):
        live = [i for i in members if not nodes[i]["dead"]]
        return {
            "lb": any(nodes[i]["load_bearing"] for i in live),
            "clone": any(i in clone_of for i in members),
        }

    surface = []  # (line, kind, id)
    for i in ids:
        n = nodes[i]
        if i in class_of or n["dead"] or n["is_private"]:
            continue
        surface.append((n["line_start"], "fn", i))
    for c in cids:
        if not private_name(classes[c]["name"]):
            surface.append((classes[c]["line"], "class", c))
    surface.sort()
    hidden = []
    if len(surface) > ROW_CAP:
        def priority(item):
            _, kind, key = item
            members = [key] if kind == "fn" else classes[key]["public"] + classes[key]["private"]
            s = signals(members)
            root = nodes[key]["is_root"] if kind == "fn" else any(nodes[x]["is_root"] for x in classes[key]["public"])
            return (-ext_in.get(key, 0), not s["lb"], not s["clone"], not root, item[0])
        keep = set(k for _, _, k in sorted(surface, key=priority)[: ROW_CAP - 1])
        hidden = [it for it in surface if it[2] not in keep]
        surface = [it for it in surface if it[2] in keep]

    slot_of = {}
    rows, d = [], BOX_HEADER
    for k, (_, kind, key) in enumerate(surface):
        if kind == "fn":
            n = nodes[key]
            lines = wrap_name(n["name"], line_chars)
            h = (MOD_WRAP if key in wrappers else MOD_ROW) + pitch * (len(lines) - 1)
            rows.append({"slot": f"r{k}", "kind": "fn", "id": key, "name": n["name"], "lines": lines, "y": round(d, 3), "h": round(h, 3),
                         "root": n["is_root"], "exported": bool(n.get("exported", False)), "lb": n["load_bearing"], "clone": key in clone_of, "wrapper": key in wrappers})
            slot_of[key] = f"r{k}"
        else:
            cl = classes[key]
            members = cl["public"] + cl["private"] + cl["dead_private"]
            s = signals(members)
            root = any(nodes[x]["is_root"] for x in cl["public"])
            lines = wrap_name(cl["name"], line_chars)
            rows.append({"slot": f"r{k}", "kind": "class", "id": key, "name": cl["name"], "lines": lines, "y": round(d, 3), "h": round(MOD_ROW + pitch * (len(lines) - 1), 3),
                         "root": root, "exported": cl["exported"], "lb": s["lb"], "clone": s["clone"], "wrapper": False, "data_only": cl["data_only"]})
            slot_of[key] = f"r{k}"
            for x in members:
                if not nodes[x]["dead"]:
                    slot_of[x] = f"r{k}"
        d += rows[-1]["h"]
    more = None
    if hidden:
        members = []
        for _, kind, key in hidden:
            members += [key] if kind == "fn" else classes[key]["public"] + classes[key]["private"]
            slot_of[key] = "more"
            if kind == "class":
                for x in classes[key]["public"] + classes[key]["private"]:
                    slot_of[x] = "more"
        h = MOD_MORE0 + MOD_MORE_STEP * min(len(hidden), 5)
        more = {"slot": "more", "y": round(d, 3), "h": round(h, 3), "lines": len(hidden), **signals(members),
                "names": [nodes[k]["name"] if kind == "fn" else classes[k]["name"] for _, kind, k in hidden]}
        d += h
    folded = []  # alive and not on the surface
    for i in ids:
        if nodes[i]["dead"] or i in slot_of:
            continue
        folded.append(i)
    folded_classes = [c for c in cids if c not in slot_of]
    tail = None
    if folded or folded_classes:
        h = MOD_TAIL if rows or more else MOD_ROW
        tail = {"slot": "tail", "y": round(d, 3), "h": h, "count": len(folded), **signals(folded)}
        d += h
        for i in folded:
            slot_of[i] = "tail"
        for c in folded_classes:
            slot_of[c] = "tail"
    dead = [i for i in ids if nodes[i]["dead"]]
    ghosts = []
    if dead:
        d += GHOST_GAP
    for k, i in enumerate(dead):
        if k < GHOST_CAP - 1 or len(dead) == GHOST_CAP:
            lines = wrap_name(nodes[i]["name"], line_chars)
            h = MOD_GHOST + pitch * (len(lines) - 1)
            ghosts.append({"slot": f"g{k}", "id": i, "name": nodes[i]["name"], "lines": lines, "y": round(d, 3), "h": round(h, 3)})
            slot_of[i] = f"g{k}"
            d += h
        else:
            if k == GHOST_CAP - 1:
                ghosts.append({"slot": "ghost", "id": None, "name": None, "y": round(d, 3), "h": MOD_GHOST, "lines": len(dead) - k})
                d += MOD_GHOST
            slot_of[i] = "ghost"
    box_h = d + BOX_FOOT

    # ---- width: the longest row or ghost line at the package's scale (the module
    # name is not measured: at package scope it stands in a header line above the box)
    labels = [0] + [max(len(x) for x in r["lines"]) + (1 if r["kind"] == "class" else 0) for r in rows]
    labels += [max(len(x) for x in g["lines"]) for g in ghosts if g["id"] is not None]
    longest = max(labels)
    # ... and the widest card line of the unfolded pane at the module scope's scale
    card_chars = [len(x) for i in ids if i not in class_of for x in wrap_name(nodes[i]["name"], CARD_LINE)]
    pane_need = ARC_MARGIN + U_PAD + 0.17 + CARD_CHAR_U * max([0] + card_chars)
    w = min(MOD_W_MAX, max(MOD_W_MIN, pane_need, TEXT_PAD + char_u * longest))

    # ---- unfolded pane: one column of cards on the module's own depth floors
    free = [i for i in ids if i not in class_of and not nodes[i]["dead"]]
    ranks = sorted({rank[i] for i in free} | {class_rank[c] for c in cids})
    dead = [i for i in ids if nodes[i]["dead"]]
    seq = []
    for r in ranks:
        seq += [("class", c) for c in cids if class_rank[c] == r] + [("fn", i) for i in free if rank[i] == r]
    seq += [("fn", i) for i in dead]
    _, lanes = column_lanes(seq, F.get("same_calls", {}).get(m, []), classes)
    margin = min(max(ARC_MARGIN, MARGIN_IN + (lanes - 1) * MARGIN_LANE + MARGIN_OUT), max(ARC_MARGIN, w - U_PAD - CARD_MIN_W))
    cw = w - margin - U_PAD
    cards, blocks, card_lines = {}, {}, {}
    budget = max(8, int((cw - 0.17) / CARD_CHAR_U))

    def card_h(i):
        lines = wrap_name(nodes[i]["name"], budget)
        card_lines[i] = lines
        return (WRAP_H if i in wrappers else CARD_H) + CARD_LINE2 * (len(lines) - 1)

    d = BOX_HEADER + U_PAD
    for r in ranks:
        for c in (c for c in cids if class_rank[c] == r):
            h = class_box_height(classes[c])
            blocks[c] = (margin, d, cw, h)
            d += h + U_SUB_GAP
        for i in (i for i in free if rank[i] == r):
            h = card_h(i)
            cards[i] = (margin, d, cw, h)
            d += h + U_SUB_GAP
        d += U_FLOOR_GAP - U_SUB_GAP
    live_bottom = d
    dead_top = None
    if dead:
        d += U_DEAD_GAP
        dead_top = d - U_DEAD_GAP / 2
        for i in dead:
            h = card_h(i)
            cards[i] = (margin, d, cw, h)
            d += h + U_SUB_GAP
    open_h = max(d + U_PAD, box_h)
    return {
        "w": round(w, 3), "box_h": round(box_h, 3), "open_h": round(open_h, 3), "longest": longest, "line": pitch, "pane_need": round(pane_need, 3),
        "rows": rows, "more": more, "tail": tail, "ghosts": ghosts, "slot_of": slot_of,
        "cards": cards, "card_lines": card_lines, "blocks": blocks, "dead_top": dead_top, "live_bottom": live_bottom,
        "card_w": round(cw, 3), "margin": round(margin, 3), "lanes": lanes,
    }


def class_box_height(cl, expanded=False):
    rows = cl["public"] + (cl["private"] if expanded else [])
    h = BOX_HEAD + BOX_ROW * len(rows) + 0.08
    if cl["data_only"]:
        h += BOX_FIELD * len(cl["fields"])
    elif expanded:
        h = max(h, BOX_HEAD + BOX_FIELD * len(cl["fields"]) + 0.08)
    if cl["private"] and not expanded:
        h += BOX_TAIL
    return h


# ============================================================== module graph


def module_dag(modules, calls, imports):
    """Calls first (heaviest first), then imports, each kept only if it closes no cycle.

    Returns the successor sets and the pairs dropped to keep the graph acyclic.
    Tempura drops none: it has no import cycle and no call against an import.
    """
    succ = {m: set() for m in modules}
    dropped = []

    def reaches(a, b):
        seen, stack = {a}, [a]
        while stack:
            u = stack.pop()
            if u == b:
                return True
            for v in succ[u]:
                if v not in seen:
                    seen.add(v)
                    stack.append(v)
        return False

    for (a, t), _ in sorted(calls.items(), key=lambda kv: (-kv[1], kv[0])):
        if reaches(t, a):
            dropped.append(("call", a, t))
            continue
        succ[a].add(t)
    for a, t in imports:
        if t in succ[a]:
            continue
        if reaches(t, a):
            dropped.append(("import", a, t))
            continue
        succ[a].add(t)
    return succ, dropped


def module_levels(modules, succ, calls, package_of):
    """Level of each module along the flow axis.

    1. Longest path from the sources of the DAG (level 0 = nothing depends on it).
    2. Balance: each module moves, inside the interval its neighbours allow
       (one below its deepest dependant, one above its shallowest dependency),
       to the weighted median of where its edges want it. Calls weigh their
       count, imports IMPORT_WEIGHT. Sweeps in tree order until nothing moves.
    3. A module with no edge at all takes the median level of its package
       siblings, so it stands beside them.
    """
    pred = {m: set() for m in modules}
    for a in modules:
        for t in succ[a]:
            pred[t].add(a)
    indeg = {m: len(pred[m]) for m in modules}
    queue = deque(m for m in modules if indeg[m] == 0)
    topo = []
    while queue:
        u = queue.popleft()
        topo.append(u)
        for v in sorted(succ[u], key=modules.index):
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
    level = dict.fromkeys(modules, 0)
    for u in topo:
        for v in succ[u]:
            level[v] = max(level[v], level[u] + 1)

    def w(a, t):
        return calls.get((a, t), 0) or IMPORT_WEIGHT

    for _ in range(50):
        moved = False
        for u in modules:
            if not pred[u] and not succ[u]:
                continue
            lo = max((level[p] + 1 for p in pred[u]), default=None)
            hi = min((level[s] - 1 for s in succ[u]), default=None)
            wants = [(level[p] + 1, w(p, u)) for p in pred[u]] + [(level[s] - 1, w(u, s)) for s in succ[u]]
            wants.sort()
            half, acc, best = sum(x for _, x in wants) / 2, 0.0, wants[0][0]
            for value, x in wants:
                acc += x
                if acc >= half:
                    best = value
                    break
            if lo is not None:
                best = max(best, lo)
            if hi is not None:
                best = min(best, hi)
            best = max(best, 0)
            if best != level[u]:
                level[u] = best
                moved = True
        if not moved:
            break
    floor = min(level.values())
    for m in modules:
        level[m] -= floor
    for u in modules:
        if pred[u] or succ[u]:
            continue
        sib = sorted(level[s] for s in modules if package_of[s] == package_of[u] and s != u and (pred[s] or succ[s]))
        level[u] = sib[(len(sib) - 1) // 2] if sib else 0
    return level


# ============================================================== placement B


def isotonic(values):
    """Pool-adjacent-violators: the nondecreasing sequence closest to `values`."""
    blocks = []
    for v in values:
        blocks.append([v, 1])
        while len(blocks) > 1 and blocks[-2][0] / blocks[-2][1] > blocks[-1][0] / blocks[-1][1]:
            s, c = blocks.pop()
            blocks[-1][0] += s
            blocks[-1][1] += c
    out = []
    for s, c in blocks:
        out += [s / c] * c
    return out


def pack_row(order, targets, F, unit_of):
    """Pane centres in the given order, as close to `targets` as no overlap allows.

    Neighbours on one plate keep the pane gap; neighbours on different plates
    a street plus both plate pads. Minimises the squared distance to the
    targets: an isotonic regression after removing the cumulative separations.
    """
    offs = [0.0]
    for a, b in zip(order, order[1:]):
        half = (F["width"][a] + F["width"][b]) / 2
        offs.append(offs[-1] + half + (PANE_GAP if unit_of[a] == unit_of[b] else 2 * DIST_PAD + STREET))
    ys = isotonic([t - o for t, o in zip(targets, offs)])
    return {m: y + o for m, y, o in zip(order, ys, offs)}


def compact_row(order, F, unit_of):
    return pack_row(order, [0.0] * len(order), F, unit_of)


def barycentres(row, x, row_of, i, F):
    bary = {}
    for m in row:
        ws = [(wt, x[n]) for n, wt in F["weight"][m].items() if row_of[n] != i]
        tot = sum(wt for wt, _ in ws)
        bary[m] = sum(wt * xx for wt, xx in ws) / tot if tot else x[m]
    return bary


def pack_plates(row, bary, x, row_of, i, F, unit_of):
    """Slide rigid plates along a row toward their links in other rows.

    Inside a plate the panes keep the pane gap; between plates the gap is at
    least a street. Each plate aims at the mean of (barycentre minus offset in
    plate) over its panes linked to other rows, or stays put. An isotonic fit
    keeps the plate order.
    """
    local = compact_row(row, F, unit_of)
    runs, run = [], []
    for m in row + [None]:
        if run and (m is None or unit_of[m] != unit_of[run[0]]):
            runs.append(run)
            run = []
        if m is not None:
            run.append(m)
    centre, half, target = [], [], []
    for r in runs:
        lo = local[r[0]] - F["width"][r[0]] / 2
        hi = local[r[-1]] + F["width"][r[-1]] / 2
        c = (lo + hi) / 2
        centre.append(c)
        half.append((hi - lo) / 2)
        linked = [m for m in r if any(row_of[n] != i for n in F["weight"][m])]
        if linked:
            target.append(sum(bary[m] - (local[m] - c) for m in linked) / len(linked))
        else:
            target.append(x[r[0]] - (local[r[0]] - c) if r[0] in x else c)
    offs = [0.0]
    for k in range(1, len(runs)):
        offs.append(offs[-1] + half[k - 1] + half[k] + 2 * DIST_PAD + STREET)
    ys = isotonic([t - o for t, o in zip(target, offs)])
    out = {}
    for r, c, y, o in zip(runs, centre, ys, offs):
        for m in r:
            out[m] = y + o + (local[m] - c)
    return out


def flow_order(order, F):
    """A left-to-right order of one plate's modules with few arc crossings.

    Every call and import between two modules of the plate must run left to
    right, so the order is topological. Cost: CROSS_WEIGHT times the number of
    crossing arcs (one arc per linked module pair; two arcs cross when their
    ends interleave) plus the call-weighted distance between linked pane
    centres. Two starts, the level order and a callers-first depth-first order
    (reverse postorder, callees in level order), each improved by single-module
    moves that keep the order topological, taking the first improving move in
    a fixed scan until no move helps. The cheaper result wins.
    """
    group = set(order)
    links = [(a, b, w) for a in order for b, w in F["weight"][a].items() if b in group and a < b]
    arcs = [(a, b) for a in order for b in sorted(F["succ"][a]) if b in group]
    before = {m: {a for a in order if m in F["succ"][a] and a in group} for m in order}
    after = {m: {b for b in F["succ"][m] if b in group} for m in order}
    rank = {m: k for k, m in enumerate(order)}

    def cost(seq):
        c, pos = 0.0, {}
        for m in seq:
            # one uniform slot per module: the order follows calls and crossings,
            # never label lengths, so a box that grows with its names keeps its place
            pos[m] = c + ORDER_SLOT / 2
            c += ORDER_SLOT + PANE_GAP
        span = sum(w * abs(pos[a] - pos[b]) for a, b, w in links)
        iv = [(min(pos[a], pos[b]), max(pos[a], pos[b])) for a, b in arcs]
        cross = 0
        for k in range(len(iv)):
            for l in range(k + 1, len(iv)):
                (a0, a1), (b0, b1) = iv[k], iv[l]
                if a0 < b0 < a1 < b1 or b0 < a0 < b1 < a1:
                    cross += 1
        return CROSS_WEIGHT * cross + span

    def valid(seq):
        at = {m: k for k, m in enumerate(seq)}
        return all(at[a] < at[m] for m in seq for a in before[m]) and all(at[m] < at[b] for m in seq for b in after[m])

    def improve(seq):
        seq, best = list(seq), cost(seq)
        improved = True
        while improved:
            improved = False
            for m in list(seq):
                rest = [q for q in seq if q != m]
                for k in range(len(rest) + 1):
                    cand = rest[:k] + [m] + rest[k:]
                    if cand == seq or not valid(cand):
                        continue
                    c = cost(cand)
                    if c < best - 1e-9:
                        seq, best, improved = cand, c, True
                        break
        return best, seq

    post, seen = [], set()

    def dfs(u):
        seen.add(u)
        for v in sorted(after[u], key=rank.get):
            if v not in seen:
                dfs(v)
        post.append(u)

    for m in order:
        if not before[m] and m not in seen:
            dfs(m)
    for m in order:
        if m not in seen:
            dfs(m)
    results = [improve(order), improve(post[::-1])]
    return min(results, key=lambda r: r[0])[1]


def unit_graph(units, F):
    """Edges between units (calls and imports kept in the module DAG)."""
    unit_of = {m: u for u, ms in units.items() for m in ms}
    edges = set()
    for a in F["pane_modules"]:
        for t in F["succ"][a]:
            if unit_of[a] != unit_of[t]:
                edges.add((unit_of[a], unit_of[t]))
    return edges


def cyclic_units(units, F):
    """Units on a cycle of the unit graph."""
    out = defaultdict(set)
    for a, b in unit_graph(units, F):
        out[a].add(b)

    def reach(u):
        seen, stack = set(), [u]
        while stack:
            for v in out[stack.pop()]:
                if v not in seen:
                    seen.add(v)
                    stack.append(v)
        return seen

    return {u for u in units if u in reach(u)}


def make_units(F):
    """Packages, except that a package on a package-level cycle splits by level.

    While the unit graph has a cycle, try every cut of every unit on a cycle
    into a top slice (levels up to t) and a base slice (deeper levels). Keep
    the cut that leaves the fewest units on cycles, then cuts the least
    call weight between the slices, then splits most evenly, then the first
    in tree order. Slices are named package·1, package·2 from the top.
    """
    lv, tix = F["level"], F["tree_index"]
    units = {p: list(F["modules_by_package"][p]) for p in F["packages"]}
    while True:
        cyc = cyclic_units(units, F)
        if not cyc:
            return units
        best = None
        for u in sorted(cyc, key=lambda u: tix[units[u][0]]):
            for t in sorted({lv[m] for m in units[u]})[:-1]:
                top = [m for m in units[u] if lv[m] <= t]
                base = [m for m in units[u] if lv[m] > t]
                trial = {k: v for k, v in units.items() if k != u}
                trial[u + SLICE + "1"], trial[u + SLICE + "2"] = top, base
                cut = sum(F["weight"][a].get(b, 0.0) for a in top for b in base)
                key = (len(cyclic_units(trial, F)), cut, abs(len(top) - len(base)), tix[units[u][0]], t)
                if best is None or key < best[0]:
                    best = (key, u, top, base)
        _, u, top, base = best
        stem = u.split(SLICE)[0]
        slices = [k for k in units if k.split(SLICE)[0] == stem and k != u]
        order = []
        for k in list(units):
            if k == u:
                order += [("top", top), ("base", base)]
            elif k in slices:
                order.append((k, units[k]))
        for k in slices:
            units.pop(k)
        units.pop(u)
        for n, (_, ms) in enumerate(sorted(order, key=lambda kv: min(lv[m] for m in kv[1])), 1):
            units[f"{stem}{SLICE}{n}"] = ms


RULE = [
    "units = packages; a package on a cycle of the package graph splits into level slices (package·1 at the top, package·2 below)",
    "plates (one per unit) in a topological order of the unit graph, lowest mean module level first among ready units; wrapped into rows by width; first row at the back",
    "inside a plate, a topological order of its calls and imports (callers left of callees) with cost = 2 x arc crossings + call-weighted span in uniform slots (box widths never reorder a plate); level-order and depth-first starts improved by single-module moves",
    "plates are rigid; an isotonic fit slides each plate along its row toward the barycentre of its links to other rows",
    "flow is reading order: back to front between rows, left to right inside a row",
]


def place(F):
    """Placement B: package plates in dependency order."""
    lv, tix = F["level"], F["tree_index"]
    units = make_units(F)
    unit_of = {m: u for u, ms in units.items() for m in ms}
    first = {u: min(tix[m] for m in ms) for u, ms in units.items()}
    mean = {u: sum(lv[m] for m in ms) / len(ms) for u, ms in units.items()}
    # topological order of the (now acyclic) unit graph; among ready units the
    # lowest mean level first, then tree order
    edges = sorted(unit_graph(units, F))
    indeg = {u: 0 for u in units}
    for a, b in edges:
        indeg[b] += 1
    order, ready = [], sorted((u for u in units if indeg[u] == 0), key=lambda u: (mean[u], first[u]))
    while ready:
        u = ready.pop(0)
        order.append(u)
        for a, b in edges:
            if a == u:
                indeg[b] -= 1
                if indeg[b] == 0:
                    ready.append(b)
        ready.sort(key=lambda u: (mean[u], first[u]))
    width = {p: sum(F["width"][m] for m in units[p]) + PANE_GAP * (len(units[p]) - 1) + 2 * DIST_PAD for p in order}
    n_rows = 3 if len(order) >= 5 else max(1, len(order) // 2)
    budget = max(max(width.values()), sum(width.values()) / n_rows)
    prow, current, used = [], [], 0.0
    for p in order:
        if current and used + width[p] > budget * 1.2:
            prow.append(current)
            current, used = [], 0.0
        current.append(p)
        used += width[p] + STREET
    if current:
        prow.append(current)
    rows = []
    for plist in prow:
        row = []
        for p in plist:
            row += flow_order(sorted(units[p], key=lambda m: (lv[m], tix[m])), F)
        rows.append(row)
    row_of = {m: i for i, r in enumerate(rows) for m in r}
    x = {}
    for r in rows:
        x.update(compact_row(r, F, unit_of))
    for it in range(8):
        for i in (range(len(rows)) if it % 2 == 0 else range(len(rows) - 1, -1, -1)):
            bary = barycentres(rows[i], x, row_of, i, F)
            x.update(pack_plates(rows[i], bary, x, row_of, i, F, unit_of))
    lo = min(x[m] - F["width"][m] / 2 for m in x)
    hi = max(x[m] + F["width"][m] / 2 for m in x)
    x = {m: v - (lo + hi) / 2 for m, v in x.items()}
    plates = []
    for i, row in enumerate(rows):
        run = []
        for m in row + [None]:
            if run and (m is None or unit_of[m] != unit_of[run[0]]):
                left = x[run[0]] - F["width"][run[0]] / 2 - DIST_PAD
                right = x[run[-1]] + F["width"][run[-1]] / 2 + DIST_PAD
                plates.append({"package": F["package_of"][run[0]], "unit": unit_of[run[0]], "row": i, "x": round(left, 3), "z": i * ROW_GAP, "w": round(right - left, 3), "modules": list(run)})
                run = []
            if m is not None:
                run.append(m)
    return {"rows": rows, "centre": x, "z": {m: row_of[m] * ROW_GAP for m in row_of}, "plates": plates, "unit_of": unit_of, "plate_order": order}


def scope_extra(F, P):
    """Per package: the scope frame's width beyond its modules' slots, on this placement.

    The frame spans the package's plates (a split package spans both slices) and,
    for each plate side a row stub leaves through, STUB_STREET more (the browser
    keeps the street and its port label in view).
    """
    unit_of, row_of = P["unit_of"], {m: i for i, r in enumerate(P["rows"]) for m in r}
    plate = {pl["unit"]: pl for pl in P["plates"]}
    out = {}
    for p, mods in F["modules_by_package"].items():
        ms = set(mods)
        lo = min(plate[unit_of[m]]["x"] for m in mods)
        hi = max(plate[unit_of[m]]["x"] + plate[unit_of[m]]["w"] for m in mods)
        sides = set()
        for (a, t) in F["calls"]:
            if (a in ms) == (t in ms) or row_of[a] != row_of[t] or unit_of[a] == unit_of[t]:
                continue
            own, other = (a, t) if a in ms else (t, a)
            pu, po = plate[unit_of[own]], plate[unit_of[other]]
            sides.add((pu["unit"], "right" if po["x"] > pu["x"] else "left"))
        for u, side in sides:
            if side == "right":
                hi = max(hi, plate[u]["x"] + plate[u]["w"] + STUB_STREET)
            else:
                lo = min(lo, plate[u]["x"] - STUB_STREET)
        slots = sum(F["width"][m] for m in mods) + (len(mods) - 1) * PANE_GAP
        out[p] = round(hi - lo - slots, 3)
    # packages whose plates stand in more than one row (a split package)
    out["split"] = sorted(p for p, mods in F["modules_by_package"].items() if len({row_of[m] for m in mods}) > 1)
    return out


def plate_ports(F, P):
    """Plates with their centre, edges, and fixed ports for routing.

    Every linked module pair (a call or an import kept in the module DAG)
    between two plates leaves its source plate and enters its target plate
    through one port each:
    - target in a row in front: source front edge -> target back edge;
    - target in a row behind (against the flow): source back -> target front;
    - same row: source right end -> target left end (left -> right when the
      target stands to the left).
    A front or back port sits on that plate edge, at the weight-averaged x of
    the pane centres that use it (calls weigh their count, an import without
    a call 0.5), kept 0.3 inside the plate ends; an unused front or back port
    sits at the plate centre. Side ports sit at the plate ends on the pane
    line. Ports depend only on the snapshot and the placement, never on scope.
    """
    plate_of = {m: k for k, pl in enumerate(P["plates"]) for m in pl["modules"]}
    use = defaultdict(lambda: defaultdict(list))  # plate -> port -> [(x, w)]
    count = defaultdict(lambda: defaultdict(lambda: [0, 0]))  # plate -> port -> [out, in]
    for a in F["pane_modules"]:
        for t in sorted(F["succ"][a]):
            pa, pt = plate_of[a], plate_of[t]
            if pa == pt:
                continue
            w = F["calls"].get((a, t), 0) or IMPORT_WEIGHT
            ra, rt = P["plates"][pa]["row"], P["plates"][pt]["row"]
            if rt > ra:
                ports = ("front", "back")
            elif rt < ra:
                ports = ("back", "front")
            elif P["plates"][pt]["x"] > P["plates"][pa]["x"]:
                ports = ("right", "left")
            else:
                ports = ("left", "right")
            use[pa][ports[0]].append((P["centre"][a], w))
            use[pt][ports[1]].append((P["centre"][t], w))
            count[pa][ports[0]][0] += 1
            count[pt][ports[1]][1] += 1
    out = []
    for k, pl in enumerate(P["plates"]):
        x0, x1, z = pl["x"], pl["x"] + pl["w"], pl["z"]
        cx = (x0 + x1) / 2
        ports = {}
        for side, pz in (("front", z + PLATE_FRONT), ("back", z - PLATE_BACK)):
            pts = use[k][side]
            px = sum(x * w for x, w in pts) / sum(w for _, w in pts) if pts else cx
            px = min(max(px, x0 + 0.3), x1 - 0.3)
            ports[side] = {"x": round(px, 3), "z": round(pz, 3), "out": count[k][side][0], "in": count[k][side][1]}
        for side, px in (("left", x0), ("right", x1)):
            if use[k][side]:
                ports[side] = {"x": round(px, 3), "z": round(z, 3), "out": count[k][side][0], "in": count[k][side][1]}
        unit = pl["unit"]
        stem = pl["package"] if pl["package"] == F["model"]["package_name"] else pl["package"].split(".")[-1]
        out.append({
            "unit": unit, "package": pl["package"],
            "name": stem + (unit[len(pl["package"]):] if unit != pl["package"] else ""),
            "row": pl["row"], "x": pl["x"], "z": pl["z"], "w": pl["w"], "modules": pl["modules"],
            "centre": {"x": round(cx, 3), "z": round(z + (PLATE_FRONT - PLATE_BACK) / 2, 3)},
            "front": round(z + PLATE_FRONT, 3), "back": round(z - PLATE_BACK, 3),
            "ports": ports,
        })
    return out


# ============================================================== assemble


def package_tree(model, packages, units):
    """Parent of every package, and the slices of a split package as its children."""
    def walk(item, parent, out):
        if item["type"] == "package" and item.get("path"):
            out[item["path"]] = parent
            parent = item["path"]
        for child in item["children"]:
            if child["type"] == "package":
                walk(child, parent, out)
        return out

    parents = walk(model["tree"], None, {})
    tree = [{"package": p, "parent": parents.get(p), "slice": False, "has_modules": p in packages} for p in sorted(parents)]
    for u in sorted(units):
        if SLICE in u:
            tree.append({"package": u, "parent": u.split(SLICE)[0], "slice": True, "has_modules": True})
    return tree


def assemble(F, P):
    nodes, classes, class_of, wrappers = F["nodes"], F["classes"], F["class_of"], F["wrappers"]
    fl, panes = F["floors"], F["panes"]
    ground = fl["ground"]
    model, snapshot = F["model"], F["snapshot"]
    layout = model["layout"]
    package_name = model["package_name"]
    level, unit_of = F["level"], P["unit_of"]
    row_of = {m: i for i, r in enumerate(P["rows"]) for m in r}
    pane_set = set(F["pane_modules"])

    out_cards, out_classes, out_panes = [], [], []
    card_world, box_world, slot_of, card_lines = {}, {}, {}, {}
    for m in F["pane_modules"]:
        pane = panes[m]
        b = pane["box"]
        x = P["centre"][m] - pane["width"] / 2
        x0 = x + GUTTER
        dz = P["z"][m]
        n_ids = [i for i in nodes if nodes[i]["module"] == m]
        p = F["package_of"][m]
        slot_of.update(b["slot_of"])
        card_lines.update(b["card_lines"])
        out_panes.append({
            "module": m,
            "name": m.rsplit(".", 1)[-1] + ("/__init__" if m == p else ""),
            "district": p,
            "plate": unit_of[m],
            "row": row_of[m],
            "level": level[m],
            "x": round(x, 3), "z": round(dz, 3), "w": round(pane["width"], 3),
            "top": 0.0, "bottom": round(-ground, 3),
            "box": {
                "x": round(x0, 3), "w": b["w"], "h": b["box_h"], "d": MOD_D, "open_h": b["open_h"], "line": b["line"],
                "card_w": b["card_w"], "margin": b["margin"], "lanes": b["lanes"], "dead_top": None if b["dead_top"] is None else round(-b["dead_top"], 3),
                "rows": b["rows"], "more": b["more"], "tail": b["tail"], "ghosts": b["ghosts"],
            },
            "functions": len(n_ids),
            "dead": sum(nodes[i]["dead"] for i in n_ids),
            "clones": sum(1 for i in n_ids if i in F["clone_of"]),
            "load_bearing": sum(nodes[i]["load_bearing"] for i in n_ids),
            "classes": len(F["boxes_by_pane"][m]),
        })
        for nid, (cx, cd, w, h) in b["cards"].items():
            card_world[nid] = (round(x0 + cx, 3), round(-cd, 3), round(dz + MOD_D, 3), round(w, 3), h)
        for cid, (bx, bd, w, h) in b["blocks"].items():
            box_world[cid] = (round(x0 + bx, 3), round(-bd, 3), round(dz + MOD_D, 3), round(w, 3), h)

    out_plates = plate_ports(F, P)
    plate_index = {pl["unit"]: k for k, pl in enumerate(out_plates)}

    # packages in tree order: the scope unit of the sidebar and the breadcrumbs
    out_districts = []
    for p in F["packages"]:
        mine = [pl for pl in out_plates if pl["package"] == p]
        span_w = sum(pl["w"] for pl in mine)
        out_districts.append({
            "package": p,
            "name": p if p == package_name else p.split(".")[-1],
            "modules": list(F["modules_by_package"][p]),
            "plates": [pl["unit"] for pl in mine],
            "rows": sorted({pl["row"] for pl in mine}),
            "centre": {
                "x": round(sum((pl["x"] + pl["w"] / 2) * pl["w"] for pl in mine) / span_w, 3),
                "z": round(sum(pl["centre"]["z"] * pl["w"] for pl in mine) / span_w, 3),
            },
        })

    ids = sorted(nodes)
    index = {nid: k for k, nid in enumerate(ids)}
    for nid in ids:
        n = nodes[nid]
        sym = F["symbols"].get(nid, {})
        rec = {
            "id": nid,
            "name": n["name"],
            "qual": n["qualified_name"],
            "module": n["module"],
            "kind": n["kind"],
            "line": n["line_start"],
            "loc": n["loc"],
            "doc": n["docstring_summary"],
            "rank": F["rank"].get(nid),
            "root": n["is_root"],
            "exported": bool(n.get("exported", False)),  # snapshot v8: in __all__ or re-exported by a package __init__
            "exported_from": list(n.get("exported_from") or []),
            "dead": n["dead"],
            "lb": n["load_bearing"],
            "hub": n["is_hub"],
            "orch": n["is_orchestrator"],
            "wrapper": nid in wrappers,
            "clone": F["clone_of"].get(nid),
            "private": n["is_private"],
            "fan_in": n["fan_in"],
            "fan_out": n["fan_out"],
            "unresolved": n["unresolved_out"],
            "cls": class_of.get(nid),
            "params": [q["name"] for q in sym.get("parameters", [])],
            "slot": slot_of.get(nid),
        }
        if len(card_lines.get(nid, [])) > 1:
            rec["lines"] = card_lines[nid]
        if nid in card_world:
            x, y, z, w, h = card_world[nid]
            rec.update({"x": x, "y": y, "z": z, "w": w, "h": h})
        out_cards.append(rec)

    for cid, cl in sorted(classes.items()):
        x, y, z, w, h = box_world[cid]
        out_classes.append({
            **{k: cl[k] for k in ("id", "name", "module", "line", "doc", "ctor", "public", "private", "dead_private", "fields", "access", "data_only")},
            "exported": cl["exported"], "exported_from": cl["exported_from"],
            "rank": F["class_rank"][cid],
            "slot": slot_of.get(cid),
            "x": x, "y": y, "z": z, "w": w, "h": round(h, 3), "d": BOX_D,
            "expanded": {
                "w": round(w * 2 + 0.3, 3) if cl["fields"] and not cl["data_only"] else w,
                "h": round(class_box_height(cl, expanded=True), 3),
                "lift": EXPAND_LIFT,
            },
        })

    # ---- span: the routing hint from the ground plan --------------------------
    # pane (one module), plate (two modules on one plate), row (two plates in
    # one row), cross_row (two rows). The browser routes by span alone.
    def span(a_module, b_module):
        if a_module == b_module:
            return "pane"
        if unit_of[a_module] == unit_of[b_module]:
            return "plate"
        return "row" if row_of[a_module] == row_of[b_module] else "cross_row"

    def module_of(item):
        return nodes[item]["module"] if item in nodes else classes[item]["module"]

    def box_of(item):
        return item if item in classes else class_of.get(item)

    def foot(item):
        if item in card_world:
            x, _, z, w, _ = card_world[item]
            return x + w / 2, z
        x, _, z, w, _ = box_world[class_of.get(item, item)]
        return x + w / 2, z

    def against(s, t):
        """The flow is reading order: back to front between rows, left to right in a row."""
        (xs, zs), (xt, zt) = foot(s), foot(t)
        return zt < zs - 1e-6 or (abs(zt - zs) <= 1e-6 and xt < xs - 1e-6)

    # ---- edges: Python's kinds (v7 model.edges[*].kind) ----------------------
    # kind: same_module | cross_module | into_class | intra_class | constructs.
    out_edges = []
    for e in model["edges"]:
        s, t = e["source"], e["target"]
        if s not in nodes or (t not in nodes and t not in classes):
            continue
        ms, mt = module_of(s), module_of(t)
        if ms not in pane_set or mt not in pane_set:
            continue
        rec = {
            "s": s, "t": t, "kind": e["kind"], "back": e["back"],
            "span": span(ms, mt), "ms": ms, "mt": mt, "ss": slot_of.get(s), "ts": slot_of.get(t),
            "dead": nodes[s]["dead"] or (t in nodes and nodes[t]["dead"]),
        }
        if e["kind"] in ("into_class", "constructs", "intra_class"):
            rec["cls"] = box_of(t)
        if ms != mt:
            rec["against"] = against(s, t)
        out_edges.append(rec)
    out_edges.sort(key=lambda r: (r["ms"], r["mt"], r["s"], r["t"]))

    # ---- bundles: Python's resolved call counts per ordered module pair ------
    members = defaultdict(list)
    for k, r in enumerate(out_edges):
        if r["ms"] != r["mt"]:
            members[(r["ms"], r["mt"])].append(k)
    out_bundles = []
    for b in layout["bundles"]:
        key = (b["source_module"], b["target_module"])
        if key[0] not in pane_set or key[1] not in pane_set:
            continue
        assert len(members[key]) == b["count"], (key, len(members[key]), b["count"])
        out_bundles.append({
            "s": key[0], "t": key[1], "count": b["count"], "span": span(*key),
            "us": unit_of[key[0]], "ut": unit_of[key[1]],
            "against": any(out_edges[k]["against"] for k in members[key]),
            "members": members[key],
        })
    assert sum(len(v) for v in members.values()) == sum(b["count"] for b in out_bundles)

    # ---- links: the calls of one module pair grouped by the slots they join in
    # the folded boxes (row, "more" band, tail, ghost). One line per link at
    # package scope; a link whose end module is unfolded draws its members.
    slot_rank = {}
    for pn in out_panes:
        bx = pn["box"]
        seq = [r["slot"] for r in bx["rows"]] + (["more"] if bx["more"] else []) + (["tail"] if bx["tail"] else []) + [g["slot"] for g in bx["ghosts"]]
        for k, sl in enumerate(seq):
            slot_rank[(pn["module"], sl)] = k
    out_links = []
    for k, b in enumerate(out_bundles):
        groups = defaultdict(list)
        for ei in b["members"]:
            groups[(out_edges[ei]["ss"], out_edges[ei]["ts"])].append(ei)
        b["links"] = []
        for (ss, ts), mem in sorted(groups.items(), key=lambda kv: (slot_rank[(b["s"], kv[0][0])], slot_rank[(b["t"], kv[0][1])])):
            b["links"].append(len(out_links))
            out_links.append({"bundle": k, "s": b["s"], "t": b["t"], "ss": ss, "ts": ts, "span": b["span"], "count": len(mem), "members": mem})

    # ---- plate bundles: module pairs grouped by ordered plate pair ----------
    plate_pairs = defaultdict(lambda: {"count": 0, "bundles": []})
    for k, b in enumerate(out_bundles):
        if b["us"] != b["ut"]:
            pp = plate_pairs[(b["us"], b["ut"])]
            pp["count"] += b["count"]
            pp["bundles"].append(k)
    out_plate_bundles = [
        {
            "s": a, "t": b, "span": "row" if out_plates[plate_index[a]]["row"] == out_plates[plate_index[b]]["row"] else "cross_row",
            "count": v["count"], "bundles": v["bundles"],
            "against": any(out_bundles[k]["against"] for k in v["bundles"]),
        }
        for (a, b), v in sorted(plate_pairs.items(), key=lambda kv: (plate_index[kv[0][0]], plate_index[kv[0][1]]))
    ]

    # ---- module imports (v7 layout.imports, re-exports already followed) ---
    out_imports = [
        {"s": a, "t": b, "cycle": (a, b) in F["cycle_pairs"], "call": (a, b) in F["calls"], "span": span(a, b)}
        for a, b in F["imports"]
    ]
    undrawn_imports = sum(1 for a, b in layout["imports"] if a not in pane_set or b not in pane_set)

    # ---- reach: downstream sets with BFS depth, for emphasis lookups -------
    out_adj, in_adj = defaultdict(list), defaultdict(list)
    for e in out_edges:
        if e["t"] in nodes:  # a constructs edge ends at a class box, not a function
            out_adj[e["s"]].append(e["t"])
            in_adj[e["t"]].append(e["s"])
    reach = {}
    for nid in ids:
        depth = {nid: 0}
        queue = deque([nid])
        while queue:
            u = queue.popleft()
            for v in sorted(out_adj[u]):
                if v not in depth:
                    depth[v] = depth[u] + 1
                    queue.append(v)
        reach[nid] = [[index[v], dd] for v, dd in sorted(depth.items(), key=lambda kv: (kv[1], kv[0]))]
    callers = {nid: sorted(set(in_adj[nid])) for nid in ids}

    pipelines = []
    for p in snapshot["architecture"]["pipelines"]:
        if nodes.get(p["root"], {}).get("module") in F["test_modules"]:
            continue
        pipelines.append({"root": p["root"], "title": p["title"], "listed": len(p["function_ids"]), "reach": len(reach[p["root"]])})

    def count(items, key, values):
        return {k: sum(1 for r in items if r[key] == k) for k in values}

    spans = ("pane", "plate", "row", "cross_row")
    view = {
        "package": package_name,
        "snapshot_id": snapshot.get("snapshot_id"),
        "placement": {
            "name": "plates",
            "rule": RULE,
            "flow": "reading",
            "rows": [{"z": round(i * ROW_GAP, 3), "modules": r} for i, r in enumerate(P["rows"])],
            "plate_order": P["plate_order"],
            "corridor": {
                "row_gap": ROW_GAP, "plate_back": PLATE_BACK, "plate_front": PLATE_FRONT,
                "between_rows": round(ROW_GAP - PLATE_BACK - PLATE_FRONT, 3),
                "street": STREET, "pane_gap": PANE_GAP,
            },
            "dropped": F["dropped"],
        },
        "floors": {"top": 0.0, "ground": round(-ground, 3)},
        "dims": {
            "card_w": CARD_W, "card_h": CARD_H, "box_w": BOX_W, "box_head": BOX_HEAD,
            "box_row": BOX_ROW, "box_field": BOX_FIELD, "box_tail": BOX_TAIL, "box_d": BOX_D,
            "floor_gap": FLOOR_GAP, "pane_header": PANE_HEADER, "expand_lift": EXPAND_LIFT,
            "mod_header": BOX_HEADER, "mod_line_min": PITCH_MIN, "row_pad": ROW_PAD, "wrap_pad": WRAP_PAD, "ghost_pad": GHOST_PAD, "mod_tail": MOD_TAIL,
            "mod_d": MOD_D, "gutter": GUTTER, "arc_margin": ARC_MARGIN, "row_cap": ROW_CAP, "type_floor": TYPE_FLOOR,
            "row_gap": ROW_GAP, "plate_back": PLATE_BACK, "plate_front": PLATE_FRONT,
        },
        "districts": out_districts,
        "plates": out_plates,
        "tree": package_tree(model, F["packages"], set(unit_of.values())),
        "panes": out_panes,
        "nodes": out_cards,
        "classes": out_classes,
        "edges": out_edges,
        "bundles": out_bundles,
        "links": out_links,
        "plate_bundles": out_plate_bundles,
        "imports": out_imports,
        "clones": [g["members"] for g in model["clones"]],
        "reach": reach,
        "callers": callers,
        "pipelines": pipelines,
        "summary": {
            "functions": len(out_cards),
            "edges": len(out_edges),
            "kinds": {k: sum(1 for e in out_edges if e["kind"] == k) for k in sorted({e["kind"] for e in out_edges})},
            "spans": count(out_edges, "span", spans),
            "against": sum(1 for e in out_edges if e.get("against")),
            "bundles": len(out_bundles),
            "links": len(out_links),
            "surface_rows": sum(len(pn["box"]["rows"]) for pn in out_panes),
            "sealed_boxes": sum(1 for pn in out_panes if not pn["box"]["rows"] and not pn["box"]["more"]),
            "bundle_spans": count(out_bundles, "span", spans[1:]),
            "plate_bundles": len(out_plate_bundles),
            "plate_bundle_spans": count(out_plate_bundles, "span", spans[2:]),
            "imports_drawn": len(out_imports),
            "import_spans": count(out_imports, "span", spans[1:]),
            "imports_without_column": undrawn_imports,
            "dead": sum(1 for n in out_cards if n["dead"]),
            "clone_groups": len(model["clones"]),
            "import_cycles": len(layout["import_cycles"]),
            "classes": len(out_classes),
            "plates": len(out_plates),
            "rows": len(P["rows"]),
        },
    }
    return view
