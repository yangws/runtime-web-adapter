let _systemInfo = hbs.getSystemInfoSync();
let _listeners = [];
jsb.device = jsb.device || {};

jsb.stopAccelerometer = hbs.stopAccelerometer.bind(hbs);
jsb.startAccelerometer = hbs.startAccelerometer.bind(hbs);
jsb.onAccelerometerChange = hbs.onAccelerometerChange.bind(hbs);