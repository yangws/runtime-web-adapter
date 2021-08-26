const _onWindowResize = wuji.onWindowResize;
let _info = wuji.getSystemInfoSync();
ral.onWindowResize = function (callBack) {
    _onWindowResize(function (size) {
        callBack(size.width || (size.windowWidth / _info.devicePixelRatio), size.height || (size.windowHeight / _info.devicePixelRatio));
    });
};

//TODO 需要删除，引擎不应该调用这接口
window.resize = function () {
    console.warn('window.resize() not supported');
}