let _rt = loadRuntime();

if (jsb && jsb.setPreferredFramesPerSecond) {
    ral.setPreferredFramesPerSecond = jsb.setPreferredFramesPerSecond.bind(jsb);
} else if (_rt.setPreferredFramesPerSecond) {
    ral.setPreferredFramesPerSecond = _rt.setPreferredFramesPerSecond.bind(_rt);
} else {
    ral.setPreferredFramesPerSecond = function () {
        console.error("The setPreferredFramesPerSecond is not define!");
    };
}