window.HTMLCanvasElement = require("./HTMLCanvasElement.js");
let oldCreateElement = document.createElement;
document.createElement = function (name) {
    if (name === "canvas") {
        return new window.HTMLCanvasElement;
    }
    return oldCreateElement(name);
}

// 引擎依赖模块，在引擎加载时覆盖
let _PIXI;
let _intercept = false;
Object.defineProperty(window, "PIXI", {
    get() {
        return _PIXI;
    },
    set(value) {
        _PIXI = value;
        if (!_intercept) {
            _intercept = true;
            let version = _PIXI.VERSION;
            if (version) {
                _systems(_PIXI, version);
            } else {
                Object.defineProperty(_PIXI, "VERSION", {
                    get() {
                        return version;
                    },
                    set(value) {
                        version = value;
                        _systems(_PIXI, version);
                    }
                });
            }
        }
    }
});

function _systems(PIXI, version) {
    let v1 = version.split(".");
    if (v1[0] >= 5) {
        let systems = PIXI.systems;
        if (systems) {
            _shaderSystem(systems);
        } else {
            Object.defineProperty(PIXI, "systems", {
                get() {
                    return systems;
                },
                set(value) {
                    systems = value;
                    _shaderSystem(systems);
                }
            });
        }

        let settings = PIXI.settings;
        if (settings) {
            _renderOptions(settings);
        } else {
            Object.defineProperty(PIXI, "settings", {
                get() {
                    return settings;
                },
                set(value) {
                    settings = value;
                    _shaderSystem(settings);
                }
            });
        }
    } else {
        console.log("current PIXI version: " + version);
    }
}
// 5.0.0
function _shaderSystem(systems) {
    let shaderSystem = systems.ShaderSystem;
    if (shaderSystem) {
        require("./shader-system");
    } else {
        Object.defineProperty(systems, "ShaderSystem", {
            get() {
                return shaderSystem;
            },
            set(value) {
                shaderSystem = value;
                require("./shader-system");
            }
        });
    }
}

function _renderOptions(settings) {
    let renderOptions = settings.RENDER_OPTIONS;
    if (renderOptions) {
        require("./render-options");
    } else {
        Object.defineProperty(renderOptions, "RENDER_OPTIONS", {
            get() {
                return renderOptions;
            },
            set(value) {
                renderOptions = value;
                require("./render-options");
            }
        });
    }
}
