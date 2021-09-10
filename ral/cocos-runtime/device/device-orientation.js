import _UTIL from "../../util";
let _rt = loadRuntime();

if (_rt.onDeviceOrientationChange) {
    // runtime v2
    _UTIL.exportTo("onDeviceOrientationChange", _rt, ral);
    _UTIL.exportTo("offDeviceOrientationChange", _rt, ral);
}