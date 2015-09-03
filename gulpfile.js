'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gutil = require('gulp-util');
var plugins = require( 'gulp-load-plugins' )({ camelize: true});

/* Default task */
gulp.task('default', ['serve', 'templates', 'watch-templates',
                      'less', 'watch-less', 'scripts', 'watch-scripts']);

/*******************************************
* Static Server + watching scss/html files *
********************************************/
gulp.task('serve', function() {

  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("dist/*.html").on('change', browserSync.reload);

  gulp.watch("js/scripts.js").on('change', browserSync.reload);

  /* In this case, I don't reload the browser when the css changes,
     because the 'less' task injects into the stream the css. */
  // gulp.watch("css/*.css").on('change', browserSync.reload);
});

/*******************
*     Nunjucks     *
********************/
// Watch just the templates folder
gulp.task('watch-templates', function () {
  gulp.watch(['source/templates/**/*.html'], ['templates']);
});

// Error function
function nunjucksError(error){
  plugins.notify.onError({  title: "Nunjucks Error",
                            message: "Check your terminal: <%= error.message %>",
                            sound: "Sosumi"})(error); //Error Notification
  gutil.log(error.toString());
  this.emit("end"); // End function
};

// Options
var nunjucksOpts = {
  searchPaths: ['source/templates/layouts', 'source/templates/partials']
};

// Compiling task
gulp.task('templates', function () {
    return gulp.src('source/templates/*.html')
        .pipe(plugins.plumber({ errorHandler: nunjucksError }))
        .pipe(plugins.nunjucksHtml( nunjucksOpts ))
        .pipe(plugins.jsbeautifier({indentSize: 2}))
        .pipe(gulp.dest('dist'));
});

/*******************
* LESS Compilation *
********************/
/* Compiling styles into 'dist/css/main.css'.
   Any custom style, mixin or whatever should go in 'main.less' */
 // Watch just the sass folder
gulp.task('watch-less', function () {
  gulp.watch(['source/less/main.less'], ['less']);
});

function errorAlert(error){
 plugins.notify.onError({  title: "LESS Error",
                           message: "Check your terminal: <%= error.message %>",
                           sound: "Sosumi"})(error); //Error Notification
 gutil.log(error.toString());
 this.emit("end"); // End function
};


gulp.task('main-styles', function () {
  return gulp.src('source/less/main.less')
    .pipe(plugins.plumber({ errorHandler: errorAlert }))
    .pipe(plugins.less({}))
    .pipe(plugins.autoprefixer({
        browsers: ['> 1%',
                'last 2 versions',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'));
});

/*************
* JavaScript *
**************/
// Watch just the js folder
gulp.task('watch-scripts', function () {
  gulp.watch(['source/js/*.js'], ['scripts']);
});

/* JShint: linting our JavaScripts */
gulp.task('jshint', function() {
  return gulp.src(['source/js/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

/* Concatenating Bootstrap Plugins.
   Feel free to add your own scripts to the list,
   or remove (commenting out) the scripts you don't need. */
gulp.task('scripts', ['jshint'], function() {
  return gulp.src([ 'source/js/bootstrap/transition.js',
                    'source/js/bootstrap/alert.js',
                    'source/js/bootstrap/buttons.js',
                    'source/js/bootstrap/carousel.js',
                    'source/js/bootstrap/collapse.js',
                    'source/js/bootstrap/dropdown.js',
                    'source/js/bootstrap/modal.js',
                    'source/js/bootstrap/tooltip.js',
                    'source/js/bootstrap/popover.js',
                    'source/js/bootstrap/scrollspy.js',
                    'source/js/bootstrap/tab.js',
                    'source/js/bootstrap/affix.js',
                    'source/js/custom1.js',])
    .pipe(plugins.concat('scripts.js'))
    .pipe(gulp.dest('./dist/js'));
});

/*************************************************
*              MANUAL TASKS                      *
*------------------------------------------------*
* These tasks are not essential for the          *
* development workflow, hence we have put them   *
* here, so they can be run separately,           *
* for example:                                   *
*                                                *
*     $ gulp minify-main-styles                  *
*                                                *
**************************************************/
/* Javascript Minification */
gulp.task('compress-scripts', ['concat-scripts'], function() {
  return gulp.src('dist/js/bootstrap.js')
    .pipe(plugins.rename('bootstrap.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist/js'));
});

// It generates 'bootstrap.css'. Interesting for learning purposes.
gulp.task('compile-bootstrap', function () {
  return gulp.src('source/less/bootstrap/bootstrap.less')
    .pipe(plugins.less({}))
    .pipe(gulp.dest('dist/css'));
});

// It generates 'bootstrap-theme.css'. Interesting for learning purposes.
gulp.task('compile-bootstrap-theme', function () {
  return gulp.src('source/less/bootstrap/theme.less')
    .pipe(plugins.rename('bootstrap-theme.less'))
    .pipe(plugins.less({}))
    .pipe(gulp.dest('dist/css'));
});

/* CSS Minification */
gulp.task('minify-main-styles', function() {
  return gulp.src('dist/css/main.css')
    .pipe(plugins.rename('main.min.css'))
    .pipe(plugins.minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

// It generates 'bootstrap.min.css'
gulp.task('minify-bootstrap', ['compile-bootstrap'], function() {
  return gulp.src('dist/css/bootstrap.css')
    .pipe(plugins.rename('bootstrap.min.css'))
    .pipe(plugins.minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

// It generates 'bootstrap-theme.min.css' (Optional theme)
gulp.task('minify-bootstrap-theme', ['compile-bootstrap-theme'], function() {
  return gulp.src('dist/css/bootstrap-theme.css')
    .pipe(plugins.rename('bootstrap-theme.min.css'))
    .pipe(plugins.minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});
