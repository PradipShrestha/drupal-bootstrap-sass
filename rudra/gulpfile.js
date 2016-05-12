/**
 * Created by Pradip on 5/11/2016.
 */

// Configuration setting. Change as per needed.
var BUILD = false;
var DEV = false;
var SINGLE_FILE_OUTPUT = false;
// Ends configuration setting

if (BUILD && DEV) {
    throw "Cannot have different environment true at same time";
}

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

var config = {
    sassPath: './sass',
    bootstrapPath: './bootstrap'
};

var sassOption = {
    errLogToConsole: true,
    // Default environment is dev
    outputStyle: BUILD ? 'compressed' : 'expanded',
    includePaths: [config.sassPath, './bootstrap/assets/stylesheets']
};

gulp.task('sass', function () {
    if(SINGLE_FILE_OUTPUT){
        return gulp.src(config.sassPath + '/**/*.scss')
            .pipe(concat('style.css'))
            .pipe(rename({
                basename : 'style',
                extname : '.min.css'
            }))
            .pipe(sourcemaps.init())
            .pipe(sass(sassOption).on('error', sass.logError))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./css'))
    }
    return gulp.src(config.sassPath + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOption).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./css'))
});

gulp.task('sass:watch', function () {
    gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch']);




