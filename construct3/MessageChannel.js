class MessageChannel {
    constructor() {
        this.port1 = new MessagePort();
        this.port2 = new MessagePort();
        this.port1.postMessage = function (message, transferables) {
            // 只有指定type 的message 会进入C3引擎中的OnMessageFromDOM方法
            const type = message["type"];
            if (type === "event" || type === "result" || type === "runtime-ready" || type === "alert-error" || type === "creating-runtime") {
                window["c3_runtimeInterface"]._GetLocalRuntime()["_OnMessageFromDOM"](message);
            }
        };
        this.port2.postMessage = function (message, transferables) {
            if (typeof message === 'object') {
                window["c3_runtimeInterface"]["_OnMessageFromRuntime"](message);
            }
        };
    }
}
module.exports = MessageChannel;