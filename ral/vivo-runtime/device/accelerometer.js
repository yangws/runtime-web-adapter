import _FEATURE from "../../feature";
let _systemInfo = qg.getSystemInfoSync();

let featureValue = "wrapper";
_FEATURE.setFeature("window.devicePixelRatio", "spec", featureValue);

ral.stopAccelerometer = function () {
    qg.unsubscribeAccelerometer();
}

ral.startAccelerometer = function (cb) {
    qg.subscribeAccelerometer({
        callback: function (data) {
            console.log(`handling callback, x = ${data.x}, y = ${data.y}, z = ${data.z}`)
            cb(data);
        }
    })
}