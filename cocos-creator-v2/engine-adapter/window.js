let _systemInfo = ral.getSystemInfoSync();

// 获取平台对应的编号
window.__getPlatform = function () {
    let platform = _systemInfo.platform.toLowerCase();
    let model = _systemInfo.model.toLowerCase();

    if (platform.indexOf("android") >= 0) {
        return cc.sys.ANDROID;
    } else if (platform.indexOf("ios") >= 0) {
        if (model.indexOf("iphone") >= 0) {
            return cc.sys.IPHONE;
        } else if (model.indexOf("ipad") >= 0) {
            return cc.sys.IPAD;
        }
    }
    return cc.sys.UNKNOWN;
};

// 获取 os 字符串
window.__getOS = function () {
    let platform = _systemInfo.platform.toLowerCase();
    if (platform.indexOf("android") >= 0) {
        return cc.sys.OS_ANDROID;
    } else if (platform.indexOf("ios") >= 0) {
        return cc.sys.OS_IOS
    } else {
        return cc.sys.OS_UNKNOWN;
    }
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