const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babelify = require("babelify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");
const buffer = require("vinyl-buffer");

gulp.task("web.js", () => {
    return browserify("./web/window.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("web-adapter.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/common"));
});

gulp.task("web.min.js", () => {
    return browserify("./web/window.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("web-adapter.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/common"));
});

gulp.task("cocos-runtime.js", () => {
    return browserify("./ral/cocos-runtime/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("jsb.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/platforms/cocos-runtime/"));
});

gulp.task("cocos-runtime.min.js", () => {
    return browserify("./ral/cocos-runtime/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("jsb.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/platforms/cocos-runtime/"));
});

gulp.task("cocos-play.js", () => {
    return browserify("./ral/cocos-play/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("jsb.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/platforms/cocos-play/"));
});

gulp.task("cocos-play.min.js", () => {
    return browserify("./ral/cocos-play/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("jsb.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/platforms/cocos-play/"));
});

gulp.task("runtime-laya.js", () => {
    return browserify("./laya/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("laya-adapter.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("runtime-laya.min.js", () => {
    return browserify("./laya/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("laya-adapter.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("oppo-runtime.js", () => {
    return browserify("./ral/oppo-runtime/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("jsb.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/platforms/oppo-runtime/"));
});

gulp.task("oppo-runtime.min.js", () => {
    return browserify("./ral/oppo-runtime/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("jsb.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/platforms/oppo-runtime/"));
});

gulp.task("lib-web", gulp.series(["web.js", "web.min.js"]));
gulp.task("lib-cocos-runtime", gulp.series(["cocos-runtime.js", "cocos-runtime.min.js"]));
gulp.task("lib-cocos-play", gulp.series(["cocos-play.js", "cocos-play.min.js"]));
gulp.task("lib-cocos-oppo", gulp.series(["oppo-runtime.js", "oppo-runtime.min.js"]));
gulp.task("lib-ral", gulp.series(["lib-cocos-runtime", "lib-cocos-play", "lib-cocos-oppo"]));
gulp.task("default", gulp.series(["lib-web", "lib-ral"]));
gulp.task("adapter-runtime-laya", gulp.series(["runtime-laya.js", "runtime-laya.min.js"]));