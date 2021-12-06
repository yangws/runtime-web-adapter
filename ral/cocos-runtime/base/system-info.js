import _UTIL from "../../util"

let _rt = loadRuntime();

/**
 * ral.env 属性说明
 * USER_DATA_PATH  {string} 用户文件目录路径，开发者拥有对这个目录的读写权限。
 */
_UTIL.exportTo("env", _rt, ral);
_UTIL.exportTo("getSystemInfo", _rt, ral);


/**
 * getSystemInfoSync 返回值的部分参数补充说明:
 * pixelRatio 表示物理像素 / 逻辑像素。不同平台对该属性的支持程度不同，在 ral 层约定 pixelRatio 与 screenWidth(screenHeight) 的乘积为设备实际的分辩率(单位：物理像素)。
 * screenWidth(screenHeight) 表示屏幕的宽高(单位:逻辑像素)。 screenWidth 在游戏横屏显示时表示屏幕较长一边，竖屏显示时表示较短的一边。
 * windowWidth(windowHeight) 表示游戏的可使用窗口宽高(单位:逻辑像素)，当游戏设置 canvas 宽高超出该值会导致 canvas 显示不全。windowWidth
 * 游戏横屏显示时表示窗口较长一边，竖屏显示时表示较短的一边。
 *
 * windowWidth(windowHeight) 与 screenWidth(screenHeight) 返回值不一定相同，例如当游戏运行在刘海屏设备上，或者以悬浮窗方式（显示区域只占屏幕一部分）运行。
 */
_UTIL.exportTo("getSystemInfoSync", _rt, ral);