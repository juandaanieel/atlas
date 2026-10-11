from __future__ import annotations

import http.client
import json
import shutil
import threading
import time
from pathlib import Path

import pytest

from atlas.dashboard.server import create_dashboard_server


FIXTURES = Path(__file__).parent / "fixtures"


@pytest.fixture
def dashboard_server(tmp_path):
    server, application = create_dashboard_server(
        state_dir=tmp_path / "state",
        port=0,
        timeout_seconds=30,
    )
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield server, application
    finally:
        server.shutdown()
        server.server_close()
        application.close()
        thread.join(timeout=2)


def test_dashboard_requires_its_exact_loopback_host(dashboard_server):
    server, _ = dashboard_server
    connection = http.client.HTTPConnection("127.0.0.1", server.server_port)

    connection.request("GET", "/", headers={"Host": "attacker.example"})
    response = connection.getresponse()

    assert response.status == 421
    assert json.loads(response.read())["error"] == "Unrecognized dashboard host"


def test_dashboard_api_requires_the_cookie_and_session_header(dashboard_server):
    server, application = dashboard_server
    connection = http.client.HTTPConnection("127.0.0.1", server.server_port)

    connection.request("GET", "/")
    denied = connection.getresponse()
    assert denied.status == 403
    denied.read()

    connection.request("GET", f"/?token={application.bootstrap_token}")
    bootstrap = connection.getresponse()
    cookie = bootstrap.getheader("Set-Cookie").split(";", 1)[0]
    assert bootstrap.status == 303
    assert bootstrap.getheader("Location") == "/"
    bootstrap.read()

    connection.request("GET", "/", headers={"Cookie": cookie})
    page = connection.getresponse()
    assert page.status == 200
    assert "frame-ancestors 'none'" in page.getheader("Content-Security-Policy")
    page.read()

    connection.request("GET", "/api/projects")
    unauthorized = connection.getresponse()
    assert unauthorized.status == 403
    unauthorized.read()

    connection.request(
        "GET",
        "/api/projects",
        headers={
            "Cookie": cookie,
            "X-Atlas-Token": application.session_token,
        },
    )
    authorized = connection.getresponse()

    assert authorized.status == 200
    assert json.loads(authorized.read()) == {"projects": []}


def test_dashboard_rejects_cross_origin_mutations(dashboard_server, tmp_path):
    server, application = dashboard_server
    project = tmp_path / "project"
    project.mkdir()
    connection, cookie = _dashboard_connection(server, application)
    body = json.dumps({"path": str(project)})

    connection.request(
        "POST",
        "/api/projects",
        body=body,
        headers={
            "Content-Type": "application/json",
            "Cookie": cookie,
            "Origin": "https://attacker.example",
            "X-Atlas-Token": application.session_token,
        },
    )
    response = connection.getresponse()

    assert response.status == 403
    response.read()
    assert application.registry.list() == []


def test_dashboard_rejects_invalid_project_input_without_closing_the_server(
    dashboard_server,
):
    server, application = dashboard_server
    connection, cookie = _dashboard_connection(server, application)

    response = _json_request(
        connection,
        application,
        cookie,
        "POST",
        "/api/projects",
        {"path": 42},
        expected_status=400,
    )

    assert response["error"] == "Project path must be text"


def test_dashboard_registers_without_writing_and_remove_only_unregisters(
    dashboard_server,
    tmp_path,
):
    server, application = dashboard_server
    project = tmp_path / "project"
    project.mkdir()
    source = project / "module.py"
    source.write_text("def run():\n    return 1\n", encoding="utf-8")
    connection, cookie = _dashboard_connection(server, application)

    registered = _json_request(
        connection,
        application,
        cookie,
        "POST",
        "/api/projects",
        {"path": str(project)},
        expected_status=201,
    )["project"]
    removed = _json_request(
        connection,
        application,
        cookie,
        "DELETE",
        f"/api/projects/{registered['id']}",
        {},
    )

    assert removed["deleted_files"] is False
    assert source.read_text(encoding="utf-8") == "def run():\n    return 1\n"
    assert not (project / ".atlas").exists()


def test_dashboard_refresh_job_updates_a_registered_project(
    dashboard_server,
    tmp_path,
):
    server, application = dashboard_server
    project = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", project)
    registered = application.registry.add(project)
    connection, cookie = _dashboard_connection(server, application)

    document = _json_request(
        connection,
        application,
        cookie,
        "POST",
        f"/api/projects/{registered['id']}/refresh",
        {},
        expected_status=202,
    )
    deadline = time.monotonic() + 20
    while time.monotonic() < deadline:
        job = application.jobs.get(document["job"]["id"])
        if job["state"] not in {"queued", "running"}:
            break
        time.sleep(0.05)

    assert job["state"] == "complete", job["error"]
    assert (project / ".atlas" / "atlas.json").is_file()
    assert not (project / ".atlas" / "explorer").exists()


def test_central_explorer_uses_current_assets_and_nonce_protected_payload(
    dashboard_server,
    tmp_path,
):
    server, application = dashboard_server
    project = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", project)
    registered = application.registry.add(project, name='unsafe </title><script>alert("x")</script>')
    from atlas.dashboard.refresh import refresh_project

    refresh_project(project, job_id="server-page")
    connection = http.client.HTTPConnection("127.0.0.1", server.server_port)

    _, cookie = _dashboard_connection(server, application)
    connection.request(
        "GET",
        f"/projects/{registered['id']}",
        headers={"Cookie": cookie},
    )
    response = connection.getresponse()
    source = response.read().decode("utf-8")

    assert response.status == 200
    assert 'src="/assets/app.bundle.js?v=' in source
    assert 'href="/dashboard/project.css"' in source
    assert "<script>" not in source
    assert "</title><script>alert" not in source
    assert "&lt;/title&gt;&lt;script&gt;" in source


def test_dashboard_assets_do_not_accept_traversal(dashboard_server):
    server, _ = dashboard_server
    connection = http.client.HTTPConnection("127.0.0.1", server.server_port)

    connection.request("GET", "/assets/../dashboard/server.py")
    response = connection.getresponse()

    assert response.status == 404
    response.read()


def _dashboard_connection(server, application):
    connection = http.client.HTTPConnection("127.0.0.1", server.server_port)
    connection.request("GET", f"/?token={application.bootstrap_token}")
    response = connection.getresponse()
    assert response.status == 303
    cookie = response.getheader("Set-Cookie").split(";", 1)[0]
    response.read()
    connection.request("GET", "/", headers={"Cookie": cookie})
    dashboard = connection.getresponse()
    assert dashboard.status == 200
    dashboard.read()
    return connection, cookie


def _json_request(
    connection,
    application,
    cookie,
    method,
    path,
    body,
    *,
    expected_status=200,
):
    connection.request(
        method,
        path,
        body=json.dumps(body),
        headers={
            "Content-Type": "application/json",
            "Cookie": cookie,
            "Origin": f"http://127.0.0.1:{application.port}",
            "X-Atlas-Token": application.session_token,
        },
    )
    response = connection.getresponse()
    document = json.loads(response.read())
    assert response.status == expected_status, document
    return document
