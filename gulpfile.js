var gulp = require('gulp');
var gutil = require('gulp-util');
var plugins = require( 'gulp-load-plugins' )({ camelize: true});

/* Default task */
gulp.task('default', ['connect', 'watch', 'minify-main-styles','compress-scripts',
  'minify-bootstrap',
  'minify-bootstrap-theme',
  ]);

/* Watch task */
gulp.task('watch', function () {
  gulp.watch('dist/*.html', ['html']);
  gulp.watch('source/less/main.less', ['minify-main-styles']);
});

/* HTML Task */
gulp.task('html', function () {
  gulp.src('dist/*.html')
    .pipe(plugins.connect.reload());
});

/* Connect Server: Point browser to http://127.0.0.1:8080/ */
gulp.task('connect', function() {
  plugins.connect.server({
    root: './dist',
    livereload: true
  });
});

/* Compiling styles */
// It generates 'main.css'.
// Any custom style, mixin or whatever should go in 'main.less'
gulp.task('main-styles', function () {
  return gulp.src('source/less/main.less')
    .pipe(plugins.less({}))
    .pipe(gulp.dest('dist/css'));
});

/* Autoprefixing */
gulp.task('autoprefixer', ['main-styles'], function () {
    return gulp.src('dist/css/main.css')
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

/* CSS Minification */
gulp.task('minify-main-styles', ['autoprefixer'], function() {
  return gulp.src('dist/css/main.css')
    .pipe(plugins.rename('main.min.css'))
    .pipe(plugins.minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(plugins.connect.reload());
});

/* Concatenating Javascripts */
gulp.task('concat-scripts', function() {
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
                    'source/js/bootstrap/affix.js'])
    .pipe(plugins.concat('bootstrap.js'))
    .pipe(gulp.dest('./dist/js'));
});

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

