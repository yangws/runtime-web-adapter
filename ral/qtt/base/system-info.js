import _UTIL from "../../util"

let _rt = loadRuntime();

_UTIL.exportTo("env", _rt, ral);
_UTIL.exportTo("getSystemInfo", _rt, ral);
_UTIL.exportTo("getSystemInfoSync", _rt, ral);