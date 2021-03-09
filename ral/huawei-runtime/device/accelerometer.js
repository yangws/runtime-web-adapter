//TODO 数据不对，需要矫正。回调接口也需要相应保存处理
_UTIL.exportTo("stopAccelerometer", hbs, ral);
_UTIL.exportTo("startAccelerometer", hbs, ral);
_UTIL.exportTo("onAccelerometerChange", hbs, ral);
_UTIL.exportTo("offAccelerometerChange", hbs, ral, function () {
    ral.offAccelerometerChange = function () {

    }
});