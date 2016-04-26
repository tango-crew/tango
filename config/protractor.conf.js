// @AngularClass
require('cucumber');
require('ts-node/register');
var helpers = require('./helpers');

exports.config = {
  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
  useAllAngular2AppRoots: true,

  /* LOCALHOST CONFIG */
  seleniumServerJar: "node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar",
  baseUrl: 'http://localhost:8100',

  exclude: [],

  allScriptsTimeout: 110000,

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: [
    helpers.root('test/features/**/*.feature')
  ],
  cucumberOpts: {
    format: 'pretty',
    compiler: 'ts:ts-node/register',
    require: [
      'test/features/step_definitions/**/*.steps.ts'
    ]
  },

  directConnect: true,

  capabilities: {
    'browserName': 'chrome'
  },

  onPrepare: function() {
    browser.ignoreSynchronization = false;
  }
};
