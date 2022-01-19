import _UTIL from "../../util"
import _FEATURE from "../../feature";

_UTIL.exportTo("createCanvas", hbs, ral, function () {
    let featureValue = "unsupported";
    if (document && typeof document.createElement === "function") {
        featureValue = "wrapper";
        ral.createCanvas = function () {
            return document.createElement("canvas");
        };
    }
    _FEATURE.setFeature("ral.createCanvas", "spec", featureValue);
});

let _hbs_getFeature = hbs.getFeature;
let _hbs_setFeature = hbs.setFeature;

_FEATURE.registerFeatureProperty(
    _FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name,
    function () { // get method
        if (typeof _hbs_getFeature === "function") {
            let value = _hbs_getFeature(_FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name);
            switch (value) {
                case 1:
                    return _FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.enable;
                default:
                    break;
            }
        }
        return _FEATURE.FEATURE_UNSUPPORT;
    },
    undefined // not support for set the feature ability
);

_FEATURE.registerFeatureProperty(
    _FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name,
    function () { // get method
        if (typeof _hbs_getFeature === "function") {
            let value = _hbs_getFeature(_FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name);
            switch (value) {
                case 1:
                    return _FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.alphabetic;
                case 0:
                    return _FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.bottom;
                default:
                    break;
            }
        }
        return _FEATURE.FEATURE_UNSUPPORT;
    },
    function (value) { // set method
        if (typeof _hbs_setFeature === "function") {
            switch (value) {
                case _FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.alphabetic:
                    value = 1;
                    break;
                case _FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.bottom:
                    value = 0;
                    break;
                default:
                    return false;
            }
            return _hbs_setFeature(_FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name, value);
        }
        return false;
    }
);