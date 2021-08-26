const _onWindowResize = qg.onWindowResize;
ral.onWindowResize = function (callBack) {
    _onWindowResize(function (size) {
        callBack(size.width || size.windowWidth, size.height || size.windowHeight);
    });
};

//TODO 需要删除，引擎不应该调用这接口
window.resize = function () {
    console.warn('window.resize() not supported');
}