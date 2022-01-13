import _UTIL from "../../util";
import _FEATURE from "../../feature";

_UTIL.exportTo("loadImageData", qg, ral, function () {
    if (window.jsb && typeof jsb.loadImage === "function") {
        ral.loadImageData = jsb.loadImage;
    } else {
        console.error("loadImageData is not function");
    }
});
_UTIL.exportTo("createImage", qg, ral, function () {
    let featureValue = "unsupported";
    if (document && typeof document.createElement === "function") {
        featureValue = "wrapper";
        ral.createImage = function () {
            return document.createElement("image");
        };
    }
    _FEATURE.setFeaturePropertyString("ral.createImage", "spec", featureValue);
});