var gulp = require('gulp'),
    // load Node.js API
    fs   = require('fs'),
    path = require('path'),
    // util
    gutil = require('gulp-util'),
    // css
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch');

// task.sass
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
});
gulp.task('sass', function() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded' // output style is [nested | expanded | compact | compressed]
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./map'))
        //.pipe(csssort())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// task.build
gulp.task('build', function() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass({
            outputStyle: 'compact' // output style is [nested | expanded | compact | compressed]
        }).on('error', sass.logError))
        .pipe(csssort())
        .pipe(gulp.dest("src/css"));
});
