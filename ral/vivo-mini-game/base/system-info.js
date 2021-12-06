import _UTIL from "../../util"

_UTIL.exportTo("env", qg, ral);
/**
 * 处理 vivo 平台在部分刘海屏机型, touch 事件发生偏移问题.
 * 当前 qg.getSystemInfo/qg.getSystemInfoSync 返回的 screenHeight, windowHeight, safeArea.height 返回的值会包括刘海屏高度, 与实际显示区域 screenHeight 不符.
 * 平台提供的 window.innerHeight 才是实际的游戏使用窗口的高度
 */
qg._vivoInnerHeight = window.innerHeight;
qg._vivoInnerWidth = window.innerWidth;


/**
 * (2021/12/3) Vivo 小游戏 API 文档未标明支持 pixelRatio，但可以获取到一个异常的值。这里将其实现为 1， 使得 pixelRatio 与 screenHeight(screenWidth)的乘积与设备的分辩率保持一致
 * windowWidth(windowHeight) 为游戏的可使用窗口宽高。 当游戏运行在异形屏设备上，应用悬浮窗上，返回值与screenWidth(screenHeight) 不同
 */
const _getSystemInfo = qg.getSystemInfo;
ral.getSystemInfo = function (object) {
    let _callbacks = object;
    if (_callbacks && typeof _callbacks.success === "function") {
        let _success = _callbacks.success;
        _callbacks.success = function (res) {
            if (res) {
                res.platform = "android";
                res.windowHeight = qg._vivoInnerHeight;
                res.windowWidth = qg._vivoInnerWidth;
                res.pixelRatio = 1;
            }
            _success(res);
        }
    }
    return _getSystemInfo(_callbacks);
};

ral.getSystemInfoSync = function () {
    let systemInfo = qg.getSystemInfoSync();
    systemInfo.platform = "android";
    systemInfo.windowHeight = qg._vivoInnerHeight;
    systemInfo.windowWidth = qg._vivoInnerWidth;
    systemInfo.pixelRatio = 1;
    return systemInfo;
};