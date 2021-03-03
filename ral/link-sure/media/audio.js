import _CREATE_INNER_AUDIO_CONTEXT from "../../inner-context"
import _UTIL from "../../util"

_UTIL.exportTo("AudioEngine", wuji, ral);
_UTIL.exportTo("createInnerAudioContext", wuji, ral, function () {
    if (wuji.AudioEngine) {
        ral.createInnerAudioContext = function () {
            return _CREATE_INNER_AUDIO_CONTEXT(wuji.AudioEngine);
        };
    }
});