function utf8ArrToStr(utf8Array) {
    var str = "";
    var currenStrCode = 0;
    var firstBytesCode = 0;
    var arrLen = utf8Array.length;
    for (var index = 0; index < arrLen; index++) {
        firstBytesCode = utf8Array[index];
        // Check How much of bytes is current UTF-8 string made of
        if (firstBytesCode > 251 && firstBytesCode < 254 && firstBytesCode + 5 < arrLen) {
            // six bytes, first 1111110
            // (firstBytesCode - 252 << 30) may be not so safe in ECMAScript! So...:
            // add six bytes code value together
            currenStrCode = (firstBytesCode - 252) * 1073741824
                + (utf8Array[++index] - 128 << 24)
                + (utf8Array[++index] - 128 << 18)
                + (utf8Array[++index] - 128 << 12)
                + (utf8Array[++index] - 128 << 6)
                + utf8Array[++index] - 128;
        } else if (firstBytesCode > 247 && firstBytesCode < 252 && firstBytesCode + 4 < arrLen) {
            // five bytes, first bytes 111110x
            currenStrCode = (firstBytesCode - 248 << 24)
                + (utf8Array[++index] - 128 << 18)
                + (utf8Array[++index] - 128 << 12)
                + (utf8Array[++index] - 128 << 6)
                + utf8Array[++index] - 128;
        } else if (firstBytesCode > 239 && firstBytesCode < 248 && firstBytesCode + 3 < arrLen) {
            // four bytes, first bytes 11110xx
            currenStrCode = (firstBytesCode - 240 << 18)
                + (utf8Array[++index] - 128 << 12)
                + (utf8Array[++index] - 128 << 6)
                + utf8Array[++index] - 128;
        } else if (firstBytesCode > 223 && firstBytesCode < 240 && firstBytesCode + 2 < arrLen) {
            // three bytes, first bytes 1110xxx
            currenStrCode = (firstBytesCode - 224 << 12)
                + (utf8Array[++index] - 128 << 6)
                + utf8Array[++index] - 128;
        } else if (firstBytesCode > 191 && firstBytesCode < 224 && firstBytesCode + 1 < arrLen) {
            // two bytes, first bytes 110xxxx
            currenStrCode = (firstBytesCode - 192 << 6)
                + utf8Array[++index] - 128;
        } else {
            // one bytes, first bytes 0xxxxxxx
            currenStrCode = firstBytesCode;
        }
        // enCode as UTF-16
        str += String.fromCharCode(currenStrCode);
    }
    return str;
}

function arraybufferToText(arrayBufferObject) {
    // transfer data in arrayBufferObject into Uint8 Array as bytes data
    const uint8Array = new Uint8Array(arrayBufferObject);
    // encode bytes data to unicode string
    return utf8ArrToStr(uint8Array);
}

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
                let _text = arraybufferToText(_arrayBuffer);
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