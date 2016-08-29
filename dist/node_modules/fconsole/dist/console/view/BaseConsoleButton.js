"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("fgraphics/dist/index");
var index_2 = require("fcore/dist/index");
var CC_1 = require("../CC");
var BaseConsoleButton = (function (_super) {
    __extends(BaseConsoleButton, _super);
    function BaseConsoleButton() {
        _super.call(this);
        this._label = "";
    }
    BaseConsoleButton.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.view = index_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
        this.view.interactive = true;
        this.view.buttonMode = true;
        this.field = index_1.EngineAdapter.instance.createTextWrapper();
        this.view.addChild(this.field);
        this.field.color = CC_1.CC.config.btnSettings.labelColor;
        this.field.size = CC_1.CC.config.btnSettings.labelSize;
        this.commitData();
        this.onOut();
    };
    BaseConsoleButton.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        this.eventListenerHelper.addEventListener(this.view, index_1.DisplayObjectWrapperMouseEvent.ROLL_OVER, this.onOver);
        this.eventListenerHelper.addEventListener(this.view, index_1.DisplayObjectWrapperMouseEvent.ROLL_OUT, this.onOut);
        this.eventListenerHelper.addEventListener(this.view, index_1.DisplayObjectWrapperMouseEvent.CLICK, this.onClick);
        this.eventListenerHelper.addEventListener(this.view, index_1.DisplayObjectWrapperMouseEvent.MOUSE_UP_OUTSIDE, this.onOut);
    };
    BaseConsoleButton.prototype.onOver = function () {
        this.view.alpha = 1;
        if (this.tooltipData) {
            CC_1.CC.tooltipManager.show(this.tooltipData);
        }
    };
    BaseConsoleButton.prototype.onOut = function () {
        this.view.alpha = 0.75;
        CC_1.CC.tooltipManager.hide();
    };
    BaseConsoleButton.prototype.onClick = function () {
        this.onOut();
    };
    BaseConsoleButton.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        this.field.text = this.label;
        this.arrange();
    };
    BaseConsoleButton.prototype.arrange = function () {
        _super.prototype.arrange.call(this);
    };
    Object.defineProperty(BaseConsoleButton.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            if (value == this.label) {
                return;
            }
            this._label = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    return BaseConsoleButton;
}(index_2.BaseEventListenerObject));
exports.BaseConsoleButton = BaseConsoleButton;
//# sourceMappingURL=BaseConsoleButton.js.map