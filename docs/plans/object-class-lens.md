# Object class lens

> Status: Implemented (2026-07-13).

## Goal

Make an object in the Atlas Explorer a useful review entry point. Selecting an
object opens the class source in the inspector and changes the main canvas to a
method-level map for that class.

The map separates methods reached from `__init__` from methods that are not
reached from it. It may also show methods that share state initialized by
`__init__`. The latter is a state relationship, not a call relationship.

## Scope

The feature applies to classes already present in `payload.objects`.

- Clicking an object card opens its class-level inspector and its method map in
  the same action.
- The source inspector shows the complete class excerpt, with the existing
  line numbers and syntax highlighting.
- Clicking a method in the class map or object detail opens that method's source
  while keeping the method map visible.
- A clear `Back to object relationships` control returns to the scoped object
  relationship graph.
- The existing function graph, object relationship graph, source inspector,
  history buttons, and hash links continue to work.

The implemented version adds AST-derived object records to the v2 snapshot:
class source excerpts, constructor and method IDs, initialized fields, and
per-method field access. It combines those records with existing resolved call
edges and does not infer runtime behaviour.

## Interaction design

### Selecting an object

Clicking an object card selects the class, opens the inspector, and presents a
class-scoped graph in the main canvas. The toolbar names the selected class and
shows its method count. Its primary navigation action reads `Back to object
relationships`.

The class inspector starts with the class name, docstring summary, module, and
location, then shows the full class source before the fields, collaborators,
and state-access tables. This makes code available immediately without losing
the structural summary.

The existing inline Codex prompt composer remains limited to functions and
methods. Class source is readable but does not gain line-range prompt actions
in this change.

### Class method map

The graph contains every analysed method declared by the selected class,
including private methods and `__init__` when it exists.

- `__init__` is a visually distinct anchor at the start of the initialization
  group.
- **Initialization path** contains `__init__` and every class method reachable
  through one or more resolved, intra-class calls from it.
- **Not reached from `__init__`** contains all remaining methods. This wording
  avoids claiming that a method is behaviourally independent; it may still
  share fields or be called by external code.
- Solid directed edges represent resolved intra-class calls.
- A dashed, labelled state link may connect `__init__` to a method that
  reads or writes a field assigned by `__init__`. It must be visually distinct
  from a call edge and may be omitted when it would make a dense graph hard to
  read.

When a class has no constructor, the initialization group displays `No
constructor`; every method belongs to the second group. When it has no methods,
the main canvas displays an explanatory empty state.

Selecting a method highlights its immediate callers and callees in the class
map and replaces the inspector contents with the existing function inspector.
It must not reset the class focus, switch to the ordinary function graph, or
discard the back control.

## State and navigation

Replace the function-only `sourceSelection` state with an explicit detail
selection:

```js
detailSelection: { type: "function" | "object", id: string } | null
objectFocus: string | null
```

`objectFocus` selects the class method map; `detailSelection` selects what the
right inspector renders. A selected method in a class map therefore has
`objectFocus` set to the class ID and a function detail selection.

Update navigation snapshots and hash parsing/writing to preserve both values.
Keep existing `source=<function id>` links valid. Use a typed detail parameter
for newly written object links, for example `detail=<id>&detailType=object`.

Clear `objectFocus` when a user deliberately changes scope, switches between
Functions and Objects, opens the full graph, or selects a tree function. The
back control clears only `objectFocus` and restores the object relationship
graph; it does not need to clear a visible inspector selection.

## Implementation plan

1. Update selection state, navigation snapshots, and hash handling in
   `src/atlas/explorer/static/src/app.js`.

   - Introduce `detailSelection` and `objectFocus`.
   - Migrate all function, city-map, close-inspector, review-prompt, and
     disabled-function flows from `sourceSelection` without changing their
     existing behaviour.
   - Make `selectObject` set both the object detail selection and object focus.
   - Add a method-selection path that keeps object focus intact.

2. Make the inspector render class source and object details.

   - Branch `renderDetail` on the detail selection type.
   - Route object selections to the existing `renderObjectDetail` path.
   - Render `object.source_excerpt` as the primary `Code` section rather than
     showing only constructor source at the bottom of the inspector.
   - Make method names in the object state-access table interactive, using the
     object-focused method-selection path.
   - Preserve the function-only quick prompts, selected source ranges, and
     inline prompt composer.

3. Build an object-focused method graph in the client.

   - Add `objectMethodGraph(object)` and select it from `currentGraph` when
     `objectFocus` is present.
   - Gather method IDs from the constructor, public methods, and private
     methods. Filter `model.edges` to edges whose source and target both belong
     to that set.
   - Traverse the filtered outgoing edges from `__init__` to classify the
     initialization path. Put methods outside that reachability set in the
     second group.
   - Derive optional state links by intersecting the constructor's assigned
     fields with each method's recorded reads and writes.
   - Keep graph construction deterministic: sort nodes by source order or
     method name and sort edges by source and target.

4. Add a grouped class-map layout and controls.

   - Extend the layout and drawing code with group headers for
     `Initialization path` and `Not reached from __init__`.
   - Draw the constructor distinctly and render a compact legend for call and
     state links.
   - Add the class name, method count, and `Back to object relationships`
     action to the graph toolbar.
   - Fit and pan the graph using the existing canvas controls. Keep the
     inspector's fixed width and narrow-screen overlay behaviour.

5. Add focused tests and regenerate the static explorer in the CLI integration
   test.

   - Extend `tests/test_objects.py` with fixtures for an init call chain, a
     method not reached from `__init__`, a shared initialized field, and a
     class without `__init__`.
   - Add unit tests for method collection, initialization-path grouping, and
     state-link derivation. Extract small pure helpers from the browser code
     only if they can be tested without duplicating graph semantics in Python.
   - Update `tests/test_cli.py` to assert that the emitted explorer contains
     the object-detail selection and class-map entry points.
   - Manually verify object click, method click, close, back, browser history,
     direct function links, theme switching, and narrow-screen behaviour.

## Acceptance criteria

- Clicking an object card opens source for that class and shows its method map
  in the main canvas.
- The class source includes the class declaration and all available method
  lines, with correct line numbers and syntax highlighting.
- The map puts `__init__` and its intra-class reachable calls in the
  initialization path, and labels all other methods as not reached from
  `__init__`.
- Call edges and initialized-state links have distinguishable visual treatment.
- A class with no constructor or no methods produces a clear, useful empty
  presentation rather than a broken graph.
- Selecting a method keeps the class map visible and opens that method's source.
- Back returns to the scoped object relationship graph. Closing the inspector
  does not change the selected graph or class map.
- Existing function source links, city-map callable selection, hash links,
  browser history, review prompts, themes, and responsive layout remain
  functional.
