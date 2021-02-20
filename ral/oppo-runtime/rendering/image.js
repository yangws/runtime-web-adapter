import _UTIL from "../../util";

_UTIL.exportTo("loadImageData", qg, jsb, function () {
    if (typeof jsb.loadImage === "function") {
        jsb.loadImageData = jsb.loadImage;
    } else {
        console.error("loadImageData is not function");
    }
});
_UTIL.exportTo("createImage", qg, jsb, function () {
    if (document && typeof document.createElement === "function") {
        jsb.createImage = function () {
            return document.createElement("image");
        };
    }
});