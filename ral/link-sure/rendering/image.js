import _UTIL from "../../util";

_UTIL.exportTo("loadImageData", wuji, jsb);
_UTIL.exportTo("createImage", wuji, jsb, function () {
    _UTIL.weakMap.get(jsb).runtimeNonsupports.push("createImage");
    if (document && typeof document.createElement === "function") {
        jsb.createImage = function () {
            return document.createElement("image");
        };
    }
});