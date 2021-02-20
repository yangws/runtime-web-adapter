import _CREATE_INNER_AUDIO_CONTEXT from "../../inner-context"
import _UTIL from "../../util"

_UTIL.exportTo("AudioEngine", qg, jsb);
_UTIL.exportTo("createInnerAudioContext", qg, jsb, function () {
    if (_rt.AudioEngine) {
        jsb.createInnerAudioContext = function () {
            return _CREATE_INNER_AUDIO_CONTEXT(qg.AudioEngine);
        };
    }
});