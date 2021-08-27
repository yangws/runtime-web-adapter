import _UTIL from "../../util"

_UTIL.exportTo("env", qg, ral);
/**
 * 处理 vivo 平台在部分刘海屏机型, touch事件发生偏移问题.
 * 当前 qg.getSystemInfo/qg.getSystemInfoSync 返回的 screenHeight, windowHeight, safeArea.height 返回的值会包括刘海屏高度, 与实际显示区域screenHeight不符.
 * 平台提供的 window.innerHeight 才是正确的 screenHeight
 */
qg._vivoInnerHeight = window.innerHeight;
qg._vivoInnerWidth = window.innerWidth;

const _getSystemInfo = qg.getSystemInfo;
ral.getSystemInfo = function (object) {
    let _callbacks = object;
    if (_callbacks && typeof _callbacks.success === "function") {
        let _success = _callbacks.success;
        _callbacks.success = function (res) {
            if (res) {
                res.platform = "android";
                res.screenHeight = qg._vivoInnerHeight;
                res.screenWidth = qg._vivoInnerWidth;
            }
            _success(res);
        }
    }
    return _getSystemInfo(_callbacks);
};

ral.getSystemInfoSync = function () {
    let systemInfo = qg.getSystemInfoSync();
    systemInfo.platform = "android";
    systemInfo.screenHeight = qg._vivoInnerHeight;
    systemInfo.screenWidth = qg._vivoInnerWidth;
    return systemInfo;
};