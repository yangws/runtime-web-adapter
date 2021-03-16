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
    qg.subscribeAccelerometer({
        callback: function (data) {
            let x = data.x / -10;
            let y = data.y / -10;
            let z = data.z / -10;
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