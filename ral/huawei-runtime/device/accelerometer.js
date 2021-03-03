let _systemInfo = hbs.getSystemInfoSync();
let _listeners = [];
ral.device = ral.device || {};

ral.stopAccelerometer = hbs.stopAccelerometer.bind(hbs);
ral.startAccelerometer = hbs.startAccelerometer.bind(hbs);
ral.onAccelerometerChange = hbs.onAccelerometerChange.bind(hbs);