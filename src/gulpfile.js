var gulp = require('gulp'),    
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    // uglify = require('gulp-uglify'), can't on ly uglify ES5 js code (see https://github.com/terinjokes/gulp-uglify#using-a-different-uglifyjs for es6 support)
    notify = require('gulp-notify');

gulp.task('scripts', function() {
  return gulp.src([
            './app/**/*.js', 
            './controller/*.js',
            './lib/*.js'
            ])
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    //.pipe(gulp.dest('../dist/assets/js'))
    //.pipe(gulp.dest('./public/scripts/min'))
    .pipe(rename({suffix: '.min'}))
    //.pipe(uglify()) 
    //.pipe(gulp.dest('../dist/assets/js'))public/scripts/min
    .pipe(gulp.dest('public/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('default', [/*'clean'*/], function() {
    //gulp.start('styles', 'scripts', 'images');
    gulp.start('scripts');
});