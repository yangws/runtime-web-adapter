
const _onWindowResize = qg.onWindowResize;
jsb.onWindowResize = function (callBack) {
    _onWindowResize(function (size) {
        callBack(size.width || size.windowWidth, size.height || size.windowHeight);
    });
};
