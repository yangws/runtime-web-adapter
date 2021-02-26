import _UTIL from "../../util";
import _FEATURE from "../../feature";

_UTIL.exportTo("loadImageData", hbs, jsb, function () {
    if (typeof jsb.loadImage === "function") {
        jsb.loadImageData = jsb.loadImage;
    } else {
        console.error("loadImageData is not function");
    }
});
_UTIL.exportTo("createImage", hbs, jsb, function () {
    let featureValue = "unsupported";
    if (document && typeof document.createElement === "function") {
        featureValue = "wrapper";
        jsb.createImage = function () {
            return document.createElement("image");
        };
    }
    _FEATURE.setFeature("ral.createImage", "spec", featureValue);
});