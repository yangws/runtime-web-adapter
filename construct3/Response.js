// 用于适配_InstatiateWASMModule()函数， 该模块用于导入wasm文件
import _UTIL from "./util";

class Response {
    constructor(data, option) {
        this._blob = data;
        this._arrayBuffer = this._blob.arrayBuffer();
        this._text = _UTIL.arraybufferToText(this._arrayBuffer);
    }
    blob = function () {
        return this._blob;
    }
    text = function () {
        return this._text;
    }
    arrayBuffer = function () {
        return this._arrayBuffer;
    }
}
module.exports = Response;
