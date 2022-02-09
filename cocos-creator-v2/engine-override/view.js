/**
 * 适配 creator2.x 游戏在IOS 设备上无法正常运行的问题
 * 原因: 在 IOS 设备上，引擎逻辑在调用 _initFrameSize 会使用到 cc.game.frame.clientWidth (或 clientHeight)
 * 但传入的 cc.game.frame 可能为 null， 故这里在初始化时手动为 cc.game.frame 相关属性赋值
 */
const _initFrameSize = cc.view._initFrameSize;
cc.view._initFrameSize = function () {
    if (!cc.game.frame) {
        cc.game.frame = {}
    }
    cc.game.frame.clientWidth = window.innerWidth;
    cc.game.frame.clientHeight = window.innerHeight;
    _initFrameSize.call(cc.view);
}