"""Precompute connection paths for folded and unfolded module states."""
from __future__ import annotations

import math
from collections import defaultdict

from atlas.explorer.layout import MARGIN_IN, MARGIN_LANE, MARGIN_OUT, column_lanes

R_LANE, R_COR_GAP, R_SKY_GAP, R_APEX, R_RISE = 0.3, 0.75, 0.9, 2.4, 0.1
R_SIDE, R_STRAND, R_MEMBER, R_CORNER, R_FRONT, R_GUT0 = 0.35, 0.2, 0.1, 0.2, 0.06, 0.06
R_RISER = 0.075  # strata-lines: risers at one box side at most this far apart (strata-v2: 0.045)
R_MEMBER_RISER = 0.035  # a stub's members each take their own riser this far apart
DENSIFY = 0.5
CURVE_Z = 0.09  # per-call curves stand this far in front of the box faces (tracks: R_FRONT)
PORT_PITCH, PORT_INSET = 0.11, 0.07  # ports spread along a slot or card side, at most this far apart
ROW_PORT_PITCH, ROW_PORT_INSET = 0.05, 0.035  # ... along a class row
CURVE_FULL = 0.9  # an S-curve's two handles together span this share of the gap
CURVE_LANE = 0.19  # lane step: shifts a curve's steep middle by 3/8 of this
CURVE_DY = 0.12  # lane step of the per-call arcs between rows (lateral)
MARGIN_PITCH = 0.085  # margin lanes: pitch cap (MARGIN_IN, MARGIN_OUT, MARGIN_LANE above)
MARGIN_CORNER = 0.06


def _r3(v):
    return round(v + 0.0, 3)


def _lerp(a, b, t):
    return [a[k] + (b[k] - a[k]) * t for k in range(3)]


class _Path:
    def __init__(self, p0):
        self.a = [_r3(p0[0]), _r3(p0[1]), _r3(p0[2])]
        self.cur = list(p0)

    def cubic(self, c1, c2, p3, n):
        self.a += [int(n), *(_r3(v) for v in c1), *(_r3(v) for v in c2), *(_r3(v) for v in p3)]
        self.cur = list(p3)

    def line(self, p3, step=DENSIFY):
        p0 = self.cur
        L = math.dist(p0, p3)
        if L < 1e-6:
            return
        n = 1 if step is None else max(1, math.ceil(L / step))
        self.cubic(_lerp(p0, p3, 1 / 3), _lerp(p0, p3, 2 / 3), p3, n)

    def quad(self, b, p3, n=6):
        p0 = self.cur
        self.cubic([p0[k] + 2 / 3 * (b[k] - p0[k]) for k in range(3)], [p3[k] + 2 / 3 * (b[k] - p3[k]) for k in range(3)], p3, n)

    def rounded(self, pts, r):
        """Orthogonal polyline from the current point through pts, corners rounded at r."""
        clean = [self.cur]
        for p in pts:
            if math.dist(p, clean[-1]) > 1e-6:
                clean.append(list(p))
        for i in range(1, len(clean) - 1):
            A, B, C = clean[i - 1], clean[i], clean[i + 1]
            ab, bc = math.dist(A, B), math.dist(B, C)
            d1, d2 = min(r, ab / 2), min(r, bc / 2)
            P1 = [B[k] + (A[k] - B[k]) * d1 / ab for k in range(3)]
            P2 = [B[k] + (C[k] - B[k]) * d2 / bc for k in range(3)]
            self.line(P1)
            self.quad(B, P2)
        if len(clean) > 1:
            self.line(clean[-1])
        return self


def _bez(p0, c1, c2, p3, n):
    P = _Path(p0)
    P.cubic(c1, c2, p3, n)
    return P


