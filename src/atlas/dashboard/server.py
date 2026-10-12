from __future__ import annotations

import html
import json
import mimetypes
import secrets
import webbrowser
from http.cookies import SimpleCookie
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from atlas.analyzer.payload import load_payload
from atlas.dashboard.jobs import ACTIVE_STATES, RefreshJobs
from atlas.dashboard.registry import ProjectRegistry
from atlas.explorer.writer import ASSETS
from atlas.explorer.writer import STATIC_DIR as EXPLORER_STATIC_DIR
from atlas.explorer.writer import render_explorer, script_safe_json
from atlas.story import story_for_snapshot


DASHBOARD_STATIC_DIR = Path(__file__).parent / "static"
MAX_REQUEST_BYTES = 64 * 1024


class DashboardApplication:
    def __init__(
        self,
        state_dir: str | Path,
        *,
        timeout_seconds: int = 900,
    ):
        self.registry = ProjectRegistry(state_dir)
        self.jobs = RefreshJobs(self.registry.state_dir, timeout_seconds=timeout_seconds)
        self.session_token = secrets.token_urlsafe(32)
        self.bootstrap_token = secrets.token_urlsafe(32)
        self.port = 0

    def projects(self) -> list[dict]:
        projects = []
        for project in self.registry.list():
            item = dict(project)
            item["status"] = self.registry.project_status(project)
            latest_job = self.jobs.latest_for(project["id"])
            if latest_job and latest_job["state"] in ACTIVE_STATES:
                item["status"] = {
                    **item["status"],
                    "state": latest_job["state"],
                    "message": "Waiting to update" if latest_job["state"] == "queued" else "Updating project",
                }
            elif latest_job and latest_job["state"] == "failed":
                item["status"] = {
                    **item["status"],
                    "state": "failed",
                    "message": latest_job["error"],
                }
            item["job"] = latest_job
            projects.append(item)
        return projects


