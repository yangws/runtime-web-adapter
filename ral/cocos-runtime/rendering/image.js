import _UTIL from "../../util";

let _rt = loadRuntime();

_UTIL.exportTo("loadImageData", _rt, jsb);
_UTIL.exportTo("createImage", _rt, jsb, function () {
    if (document && typeof document.createElement === "function") {
        jsb.createCanvas = function () {
            return document.createElement("image");
        };
    }
});