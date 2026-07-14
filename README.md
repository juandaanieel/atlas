# Atlas

Atlas is a local Python code explorer. It analyzes one folder, writes a static
HTML explorer into that folder, and does not need a server or internet access to
view the result.

Atlas uses Python's AST. It does not use AI and it does not invent call edges
when static analysis cannot prove them.

## Install

Atlas uses Pixi for local development and execution. From the repository root:

```bash
pixi install
```

## Basic usage

Run Atlas with an explicit folder:

```bash
pixi run atlas explore --where PATH_TO_FOLDER_TO_EXPLORE
```

For example:

```bash
pixi run atlas explore --where ./src
```

Atlas writes its output inside the explored folder:

```text
PATH_TO_FOLDER_TO_EXPLORE/.atlas/atlas.json
PATH_TO_FOLDER_TO_EXPLORE/.atlas/explorer/index.html
PATH_TO_FOLDER_TO_EXPLORE/.atlas/vault/
```

Open `index.html` in a browser to view the explorer. The generated `.atlas`
directory is output, not source code. When the explored folder is inside a Git
repository, Atlas adds the generated directory to `.git/info/exclude` so it stays
out of `git status` without changing the repository's `.gitignore`.

`atlas.json` is the canonical, versioned `AnalysisSnapshot` representation. The
explorer and vault are generated from the same in-memory snapshot during one
`atlas explore` run, while other tools can load the JSON representation later.

## Architecture vault

Atlas can also materialize an Obsidian-compatible vault. It writes one linked
note per function or method, plus deterministic pipeline and example use-case
notes. Use cases are documentation pages in `docs/` whose names match assets in
`examples/`. Use `--workflow PATH` to add a Python example file, or every Python
example beneath a directory, as a workflow use case without a matching Markdown
page. The generated `00-atlas` directory is safe to regenerate; the
`10-functionality` and `20-proposals` directories are reserved for reviewed
architecture definitions and proposals.

```bash
pixi run atlas vault --where PATH_TO_FOLDER_TO_EXPLORE
```

Use `--out PATH` to write the vault somewhere else.

An accepted functionality note lists stable Atlas function IDs in its
frontmatter. Atlas projects that membership back onto the generated function
notes as links and tags, while keeping the human-authored functionality note
unchanged.

## What it shows

The explorer focuses on structural signals in Python packages:

- Python files, modules, functions, classes, methods, imports, and static calls.
- Entry points and reachable functions.
- Dead private functions.
- Structurally duplicated functions.
- Highly connected functions.
- Circular imports and unresolved calls.
- Interactive static call tracing across source files. Open a function and use
  `Trace from`, then Shift-click another function or use `Trace to` in its
  inspector. Atlas highlights the directed route and lets each call edge open
  its exact source line.
- A repository city map whose directory and file areas follow the Mindwalk
  squarified-treemap geometry; switch the left navigation rail to City map and
  click a directory to drill into its contents.

## Development

Run the test suite with:

```bash
pixi run test
```

Or, if the package is installed in another Python environment:

```bash
python -B -m pytest
```

## License

Atlas is licensed under the GNU General Public License version 3. See
`LICENSE`.
