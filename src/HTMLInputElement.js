import HTMLElement from "./HTMLElement"

window.jsb = window.jsb || {};

export default class HTMLInputElement extends HTMLElement {
    constructor() {
        super("INPUT");
    }

    focus() {
        super.focus();
        //不可编辑状态
        if (!this.target.editable) {
            return;
        }
        var that = this;
        var onKeyboardInput = function (res) {
            var str = res ? res.value : "";
            that.inputTarget.text = str;
            that.target.event(/*laya.events.Event.INPUT*/"input");
        }

        var onKeyboardConfirm = function (res) {
            var str = res ? res.value : "";
            that.target.text = str;
            that.target.event(/*laya.events.Event.INPUT*/"input");
            that.target.focus = false;

            jsb.offKeyboardConfirm(onKeyboardConfirm);
            jsb.offKeyboardInput(onKeyboardInput);
            jsb.hideKeyboard({});
        };
        jsb.offKeyboardInput(onKeyboardInput);
        jsb.offKeyboardConfirm(onKeyboardConfirm);
        jsb.showKeyboard({
            defaultValue: this.value,
            maxLength: this.maxLength,
            multiple: this.target.multiline,
            confirmHold: false,
            // confirmType: getKeyboardReturnType(editBoxImpl._returnType),
            inputType: this.target.type,
            success: function (res) {
            },
            fail: function (res) {
            }
        });
        jsb.onKeyboardInput(onKeyboardInput);
        jsb.onKeyboardConfirm(onKeyboardConfirm);
    }

    blur() {
        super.blur();
        jsb.hideKeyboard({});
    }
}