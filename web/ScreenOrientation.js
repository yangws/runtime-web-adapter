
import EventTarget from './EventTarget'

export default class ScreenOrientation extends EventTarget {
    _type = "portrait-primary";
    _angle = 0;
    _isLocked = false;
    
    constructor() {
        super();
    }

    get type() {
        return this._type;
    }

    get angle() {
        return this._angle;
    }

    onchange(event) {

    }

    lock(orientation) {
        return new Promise((resolve, reject) => {
            if (this._isLocked) {
              reject(new Error("Screen orientation is already locked"));
              return;
            }
        
            this._isLocked = true;
            resolve();
          });
    }

    unlock() {
        this._isLocked = false;
    }
}
