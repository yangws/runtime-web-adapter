import _UTIL from "../../util"

let _rt = loadRuntime();

_UTIL.exportTo("onKeyboardInput", _rt, ral);
_UTIL.exportTo("onKeyboardConfirm", _rt, ral);
_UTIL.exportTo("onKeyboardComplete", _rt, ral);
_UTIL.exportTo("offKeyboardInput", _rt, ral);
_UTIL.exportTo("offKeyboardConfirm", _rt, ral);
_UTIL.exportTo("offKeyboardComplete", _rt, ral);

_UTIL.exportTo("hideKeyboard", _rt, ral);
_UTIL.exportTo("showKeyboard", _rt, ral);
_UTIL.exportTo("updateKeyboard", _rt, ral);