var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    coffee = require('gulp-coffee'),
    mocha  = require('gulp-mocha-phantomjs');

gulp.task('build', function() {
  gulp.src('./src/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./build/'))
});

gulp.task('test', function() {
  gulp.src('build/skrilla.js').pipe(gulp.dest('test'));
  gulp.src('test/index.html').pipe(mocha());
});
