const _events = new WeakMap();

export default class EventTarget {
    constructor() {
        _events.set(this, {})
    }

    addEventListener(type, listener, options = {}) {
        let events = _events.get(this);

        if (!events) {
            _events.set(this, events = {})
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
        const events = _events.get(this);

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
        const listeners = _events.get(this)[event.type];

        let callback = this["on" + event.type];
        if (typeof callback === "function") {
            callback(event);
        }

        if (listeners) {
            for (let i = 0; i < listeners.length; i++) {
                listeners[i](event)
            }
        }
        event._target = event._currentTarget = null;

        return true;
    }
}