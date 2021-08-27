const _onWindowResize = qg.onWindowResize;
ral.onWindowResize = function (callBack) {
    _onWindowResize(function (size) {
        callBack(size.width || size.windowWidth, size.height || size.windowHeight);
    });
};

// window.resize 已废弃
window.resize = function () {
    console.warn('window.resize() is deprecated');
}