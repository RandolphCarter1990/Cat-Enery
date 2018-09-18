const gulp = require('gulp');
const watch = require('gulp-watch');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const changed = require('gulp-changed');

gulp.task('less', function () {
    return gulp.src('./src/less/styles.less')
        .pipe(less())
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
                stream: true
            }))
});

gulp.task('watch',['browserSync'], function () {
    gulp.watch('src/less/**/*.less',['less']);
    gulp.watch('src/*.html',['copyHtml',browserSync.reload]);
    gulp.watch('src/js/*.js',['copyJs',browserSync.reload]);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './build/'
        },
    })
});

gulp.task('buildStyles',function () {
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

gulp.task('images', function () {
    let dest = 'build/img';
    return gulp.src('src/img/**')
        .pipe(changed(dest))
        .pipe(imagemin())
        .pipe(gulp.dest(dest))
});

gulp.task('build',function () {
    runSequence('removeBuildFolder',['buildStyles','copyJs','images','copyHtml']);
    
});

gulp.task('copyHtml',function () {
    let dest = 'src/*.html';
    return gulp.src(dest)
        .pipe(changed(dest))
        .pipe(gulp.dest('build'))
});

gulp.task('removeBuildFolder', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});

gulp.task('copyJs',function () {
    let dest = 'src/js/*.js';
    return gulp.src(dest)
        .pipe(changed(dest))
        .pipe(gulp.dest('build/js'))
});

