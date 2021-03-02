
let _createSyncGroups = function (group) {
    var id = this.getSignature(group, this.shader.program.uniformData);
    if (!this.cache[id]) {
        this.cache[id] = generateUniformsSync(group, this.shader.program.uniformData);
    }
    group.syncUniforms[this.shader.program.id] = this.cache[id];
    return group.syncUniforms[this.shader.program.id];
}

Object.defineProperty(PIXI.systems.ShaderSystem.prototype, "createSyncGroups", {
    get() {
        return _createSyncGroups;
    },
    set(value) {
    }
});


function generateUniformsSync(group, uniformData) {
    // 以下为引擎字符串代码转义
    return (function (group, uniformData) {
        return function (ud, uv, renderer, syncData) {
            var v = null;
            var cv = null;
            var cv = null;
            var t = 0;
            var gl = renderer.gl;
            for (var i in group.uniforms) {
                var data = uniformData[i];
                if (!data) {
                    if (group.uniforms[i].group) {
                        renderer.shader.syncUniformGroup(uv[i], syncData);
                    }
                    continue;
                }
                var uniform = group.uniforms[i];
                if (data.type === 'float' && data.size === 1) {
                    if (uv[i] !== ud[i].value) {
                        ud[i].value = uv[i];
                        gl.uniform1f(ud[i].location, uv[i]);
                    }
                } else if ((data.type === 'sampler2D' || data.type === 'samplerCube' || data.type === 'sampler2DArray') && data.size === 1 && !data.isArray) {
                    t = syncData.textureCount++;
                    renderer.texture.bind(uv[i], t);
                    if (ud[i].value !== t) {
                        ud[i].value = t;
                        gl.uniform1i(ud[i].location, t); // eslint-disable-line max-len
                    }
                } else if (data.type === 'mat3' && data.size === 1 && uniform.a !== undefined) {
                    gl.uniformMatrix3fv(ud[i].location, false, uv[i].toArray(true));
                } else if (data.type === 'vec2' && data.size === 1 && uniform.x !== undefined) {
                    cv = ud[i].value;
                    v = uv[i];
                    if (cv[0] !== v.x || cv[1] !== v.y) {
                        cv[0] = v.x;
                        cv[1] = v.y;
                        gl.uniform2f(ud[i].location, v.x, v.y);
                    }
                } else if (data.type === 'vec2' && data.size === 1) {
                    cv = ud[i].value;
                    v = uv[i];
                    if (cv[0] !== v[0] || cv[1] !== v[1]) {
                        cv[0] = v[0];
                        cv[1] = v[1];
                        gl.uniform2f(ud[i].location, v[0], v[1]);
                    }
                } else if (data.type === 'vec4' && data.size === 1 && uniform.width !== undefined) {
                    cv = ud[i].value;
                    v = uv[i];
                    if (cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height) {
                        cv[0] = v.x;
                        cv[1] = v.y;
                        cv[2] = v.width;
                        cv[3] = v.height;
                        gl.uniform4f(ud[i].location, v.x, v.y, v.width, v.height);
                    }
                } else if (data.type === 'vec4' && data.size === 1) {
                    cv = ud[i].value;
                    v = uv[i];
                    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
                        cv[0] = v[0];
                        cv[1] = v[1]; cv[2] = v[2];
                        cv[3] = v[3];
                        gl.uniform4f(ud[i].location, v[0], v[1], v[2], v[3]);
                    }
                } else {
                    let location = ud[i].location;
                    cv = ud[i].value;
                    v = uv[i];
                    if (data.size === 1) {
                        switch (data.type) {
                            case "float": {
                                if (cv !== v) {
                                    cv.v = v;
                                    gl.uniform1f(location, v);
                                }
                                break;
                            }
                            case "vec2": {
                                if (cv[0] !== v[0] || cv[1] !== v[1]) {
                                    cv[0] = v[0];
                                    cv[1] = v[1];
                                    gl.uniform2f(location, v[0], v[1]);
                                }
                                break;
                            }
                            case "vec3": {
                                if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
                                    cv[0] = v[0];
                                    cv[1] = v[1];
                                    cv[2] = v[2];
                                    gl.uniform3f(location, v[0], v[1], v[2]);
                                }
                                break;
                            }
                            case "vec4": {
                                gl.uniform4f(location, v[0], v[1], v[2], v[3]);
                                break;
                            }

                            case "int": {
                                gl.uniform1i(location, v);
                                break;
                            }

                            case "ivec2": {
                                gl.uniform2i(location, v[0], v[1]);
                                break;
                            }

                            case "ivec3": {
                                gl.uniform3i(location, v[0], v[1], v[2]);
                                break;
                            }
                            case "ivec4": {
                                gl.uniform4i(location, v[0], v[1], v[2], v[3]);
                                break;
                            }
                            case "bool": {
                                gl.uniform1i(location, v);
                                break;
                            }
                            case "bvec2": {
                                gl.uniform2i(location, v[0], v[1]);
                                break;
                            }
                            case "bvec3": {
                                gl.uniform3i(location, v[0], v[1], v[2]);
                                break;
                            } case "bvec4": {
                                gl.uniform4i(location, v[0], v[1], v[2], v[3]);
                                break;
                            } case "mat2": {
                                gl.uniformMatrix2fv(location, false, v);
                                break;
                            } case "mat3": {
                                gl.uniformMatrix3fv(location, false, v);
                                break;
                            } case "mat4": {
                                gl.uniformMatrix4fv(location, false, v);
                                break;
                            } case "sampler2D": {
                                gl.uniform1i(location, v);
                                break;
                            } case "samplerCube": {
                                gl.uniform1i(location, v);
                                break;
                            } case "sampler2DArray": {
                                gl.uniform1i(location, v);
                                break;
                            }
                        }
                    } else {
                        switch (data.type) {
                            case "float": {
                                gl.uniform1fv(location, v);
                                break;
                            }
                            case "vec2": {
                                gl.uniform2fv(location, v);
                                break;
                            }
                            case "vec3": {
                                gl.uniform3fv(location, v);
                                break;
                            }
                            case "vec4": {
                                gl.uniform4fv(location, v);
                                break;
                            }
                            case "mat4": {
                                gl.uniformMatrix4fv(location, false, v);
                                break;
                            }
                            case "mat3": {
                                gl.uniformMatrix3fv(location, false, v);
                                break;
                            } case "mat2": {
                                gl.uniformMatrix2fv(location, false, v);
                                break;
                            } case "int": {
                                gl.uniform1iv(location, v);
                                break;
                            } case "ivec2": {
                                gl.uniform2iv(location, v);
                                break;
                            } case "ivec3": {
                                gl.uniform3iv(location, v);
                                break;
                            }
                            case "ivec4": {
                                gl.uniform4iv(location, v);
                                break;
                            }
                            case "bool": {
                                gl.uniform1iv(location, v);
                                break;
                            }
                            case "bvec2": {
                                gl.uniform2iv(location, v);
                                break;
                            }
                            case "bvec3": {
                                gl.uniform3iv(location, v);
                                break;
                            }
                            case "bvec4": {
                                gl.uniform4iv(location, v);
                                break;
                            }
                            case "sampler2D": {
                                gl.uniform1iv(location, v);
                                break;
                            }
                            case "samplerCube": {
                                gl.uniform1iv(location, v);
                                break;
                            }
                            case "sampler2DArray": {
                                gl.uniform1iv(location, v);
                                break;
                            }
                        }
                    }
                }
            }
        }
    })(group, uniformData);
}

let _systemCheck = function () {
    if (!unsafeEvalSupported()) {
        console.error('Current environment does not allow unsafe-eval, '
            + 'please use @pixi/unsafe-eval module to enable support.');
    }
}

Object.defineProperty(PIXI.systems.ShaderSystem.prototype, "systemCheck", {
    get() {
        return _systemCheck;
    },
    set(value) {
    }
});

let unsafeEval = false;
function unsafeEvalSupported() {
    if (typeof unsafeEval === 'boolean') {
        return unsafeEval;
    }
    try {
        /* eslint-disable no-new-func */
        var func = new Function('param1', 'param2', 'param3', 'return param1[param2] === param3;');
        /* eslint-enable no-new-func */
        unsafeEval = func({ a: 'b' }, 'a', 'b') === true;
    }
    catch (e) {
        unsafeEval = false;
    }
    return unsafeEval;
}