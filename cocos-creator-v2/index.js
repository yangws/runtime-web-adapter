// 加载引擎适配模块
require("./engine-adapter/window");

// 在引擎加载后重写引擎中的部分方法
window.ccOverride = function () {
    require("./engine-override/index");
};