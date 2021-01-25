export default {
    /**
     * 将 from 中的属性导到 to
     * @param name {String}
     * @param from {Object}
     * @param to {Object}
     * @param errCallback {=function}
     */
    exportTo(name, from, to, errCallback) {
        if (typeof from !== "object" || typeof to !== "object") {
            console.warn("invalid exportTo: ", name);
            return;
        }
        let fromProperty = from[name];
        if (fromProperty) {
            if (typeof fromProperty === "function") {
                to[name] = fromProperty.bind(from);
            } else {
                to[name] = fromProperty;
            }
        } else {
            to[name] = function () {
                console.error(name + " is not support!");
                return {};
            };
            if (typeof errCallback === "function") {
                errCallback();
            }
        }
    }
}