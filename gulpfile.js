const gulp = require('gulp');
const watch = require('gulp-watch');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const htmltidy = require('gulp-htmltidy');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');

gulp.task('less', function () {
    return gulp.src('./src/less/**/*.less')
        .pipe(less())
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({
                stream: true
            }))
});

gulp.task('watch',['browserSync'], function () {
    gulp.watch('./src/less/**/*.less',['less']);
    gulp.watch('./src/**/*.html',['less']);
})

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './src/'
        },
    })
})

gulp.task('htmltidy', function() {
    return gulp.src('./src/*.html')
        .pipe(htmltidy())
        .pipe(gulp.dest('./build/'));;
});

gulp.task('build',function () {
    return gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./src/css'))
        .pipe(cssnano())
        .pipe(gulp.dest('./build/css'))
});

