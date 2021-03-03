import _UTIL from "../../util";
import _FEATURE from "../../feature";

_UTIL.exportTo("loadImageData", hbs, ral, function () {
    if (typeof ral.loadImage === "function") {
        ral.loadImageData = ral.loadImage;
    } else {
        console.error("loadImageData is not function");
    }
});
_UTIL.exportTo("createImage", hbs, ral, function () {
    let featureValue = "unsupported";
    if (document && typeof document.createElement === "function") {
        featureValue = "wrapper";
        ral.createImage = function () {
            return document.createElement("image");
        };
    }
    _FEATURE.setFeature("ral.createImage", "spec", featureValue);
});