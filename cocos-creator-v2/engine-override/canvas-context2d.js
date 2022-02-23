if (typeof ral.getFeaturePropertyInt !== "undefined"
    && typeof ral.setFeaturePropertyInt !== "undefined"
    && typeof ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC !== "undefined"
    && typeof ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT !== "undefined") {
    let keyTextBaselineAlphabetic = ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name;
    let enableTextBaselineAlphabetic = ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.enable;

    if (ral.getFeaturePropertyInt(keyTextBaselineAlphabetic) === enableTextBaselineAlphabetic) {
        let keyTextBaselineDefault = ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name;
        let alphabeticAsDefault = ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.alphabetic;
        if (ral.setFeaturePropertyInt(keyTextBaselineDefault, alphabeticAsDefault) === true) {
            if (ral.getFeaturePropertyInt(keyTextBaselineDefault) === alphabeticAsDefault) {
                // only for creator 2.4.6 or more version but except for 3.x
                cc.textUtils.BASELINE_OFFSET = 0;
            }
        }
    }
}