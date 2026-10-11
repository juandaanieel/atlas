from __future__ import annotations

import argparse
from pathlib import Path

from atlas.analyzer.payload import analyze_path, write_payload
from atlas.explorer.writer import write_explorer
from atlas.story import story_for_snapshot, write_story
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

    dashboard = subparsers.add_parser(
        "dashboard",
        help="Open the central, local-only project dashboard.",
    )
    dashboard.add_argument(
        "--port",
        type=_dashboard_port,
        default=7331,
        help="Loopback port. Defaults to 7331.",
    )
    dashboard.add_argument(
        "--state-dir",
        metavar="PATH",
        type=Path,
        help="Private dashboard state directory. Defaults to ~/.atlas/dashboard.",
    )
    dashboard.add_argument(
        "--no-open",
        action="store_true",
        help="Do not open the dashboard in the default browser.",
    )
    dashboard.add_argument(
        "--timeout",
        metavar="SECONDS",
        type=_positive_integer,
        default=900,
        help="Maximum time for one project update. Defaults to 900 seconds.",
    )

    args = parser.parse_args(argv)

    try:
        if args.command == "explore":
            root = args.where
            snapshot = analyze_path(root)
            story = story_for_snapshot(root, snapshot)
            write_payload(root, snapshot)
            write_story(root, snapshot, story)
            write_vault(root, snapshot)
            output = write_explorer(root, snapshot, story)
            print(output)

        elif args.command == "vault":
            root = args.where
            snapshot = analyze_path(root, vault_dir=args.out)
            output = write_vault(root, snapshot, out=args.out)
            print(output)

        elif args.command == "dashboard":
            from atlas.dashboard.server import serve_dashboard

            serve_dashboard(
                state_dir=args.state_dir,
                port=args.port,
                open_browser=not args.no_open,
                timeout_seconds=args.timeout,
            )
    except (OSError, ValueError) as error:
        parser.error(str(error))


def _analysis_directory(value: str) -> Path:
    path = Path(value).expanduser()
    if not path.exists():
        raise argparse.ArgumentTypeError(f"directory does not exist: {value}")
    if not path.is_dir():
        raise argparse.ArgumentTypeError(f"not a directory: {value}")
    return path.resolve()


def _output_directory(value: str) -> Path:
    path = Path(value).expanduser()
    if path.is_symlink():
        raise argparse.ArgumentTypeError(f"vault output cannot be a symlink: {value}")
    if path.exists() and not path.is_dir():
        raise argparse.ArgumentTypeError(f"vault output is not a directory: {value}")
    return path.absolute()


def _dashboard_port(value: str) -> int:
    port = int(value)
    if not 1 <= port <= 65535:
        raise argparse.ArgumentTypeError("port must be between 1 and 65535")
    return port


def _positive_integer(value: str) -> int:
    number = int(value)
    if number <= 0:
        raise argparse.ArgumentTypeError("value must be greater than zero")
    return number


if __name__ == "__main__":
    main()
