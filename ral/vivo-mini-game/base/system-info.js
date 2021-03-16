import _UTIL from "../../util"

_UTIL.exportTo("env", qg, ral);
_UTIL.exportTo("getSystemInfo", qg, ral);

ral.getSystemInfoSync = function () {
    let systemInfo = qg.getSystemInfoSync();
    let isAndroid = systemInfo.osType.toLowerCase().indexOf("android") !== -1;
    if (isAndroid) {
        systemInfo.platform = "android";
    } else {
        systemInfo.platform = "ios";
    }
    return systemInfo;
};