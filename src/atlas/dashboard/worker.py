from __future__ import annotations

import argparse
import json

from atlas.dashboard.refresh import refresh_project


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", required=True)
    parser.add_argument("--job-id", required=True)
    args = parser.parse_args(argv)

    try:
        result = refresh_project(
            args.root,
            job_id=args.job_id,
        )
    except Exception as error:
        print(json.dumps({"ok": False, "error": str(error)}))
        return 1

    print(json.dumps({"ok": True, "result": result}, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
