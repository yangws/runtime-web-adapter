import _UTIL from "../../util"
import _FEATURE from "../../feature";

let _rt = loadRuntime();

_UTIL.exportTo("createCanvas", _rt, jsb, function () {
    let featureValue = "unsupported";
    if (document && typeof document.createElement === "function") {
        featureValue = "wrapper";
        jsb.createCanvas = function () {
            return document.createElement("canvas");
        };
    }
    _FEATURE.setFeature("ral.createCanvas", "spec", featureValue);
});