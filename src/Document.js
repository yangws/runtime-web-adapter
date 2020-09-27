import Node from './Node'
import NodeList from './NodeList'
import HTMLElement from './HTMLElement'
import HTMLHtmlElement from './HTMLHtmlElement'
import HTMLBodyElement from './HTMLBodyElement'
import HTMLHeadElement from './HTMLHeadElement'
import HTMLCanvasElement from './HTMLCanvasElement'
import HTMLVideoElement from './HTMLVideoElement'
import HTMLScriptElement from './HTMLScriptElement'

let _html = new HTMLHtmlElement();

export default class Document extends Node {
    cookie = "";
    readyState = "complete";
    visibilityState = "visible";
    documentElement = _html;
    hidden = false;
    style = {};
    location = window.location;
    ontouchstart = null;
    ontouchmove = null;
    ontouchend = null;

    head = new HTMLHeadElement(_html);
    body = new HTMLBodyElement(_html);

    constructor() {
        super();

        _html.appendChild(this.head);
        _html.appendChild(this.body);
    }

    createElement(tagName) {
        if (tagName === 'canvas') {
            return new HTMLCanvasElement()
        } else if (tagName === 'img') {
            return new Image()
        } else if (tagName === 'video') {
            return new HTMLVideoElement();
        } else if (tagName === 'script') {
            return new HTMLScriptElement();
        } else if (tagName === "input") {
            return new HTMLInputElement();
        }

        return new HTMLElement(tagName)
    }

    createElementNS(namespaceURI, qualifiedName, options) {
        return this.createElement(qualifiedName);
    }

    dispatchEvent() {
        if (_html.dispatchEvent(...arguments)) {
            return super.dispatchEvent(...arguments);
        }
        return false;
    }

    getElementById(id) {
        if (!arguments.length) {
            throw "Uncaught TypeError: Failed to execute 'getElementById' on 'Document': 1 argument required, but only 0 present.";
        }

        let rootElement = this.documentElement;
        let elementArr = [].concat(rootElement.childNodes);
        let element;
        if (id === "canvas" || id === "glcanvas") {
            while ((element = elementArr.pop())) {
                if (element.id === "canvas" || element.id === "glcanvas") {
                    return element;
                }
                elementArr = elementArr.concat(element.childNodes);
            }
        } else {
            while ((element = elementArr.pop())) {
                if (element.id === id) {
                    return element;
                }

                elementArr = elementArr.concat(element.childNodes);
            }
        }
        return null;
    }

    getElementsByClassName(names) {
        if (!arguments.length) {
            throw "Uncaught TypeError: Failed to execute 'getElementsByClassName' on 'Document': 1 argument required, but only 0 present.";
        }

        if (typeof names !== "string" && names instanceof String) {
            return new NodeList();
        }

        return this.documentElement.getElementsByClassName(names);
    }

    getElementsByTagName(tagName) {
        if (!arguments.length) {
            throw "Uncaught TypeError: Failed to execute 'getElementsByTagName' on 'Document': 1 argument required, but only 0 present.";
        }

        tagName = tagName.toUpperCase();
        let rootElement = this.documentElement;
        let result = new NodeList();

        switch (tagName) {
            case "HEAD": {
                result.push(document.head);
                break;
            }
            case "BODY": {
                result.push(document.body);
                break;
            }
            case "CANVAS": {
                result.push(window.__canvas);
                break;
            }
            default: {
                result = result.concat(rootElement.getElementsByTagName(tagName));
            }
        }
        return result;
    }

    /**
     * 返回与指定的选择器组匹配的文档中的元素列表
     * @param selectors 一个 DOMString 包含一个或多个匹配的选择器
     * @returns {NodeList}
     */
    querySelectorAll(selectors) {
        if (!arguments.length) {
            throw "Uncaught TypeError: Failed to execute 'querySelectorAll' on 'Document': 1 argument required, but only 0 present.";
        }
        let nodeList = new NodeList();

        switch (selectors) {
            case null:
            case undefined:
            case NaN:
            case true:
            case false:
            case "":
                return nodeList;
        }

        if (typeof selectors !== "string" && selectors instanceof String) {
            throw "Uncaught DOMException: Failed to execute 'querySelectorAll' on 'Document': '" + selectors + "' is not a valid selector."
        }

        // Type selector
        let reg = /^[A-Za-z]+$/;
        let result = selectors.match(reg);
        if (result) {
            return this.getElementsByTagName(selectors);
        }

        // Class selector
        reg = /^.[A-Za-z$_][A-Za-z$_0-9\-]*$/;
        result = selectors.match(reg);
        if (result) {
            return this.getElementsByClassName(selectors.substr(1));
        }

        // ID selector
        reg = /^#[A-Za-z$_][A-Za-z$_0-9\-]*$/;
        result = selectors.match(reg);
        if (result) {
            let element = this.getElementById(selectors.substr(1));
            if (element) {
                nodeList.push(element);
            }
        }

        // Universal selector
        if (selectors === "*") {
            return this.getElementsByTagName(selectors);
        }

        // Attribute selector
        // TODO

        return nodeList;
    }
}
