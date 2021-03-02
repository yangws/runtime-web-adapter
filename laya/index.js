require('../ral/cocos-runtime/index.js');
require("../web/window.js");

// 屏幕适配
let _config;
Object.defineProperty(window, "Config", {
    get() {
        return _config;
    },
    set(value) {
        _config = value;
        let _useRetinalCanvas = true;
        Object.defineProperty(_config, "useRetinalCanvas", {
            get() {
                return _useRetinalCanvas;
            },
            set(value) {
                _useRetinalCanvas = true;
            }
        });
    }
});

//iOS版本字体重叠bug修复
let res = jsb.getSystemInfoSync();
if (res && res.system.toLowerCase() !== 'ios 10.1.1') {
    let _Laya;
    Object.defineProperty(window, "Laya", {
        get() {
            return _Laya;
        },
        set(value) {
            _Laya = value;
            if (_Laya.Browser && !_Laya.Browser.onMiniGame) {
                let _onMiniGame = true;
                Object.defineProperty(_Laya.Browser, "onMiniGame", {
                    get() {
                        return _onMiniGame;
                    },
                    set(value) {
                        _onMiniGame = true;
                    }
                });
            }
        }
    });
}