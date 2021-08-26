import _UTIL from "../../util"

_UTIL.exportTo("env", qg, ral);
_UTIL.exportTo("getSystemInfo", qg, ral);

// 处理 vivo 平台在部分刘海屏机型, touch事件发生偏移问题. screenHeight 包括了刘海屏高度, 但游戏在刘海屏区域并未显示, 当前 vivo 平台提供的 window.innerHeight 才是游戏显示区域的高度.
qg._vivoInnerHeight = window.innerHeight;
qg._vivoInnerWidth = window.innerWidth;

const _getSystemInfo = qg.getSystemInfo;
ral.getSystemInfo = function (object) {
    if (object) {
        let _success = object.success;
        object.success = function (res) {
            if (res) {
                res.platform = "android";
                res.screenHeight = qg._vivoInnerHeight;
                res.screenWidth = qg._vivoInnerWidth;
            }
            _success(res);
        }
    }
    return _getSystemInfo(object);
};

ral.getSystemInfoSync = function () {
    let systemInfo = qg.getSystemInfoSync();
    systemInfo.platform = "android";
    systemInfo.screenHeight = qg._vivoInnerHeight;
    systemInfo.screenWidth = qg._vivoInnerWidth;
    return systemInfo;
};



