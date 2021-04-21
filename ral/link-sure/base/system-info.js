import _UTIL from "../../util"

_UTIL.exportTo("env", wuji, ral);
_UTIL.exportTo("getSystemInfo", wuji, ral);
_UTIL.exportTo("getSystemInfoSync", wuji, ral);

const _getSystemInfoSync = ral.getSystemInfoSync.bind(wuji);
ral.getSystemInfoSync = function () {
    let systemInfo = _getSystemInfoSync(...arguments);
    if (!systemInfo.language) {
        systemInfo.language = "zh";
    }
    return systemInfo;
};

const _getSystemInfo = ral.getSystemInfo.bind(wuji);
ral.getSystemInfo = function (object) {
    let args = Array.prototype.slice.call(arguments, 1);
    let options = object;
    if (typeof options === "object" && options.success === "function") {
        options = Object.assign({}, options);
        let _success = object.success.bind(object);
        options.success = function (res) {
            if (res && !res.language) {
                res.language = "zh";
            }
            _success(...arguments);
        };
    }
    return _getSystemInfo(options, ...args);
};