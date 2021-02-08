let _systemInfo = qg.getSystemInfoSync();
let _listeners = [];
jsb.device = jsb.device || {};

jsb.stopAccelerometer = qg.stopAccelerometer.bind(qg);
jsb.startAccelerometer = qg.startAccelerometer.bind(qg);
jsb.onAccelerometerChange = qg.onAccelerometerChange.bind(qg);