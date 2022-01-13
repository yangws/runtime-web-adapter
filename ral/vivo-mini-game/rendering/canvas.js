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
_FEATURE.setFeaturePropertyString("CanvasRenderingContext2D", "spec", featureValue);
_FEATURE.setFeaturePropertyString("HTMLCanvasElement", "spec", featureValue);


