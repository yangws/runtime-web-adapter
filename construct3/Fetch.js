import _UTIL from "./util";

function fetch(url, init) {
    let _url = null;
    // 若传入的url是URL类型的Object，将其中的href提取出来
    if (typeof url === "string") {
        _url = url;
    } else if (typeof url === "object") {
        _url = "scripts/" + url.href;
    }

    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', _url);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            if (request.status === 200) {
                let _arrayBuffer = request.response;
                let _blob = new Blob([request.response], { type: '' });
                let _text = _UTIL.arraybufferToText(_arrayBuffer);
                let response = {
                    _arrayBuffer,
                    _blob,
                    _text,
                    ok: true,
                    text: function () {
                        return this._text;
                    },
                    blob: function () {
                        return this._blob;
                    },
                    arrayBuffer: function () {
                        return this._arrayBuffer;
                    }
                }
                resolve(response);
            } else {
                reject(Error('Request didn\'t return successfully; error code:' + request.statusText));
            }
        };
        request.onerror = function () {
            reject(Error('There was a network error.'));
        };
        request.send();
    })

}

module.exports = fetch;