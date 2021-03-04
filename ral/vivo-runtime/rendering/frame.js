
if (ral.setPreferredFramesPerSecond) {
    ral.setPreferredFramesPerSecond = ral.setPreferredFramesPerSecond.bind(ral);
} else if (qg.setPreferredFramesPerSecond) {
    ral.setPreferredFramesPerSecond = qg.setPreferredFramesPerSecond.bind(qg);
} else {
    ral.setPreferredFramesPerSecond = function () {
        console.error("The setPreferredFramesPerSecond is not define!");
    };
}