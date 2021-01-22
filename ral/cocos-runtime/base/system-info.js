import _UTIL from "../../util"

let _rt = loadRuntime();

_UTIL.exportTo("getSystemInfo", _rt, jsb);
_UTIL.exportTo("getSystemInfoSync", _rt, jsb);