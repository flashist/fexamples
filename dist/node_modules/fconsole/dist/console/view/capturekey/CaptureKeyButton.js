"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseConsoleButton_1 = require("../BaseConsoleButton");
var index_1 = require("flibs/dist/index");
var index_2 = require("fcore/dist/index");
var CaptureKeyButtonEvent_1 = require("./CaptureKeyButtonEvent");
var CC_1 = require("../../CC");
var CaptureKeyButton = (function (_super) {
    __extends(CaptureKeyButton, _super);
    function CaptureKeyButton() {
        _super.call(this);
    }
    CaptureKeyButton.prototype.construction = function () {
        _super.prototype.construction.call(this);
    };
    CaptureKeyButton.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        this.eventListenerHelper.addEventListener(index_1.InputManager.instance, index_1.InputManagerEvent.KEY_PRESS, this.onKeyPress);
    };
    CaptureKeyButton.prototype.onClick = function () {
        _super.prototype.onClick.call(this);
        this.isClicked = !this.isClicked;
    };
    CaptureKeyButton.prototype.onKeyPress = function (data) {
        if (this.isClicked) {
            this.isClicked = false;
            this.captureCode = index_2.KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent);
            this.captureKey = index_2.KeyboardTools.getCharFromKeyPressEvent(data.nativeEvent);
            this.commitData();
        }
        else if (this.captureCode) {
            if (index_2.KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent) == this.captureCode) {
                this.dispatchEvent(CaptureKeyButtonEvent_1.CaptuerKeyButtonEvent.CAPTURE_KEY_PRESS);
            }
        }
    };
    CaptureKeyButton.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        if (this.isClicked) {
            this.label = CC_1.CC.config.localization.captureKeyBtnPressedLabel;
        }
        else if (this.captureKey) {
            this.label = index_2.StringTools.substituteList(CC_1.CC.config.localization.captureKeyBtnNormalLabel, this.captureKey);
        }
        else {
            this.label = index_2.StringTools.substituteList(CC_1.CC.config.localization.captureKeyBtnNormalLabel, CC_1.CC.config.localization.captureKeyBtnNoKeyHelpText);
        }
    };
    CaptureKeyButton.prototype.arrange = function () {
        _super.prototype.arrange.call(this);
    };
    Object.defineProperty(CaptureKeyButton.prototype, "isClicked", {
        get: function () {
            return this._isClicked;
        },
        set: function (value) {
            if (value == this.isClicked) {
                return;
            }
            this._isClicked = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    return CaptureKeyButton;
}(BaseConsoleButton_1.BaseConsoleButton));
exports.CaptureKeyButton = CaptureKeyButton;
//# sourceMappingURL=CaptureKeyButton.js.map