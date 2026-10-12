import assert from 'node:assert/strict';
import test from 'node:test';
import { documentationHtml } from '../../src/atlas/explorer/static/src/documentation.js';

test('docstrings render sections and examples without activating embedded markup', () => {
  const html = documentationHtml('## Parameters\n\n`value`: input.\n\n## Examples\n\n```python\nresult = run("<tag>")\n```\n\n<script>alert(1)</script>\n\n[unsafe](javascript:alert(1))\n\n![remote](https://example.com/track.png)');
  assert.match(html, /<h2>Parameters<\/h2>/);
  assert.match(html, /<code>value<\/code>/);
  assert.match(html, /<pre><code class="language-python">/);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script|<img|href="javascript:/);
});

test('missing docstrings explicitly identify the gap', () => {
  assert.match(documentationHtml(''), /No docstring is available/);
});
