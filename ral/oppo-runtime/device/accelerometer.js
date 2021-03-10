//TODO 数据不对，需要矫正。回调接口也需要相应保存处理
_UTIL.exportTo("stopAccelerometer", qg, ral);
_UTIL.exportTo("startAccelerometer", qg, ral);
_UTIL.exportTo("onAccelerometerChange", qg, ral);
_UTIL.exportTo("offAccelerometerChange", qg, ral, function () {
    ral.offAccelerometerChange = function () {

    }
});