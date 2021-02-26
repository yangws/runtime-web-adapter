const _CANPLAY_CALLBACK = "canplayCallbacks";
const _ENDED_CALLBACK = "endedCallbacks";
const _ERROR_CALLBACK = "errorCallbacks";
const _PAUSE_CALLBACK = "pauseCallbacks";
const _PLAY_CALLBACK = "playCallbacks";
const _SEEKED_CALLBACK = "seekedCallbacks";
const _SEEKING_CALLBACK = "seekingCallbacks";
const _STOP_CALLBACK = "stopCallbacks";
const _TIME_UPDATE_CALLBACK = "timeUpdateCallbacks";
const _WAITING_CALLBACK = "waitingCallbacks";
const _ERROR_CODE = {
    ERROR_SYSTEM: 10001,
    ERROR_NET: 10002,
    ERROR_FILE: 10003,
    ERROR_FORMAT: 10004,
    ERROR_UNKNOWN: -1
};
const _STATE = {
    ERROR: -1,
    INITIALIZING: 0,
    PLAYING: 1,
    PAUSED: 2
};

let _audioEngine = undefined;

const _weakMap = new WeakMap();

/**
 * 取消监听
 * @param target    {InnerAudioContext} 监听目标
 * @param type      {string}            监听类型
 * @param callback  {function}          监听回调函数
 * @returns         {number}            -1： 错误；0：操作无效；>0 取消前的监听个数
 * @private
 */
const _offCallback = function (target, type, callback) {
    let privateThis = _weakMap.get(target);
    if (typeof callback !== "function" || !privateThis) {
        return -1;
    }
    let callbacks = privateThis[type] || [];
    for (let i = 0, len = callbacks.length; i < len; ++i) {
        if (callback === callbacks[i]) {
            callbacks.splice(i, 1);
            return callback.length + 1;
        }
    }
    return 0;
};
/**
 * 添加监听
 * @param target    {InnerAudioContext} 监听目标
 * @param type      {string}            监听类型
 * @param callback  {function}          监听回调函数
 * @returns         {number}            -1： 错误；0：操作无效；>0 添加后的监听个数
 * @private
 */
const _onCallback = function (target, type, callback) {
    let privateThis = _weakMap.get(target);
    if (typeof callback !== "function" || !privateThis) {
        return -1;
    }
    let callbacks = privateThis[type];
    if (!callbacks) {
        callbacks = privateThis[type] = [callback];
    } else {
        for (let i = 0, len = callbacks.length; i < len; ++i) {
            if (callback === callbacks[i]) {
                return 0;
            }
        }
        callbacks.push(callback);
    }
    return callbacks.length;
};
/**
 * 向监听者推送消息
 * @param target {InnerAudioContext} 推送目标
 * @param type   {string}            推送类型
 * @param args   {array}             推送参数
 * @private
 */
const _dispatchCallback = function (target, type, args = []) {
    let privateThis = _weakMap.get(target);
    if (privateThis) {
        let callbacks = privateThis[type] || [];
        for (let i = 0, len = callbacks.length; i < len; ++i) {
            callbacks[i].apply(target, args);
        }
    }
};

