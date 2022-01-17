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

let _rt_getFeature = _rt.getFeature;
let _rt_setFeature = _rt.setFeature;

_FEATURE.registerFeatureProperty(
    _FEATURE.FEATURE_KEY.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC,
    function () { // get method
        if (typeof _rt_getFeature === "function") {
            let value = _rt_getFeature(_FEATURE.FEATURE_KEY.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC);
            switch (value) {
                case 1:
                    return _FEATURE.FEATURE_VALUE.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC;
                default:
                    break;
            }
        }
        return _FEATURE.FEATURE_VALUE.FEATURE_UNSUPPORT;
    },
    undefined // not support for set the feature ability
);

_FEATURE.registerFeatureProperty(
    _FEATURE.FEATURE_KEY.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT,
    function () { // get method
        if (typeof _rt_getFeature === "function") {
            let value = _rt_getFeature(_FEATURE.FEATURE_KEY.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT);
            switch (value) {
                case 1:
                    return _FEATURE.FEATURE_VALUE.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT_ALPHABETIC;
                case 0:
                    return _FEATURE.FEATURE_VALUE.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT_BOTTOM;
                default:
                    break;
            }
        }
        return _FEATURE.FEATURE_VALUE.FEATURE_UNSUPPORT;
    },
    function (value) { // set method
        if (typeof _rt_setFeature === "function") {
            switch (value) {
                case _FEATURE.FEATURE_VALUE.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT_ALPHABETIC:
                    value = 1;
                    break;
                case _FEATURE.FEATURE_VALUE.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT_BOTTOM:
                    value = 0;
                    break;
                default:
                    return false;
            }
            return _rt_setFeature(_FEATURE.FEATURE_KEY.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT, value);
        }
        return false;
    }
);