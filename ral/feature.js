let _features = {};
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
    }
};