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
        if (CanvasRenderingContext2D.prototype._getData) {
            return this._getData();
        } else {
            console.warn('unsupport getImageData');
            return null;
        }
    }
}