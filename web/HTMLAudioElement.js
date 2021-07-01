import HTMLMediaElement from './HTMLMediaElement';
import Event from './Event';
import _weakMap from "./util/WeakMap"

window.ral = window.ral || {};

const _audio_valid_src = function (src) {
    return typeof src === "string" && src !== "";
};

export default class HTMLAudioElement extends HTMLMediaElement {
    constructor(url) {
        super(url, 'AUDIO')
        let innerAudioContext = ral.createInnerAudioContext();

        // Add callback function to dispatch related event
        innerAudioContext.onCanplay(function () {
            _weakMap.get(this).duration = innerAudioContext.duration;
            this.dispatchEvent(new Event("canplay"));
            this.dispatchEvent(new Event("canplaythrough"));
            // The duration attribute has just been updated.
            this.dispatchEvent(new Event("durationchange"));
            // The user agent has just determined the duration and dimensions of the media resource and the text tracks are ready.
            this.dispatchEvent(new Event("loadedmetadata"));
            // The user agent can render the media data at the current playback position for the first time.
            this.dispatchEvent(new Event("loadeddata"));
        }.bind(this));

        innerAudioContext.onPlay(function () {
            // The element is no longer paused. Fired after the play() method has returned, or when the autoplay attribute has caused playback to begin.
            this.dispatchEvent(new Event("play"));
            // Playback is ready to start after having been paused or delayed due to lack of media data.
            this.dispatchEvent(new Event("playing"));
        }.bind(this));

        innerAudioContext.onPause(function () {
            // The element has been paused. Fired after the pause() method has returned.
            this.dispatchEvent(new Event("pause"));
        }.bind(this));

        innerAudioContext.onEnded(function () {
            // Playback has stopped because the end of the media resource was reached.
            this.dispatchEvent(new Event("ended"));
        }.bind(this));

        innerAudioContext.onError(function () {
            _weakMap.get(this).duration = NaN;
            // An error occurs while fetching the media data or the type of the resource is not supported media format.
            this.dispatchEvent(new Event("error"));
            // The emptied event is fired when the media has become empty;
            this.dispatchEvent(new Event("emptied"));
        }.bind(this));

        innerAudioContext.onWaiting(function () {
            // Playback has stopped because the next frame is not available, but the user agent expects that frame to become available in due course.
            this.dispatchEvent(new Event("waiting"));
        }.bind(this));

        innerAudioContext.onSeeked(function () {
            // The seeking IDL attribute changed to false after the current playback position was changed.
            this.dispatchEvent(new Event("seeked"));
        }.bind(this));

        innerAudioContext.onSeeking(function () {
            // The seeking IDL attribute changed to true, and the user agent has started seeking to a new position.
            this.dispatchEvent(new Event("seeking"));
        }.bind(this));

        innerAudioContext.onTimeUpdate(function () {
            // The current playback position changed as part of normal playback or in an especially interesting way, for example discontinuously.
            this.dispatchEvent(new Event("timeupdate"));
        }.bind(this));

        innerAudioContext.src = url;
        _weakMap.get(this).innerAudioContext = innerAudioContext;
        _weakMap.get(this).duration = NaN;
    }

    get currentTime() {
        return _weakMap.get(this).innerAudioContext.currentTime;
    }

    set currentTime(value) {
        _weakMap.get(this).innerAudioContext.seek(value);
    }

    get duration() {
        return _weakMap.get(this).duration;
    }

    get loop() {
        return innerAudioContext = _weakMap.get(this).innerAudioContext.loop;
    }

    set loop(value) {
        _weakMap.get(this).innerAudioContext.loop = value;
    }

    get volume() {
        // Gets the volume of media
        return _weakMap.get(this).innerAudioContext.volume;
    }

    set volume(value) {
        // Sets the volume at which the media will be played
        _weakMap.get(this).innerAudioContext.volume = value;
        // Either the volume attribute or the muted attribute has changed.Fired after the relevant attribute's setter has returned.
        this.dispatchEvent(new Event("volumechange"));
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
        // Indicates the URL of a media resource to use in the element.
        return _weakMap.get(this).innerAudioContext.src;
    }

    set src(value) {
        _weakMap.get(this).innerAudioContext.src = value;
    }

    load() {
        // Reset the media element and restart selecting the media resource
        _weakMap.get(this).innerAudioContext.stop();
    }

    pause() {
        // Method will pause playback of the media, if the media is already in a paused state this method will have no effect.
        _weakMap.get(this).innerAudioContext.pause();
    }

    play() {
        _weakMap.get(this).innerAudioContext.play();
        // The user agent begins looking for media data, as part of the resource selection algorithm.
        this.dispatchEvent(new Event("loadstart"));
        // The user agent is fetching media data.
        this.dispatchEvent(new Event("progress"));
    }
}
