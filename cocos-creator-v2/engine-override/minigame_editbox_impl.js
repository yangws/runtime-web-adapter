// 该文件将在引擎代码添加后加载
// 适配小游戏中需要使用到小键盘的 case
const EditBox = cc.EditBox;
const js = cc.js;
const KeyboardReturnType = EditBox.KeyboardReturnType;
const MAX_VALUE = 65535;
let _currentEditBoxImpl = null;

function getKeyboardReturnType(type) {
    switch (type) {
        case KeyboardReturnType.DEFAULT:
        case KeyboardReturnType.DONE:
            return 'done';
        case KeyboardReturnType.SEND:
            return 'send';
        case KeyboardReturnType.SEARCH:
            return 'search';
        case KeyboardReturnType.GO:
            return 'go';
        case KeyboardReturnType.NEXT:
            return 'next';
    }
    return 'done';
}

const BaseClass = EditBox._ImplClass;

function MiniGameEditBoxImpl() {
    BaseClass.call(this);

    this._eventListeners = {
        onKeyboardInput: null,
        onKeyboardConfirm: null,
        onKeyboardComplete: null,
    };
}

js.extend(MiniGameEditBoxImpl, BaseClass);
EditBox._ImplClass = MiniGameEditBoxImpl;

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
        let multiline = (delegate.inputMode === EditBox.InputMode.ANY);
        let maxLength = (delegate.maxLength < 0 ? MAX_VALUE : delegate.maxLength);

        ral.showKeyboard({
            defaultValue: delegate._string,
            maxLength: maxLength,
            multiple: multiline,
            confirmHold: false,
            confirmType: getKeyboardReturnType(delegate.returnType),
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