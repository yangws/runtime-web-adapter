/**
 * 适配 creator2.x 游戏在IOS 设备上无法正常运行的问题
 * 原因: 在 IOS 设备上，引擎逻辑在调用 _initFrameSize 使用到 cc.game.frame.clientWidth (或 clientHeight)，
 * frame 为 null 导致崩溃。
 *
 * 基于在新版插件的适配逻辑，引擎初始化 cc.game.frame 时值为 null
 * 原因:在 jsb-compatible 的逻辑中，cc.game.frame 通过 DOM 中 node 的 parentNode 属性可以获取到 window.__canvas,
 * 新版 web 层基于 web 标准实现，node 若未添加父节点的 parentNode 将返回 null
 *
 * 基于引擎中的需求, cc.game.frame 仅需模拟一个web 中的 frame，保证访问到该 object 的数据（clientWidth/ClientHeight）正确即可
 * clientWidth/ClientHeight 与游戏窗口的宽高一致。
 */
const _initRenderer = cc.game._initRenderer;
cc.game._initRenderer = function () {
    _initRenderer.call(cc.game);
    if (!cc.game.frame) {
        cc.game.frame = window.__canvas;
    }
}