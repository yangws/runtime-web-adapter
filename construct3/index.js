require('../ral/cocos-runtime/index.js');
require("../web/window.js");

// 重写 document.createElement 方法
let __canvas = window.__canvas;
let oldCreateElement = document.createElement;
document.createElement = function (name) {
    name = name.toLowerCase();
    // 若创建 canvas, 做相应处理
    if (name === "canvas") {
        var node = oldCreateElement(name);
        let _getContext = node.getContext;
        node.getContext = function (type, attributes) {
            // 若获取 webgl 相关的 context 则返回主屏 webgl context
            if (type === 'webgl' ||
                type === 'webgl2' ||
                type === 'experimental-webgl' ||
                type === 'experimental-webgl2') {
                // 当主屏的 canvas 还未创建(V2中),则以第一个创建的 canvas 为主屏的 canvas;
                if (typeof __canvas === "undefined") {
                    __canvas = this;
                    return _getContext.call(this, type, attributes);
                } else if (__canvas === this) {
                    // 当主屏的 canvas 以 _canvas = this 的方法创建(V2中), 使用 _getContext 方法返回 context
                    return _getContext.call(this, type, attributes);
                }
                return __canvas.getContext(type, attributes);
            } else {
                // 否则获取当前 canvas 的 context
                return _getContext.call(this, type, attributes);
            }
        }
        return node;
    } else {
        // 若不是创建 canvas, 使用原先的 document.createElement
        return oldCreateElement(name);
    }
}

window.MessagePort = require("./MessagePort.js");
window.MessageChannel = require("./MessageChannel.js");
window.Worker = require("./Worker.js");
window.fetch = require("./Fetch.js");