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

/**
 * 手机屏幕安全区域功能，引擎代码中, 仅仅支持安卓、iOS 原生平台和微信小游戏平台。 这里参考了 2.4.5 版本 runtime 插件的适配逻辑
 * sys.getSafeAreaRect 返回手机屏幕安全区域（设计分辨率为单位）
 */

let safeArea = ral.getSystemInfoSync().safeArea;
if (safeArea == null) {
    let originSafeAreaRect = sys.getSafeAreaRect;
    sys.getSafeAreaRect = function () {
        console.warn("The cc.sys.getSafeAreaRect is not support on this platform!");
        return originSafeAreaRect();
    }
} else {
    sys.getSafeAreaRect = function () {
        // 将 safeArea 的参数从设备的物理分辨率为单位的坐标系 转为 设计分辨率为单位的坐标系

        // Get the real location on device.
        let leftBottom = new cc.Vec2(safeArea.left, safeArea.bottom);
        let rightTop = new cc.Vec2(safeArea.right, safeArea.top);

        // convert leftBottom and rightTop point to UI coordinates
        let view = cc.view;
        let frameSize = view.getFrameSize();
        let relatedPos = {
            left: 0,
            top: 0,
            width: frameSize.width,
            height: frameSize.height
        };
        view.convertToLocationInView(leftBottom.x, leftBottom.y, relatedPos, leftBottom);
        view.convertToLocationInView(rightTop.x, rightTop.y, relatedPos, rightTop);

        // convert leftBottom and rightTop point to design resolution coordinates
        view._convertPointWithScale(leftBottom);
        view._convertPointWithScale(rightTop);

        return cc.rect(leftBottom.x, leftBottom.y, rightTop.x - leftBottom.x, rightTop.y - leftBottom.y);
    }
}