import EventTarget from './EventTarget'
import Event from "./Event";
import FILE_CACHE from "./util/FileCache"

const _BASE64_NAME = "data:application/javascript;base64,";
const _URI_NAME = "data:application/javascript,";
let _getPathFromBase64String = function (src) {
    if (src === null || src === undefined) {
        return src;
    }
    if (src.startsWith(_BASE64_NAME)) {
        let content = src.substring(_BASE64_NAME.length);
        let source = window.atob(content);
        let len = source.length;
        if (len > 0) {
            return _getDiskPathFromArrayBuffer(source, len);
        } else {
            return src;
        }
    } else if (src.startsWith(_URI_NAME)) {
        let content = src.substring(_URI_NAME.length);
        let source = decodeURIComponent(content);
        let len = source.length;
        if (len > 0) {
            return _getDiskPathFromArrayBuffer(source, len);
        } else {
            return src;
        }
    } else {
        return src;
    }
};

function _getDiskPathFromArrayBuffer(source, len) {
    var arrayBuffer = new ArrayBuffer(len);
    var uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < len; i++) {
        uint8Array[i] = source.charCodeAt(i);
    }
    return FILE_CACHE.getCache(arrayBuffer);
}

export default class Node extends EventTarget {
    childNodes = [];
    parentNode = null;
    _nodeName = "";

    constructor(nodeName) {
        super();
        this._nodeName = nodeName;
    }

    appendChild(node) {
        this.childNodes.push(node);
        node.parentNode = this;
        if (node.nodeName === "SCRIPT") {
            let src = _getPathFromBase64String(node.src);
            console.log(src);
            require(src);
            node.dispatchEvent(new Event('load'));
        }
        return node;
    }

    cloneNode() {
        const copyNode = Object.create(this);
        Object.assign(copyNode, this);
        copyNode.parentNode = null;
        return copyNode
    }

    removeChild(node) {
        const index = this.childNodes.findIndex((child) => child === node);

        if (index > -1) {
            let node = this.childNodes.splice(index, 1)[0];
            node.parentNode = null;
            return node;
        }
        return null
    }

    dispatchEvent() {
        let result = true;
        let length = this.childNodes.length;
        for (let index = length - 1; result && index >= 0; --index) {
            result = this.childNodes[index].dispatchEvent(...arguments);
        }
        if (result) {
            return super.dispatchEvent(...arguments);
        }
        return false;
    }

    get nodeName() {
        return this._nodeName;
    }
}
