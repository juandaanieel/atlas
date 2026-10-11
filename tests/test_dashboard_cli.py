from atlas.cli import main


def test_dashboard_command_passes_safe_defaults(monkeypatch, tmp_path):
    called = {}

    def fake_serve_dashboard(**options):
        called.update(options)

    monkeypatch.setattr(
        "atlas.dashboard.server.serve_dashboard",
        fake_serve_dashboard,
    )

    main(
        [
            "dashboard",
            "--state-dir",
            str(tmp_path / "state"),
            "--no-open",
        ]
    )

    assert called == {
        "state_dir": tmp_path / "state",
        "port": 7331,
        "open_browser": False,
        "timeout_seconds": 900,
    }
