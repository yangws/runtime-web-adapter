import _FEATURE from "../../feature";
let _systemInfo = qg.getSystemInfoSync();
let _isLandscape = _systemInfo.screenWidth > _systemInfo.screenHeight;
ral.stopAccelerometer = function () {
    qg.unsubscribeAccelerometer();
}

ral.startAccelerometer = function (cb) {
    qg.subscribeAccelerometer({
        callback: function (data) {
            let x = (data.x || 0) * 0.1;
            let y = (data.y || 0) * 0.1;
            let z = (data.z || 0) * 0.1;

            // here isLandscape means isLandscapeRight
            if (_isLandscape) {
                let tmpX = x;
                x = y;
                y = - tmpX;
            }
            else {
                x = -x;
                y = -y;
            }

            let res = {};
            res.x = x;
            res.y = y;
            res.z = z;
            cb && cb(res);
        }
    })
}