import _UTIL from "../../util"

_UTIL.exportTo("createCanvas", qg, jsb, function () {
    if (document && typeof document.createElement === "function") {
        jsb.createCanvas = function () {
            return document.createElement("canvas");
        };
    }
});

if (!CanvasRenderingContext2D.prototype.getImageData) {
    CanvasRenderingContext2D.prototype.getImageData = function () {
        console.error('unsupport getImageData');
    }
}