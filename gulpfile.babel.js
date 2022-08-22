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

gulp.task("lib-web-huawei.zip", () => {
    const fs = require("fs");
    const path = require("path");

    let inFilePaths = ["./dist/platforms/huawei-quick-game/ral.js",
    "./dist/platforms/huawei-quick-game/ral.min.js",
    "./dist/common/web-adapter.js",
    "./dist/common/web-adapter.min.js"];
    let commitInfo = require("git-commit-info")();
    let packagePaths = [];
    for (let i = 0; i < inFilePaths.length; ++i) {
        let srcFilePath = inFilePaths[i];
        let content = fs.readFileSync(srcFilePath);
        let fileName = path.basename(srcFilePath);
        let destFilePath = path.join("./dist", fileName);
        if (fs.existsSync(destFilePath)) {
            fs.unlinkSync(destFilePath);
        }
        fs.writeFileSync(destFilePath, `// ${commitInfo.hash}\n${content}`);
        packagePaths.push(destFilePath);
    }

    return gulp.src(packagePaths)
        .pipe(require('gulp-zip')(`lib-web-huawei-${commitInfo.shortHash}.zip`))
        .pipe(gulp.dest("./dist/"))
        .on("end", function() {
            fs.copyFileSync(`./dist/lib-web-huawei-${commitInfo.shortHash}.zip`, "./dist/lib-web-huawei-latest-version.zip", fs.constants.COPYFILE_FICLONE);
            for (let i = 0; i < packagePaths.length; ++i) {
                fs.unlinkSync(packagePaths[i]);
            }
        });
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

gulp.task("cocos-runtime-laya.js", () => {
    return browserify({ entries: ["./ral/cocos-runtime/index.js", "./web/window.js", "./laya/index.js"] })
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("cocos-runtime-laya.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("cocos-runtime-laya.min.js", () => {
    return browserify({ entries: ["./ral/cocos-runtime/index.js", "./web/window.js", "./laya/index.js"] })
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("cocos-runtime-laya.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("oppo-mini-game.js", () => {
    return browserify("./ral/oppo-mini-game/index.js")
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
        .pipe(gulp.dest("./dist/platforms/oppo-mini-game/"));
});

gulp.task("oppo-mini-game.min.js", () => {
    return browserify("./ral/oppo-mini-game/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("ral.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/platforms/oppo-mini-game/"));
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

gulp.task("cocos-runtime-pixiJS.js", () => {
    return browserify({ entries: ["./ral/cocos-runtime/index.js", "./web/window.js", "./pixiJS/index.js"] })
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("cocos-runtime-pixiJS.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("cocos-runtime-pixiJS.min.js", () => {
    return browserify({ entries: ["./ral/cocos-runtime/index.js", "./web/window.js", "./pixiJS/index.js"] })
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("cocos-runtime-pixiJS.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("vivo-mini-game.js", () => {
    return browserify("./ral/vivo-mini-game/index.js")
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
        .pipe(gulp.dest("./dist/platforms/vivo-mini-game/"));
});

gulp.task("vivo-mini-game.min.js", () => {
    return browserify("./ral/vivo-mini-game/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("ral.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/platforms/vivo-mini-game/"));
});

gulp.task("cocos-runtime-phaser.js", () => {
    return browserify({ entries: ["./ral/cocos-runtime/index.js", "./web/window.js", "./phaser/index.js"] })
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("cocos-runtime-phaser.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("cocos-runtime-phaser.min.js", () => {
    return browserify({ entries: ["./ral/cocos-runtime/index.js", "./web/window.js", "./phaser/index.js"] })
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("cocos-runtime-phaser.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"));
});
gulp.task("cocos-runtime-construct3.js", () => {
    return browserify({ entries: ["./ral/cocos-runtime/index.js", "./web/window.js", "./construct3/index.js"] })
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("cocos-runtime-construct3.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("cocos-runtime-construct3.min.js", () => {
    return browserify({ entries: ["./ral/cocos-runtime/index.js", "./web/window.js", "./construct3/index.js"] })
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("cocos-runtime-construct3.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("cocos-creator-v2.js", () => {
    return browserify("./cocos-creator-v2/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("cocos-creator-v2.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("cocos-creator-v2.min.js", () => {
    return browserify("./cocos-creator-v2/index.js")
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("cocos-creator-v2.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("cocos-runtime-egret.js", () => {
    return browserify({ entries: ["./ral/cocos-runtime/index.js", "./web/window.js", "./egret/index.js"] })
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("cocos-runtime-egret.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("cocos-runtime-egret.min.js", () => {
    return browserify({ entries: ["./ral/cocos-runtime/index.js", "./web/window.js", "./egret/index.js"] })
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            comments: false
        })
        .bundle()
        .pipe(source("cocos-runtime-egret.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("lib-web", gulp.series(["web.js", "web.min.js"]));
gulp.task("lib-web-huawei", gulp.series(["huawei-quick-game.js", "huawei-quick-game.min.js", "web.js", "web.min.js", "lib-web-huawei.zip"]));
gulp.task("lib-cocos-runtime", gulp.series(["cocos-runtime.js", "cocos-runtime.min.js"]));
gulp.task("lib-cocos-play", gulp.series(["cocos-play.js", "cocos-play.min.js"]));
gulp.task("lib-link-sure", gulp.series(["link-sure.js", "link-sure.min.js"]));
gulp.task("lib-qtt", gulp.series(["qtt.js", "qtt.min.js"]));
gulp.task("lib-oppo", gulp.series(["oppo-mini-game.js", "oppo-mini-game.min.js"]));
gulp.task("lib-huawei", gulp.series(["huawei-quick-game.js", "huawei-quick-game.min.js"]));
gulp.task("lib-vivo", gulp.series(["vivo-mini-game.js", "vivo-mini-game.min.js"]));
gulp.task("lib-ral", gulp.series(["lib-cocos-runtime", "lib-cocos-play", "lib-link-sure", "lib-qtt", "lib-oppo", "lib-huawei", "lib-vivo"]));
gulp.task("default", gulp.series(["lib-web", "lib-ral"]));
gulp.task("lib-cocos-creator-v2", gulp.series(["cocos-creator-v2.js", "cocos-creator-v2.min.js"]));
gulp.task("cocos-runtime-laya", gulp.series(["cocos-runtime-laya.js", "cocos-runtime-laya.min.js"]));
gulp.task("cocos-runtime-pixiJS", gulp.series(["cocos-runtime-pixiJS.js", "cocos-runtime-pixiJS.min.js"]));
gulp.task("cocos-runtime-phaser", gulp.series(["cocos-runtime-phaser.js", "cocos-runtime-phaser.min.js"]));
gulp.task("cocos-runtime-construct3", gulp.series(["cocos-runtime-construct3.js", "cocos-runtime-construct3.min.js"]));
gulp.task("cocos-runtime-egret", gulp.series(["cocos-runtime-egret.js", "cocos-runtime-egret.min.js"]));
