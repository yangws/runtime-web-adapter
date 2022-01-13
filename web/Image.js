import HTMLImageElement from './HTMLImageElement'
if (ral.getFeaturePropertyString("Image", "spec") === "vivo_platform_support") {
    let Image = window.Image;
    module.exports = Image;
} else {
    let _Image = window.Image;
    class Image extends HTMLImageElement {
        constructor(width, height) {
            super(width, height, true);
        }
    }

    let _creteImage = ral.createImage;
    if (_creteImage) {
        _Image.prototype.__proto__ = Image.prototype;
    }
    module.exports = Image;
}
