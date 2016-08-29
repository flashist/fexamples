"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseConsoleView_1 = require("./BaseConsoleView");
var index_1 = require("fgraphics/dist/index");
var index_2 = require("fcore/dist/index");
var CC_1 = require("../CC");
var DisplayListView = (function (_super) {
    __extends(DisplayListView, _super);
    function DisplayListView() {
        _super.call(this);
    }
    DisplayListView.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.captureVisible = true;
        this.lastCheckedPos = new index_2.Point();
        this.titleLabel.text = "Display List";
        this.displayListField = index_1.EngineAdapter.instance.createTextWrapper();
        this.contentCont.addChild(this.displayListField);
        this.displayListField.y = this.titleCont.y + this.titleCont.height + 5;
        this.displayListField.color = CC_1.CC.config.displayListSettings.hierarchyLabelColor;
        this.displayListField.size = CC_1.CC.config.displayListSettings.hierarchyLabelSize;
        this.closeBtn = this.createTitleBtn("X", { title: CC_1.CC.config.localization.closeBtnTooltipTitle });
    };
    DisplayListView.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        this.eventListenerHelper.addEventListener(index_1.EngineAdapter.instance.mainTicker, index_1.TickerEvent.TICK, this.onTick);
        this.eventListenerHelper.addEventListener(this.closeBtn.view, index_1.DisplayObjectWrapperMouseEvent.CLICK, this.onClose);
    };
    DisplayListView.prototype.onTick = function () {
        if (this.visible) {
            /*if (this.lastCheckedPos.x != EngineAdapter.instance.globalMouseX ||
                this.lastCheckedPos.y != EngineAdapter.instance.globalMouseY) {*/
            this.lastCheckedPos.x = index_1.EngineAdapter.instance.globalMouseX;
            this.lastCheckedPos.y = index_1.EngineAdapter.instance.globalMouseY;
            var underPointData = index_1.EngineAdapter.instance.getNativeObjectsUnderPoint(index_1.EngineAdapter.instance.stage.object, index_1.EngineAdapter.instance.globalMouseX, index_1.EngineAdapter.instance.globalMouseY);
            if (!this.checkUnderPointDataEqual(underPointData, this.lastUnderPointData)) {
                this.lastUnderPointData = underPointData;
                var listText = this.parseUnderPointData(underPointData);
                this.displayListField.text = listText;
                this.arrange();
            }
        }
    };
    DisplayListView.prototype.onCaptureKey = function () {
        _super.prototype.onCaptureKey.call(this);
        var underPointData = index_1.EngineAdapter.instance.getNativeObjectsUnderPoint(index_1.EngineAdapter.instance.stage.object, index_1.EngineAdapter.instance.globalMouseX, index_1.EngineAdapter.instance.globalMouseY);
        // Log the parsed structure
        console.group("Display list structure:");
        this.groupLogUnderPointData(underPointData);
        console.groupEnd();
    };
    DisplayListView.prototype.getObjectsUnderMouse = function () {
        return index_1.EngineAdapter.instance.getNativeObjectsUnderPoint(index_1.EngineAdapter.instance.stage.object, index_1.EngineAdapter.instance.globalMouseX, index_1.EngineAdapter.instance.globalMouseY);
    };
    DisplayListView.prototype.parseUnderPointData = function (data, prefix) {
        if (prefix === void 0) { prefix = "∟"; }
        var result = "";
        if (data && data.object) {
            var tempName = data.object.toString();
            if (data.object.constructor) {
                tempName = data.object.constructor.name;
            }
            result += prefix + " " + tempName;
            var childPrefix = "- " + prefix;
            var childrenCount = data.children.length;
            for (var childIndex = 0; childIndex < childrenCount; childIndex++) {
                result += "\n" + this.parseUnderPointData(data.children[childIndex], childPrefix);
            }
        }
        return result;
    };
    DisplayListView.prototype.groupLogUnderPointData = function (data, prefix) {
        if (prefix === void 0) { prefix = "∟"; }
        if (data && data.object) {
            //console.log(data.object);
            //console.dir(data.object);
            console.log(prefix, data.object);
            if (data.children && data.children.length > 0) {
                // console.group(" children");
                var childrenCount = data.children.length;
                for (var childIndex = 0; childIndex < childrenCount; childIndex++) {
                    this.groupLogUnderPointData(data.children[childIndex], "    " + prefix);
                }
            }
        }
    };
    DisplayListView.prototype.checkUnderPointDataEqual = function (data1, data2) {
        var result = true;
        // If one of the data objects exists and other doesn't
        if (!!data1 != !!data2) {
            result = false;
        }
        else if (data1 && data2) {
            if (data1.object != data2.object) {
                result = false;
            }
            else if (!!data1.children != !!data2.children) {
                result = false;
            }
            else if (data1.children && data2.children) {
                // If length of the children lists are not equal, then data objects are not equal too
                if (data1.children.length != data2.children.length) {
                    result = false;
                }
                else {
                    var childrenCount = data1.children.length;
                    for (var childIndex = 0; childIndex < childrenCount; childIndex++) {
                        // If one of the children are not equeal, than stop checking and break the loop
                        if (!this.checkUnderPointDataEqual(data1.children[childIndex], data2.children[childIndex])) {
                            result = false;
                            break;
                        }
                    }
                }
            }
        }
        return result;
    };
    return DisplayListView;
}(BaseConsoleView_1.BaseConsoleView));
exports.DisplayListView = DisplayListView;
//# sourceMappingURL=DisplayListView.js.map