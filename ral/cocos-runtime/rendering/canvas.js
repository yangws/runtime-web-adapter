import _UTIL from "../../util"
import _FEATURE from "../../feature";

let _rt = loadRuntime();

_UTIL.exportTo("createCanvas", _rt, ral, function () {
    let featureValue = "unsupported";
    if (document && typeof document.createElement === "function") {
        featureValue = "wrapper";
        ral.createCanvas = function () {
            return document.createElement("canvas");
        };
    }
    _FEATURE.setFeature("ral.createCanvas", "spec", featureValue);
});

const KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC = "canvas.context2d.textbaseline.alphabetic"
const KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT = "canvas.context2d.textbaseline.default"

_FEATURE.registerFeatureProperty(
    KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC,
    function (key) { // get
        if (key === KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC) {
            return loadRuntime().getFeature(key);
        }
        return -1;
    },
    function (key, value) { // set
        if (key === KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC) {
            return loadRuntime().setFeature(key, value);
        }
        return false;
    }
);

_FEATURE.registerFeatureProperty(
    KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT,
    function (key) { // get
        if (key === KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT) {
            return loadRuntime().getFeature(key);
        }
        return -1;
    },
    function (key, value) { // set
        if (key === KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT) {
            return loadRuntime().setFeature(key, value);
        }
        return false;
    }
);