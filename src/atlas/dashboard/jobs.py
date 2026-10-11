from __future__ import annotations

import json
import os
import queue
import signal
import subprocess
import sys
import threading
import uuid
from datetime import datetime, timezone
from pathlib import Path


ACTIVE_STATES = {"queued", "running"}


class RefreshJobs:
    """Run one project refresh at a time and isolate it in a child process."""

    def __init__(self, state_dir: str | Path, *, timeout_seconds: int = 900):
        self.state_dir = Path(state_dir)
        self.timeout_seconds = timeout_seconds
        self._jobs: dict[str, dict] = {}
        self._queue: queue.Queue[str | None] = queue.Queue()
        self._lock = threading.Lock()
        self._closed = False
        self._process: subprocess.Popen | None = None
        self._thread = threading.Thread(
            target=self._run,
            name="atlas-refresh-jobs",
            daemon=True,
        )
        self._thread.start()

    def enqueue(self, project: dict) -> dict:
        with self._lock:
            if self._closed:
                raise RuntimeError("Atlas refresh queue is closed")
            active = self._active_for_locked(project["id"])
            if active:
                return dict(active)
            job = {
                "id": str(uuid.uuid4()),
                "project_id": project["id"],
                "project_name": project["name"],
                "path": project["path"],
                "state": "queued",
                "created_at": _utc_now(),
                "started_at": None,
                "finished_at": None,
                "result": None,
                "error": None,
            }
            self._jobs[job["id"]] = job
        self._queue.put(job["id"])
        return dict(job)

    def get(self, job_id: str) -> dict:
        with self._lock:
            try:
                return dict(self._jobs[job_id])
            except KeyError as error:
                raise KeyError(job_id) from error

    def active_for(self, project_id: str) -> dict | None:
        with self._lock:
            active = self._active_for_locked(project_id)
            return dict(active) if active else None

    def latest_for(self, project_id: str) -> dict | None:
        with self._lock:
            jobs = [
                job for job in self._jobs.values() if job["project_id"] == project_id
            ]
            return dict(jobs[-1]) if jobs else None

    def close(self) -> None:
        with self._lock:
            self._closed = True
            process = self._process
        if process and process.poll() is None:
            _terminate_process_group(process)
        while True:
            try:
                job_id = self._queue.get_nowait()
            except queue.Empty:
                break
            if job_id is not None:
                self._finish(
                    job_id,
                    state="failed",
                    error="Dashboard stopped before this update started",
                )
        self._queue.put(None)
        self._thread.join(timeout=2)

    def _active_for_locked(self, project_id: str) -> dict | None:
        return next(
            (
                job
                for job in self._jobs.values()
                if job["project_id"] == project_id and job["state"] in ACTIVE_STATES
            ),
            None,
        )

    def _run(self) -> None:
        while True:
            job_id = self._queue.get()
            if job_id is None:
                return
            with self._lock:
                job = self._jobs[job_id]
                if self._closed:
                    job["state"] = "failed"
                    job["error"] = "Dashboard stopped before this update started"
                    job["finished_at"] = _utc_now()
                    continue
                job["state"] = "running"
                job["started_at"] = _utc_now()
            self._run_job(job_id)

    def _run_job(self, job_id: str) -> None:
        with self._lock:
            job = dict(self._jobs[job_id])
        command = [
            sys.executable,
            "-B",
            "-m",
            "atlas.dashboard.worker",
            "--root",
            job["path"],
            "--job-id",
            job["id"],
        ]
        environment = os.environ.copy()
        environment.pop("PYTHONHOME", None)
        environment.pop("PYTHONPATH", None)
        process = subprocess.Popen(
            command,
            cwd=self.state_dir,
            env=environment,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            start_new_session=True,
        )
        with self._lock:
            self._process = process
        try:
            stdout, _ = process.communicate(timeout=self.timeout_seconds)
        except subprocess.TimeoutExpired:
            _terminate_process_group(process)
            self._finish(
                job_id,
                state="failed",
                error=f"Analysis exceeded the {self.timeout_seconds}-second safety limit",
            )
            return
        finally:
            with self._lock:
                if self._process is process:
                    self._process = None

        result = _worker_result(stdout)
        if process.returncode == 0 and result.get("ok"):
            self._finish(job_id, state="complete", result=result["result"])
            return

        error = result.get("error") or "Atlas analysis worker failed"
        self._finish(job_id, state="failed", error=error[:2000])

    def _finish(
        self,
        job_id: str,
        *,
        state: str,
        result: dict | None = None,
        error: str | None = None,
    ) -> None:
        with self._lock:
            job = self._jobs[job_id]
            job["state"] = state
            job["result"] = result
            job["error"] = error
            job["finished_at"] = _utc_now()


def _worker_result(stdout: str) -> dict:
    lines = [line for line in stdout.splitlines() if line.strip()]
    if not lines:
        return {}
    try:
        result = json.loads(lines[-1])
    except json.JSONDecodeError:
        return {}
    return result if isinstance(result, dict) else {}


def _terminate_process_group(process: subprocess.Popen) -> None:
    if process.poll() is not None:
        return
    try:
        os.killpg(process.pid, signal.SIGTERM)
        process.wait(timeout=5)
    except (ProcessLookupError, subprocess.TimeoutExpired):
        try:
            os.killpg(process.pid, signal.SIGKILL)
        except ProcessLookupError:
            pass
        process.wait()


def _utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()
