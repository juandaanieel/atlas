import globals from 'globals';

export default [{
  files: ['src/atlas/explorer/static/src/*.js', 'tests/js/*.test.mjs'],
  languageOptions: { globals: { ...globals.browser, ...globals.node } },
  rules: { 'no-undef': 'error', 'no-unreachable': 'error', 'no-dupe-args': 'error' },
}];
