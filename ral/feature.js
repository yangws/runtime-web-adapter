let _features = {};
export default {
    setFeature(featureName, spec, value) {
        let feature = _features[featureName];
        if (!feature) {
            feature = _features[featureName] = {};
        }
        feature[spec] = value;
    },
    getFeatureProperty(featureName, spec) {
        let feature = _features[featureName];
        return feature ? feature[spec] : undefined;
    }
};