function InnerAudioContext() {
    /**
     * 开始播放的位置（单位：s），默认为 0
     * @type {number}
     */
    this.startTime = 0;
    /**
     * 是否自动开始播放，默认为 false
     * @type {boolean}
     */
    this.autoplay = false;

    _weakMap.set(this, {
        src: "",
        volume: 1,
        loop: false
    });

    /**
     * 是否循环播放，默认为 false
     * @type {boolean}
     */
    Object.defineProperty(this, "loop", {
        set(value) {
            value = !!value;
            let privateThis = _weakMap.get(this);
            if (privateThis) {
                let audioID = privateThis.audioID;
                if (typeof audioID === "number" && audioID >= 0) {
                    _audioEngine.setLoop(audioID, value);
                }
                privateThis.loop = value;
            }
        },
        get() {
            let privateThis = _weakMap.get(this);
            return privateThis ? privateThis.loop : false;
        }
    });
    /**
     * 音量。范围 0~1。默认为 1
     * @type {number}
     */
    Object.defineProperty(this, "volume", {
        set(value) {
            if (typeof value === "number") {
                if (value < 0) {
                    value = 0;
                } else if (value > 1) {
                    value = 1;
                }
            } else {
                value = 1;
            }
            let privateThis = _weakMap.get(this);
            if (privateThis) {
                let audioID = privateThis.audioID;
                if (typeof audioID === "number" && audioID >= 0) {
                    _audioEngine.setVolume(audioID, value);
                }
                privateThis.volume = value;
            }
        },
        get() {
            let privateThis = _weakMap.get(this);
            return privateThis ? privateThis.volume : 1;
        }
    });
    /**
     * @param value {string} 音频资源的地址
     */
    Object.defineProperty(this, "src", {
        set(value) {
            let privateThis = _weakMap.get(this);
            if (!privateThis) {
                return;
            }
            let oldSrc = privateThis.src;
            privateThis.src = value;
            if (typeof value === "string") {
                let audioID = privateThis.audioID;
                if (typeof audioID === "number" &&
                    audioID >= 0 &&
                    _audioEngine.getState(audioID) === _STATE.PAUSED &&
                    oldSrc !== value) {
                    // 音频暂停中 且 设置的 音频资源的地址 和 原本的不一致，那么，停止当前的音频
                    _audioEngine.stop(audioID);
                    privateThis.audioID = -1;
                }
                let self = this;
                _audioEngine.preload(value, function () {
                    // 已经预加载过的，不是异步回调，所以加上 setTimeout
                    setTimeout(function () {
                        // 异步过程，src 可能发生了变化
                        if (self.src === value) {
                            _dispatchCallback(self, _CANPLAY_CALLBACK);
                            if (self.autoplay) {
                                self.play();
                            }
                        }
                    });
                });
            }
        },

        /**
         * @returns {string} 音频资源的地址
         */
        get() {
            let privateThis = _weakMap.get(this);
            return privateThis ? privateThis.src : "";
        }
    });
    /**
     * 当前音频的长度（单位 s）。只有在当前有合法的 src 时返回（只读）
     * @returns {number}
     */
    Object.defineProperty(this, "duration", {
        get() {
            let privateThis = _weakMap.get(this);
            if (privateThis) {
                let audioID = privateThis.audioID;
                if (typeof audioID === "number" && audioID >= 0) {
                    return _audioEngine.getDuration(audioID);
                }
            }
            return NaN;
        },
        set() {
        }
    });

    /**
     * 当前音频的播放位置（单位 s）。只有在当前有合法的 src 时返回，时间保留小数点后 6 位（只读）
     */
    Object.defineProperty(this, "currentTime", {
        get() {
            let privateThis = _weakMap.get(this);
            if (privateThis) {
                let audioID = privateThis.audioID;
                if (typeof audioID === "number" && audioID >= 0) {
                    return _audioEngine.getCurrentTime(audioID);
                }
            }
            return 0;
        },
        set() {
        }
    });

    /**
     * 当前是是否暂停或停止状态（只读）
     */
    Object.defineProperty(this, "paused", {
        get() {
            let privateThis = _weakMap.get(this);
            if (privateThis) {
                let audioID = privateThis.audioID;
                if (typeof audioID === "number" && audioID >= 0) {
                    return _audioEngine.getState(audioID) === _STATE.PAUSED;
                }
            }
            return true;
        },
        set() {
        }
    });

    /**
     * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲（只读）
     */
    Object.defineProperty(this, "buffered", {
        get() {
            let privateThis = _weakMap.get(this);
            if (privateThis) {
                let audioID = privateThis.audioID;
                if (typeof audioID === "number" && audioID >= 0) {
                    return _audioEngine.getBuffered(audioID);
                }
            }
            return 0;
        },
        set() {
        }
    });
}

let _prototype = InnerAudioContext.prototype;
/**
 * 销毁当前实例
 */
_prototype.destroy = function () {
    let privateThis = _weakMap.get(this);
    if (privateThis) {
        let audioID = privateThis.audioID;
        if (typeof audioID === "number" && audioID >= 0) {
            _audioEngine.stop(audioID);
            privateThis.audioID = -1;
            _dispatchCallback(this, _STOP_CALLBACK);
        }
        privateThis[_CANPLAY_CALLBACK] = [];
        privateThis[_ENDED_CALLBACK] = [];
        privateThis[_ERROR_CALLBACK] = [];
        privateThis[_PAUSE_CALLBACK] = [];
        privateThis[_PLAY_CALLBACK] = [];
        privateThis[_SEEKED_CALLBACK] = [];
        privateThis[_SEEKING_CALLBACK] = [];
        privateThis[_STOP_CALLBACK] = [];
        privateThis[_TIME_UPDATE_CALLBACK] = [];
        privateThis[_WAITING_CALLBACK] = [];
        clearInterval(privateThis.intervalID);
    }
};

/**
 * 播放
 */
