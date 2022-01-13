let _features = {};
let _featurePropertyListeners = {};
export default {
    setFeaturePropertyString(featureName, property, value) {
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
    getFeaturePropertyString(featureName, property) {
        let feature = _features[featureName];
        return feature ? feature[property] : undefined;
    },


    /**
     * 注册功能属性的监听器
     * @param {string} key
     * @param {function} listener
     * @returns {boolean}
     *     false: 注册功能属性失败
     *     true:  注册功能属性成功
     */
    registerFeaturePropertyListener(key, listener) {
        if (typeof key !== "string" || typeof listener !== "function") {
            return false;
        }
        let listenerArr = _featurePropertyListeners[key];
        if (!Array.isArray(listenerArr)) {
            listenerArr = [];
            _featurePropertyListeners[key] = listenerArr;
        }
        for (let i = 0; i < listenerArr.length; ++i) {
            if (listenerArr[i] === listener) {
                return true;
            }
        }
        listenerArr.push(listener);
        return true;
    },

    /**
     * 获取功能属性描述
     * @param {String} key 功能属性的名称
     * @returns {int}
     *      -1: 获取功能属性失败
     *      >= 0: 由功能属性定义
     */
    getFeaturePropertyInt(key) {
        if (typeof key !== "string") {
            return -1;
        }
        let value = loadRuntime().getFeature(key);
        if (value < 0) {
            return -1;
        }
        return value;
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

        if (this.getFeaturePropertyInt(key) === value) {
            return true;
        }

        if (!loadRuntime().setFeature(key, value)) {
            return false;
        }

        let listenerArr = _featurePropertyListeners[key];
        if (listenerArr === undefined) {
            // 此功能属性上没有绑定的listener
            return true;
        }

        listenerArr.forEach(listener => {
            if (typeof listener !== "function") {
                return;
            }
            listener(key, value);
        });

        return true;
    }
};