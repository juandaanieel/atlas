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
```

Open `index.html` in a browser to view the explorer. The generated `.atlas`
directory is output, not source code. When the explored folder is inside a Git
repository, Atlas adds the generated directory to `.git/info/exclude` so it stays
out of `git status` without changing the repository's `.gitignore`.

## What it shows

The explorer focuses on structural signals in Python packages:

- Python files, modules, functions, classes, methods, imports, and static calls.
- Entry points and reachable functions.
- Dead private functions.
- Structurally duplicated functions.
- Highly connected functions.
- Circular imports and unresolved calls.

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
