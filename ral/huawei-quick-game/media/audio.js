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
});