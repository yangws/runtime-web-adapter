const gulp = require('gulp');
const sourcemaps = require("gulp-sourcemaps");
const babelify = require("babelify");
const browserify = require('browserify');
const source = require("vinyl-source-stream");
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');

gulp.task("web.js", () => {
    return browserify('./web/window.js')
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source('web.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task("web.min.js", () => {
    return browserify('./web/window.js')
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source('web.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task("cocos-runtime.js", () => {
    return browserify('./ral/cocos-runtime/index.js')
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source('cocos-runtime.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task("cocos-runtime.min.js", () => {
    return browserify('./ral/cocos-runtime/index.js')
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source('cocos-runtime.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task("web", gulp.series(["web.js", "web.min.js"]));
gulp.task("cocos-runtime", gulp.series(["cocos-runtime.js", "cocos-runtime.min.js"]));
gulp.task("ral", gulp.series(["cocos-runtime"]));
gulp.task('default', gulp.series(["web", "ral"]));