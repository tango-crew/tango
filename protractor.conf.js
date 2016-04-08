exports.config = {
  baseUrl: 'http://localhost:8100',

  specs: [
      'features/*.feature'
  ],

  exclude: [],

  // using "custom" in order to use cucumber
  framework: 'custom',

  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  // cucumber command line options
  cucumberOpts: {
    require: 'features/**/*.js',
    format: undefined,
    profile: false,
    'no-source': true
  },

  /*
  // jasmine command line options
  jasmineNodeOpts: {
      showTiming: true,
      showColors: true,
      isVerbose: false,
      includeStackTrace: false,
      defaultTimeoutInterval: 400000
  },
  */

  allScriptsTimeout: 110000,

  directConnect: true,

  capabilities: {
    'browserName': 'chrome'
  },

  onPrepare: function() {
  /*
    // add jasmine spec reporter
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
  */
    browser.ignoreSynchronization = false;
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
  useAllAngular2AppRoots: true
};
