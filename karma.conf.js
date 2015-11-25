module.exports = function(config) {
  config.set({
    autoWatch: true,

    browsers: ['Chrome'],

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'www/js/openfb.js',
      'www/build/js/vendor.bundle.js',
      'www/build/js/app.bundle.js',
      'www/build/js/specs.bundle.js'
    ],

    exclude: [],

    preprocessors: {
      'www/build/js/app.bundle.js': ['sourcemap', 'coverage'],
      'specs/*.spec.js': ['sourcemap']
    },

    reporters: ['progress', 'coverage', 'threshold'],

    coverageReporter: {
      type : 'html',
      dir: 'coverage/client',
      subdir: '.',
      reporters: [
        { type: 'json' },
        { type: 'html' }
      ]
    },

    // TODO Elevate the level according to implement new features ;)
    thresholdReporter: {
      statements: 41,
      branches: 26,
      functions: 32,
      lines: 40
    }
  })
};
