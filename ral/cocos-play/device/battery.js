import _UTIL from "../../util"

let _rt = loadRuntime();

_UTIL.exportTo("getBatteryInfo", _rt, jsb);
_UTIL.exportTo("getBatteryInfoSync", _rt, jsb);