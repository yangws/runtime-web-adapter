import _UTIL from "../../util";

_UTIL.exportTo("loadImageData", hbs, jsb, function () {
    if (typeof jsb.loadImage === "function") {
        jsb.loadImageData = jsb.loadImage;
    } else {
        console.error("loadImageData is not function");
    }
});
_UTIL.exportTo("createImage", hbs, jsb, function () {
    if (document && typeof document.createElement === "function") {
        jsb.createImage = function () {
            return document.createElement("image");
        };
    }
});