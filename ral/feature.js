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
     * 注册功能属性的操作实现, 仅RAL层的功能模块使用
     * @param {string} key
     * @param {function(stringKey) : int} getFunction 约定该函数的返回值：大于等于0为获取成功，-1为通用错误码，小于-1为具体错误码
     * @param {function(stringKey, intValue) : boolean} setFunction 约定该函数的返回值：true为设置成功，false为设置失败
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
     * 获取功能属性
     * @param {String} key 功能属性的名称
     * @returns {int}
     *      -1: 获取失败
     *      >= 0: 由RAL层的功能模块定义返回值的含义,请参考相关文档
     */
    getFeaturePropertyInt(key) {
        if (typeof key !== "string") {
            return -1;
        }

        let getFunction = _getCallbacks[key];
        if (getFunction === undefined) {
            // 此功能属性上没有任何RAL功能模块进行绑定get操作
            return -1;
        }

        let value = getFunction(key);
        return typeof value !== "number" ? -1 : value;
    },

    /**
     * 设置功能属性的值，并派发功能属性变更事件到有注册监听的功能模块
     * @param {String} key 功能属性的名称
     * @param {String} value 即将设置的功能属性的值,该值不能是负数
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
            // 此功能属性上没有任何RAL功能模块进行绑定set操作
            return false;
        }

        let returnCode = setFunction(key, value);
        if (typeof returnCode !== "number" && typeof returnCode !== 'boolean') {
            return false;
        }
        return returnCode ? true : false;
    }
};