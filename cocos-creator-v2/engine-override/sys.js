const sys = cc.sys;

if (typeof ral.getNetworkType === 'function') {
    let currentNetworkType = cc.sys.NetworkType.LAN;
    function _getNetworkType() {
        ral.getNetworkType({
            success: function (networkType) {
                if (networkType === "none") {
                    // 网络不通
                    currentNetworkType = cc.sys.NetworkType.NONE;
                } else if (networkType === "wifi" || networkType === "unknown") {
                    // 通过无线或者有线本地网络连接因特网
                    currentNetworkType = cc.sys.NetworkType.LAN;
                } else {
                    // 通过蜂窝移动网络连接因特网
                    currentNetworkType = cc.sys.NetworkType.WWAN;
                }
            },
            fail: function () {
                // 与引擎保持一致，请求失败默认返回 cc.sys.NetworkType.LAN
                currentNetworkType = cc.sys.NetworkType.LAN;
            }
        });
    }
    _getNetworkType();

    sys.getNetworkType = function () {
        _getNetworkType();
        return currentNetworkType;
    }
} else {
    sys.getNetworkType = function () {
        console.error("The sys.getNetworkType is not support on this platform!");
    }
}


if (typeof ral.getBatteryInfoSync === 'function') {
    sys.getBatteryLevel = function () {
        return ral.getBatteryInfoSync().level;
    }
} else {
    sys.getBatteryLevel = function () {
        console.error("The sys.getBatteryLevel is not define!");
    }
}

if (typeof ral.triggerGC === 'function') {
    sys.garbageCollect = ral.triggerGC;
} else {
    sys.garbageCollect = function () {
        console.error("The sys.garbageCollect is not define!");
    }
}

sys.restartVM = function () {
    console.error("The restartVM is not define!");
}