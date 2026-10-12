import globals from 'globals';

export default [{
  files: ['src/atlas/explorer/static/src/*.js', 'src/atlas/dashboard/static/*.js', 'tests/js/*.test.mjs'],
  languageOptions: { globals: { ...globals.browser, ...globals.node } },
  rules: {
    'no-undef': 'error',
    'no-unreachable': 'error',
    'no-dupe-args': 'error',
    'no-unused-vars': ['error', { args: 'none' }],
  },
}];
