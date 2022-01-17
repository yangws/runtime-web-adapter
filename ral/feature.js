let _features = {};
let _getCallbacks = {};
let _setCallbacks = {};

const _FEATURE_KEY = {
    CANVAS_CONTEXT2D: "canvas.context2d",
    CANVAS_CONTEXT2D_PREMULTIPLY: "canvas.context2d.premultiply_image_data",
    CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC: "canvas.context2d.textbaseline.alphabetic",
    CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT: "canvas.context2d.textbaseline.default",
    CANVAS_WEBGL: "canvas.webgl",
    CANVAS_WEBGL_VAO: "canvas.webgl.extensions.oes_vertex_array_object.revision",
    DEBUG_VCONSOLE: "debug.vconsole",
    DEBUG_JS_DEBUGGER: "debug.js_debugger",
    FONT_FAMILY_FROM_FONT: "canvas.family_from_font",
    IMAGE_LOAD_FROM_URL: "image.load_from_url",
    IMAGE_WEBP: "image.webp",
    IMAGE_TIFF: "image.tiff",
    NETWORK_DOWNLOAD: "network.download",
    NETWORK_UPLOAD: "network.upload",
    NETWORK_XML_HTTP_REQUEST: "network.xml_http_request",
    VM_WEB_ASSEMBLY: "vm.web_assembly",
};

const _FEATURE_VALUE = {
    FEATURE_UNSUPPORT: -1,
    FEATURE_DISABLE: 0,
    CANVAS_CONTEXT2D: 1,
    CANVAS_CONTEXT2D_PREMULTIPLY: 2,
    CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC: 3,
    CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT_BOTTOM: 4,
    CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT_ALPHABETIC: 5,
    CANVAS_WEBGL: 6,
    CANVAS_WEBGL_VAO: 7,
    DEBUG_JS_DEBUGGER: 8,
    DEBUG_VCONSOLE: 9,
    FONT_FAMILY_FROM_FONT: 10,
    IMAGE_LOAD_FROM_URL: 11,
    IMAGE_WEBP: 12,
    IMAGE_TIFF: 13,
    NETWORK_DOWNLOAD: 14,
    NETWORK_UPLOAD: 15,
    NETWORK_XML_HTTP_REQUEST: 16,
    VM_WEB_ASSEMBLY: 17,
};

export default {
    FEATURE_KEY : _FEATURE_KEY,
    FEATURE_VALUE : _FEATURE_VALUE,
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
     * Register the get or set method registered to the feature specified by key.
     * @param {string} key
     * @param {function() : int} getFunction to get the feature ability
     * @param {function(intValue) : boolean} setFunction to set the feature ability
     * @returns {boolean}
     *     false: failed to register the get or set method of the feature
     *     true:  success to register the get or set method of the feature
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
     * Clean the get or set method registered to the feature specified by key.
     * Note: the API is only used in RAL.
     * @param {string} key to match the feature name
     * @param {boolean} getBool to clean get method if it is set to true, or nothing to do.
     * @param {boolean} setBool to clean set method if it is set to true, or nothing to do.
     * @returns {boolean}
     *     false: failed to clean the get or set method of the feature
     *     true:  success to clean the get or set method of the feature
     */
    unregisterFeatureProperty(key, getBool, setBool) {
        if (typeof key !== "string") {
            return false;
        }
        if (typeof getBool !== "boolean" || typeof setBool !== "boolean") {
            return false;
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
     * Get the feature ability
     * @param {String} key to match the feature name
     * @returns {int}
     *      Please refer to the description defined in _FEATURE_VALUE map
     *      or more details in the related doc.
     *      FEATURE_UNSUPPORT will be returned if get the feature ability failure.
     */
    getFeaturePropertyInt(key) {
        if (typeof key !== "string") {
            return _FEATURE_VALUE.FEATURE_UNSUPPORT;
        }

        let getFunction = _getCallbacks[key];
        if (getFunction === undefined) {
            // not register any get method for the feature specified by key
            return _FEATURE_VALUE.FEATURE_UNSUPPORT;
        }

        let value = getFunction();
        if (typeof value !== "number") {
            return _FEATURE_VALUE.FEATURE_UNSUPPORT;
        }
        if (value < _FEATURE_VALUE.FEATURE_UNSUPPORT) {
            value = _FEATURE_VALUE.FEATURE_UNSUPPORT;
        }
        return value;
    },

    /**
     * Set the feature ability
     * @param {String} key to match the feature name
     * @param {String} value to select the feature ability
     * @return {boolean}
     *     true : success to set the feature ability
     *     false: failed to set the feature ability
     */
    setFeaturePropertyInt(key, value) {
        if (typeof key !== "string" && typeof value !== "number" && value < 0) {
            return false;
        }

        let setFunction = _setCallbacks[key];
        if (setFunction === undefined) {
            // not register any set method for the feature specified by key
            return false;
        }

        let returnCode = setFunction(value);
        if (typeof returnCode !== "number" && typeof returnCode !== 'boolean') {
            return false;
        }
        return returnCode ? true : false;
    }
};