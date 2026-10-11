import test from 'node:test';
import assert from 'node:assert/strict';
import { codeHtml, tokenizeLine, escapeHtml } from '../../src/atlas/explorer/static/src/source.js';

test('source and tooltips escape HTML without losing call links', () => {
  const html = codeHtml({start: 1, text: 'f("<script>")', sites: [[1, 0, 1, 'edge', 0, 'f']]}, () => '"<img>');
  assert.ok(html.includes('class="site e"'));
  assert.ok(html.includes('data-si="0"'));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('&quot;&lt;img&gt;'));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('style='));
});

test('multiline strings carry state across lines', () => {
  const state = {triple: null};
  tokenizeLine('    """class Fake:', state);
  assert.equal(state.triple, '"""');
  assert.deepEqual(tokenizeLine('return True', state), [['str', 0, 11]]);
  tokenizeLine('"""', state);
  assert.equal(state.triple, null);
});

test('repeated calls on one line retain distinct inspector targets', () => {
  const html = codeHtml({start: 1, text: 'f(); f()', sites: [[1, 0, 1, 'edge', 0, 'f'], [1, 5, 6, 'edge', 0, 'f']]}, () => 'f');
  assert.match(html, /data-sites="0,1"/);
  assert.equal((html.match(/class="site e"/g) || []).length, 2);
});

test('file-derived names cannot break out of HTML attributes', () => {
  assert.equal(escapeHtml('module" onmouseover="alert(1)<'), 'module&quot; onmouseover=&quot;alert(1)&lt;');
});
