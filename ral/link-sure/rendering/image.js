import _UTIL from "../../util";
import _FEATURE from "../../feature";

_UTIL.exportTo("loadImageData", wuji, ral);
_UTIL.exportTo("createImage", wuji, ral, function () {
    let featureValue = "unsupported";
    if (document && typeof document.createElement === "function") {
        featureValue = "wrapper";
        ral.createImage = function () {
            return document.createElement("image");
        };
    }
    _FEATURE.setFeaturePropertyString("ral.createImage", "spec", featureValue);
});