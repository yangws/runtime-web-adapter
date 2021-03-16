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

ral.stopAccelerometer = function () {
    qg.unsubscribeAccelerometer();
};

ral.startAccelerometer = function () {
    let _systemInfo = qg.getSystemInfoSync();
    let _isAndroid = _systemInfo.osType.toLowerCase().indexOf("android") !== -1;
    qg.subscribeAccelerometer({
        callback: function (data) {
            let x, y, z;
            if (_isAndroid) {
                x = data.x / -10;
                y = data.y / -10;
                z = data.z / -10;
            } else {
                x = data.x / 10;
                y = data.y / 10;
                z = data.z / 10;
            }
            let timestamp = data.timeStamp || Date.now();
            _listeners.forEach(function (listener) {
                listener({
                    x: x,
                    y: y,
                    z: z,
                    timestamp: timestamp
                });
            });
        }
    })
};