let _rt = loadRuntime();
let systemInfo = _rt.getSystemInfoSync();

// 获取平台对应的编号
window.__getPlatform = function () {
    var platform = systemInfo.platform.toLowerCase();
    var model = systemInfo.model.toLowerCase();

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
    return systemInfo.platform;
};

// 获取系统语言
window.__getCurrentLanguage = function () {
    return systemInfo.language;
};

// 获取系统版本号
window.__getOSVersion = function () {
    return systemInfo.system;
};

// 适配引擎中使用到的 window.__canvas
window.__canvas = new HTMLCanvasElement();
window.document.body.appendChild(window.__canvas);


// 适配引擎中使用到的 jsb 空间下的方法
window.jsb = {};
if (typeof _rt.setPreferredFramesPerSecond !== 'undefined') {
    jsb.setPreferredFramesPerSecond = _rt.setPreferredFramesPerSecond;
} else {
    jsb.setPreferredFramesPerSecond = function () {
        console.error("The jsb.setPreferredFramesPerSecond is not define!");
    }
}