import _UTIL from "../../util";

let _rt = loadRuntime();

if (_rt.triggerGC) {
    // V1
    _UTIL.exportTo("triggerGC", _rt, ral);
} else {
    // v2
    ral.triggerGC = function () {
        console.error("The triggerGC has been deprecated");
    }
}