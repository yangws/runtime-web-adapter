import _UTIL from "../../util"

let _rt = loadRuntime();

/**
 * ral.env 属性说明
 * USER_DATA_PATH  {string} 用户文件目录路径，开发者拥有对这个目录的读写权限。
 */
_UTIL.exportTo("env", _rt, ral);
_UTIL.exportTo("getSystemInfo", _rt, ral);


/**
 * getSystemInfoSync 返回值的部分参数补充说明
 * windowWidth(windowHeight) 为游戏的可使用窗口宽高。 当游戏运行在异形屏设备上，应用悬浮窗上，返回值与screenWidth(screenHeight) 不同
 * 当游戏的显示方向发生变化 screenWidth、screenHeight、windowWidth、windowHeight，以及safeArea 中的属性也会变化。游戏横屏显示时 width 为长的一边， 竖屏显示时，width 为短的一边。
 */
_UTIL.exportTo("getSystemInfoSync", _rt, ral);