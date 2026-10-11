# Guide authoring

`atlas.json` is the canonical, versioned `AnalysisSnapshot` representation. The
explorer and vault are generated from the same in-memory snapshot during one
`atlas explore` run, while other tools can load the JSON representation later.

The explorer's Guide tab is driven by `atlas-story.json`: a validated,
snapshot-bound reading path from the package's entry surface inward. Atlas
builds it from static facts: the package map, the entry surface (the names the
package exports through `__all__` or package `__init__` re-exports, or, when it
exports nothing, every public function without an internal caller), up to three
pipeline chapters walking the exported roots (exported nearest the top-level
package first, then by reach), the most stateful class, review pressure, and one signal chapter for each review signal present (dead code,
clone groups, load-bearing functions, import cycles).

To choose which functions the guide walks, place an `atlas-focus.json` file at
the explored folder's root. Each item names a stable Atlas function, method or
class ID, with an optional one-sentence note; the guide then has one pipeline
chapter per item in your order, from that function or the class's constructor:

```json
{"focus_version": 1, "items": [{"id": "pkg.layout.build_device", "note": "Start here."}]}
```

To author the whole guide yourself, place an `atlas-story.json` file at the
explored folder's root instead; it takes precedence over the focus file. Atlas
validates every referenced scope and symbol before copying it into `.atlas` and
embedding it in the explorer. An authored story must name the current
`snapshot_id`, so stale guides fail clearly instead of pointing at changed code.

The portable authoring contract is published as `schema/atlas-story.schema.json`
(story version 2). Each chapter has a `kind`: `chapter`, `pipeline` (requires
`view.pipeline_root`) or `signal` (requires `view.signal`: `dead`, `clones`,
`load_bearing` or `import_cycles`). Chapter views use a stable vocabulary:
`scope`, `level` (`package`, `module` or `function`), `unfold` (module IDs),
`camera` (`axonometric`, `plan` or `elevation`), `signal`, `pipeline_root`,
`selection`, `source`, `object`, `trace_start`, `trace_end`, `context`,
`structure`, and `cross_file`. Evidence is a list of stable Atlas symbol or
object IDs, rendered as direct inspection controls.
