import _UTIL from "../../util"

let _rt = loadRuntime();

_UTIL.exportTo("onKeyboardInput", _rt, jsb);
_UTIL.exportTo("onKeyboardConfirm", _rt, jsb);
_UTIL.exportTo("onKeyboardComplete", _rt, jsb);
_UTIL.exportTo("offKeyboardInput", _rt, jsb);
_UTIL.exportTo("offKeyboardConfirm", _rt, jsb);
_UTIL.exportTo("offKeyboardComplete", _rt, jsb);

_UTIL.exportTo("hideKeyboard", _rt, jsb);
_UTIL.exportTo("showKeyboard", _rt, jsb);
_UTIL.exportTo("updateKeyboard", _rt, jsb);