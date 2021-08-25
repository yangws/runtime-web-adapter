import _UTIL from "../../util"

_UTIL.exportTo("env", qg, ral);
_UTIL.exportTo("getSystemInfo", qg, ral);

ral.getSystemInfoSync = function () {
    let systemInfo = qg.getSystemInfoSync();
    systemInfo.platform = "android";
    systemInfo.screenHeight = window.innerHeight;
    systemInfo.screenWidth = window.innerWidth;
    return systemInfo;
};