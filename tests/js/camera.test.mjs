import assert from 'node:assert/strict';
import test from 'node:test';
import { Box3, OrthographicCamera, PerspectiveCamera, Vector3 } from 'three';
import { fitCamera } from '../../src/atlas/explorer/static/src/camera.js';

// A tall module beside a wide plate exercises depth, narrow panels and changed aspect ratios.
const points = [-16, 20].flatMap((x) => [-24, 3].flatMap((y) => [-10, 12].map((z) => new Vector3(x, y, z))));
const bounds = new Box3().setFromPoints(points);
bounds.pts = points;
for (const orthographic of [true, false]) {
  test(`${orthographic ? 'orthographic' : 'perspective'} fit keeps geometry clear of panels`, () => {
    for (const [width, height, rect] of [[1440, 900, [18, 912, 68, 772]], [1000, 720, [18, 462, 68, 592]], [600, 900, [18, 582, 152, 380]]]) {
      for (const [az, el] of [[-0.3, 0.82], [0, 1.5], [0, 0.06]]) for (const cutZ of [null, 11]) {
        const camera = orthographic ? new OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.5, 3000) : new PerspectiveCamera(24, width / height, 0.5, 3000);
        camera.setViewOffset(width, height, 0, 31, width, height);
        const goal = fitCamera(camera, bounds, { width, height, rect, az, el, cutZ });
        camera.position.copy(goal.position);
        camera.lookAt(goal.target);
        if (orthographic) camera.zoom = goal.zoom;
        camera.updateMatrixWorld(); camera.updateProjectionMatrix();
        const pixels = points.filter((p) => cutZ === null || p.z <= cutZ).map((p) => {
          const v = p.clone().project(camera);
          return [(v.x + 1) * width / 2, (1 - v.y) * height / 2];
        });
        for (const [x, y] of pixels) {
          assert(Number.isFinite(x) && Number.isFinite(y));
          assert(x >= rect[0] && x <= rect[1], `x=${x} outside ${rect}`);
          assert(y >= rect[2] && y <= rect[3], `y=${y} outside ${rect}`);
        }
        for (const axis of [0, 1]) {
          const values = pixels.map((p) => p[axis]);
          const center = (Math.min(...values) + Math.max(...values)) / 2;
          const expected = (rect[axis * 2] + rect[axis * 2 + 1]) / 2;
          assert(Math.abs(center - expected) < 2, `center ${center} != ${expected}`);
        }
      }
    }
  });
}
