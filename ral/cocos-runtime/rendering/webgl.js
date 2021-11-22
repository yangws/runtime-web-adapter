if (window.__gl) {
    let gl = window.__gl;
    if (gl.texImage2D_canvas) {
        let _glTexImage2D = gl.texImage2D;
        gl.texImage2D = function (target, level, internalformat, width, height, border, format, type, pixels) {
            let argc = arguments.length;

            if (argc === 6) {
                let image = border;
                type = height;
                format = width;

                if (image instanceof HTMLImageElement) {
                    let error = console.error;
                    console.error = function () { };
                    _glTexImage2D(...arguments);
                    console.error = error;
                    gl.texImage2D_image(target, level, image._imageMeta);
                } else if (image instanceof HTMLCanvasElement) {
                    let error = console.error;
                    console.error = function () { };
                    _glTexImage2D(...arguments);
                    console.error = error;
                    let context2D = image.getContext('2d');
                    gl.texImage2D_canvas(target, level, internalformat, format, type, context2D);
                } else if (image instanceof ImageData) {
                    let error = console.error;
                    console.error = function () { };
                    _glTexImage2D(target, level, internalformat, image.width, image.height, 0, format, type, image.data);
                    console.error = error;
                } else {
                    console.error("Invalid pixel argument passed to gl.texImage2D!");
                }
            } else if (argc === 9) {
                _glTexImage2D(target, level, internalformat, width, height, border, format, type, pixels);
            } else {
                console.error("gl.texImage2D: invalid argument count!");
            }
        };

        let _glTexSubImage2D = gl.texSubImage2D;
        gl.texSubImage2D = function (target, level, xoffset, yoffset, width, height, format, type, pixels) {
            let argc = arguments.length;
            if (argc === 7) {
                let image = format;
                type = height;
                format = width;

                if (image instanceof HTMLImageElement) {
                    let error = console.error;
                    console.error = function () { };
                    _glTexSubImage2D(...arguments);
                    console.error = error;
                    gl.texSubImage2D_image(target, level, xoffset, yoffset, image._imageMeta);
                } else if (image instanceof HTMLCanvasElement) {
                    let error = console.error;
                    console.error = function () { };
                    _glTexSubImage2D(...arguments);
                    console.error = error;
                    let context2D = image.getContext('2d');
                    gl.texSubImage2D_canvas(target, level, xoffset, yoffset, format, type, context2D);
                } else if (image instanceof ImageData) {
                    let error = console.error;
                    console.error = function () { };
                    _glTexSubImage2D(target, level, xoffset, yoffset, image.width, image.height, format, type, image.data);
                    console.error = error;
                } else {
                    console.error("Invalid pixel argument passed to gl.texSubImage2D!");
                }
            } else if (argc === 9) {
                _glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
            } else {
                console.error("gl.texSubImage2D: invalid argument count!");
            }
        }
    } else {
        let _glTexImage2D = gl.texImage2D;
        gl.texImage2D = function (target, level, internalformat, width, height, border, format, type, pixels) {
            let argc = arguments.length;
            if (argc == 6) {
                let image = border;
                type = height;
                format = width;

                if (image instanceof HTMLImageElement) {
                    let error = console.error;
                    console.error = function () { };
                    _glTexImage2D(target, level, image._glInternalFormat, image.width, image.height, 0, image._glFormat, image._glType, image._data);
                    console.error = error;
                } else if (image instanceof HTMLCanvasElement) {
                    if (image._context2D && image._context2D._getData) {
                        let error = console.error;
                        console.error = function () { };
                        let data = image._context2D._getData();
                        _glTexImage2D(target, level, internalformat, image.width, image.height, 0, format, type, data);
                        console.error = error;
                    } else {
                        console.error("Invalid image argument gl.texImage2D!");
                    }
                } else if (image.height && image.width && image.data) {
                    let error = console.error;
                    console.error = function () { };
                    _glTexImage2D(target, level, internalformat, image.width, image.height, 0, format, type, image.data);
                    console.error = error;
                } else {
                    console.error("Invalid pixel argument passed to gl.texImage2D!");
                }
            } else if (argc == 9) {
                _glTexImage2D(target, level, internalformat, width, height, border, format, type, pixels);
            } else {
                console.error("gl.texImage2D: invalid argument count!");
            }
        }

        let _glTexSubImage2D = gl.texSubImage2D;
        gl.texSubImage2D = function (target, level, xoffset, yoffset, width, height, format, type, pixels) {
            let argc = arguments.length;
            if (argc == 7) {
                let image = format;
                type = height;
                format = width;

                if (image instanceof HTMLImageElement) {
                    let error = console.error;
                    console.error = function () { };
                    _glTexSubImage2D(target, level, xoffset, yoffset, image.width, image.height, image._glFormat, image._glType, image._data);
                    console.error = error;
                } else if (image instanceof HTMLCanvasElement) {
                    if (image._context2D && image._context2D._getData) {
                        let error = console.error;
                        console.error = function () { };
                        let data = image._context2D._getData();
                        _glTexSubImage2D(target, level, xoffset, yoffset, image.width, image.height, format, type, data);
                        console.error = error;
                    } else {
                        console.error("Invalid image argument gl.texSubImage2D!");
                    }
                } else if (image.height && image.width && image.data) {
                    let error = console.error;
                    console.error = function () { };
                    _glTexSubImage2D(target, level, xoffset, yoffset, image.width, image.height, format, type, image.data);
                    console.error = error;
                } else {
                    console.error("Invalid pixel argument passed to gl.texSubImage2D!");
                }
            } else if (argc == 9) {
                _glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
            } else {
                console.error("gl.texSubImage2D: invalid argument count!");
            }
        }
    }
}