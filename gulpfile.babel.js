const gulp = require('gulp');
const sourcemaps = require("gulp-sourcemaps");
const babelify = require("babelify");
const browserify = require('browserify');
const source = require("vinyl-source-stream");
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');

gulp.task('index.js', () => {
    return browserify('./src/window.js')
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
        .pipe(gulp.dest('../runtime-packer/common/adapter/dom'));
});

gulp.task('index.min.js', () => {
    return browserify('./src/window.js')
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source('index.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'))
        .pipe(gulp.dest('../runtime-packer/common/adapter/dom'));
});

gulp.task('default', gulp.series(["index.js", "index.min.js"]));