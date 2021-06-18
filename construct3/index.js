require('../ral/cocos-runtime/index.js');
require("../web/window.js");

window.HTMLCanvasElement = require("./HTMLCanvasElement.js")
let oldCreateElement = document.createElement;
document.createElement = function (name) {
    if (name === "canvas") {
        return new window.HTMLCanvasElement;
    }
    return oldCreateElement(name);
}

window.MessagePort = require("./MessagePort.js");
window.MessageChannel = require("./MessageChannel.js");
window.Worker = require("./Worker.js");
window.fetch = require("./Fetch.js");