import _UTIL from "../../util"

_UTIL.exportTo("env", hbs, ral);

// 适配华为快游戏在1078版本后，因为 screenHeight/Width 返回值变化，导致游戏在设备上显示区域异常的问题
let _getSystemInfo = hbs.getSystemInfo;
ral.getSystemInfo = function (object) {
    let _callbacks = object;
    if (_callbacks && typeof _callbacks.success === "function") {
        let _success = _callbacks.success;
        _callbacks.success = function (res) {
            if (res) {
                let _pixelRatio = res.pixelRatio;
                if (_pixelRatio !== 1) {
                    res.screenHeight = res.screenHeight * _pixelRatio;
                    res.screenWidth = res.screenWidth * _pixelRatio;
                    res.windowWidth = res.windowWidth * _pixelRatio;
                    res.windowHeight = res.windowWidth * _pixelRatio;
                    res.pixelRatio = 1;
                }
            }
            _success(res);
        }
    }
    return _getSystemInfo(_callbacks);
};

ral.getSystemInfoSync = function () {
    let _systemInfo = hbs.getSystemInfoSync();
    let _pixelRatio = _systemInfo.pixelRatio;
    if (_pixelRatio !== 1) {
        _systemInfo.screenHeight = _systemInfo.screenHeight * _pixelRatio;
        _systemInfo.screenWidth = _systemInfo.screenWidth * _pixelRatio;
        _systemInfo.windowWidth = _systemInfo.windowWidth * _pixelRatio;
        _systemInfo.windowHeight = _systemInfo.windowWidth * _pixelRatio;
        _systemInfo.pixelRatio = 1;
    }
    return _systemInfo;
};