def build_routes(view):
    dims = view["dims"]
    G = dims["gutter"]
    PANE = {p["module"]: p for p in view["panes"]}
    PLATE = {p["unit"]: p for p in view["plates"]}
    N = {n["id"]: n for n in view["nodes"]}
    CL = {c["id"]: c for c in view["classes"]}
    edges, links, bundles = view["edges"], view["links"], view["bundles"]
    box = lambda m: PANE[m]["box"]
    centre_x = lambda m: box(m)["x"] + box(m)["w"] / 2
    is_track = lambda span: span in ("plate", "row")
    face = lambda m: PANE[m]["z"] + box(m)["d"]
    SLOT = {}
    for p in view["panes"]:
        b = p["box"]
        for s in b["rows"] + ([b["more"]] if b["more"] else []) + ([b["tail"]] if b["tail"] else []) + b["ghosts"]:
            SLOT[(p["module"], s["slot"])] = s
    slot_y = lambda m, slot: -(SLOT[(m, slot)]["y"] + SLOT[(m, slot)]["h"] / 2)

    # ---- heights: one corridor base per row, lanes by interval colouring (routing.js)
    row_top = defaultdict(lambda: -1e9)
    for p in view["panes"]:
        row_top[p["row"]] = max(row_top[p["row"]], p["top"])
    cor_y = lambda row: row_top[row] + R_COR_GAP

    def interval(i):
        a, b = box(bundles[i]["s"]), box(bundles[i]["t"])
        return (min(a["x"], b["x"]) - G, max(a["x"] + a["w"], b["x"] + b["w"]) + G)

    lane, by_row = {}, defaultdict(list)
    for i, bd in enumerate(bundles):
        if is_track(bd["span"]):
            by_row[PANE[bd["s"]]["row"]].append(i)
    for r in sorted(by_row):
        order = sorted(by_row[r], key=lambda i: (bundles[i]["span"] == "row", interval(i)[1] - interval(i)[0], interval(i)[0], i))
        used = []
        for i in order:
            x0, x1 = interval(i)
            k = 0
            while k < len(used) and any(x0 < b + 0.05 and x1 > a - 0.05 for a, b in used[k]):
                k += 1
            if k == len(used):
                used.append([])
            used[k].append((x0, x1))
            lane[i] = k
    lanes_over = {p["unit"]: 0 for p in view["plates"]}
    for i, k in lane.items():
        x0, x1 = interval(i)
        row = PANE[bundles[i]["s"]]["row"]
        for p in view["plates"]:
            if p["row"] == row and x0 < p["x"] + p["w"] and x1 > p["x"]:
                lanes_over[p["unit"]] = max(lanes_over[p["unit"]], k + 1)
    lane_y = lambda i: cor_y(PANE[bundles[i]["s"]]["row"]) + lane.get(i, 0) * R_LANE
    band_top = lambda unit: cor_y(PLATE[unit]["row"]) + max(0, lanes_over[unit] - 1) * R_LANE
    sky_base = lambda unit: band_top(unit) + R_SKY_GAP
    z_track = lambda m: face(m) + R_FRONT

    link_off = {}
    for bd in bundles:
        n = len(bd["links"])
        step = min(R_MEMBER, (R_LANE * 0.8) / max(1, n))
        for k, li in enumerate(bd["links"]):
            link_off[li] = (k - (n - 1) / 2) * step
    link_height = lambda li: lane_y(links[li]["bundle"]) + link_off[li] if is_track(links[li]["span"]) else 1e3 + lane.get(links[li]["bundle"], 0)

    # ---- gutter risers: one per link end, fixed; innermost the end that climbs highest
    gutter_x = {}
    ends = defaultdict(list)
    for li, l in enumerate(links):
        ends[(l["s"], "out")].append((li, "s", slot_y(l["s"], l["ss"]), link_height(li)))
        ends[(l["t"], "in")].append((li, "t", slot_y(l["t"], l["ts"]), link_height(li)))
    for (m, side), lst in ends.items():
        b = box(m)
        lst.sort(key=lambda e: (-e[3], -e[2], e[0]))
        step = min(R_RISER, (G - R_GUT0 - 0.03) / max(1, len(lst) - 1))
        for j, (li, role, _, _) in enumerate(lst):
            gutter_x[(li, role)] = b["x"] + b["w"] + R_GUT0 + j * step if side == "out" else b["x"] - R_GUT0 - j * step

    # ---- plate ports and strands (routing.js)
    def side_port(unit, toward):
        p, o = PLATE[unit], PLATE[toward]
        right = o["x"] > p["x"]
        port = p["ports"].get("right" if right else "left")
        return {"x": port["x"] if port else (p["x"] + p["w"] if right else p["x"]), "z": p["z"], "side": "right" if right else "left"}

    def row_port(unit, toward):
        p, o = PLATE[unit], PLATE[toward]
        port = p["ports"]["front"] if o["row"] > p["row"] else p["ports"]["back"]
        return {"x": port["x"], "z": p["z"]}

    def right_of(a, b):
        dx, dz = b[0] - a[0], b[2] - a[2]
        L = math.hypot(dx, dz)
        return [0, 0, 1] if L < 1e-6 else [-dz / L, 0, dx / L]

    def plate_right(s, t):
        a, b = row_port(s, t), row_port(t, s)
        return right_of([a["x"], 0, a["z"]], [b["x"], 0, b["z"]])

    strand_of = {}
    for pb in view["plate_bundles"]:
        if pb["span"] != "cross_row":
            continue
        r = plate_right(pb["s"], pb["t"])
        across = lambda m: centre_x(m) * r[0] + PANE[m]["z"] * r[2]
        lst = sorted(pb["bundles"], key=lambda i: (across(bundles[i]["s"]) + across(bundles[i]["t"]), i))
        for k, i in enumerate(lst):
            strand_of[i] = (k, len(lst))

    def strand_offset(i):
        k, n = strand_of.get(i, (0, 1))
        return R_SIDE + (k - (n - 1) / 2) * R_STRAND

    def arc_controls(p0, p3, off, right, base):
        y = max(p0[1], p3[1], base) + R_APEX + R_RISE * math.hypot(p3[0] - p0[0], p3[2] - p0[2])
        return [p0[0] + right[0] * off, y, p0[2] + right[2] * off], [p3[0] + right[0] * off, y, p3[2] + right[2] * off]

    def route(li, a, b, dy=0.0):
        """A line of link li between anchors a (caller) and b (callee): {p, gx, z}."""
        l = links[li]
        i = l["bundle"]
        h0, t0 = [a["gx"], a["p"][1], a["z"]], [b["gx"], b["p"][1], b["z"]]
        P = _Path(a["p"])
        if is_track(l["span"]):
            y = lane_y(i) + link_off[li] + dy
            return P.rounded([h0, [a["gx"], y, a["z"]], [b["gx"], y, a["z"]], [b["gx"], y, b["z"]], t0, b["p"]], R_CORNER).a
        c1, c2 = arc_controls(h0, t0, strand_offset(i) + dy, plate_right(bundles[i]["us"], bundles[i]["ut"]), sky_base(bundles[i]["us"]))
        P.line(h0, None)
        P.cubic(c1, c2, t0, 40)
        P.line(b["p"], None)
        return P.a

    def slot_anchor(li, role, y=None):
        l = links[li]
        m = l["s"] if role == "s" else l["t"]
        b = box(m)
        yy = slot_y(m, l["ss"] if role == "s" else l["ts"]) if y is None else y
        return {"p": [b["x"] + b["w"] if role == "s" else b["x"], yy, face(m) + 0.004], "gx": gutter_x[(li, role)], "z": z_track(m)}

    out_links = [route(li, slot_anchor(li, "s"), slot_anchor(li, "t")) for li in range(len(links))]

    out_ribbons = []
    for pb in view["plate_bundles"]:
        A, B = PLATE[pb["s"]], PLATE[pb["t"]]
        if pb["span"] == "row":
            a, b = side_port(pb["s"], pb["t"]), side_port(pb["t"], pb["s"])
            y = row_top[A["row"]]
            h = y + 1.4 + 0.08 * abs(b["x"] - a["x"])
            out_ribbons.append(_bez([a["x"], y, a["z"] + 0.5], [a["x"], h, a["z"] + 0.5], [b["x"], h, b["z"] + 0.5], [b["x"], y, b["z"] + 0.5], 32).a)
        else:
            a, b = row_port(pb["s"], pb["t"]), row_port(pb["t"], pb["s"])
            p0, p3 = [a["x"], row_top[A["row"]], a["z"] + 0.5], [b["x"], row_top[B["row"]], b["z"] + 0.5]
            c1, c2 = arc_controls(p0, p3, R_SIDE, plate_right(pb["s"], pb["t"]), sky_base(pb["s"]))
            out_ribbons.append(_bez(p0, c1, c2, p3, 40).a)

    # ---- ends inside unfolded modules: cards, class rows (closed or opened), class headers
    def class_geom(cl, opened):
        rows = [] if cl["data_only"] else cl["public"] + (cl["private"] if opened else [])
        h = cl["expanded"]["h"] if opened else cl["h"]
        tail_y = cl["y"] - h + dims["box_tail"] / 2 + 0.03 if (not opened and cl["private"]) else None
        return {"x0": cl["x"], "x1": cl["x"] + cl["w"], "rows": rows, "h": h, "tail_y": tail_y,
                "zf": cl["z"] + cl["d"] + (cl["expanded"]["lift"] if opened else 0.0)}

    def row_y(cl, i):
        return cl["y"] - dims["box_head"] - dims["box_row"] * (i + 0.5)

    def in_block(item):
        n = N.get(item)
        return n is not None and n["cls"] and not n["dead"] and n["cls"] in CL

    def class_of_end(item):
        """The class whose opening moves this end (None for a plain card)."""
        if item in CL:
            return item
        return N[item]["cls"] if in_block(item) else None

    def element(item, st):
        """Where an end sits in state st ('o' or 'x'): (group key, x left, x right, y centre, height, z, pitch, inset)."""
        if item in CL:  # a construction lands on the class header
            cl = CL[item]
            g = class_geom(cl, st == "x")
            return (("head", item, st), g["x0"], g["x1"], cl["y"] - dims["box_head"] / 2, dims["box_head"], g["zf"], ROW_PORT_PITCH, ROW_PORT_INSET)
        n = N[item]
        if in_block(item):
            cl = CL[n["cls"]]
            g = class_geom(cl, st == "x")
            if item in g["rows"]:
                ri = g["rows"].index(item)
                return (("crow", cl["id"], ri, st), g["x0"], g["x1"], row_y(cl, ri), dims["box_row"], g["zf"], ROW_PORT_PITCH, ROW_PORT_INSET)
            y = g["tail_y"] if g["tail_y"] is not None else cl["y"] - g["h"] + 0.1
            return (("ctail", cl["id"], st), g["x0"], g["x1"], y, dims["box_tail"], g["zf"], ROW_PORT_PITCH, ROW_PORT_INSET)
        return (("card", item), n["x"], n["x"] + n["w"], n["y"] - n["h"] / 2, n["h"], n["z"] + 0.016, PORT_PITCH, PORT_INSET)

    def folded(item, m, role):
        """(group key, x side, y centre, height, z) of an end on its folded box."""
        b = box(m)
        slot = N[item]["slot"] if item in N else CL[item]["slot"]
        s = SLOT[(m, slot)]
        return (("slot", m, slot), b["x"] + b["w"] if role == "s" else b["x"], -(s["y"] + s["h"] / 2), s["h"], face(m) + 0.004)

    # every cross-module end, for port spreading
    cross = [ei for ei, e in enumerate(edges) if e["ms"] != e["mt"] and e["kind"] != "intra_class"]
    margin_calls = [ei for ei, e in enumerate(edges) if e["ms"] == e["mt"] and e["kind"] != "intra_class"]

    def end_state(e, role, st):
        """(group, x, y, h, z, pitch, inset) of edge e's end (role s|t) in state st (f|o|x)."""
        item, m = (e["s"], e["ms"]) if role == "s" else (e["t"], e["mt"])
        if st == "f":
            g, x, y, h, z = folded(item, m, role)
            return (g + (role,), x, y, h, z, PORT_PITCH, PORT_INSET)
        if st == "x" and class_of_end(item) is None:
            st = "o"
        g, xl, xr, y, h, z, pitch, inset = element(item, st)
        return (g + (role,), xr if role == "s" else xl, y, h, z, pitch, inset)

    group_members = defaultdict(set)  # (group key incl. role) -> edges
    for ei in cross:
        e = edges[ei]
        for role in ("s", "t"):
            for st in ("f", "o", "x"):
                group_members[end_state(e, role, st)[0]].add(ei)

    # ---- margin lanes of each unfolded module (closed classes): interval colouring,
    # shortest first, ties by sorted edge id; lane 0 is next to the cards
    def margin_y(item, st="o"):
        if item in CL:
            return CL[item]["y"] - dims["box_head"] / 2
        return element(item, st)[3]

    margin_lane, margin_pitch, margin_lanes = {}, {}, {}
    by_module = defaultdict(list)
    for ei in margin_calls:
        by_module[edges[ei]["ms"]].append(ei)
    for m, lst in by_module.items():
        # the pane's column top to bottom, as box_layout built it
        items = [(c["y"], ("class", c["id"])) for c in view["classes"] if c["module"] == m]
        items += [(n["y"], ("fn", n["id"])) for n in view["nodes"] if n["module"] == m and "x" in n]
        seq = [it for _, it in sorted(items, key=lambda q: -q[0])]
        lanes, n = column_lanes(seq, sorted({(edges[ei]["s"], edges[ei]["t"]) for ei in lst}), CL)
        assert n == box(m)["lanes"], (m, n, box(m)["lanes"])
        for ei in lst:
            margin_lane[ei] = lanes[(edges[ei]["s"], edges[ei]["t"])]
        room = box(m)["margin"] - MARGIN_IN - MARGIN_OUT
        margin_pitch[m] = min(MARGIN_PITCH, room / max(1, n - 1))
        margin_lanes[m] = n

    # ---- ports: every end of a group spread along its side, ordered by the far end
    # (cross-module: the angle to the far end, most ascending at the top; margin:
    # calls to a card above first, inner lane at the top, then calls to a card below,
    # outer lane at the top). A cross-module group on a card's left side sits above
    # the card's margin ports. Far ends are taken folded unless the far module is the
    # variant's other module, which takes the variant's state.
    port_cache = {}

    def far_point(e, role, far_st):
        o = "t" if role == "s" else "s"
        _, x, y, _, z, _, _ = end_state(e, o, far_st)
        return x, y, z

    def angle(e, role, x, y, far):
        fx, fy, fz = far
        if e["span"] == "cross_row":
            return math.pi / 2
        dx = (fx - x) if role == "s" else (x - fx)
        return math.atan2(fy - y, max(dx, 0.05))

    margin_at = defaultdict(list)  # element group (state o, and x for a class end) -> [(ei, role)]
    for ei in margin_calls:
        e = edges[ei]
        for role in ("s", "t"):
            item = e["s"] if role == "s" else e["t"]
            for st in (("o", "x") if class_of_end(item) is not None else ("o",)):
                margin_at[element(item, st)[0]].append((ei, role))

    def spread(n, k, y, h, pitch, inset):
        p = min(pitch, max(0.0, h - 2 * inset) / max(1, n))
        return y + ((n - 1) / 2 - k) * p

    def cross_port(ei, role, st, other_m, other_st):
        e = edges[ei]
        grp, x, y, h, z, pitch, inset = end_state(e, role, st)
        key = (grp, other_m, other_st)
        if key not in port_cache:
            mem = sorted(group_members[grp])
            scored = []
            for ej in mem:
                f = edges[ej]
                far_m = f["mt"] if role == "s" else f["ms"]
                fs = other_st if far_m == other_m else "f"
                _, xj, yj, _, _, _, _ = end_state(f, role, st)
                scored.append((-angle(f, role, xj, yj, far_point(f, role, fs)), ej))
            scored.sort()
            # a card's or class row's left side also carries its module's margin calls, below
            extra = len(margin_at.get(grp[:-1], [])) if role == "t" and grp[0] != "slot" else 0
            n = len(scored) + extra
            port_cache[key] = {ej: spread(n, k, y, h, pitch, inset) for k, (_, ej) in enumerate(scored)}
        return [x, port_cache[key][ei], z]

    def margin_port(ei, role, st):
        e = edges[ei]
        item = e["s"] if role == "s" else e["t"]
        st2 = "x" if st == "x" and class_of_end(item) is not None else "o"
        grp, xl, xr, y, h, z, pitch, inset = element(item, st2)
        lst = margin_at[grp]
        cross_in = len(group_members.get(grp + ("t",), ()))

        def key(er):
            ej, rj = er
            f = edges[ej]
            me, other = (f["s"], f["t"]) if rj == "s" else (f["t"], f["s"])
            dy = margin_y(other) - margin_y(me)
            above = dy > 0
            return (0, margin_lane[ej], abs(dy), ej) if above else (1, -margin_lane[ej], -abs(dy), ej)

        order = sorted(lst, key=key)
        k = order.index((ei, role))
        return [xl, spread(cross_in + len(order), cross_in + k, y, h, pitch, inset), z]

    # ---- per-call curves and stubs
    def states_of(item, m):
        return ("f", "o", "x") if class_of_end(item) is not None else ("f", "o")

    member_index = {}
    for li, l in enumerate(links):
        for j, ei in enumerate(l["members"]):
            member_index[ei] = (li, j, len(l["members"]))

    def curve_lane_shift(ei, ss, ts):
        """The call's lane among its module pair's calls in this variant (S-curves)."""
        e = edges[ei]
        bi = links[member_index[ei][0]]["bundle"]
        mem = bundles[bi]["members"]
        keyed = []
        for ej in mem:
            f = edges[ej]
            a = cross_port(ej, "s", ss, f["mt"], ts)
            b = cross_port(ej, "t", ts, f["ms"], ss)
            dy = b[1] - a[1]
            sgn = 0 if abs(dy) < 1e-6 else (1 if dy > 0 else -1)
            keyed.append((-sgn * (a[1] + b[1]), ej))
        keyed.sort()
        n = len(keyed)
        r = [ej for _, ej in keyed].index(ei)
        return (r - (n - 1) / 2) * CURVE_LANE

    def s_curve(a, b, fa, fb, shift):
        """Caller port a (right side) to callee port b (left side), in front of the faces."""
        za, zb = max(a[2], fa + CURVE_Z), max(b[2], fb + CURVE_Z)
        dx = b[0] - a[0]
        P = _Path(a)
        if dx > 0.12:
            full = CURVE_FULL * dx
            sh = max(-0.7 * full, min(0.7 * full, shift))
            c1 = [a[0] + full / 2 + sh / 2, a[1], za]
            c2 = [b[0] - (full / 2 - sh / 2), b[1], zb]
            n = max(16, min(48, int(10 + 6 * dx)))
            P.cubic(c1, c2, b, n)
            return P.a
        # against the reading order: over the boxes' tops and back down
        top = max(a[1], b[1], 0.0) + 0.45 + abs(shift) * 0.4
        return P.rounded([[a[0] + 0.14, a[1], za], [a[0] + 0.14, top, za], [b[0] - 0.14, top, zb], [b[0] - 0.14, b[1], zb], b], 0.12).a

    out_calls = []
    for ei, e in enumerate(edges):
        rec = {}
        if e["kind"] == "intra_class":
            cl = CL[e["cls"]]
            g = class_geom(cl, True)

            def yy(item):
                if item == cl["id"]:
                    return cl["y"] - dims["box_head"] / 2
                return row_y(cl, g["rows"].index(item)) if item in g["rows"] else (cl["y"] - g["h"] + 0.1)

            ya, yb = yy(e["s"]), yy(e["t"])
            bulge, z = 0.18 + 0.1 * abs(ya - yb), g["zf"] + 0.004
            rec["loop"] = {"xx": _bez([g["x0"], ya, z], [g["x0"] - bulge, ya, z], [g["x0"] - bulge, yb, z], [g["x0"], yb, z], 16).a}
        elif e["ms"] == e["mt"]:
            m = e["ms"]
            bx = box(m)["x"]
            col_x = bx + box(m)["margin"]
            lx = col_x - MARGIN_IN - margin_lane[ei] * margin_pitch[m]
            v = {}
            for ss in states_of(e["s"], m)[1:]:
                for ts in states_of(e["t"], m)[1:]:
                    a, b = margin_port(ei, "s", ss), margin_port(ei, "t", ts)
                    za, zb = a[2] + 0.004, b[2] + 0.004
                    r = min(MARGIN_CORNER, abs(a[1] - b[1]) / 2 + 1e-3)
                    P = _Path([a[0], a[1], za])
                    v[ss + ts] = P.rounded([[lx, a[1], za], [lx, b[1], zb], [b[0], b[1], zb]], r).a
            rec["margin"] = v
        else:
            li, j, nm = member_index[ei]
            curve, track = {}, {}
            for ss in states_of(e["s"], e["ms"]):
                for ts in states_of(e["t"], e["mt"]):
                    a = cross_port(ei, "s", ss, e["mt"], ts)
                    b = cross_port(ei, "t", ts, e["ms"], ss)
                    if e["span"] == "cross_row":
                        dyc = (j - (nm - 1) / 2) * CURVE_DY
                        ga = gutter_x[(li, "s")] + (j - (nm - 1) / 2) * 0.03
                        gb = gutter_x[(li, "t")] - (j - (nm - 1) / 2) * 0.03
                        curve[ss + ts] = route(li, {"p": a, "gx": ga, "z": z_track(e["ms"])}, {"p": b, "gx": gb, "z": z_track(e["mt"])}, dyc)
                    else:
                        curve[ss + ts] = s_curve(a, b, face(e["ms"]), face(e["mt"]), curve_lane_shift(ei, ss, ts))
                    if e["span"] != "plate" and (ss, ts) != ("f", "f"):
                        dy = (j - (nm - 1) / 2) * min(0.06, 0.18 / nm)
                        jit = (j - (nm - 1) / 2) * R_MEMBER_RISER
                        sa = slot_anchor(li, "s") if ss == "f" else {"p": a, "gx": gutter_x[(li, "s")] + jit, "z": z_track(e["ms"])}
                        sb = slot_anchor(li, "t") if ts == "f" else {"p": b, "gx": gutter_x[(li, "t")] - jit, "z": z_track(e["mt"])}
                        track[ss + ts] = route(li, sa, sb, dy)
            rec["curve"] = curve
            if track:
                rec["track"] = track
        out_calls.append(rec)

    return {
        "rule": [
            "A module pair in focus (hover, selection, a lit pipeline, a clicked ribbon, or an unfolded end) draws each call as its own curve; out of focus the pair is one track.",
            "Curves run caller's right side to callee's left side, in front of the box faces; ends spread along the side in the order of the far end; a lane shifts each curve's steep middle.",
            "Calls inside an unfolded module run in the left margin, one lane per overlapping call (interval colouring, shortest first, ties by sorted id), tapering from the caller.",
        ],
        "plates": {u: {"band_top": _r3(band_top(u)), "sky_base": _r3(sky_base(u)), "lanes": lanes_over[u]} for u in sorted(PLATE)},
        "links": out_links,
        "ribbons": out_ribbons,
        "calls": out_calls,
        "margin": {m: {"lanes": margin_lanes[m], "pitch": _r3(margin_pitch[m]), "width": box(m)["margin"]} for m in sorted(margin_lanes)},
        "constants": {"curve_z": CURVE_Z, "port_pitch": PORT_PITCH, "curve_lane": CURVE_LANE, "margin_pitch": MARGIN_PITCH, "margin_lane": MARGIN_LANE, "track_front": R_FRONT},
    }
