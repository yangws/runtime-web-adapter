import HTMLElement from './HTMLElement'
import MediaError from './MediaError'
import _weakMap from "./util/WeakMap"

export default class HTMLMediaElement extends HTMLElement {
    static get NETWORK_EMPTY() {
        return 0;
    }
    static get NETWORK_IDLE() {
        return 1;
    }
    static get NETWORK_LOADING() {
        return 2;
    }
    static get NETWORK_NO_SOURCE() {
        return 3;
    };

    static get HAVE_NOTHING() {
        return 0;
    }

    static get HAVE_METADATA() {
        return 1;
    }

    static get HAVE_CURRENT_DATA() {
        return 2;
    }

    static get HAVE_FUTURE_DATA() {
        return 3;
    }

    static get HAVE_ENOUGH_DATA() {
        return 4;
    }

    audioTracks = undefined;
    autoplay = false;
    controller = null;
    controls = false;
    crossOrigin = null;
    defaultMuted = false;
    defaultPlaybackRate = 1.0;
    mediaGroup = undefined;
    mediaKeys = null;
    mozAudioChannelType = undefined;
    muted = false;
    networkState = HTMLMediaElement.NETWORK_EMPTY;
    playbackRate = 1;
    preload = "auto";
    loop = false;

    constructor(url, type) {
        super(type);

        Object.assign(_weakMap.get(this), {
            buffered: undefined,
            currentSrc: url || "",
            duration: 0,
            ended: false,
            error: null,
            initialTime: 0,
            paused: true,
            readyState: HTMLMediaElement.HAVE_NOTHING,
            value: 1.0,
            currentTime: 0
        });

        this.addEventListener("ended", function () {
            _weakMap.get(this).ended = true;
        });
        this.addEventListener("play", function () {
            _weakMap.get(this).ended = false;
            _weakMap.get(this).error = null;
            _weakMap.get(this).paused = false;
        });
        this.addEventListener("error", function () {
            _weakMap.get(this).error = true;
            _weakMap.get(this).ended = true;
            _weakMap.get(this).paused = false;
        });
    }

    get currentTime() {
        return _weakMap.get(this).currentTime;
    }

    set currentTime(value) {
        _weakMap.get(this).currentTime = value;
    }

    get src() {
        return _weakMap.get(this).currentSrc;
    }

    set src(value) {
        _weakMap.get(this).currentSrc = value;
    }

    get buffered() {
        return _weakMap.get(this).buffered;
    }

    get currentSrc() {
        return _weakMap.get(this).currentSrc;
    }

    get duration() {
        return _weakMap.get(this).duration;
    }

    get ended() {
        return _weakMap.get(this).ended;
    }

    get error() {
        return _weakMap.get(this).error;
    }

    get initialTime() {
        return _weakMap.get(this).initialTime;
    }

    get paused() {
        return _weakMap.get(this).paused;
    }

    get volume() {
        return _weakMap.get(this).volume;
    }

    set volume(value) {
        _weakMap.get(this).volume = value;
    }

    canPlayType(mediaType) {
        return 'maybe';
    }

    captureStream() {
    }

    fastSeek() {
    }

    load() {
    }

    pause() {
    }

    play() {
    }
}