
if (jsb.setPreferredFramesPerSecond) {
    jsb.setPreferredFramesPerSecond = jsb.setPreferredFramesPerSecond.bind(jsb);
} else if (qg.setPreferredFramesPerSecond) {
    jsb.setPreferredFramesPerSecond = qg.setPreferredFramesPerSecond.bind(qg);
} else {
    jsb.setPreferredFramesPerSecond = function () {
        console.error("The setPreferredFramesPerSecond is not define!");
    };
}