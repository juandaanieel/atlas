export async function api(path, { method = "GET", body } = {}) {
  const request = {
    method,
    headers: { "X-Atlas-Token": window.ATLAS_DASHBOARD.token },
    credentials: "same-origin",
  };
  if (body !== undefined) {
    request.headers["Content-Type"] = "application/json";
    request.body = JSON.stringify(body);
  }
  const response = await fetch(path, request);
  const document = await response.json();
  if (!response.ok) throw new Error(document.error || "Atlas request failed");
  return document;
}
