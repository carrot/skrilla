var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    coffee = require('gulp-coffee'),
    mocha  = require('gulp-mocha-phantomjs'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('build', function() {
  gulp.src('./src/skrilla.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('skrilla.min.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('test', function() {
  gulp.src('dist/skrilla.js').pipe(gulp.dest('test'));
  gulp.src('test/index.html').pipe(mocha());
});
