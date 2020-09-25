import HTMLImageElement from './HTMLImageElement'

export default class Image extends HTMLImageElement {
    constructor(width, height) {
        super(width, height, true);
    }
}
