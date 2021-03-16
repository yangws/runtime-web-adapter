if (window.jsb && jsb.setPreferredFramesPerSecond) {
    ral.setPreferredFramesPerSecond = jsb.setPreferredFramesPerSecond.bind(jsb);
} else if (qg.setPreferredFramesPerSecond) {
    ral.setPreferredFramesPerSecond = qg.setPreferredFramesPerSecond.bind(qg);
} else {
    ral.setPreferredFramesPerSecond = function () {
        console.error("The setPreferredFramesPerSecond is not define!");
    };
}