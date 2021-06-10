function arraybufferToText(arrayBufferObject) {
    const uint8Array = new Uint8Array(arrayBufferObject);
    const data = uint8Array.reduce((acc, i) => acc += String.fromCharCode.apply(null, [i]), '');
    return data;
}
// 用于适配_InstatiateWASMModule()函数， 该模块用于导入wasm文件
class Response {
    constructor(data, option) {
        this._blob = data;
        this._arrayBuffer = this._blob.arrayBuffer();
        this._text = arraybufferToText(this._arrayBuffer);
        this.blob = function () {
            return this._blob;
        }
        this.text = function () {
            return this._text;
        }
        this.arrayBuffer = function () {
            return this._arrayBuffer;
        }
    }
}
module.exports = Response;
