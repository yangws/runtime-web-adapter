let _rt = loadRuntime();

const _onWindowResize = _rt.onWindowResize;
jsb.onWindowResize = function (callBack) {
    _onWindowResize(function (size) {
        callBack(size.width || size.windowWidth, size.height || size.windowHeight);
    });
};
