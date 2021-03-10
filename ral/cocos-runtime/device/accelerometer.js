import _UTIL from "../../util";

let _rt = loadRuntime();
let _listeners = [];
ral.device = ral.device || {};

if (_rt.offAccelerometerChange) {
    // runtime v2
    ral.onAccelerometerChange = _rt.onAccelerometerChange.bind(_rt);
    ral.offAccelerometerChange = _rt.offAccelerometerChange.bind(_rt);
    ral.stopAccelerometer = _rt.stopAccelerometer.bind(_rt);
    let _startAccelerometer = _rt.startAccelerometer.bind(_rt);
    ral.startAccelerometer = function (obj) {
        return _startAccelerometer(Object.assign({ type: "accelerationIncludingGravity" }, obj));
    };
} else {

    // runtime v1
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

    let _systemInfo = _rt.getSystemInfoSync();
    let _isAndroid = _systemInfo.platform.toLowerCase() === "android";
    jsb.device.dispatchDeviceMotionEvent = function (event) {
        let acceleration = Object.assign({}, event._accelerationIncludingGravity);
        if (_isAndroid) {
            acceleration.x /= -10;
            acceleration.y /= -10;
            acceleration.z /= -10;
        } else {
            acceleration.x /= 10;
            acceleration.y /= 10;
            acceleration.z /= 10;
        }
        _listeners.forEach(function (listener) {
            listener({
                x: acceleration.x,
                y: acceleration.y,
                z: acceleration.z
            });
        });
    };

    ral.stopAccelerometer = function () {
        jsb.device.setMotionEnabled(false);
    };
    ral.startAccelerometer = function () {
        jsb.device.setMotionEnabled(true);
    };
}