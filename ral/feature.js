let _features = {};
let _getCallbacks = {};
let _setCallbacks = {};
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
     * 注册功能属性的get方法和set方法, 仅供RAL层的功能模块使用
     * @param {string} key
     * @param {function() : int} getFunction
     * @param {function(intValue) : boolean} setFunction
     * @returns {boolean}
     *     false: 注册功能属性失败
     *     true:  注册功能属性成功
     */
    registerFeatureProperty(key, getFunction, setFunction) {
        if (typeof key !== "string" || typeof getFunction !== "function" || typeof setFunction !== "function") {
            return false;
        }

        if (typeof _getCallbacks[key] === "function" || typeof _setCallbacks[key] === "function") {
            // 此特性属性已被占用
            return false;
        }

        _getCallbacks[key] = getFunction;
        _setCallbacks[key] = setFunction;

        return true;
    },

    /**
     * 获取功能属性的能力
     * @param {String} key 功能属性的名称
     * @returns {int}
     *      >= 0: 获取功能属性成功，返回值由功能模块定义含义,请参考功能模块的相关文档
     *      -1: 功能属性获取错误
     *      -2: 参数检查错误
     *      -3: 功能模块不支持功能属性获取操作
     */
    getFeaturePropertyInt(key) {
        if (typeof key !== "string") {
            // 参数不是有效的字符串类型
            return -2;
        }

        let getFunction = _getCallbacks[key];
        if (getFunction === undefined) {
            // 没有功能模块注册该功能属性的get方法
            return -3;
        }

        let value = getFunction();
        if (value !== "number") {
            // 返回值不是有效的数值类型
            return -3;
        }
        if (value < -1) {
            value = -1;
        }
        return value;
    },

    /**
     * 设置或调整功能属性的能力
     * @param {String} key 功能属性的名称
     * @param {String} value 表示功能属性能力,该值不能是负数
     * @return {boolean}
     *     false: 设置功能属性失败
     *     true:  设置功能属性成功
     */
    setFeaturePropertyInt(key, value) {
        if (typeof key !== "string" && typeof value !== "number" && value < 0) {
            return false;
        }

        let setFunction = _setCallbacks[key];
        if (setFunction === undefined) {
            // 没有功能模块注册该功能属性的set方法
            return false;
        }

        let returnCode = setFunction(value);
        if (typeof returnCode !== "number" && typeof returnCode !== 'boolean') {
            return false;
        }
        return returnCode ? true : false;
    }
};