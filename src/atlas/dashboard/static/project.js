import { api } from "./api.js";

var config = window.ATLAS_DASHBOARD;
var select = document.getElementById("atlasProjectSelect");
var refresh = document.getElementById("atlasProjectRefresh");
var unavailableRefresh = document.getElementById("unavailableRefresh");
var status = document.getElementById("atlasProjectStatus");

loadProjects();
select.addEventListener("change", function () {
  window.location.href = "/projects/" + select.value;
});
refresh.addEventListener("click", updateCurrent);
if (unavailableRefresh) unavailableRefresh.addEventListener("click", updateCurrent);

async function loadProjects() {
  try {
    var response = await api("/api/projects");
    select.replaceChildren();
    response.projects.forEach(function (project) {
      var option = document.createElement("option");
      option.value = project.id;
      option.textContent = project.name;
      option.selected = project.id === config.currentProjectId;
      select.appendChild(option);
      if (option.selected) status.textContent = project.status.message || "";
    });
  } catch (error) {
    status.textContent = error.message;
  }
}

async function updateCurrent() {
  refresh.disabled = true;
  if (unavailableRefresh) unavailableRefresh.disabled = true;
  status.textContent = "Queueing update…";
  try {
    var response = await api("/api/projects/" + config.currentProjectId + "/refresh", {
      method: "POST",
      body: {},
    });
    await waitForJob(response.job.id);
    window.location.reload();
  } catch (error) {
    status.textContent = error.message;
    refresh.disabled = false;
    if (unavailableRefresh) unavailableRefresh.disabled = false;
  }
}

async function waitForJob(jobId) {
  while (true) {
    var response = await api("/api/jobs/" + jobId);
    if (response.job.state === "complete") return;
    if (response.job.state === "failed") throw new Error(response.job.error);
    status.textContent = response.job.state === "queued" ? "Waiting to update…" : "Updating project…";
    await new Promise(function (resolve) { window.setTimeout(resolve, 800); });
  }
}
