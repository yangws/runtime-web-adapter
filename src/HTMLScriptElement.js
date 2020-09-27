import HTMLElement from './HTMLElement'
import Event from './Event'

export default class HTMLScriptElement extends HTMLElement {
    constructor(width, height) {
        super('script')

    }

    set src(url) {
        setTimeout(()=>{
            require(url);
            this.dispatchEvent(new Event('load'));
        }, 0);
    }
}
