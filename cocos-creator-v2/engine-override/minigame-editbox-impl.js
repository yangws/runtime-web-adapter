// 该文件将在引擎代码添加后加载
// 适配小游戏中需要使用到小键盘的 case
const _EDIBOX = cc.EditBox;
const _KEYBOARD_RETURN_TYPE = _EDIBOX.KeyboardReturnType;
const _MAX_VALUE = 65535;
const _BASE_CLASS = _EDIBOX._ImplClass;
let _currentEditBoxImpl = null;

function _getKeyboardReturnType(type) {
    switch (type) {
        case _KEYBOARD_RETURN_TYPE.DEFAULT:
        case _KEYBOARD_RETURN_TYPE.DONE:
            return 'done';
        case _KEYBOARD_RETURN_TYPE.SEND:
            return 'send';
        case _KEYBOARD_RETURN_TYPE.SEARCH:
            return 'search';
        case _KEYBOARD_RETURN_TYPE.GO:
            return 'go';
        case _KEYBOARD_RETURN_TYPE.NEXT:
            return 'next';
    }
    return 'done';
}

function MiniGameEditBoxImpl() {
    _BASE_CLASS.call(this);

    this._eventListeners = {
        onKeyboardInput: null,
        onKeyboardConfirm: null,
        onKeyboardComplete: null,
    };
}

cc.js.extend(MiniGameEditBoxImpl, _BASE_CLASS);
_EDIBOX._ImplClass = MiniGameEditBoxImpl;

Object.assign(MiniGameEditBoxImpl.prototype, {
    init(delegate) {
        if (!delegate) {
            cc.error('EditBox init failed');
            return;
        }
        this._delegate = delegate;
    },

    beginEditing() {
        // In case multiply register events
        if (_currentEditBoxImpl === this) {
            return;
        }
        let delegate = this._delegate;
        // handle the old keyboard
        if (_currentEditBoxImpl) {
            let currentImplCbs = _currentEditBoxImpl._eventListeners;
            currentImplCbs.onKeyboardComplete();

            ral.updateKeyboard && ral.updateKeyboard({
                value: delegate._string,
            });
        } else {
            this._showKeyboard();
        }

        this._registerKeyboardEvent();

        this._editing = true;
        _currentEditBoxImpl = this;
        delegate.editBoxEditingDidBegan();
    },

    endEditing() {
        this._hideKeyboard();
        let cbs = this._eventListeners;
        cbs.onKeyboardComplete && cbs.onKeyboardComplete();
    },

    _registerKeyboardEvent() {
        let self = this;
        let delegate = this._delegate;
        let cbs = this._eventListeners;

        cbs.onKeyboardInput = function (res) {
            if (delegate._string !== res.value) {
                delegate.editBoxTextChanged(res.value);
            }
        };

        cbs.onKeyboardConfirm = function (res) {
            delegate.editBoxEditingReturn();
            let cbs = self._eventListeners;
            cbs.onKeyboardComplete && cbs.onKeyboardComplete();
        };

        cbs.onKeyboardComplete = function () {
            self._editing = false;
            _currentEditBoxImpl = null;
            self._unregisterKeyboardEvent();
            delegate.editBoxEditingDidEnded();
        };

        ral.onKeyboardInput(cbs.onKeyboardInput);
        ral.onKeyboardConfirm(cbs.onKeyboardConfirm);
        ral.onKeyboardComplete(cbs.onKeyboardComplete);
    },

    _unregisterKeyboardEvent() {
        let cbs = this._eventListeners;

        if (cbs.onKeyboardInput) {
            ral.offKeyboardInput(cbs.onKeyboardInput);
            cbs.onKeyboardInput = null;
        }
        if (cbs.onKeyboardConfirm) {
            ral.offKeyboardConfirm(cbs.onKeyboardConfirm);
            cbs.onKeyboardConfirm = null;
        }
        if (cbs.onKeyboardComplete) {
            ral.offKeyboardComplete(cbs.onKeyboardComplete);
            cbs.onKeyboardComplete = null;
        }
    },

    _showKeyboard() {
        let delegate = this._delegate;
        let multiline = (delegate.inputMode === _EDIBOX.InputMode.ANY);
        let maxLength = (delegate.maxLength < 0 ? _MAX_VALUE : delegate.maxLength);

        let inputType;
        switch (delegate.inputMode) {
            case 1: /* EMAIL_ADDR */ {
                inputType = "email";
                break;
            }
            case 2: /* NUMERIC */
            case 5: /* DECIMAL */ {
                inputType = "number";
                break;
            }
            case 3: /* PHONE_NUMBER */ {
                inputType = "phone";
                break;
            }
            case 4: /* URL */ {
                inputType = "url";
                break;
            }
            case 0: /* ANY */
            case 6: /* SINGLE_LINE */
            default: {
                inputType = "text";
            }
        }
        switch (delegate.inputFlag) {
            case 0: /* PASSWORD */ {
                inputType = "password";
                break;
            }
            case 1: /* SENSITIVE */ {
                break;
            }
            case 2: /* INITIAL_CAPS_WORD */ {
                break;
            }
            case 3: /* INITIAL_CAPS_SENTENCE */ {
                break;
            }
            case 4: /* INITIAL_CAPS_ALL_CHARACTERS */ {
                break;
            }
            case 5: /* DEFAULT */ {
                break;
            }
            default: {
            }
        }

        ral.showKeyboard({
            defaultValue: delegate._string,
            maxLength: maxLength,
            multiple: multiline,
            confirmHold: false,
            confirmType: _getKeyboardReturnType(delegate.returnType),
            inputType: inputType,
            success(res) {

            },
            fail(res) {
                cc.warn(res.errMsg);
            }
        });
    },

    _hideKeyboard() {
        ral.hideKeyboard({
            success(res) {

            },
            fail(res) {
                cc.warn(res.errMsg);
            },
        });
    },
});