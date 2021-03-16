if (window.jsb && jsb.setPreferredFramesPerSecond) {
    ral.setPreferredFramesPerSecond = jsb.setPreferredFramesPerSecond.bind(jsb);
} else if (wuji.setPreferredFramesPerSecond) {
    ral.setPreferredFramesPerSecond = wuji.setPreferredFramesPerSecond.bind(wuji);
} else {
    ral.setPreferredFramesPerSecond = function () {
        console.error("The setPreferredFramesPerSecond is not define!");
    };
}