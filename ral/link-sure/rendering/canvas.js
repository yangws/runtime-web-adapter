import _UTIL from "../../util"

_UTIL.exportTo("createCanvas", wuji, jsb, function () {
    _UTIL.weakMap.get(jsb).runtimeNonsupports.push("createCanvas");
    if (document && typeof document.createElement === "function") {
        jsb.createCanvas = function () {
            return document.createElement("canvas");
        };
    }
});