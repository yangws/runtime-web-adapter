const _onWindowResize = wuji.onWindowResize;
let _info = wuji.getSystemInfoSync();
ral.onWindowResize = function (callBack) {
    _onWindowResize(function (size) {
        callBack(size.width || (size.windowWidth / _info.devicePixelRatio), size.height || (size.windowHeight / _info.devicePixelRatio));
    });
};

// window.resize 已废弃
window.resize = function () {
    console.warn('window.resize() is deprecated');
}