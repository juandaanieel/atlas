import { Vector3 } from 'three';

// Fit the visible geometry inside the unobstructed canvas, including an off-centre panel.
export function fitCamera(camera, bounds, { width, height, rect, az, el, margin = 0.92, cutZ = null }) {
  const points = (bounds.pts ?? [bounds.min, bounds.max]).filter((p) => cutZ === null || p.z <= cutZ);
  const target = bounds.getCenter(new Vector3());
  const direction = new Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
  const size = bounds.getSize(new Vector3());
  const cam = camera.clone(), orthographic = cam.isOrthographicCamera;
  let distance = orthographic ? 120 : Math.max(size.x, size.y, size.z) * 1.6 + 5;
  let zoom = 20;
  const rw = rect[1] - rect[0], rh = rect[3] - rect[2];
  let bw = 0, bh = 0;
  for (let i = 0; i < 8; i++) {
    cam.position.copy(target).addScaledVector(direction, distance);
    if (orthographic) cam.zoom = zoom;
    cam.lookAt(target);
    cam.updateMatrixWorld();
    cam.updateProjectionMatrix();
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const point of points) {
      const projected = point.clone().project(cam);
      const x = (projected.x + 1) * width / 2, y = (1 - projected.y) * height / 2;
      x0 = Math.min(x0, x); x1 = Math.max(x1, x);
      y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
    const scale = Math.max((x1 - x0) / rw, (y1 - y0) / rh, 1e-6) / margin;
    const perPixel = orthographic ? 1 / zoom : 2 * distance * Math.tan(cam.fov * Math.PI / 360) / height;
    target.addScaledVector(new Vector3().setFromMatrixColumn(cam.matrixWorld, 0), ((x0 + x1 - rect[0] - rect[1]) / 2) * perPixel);
    target.addScaledVector(new Vector3().setFromMatrixColumn(cam.matrixWorld, 1), -((y0 + y1 - rect[2] - rect[3]) / 2) * perPixel);
    bw = (x1 - x0) / scale; bh = (y1 - y0) / scale;
    if (orthographic) zoom /= scale;
    else distance *= scale;
  }
  const cx = (rect[0] + rect[1]) / 2, cy = (rect[2] + rect[3]) / 2;
  return { target, position: target.clone().addScaledVector(direction, distance), ortho: !!orthographic,
    ...(orthographic ? { zoom } : {}), box: [cx - bw / 2, cy - bh / 2, cx + bw / 2, cy + bh / 2] };
}
