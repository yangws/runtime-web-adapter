import _CREATE_INNER_AUDIO_CONTEXT from "../../inner-context"
import _UTIL from "../../util"

_UTIL.exportTo("AudioEngine", hbs, jsb);
_UTIL.exportTo("createInnerAudioContext", hbs, jsb, function () {
    if (_rt.AudioEngine) {
        jsb.createInnerAudioContext = function () {
            return _CREATE_INNER_AUDIO_CONTEXT(hbs.AudioEngine);
        };
    }
});