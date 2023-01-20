var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('minify-js', function() {
    return gulp.src('assets/js/*.js')
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('assets/js/minified'));
});

var cssnano = require('gulp-cssnano');

gulp.task('minify-css', function() {
    return gulp.src('assets/css/*.css')
        .pipe(cssnano())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('assets/css/minified'));
});