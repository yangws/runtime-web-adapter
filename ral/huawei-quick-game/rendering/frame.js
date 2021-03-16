
if (window.jsb && jsb.setPreferredFramesPerSecond) {
    ral.setPreferredFramesPerSecond = jsb.setPreferredFramesPerSecond.bind(jsb);
} else if (hbs.setPreferredFramesPerSecond) {
    ral.setPreferredFramesPerSecond = hbs.setPreferredFramesPerSecond.bind(hbs);
} else {
    ral.setPreferredFramesPerSecond = function () {
        console.error("The setPreferredFramesPerSecond is not define!");
    };
}