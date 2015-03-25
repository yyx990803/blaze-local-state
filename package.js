Package.describe({
  name: 'evanyou:local-state',
  version: '0.0.1',
  summary: 'Local state for Blaze Templates',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.4.2');
  api.use([
    'underscore',
    'blaze',
    'reactive-var'
  ]);
  api.addFiles('local-state.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('local-state');
  api.addFiles('local-state-tests.js');
});
