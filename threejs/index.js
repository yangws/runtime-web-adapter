let _oldCreateElement = document.createElement;
let _canvas;
document.createElement = function (name) {
    if (name === "canvas") {
        if (_canvas === undefined) {
            _canvas = new window.HTMLCanvasElement;
        }
        return _canvas;
    }
    return _oldCreateElement(name);
}
