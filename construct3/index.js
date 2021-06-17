// 检测加载 C3 webAdapter 之前是否已经有DOM环境
var _is_jsbcompatible_loaded = true;
try {
    document;
} catch {
    _is_jsbcompatible_loaded = false;
}
var _getElementById_Jsb;
if (_is_jsbcompatible_loaded) {
    _getElementById_Jsb = document.getElementById;
}

// 导入ral, web, construct3模块适配代码
require('../ral/cocos-runtime/index.js');
require("../web/window.js");

window.MessagePort = require("./MessagePort.js");
window.MessageChannel = require("./MessageChannel.js");
window.Worker = require("./Worker.js");
window.fetch = require("./Fetch.js");

// 若加载 C3 webAdapter 之前已经有DOM环境，则做出调整以兼容runtimeVersion 1.0.0
if (_is_jsbcompatible_loaded) {
    var _createElement_WebAdapter = document.createElement;
    var hasCreated = false;
    document.createElement = function (name) {
        // 理论上第一次返回的canvas为主canvas，后续返回的离屏幕canvas
        if (name === "canvas") {
            var node;
            if (!hasCreated) {
                hasCreated = true;
                node = _getElementById_Jsb(name);
            } else {
                node = _createElement_WebAdapter(name);
                var oldGetContext = node.getContext.bind(node);
                node.style = _getElementById_Jsb("canvas").style;
                node.getContext = function (type, opts) {
                    // 特殊处理：任何canvas都返回主canvas的webgl
                    if (type === 'webgl' ||
                        type === 'webgl2' ||
                        type === 'experimental-webgl' ||
                        type === 'experimental-webgl2') {
                        return _getElementById_Jsb("canvas").getContext(type, opts);
                    } else {
                        return oldGetContext(type, opts);
                    }
                };
            }
            return node;
        }
        return _createElement_WebAdapter(name);
    }
}