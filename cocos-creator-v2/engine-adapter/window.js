let _systemInfo = ral.getSystemInfoSync();

// 获取平台对应的编号
window.__getPlatform = function () {
    let platform = _systemInfo.platform.toLowerCase();
    let model = _systemInfo.model.toLowerCase();

    if (platform.indexOf("android") !== -1) {
        return cc.sys.ANDROID;
    } else if (platform.indexOf("ios") !== -1) {
        if (model.indexOf("iphone") !== -1) {
            return cc.sys.IPHONE;
        } else if (model.indexOf("ipad") !== -1) {
            return cc.sys.IPAD;
        }
    }
    return cc.sys.UNKNOWN;
};

// 获取 os 字符串
window.__getOS = function () {
    let platform = _systemInfo.platform.toLowerCase();
    if (platform.indexOf("android") !== -1) {
        return cc.sys.OS_ANDROID;
    } else if (platform.indexOf("ios") !== -1) {
        return cc.sys.OS_IOS
    } else {
        return cc.sys.OS_UNKNOWN;
    }
};

// 获取系统语言
window.__getCurrentLanguage = function () {
    let language = _systemInfo.language;
    if (language) {
        return language.toLowerCase().split("-")[0];
    } else {
        return cc.sys.LANGUAGE_UNKNOWN;
    }
};

// 获取系统版本号
window.__getOSVersion = function () {
    return _systemInfo.system;
};

// 适配引擎中使用到的 window.__canvas
window.__canvas = new HTMLCanvasElement(window.innerWidth, window.innerHeight);
window.addEventListener("resize", function () {
    window.__canvas.width = window.innerWidth;
    window.__canvas.height = window.innerHeight;
});
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

// 对应 v2 环境中 jsb.device undefined, 而引擎中调用 jsb.device.setMotionEnabled 导致的 error
if (!jsb.device) {
    jsb.device = {
        setMotionEnabled: function () {
            console.warn("The jsb.device has been deprecated");
        }
    };
}