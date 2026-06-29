from __future__ import annotations

import argparse
from pathlib import Path

from atlas.analyzer.payload import load_payload, write_payload
from atlas.explorer.writer import write_explorer


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(prog="atlas", description="Explore Python packages from structure first.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    explore = subparsers.add_parser("explore", help="Analyze and write the static local explorer.")
    explore.add_argument("--where", required=True, metavar="PATH", help="Folder to explore.")

    args = parser.parse_args(argv)

    if args.command == "explore":
        root = Path(args.where).resolve()
        write_payload(root)
        payload = load_payload(root)
        output = write_explorer(root, payload)
        print(output)


if __name__ == "__main__":
    main()
