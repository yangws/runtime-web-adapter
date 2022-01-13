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
_FEATURE.setFeaturePropertyString("HTMLImageElement", "spec", featureValue);
_FEATURE.setFeaturePropertyString("Image", "spec", featureValue);
_FEATURE.setFeaturePropertyString("ral.createImage", "spec", featureValue);