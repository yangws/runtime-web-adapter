import _UTIL from "../../util";
import _FEATURE from "../../feature";

_UTIL.exportTo("loadImageData", wuji, jsb);
_UTIL.exportTo("createImage", wuji, jsb, function () {
    let featureValue = "unsupported";
    if (document && typeof document.createElement === "function") {
        featureValue = "wrapper";
        jsb.createImage = function () {
            return document.createElement("image");
        };
    }
    _FEATURE.setFeature("ral.createImage", "spec", featureValue);
});