class AtlasDashboardServer(ThreadingHTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def create_dashboard_server(
    *,
    state_dir: str | Path | None = None,
    port: int = 7331,
    timeout_seconds: int = 900,
) -> tuple[AtlasDashboardServer, DashboardApplication]:
    application = DashboardApplication(
        state_dir or Path.home() / ".atlas" / "dashboard",
        timeout_seconds=timeout_seconds,
    )
    server = AtlasDashboardServer(
        ("127.0.0.1", port),
        _handler_for(application),
    )
    application.port = server.server_port
    return server, application


def serve_dashboard(
    *,
    state_dir: str | Path | None = None,
    port: int = 7331,
    open_browser: bool = True,
    timeout_seconds: int = 900,
) -> None:
    server, application = create_dashboard_server(
        state_dir=state_dir,
        port=port,
        timeout_seconds=timeout_seconds,
    )
    url = (
        f"http://127.0.0.1:{server.server_port}/"
        f"?token={application.bootstrap_token}"
    )
    print(f"Atlas dashboard: {url}")
    if open_browser:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
        application.jobs.close()


def _handler_for(application: DashboardApplication):
    class DashboardHandler(BaseHTTPRequestHandler):
        server_version = "Atlas"
        sys_version = ""

        def do_GET(self) -> None:
            if not self._valid_host():
                self._json_error(421, "Unrecognized dashboard host")
                return
            route = urlparse(self.path).path
            if route == "/":
                self._dashboard_page()
                return
            if route.startswith("/projects/"):
                if not self._valid_cookie():
                    self._json_error(403, "Dashboard session is required")
                    return
                self._project_page(route.removeprefix("/projects/"))
                return
            if route == "/api/projects":
                if not self._authorized():
                    self._json_error(403, "Dashboard session is required")
                    return
                self._json(200, {"projects": application.projects()})
                return
            if route.startswith("/api/jobs/"):
                if not self._authorized():
                    self._json_error(403, "Dashboard session is required")
                    return
                try:
                    job = application.jobs.get(route.removeprefix("/api/jobs/"))
                except KeyError:
                    self._json_error(404, "Refresh job was not found")
                    return
                self._json(200, {"job": job})
                return
            if route.startswith("/dashboard/"):
                self._static_file(route.removeprefix("/dashboard/"))
                return
            if route.startswith("/assets/"):
                self._explorer_asset(route.removeprefix("/assets/"))
                return
            self._json_error(404, "Not found")

        def do_POST(self) -> None:
            self._mutate("POST")

        def do_PATCH(self) -> None:
            self._mutate("PATCH")

        def do_DELETE(self) -> None:
            self._mutate("DELETE")

        def log_message(self, format: str, *args) -> None:
            return

        def _mutate(self, method: str) -> None:
            if not self._valid_host():
                self._json_error(421, "Unrecognized dashboard host")
                return
            if not self._authorized() or not self._valid_origin():
                self._json_error(403, "Dashboard session is required")
                return
            route = urlparse(self.path).path
            try:
                body = self._read_json()
                if method == "POST" and route == "/api/projects":
                    if "path" not in body:
                        raise ValueError("Project path is required")
                    project = application.registry.add(
                        body["path"],
                        name=body.get("name"),
                    )
                    self._json(201, {"project": project})
                    return
                if method == "POST" and route == "/api/projects/refresh-all":
                    jobs = [
                        application.jobs.enqueue(project)
                        for project in application.registry.list()
                        if application.registry.project_status(project)["state"]
                        not in {"missing", "invalid"}
                    ]
                    self._json(202, {"jobs": jobs})
                    return
                if route.startswith("/api/projects/"):
                    self._mutate_project(method, route, body)
                    return
            except KeyError:
                self._json_error(404, "Project was not found")
                return
            except (OSError, ValueError) as error:
                self._json_error(400, str(error))
                return
            self._json_error(404, "Not found")

        def _mutate_project(self, method: str, route: str, body: dict) -> None:
            suffix = route.removeprefix("/api/projects/")
            if suffix.endswith("/refresh"):
                project_id = suffix.removesuffix("/refresh")
                if method != "POST":
                    self._json_error(405, "Method not allowed")
                    return
                project = application.registry.get(project_id)
                job = application.jobs.enqueue(project)
                self._json(202, {"job": job})
                return

            project_id = suffix
            if application.jobs.active_for(project_id):
                self._json_error(409, "Project cannot change while an update is active")
                return
            if method == "PATCH":
                arguments = {}
                if "name" in body:
                    arguments["name"] = body["name"]
                if "path" in body:
                    arguments["path"] = body["path"]
                project = application.registry.update(project_id, **arguments)
                self._json(200, {"project": project})
                return
            if method == "DELETE":
                project = application.registry.remove(project_id)
                self._json(200, {"project": project, "deleted_files": False})
                return
            self._json_error(405, "Method not allowed")

        def _dashboard_page(self) -> None:
            if not self._valid_cookie():
                query = parse_qs(urlparse(self.path).query)
                supplied = query.get("token", [None])[0]
                if supplied is None or not secrets.compare_digest(
                    supplied,
                    application.bootstrap_token,
                ):
                    self._json_error(403, "Use the private dashboard URL printed by Atlas")
                    return
                self._send_bytes(
                    b"", "text/plain; charset=utf-8",
                    status=303, location="/", set_cookie=True,
                )
                return

            nonce = secrets.token_urlsafe(18)
            config = script_safe_json({"token": application.session_token})
            source = (DASHBOARD_STATIC_DIR / "index.html").read_text(encoding="utf-8")
            source = source.replace("__ATLAS_NONCE__", nonce).replace(
                "__ATLAS_DASHBOARD_CONFIG__",
                config,
            )
            self._html(source, nonce=nonce)

        def _project_page(self, project_id: str) -> None:
            try:
                project = application.registry.get(project_id)
            except KeyError:
                self._json_error(404, "Project was not found")
                return
            nonce = secrets.token_urlsafe(18)
            status = application.registry.project_status(project)
            try:
                snapshot = load_payload(project["path"])
                story = story_for_snapshot(project["path"], snapshot)
            except (OSError, ValueError):
                source = _unavailable_project_page(
                    project,
                    status,
                    application.session_token,
                    nonce,
                )
            else:
                source = _central_explorer_page(
                    snapshot,
                    story,
                    project,
                    application.session_token,
                    nonce,
                )
            application.registry.mark_opened(project_id)
            self._html(source, nonce=nonce)

        def _explorer_asset(self, relative: str) -> None:
            allowed = {name: EXPLORER_STATIC_DIR / name for name in ASSETS}
            path = allowed.get(relative)
            if path is None:
                self._json_error(404, "Asset was not found")
                return
            self._send_bytes(path.read_bytes(), _content_type(path))

        def _static_file(self, relative: str) -> None:
            allowed = {
                "dashboard.css",
                "dashboard.js",
                "api.js",
                "project.css",
                "project.js",
            }
            if relative not in allowed:
                self._json_error(404, "Asset was not found")
                return
            path = DASHBOARD_STATIC_DIR / relative
            self._send_bytes(path.read_bytes(), _content_type(path))

        def _read_json(self) -> dict:
            content_type = self.headers.get("Content-Type", "")
            if not content_type.startswith("application/json"):
                raise ValueError("Requests must use application/json")
            try:
                length = int(self.headers.get("Content-Length", "0"))
            except ValueError as error:
                raise ValueError("Invalid request length") from error
            if length < 0 or length > MAX_REQUEST_BYTES:
                raise ValueError("Request is too large")
            document = json.loads(self.rfile.read(length) or b"{}")
            if not isinstance(document, dict):
                raise ValueError("Request body must be an object")
            return document

        def _valid_host(self) -> bool:
            host = self.headers.get("Host")
            return host in {
                f"127.0.0.1:{application.port}",
                f"localhost:{application.port}",
            }

        def _valid_origin(self) -> bool:
            host = self.headers.get("Host")
            return self.headers.get("Origin") == f"http://{host}"

        def _authorized(self) -> bool:
            if not self._valid_cookie():
                return False
            token = self.headers.get("X-Atlas-Token")
            return token is not None and secrets.compare_digest(
                token,
                application.session_token,
            )

        def _valid_cookie(self) -> bool:
            cookie = SimpleCookie(self.headers.get("Cookie", ""))
            session = cookie.get("atlas_dashboard_session")
            return (
                session is not None
                and secrets.compare_digest(
                    session.value,
                    application.session_token,
                )
            )

        def _html(
            self,
            source: str,
            *,
            nonce: str,
        ) -> None:
            self._send_bytes(
                source.encode("utf-8"),
                "text/html; charset=utf-8",
                nonce=nonce,
            )

        def _json(self, status: int, document: dict) -> None:
            encoded = json.dumps(document, sort_keys=True).encode("utf-8")
            self._send_bytes(
                encoded,
                "application/json; charset=utf-8",
                status=status,
            )

        def _json_error(self, status: int, message: str) -> None:
            self._json(status, {"error": message})

        def _send_bytes(
            self,
            body: bytes,
            content_type: str,
            *,
            status: int = 200,
            nonce: str | None = None,
            set_cookie: bool = False,
            location: str | None = None,
        ) -> None:
            script_policy = "'self'"
            if nonce:
                script_policy += f" 'nonce-{nonce}'"
            policy = (
                "default-src 'none'; "
                f"script-src {script_policy}; "
                "style-src 'self'; img-src 'self' data:; connect-src 'self'; "
                "font-src 'self'; base-uri 'none'; form-action 'self'; "
                "frame-ancestors 'none'; object-src 'none'"
            )
            self.send_response(status)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Security-Policy", policy)
            self.send_header("Cross-Origin-Opener-Policy", "same-origin")
            self.send_header("Cross-Origin-Resource-Policy", "same-origin")
            self.send_header("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
            self.send_header("Referrer-Policy", "no-referrer")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("X-Frame-Options", "DENY")
            if location:
                self.send_header("Location", location)
            if set_cookie:
                self.send_header(
                    "Set-Cookie",
                    "atlas_dashboard_session="
                    f"{application.session_token}; HttpOnly; SameSite=Strict; Path=/",
                )
            self.end_headers()
            self.wfile.write(body)

    return DashboardHandler


def _central_explorer_page(snapshot, story: dict, project: dict, token: str, nonce: str) -> str:
    source = render_explorer(snapshot, story)
    source = source.replace('href="assets/', 'href="/assets/')
    source = source.replace('src="assets/', 'src="/assets/')
    source = source.replace("<script>", f'<script nonce="{nonce}">')
    source = source.replace(
        "</head>",
        '<link rel="stylesheet" href="/dashboard/project.css">\n</head>',
    )
    source = source.replace(
        "<body>",
        '<body class="atlas-dashboard-project">\n'
        + _project_bar(project)
        + "\n"
        + _dashboard_config_script(project["id"], token, nonce),
    )
    source = source.replace(
        "</body>",
        '<script type="module" src="/dashboard/project.js"></script>\n</body>',
    )
    return source.replace(
        "<title>Atlas Explorer</title>",
        f"<title>{html.escape(project['name'])} · Atlas</title>",
    )


def _unavailable_project_page(
    project: dict,
    status: dict,
    token: str,
    nonce: str,
) -> str:
    message = html.escape(status["message"])
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{html.escape(project["name"])} · Atlas</title>
    <link rel="stylesheet" href="/dashboard/project.css">
  </head>
  <body class="atlas-dashboard-project">
    {_project_bar(project)}
    {_dashboard_config_script(project["id"], token, nonce)}
    <main class="project-unavailable">
      <p class="project-unavailable-kicker">Atlas project</p>
      <h1>{html.escape(project["name"])}</h1>
      <p>{message}</p>
      <button id="unavailableRefresh" type="button">Update project</button>
    </main>
    <script type="module" src="/dashboard/project.js"></script>
  </body>
</html>"""


def _project_bar(project: dict) -> str:
    return f"""<header class="atlas-project-bar">
  <a class="atlas-project-home" href="/">Atlas projects</a>
  <label for="atlasProjectSelect">Current project</label>
  <select id="atlasProjectSelect" aria-label="Current project">
    <option value="{html.escape(project["id"])}">{html.escape(project["name"])}</option>
  </select>
  <span id="atlasProjectStatus" role="status"></span>
  <button id="atlasProjectRefresh" type="button">Update</button>
</header>"""


def _dashboard_config_script(project_id: str, token: str, nonce: str) -> str:
    config = script_safe_json(
        {
            "token": token,
            "currentProjectId": project_id,
        }
    )
    return (
        f'<script nonce="{nonce}">'
        f"window.ATLAS_DASHBOARD = {config};"
        "</script>"
    )


def _content_type(path: Path) -> str:
    guessed, _ = mimetypes.guess_type(path.name)
    return (guessed or "application/octet-stream") + (
        "; charset=utf-8" if path.suffix in {".css", ".js"} else ""
    )
