"use strict";

var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    jest = require('gulp-jest'),
    path = require('path'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    handleErrors = require('./util/handleErrors'),
    debug = require('gulp-debug'),
    exec = require('child_process').exec;

var DEST_DIR = 'backend/assessment/static';
var MEDIA_DIR = 'backend/assessment/media';

gulp.task('backend', function () {
    var proc = exec('PYTHONUNBUFFERED=1 ' +
        'backend/assessment/manage.py runserver');

    proc.stderr.on('data', function (data) {
        process.stderr.write(data);
    });

    proc.stdout.on('data', function (data) {
        process.stdout.write(data);
    });
});

gulp.task('less', function () {
    return gulp.src('src/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .on('error', handleErrors)
        .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEST_DIR + '/css'))
        .pipe(livereload());
});

gulp.task('browserify', function () {
    gulp.src('src/js/app.js')
        .pipe(browserify(
            {
                transform: ['reactify'],
                insertGlobals: true,
                debug: true,
                extensions: ['.js', '.jsx', '.react.jsx']
            }
        ))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(DEST_DIR + '/js'))
        .pipe(livereload());
});

gulp.task('jest', function () {
    return gulp.src('src/')
        .pipe(jest({
            scriptPreprocessor: "../preprocessor.js",
            unmockedModulePathPatterns: [
                "/node_modules/react",
                "/node_modules/material-ui",
                "/node_modules"
            ],
            testPathIgnorePatterns: [
                "/node_modules"
            ],
            testFileExtensions: [
                "js",
                "jsx"
            ],
            moduleFileExtensions: [
                "js",
                "jsx",
                "json",
                "react"
            ]
        }));
});

gulp.task('copy', function () {
    gulp.src('src/fonts/*.*')
        .pipe(gulp.dest(DEST_DIR + '/fonts'))
        .pipe(livereload());

	gulp.src('src/media/*.*')
        .pipe(gulp.dest(MEDIA_DIR))
        .pipe(livereload());
});

gulp.task('build', ['browserify', 'less', 'copy']);

gulp.task('watch-files', function () {
    livereload.listen();
    gulp.watch('src/*.*', ['build']);
    gulp.watch('src/js/**/*.*', ['browserify']);
    gulp.watch('src/less/**/*.*', ['less']);
});

gulp.task('watch', ['build', 'watch-files']);
gulp.task('runserver', ['watch', 'backend']);