import HTMLElement from "./HTMLElement.js";

export default class HTMLHeadElement extends HTMLElement {
    parentNode = null;

    constructor(parentNode) {
        super("head");
        this.parentNode = parentNode;
    }
}