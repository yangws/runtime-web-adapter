import _UTIL from "../../util";
import _FEATURE from "../../feature";

Object.defineProperty(window, "HTMLImageElement", {
    set(val) {
    },
    get() {
        return qg.createImage().constructor;
    }
});

_UTIL.exportTo("createImage", qg, ral);

let featureValue = "vivo_platform_support";
_FEATURE.setFeature("HTMLImageElement", "spec", featureValue);
_FEATURE.setFeature("Image", "spec", featureValue);
_FEATURE.setFeature("ral.createImage", "spec", featureValue);