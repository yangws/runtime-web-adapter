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

/*
 * 功能属性名称
 */
const KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC = "canvas.context2d.textbaseline.alphabetic";
const KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT = "canvas.context2d.textbaseline.default";

const FEATURE_ERR_NONE = 0;  // 仅用于设置，表示设置成功
const FEATURE_ERR_UNSUPPORT = -1;   // 不支持访问该功能属性，比如旧版本可能不存在该feature

let _rt_getFeature = (typeof _rt.getFeature === "function") ? _rt.getFeature : undefined;
let _rt_setFeature = (typeof _rt.setFeature === "function") ? _rt.setFeature : undefined;

if (_rt_getFeature === "function") {
    delete _rt.getFeature
}
if (_rt_setFeature === "function") {
    delete _rt.setFeature
}

/*
 * 注册canvas context2d textBaseline alphabetic属性的get方法和set方法
 * get():
 *   返回值
 *     1: 表示平台的canvas context2d textBaseline支持alphabetic属性
 *     FEATURE_ERR_UNSUPPORT(-1): 不支持访问该功能属性
 * set(): 该属性不支持set方法
 */
_FEATURE.registerFeatureProperty(
    KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC,
    function () { // get
        if (typeof _rt_getFeature === "function") {
            return _rt_getFeature(KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC);
        }
        return FEATURE_ERR_UNSUPPORT;
    },
    undefined // This feature property not support for set
);

/*
 * 注册canvas context2d textBaseline defalut属性的get方法和set方法
 * get():
 *   返回值
 *     1: 表示平台的canvas context2d textBaseline default属性是alphabetic
 *     0: 表示平台的canvas context2d textBaseline default属性是bottom，即用于兼容老版本的特性
 *     FEATURE_ERR_UNSUPPORT(-1): 不支持访问该功能属性
 * set(value):
 *   参数 value
 *     有效值为0或1
 *   返回值
 *     FEATURE_ERR_NONE(0): 设置功能属性成功
 *     FEATURE_ERR_UNSUPPORT(-1): 功能模块不支持该功能属性
 */
_FEATURE.registerFeatureProperty(
    KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT,
    function () { // get
        if (typeof _rt_getFeature === "function") {
            return _rt_getFeature(KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT);
        }
        return FEATURE_ERR_UNSUPPORT;
    },
    function (value) { // set
        if (typeof _rt_setFeature === "function") {
            let returnCode = _rt_setFeature(KEY_FEATURE_CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT, value);
            return returnCode ? FEATURE_ERR_NONE : FEATURE_ERR_UNSUPPORT;
        }
        return FEATURE_ERR_UNSUPPORT;
    }
);