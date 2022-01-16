import _UTIL from "../../util"
import _FEATURE from "../../feature";

let _rt = loadRuntime();

_UTIL.exportTo("createCanvas", _rt, ral, function () {
    let featureValue = "unsupported";
    if (document && typeof document.createElement === "function") {
        featureValue = "wrapper";
        ral.createCanvas = function () {
            return document.createElement("canvas");
        };
    }
    _FEATURE.setFeature("ral.createCanvas", "spec", featureValue);
});

const KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC = "canvas.context2d.textbaseline.alphabetic"
const KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT = "canvas.context2d.textbaseline.default"

/*
 * 注册canvas context2d textBaseline alphabetic属性的get方法和set方法
 * get():
 *   返回值
 *     1: 表示平台支持该属性
 *     0: 表示平台不支持该属性
 *    -1: 表示获取该属性错误
 *    -2: 表示传入的参数不合法
 *    -3: 表示不支持该属性的获取方法，即获取方法未定义或未注册
 * set(value):
 *   参数 value
 *     有效值为0或1
 *   返回值
 *     true: 设置成功
 *     false: 设置失败
 */
_FEATURE.registerFeatureProperty(
    KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC,
    function () { // get
        if (typeof _rt.getFeature === "function") {
            return _rt.getFeature();
        } else {
            return -3;
        }
    },
    function (value) { // set
        if (typeof _rt.setFeature === "function") {
            return _rt.setFeature(value);
        } else {
            return false;
        }
    }
);

/*
 * 注册canvas context2d textBaseline defalut属性的get方法和set方法
 * get():
 *   返回值
 *     1: 表示平台的canvas context2d textBaseline default属性是alphabetic
 *     0: 表示平台的canvas context2d textBaseline default属性是bottom，即用于兼容老版本的特性
 *    -1: 表示获取该属性错误
 *    -2: 表示传入的参数不合法
 *    -3: 表示不支持该属性的获取方法，即获取方法未定义或未注册
 * set(value):
 *   参数 value
 *     有效值为0或1
 *   返回值
 *     true: 设置成功
 *     false: 设置失败
 */
_FEATURE.registerFeatureProperty(
    KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT,
    function () { // get
        if (typeof _rt.getFeature === "function") {
            return _rt.getFeature();
        } else {
            return -3;
        }
    },
    function (value) { // set
        if (typeof _rt.setFeature === "function") {
            return _rt.setFeature(value);
        } else {
            return false;
        }
    }
);