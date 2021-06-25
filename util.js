export default {
    arraybufferToString(arrayBuffer) {
        // transfer data in arrayBufferObject into Uint8 Array as bytes data
        const byteArray = new Uint8Array(arrayBuffer);
        // encode bytes data into unicode string
        let str = [];
        str.length = byteArray.length;

        let currentStrIndex = 0;
        let currenStrCode = 0;
        let firstByteCode = 0;
        let arrayLength = byteArray.length;

        for (let index = 0; index < arrayLength; index++) {
            firstByteCode = byteArray[index];
            // Check How much of bytes is current UTF-8 string made of
            if (firstByteCode > 251 && firstByteCode < 254 && index + 5 < arrayLength) {
                // six byte, first 1111 110x
                // (firstByteCode - 252 << 30) may be not so safe in ECMAScript! So...:
                // add six byte code value together
                currenStrCode = (firstByteCode - 252) * 1073741824
                    + (byteArray[++index] - 128 << 24)
                    + (byteArray[++index] - 128 << 18)
                    + (byteArray[++index] - 128 << 12)
                    + (byteArray[++index] - 128 << 6)
                    + byteArray[++index] - 128;
            } else if (firstByteCode > 247 && firstByteCode < 252 && index + 4 < arrayLength) {
                // five bytes, first byte 1111 10xx
                currenStrCode = (firstByteCode - 248 << 24)
                    + (byteArray[++index] - 128 << 18)
                    + (byteArray[++index] - 128 << 12)
                    + (byteArray[++index] - 128 << 6)
                    + byteArray[++index] - 128;
            } else if (firstByteCode > 239 && firstByteCode < 248 && index + 3 < arrayLength) {
                // four bytes, first byte 1111 0xxx
                currenStrCode = (firstByteCode - 240 << 18)
                    + (byteArray[++index] - 128 << 12)
                    + (byteArray[++index] - 128 << 6)
                    + byteArray[++index] - 128;
            } else if (firstByteCode > 223 && firstByteCode < 240 && index + 2 < arrayLength) {
                // three bytes, first byte 1110 xxxx
                currenStrCode = (firstByteCode - 224 << 12)
                    + (byteArray[++index] - 128 << 6)
                    + byteArray[++index] - 128;
            } else if (firstByteCode > 191 && firstByteCode < 224 && index + 1 < arrayLength) {
                // two bytes, first byte 110x xxxx
                currenStrCode = (firstByteCode - 192 << 6)
                    + byteArray[++index] - 128;
            } else {
                // one bytes, first byte 0xxx xxxx or error single byte
                currenStrCode = firstByteCode;
            }
            // encode as UTF-16
            str[currentStrIndex++] = String.fromCharCode(currenStrCode);
        }
        str.length = currentStrIndex;
        return str.join('');
    },
    stringToArraybuffer(string) {
        let length = string.length;
        let byteArray = new Array(6 * length);
        let actualLength = 0;
        for (let index = 0; index < length; index++) {
            let code = string.charCodeAt(index);
            // transfer UTF-16 to UTF-8
            if (code < 0x80) {
                // utf-8 One bytes, first byte 0100 0000
                byteArray[actualLength++] = code;
            } else if (code < 0x800) {
                // utf-8 two bytes, first byte 110x xxxx
                byteArray[actualLength++] = 192 + (code >>> 6);
                byteArray[actualLength++] = 128 + (code & 63);
            } else if (code < 0x10000) {
                // utf-8 three bytes, first byte 1110 xxxx
                byteArray[actualLength++] = 224 + (code >>> 12);
                byteArray[actualLength++] = 128 + (code >>> 6 & 63);
                byteArray[actualLength++] = 128 + (code & 63);
            } else if (code < 0x200000) {
                // utf-8 four bytes, first byte 1111 0xxx
                byteArray[actualLength++] = 240 + (code >>> 18);
                byteArray[actualLength++] = 128 + (code >>> 12 & 63);
                byteArray[actualLength++] = 128 + (code >>> 6 & 63);
                byteArray[actualLength++] = 128 + (code & 63);
            } else if (code < 0x4000000) {
                // utf-8 five bytes, first byte 1111 10xx
                byteArray[actualLength++] = 248 + (code >>> 24);
                byteArray[actualLength++] = 128 + (code >>> 18 & 63);
                byteArray[actualLength++] = 128 + (code >>> 12 & 63);
                byteArray[actualLength++] = 128 + (code >>> 6 & 63);
                byteArray[actualLength++] = 128 + (code & 63);
            } else if (code < 0x4000000) {
                // utf-8 six bytes, first byte 1111 110x
                byteArray[actualLength++] = 252 + (code >>> 30);
                byteArray[actualLength++] = 128 + (code >>> 24 & 63);
                byteArray[actualLength++] = 128 + (code >>> 18 & 63);
                byteArray[actualLength++] = 128 + (code >>> 12 & 63);
                byteArray[actualLength++] = 128 + (code >>> 6 & 63);
                byteArray[actualLength++] = 128 + (code & 63);
            }
        }
        byteArray.length = actualLength;
        return new Uint8Array(byteArray).buffer;
    }
}

