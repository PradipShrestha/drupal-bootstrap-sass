/**
 * Created by Pradip on 5/11/2016.
 */
var BUILD = false;
var DEV = false;

if(BUILD && DEV){
    throw "Cannot have different environment true at same time";
}

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglifycss = require('gulp-uglifycss');

var config = {
    sassPath: './sass',
    bootstrapPath: './bootstrap'
};

var sassOption = {
    errLogToConsole: true,
    // Default environment is dev
    outputStyle: BUILD ? 'compressed': 'expanded',
    loadPath: [config.sassPath, './bootstrap/assets/stylesheets']
};

gulp.task('sass', function () {
    return gulp.src(config.sassPath + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOption).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./css'))
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }));
});

gulp.task('sass:watch', function () {
    gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch']);




