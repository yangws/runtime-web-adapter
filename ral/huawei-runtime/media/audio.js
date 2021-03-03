import _CREATE_INNER_AUDIO_CONTEXT from "../../inner-context"
import _UTIL from "../../util"

_UTIL.exportTo("AudioEngine", hbs, ral);
_UTIL.exportTo("createInnerAudioContext", hbs, ral, function () {
    if (_rt.AudioEngine) {
        ral.createInnerAudioContext = function () {
            return _CREATE_INNER_AUDIO_CONTEXT(hbs.AudioEngine);
        };
    }
});