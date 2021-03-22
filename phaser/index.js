
require("../ral/cocos-runtime/index.js");
require("../web/window.js");

window.HTMLCanvasElement = require("./HTMLCanvasElement.js");
let oldCreateElement = document.createElement;
document.createElement = function (name) {
    if (name === "canvas") {
        return new window.HTMLCanvasElement;
    }
    return oldCreateElement(name);
}

window.scrollTo = function () {
    console.warn("The HTML DOM scrollTo() method is not supported!");
}
