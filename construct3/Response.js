// 用于适配_InstatiateWASMModule()函数， 该模块用于导入wasm文件
class Response {
    constructor(data, option) {
        this._blob = data;
        this._arrayBuffer = this._blob.arrayBuffer();
        this._text = arraybufferToText(this._arrayBuffer);
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
