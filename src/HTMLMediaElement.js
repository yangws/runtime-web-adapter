import HTMLElement from './HTMLElement'
import MediaError from './MediaError'
import _weakMap from "./util/WeakMap"

const HAVE_NOTHING = 0;
const HAVE_METADATA = 1;
const HAVE_CURRENT_DATA = 2;
const HAVE_FUTURE_DATA = 3;
const HAVE_ENOUGH_DATA = 4;

export default class HTMLMediaElement extends HTMLElement {
    audioTracks = undefined;
    autoplay = false;
    controller = null;
    controls = false;
    crossOrigin = null;
    currentTime = 0;
    defaultMuted = false;
    defaultPlaybackRate = 1.0;
    mediaGroup = undefined;
    mediaKeys = null;
    mozAudioChannelType = undefined;
    muted = false;
    networkState = 0;
    playbackRate = 1;
    preload = "auto";
    volume = 1.0;
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
            readyState: HAVE_NOTHING,
        });
    }

    get src() {
        return _weakMap.get(this).currentSrc;
    }

    set src(value) {
        _weakMap.get(this).currentSrc = value;
        if (this.preload === "auto") {
            this.load();
        }
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
