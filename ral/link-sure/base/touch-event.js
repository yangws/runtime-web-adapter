if (!window.jsb) {
    window.jsb = {};
}
let jsb = window.jsb;
let _touches = [];

let _getTouchIndex = function (touch) {
    var element;
    for (let index = 0; index < _touches.length; index++) {
        element = _touches[index];
        if (touch.identifier === element.identifier) {
            return index;
        }
    }
    return -1;
};

let _copyObject = function (fromObj, toObject) {
    for (const key in fromObj) {
        if (fromObj.hasOwnProperty(key)) {
            toObject[key] = fromObj[key];
        }
    }
};

let _listenerMap = {
    "touchstart": [],
    "touchmove": [],
    "touchend": [],
    "touchcancel": []
};

/**
 * 添加监听
 * @param key   键
 * @param value 值
 * @private
 */
function _addListener(key, value) {
    let listenerArr = _listenerMap[key];

    for (let index = 0, length = listenerArr.length; index < length; index++) {
        if (value === listenerArr[index]) {
            return;
        }
    }
    listenerArr.push(value);
}

function _removeListener(key, value) {
    let listenerArr = _listenerMap[key] || [];
    let length = listenerArr.length;
    for (let index = 0; index < length; ++index) {
        if (value === listenerArr[index]) {
            listenerArr.splice(index, 1);
            return;
        }
    }
}

let _hasDellWith = false;
let _systemInfo = wuji.getSystemInfoSync();
if (window.innerWidth && _systemInfo.windowWidth !== window.innerWidth) {
    _hasDellWith = true;
}
let _touchEventHandlerFactory = function (type) {
    return (changedTouches) => {
        if (typeof changedTouches === "function") {
            _addListener(type, changedTouches);
            return;
        }
        const touchEvent = new TouchEvent(type);

        let index;
        if (type === "touchstart") {
            changedTouches.forEach(touch => {
                index = _getTouchIndex(touch);
                if (index >= 0) {
                    _copyObject(touch, _touches[index]);
                } else {
                    let tmp = {};
                    _copyObject(touch, tmp);
                    _touches.push(tmp);
                }
            });
        } else if (type === "touchmove") {
            changedTouches.forEach(element => {
                index = _getTouchIndex(element);
                if (index >= 0) {
                    _copyObject(element, _touches[index]);
                }
            });
        } else if (type === "touchend" || type === "touchcancel") {
            changedTouches.forEach(element => {
                index = _getTouchIndex(element);
                if (index >= 0) {
                    _touches.splice(index, 1);
                }
            });
        }

        let touches = [].concat(_touches);
        let _changedTouches = [];
        changedTouches.forEach(touch => {
            let length = touches.length;
            for (let index = 0; index < length; ++index) {
                let _touch = touches[index];
                if (touch.identifier === _touch.identifier) {
                    _changedTouches.push(_touch);
                    return;
                }
            }
            _changedTouches.push(touch);
        });
        touchEvent.touches = touches;
        touchEvent.targetTouches = touches;
        touchEvent.changedTouches = _changedTouches;

        if (_hasDellWith) {
            touches.forEach(function (touch) {
                touch.clientX /= window.devicePixelRatio;
                touch.clientY /= window.devicePixelRatio;
                touch.pageX /= window.devicePixelRatio;
                touch.pageY /= window.devicePixelRatio;
            });
            if (type === "touchcancel" || type === "touchend") {
                _changedTouches.forEach(function (touch) {
                    touch.clientX /= window.devicePixelRatio;
                    touch.clientY /= window.devicePixelRatio;
                    touch.pageX /= window.devicePixelRatio;
                    touch.pageY /= window.devicePixelRatio;
                });
            }
        }

        let listenerArr = _listenerMap[type];
        let length = listenerArr.length;
        for (let index = 0; index < length; index++) {
            listenerArr[index](touchEvent);
        }
    }
};

if (wuji.onTouchStart) {
    ral.onTouchStart = wuji.onTouchStart;
    ral.offTouchStart = wuji.offTouchStart;
} else {
    jsb.onTouchStart = _touchEventHandlerFactory('touchstart');
    jsb.offTouchStart = function (callback) {
        _removeListener("touchstart", callback);
    };
    ral.onTouchStart = jsb.onTouchStart.bind(jsb);
    ral.offTouchStart = jsb.offTouchStart.bind(jsb);
}
if (wuji.onTouchMove) {
    ral.onTouchMove = wuji.onTouchMove;
    ral.offTouchMove = wuji.offTouchMove;
} else {
    jsb.onTouchMove = _touchEventHandlerFactory('touchmove');
    jsb.offTouchMove = function (callback) {
        _removeListener("touchmove", callback);
    };
    ral.onTouchMove = jsb.onTouchMove.bind(jsb);
    ral.offTouchMove = jsb.offTouchMove.bind(jsb);
}
if (wuji.onTouchCancel) {
    ral.onTouchCancel = wuji.onTouchCancel;
    ral.offTouchCancel = wuji.offTouchCancel;
} else {
    jsb.onTouchCancel = _touchEventHandlerFactory('touchcancel');
    jsb.offTouchCancel = function (callback) {
        _removeListener("touchcancel", callback);
    };
    ral.onTouchCancel = jsb.onTouchCancel.bind(jsb);
    ral.offTouchCancel = jsb.offTouchCancel.bind(jsb);
}
if (wuji.onTouchEnd) {
    ral.onTouchEnd = wuji.onTouchEnd;
    ral.offTouchEnd = wuji.offTouchEnd;
} else {
    jsb.onTouchEnd = _touchEventHandlerFactory('touchend');
    jsb.offTouchEnd = function (callback) {
        _removeListener("touchend", callback);
    };
    ral.onTouchEnd = jsb.onTouchEnd.bind(jsb);
    ral.offTouchEnd = jsb.offTouchEnd.bind(jsb);
}