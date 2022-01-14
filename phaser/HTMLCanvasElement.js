const CANVAS_DEFAULT_WIDTH = 300;
const CANVAS_DEFAULT_HEIGHT = 150;

window.ral = window.ral || {};
let _createCanvas = ral.createCanvas;
let __canvas = window.__canvas;

class HTMLCanvasElement extends HTMLElement {
    constructor(width, height) {
        super('CANVAS');

        this.id = 'glcanvas';
        this.type = 'canvas';

        this.top = 0;
        this.left = 0;

        if (typeof ral.getFeatureProperty("ral.createCanvas", "spec") === "undefined") {
            // since runtime 2.0.0
            let canvas = _createCanvas();
            canvas.__proto__.__proto__ = HTMLCanvasElement.prototype;
            Object.keys(this).forEach(function (key) {
                canvas[key] = this[key];
            }.bind(this));

            let _getContext = canvas.getContext;
            canvas.getContext = function (type, attributes) {
                if (type === 'webgl' ||
                    type === 'webgl2' ||
                    type === 'experimental-webgl' ||
                    type === 'experimental-webgl2') {
                    if (typeof __canvas === "undefined") {
                        __canvas = this;
                        return _getContext.call(this, type, attributes);
                    } else if (__canvas === this) {
                        return _getContext.call(this, type, attributes);
                    }
                    return __canvas.getContext(type, attributes);
                } else {
                    return _getContext.call(this, type, attributes);
                }
            }

            canvas.width = width >= 0 ? Math.ceil(width) : CANVAS_DEFAULT_WIDTH;
            canvas.height = height >= 0 ? Math.ceil(height) : CANVAS_DEFAULT_HEIGHT;

            canvas._targetID = this._targetID;
            canvas._listenerCount = this._listenerCount;
            canvas._listeners = this._listeners;

            return canvas;
        } else {
            this._width = width ? Math.ceil(width) : CANVAS_DEFAULT_WIDTH;
            this._height = height ? Math.ceil(height) : CANVAS_DEFAULT_HEIGHT;
            this._context2D = null;
            // this._alignment = 4; // Canvas is used for rendering text only and we make sure the data format is RGBA.
            this._alignment = this._width % 2 === 0 ? 8 : 4;
        }
    }

    //REFINE: implement opts.
    getContext(name, opts) {
        let self = this;
        // console.log(`==> Canvas getContext(${name})`);
        if (name === 'webgl' || name === 'experimental-webgl') {
            return window.__gl;
        } else if (name === '2d') {
            if (!this._context2D) {
                this._context2D = new CanvasRenderingContext2D(this.width, this.height);
                this._context2D._innerCanvas = this;
            }
            return this._context2D;
        }

        return null;
    }

    get clientWidth() {
        return this.width;
    }

    get clientHeight() {
        return this.height;
    }

    set width(width) {
        width = parseInt(width);
        if (isNaN(width)) {
            width = CANVAS_DEFAULT_WIDTH;
        } else if (width < 0) {
            width = CANVAS_DEFAULT_WIDTH;
        }
        this._width = width;
        // If the width of canvas could be divided by 2, it means that the bytes per row could be divided by 8.
        this._alignment = this._width % 2 === 0 ? 8 : 4;
        if (this._context2D) {
            this._context2D._width = width;
        }
    }

    get width() {
        return this._width;
    }

    set height(height) {
        height = parseInt(height);
        if (isNaN(height)) {
            height = CANVAS_DEFAULT_HEIGHT;
        } else if (height < 0) {
            height = CANVAS_DEFAULT_HEIGHT;
        }
        this._height = height;
        if (this._context2D) {
            this._context2D._height = height;
        }
    }

    get height() {
        return this._height;
    }
}

module.exports = HTMLCanvasElement;