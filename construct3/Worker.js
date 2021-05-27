// 空实现Worker
class Worker {
    constructor(url, workerOpts) {
        this.postMessage = function (message, transferables) { }
    }
}
module.exports = Worker;