'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var salad = require('postcss-salad')(require('./.salad.config.json'));
var concat_sourcemap = require('gulp-concat-sourcemap');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// build from original sass into css which will be used in maps for index.css
gulp.task('compile', function() {
  return gulp.src('./static/theme/src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static/theme/css'));
});

gulp.task('compile_css', function() {
  return gulp.src('./static/theme/css/*.css')
    .pipe(postcss([salad]))
    // .pipe(cssmin())
    .pipe(concat_sourcemap('index.css'))
    .pipe(gulp.dest('./static/theme'));
});

  gulp.task('copyfont', function() {
  return gulp.src('./theme/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./static/theme/fonts'));
});

gulp.task('build', ['compile', 'copyfont']);

gulp.task('default', function() {
  gulp.watch("./static/theme/css/*.css", { readDelay: 1000 }, function(event) {
    gulp.run('compile_css');
  });
});
