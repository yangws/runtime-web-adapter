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
        .pipe(source("ral.js"))
        .pipe(buffer())
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
        .pipe(source("ral.min.js"))
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
        .pipe(source("ral.js"))
        .pipe(buffer())
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
        .pipe(source("ral.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/platforms/cocos-play/"));
});

gulp.task("link-sure.js", () => {
    return browserify("./ral/link-sure/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("ral.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/platforms/link-sure/"));
});

gulp.task("link-sure.min.js", () => {
    return browserify("./ral/link-sure/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("ral.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/platforms/link-sure/"));
});

gulp.task("qtt.js", () => {
    return browserify("./ral/qtt/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("ral.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/platforms/qtt/"));
});

gulp.task("qtt.min.js", () => {
    return browserify("./ral/qtt/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("ral.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/platforms/qtt/"));
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
        .pipe(source("ral.js"))
        .pipe(buffer())
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
        .pipe(source("ral.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/platforms/oppo-runtime/"));
});

gulp.task("huawei-quick-game.js", () => {
    return browserify("./ral/huawei-quick-game/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("ral.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/platforms/huawei-quick-game/"));
});

gulp.task("huawei-quick-game.min.js", () => {
    return browserify("./ral/huawei-quick-game/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("ral.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/platforms/huawei-quick-game/"));
});

gulp.task("runtime-pixiJS.js", () => {
    return browserify("./pixiJS/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("pixiJS-adapter.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("runtime-pixiJS.min.js", () => {
    return browserify("./pixiJS/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("pixiJS-adapter.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("vivo-runtime.js", () => {
    return browserify("./ral/vivo-runtime/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("ral.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/platforms/vivo-runtime/"));
});

gulp.task("vivo-runtime.min.js", () => {
    return browserify("./ral/vivo-runtime/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("ral.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/platforms/vivo-runtime/"));
});

gulp.task("lib-web", gulp.series(["web.js", "web.min.js"]));
gulp.task("lib-cocos-runtime", gulp.series(["cocos-runtime.js", "cocos-runtime.min.js"]));
gulp.task("lib-cocos-play", gulp.series(["cocos-play.js", "cocos-play.min.js"]));
gulp.task("lib-link-sure", gulp.series(["link-sure.js", "link-sure.min.js"]));
gulp.task("lib-qtt", gulp.series(["qtt.js", "qtt.min.js"]));
gulp.task("lib-oppo", gulp.series(["oppo-runtime.js", "oppo-runtime.min.js"]));
gulp.task("lib-huawei", gulp.series(["huawei-quick-game.js", "huawei-quick-game.min.js"]));
gulp.task("lib-vivo", gulp.series(["vivo-runtime.js", "vivo-runtime.min.js"]));
gulp.task("lib-ral", gulp.series(["lib-cocos-runtime", "lib-cocos-play", "lib-link-sure", "lib-qtt", "lib-oppo", "lib-huawei", "lib-vivo"]));
gulp.task("default", gulp.series(["lib-web", "lib-ral"]));
gulp.task("adapter-runtime-laya", gulp.series(["runtime-laya.js", "runtime-laya.min.js"]));
gulp.task("adapter-runtime-pixiJS", gulp.series(["runtime-pixiJS.js", "runtime-pixiJS.min.js"]));