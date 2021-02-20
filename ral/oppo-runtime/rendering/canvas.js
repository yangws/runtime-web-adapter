import _UTIL from "../../util"

_UTIL.exportTo("createCanvas", qg, jsb, function () {
    if (document && typeof document.createElement === "function") {
        jsb.createCanvas = function () {
            return document.createElement("canvas");
        };
    }
});