_prototype.play = function () {
    let privateThis = _weakMap.get(this);
    if (!privateThis) {
        return;
    }
    let src = privateThis.src;
    let audioID = privateThis.audioID;

    if (typeof src !== "string" || src === "") {
        // 无效的路径
        _dispatchCallback(this, _ERROR_CALLBACK, [{
            errMsg: "invalid src",
            errCode: _ERROR_CODE.ERROR_FILE
        }]);
        return;
    }
    if (typeof audioID === "number" && audioID >= 0) {
        if (_audioEngine.getState(audioID) === _STATE.PAUSED) {
            _audioEngine.resume(audioID);
            _dispatchCallback(this, _PLAY_CALLBACK);
            return;
        } else {
            // 音频正在播放
            _audioEngine.stop(audioID);
            privateThis.audioID = -1;
        }
    }
    audioID = _audioEngine.play(src, this.loop, this.volume);
    if (audioID === -1) {
        _dispatchCallback(this, _ERROR_CALLBACK, [{
            errMsg: "unknown",
            errCode: _ERROR_CODE.ERROR_UNKNOWN
        }]);
        return;
    }
    privateThis.audioID = audioID;
    if (typeof this.startTime === "number" && this.startTime > 0) {
        // 设置当前的音频时间
        _audioEngine.setCurrentTime(audioID, this.startTime);
    }
    _dispatchCallback(this, _WAITING_CALLBACK);

    // 注册监听事件
    let self = this;
    _audioEngine.setCanPlayCallback(audioID, function () {
        if (src === self.src) {
            _dispatchCallback(self, _CANPLAY_CALLBACK);
            _dispatchCallback(self, _PLAY_CALLBACK);
        }
    });
    _audioEngine.setWaitingCallback(audioID, function () {
        if (src === self.src) {
            _dispatchCallback(self, _WAITING_CALLBACK);
        }
    });
    _audioEngine.setErrorCallback(audioID, function () {
        if (src === self.src) {
            privateThis.audioID = -1;
            _dispatchCallback(self, _ERROR_CALLBACK);
        }
    });
    _audioEngine.setFinishCallback(audioID, function () {
        if (src === self.src) {
            privateThis.audioID = -1;
            _dispatchCallback(self, _ENDED_CALLBACK);
        }
    });
};

/**
 * 暂停。暂停后的音频再播放会从暂停处开始播放
 */
_prototype.pause = function () {
    let privateThis = _weakMap.get(this);
    if (privateThis) {
        let audioID = privateThis.audioID;
        if (typeof audioID === "number" && audioID >= 0) {
            _audioEngine.pause(audioID);
            _dispatchCallback(this, _PAUSE_CALLBACK);
        }
    }
};

/**
 * 跳转到指定位置
 * @param position {number} 跳转的时间，单位 s。精确到小数点后 3 位，即支持 ms 级别精确度
 */
_prototype.seek = function (position) {
    let privateThis = _weakMap.get(this);
    if (privateThis && typeof position === "number" && position >= 0) {
        let audioID = privateThis.audioID;
        if (typeof audioID === "number" && audioID >= 0) {
            _audioEngine.setCurrentTime(audioID, position);
            _dispatchCallback(this, _SEEKING_CALLBACK);
            _dispatchCallback(this, _SEEKED_CALLBACK);
        }
    }
};

/**
 * 停止。停止后的音频再播放会从头开始播放。
 */
_prototype.stop = function () {
    let privateThis = _weakMap.get(this);
    if (privateThis) {
        let audioID = privateThis.audioID;
        if (typeof audioID === "number" && audioID >= 0) {
            _audioEngine.stop(audioID);
            privateThis.audioID = -1;
            _dispatchCallback(this, _STOP_CALLBACK);
        }
    }
};

/**
 * 取消监听音频进入可以播放状态的事件
 * @param callback {function} 音频进入可以播放状态的事件的回调函数
 */
_prototype.offCanplay = function (callback) {
    _offCallback(this, _CANPLAY_CALLBACK, callback);
};

/**
 * 取消监听音频自然播放至结束的事件
 * @param callback {function} 音频自然播放至结束的事件的回调函数
 */
_prototype.offEnded = function (callback) {
    _offCallback(this, _ENDED_CALLBACK, callback);
};

/**
 * 取消监听音频播放错误事件
 * @param callback {function} 音频播放错误事件的回调函数
 */
_prototype.offError = function (callback) {
    _offCallback(this, _ERROR_CALLBACK, callback);
};

/**
 * 取消监听音频暂停事件
 * @param callback {function} 音频暂停事件的回调函数
 */
_prototype.offPause = function (callback) {
    _offCallback(this, _PAUSE_CALLBACK, callback);
};

/**
 * 取消监听音频播放事件
 * @param callback {function} 音频播放事件的回调函数
 */
_prototype.offPlay = function (callback) {
    _offCallback(this, _PLAY_CALLBACK, callback);
};

/**
 * 取消监听音频完成跳转操作的事件
 * @param callback {function} 音频完成跳转操作的事件的回调函数
 */
