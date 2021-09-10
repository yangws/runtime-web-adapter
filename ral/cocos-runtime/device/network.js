import _UTIL from "../../util"
let _rt = loadRuntime();

_UTIL.exportTo("getNetworkType", _rt, ral);
_UTIL.exportTo("onNetworkStatusChange", _rt, ral);
_UTIL.exportTo("offNetworkStatusChange", _rt, ral);