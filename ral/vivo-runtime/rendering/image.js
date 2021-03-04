import _UTIL from "../../util";
import _FEATURE from "../../feature";

Object.defineProperty(window, "HTMLImageElement", {
    set(val) {
    },
    get() {
        return qg.createImage().constructor;
    }
});

let featureValue = "wrapper";
_FEATURE.setFeature("HTMLImageElement", "spec", featureValue);
_FEATURE.setFeature("Image", "spec", featureValue);
_FEATURE.setFeature("ral.createImage", "spec", featureValue);