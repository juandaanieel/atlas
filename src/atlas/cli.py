from __future__ import annotations

import argparse
from pathlib import Path

from atlas.analyzer.discovery import resolve_workflow_path
from atlas.analyzer.payload import analyze_path, write_payload
from atlas.explorer.writer import write_explorer
from atlas.vault import write_vault


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(prog="atlas", description="Explore Python packages from structure first.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    explore = subparsers.add_parser("explore", help="Analyze and write the static local explorer.")
    explore.add_argument(
        "--where",
        required=True,
        metavar="PATH",
        type=_analysis_directory,
        help="Folder to explore.",
    )
    explore.add_argument(
        "--workflow",
        metavar="PATH",
        type=_workflow_path,
        help="Python example file or directory of examples. Defaults to PATH/examples.",
    )

    vault = subparsers.add_parser("vault", help="Write an Obsidian-compatible Atlas vault.")
    vault.add_argument(
        "--where",
        required=True,
        metavar="PATH",
        type=_analysis_directory,
        help="Folder to explore.",
    )
    vault.add_argument(
        "--out",
        metavar="PATH",
        type=_output_directory,
        help="Vault directory. Defaults to PATH/.atlas/vault.",
    )
    vault.add_argument(
        "--workflow",
        metavar="PATH",
        type=_workflow_path,
        help="Python example file or directory of examples. Defaults to PATH/examples.",
    )

    args = parser.parse_args(argv)

    try:
        if args.command == "explore":
            root = args.where
            snapshot = analyze_path(root, workflow_path=args.workflow)
            write_payload(root, snapshot)
            write_vault(root, snapshot)
            output = write_explorer(root, snapshot)
            print(output)

        elif args.command == "vault":
            root = args.where
            snapshot = analyze_path(root, vault_dir=args.out, workflow_path=args.workflow)
            output = write_vault(root, snapshot, out=args.out)
            print(output)
    except (OSError, ValueError) as error:
        parser.error(str(error))


def _analysis_directory(value: str) -> Path:
    path = Path(value).expanduser()
    if not path.exists():
        raise argparse.ArgumentTypeError(f"directory does not exist: {value}")
    if not path.is_dir():
        raise argparse.ArgumentTypeError(f"not a directory: {value}")
    return path.resolve()


def _workflow_path(value: str) -> Path:
    try:
        return resolve_workflow_path(value)
    except (OSError, ValueError) as error:
        raise argparse.ArgumentTypeError(str(error)) from error


def _output_directory(value: str) -> Path:
    path = Path(value).expanduser()
    if path.is_symlink():
        raise argparse.ArgumentTypeError(f"vault output cannot be a symlink: {value}")
    if path.exists() and not path.is_dir():
        raise argparse.ArgumentTypeError(f"vault output is not a directory: {value}")
    return path.absolute()


if __name__ == "__main__":
    main()
