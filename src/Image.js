import HTMLImageElement from './HTMLImageElement'

export default class Image extends HTMLImageElement {
    constructor(width, height) {
        super(width, height, true);
    }
}

let _creteImage = jsb.createImage;
if (_creteImage) {
    _creteImage().__proto__.__proto__ = Image.prototype;
}
