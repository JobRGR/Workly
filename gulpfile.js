var gulp = require('gulp');
var server = require('gulp-express');
var concatCss = require('gulp-concat-css');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var stylus = require('gulp-stylus');
var Filter = require('gulp-filter');

gulp.task('server', function () {
    server.run({
        file: './bin/www',
        args: ['--debug']
    });

    gulp.watch(['app.js',
        'config/*.js',
        'error/*.js',
        'models/*.js',
        'middleware/**/*.js',
        'routes/**/*.js',
        'lib/*.js',
        'gulpfile.js'
    ], [server.run], server.notify);

});

gulp.task('css', function () {
    var filter = Filter('**/*.styl');

    return gulp.src('public/styl/**/*.styl')
        .pipe(filter)
        .pipe(stylus())
        .pipe(filter.restore())
        .pipe(autoprefixer('last 15 versions'))
        .pipe(minifyCSS())
        .pipe(concat("bundle.min.css"))
        .pipe(gulp.dest('public/css/prod'));
});

gulp.task('styl', function () {
    var filter = Filter('**/*.styl');

    return gulp.src('public/styl/**/*.styl')
        .pipe(filter)
        .pipe(stylus())
        .pipe(filter.restore())
        .pipe(autoprefixer('last 15 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/css'))
        .pipe(livereload());
});


gulp.task('watch', function () {
    gulp.watch('public/styl/**/*.styl', ['styl']);
});

gulp.task('default', ['server','watch','css', 'styl']);