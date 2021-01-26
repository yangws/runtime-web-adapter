if (window.__gl) {
    let gl = window.__gl;
    let _glTexImage2D = gl.texImage2D;
    gl.texImage2D = function (target, level, internalformat, width, height, border, format, type, pixels) {
        let argc = arguments.length;

        if (argc === 6) {
            let image = border;
            type = height;
            format = width;

            if (image instanceof HTMLImageElement) {
                let error = console.error;
                console.error = function(){};
                _glTexImage2D(...arguments);
                console.error = error;
                gl.texImage2D_image(target, level, image._imageMeta);
            } else if (image instanceof HTMLCanvasElement) {
                let error = console.error;
                console.error = function(){};
                _glTexImage2D(...arguments);
                console.error = error;
                let context2D = image.getContext('2d');
                gl.texImage2D_canvas(target, level, internalformat, format, type, context2D);
            } else if (image instanceof ImageData) {
                let error = console.error;
                console.error = function(){};
                _glTexImage2D(target, level, internalformat, image.width, image.height, 0, format, type, image.data);
                console.error = error;
            } else {
                console.error("Invalid pixel argument passed to gl.texImage2D!");
            }
        } else if (argc === 9) {
            let error = console.error;
            console.error = function(){};
            _glTexImage2D(target, level, internalformat, width, height, border, format, type, pixels);
            console.error = error;
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
                console.error = function(){};
                _glTexSubImage2D(...arguments);
                console.error = error;
                gl.texSubImage2D_image(target, level, xoffset, yoffset, image._imageMeta);
            }
            else if (image instanceof HTMLCanvasElement) {
                let error = console.error;
                console.error = function(){};
                _glTexSubImage2D(...arguments);
                console.error = error;
                let context2D = image.getContext('2d');
                gl.texSubImage2D_canvas(target, level, xoffset, yoffset, format, type, context2D);
            }
            else if (image instanceof ImageData) {
                let error = console.error;
                console.error = function(){};
                _glTexSubImage2D(target, level, xoffset, yoffset, image.width, image.height, format, type, image.data);
                console.error = error;
            }
            else {
                console.error("Invalid pixel argument passed to gl.texImage2D!");
            }
        }
        else if (argc === 9) {
            let error = console.error;
            console.error = function(){};
            _glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
            console.error = error;
        }
        else {
            console.error((new Error("gl.texImage2D: invalid argument count!").stack));
        }
    }
}