export default {
    arraybufferToText(arrayBufferObject) {
        // transfer data in arrayBufferObject into Uint8 Array as bytes data
        const uint8Array = new Uint8Array(arrayBufferObject);
        // encode bytes data to unicode string
        var str = "";
        var currenStrCode = 0;
        var firstByteCode = 0;
        var arrLen = uint8Array.length;
        for (var index = 0; index < arrLen; index++) {
            firstByteCode = uint8Array[index];
            // Check How much of bytes is current UTF-8 string made of
            if (firstByteCode > 251 && firstByteCode < 254 && firstByteCode + 5 < arrLen) {
                // six byte, first 1111 110x
                // (firstByteCode - 252 << 30) may be not so safe in ECMAScript! So...:
                // add six byte code value together
                currenStrCode = (firstByteCode - 252) * 1073741824
                    + (uint8Array[++index] - 128 << 24)
                    + (uint8Array[++index] - 128 << 18)
                    + (uint8Array[++index] - 128 << 12)
                    + (uint8Array[++index] - 128 << 6)
                    + uint8Array[++index] - 128;
            } else if (firstByteCode > 247 && firstByteCode < 252 && firstByteCode + 4 < arrLen) {
                // five bytes, first byte 1111 10xx
                currenStrCode = (firstByteCode - 248 << 24)
                    + (uint8Array[++index] - 128 << 18)
                    + (uint8Array[++index] - 128 << 12)
                    + (uint8Array[++index] - 128 << 6)
                    + uint8Array[++index] - 128;
            } else if (firstByteCode > 239 && firstByteCode < 248 && firstByteCode + 3 < arrLen) {
                // four bytes, first byte 1111 0xxx
                currenStrCode = (firstByteCode - 240 << 18)
                    + (uint8Array[++index] - 128 << 12)
                    + (uint8Array[++index] - 128 << 6)
                    + uint8Array[++index] - 128;
            } else if (firstByteCode > 223 && firstByteCode < 240 && firstByteCode + 2 < arrLen) {
                // three bytes, first byte 1110 xxxx
                currenStrCode = (firstByteCode - 224 << 12)
                    + (uint8Array[++index] - 128 << 6)
                    + uint8Array[++index] - 128;
            } else if (firstByteCode > 191 && firstByteCode < 224 && firstByteCode + 1 < arrLen) {
                // two bytes, first byte 110x xxxx
                currenStrCode = (firstByteCode - 192 << 6)
                    + uint8Array[++index] - 128;
            } else {
                // one bytes, first byte 0xxx xxxx or error single byte
                currenStrCode = firstByteCode;
            }
            // encode as UTF-16
            str += String.fromCharCode(currenStrCode);
        }
        return str;
    }
}

