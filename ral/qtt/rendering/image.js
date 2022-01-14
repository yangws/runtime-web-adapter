import _UTIL from "../../util";
import _FEATURE from "../../feature";

let _rt = loadRuntime();

_UTIL.exportTo("loadImageData", _rt, ral);
_UTIL.exportTo("createImage", _rt, ral, function () {
    let featureValue = "unsupported";
    if (document && typeof document.createElement === "function") {
        featureValue = "wrapper";
        ral.createImage = function () {
            return document.createElement("image");
        };
    }
    _FEATURE.setFeature("ral.createImage", "spec", featureValue);
});