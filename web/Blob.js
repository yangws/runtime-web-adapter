/* Blob.js
 * A Blob implementation.
 * 2017-11-15
 *
 * By Eli Grey, http://eligrey.com
 * By Devin Samarin, https://github.com/dsamarin
 * License: MIT
 *   See https://github.com/eligrey/Blob.js/blob/master/LICENSE.md
 */

/*global self, unescape */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */

(function (global) {
    (function (factory) {
        if (typeof define === "function" && define.amd) {
            // AMD. Register as an anonymous module.
            define(["exports"], factory);
        } else if (typeof exports === "object" && typeof exports.nodeName !== "string") {
            // CommonJS
            factory(exports);
        } else {
            // Browser globals
            factory(global);
        }
    })(function (exports) {
        "use strict";

        exports.URL = global.URL || global.webkitURL;

        if (global.Blob && global.URL) {
            try {
                new Blob;
                return;
            } catch (e) {
            }
        }

        // Internally we use a BlobBuilder implementation to base Blob off of
        // in order to support older browsers that only have BlobBuilder
        var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MozBlobBuilder || (function () {
            var
                get_class = function (object) {
                    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
                }
                , FakeBlobBuilder = function BlobBuilder() {
                    this.data = [];
                    this._arrayBuffer = new ArrayBuffer();
                }
                , FakeBlob = function Blob(data, type, encoding) {
                    this.data = data;
                    this.size = data.length;
                    this.type = type;
                    this.encoding = encoding;
                    this._arrayBuffer = new ArrayBuffer();
                }
                , FBB_proto = FakeBlobBuilder.prototype
                , FB_proto = FakeBlob.prototype
                , FileReaderSync = global.FileReaderSync
                , FileException = function (type) {
                    this.code = this[this.name = type];
                }
                , file_ex_codes = (
                    "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "
                    + "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
                ).split(" ")
                , file_ex_code = file_ex_codes.length
                , real_URL = global.URL || global.webkitURL || exports
                , real_create_object_URL = real_URL.createObjectURL
                , real_revoke_object_URL = real_URL.revokeObjectURL
                , URL = real_URL
                , btoa = global.btoa
                , atob = global.atob

                , ArrayBuffer = global.ArrayBuffer
                , Uint8Array = global.Uint8Array

                , origin = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/
            ;
            FakeBlob.fake = FB_proto.fake = true;
            while (file_ex_code--) {
                FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
            }
            // Polyfill URL
            if (!real_URL.createObjectURL) {
                URL = exports.URL = function (uri) {
                    var
                        uri_info = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
                        , uri_origin
                    ;
                    uri_info.href = uri;
                    if (!("origin" in uri_info)) {
                        if (uri_info.protocol.toLowerCase() === "data:") {
                            uri_info.origin = null;
                        } else {
                            uri_origin = uri.match(origin);
                            uri_info.origin = uri_origin && uri_origin[1];
                        }
                    }
                    return uri_info;
                };
            }
            URL.createObjectURL = function (blob) {
                var
                    type = blob.type
                    , data_URI_header
                ;
                if (type === null) {
                    type = "application/octet-stream";
                }
                if (blob instanceof FakeBlob) {
                    data_URI_header = "data:" + type;
                    if (blob.encoding === "base64") {
                        return data_URI_header + ";base64," + blob.data;
                    } else if (blob.encoding === "URI") {
                        return data_URI_header + "," + decodeURIComponent(blob.data);
                    }
                    if (btoa) {
                        return data_URI_header + ";base64," + btoa(blob.data);
                    } else {
                        return data_URI_header + "," + encodeURIComponent(blob.data);
                    }
                } else if (real_create_object_URL) {
                    return real_create_object_URL.call(real_URL, blob);
                }
            };
            URL.revokeObjectURL = function (object_URL) {
                if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
                    real_revoke_object_URL.call(real_URL, object_URL);
                }
            };
            FBB_proto.append = function (data/*, endings*/) {
                var bb = this.data;
                // decode data to a binary string
                if (data instanceof ArrayBuffer) {
                    var
                        str = ""
                        , buf = new Uint8Array(data)
                        , i = 0
                        , buf_len = buf.length
                    ;
                    for (; i < buf_len; i++) {
                        str += String.fromCharCode(buf[i]);
                    }
                    bb.push(str);
                    this._arrayBuffer = data.slice(0);
                } else if (get_class(data) === "Blob" || get_class(data) === "File") {
                    if (FileReaderSync) {
                        var fr = new FileReaderSync;
                        bb.push(fr.readAsBinaryString(data));
                        this._arrayBuffer = data.arrayBuffer();
                    } else {
                        // async FileReader won't work as BlobBuilder is sync
                        throw new FileException("NOT_READABLE_ERR");
                    }
                } else if (data instanceof FakeBlob) {
                    if (data.encoding === "base64" && atob) {
                        bb.push(atob(data.data));
                    } else if (data.encoding === "URI") {
                        bb.push(decodeURIComponent(data.data));
                    } else if (data.encoding === "raw") {
                        bb.push(data.data);
                    }
                    this._arrayBuffer = data._arrayBuffer.slice(0);
                } else {
                    if (typeof data !== "string") {
                        data += ""; // convert unsupported types to strings
                    }
                    // decode UTF-16 to binary string
                    bb.push(unescape(encodeURIComponent(data)));
                    let string = data;
                    let length = string.length;
                    let array = new Array(4 * length);
                    let actualLength = 0;
                    for (let index = 0; index < length; index++) {
                        let code = string.charCodeAt(index);
                        // transfer UTF-16 to UTF-8
                        if (code < 0x80) {
                            // utf-8 One bytes, first byte 0100 0000
                            array[actualLength++] = code;
                        } else if (code < 0x800) {
                            // utf-8 two bytes, first byte 110x xxxx
                            array[actualLength++] = 192 + (code >>> 6);
                            array[actualLength++] = 128 + (code & 63);
                        } else if (code < 0x10000) {
                            // utf-8 three bytes, first byte 1110 xxxx
                            array[actualLength++] = 224 + (code >>> 12);
                            array[actualLength++] = 128 + (code >>> 6 & 63);
                            array[actualLength++] = 128 + (code & 63);
                        } else if (code < 0x200000) {
                            // utf-8 four bytes, first byte 1111 0xxx
                            array[actualLength++] = 240 + (code >>> 18);
                            array[actualLength++] = 128 + (code >>> 12 & 63);
                            array[actualLength++] = 128 + (code >>> 6 & 63);
                            array[actualLength++] = 128 + (code & 63);
                        } else if (code < 0x4000000) {
                            // utf-8 five bytes, first byte 1111 10xx
                            array[actualLength++] = 248 + (code >>> 24);
                            array[actualLength++] = 128 + (code >>> 18 & 63);
                            array[actualLength++] = 128 + (code >>> 12 & 63);
                            array[actualLength++] = 128 + (code >>> 6 & 63);
                            array[actualLength++] = 128 + (code & 63);
                        } else if (code < 0x4000000) {
                            // utf-8 six bytes, first byte 1111 110x
                            array[actualLength++] = 252 + (code >>> 30);
                            array[actualLength++] = 128 + (code >>> 24 & 63);
                            array[actualLength++] = 128 + (code >>> 18 & 63);
                            array[actualLength++] = 128 + (code >>> 12 & 63);
                            array[actualLength++] = 128 + (code >>> 6 & 63);
                            array[actualLength++] = 128 + (code & 63);
                        }
                    }
                    array.length = actualLength;
                    this._arrayBuffer = new Uint8Array(array).buffer;
                }
            };
            FBB_proto.getBlob = function (type) {
                if (!arguments.length) {
                    type = null;
                }
                let blob = new FakeBlob(this.data.join(""), type, "raw");
                blob._arrayBuffer = this._arrayBuffer;
                return blob;
            };
            FBB_proto.toString = function () {
                return "[object BlobBuilder]";
            };
            FB_proto.slice = function (start, end, type) {
                var args = arguments.length;
                if (args < 3) {
                    type = null;
                }
                let blob = new FakeBlob(
                    this.data.slice(start, args > 1 ? end : this.data.length)
                    , type
                    , this.encoding
                );
                let arrayBuffer = this._arrayBuffer;
                if (arrayBuffer instanceof ArrayBuffer) {
                    blob._arrayBuffer = this._arrayBuffer.slice(start, end);
                }
                return blob;
            };
            FB_proto.toString = function () {
                return "[object Blob]";
            };
            FB_proto.close = function () {
                this.size = 0;
                delete this.data;
            };
            FB_proto.arrayBuffer = function () {
                return this._arrayBuffer.slice(0);
            };
            return FakeBlobBuilder;
        }());

        exports.Blob = function (blobParts, options) {
            var type = options ? (options.type || "") : "";
            var builder = new BlobBuilder();
            if (blobParts) {
                for (var i = 0, len = blobParts.length; i < len; i++) {
                    if (Uint8Array && blobParts[i] instanceof Uint8Array) {
                        builder.append(blobParts[i].buffer);
                    } else {
                        builder.append(blobParts[i]);
                    }
                }
            }
            var blob = builder.getBlob(type);
            if (!blob.slice && blob.webkitSlice) {
                blob.slice = blob.webkitSlice;
            }
            return blob;
        };

        var getPrototypeOf = Object.getPrototypeOf || function (object) {
            return object.__proto__;
        };
        exports.Blob.prototype = getPrototypeOf(new exports.Blob());
    });
})(
    typeof self !== "undefined" && self ||
    typeof window !== "undefined" && window ||
    typeof global !== "undefined" && global ||
    this.content || this
);
