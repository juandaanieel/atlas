import { api } from "./api.js";

var projectsElement = document.getElementById("projects");
var countElement = document.getElementById("projectCount");
var emptyElement = document.getElementById("emptyState");
var form = document.getElementById("addProjectForm");
var formStatus = document.getElementById("formStatus");
var refreshTimer = null;

loadProjects();

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  var paths = document.getElementById("projectPaths").value
    .split("\n")
    .map(function (path) { return path.trim(); })
    .filter(Boolean);
  var name = document.getElementById("projectName").value.trim();
  if (paths.length > 1 && name) {
    setFormStatus("Name applies only when adding one project.", true);
    return;
  }
  setFormStatus("Registering…");
  try {
    for (var index = 0; index < paths.length; index += 1) {
      await api("/api/projects", {
        method: "POST",
        body: {
          path: paths[index],
          name: paths.length === 1 ? name || null : null,
        },
      });
    }
    form.reset();
    setFormStatus(paths.length === 1 ? "Project registered." : paths.length + " projects registered.");
    await loadProjects();
  } catch (error) {
    setFormStatus(error.message, true);
  }
});

document.getElementById("refreshAll").addEventListener("click", async function () {
  var count = Number(countElement.dataset.count || 0);
  if (!count || !window.confirm("Update all " + count + " registered projects? Atlas writes only generated .atlas output.")) {
    return;
  }
  try {
    await api("/api/projects/refresh-all", { method: "POST", body: {} });
    await loadProjects();
  } catch (error) {
    setFormStatus(error.message, true);
  }
});

async function loadProjects() {
  try {
    var response = await api("/api/projects");
    renderProjects(response.projects);
  } catch (error) {
    setFormStatus(error.message, true);
  }
}

function renderProjects(projects) {
  projectsElement.replaceChildren();
  countElement.textContent = String(projects.length);
  countElement.dataset.count = String(projects.length);
  emptyElement.hidden = projects.length !== 0;
  var active = false;
  projects.forEach(function (project) {
    if (project.status.state === "queued" || project.status.state === "running") active = true;
    projectsElement.appendChild(projectCard(project));
  });
  if (active && !refreshTimer) {
    refreshTimer = window.setTimeout(function () {
      refreshTimer = null;
      loadProjects();
    }, 1000);
  } else if (!active && refreshTimer) {
    window.clearTimeout(refreshTimer);
    refreshTimer = null;
  }
}

function projectCard(project) {
  var card = document.createElement("article");
  card.className = "project-card";

  var heading = document.createElement("div");
  heading.className = "project-heading";
  var title = document.createElement("h3");
  title.textContent = project.name;
  var status = document.createElement("span");
  status.className = "status status-" + project.status.state;
  status.textContent = statusLabel(project.status.state);
  heading.append(title, status);

  var path = document.createElement("p");
  path.className = "project-path";
  path.textContent = project.path;

  var detail = document.createElement("p");
  detail.className = "project-detail";
  detail.textContent = project.status.message || "";
  if (project.status.generated_at) {
    detail.textContent += " · " + project.status.generated_at;
  }

  var actions = document.createElement("div");
  actions.className = "project-actions";
  actions.append(
    linkButton("Open", "/projects/" + project.id),
    actionButton("Update", function () { refreshProject(project.id); }, project.status.state === "queued" || project.status.state === "running"),
    actionButton("Rename", function () { renameProject(project); }),
    actionButton("Relink", function () { relinkProject(project); }),
    actionButton("Remove", function () { removeProject(project); }, false, "danger")
  );
  card.append(heading, path, detail, actions);
  return card;
}

async function refreshProject(projectId) {
  try {
    await api("/api/projects/" + projectId + "/refresh", { method: "POST", body: {} });
    await loadProjects();
  } catch (error) {
    setFormStatus(error.message, true);
  }
}

async function renameProject(project) {
  var name = window.prompt("Project name", project.name);
  if (name === null) return;
  try {
    await api("/api/projects/" + project.id, { method: "PATCH", body: { name: name } });
    await loadProjects();
  } catch (error) {
    setFormStatus(error.message, true);
  }
}

async function relinkProject(project) {
  var path = window.prompt("Exact replacement directory", project.path);
  if (path === null || path === project.path) return;
  try {
    await api("/api/projects/" + project.id, {
      method: "PATCH",
      body: { path: path },
    });
    await loadProjects();
  } catch (error) {
    setFormStatus(error.message, true);
  }
}

async function removeProject(project) {
  var confirmed = window.confirm(
    "Remove " + project.name + " from the dashboard? No project files or .atlas output will be deleted."
  );
  if (!confirmed) return;
  try {
    await api("/api/projects/" + project.id, { method: "DELETE", body: {} });
    await loadProjects();
  } catch (error) {
    setFormStatus(error.message, true);
  }
}

function actionButton(label, action, disabled, className) {
  var button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.disabled = !!disabled;
  if (className) button.className = className;
  button.addEventListener("click", action);
  return button;
}

function linkButton(label, href) {
  var link = document.createElement("a");
  link.className = "button";
  link.href = href;
  link.textContent = label;
  return link;
}

function statusLabel(state) {
  return {
    ready: "Ready",
    needs_update: "Update available",
    never_analyzed: "Not analyzed",
    missing: "Missing",
    invalid: "Invalid",
    queued: "Queued",
    running: "Updating",
    failed: "Failed",
  }[state] || state;
}

function setFormStatus(message, error) {
  formStatus.textContent = message;
  formStatus.classList.toggle("error", !!error);
}
