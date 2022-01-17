let _features = {};
let _getCallbacks = {};
let _setCallbacks = {};

const FEATURE_ERR_NONE = 0;  // 仅用于设置，表示设置成功
const FEATURE_ERR_UNSUPPORT = -1;   // 不支持访问该功能属性，比如旧版本可能不存在该feature
const FEATURE_ERR_UNREGISTER = -2;  // 没有功能模块对功能属性进行注册get或set方法
const FEATURE_ERR_INVALID_ARGUMENT = -3;  // 参数类型或值不按规范设置

export default {
    setFeature(featureName, property, value) {
        let feature = _features[featureName];
        if (!feature) {
            feature = _features[featureName] = {};
        }
        feature[property] = value;
    },
    /**
     * 获取功能属性描述
     * @param featureName {String} 功能名称
     * @param property {String} 功能属性
     * @returns {String|undefined}
     *      undefined: 标准实现
     *      "wrapper": ral 层包装
     *      "unsupported": 不支持
     *      ...
     */
    getFeatureProperty(featureName, property) {
        let feature = _features[featureName];
        return feature ? feature[property] : undefined;
    },

    /**
     * 注册功能属性的get方法或set方法.仅供RAL层的功能模块使用
     * @param {string} key
     * @param {function() : int} getFunction
     * @param {function(intValue) : boolean} setFunction
     * @returns {boolean}
     *     false: 注册功能属性的get方法或set方法失败
     *     true:  注册功能属性的get方法或set方法成功
     */
    registerFeatureProperty(key, getFunction, setFunction) {
        if (typeof key !== "string") {
            return false;
        }
        if (typeof getFunction !== "function" && typeof setFunction !== "function") {
            return false;  // get方法和set方法都不合法，不允许注册
        }
        if (typeof getFunction === "function" && typeof _getCallbacks[key] === "function") {
            return false;  // 该功能属性的get方法已被注册
        }
        if (typeof setFunction === "function" && typeof _setCallbacks[key] === "function") {
            return false;  // 该功能属性的set方法已被注册
        }

        if (typeof getFunction === "function") {
            _getCallbacks[key] = getFunction;
        }
        if (typeof setFunction === "function") {
            _setCallbacks[key] = setFunction;
        }

        return true;
    },

    /**
     * 注销功能属性的get方法或set方法.仅供RAL层的功能模块使用
     * @param {string} key
     * @param {boolean} getBool
     * @param {boolean} setBool
     * @returns {boolean}
     *     false: 注销功能属性的get方法或set方法失败
     *     true:  注销功能属性的get方法或set方法成功
     */
    unregisterFeatureProperty(key, getBool, setBool) {
        if (typeof key !== "string") {
            return false;
        }
        if (typeof getBool !== "boolean" || typeof setBool !== "boolean") {
            return false;  // 确保两个参数必须是boolean类型
        }
        if (getBool === true && typeof _getCallbacks[key] === "function") {
            _getCallbacks[key] = undefined;
        }
        if (setBool === true && typeof _setCallbacks[key] === "function") {
            _setCallbacks[key] = undefined;
        }

        return true;
    },

    /**
     * 获取功能属性的能力
     * @param {String} key 功能属性的名称
     * @returns {int}
     *      >= 0: 获取功能属性成功，返回值由功能模块定义含义,请参考功能模块的相关文档
     *      FEATURE_ERR_UNSUPPORT(-1): 功能模块不支持该功能属性
     *      FEATURE_ERR_UNREGISTER(-2): 没有功能模块注册该功能属性的get方法
     *      FEATURE_ERR_INVALID_ARGUMENT(-3): 参数不合法
     */
    getFeaturePropertyInt(key) {
        if (typeof key !== "string") {
            // 参数不是有效的字符串类型
            return FEATURE_ERR_INVALID_ARGUMENT;
        }

        let getFunction = _getCallbacks[key];
        if (getFunction === undefined) {
            // 没有功能模块注册该功能属性的get方法
            return FEATURE_ERR_UNREGISTER;
        }

        let value = getFunction();
        if (typeof value !== "number") {
            // 返回值不是有效的数值类型
            return FEATURE_ERR_UNSUPPORT;
        }
        if (value < FEATURE_ERR_UNSUPPORT) {
            value = FEATURE_ERR_UNSUPPORT;
        }
        return value;
    },

    /**
     * 设置或调整功能属性的能力
     * @param {String} key 功能属性的名称
     * @param {String} value 表示功能属性能力,该值不能是负数
     * @return {int}
     *     FEATURE_ERR_NONE(0): 设置功能属性成功
     *     FEATURE_ERR_UNSUPPORT(-1): 功能模块不支持该功能属性
     *     FEATURE_ERR_UNREGISTER(-2): 没有功能模块注册该功能属性的get方法
     *     FEATURE_ERR_INVALID_ARGUMENT(-3): 参数不合法
     */
    setFeaturePropertyInt(key, value) {
        if (typeof key !== "string" && typeof value !== "number" && value < 0) {
            return FEATURE_ERR_INVALID_ARGUMENT;
        }

        let setFunction = _setCallbacks[key];
        if (setFunction === undefined) {
            // 没有功能模块注册该功能属性的set方法
            return FEATURE_ERR_UNREGISTER;
        }

        let returnCode = setFunction(value);
        if (typeof returnCode !== "number" && typeof returnCode !== 'boolean') {
            return FEATURE_ERR_UNSUPPORT;
        }
        return returnCode === FEATURE_ERR_NONE ? returnCode : FEATURE_ERR_UNSUPPORT;
    }
};