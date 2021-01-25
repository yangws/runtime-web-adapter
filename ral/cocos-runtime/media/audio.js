import _CREATE_INNER_AUDIO_CONTEXT from "../../inner-context"
import _UTIL from "../../util"

let _rt = loadRuntime();

_UTIL.exportTo("AudioEngine", _rt, jsb);
_UTIL.exportTo("createInnerAudioContext", _rt, jsb, function () {
    if (_rt.AudioEngine) {
        jsb.createInnerAudioContext = function () {
            return _CREATE_INNER_AUDIO_CONTEXT(_rt.AudioEngine);
        };
    }
});