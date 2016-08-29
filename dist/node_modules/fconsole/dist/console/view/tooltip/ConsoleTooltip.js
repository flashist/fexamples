"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTooltip_1 = require("../../../tooltip/BaseTooltip");
var index_1 = require("fgraphics/dist/index");
var CC_1 = require("../../CC");
var ConsoleTooltip = (function (_super) {
    __extends(ConsoleTooltip, _super);
    function ConsoleTooltip() {
        _super.call(this);
    }
    ConsoleTooltip.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.bg = index_1.EngineAdapter.instance.createGraphicsWrapper();
        this.view.addChild(this.bg);
        this.contentCont = index_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
        this.view.addChild(this.contentCont);
        this.titleLabel = index_1.EngineAdapter.instance.createTextWrapper();
        this.contentCont.addChild(this.titleLabel);
        this.titleLabel.align = index_1.TextWrapperAlign.CENTER;
        this.titleLabel.color = CC_1.CC.config.tooltipSettings.titleLabelColor;
        this.titleLabel.size = CC_1.CC.config.tooltipSettings.titleLabelSize;
        this.textLabel = index_1.EngineAdapter.instance.createTextWrapper();
        this.contentCont.addChild(this.textLabel);
        this.textLabel.align = index_1.TextWrapperAlign.CENTER;
        this.textLabel.color = CC_1.CC.config.tooltipSettings.textLabelColor;
        this.textLabel.size = CC_1.CC.config.tooltipSettings.textLabelSize;
    };
    ConsoleTooltip.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        if (!this.tooltipData) {
            return;
        }
        this.titleLabel.text = this.tooltipData.title;
        this.textLabel.text = this.tooltipData.text;
        if (this.tooltipData.text) {
            this.textLabel.visible = true;
        }
        else {
            this.textLabel.visible = false;
        }
        this.arrange();
    };
    ConsoleTooltip.prototype.arrange = function () {
        _super.prototype.arrange.call(this);
        if (this.textLabel.visible) {
            var labelMaxWidth = Math.max(this.titleLabel.width, this.textLabel.width);
            this.titleLabel.x = ((labelMaxWidth - this.titleLabel.width) >> 1);
            this.textLabel.x = ((labelMaxWidth - this.textLabel.width) >> 1);
            this.textLabel.y = this.titleLabel.y + this.titleLabel.height;
        }
        else {
            this.titleLabel.x = 0;
        }
        this.bg.clear();
        this.bg.beginFill(CC_1.CC.config.tooltipSettings.bgColor, CC_1.CC.config.tooltipSettings.bgAlpha);
        this.bg.lineStyle(CC_1.CC.config.tooltipSettings.borderWidth, CC_1.CC.config.tooltipSettings.borderColor, CC_1.CC.config.tooltipSettings.borderAlpha);
        this.bg.drawRect(0, 0, this.contentCont.width + CC_1.CC.config.tooltipSettings.bgToContentShift.x, this.contentCont.height + CC_1.CC.config.tooltipSettings.bgToContentShift.y);
        this.bg.endFill();
        this.contentCont.x = this.bg.x + ((this.bg.width - this.contentCont.width) >> 1);
        this.contentCont.y = this.bg.y + ((this.bg.height - this.contentCont.height) >> 1);
    };
    return ConsoleTooltip;
}(BaseTooltip_1.BaseTooltip));
exports.ConsoleTooltip = ConsoleTooltip;
//# sourceMappingURL=ConsoleTooltip.js.map