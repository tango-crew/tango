var gulp = require('gulp'),
    gulpWatch = require('gulp-watch'),
    del = require('del'),
    nconf = require('nconf'),
    argv = process.argv;

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 */
var buildWebpack = require('ionic-gulp-webpack-build');
var buildSass = require('ionic-gulp-sass-build');
var copyHTML = require('ionic-gulp-html-copy');
var copyFonts = require('ionic-gulp-fonts-copy');

gulp.task('watch', ['sass', 'html', 'fonts'], function(){
  gulpWatch('app/**/*.scss', function(){ gulp.start('sass'); });
  gulpWatch('app/**/*.html', function(){ gulp.start('html'); });
  return buildWebpack({ watch: true })
    .then(generateSettings);
});
gulp.task('build', ['sass', 'html', 'fonts'], function() {
  return buildWebpack()
    .then(generateSettings);
});
gulp.task('sass', buildSass);
gulp.task('html', copyHTML);
gulp.task('fonts', copyFonts);
gulp.task('clean', function(done){
  del('www/build', done);
});

/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/**
 * Task generates a js that abstract the environments settings
 */
function generateSettings () {
  nconf.argv()
    .env()
    .file({
      file: 'www/build/js/settings.js',
      format: {
        stringify: function (obj, replacer, spacing) {
          return 'window.Settings = ' + JSON.stringify(obj, replacer || null, spacing || 2);
        },
        parse: function(value) {
          return JSON.parse(value.replace('window.Settings = ', ''));
        }
      }
    });

  nconf.set('apiEndpoint', nconf.get('TANGO_API_ENDPOINT'));
  nconf.set('apiToken', nconf.get('TANGO_API_TOKEN'));
  nconf.set('awsAccessKeyId', nconf.get('AWS_ACCESS_KEY'));
  nconf.set('awsSecretAccessKey', nconf.get('AWS_SECRET_KEY'));
  nconf.set('awsRegion', nconf.get('AWS_REGION'));
  nconf.set('oneSignalKey', nconf.get('ONE_SIGNAL_KEY'));
  nconf.set('googleProjectNumber', nconf.get('GOOGLE_PROJECT_NUMBER'));
  nconf.set('facebookAppId', nconf.get('FACEBOOK_APP_ID'));

  nconf.save(function (err) {
    if (err) console.log(err);
  });
}

