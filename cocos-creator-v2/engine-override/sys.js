const sys = cc.sys;

if (typeof ral.getNetworkType === 'function') {
    let currentNetworkType = cc.sys.NetworkType.LAN;
    function _getNetworkType() {
        ral.getNetworkType({
            success: function (networkType) {
                if (networkType === "none") {
                    currentNetworkType = cc.sys.NetworkType.NONE;
                } else if (networkType === "wifi" || networkType === "unknown") {
                    currentNetworkType = cc.sys.NetworkType.LAN;
                } else {
                    currentNetworkType = cc.sys.NetworkType.WWAN;
                }
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