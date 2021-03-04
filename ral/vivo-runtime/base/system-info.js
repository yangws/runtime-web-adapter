import _UTIL from "../../util"

_UTIL.exportTo("env", qg, ral);
_UTIL.exportTo("getSystemInfo", qg, ral);

ral.getSystemInfoSync = function () {
    let env = qg.getSystemInfoSync();
    env.platform = "android";
    return env;
}