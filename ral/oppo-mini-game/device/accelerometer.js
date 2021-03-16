let _listeners = [];
ral.onAccelerometerChange = function (listener) {
    if (typeof listener === "function") {
        let length = _listeners.length;
        for (let index = 0; index < length; ++index) {
            if (listener === _listeners[index]) {
                return;
            }
        }
        _listeners.push(listener);
    }
};
ral.offAccelerometerChange = function (listener) {
    let length = _listeners.length;
    for (let index = 0; index < length; ++index) {
        if (listener === _listeners[index]) {
            _listeners.splice(index, 1);
            return;
        }
    }
};

const _addEventListener = window.addEventListener.bind(window);
let _onAccelerometerChange;
ral.startAccelerometer = function () {
    if (!_onAccelerometerChange) {
        _onAccelerometerChange = function (event) {
            let acceleration = Object.assign({}, event.accelerationIncludingGravity);
            acceleration.x /= -10;
            acceleration.y /= -10;
            acceleration.z /= -10;
            _listeners.forEach(function (listener) {
                listener({
                    x: acceleration.x,
                    y: acceleration.y,
                    z: acceleration.z,
                    timestamp: event.timeStamp || Date.now()
                });
            });
        };
        _addEventListener("devicemotion", _onAccelerometerChange, false);
        jsb.device.setMotionEnabled(true);
    }
};

const _removeEventListener = window.removeEventListener.bind(window);
ral.stopAccelerometer = function () {
    if (_onAccelerometerChange) {
        _removeEventListener("devicemotion", _onAccelerometerChange, false);
        _onAccelerometerChange = null;
        jsb.device.setMotionEnabled(false);
    }
};