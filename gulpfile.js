'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
// var cssmin = require('gulp-cssmin');
var concat_sourcemap = require('gulp-concat-sourcemap');
var salad = require('postcss-salad')(require('./.salad.config.json'));

gulp.task('compile', function() {
  return gulp.src('./static/theme/src/*.css')
    .pipe(postcss([salad]))
    // .pipe(cssmin())
    .pipe(concat_sourcemap('index.css'))
    .pipe(gulp.dest('./static/theme'));
});

gulp.task('copyfont', function() {
  return gulp.src('./theme/fonts/**')
    // .pipe(cssmin())
    .pipe(gulp.dest('./static/theme/fonts'));
});

gulp.task('build', ['compile', 'copyfont']);

gulp.task('default', function() {
  gulp.watch("./static/theme/src/*.css", { readDelay: 1000 }, function(event) {
    gulp.run('compile');
  });
});
