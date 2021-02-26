import _UTIL from "../../util";
import _FEATURE from "../../feature";

let _rt = loadRuntime();

_UTIL.exportTo("loadImageData", _rt, jsb);
_UTIL.exportTo("createImage", _rt, jsb, function () {
    let featureValue = "undefined";
    if (document && typeof document.createElement === "function") {
        featureValue = "wrapper";
        jsb.createImage = function () {
            return document.createElement("image");
        };
    }
    _FEATURE.setFeature("ral.createImage", "spec", featureValue);
});