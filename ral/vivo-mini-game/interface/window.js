let _callbackListenerArray = [];

Object.defineProperty(window, "devicePixelRatio", {
    set(val) {
    },
    get() {
        return 1;
    }
});

/**
 * 处理 vivo 平台在部分刘海屏机型, touch事件发生偏移问题。
 * 当前 qg 空间下不包含 qg.onWindowResize 方法，故需要单独实现ral.onWindowResize
 * 该修改./base/system-info.js 关联
 */
ral.onWindowResize = function (callBack) {
    if (typeof callBack === "function") {
        if (_callbackListenerArray.indexOf(callBack) !== -1) {
            return;
        }
        _callbackListenerArray.push(callBack);
    }
};

ral.offWindowResize = function (callBack) {
    let index = _callbackListenerArray.indexOf(callBack);
    if (index !== -1) {
        _listeners.splice(index, 1);
    }
};

window.resize = function (width, height) {
    qg._vivoInnerWidth = width;
    qg._vivoInnerHeight = height;
    _callbackListenerArray.forEach(function (callback) {
        callback(width, height);
    })
}