import _UTIL from "../../util"
import _FEATURE from "../../feature";

_UTIL.exportTo("createCanvas", qg, jsb, function () {
    let featureValue = "unsupported";
    if (document && typeof document.createElement === "function") {
        featureValue = "wrapper";
        jsb.createCanvas = function () {
            return document.createElement("canvas");
        };
    }
    _FEATURE.setFeature("ral.createCanvas", "spec", featureValue);
});