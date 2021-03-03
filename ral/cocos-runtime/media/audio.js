import _CREATE_INNER_AUDIO_CONTEXT from "../../inner-context"
import _UTIL from "../../util"

let _rt = loadRuntime();

_UTIL.exportTo("AudioEngine", _rt, ral);
_UTIL.exportTo("createInnerAudioContext", _rt, ral, function () {
    if (_rt.AudioEngine) {
        ral.createInnerAudioContext = function () {
            return _CREATE_INNER_AUDIO_CONTEXT(_rt.AudioEngine);
        };
    }
});