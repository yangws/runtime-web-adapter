import Event from "./Event"
import FILE_CACHE from "./util/FileCache"
import XMLHttpRequestEventTarget from "./XMLHttpRequestEventTarget"

const fsm = ral.getFileSystemManager();
const _XMLHttpRequest = window.XMLHttpRequest;
window.ral = window.ral || {};

export default class XMLHttpRequest extends XMLHttpRequestEventTarget {
    _isLocal = false;
    _readyState = 0;
    _response;
    _responseText;
    _responseURL;
    _responseXML;
    _status;
    _statusText;
    _responseType;

    constructor() {
        super(new _XMLHttpRequest());

        let xhr = this._xhr;

        xhr.onreadystatechange = function (e) {
            let event = new Event("readystatechange");
            this.dispatchEvent(Object.assign(event, e));
        }.bind(this);
    }

    get readyState() {
        if (this._isLocal) {
            return this._readyState;
        } else {
            return this._xhr.readyState;
        }
    }

    get response() {
        let response = this._isLocal ? this._response : this._xhr.response;
        let result = this._responseType === "blob" ? new Blob([response]) : response;
        return result;
    }

    get responseText() {
        if (this._isLocal) {
            return this._responseText;
        } else {
            return this._xhr.responseText;
        }
    }

    get responseType() {
        return this._responseType;
    }

    set responseType(value) {
        this._responseType = this._xhr.responseType = value;
        if (value === "blob") {
            this._xhr.responseType = "arraybuffer";
        }

    }

    get responseURL() {
        if (this._isLocal) {
            return this._responseURL;
        } else {
            return this._xhr.responseURL;
        }
    }

    get responseXML() {
        if (this._isLocal) {
            return this._responseXML;
        } else {
            return this._xhr.responseXML;
        }
    }

    get status() {
        if (this._isLocal) {
            return this._status;
        } else {
            return this._xhr.status;
        }
    }

    get statusText() {
        if (this._isLocal) {
            return this._statusText;
        } else {
            return this._xhr.statusText;
        }
    }

    get timeout() {
        return this._xhr.timeout;
    }

    set timeout(value) {
        this._xhr.timeout = value;
    }

    get upload() {
        return this._xhr.upload;
    }

    set withCredentials(value) {
        this._xhr.withCredentials = value;
    }

    get withCredentials() {
        return this._xhr.withCredentials;
    }

    abort() {
        this._xhr.abort();
    }

    getAllResponseHeaders() {
        return this._xhr.getAllResponseHeaders();
    }

    getResponseHeader(name) {
        return this._xhr.getResponseHeader(name);
    }

    open(method, url, async, user, password) {
        if (typeof url === "string") {
            let _url = url.toLocaleString();
            if (_url.startsWith("http://") || _url.startsWith("https://")) {
                this._isLocal = false;
                return this._xhr.open(...arguments);
            }
        }
        this._isLocal = true;
        // from local
        this._url = url;
        if (this._readyState != 1) {
            this._readyState = 1;
            this.dispatchEvent(new Event("readystatechange"));
        }
    }

    overrideMimeType() {
        return this._xhr.overrideMimeType(...arguments);
    }

    send() {
        if (this.readyState !== 1) {
            throw "Uncaught DOMException: Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.";
        }
        if (this._isLocal) {
            let self = this;
            let isBinary = this._xhr.responseType === "arraybuffer";
            this._readyState = 2;
            this.dispatchEvent(new Event("readystatechange"));
            fsm.readFile({
                filePath: this._url,
                encoding: isBinary ? "binary" : "utf8",
                success(res) {
                    self._status = 200;
                    self._response = self._responseText = res.data;
                    if (isBinary) {
                        FILE_CACHE.setCache(self._url, res.data);
                    }
                    let eventProgressStart = new Event("progress");
                    eventProgressStart.loaded = 0;
                    eventProgressStart.total = isBinary ? res.data.byteLength : res.data.length;

                    let eventProgressEnd = new Event("progress");
                    eventProgressEnd.loaded = eventProgressStart.total;
                    eventProgressEnd.total = eventProgressStart.total;

                    self.dispatchEvent(new Event("loadstart"));
                    self.dispatchEvent(eventProgressStart);
                    self.dispatchEvent(eventProgressEnd);
                    self.dispatchEvent(new Event("load"));
                },
                fail: function (res) {
                    if (res.errCode === 1) {
                        self._status = 404;
                        self.dispatchEvent(new Event("loadstart"));
                        self.dispatchEvent(new Event("load"));
                    } else {
                        this.dispatchEvent(new Event("error"));
                    }
                }.bind(this),
                complete: function () {
                    this._readyState = 4;
                    this.dispatchEvent(new Event("readystatechange"));
                    this.dispatchEvent(new Event("loadend"));
                }.bind(this)
            });
        } else {
            this._xhr.send(...arguments);
        }
    }

    setRequestHeader() {
        this._xhr.setRequestHeader(...arguments);
    }
}