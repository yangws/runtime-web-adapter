import _UTIL from "../../util"

let _rt = loadRuntime();

_UTIL.exportTo("loadFont", _rt, ral, function () {
    if (window.jsb && typeof jsb.loadFont === "function") {
        ral.loadFont = jsb.loadFont;
    }
});
