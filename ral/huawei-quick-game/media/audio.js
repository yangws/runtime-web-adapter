import _CREATE_INNER_AUDIO_CONTEXT from "../../inner-context"
import _UTIL from "../../util"

_UTIL.exportTo("AudioEngine", hbs, ral);
_UTIL.exportTo("createInnerAudioContext", hbs, ral, function () {
    if (hbs.AudioEngine) {
        ral.createInnerAudioContext = function () {
            return _CREATE_INNER_AUDIO_CONTEXT(hbs.AudioEngine);
        };
    }
}, function () {
    let ctx = ral.createInnerAudioContext();
    let prototype = ctx.__proto__.constructor.prototype;
    let desc = Object.getOwnPropertyDescriptor(prototype, "currentTime");
    if (desc) {
        let get = desc.get;
        Object.defineProperty(prototype, "currentTime", {
            get() {
                return parseFloat(get.call(this));
            }
        });
    }
    /**
     * 适配华为快游戏平台上的 innerAudioContext 在(set src 之后, play 之前 || stop 状态下) seek 不会生效问题
    */
    const _weakMap = new WeakMap();
    let oldSeek = prototype.seek;
    let oldPlay = prototype.play;
    prototype.seek = function (position) {
        if (this.paused) {
            // playing 状态下不用再使用 play 方法 seek 就会生效, 所以仅 stopped 和 paused 状态时保存
            _weakMap.set(this, {
                position: position
            });
        }
        oldSeek.call(this, position);
    }
    prototype.play = function () {
        oldPlay.call(this);
        let privateThis = _weakMap.get(this);
        if (privateThis && privateThis.position >= 0) {
            oldSeek.call(this, privateThis.position);
            privateThis.position = -1;
        }
    }

});