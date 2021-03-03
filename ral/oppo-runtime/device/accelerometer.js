let _systemInfo = qg.getSystemInfoSync();
let _listeners = [];
ral.device = ral.device || {};

ral.stopAccelerometer = qg.stopAccelerometer.bind(qg);
ral.startAccelerometer = qg.startAccelerometer.bind(qg);
ral.onAccelerometerChange = qg.onAccelerometerChange.bind(qg);