import _UTIL from "../../util"

_UTIL.exportTo("env", qg, ral);

/**
 * 处理 vivo 平台在部分刘海屏机型, touch 事件发生偏移问题
 * (2021/12/3) 根据 vivo 小游戏 API文档， Vivo 平台的 getSystemInfo 暂不支持 pixelRatio, windowHeight, windowWidth 属性(实际使用会获取到错误的值)。
 *
 * screenHeight 与 screenWidth 的返回值与设备实际的分辩率宽高数值相等，所以这里将 pixelRatio 返回值设为 1, 使得在 ral 层获取到的 pixelRatio 与
 * screenHeight(screenWidth)的乘积与设备的分辩率保持一致。
 *
 * vivo 平台基于 web 标准实现了 window.innerWidth(window.innerHeight)，该属性表示表示浏览器viewport 的尺寸，高度上不包括状态栏（非游戏显示区域）
 * 的高度，故基于这两个接口实现 windowHeight 与 windowWidth。
 */
qg._vivoInnerHeight = window.innerHeight;
qg._vivoInnerWidth = window.innerWidth;

const _getSystemInfo = qg.getSystemInfo;
ral.getSystemInfo = function (object) {
    let _object = {};

    if (object && typeof object.success === "function") {
        let _success = object.success;
        // 将 object 中的回调函数深拷贝到 _object 中
        Object.keys(object).forEach(function (name) {
            if (typeof object[name] === "function") {
                _object[name] = object[name].bind();
            } else {
                _object[name] = object[name];
            }
        });

        _object.success = function (res) {
            if (res) {
                res.platform = "android";
                res.windowHeight = qg._vivoInnerHeight;
                res.windowWidth = qg._vivoInnerWidth;
                res.pixelRatio = 1;
            }
            _success(res);
        }
    }
    return _getSystemInfo(_object);
};

ral.getSystemInfoSync = function () {
    let systemInfo = qg.getSystemInfoSync();
    systemInfo.platform = "android";
    systemInfo.windowHeight = qg._vivoInnerHeight;
    systemInfo.windowWidth = qg._vivoInnerWidth;
    systemInfo.pixelRatio = 1;
    return systemInfo;
};