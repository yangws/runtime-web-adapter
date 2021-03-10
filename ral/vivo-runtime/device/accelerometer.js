import _FEATURE from "../../feature";
//TODO 数据不对，需要矫正。回调接口也需要相应保存处理
ral.stopAccelerometer = function () {
    qg.unsubscribeAccelerometer();
}

ral.startAccelerometer = function () {

}

ral.offAccelerometerChange = function () {

}

ral.onAccelerometerChange = function () {
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