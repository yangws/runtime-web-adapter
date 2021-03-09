let _systemInfo = qg.getSystemInfoSync();
let _listeners = [];

ral.stopAccelerometer = qg.stopAccelerometer.bind(qg);
ral.startAccelerometer = qg.startAccelerometer.bind(qg);
ral.offAccelerometerChange = qg.offAccelerometerChange.bind(qg) || function () { };
ral.onAccelerometerChange = qg.onAccelerometerChange.bind(qg);