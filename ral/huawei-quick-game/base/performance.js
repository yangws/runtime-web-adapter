import _UTIL from "../../util";

_UTIL.exportTo("triggerGC", hbs, ral, function () {
    ral.triggerGC = function () {
        console.warn("The triggerGC is not supported on this platform");
    }
});