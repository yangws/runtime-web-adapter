let _callbackListenerArray = [];

Object.defineProperty(window, "devicePixelRatio", {
    set(val) {
    },
    get() {
        return 1;
    }
});

// 处理 vivo 平台在部分刘海屏机型, touch事件发生偏移问题. screenHeight 包括了刘海屏高度, 但游戏在刘海屏区域并未显示. 当前 vivo 平台提供的 window.innerHeight 才是游戏显示区域的高度.
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