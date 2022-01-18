import _UTIL from "../../util"
import _FEATURE from "../../feature";

window.CanvasRenderingContext2D = qg.getCanvasRenderingContext2D();
window.mainCanvas = qg.createCanvas();
let mainCanvas = window.mainCanvas;
Object.defineProperty(window, "HTMLCanvasElement", {
    set(val) {
    },

    get() {
        return mainCanvas.constructor;
    }
});

_UTIL.exportTo("createCanvas", qg, ral);

let featureValue = "vivo_platform_support";
_FEATURE.setFeature("CanvasRenderingContext2D", "spec", featureValue);
_FEATURE.setFeature("HTMLCanvasElement", "spec", featureValue);

let _qg_getFeature = qg.getFeature;
let _qg_setFeature = qg.setFeature;

_FEATURE.registerFeatureProperty(
    _FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name,
    function () { // get method
        if (typeof _qg_getFeature === "function") {
            let value = _qg_getFeature(_FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name);
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
        if (typeof _qg_getFeature === "function") {
            let value = _qg_getFeature(_FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name);
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
        if (typeof _qg_setFeature === "function") {
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
            return _qg_setFeature(_FEATURE.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name, value);
        }
        return false;
    }
);
