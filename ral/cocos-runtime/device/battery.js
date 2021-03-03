import _UTIL from "../../util"

let _rt = loadRuntime();

_UTIL.exportTo("getBatteryInfo", _rt, ral);
_UTIL.exportTo("getBatteryInfoSync", _rt, ral);