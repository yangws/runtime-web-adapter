
const key_canvas_context2d_textbaseline_alphabetic = "canvas.context2d.textbaseline.alphabetic";
const key_canvas_context2d_textbaseline_default = "canvas.context2d.textbaseline.default";
if (ral.getFeature(key_canvas_context2d_textbaseline_alphabetic) == 1) {
    // runtime support for alphabetic textbaseline, its default textbaseline should be set to alphabetic
    ral.setFeature(key_canvas_context2d_textbaseline_default, 1);
    if (ral.getFeature(key_canvas_context2d_textbaseline_default) == 1) {
        cc.textUtils.BASELINE_OFFSET = 0;
    }
}