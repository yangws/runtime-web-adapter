import HTMLMediaElement from './HTMLMediaElement';
import Event from './Event';
import _weakMap from "./util/WeakMap"

const _ERROR = -1;
const _INITIALIZING = 0;
const _PLAYING = 1;
const _PAUSE = 2;

const _audio_valid_id = function (audioID) {
    return typeof audioID === "number";
};

const _audio_valid_src = function (src) {
    return typeof src === "string" && src !== "";
};

export default class HTMLAudioElement extends HTMLMediaElement {
    constructor(url) {
        super(url, 'AUDIO');
    }

    get currentTime() {
        let audioID = _weakMap.get(this).audioID;
        if (_audio_valid_id(audioID)) {
            return ral.AudioEngine.getCurrentTime(audioID);
        } else {
            return super.currentTime;
        }
    }

    set currentTime(value) {
        let audioID = _weakMap.get(this).audioID;
        if (_audio_valid_id(audioID)) {
            ral.AudioEngine.setCurrentTime(audioID, value);
        }
        super.currentTime = value;
    }

    get duration() {
        let audioID = _weakMap.get(this).audioID;
        if (_audio_valid_id(audioID)) {
            return ral.AudioEngine.getDuration(audioID);
        } else {
            return super.duration;
        }
    }

    get loop() {
        let audioID = _weakMap.get(this).audioID;
        if (_audio_valid_id(audioID)) {
            return ral.AudioEngine.isLoop(audioID);
        } else {
            return super.loop;
        }
    }

    set loop(value) {
        let audioID = _weakMap.get(this).audioID;
        if (_audio_valid_id(audioID)) {
            ral.AudioEngine.setLoop(audioID, value);
        }
        super.loop = value;
    }

    get volume() {
        let audioID = _weakMap.get(this).audioID;
        if (_audio_valid_id(audioID)) {
            return ral.AudioEngine.getVolume(audioID);
        } else {
            return super.volume;
        }
    }

    set volume(value) {
        let audioID = _weakMap.get(this).audioID;
        if (_audio_valid_id(audioID)) {
            ral.AudioEngine.setVolume(audioID, value);
        }
        super.volume = value;
    }

    canPlayType(mediaType = '') {
        if (typeof mediaType !== 'string') {
            return ''
        }

        if (mediaType.indexOf('audio/mpeg') > -1 || mediaType.indexOf('audio/mp4')) {
            return 'probably'
        }
        return ''
    }

    get src() {
        return super.src;
    }

    set src(value) {
        let privateThis = _weakMap.get(this);
        // 停止有效的音频
        let audioID = privateThis.audioID;
        if (_audio_valid_id(audioID)) {
            ral.AudioEngine.stop(audioID);
            privateThis.audioID = null;
        }
        super.src = value;
        if (_audio_valid_src(value)) {
            if (this.autoplay || this.preload === "auto") {
                this.load();
            }
        } else {
            if (value !== "") {
                console.error("invalid src: ", value);
            }
            this.dispatchEvent(new Event("error"));
        }
    }

    load() {
        let privateThis = _weakMap.get(this);
        // 停止有效的音频
        let audioID = privateThis.audioID;
        if (_audio_valid_id(audioID)) {
            ral.AudioEngine.stop(audioID);
            privateThis.audioID = null;
        }

        let src = this.src;
        if (_audio_valid_src(src)) {
            this.dispatchEvent({ type: "loadstart" });
            let self = this;
            ral.AudioEngine.preload(this.src, function () {
                // 已经预加载过的，不是异步回调，所以加上 setTimeout
                setTimeout(function () {
                    // 异步过程，src 可能发生了变化
                    if (self.src === src) {
                        if (self.autoplay) {
                            self.play();
                        }
                        self.dispatchEvent(new Event("loadedmetadata"));
                        self.dispatchEvent(new Event("loadeddata"));
                        self.dispatchEvent(new Event("canplay"));
                        self.dispatchEvent(new Event("canplaythrough"));
                    }
                });
            });
        } else {
            if (src !== "") {
                console.error("invalid src: ", src);
            }
            this.dispatchEvent(new Event("error"));
        }
    }

    pause() {
        let audioID = _weakMap.get(this).audioID;
        if (_audio_valid_id(audioID)) {
            let state = ral.AudioEngine.getState(audioID);
            if (state === _INITIALIZING || state === _PLAYING) {
                ral.AudioEngine.pause(audioID);
                this.dispatchEvent(new Event("pause"));
            }
        }
    }

    play() {
        if (!_audio_valid_src(this.src)) {
            this.dispatchEvent({ type: "emptied" });
            console.error("Audio play: please define src before play");
            return;
        }

        let audioID = _weakMap.get(this).audioID;
        if (_audio_valid_id(audioID)) {
            let state = ral.AudioEngine.getState(audioID);
            switch (state) {
                case _PAUSE: {
                    ral.AudioEngine.resume(audioID);

                    this.dispatchEvent(new Event("play"));
                    this.dispatchEvent(new Event("playing"));
                    return;
                }
                case _PLAYING: {
                    this.currentTime = 0;
                    return;
                }
                case _INITIALIZING: {
                    return;
                }
                case _ERROR:
                default: {
                    // do nothing
                }
            }
        }
        // need call play function
        let self = this;
        audioID = ral.AudioEngine.play(this.src, this.loop, this.volume);
        if (audioID === -1) {
            setTimeout(function () {
                self.dispatchEvent(new Event("error"));
                self.dispatchEvent(new Event("ended"));
            });
            return;
        }
        let currentTime = this.currentTime;
        if (typeof currentTime === "number" && currentTime > 0) {
            ral.AudioEngine.setCurrentTime(audioID, currentTime);
        }

        this.dispatchEvent(new Event("play"));
        ral.AudioEngine.setFinishCallback(audioID, function () {
            _weakMap.get(self).audioID = null;
            self.dispatchEvent(new Event("ended"));
        });
        if (typeof ral.AudioEngine.setErrorCallback !== "undefined") {
            ral.AudioEngine.setErrorCallback(audioID, function () {
                _weakMap.get(self).audioID = null;
                self.dispatchEvent(new Event("error"));
            });
        }
        if (typeof ral.AudioEngine.setWaitingCallback !== "undefined") {
            ral.AudioEngine.setWaitingCallback(audioID, function () {
                self.dispatchEvent(new Event("waiting"));
            });
        }
        if (typeof ral.AudioEngine.setCanPlayCallback === "function") {
            ral.AudioEngine.setCanPlayCallback(audioID, function () {
                self.dispatchEvent(new Event("canplay"));
            });
        }
        _weakMap.get(this).audioID = audioID;
    }
}
