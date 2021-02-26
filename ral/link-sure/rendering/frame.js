if (jsb.setPreferredFramesPerSecond) {
    jsb.setPreferredFramesPerSecond = jsb.setPreferredFramesPerSecond.bind(jsb);
} else if (wuji.setPreferredFramesPerSecond) {
    jsb.setPreferredFramesPerSecond = wuji.setPreferredFramesPerSecond.bind(wuji);
} else {
    jsb.setPreferredFramesPerSecond = function () {
        console.error("The setPreferredFramesPerSecond is not define!");
    };
}