import _UTIL from "../../util";
import _FEATURE from "../../feature";

_UTIL.exportTo("loadImageData", hbs, ral, function () {
    if (typeof jsb.loadImage === "function") {
        ral.loadImageData = jsb.loadImage;
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
});
let featureValue = "huawei_platform_support";
_FEATURE.setFeature("ral.createImage", "spec", featureValue);