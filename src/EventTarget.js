import TouchEvent from "./TouchEvent"
import _weakMap from "./util/WeakMap"

export default class EventTarget {
    constructor() {
        _weakMap.set(this, {})
    }

    addEventListener(type, listener, options = {}) {
        let events = _weakMap.get(this);

        if (!events) {
            _weakMap.set(this, events = {})
        }
        if (!events[type]) {
            events[type] = []
        }
        events[type].push(listener);

        if (options.capture) {
            // console.warn('EventTarget.addEventListener: options.capture is not implemented.')
        }
        if (options.once) {
            // console.warn('EventTarget.addEventListener: options.once is not implemented.')
        }
        if (options.passive) {
            // console.warn('EventTarget.addEventListener: options.passive is not implemented.')
        }
    }

    removeEventListener(type, listener) {
        const events = _weakMap.get(this);

        if (events) {
            const listeners = events[type];

            if (listeners && listeners.length > 0) {
                for (let i = listeners.length; i--; i > 0) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1);
                        break
                    }
                }
            }
        }
    }

    dispatchEvent(event = {}) {
        event._target = event._currentTarget = this;
        let events = _weakMap.get(this);
        if (!events) {
            return true;
        }

        if (event instanceof TouchEvent) {
            let toucheArray = event.touches;
            let length = toucheArray.length;
            for (let index = 0; index < length; ++index) {
                toucheArray[index].target = this;
            }
            toucheArray = event.changedTouches;
            length = toucheArray.length;
            for (let index = 0; index < length; ++index) {
                toucheArray[index].target = this;
            }
        }

        let callback = this["on" + event.type];
        if (typeof callback === "function") {
            callback(event);
        }

        const listeners = events[event.type];
        if (listeners) {
            for (let i = 0; i < listeners.length; i++) {
                listeners[i](event)
            }
        }
        event._target = event._currentTarget = null;

        return true;
    }
}