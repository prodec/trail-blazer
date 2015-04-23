var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('sass', function() {
  gulp.src('src/css/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/css'))
  .pipe(reload({stream: true}));
});

gulp.task('browserify', function() {
  gulp.src('src/js/main.js')
  .pipe(browserify({transform:'reactify'}))
  .pipe(concat('main.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
  gulp.src('src/index.html').pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['default']);
});

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "dist"
  });

  gulp.watch("dist/scss/*.scss", ['sass']);
  gulp.watch("dist/*.html").on('change', reload);
});

gulp.task('default', ['browserify', 'copy', 'sass', 'serve']);
