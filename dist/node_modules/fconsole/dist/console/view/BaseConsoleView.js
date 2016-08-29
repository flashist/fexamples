"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("fgraphics/dist/index");
var index_2 = require("fcore/dist/index");
var index_3 = require("flibs/dist/index");
var BaseConsoleButton_1 = require("./BaseConsoleButton");
var CC_1 = require("../CC");
var CaptureKeyButton_1 = require("./capturekey/CaptureKeyButton");
var CaptureKeyButtonEvent_1 = require("./capturekey/CaptureKeyButtonEvent");
var BaseConsoleView = (function (_super) {
    __extends(BaseConsoleView, _super);
    function BaseConsoleView() {
        _super.call(this);
        this.lastBgWidth = 0;
        this.lastBgHeight = 0;
    }
    BaseConsoleView.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.captureKey = "";
        this._titleVisible = true;
        this._captureVisible = false;
        this.buttonsList = [];
        this.buttonsEventListenerHelper = new index_2.EventListenerHelper(this);
        this.view = index_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
        this.bgGraphics = index_1.EngineAdapter.instance.createGraphicsWrapper();
        this.view.addChild(this.bgGraphics);
        //
        this.bgGraphics.interactive = true;
        this.dragHelper = new index_3.DragHelper();
        this.dragHelper.view = this.bgGraphics;
        this.contentCont = index_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
        this.view.addChild(this.contentCont);
        this.titleCont = index_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
        this.contentCont.addChild(this.titleCont);
        this.titleLabel = index_1.EngineAdapter.instance.createTextWrapper();
        this.titleCont.addChild(this.titleLabel);
        this.titleLabel.color = CC_1.CC.config.viewSettings.titleLabelColor;
        this.titleLabel.size = CC_1.CC.config.viewSettings.titleLabelSize;
        this.titleLabel.text = "Test Title";
        this.btnsCont = index_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
        this.titleCont.addChild(this.btnsCont);
        this.captureBtn = new CaptureKeyButton_1.CaptureKeyButton();
        this.titleCont.addChild(this.captureBtn.view);
        this.captureBtn.view.y = this.titleLabel.y + this.titleLabel.height;
        //
        this.captureBtn.tooltipData = { title: CC_1.CC.config.localization.captureKeyBtnTooltipTitle };
        this.commitData();
    };
    BaseConsoleView.prototype.destruction = function () {
        _super.prototype.destruction.call(this);
        if (this.buttonsEventListenerHelper) {
            this.buttonsEventListenerHelper.destruction();
            this.buttonsEventListenerHelper = null;
        }
    };
    BaseConsoleView.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        this.eventListenerHelper.addEventListener(this.dragHelper, index_3.DragHelperEvent.DRAG_START, this.onDragStart);
        this.eventListenerHelper.addEventListener(this.dragHelper, index_3.DragHelperEvent.DRAG_UPDATE, this.onDragUpdate);
        this.eventListenerHelper.addEventListener(this.captureBtn, CaptureKeyButtonEvent_1.CaptuerKeyButtonEvent.CAPTURE_KEY_PRESS, this.onCaptureKey);
    };
    BaseConsoleView.prototype.onDragStart = function () {
        this.viewDragStartX = this.view.x;
        this.viewDragStartY = this.view.y;
        CC_1.CC.moveViewToTopLayer(this);
    };
    BaseConsoleView.prototype.onDragUpdate = function () {
        this.view.x = this.viewDragStartX + this.dragHelper.changeDragGlobalX;
        this.view.y = this.viewDragStartY + this.dragHelper.changeDragGlobalY;
    };
    BaseConsoleView.prototype.onClose = function () {
        CC_1.CC.hideView(this);
    };
    BaseConsoleView.prototype.onCaptureKey = function () {
    };
    Object.defineProperty(BaseConsoleView.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            if (value == this.visible) {
                return;
            }
            this._visible = value;
            /*if (this.visible) {
                CC.showView(this);
            } else {
                CC.hideView(this);
            }*/
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    BaseConsoleView.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        this.titleLabel.visible = this.titleVisible;
        this.captureBtn.view.visible = this.captureVisible;
        if (this.captureKey) {
            this.captureBtn.label = BaseConsoleView.CAPTURE_LABEL_FIRST_PART + " " + this.captureKey;
        }
        else {
            this.captureBtn.label = BaseConsoleView.CAPTURE_LABEL_FIRST_PART + " " + BaseConsoleView.NO_CAPTURE_KEY_TEXT;
        }
        this.arrange();
    };
    BaseConsoleView.prototype.arrange = function () {
        // Reset previously set changes
        var tempBtn;
        var prevBtn;
        var btnsCount = this.buttonsList.length;
        for (var btnIndex = 0; btnIndex < btnsCount; btnIndex++) {
            tempBtn = this.buttonsList[btnIndex];
            if (prevBtn) {
                tempBtn.view.x = prevBtn.view.x + prevBtn.view.width + 5;
            }
            prevBtn = tempBtn;
        }
        if (this.titleVisible) {
            this.btnsCont.x = this.titleLabel.x + this.titleLabel.width + 10;
        }
        else {
            this.btnsCont.x = this.titleLabel.x;
        }
        var tempWidth = this.contentCont.width + CC_1.CC.config.viewSettings.bgToContentShift.x;
        var tempHeight = this.contentCont.height + CC_1.CC.config.viewSettings.bgToContentShift.y;
        if (tempWidth != this.lastBgWidth || tempHeight != this.lastBgHeight) {
            this.lastBgWidth = tempWidth;
            this.lastBgHeight = tempHeight;
            this.bgGraphics.clear();
            this.bgGraphics.beginFill(CC_1.CC.config.viewSettings.bgColor, CC_1.CC.config.viewSettings.bgAlpha);
            this.bgGraphics.lineStyle(CC_1.CC.config.viewSettings.borderWidth, CC_1.CC.config.viewSettings.borderColor, CC_1.CC.config.viewSettings.borderAlpha);
            this.bgGraphics.drawRect(0, 0, tempWidth, tempHeight);
            this.bgGraphics.endFill();
        }
        this.contentCont.x = this.bgGraphics.x + ((this.bgGraphics.width - this.contentCont.width) >> 1);
        this.contentCont.y = this.bgGraphics.y + ((this.bgGraphics.height - this.contentCont.height) >> 1);
    };
    BaseConsoleView.prototype.createTitleBtn = function (label, tooltipData) {
        var tempBtn = new BaseConsoleButton_1.BaseConsoleButton();
        this.btnsCont.addChild(tempBtn.view);
        tempBtn.label = label;
        tempBtn.tooltipData = tooltipData;
        this.buttonsList.push(tempBtn);
        return tempBtn;
    };
    Object.defineProperty(BaseConsoleView.prototype, "titleVisible", {
        get: function () {
            return this._titleVisible;
        },
        set: function (value) {
            if (value == this.titleVisible) {
                return;
            }
            this._titleVisible = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseConsoleView.prototype, "captureVisible", {
        get: function () {
            return this._captureVisible;
        },
        set: function (value) {
            if (value == this.captureVisible) {
                return;
            }
            this._captureVisible = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    BaseConsoleView.CAPTURE_LABEL_FIRST_PART = "Capture key:";
    BaseConsoleView.NO_CAPTURE_KEY_TEXT = "(click to add)";
    return BaseConsoleView;
}(index_2.BaseEventListenerObject));
exports.BaseConsoleView = BaseConsoleView;
//# sourceMappingURL=BaseConsoleView.js.map