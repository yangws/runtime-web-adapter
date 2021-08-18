let _systemInfo = ral.getSystemInfoSync();

// 获取平台对应的编号
window.__getPlatform = function () {
    var platform = _systemInfo.platform.toLowerCase();
    var model = _systemInfo.model.toLowerCase();

    if (platform === "android") {
        return cc.sys.OS_ANDROID;
    } else if (platform === "ios") {
        if (model.indexOf("iphone")) {
            return cc.sys.IPHONE;
        } else if (model.indexOf("ipad")) {
            return cc.sys.IPAD;
        }
    }
    return cc.sys.UNKNOWN;
};

// 获取 os 字符串
window.__getOS = function () {
    return _systemInfo.platform;
};

// 获取系统语言
window.__getCurrentLanguage = function () {
    return _systemInfo.language;
};

// 获取系统版本号
window.__getOSVersion = function () {
    return _systemInfo.system;
};

// 适配引擎中使用到的 window.__canvas
window.__canvas = new HTMLCanvasElement();
window.document.body.appendChild(window.__canvas);

// 适配引擎中使用到的 jsb 空间下的方法
window.jsb = {};
if (typeof ral.setPreferredFramesPerSecond !== 'undefined') {
    jsb.setPreferredFramesPerSecond = ral.setPreferredFramesPerSecond;
} else {
    jsb.setPreferredFramesPerSecond = function () {
        console.error("The jsb.setPreferredFramesPerSecond is not define!");
    }
}