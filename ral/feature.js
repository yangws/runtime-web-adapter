let _features = {};
let _getCallbacks = {};
let _setCallbacks = {};

const _FEATURE_UNSUPPORT = -1;

export default {
    FEATURE_UNSUPPORT: _FEATURE_UNSUPPORT,
    CANVAS_CONTEXT2D: {
        name: "canvas.context2d",
        enable: 1,
        disable: 0
    },
    CANVAS_CONTEXT2D_PREMULTIPLY: {
        name: "canvas.context2d.premultiply_image_data",
        enable: 1,
        disable: 0
    },
    CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC: {
        name: "canvas.context2d.textbaseline.alphabetic",
        enable: 1,
        disable: 0
    },
    CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT: {
        name: "canvas.context2d.textbaseline.default",
        alphabetic: 1,
        bottom: 0
    },
    CANVAS_WEBGL: {
        name: "canvas.webgl",
        enable: 1,
        disable: 0
    },
    CANVAS_WEBGL_VAO: {
        name: "canvas.webgl.extensions.oes_vertex_array_object.revision",
        revsion: 10
    },
    DEBUG_VCONSOLE: {
        name: "debug.vconsole",
        enable: 1,
        disable: 0
    },
    DEBUG_JS_DEBUGGER: {
        name: "debug.js_debugger",
        enable: 1,
        disable: 0
    },
    FONT_FAMILY_FROM_FONT: {
        name: "canvas.family_from_font",
        enable: 1,
        disable: 0
    },
    IMAGE_LOAD_FROM_URL: {
        name: "image.load_from_url",
        enable: 1,
        disable: 0
    },
    IMAGE_WEBP: {
        name: "image.webp",
        enable: 1,
        disable: 0
    },
    IMAGE_TIFF: {
        name: "image.tiff",
        enable: 1,
        disable: 0
    },
    NETWORK_DOWNLOAD: {
        name: "network.download",
        enable: 1,
        disable: 0
    },
    NETWORK_UPLOAD: {
        name: "network.upload",
        enable: 1,
        disable: 0
    },
    NETWORK_XML_HTTP_REQUEST: {
        name: "network.xml_http_request",
        enable: 1,
        disable: 0
    },
    VM_WEB_ASSEMBLY: {
        name: "vm.web_assembly",
        enable: 1,
        disable: 0
    },

    /* Note: the API is only used in RAL. */
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
     * Note: the API is only used in RAL.
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
            return false;
        }
        if (typeof getFunction === "function" && typeof _getCallbacks[key] === "function") {
            return false;  // Get method of the feature has already been registerred.
        }
        if (typeof setFunction === "function" && typeof _setCallbacks[key] === "function") {
            return false;  // Set method for the feature has already been registerred.
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
            return _FEATURE_UNSUPPORT;
        }

        let getFunction = _getCallbacks[key];
        if (getFunction === undefined) {
            // not register any get method for the feature specified by key
            return _FEATURE_UNSUPPORT;
        }

        let value = getFunction();
        if (typeof value !== "number") {
            return _FEATURE_UNSUPPORT;
        }
        if (value < _FEATURE_UNSUPPORT) {
            value = _FEATURE_UNSUPPORT;
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