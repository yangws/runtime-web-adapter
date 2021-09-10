const sys = cc.sys;

// 实现 cc.sys.getNetworkType
let currentNetworkType = cc.sys.NetworkType.LAN;
function _updateCurrentNetworkType(networkType) {
    if (networkType === "none") {
        // 网络不通
        currentNetworkType = cc.sys.NetworkType.NONE;
    } else if (networkType === "2g" || networkType === "3g" || networkType === "4g" || networkType === "5g") {
        // 通过蜂窝移动网络连接因特网
        currentNetworkType = cc.sys.NetworkType.WWAN;
    } else {
        // 通过无线或有线本地网络或未识别类型网络连接因特网
        currentNetworkType = cc.sys.NetworkType.LAN;
    }
}
// 获取初始的 NetworkType 并监听 NetWork 的状态变化
ral.getNetworkType({
    success: function (networkType) {
        _updateCurrentNetworkType(networkType)
    },
    fail: function () {
        // 与引擎保持一致，请求失败默认返回 cc.sys.NetworkType.LAN
        currentNetworkType = cc.sys.NetworkType.LAN;
    }
});

ral.onNetworkStatusChange(function (res) {
    if (res.isConnected) {
        _updateCurrentNetworkType(res.networkType);
    } else {
        currentNetworkType = cc.sys.NetworkType.NONE;
    }
});

sys.getNetworkType = function () {
    return currentNetworkType;
}

// 实现 cc.sys.getBatteryLevel. 返回值范围[0, 1], ral接口返回值[1, 100]
sys.getBatteryLevel = function () {
    return ral.getBatteryInfoSync().level / 100.0;
}

sys.garbageCollect = ral.triggerGC;

sys.restartVM = function () {
    console.error("The restartVM is not define!");
}