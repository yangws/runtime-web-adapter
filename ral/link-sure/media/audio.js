import _CREATE_INNER_AUDIO_CONTEXT from "../../inner-context"
import _UTIL from "../../util"

_UTIL.exportTo("AudioEngine", wuji, jsb);
_UTIL.exportTo("createInnerAudioContext", wuji, jsb, function () {
    if (wuji.AudioEngine) {
        jsb.createInnerAudioContext = function () {
            return _CREATE_INNER_AUDIO_CONTEXT(wuji.AudioEngine);
        };
    }
});