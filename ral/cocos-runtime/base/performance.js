import _UTIL from "../../util";
let _rt = loadRuntime();

_UTIL.exportTo("triggerGC", _rt, ral, function () {
    ral.triggerGC = function () {
        console.error("The triggerGC has been deprecated");
    }
});