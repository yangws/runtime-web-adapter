import _UTIL from "../../util"

let _rt = loadRuntime();

_UTIL.exportTo("createCanvas", _rt, jsb, function () {
    if (document && typeof document.createElement === "function") {
        jsb.createCanvas = function () {
            return document.createElement("canvas");
        };
    }
});