_prototype.offSeeked = function (callback) {
    _offCallback(this, _SEEKED_CALLBACK, callback);
};

/**
 * 取消监听音频进行跳转操作的事件
 * @param callback {function} 音频进行跳转操作的事件的回调函数
 */
_prototype.offSeeking = function (callback) {
    _offCallback(this, _SEEKING_CALLBACK, callback);
};

/**
 * 取消监听音频停止事件
 * @param callback {function} 音频停止事件的回调函数
 */
_prototype.offStop = function (callback) {
    _offCallback(this, _STOP_CALLBACK, callback);
};

/**
 * 取消监听音频播放进度更新事件
 * @param callback {function} 音频播放进度更新事件的回调函数
 */
_prototype.offTimeUpdate = function (callback) {
    let result = _offCallback(this, _TIME_UPDATE_CALLBACK, callback);
    if (result === 1) {
        clearInterval(_weakMap.get(this).intervalID);
    }
};

/**
 * 取消监听音频加载中事件
 * @param callback {function} 音频加载中事件的回调函数
 */
_prototype.offWaiting = function (callback) {
    _offCallback(this, _WAITING_CALLBACK, callback);
};

/**
 * 监听音频进入可以播放状态的事件。但不保证后面可以流畅播放
 * @param callback {function} 音频进入可以播放状态的事件的回调函数
 */
_prototype.onCanplay = function (callback) {
    _onCallback(this, _CANPLAY_CALLBACK, callback);
};

/**
 * 监听音频自然播放至结束的事件
 * @param callback {function} 音频自然播放至结束的事件的回调函数
 */
_prototype.onEnded = function (callback) {
    _onCallback(this, _ENDED_CALLBACK, callback);
};

/**
 * 监听音频播放错误事件
 * @param callback {function} 音频播放错误事件的回调函数
 */
_prototype.onError = function (callback) {
    _onCallback(this, _ERROR_CALLBACK, callback);
};

/**
 * 监听音频暂停事件
 * @param callback {function} 音频暂停事件的回调函数
 */
_prototype.onPause = function (callback) {
    _onCallback(this, _PAUSE_CALLBACK, callback);
};

/**
 * 监听音频播放事件
 * @param callback {function} 音频播放事件的回调函数
 */
_prototype.onPlay = function (callback) {
    _onCallback(this, _PLAY_CALLBACK, callback);
};

/**
 * 监听音频完成跳转操作的事件
 * @param callback {function} 音频完成跳转操作的事件的回调函数
 */
_prototype.onSeeked = function (callback) {
    _onCallback(this, _SEEKED_CALLBACK, callback);
};

/**
 * 监听音频进行跳转操作的事件
 * @param callback {function} 音频进行跳转操作的事件的回调函数
 */
_prototype.onSeeking = function (callback) {
    _onCallback(this, "seekingCallbacks", callback);
};

/**
 * 监听音频停止事件
 * @param callback {function} 音频停止事件的回调函数
 */
_prototype.onStop = function (callback) {
    _onCallback(this, _STOP_CALLBACK, callback);
};

/**
 * 监听音频播放进度更新事件
 * @param callback {function} 音频播放进度更新事件的回调函数
 */
_prototype.onTimeUpdate = function (callback) {
    let result = _onCallback(this, _TIME_UPDATE_CALLBACK, callback);
    if (result === 1) {
        let privateThis = _weakMap.get(this);
        let self = this;
        let intervalID = setInterval(function () {
            let privateThis = _weakMap.get(self);
            if (privateThis) {
                let audioID = privateThis.audioID;
                if (typeof audioID === "number" &&
                    audioID >= 0 &&
                    _audioEngine.getState(audioID) === _STATE.PLAYING) {
                    _dispatchCallback(self, _TIME_UPDATE_CALLBACK);
                }
            } else {
                clearInterval(intervalID);
            }
        }, 500);
        privateThis.intervalID = intervalID
    }
};

/**
 * 监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发
 * @param callback {function} 音频加载中事件的回调函数
 */
_prototype.onWaiting = function (callback) {
    _onCallback(this, _WAITING_CALLBACK, callback);
};

export default function (AudioEngine) {
    if (_audioEngine === undefined) {
        // 备份 AudioEngine，将 AudioEngine 中所有函数标记为已废弃
        _audioEngine = Object.assign({}, AudioEngine);
        Object.keys(AudioEngine).forEach(function (name) {
            if (typeof AudioEngine[name] === "function") {
                AudioEngine[name] = function () {
                    console.warn("AudioEngine." + name + " is deprecated");
                    return _audioEngine[name].apply(AudioEngine, arguments);
                };
            }
        });
    }
    return new InnerAudioContext();
};