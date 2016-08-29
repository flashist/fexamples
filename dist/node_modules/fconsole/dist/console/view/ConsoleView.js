"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseConsoleView_1 = require("./BaseConsoleView");
var CC_1 = require("../CC");
var index_1 = require("fgraphics/dist/index");
var ConsoleView = (function (_super) {
    __extends(ConsoleView, _super);
    function ConsoleView() {
        _super.call(this);
    }
    ConsoleView.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.titleVisible = false;
        this.displayListBtn = this.createTitleBtn("DL", {
            title: CC_1.CC.config.localization.displayListBtnTooltipTitle,
            text: CC_1.CC.config.localization.displayListBtnTooltipText
        });
        this.closeBtn = this.createTitleBtn("X", { title: CC_1.CC.config.localization.closeBtnTooltipTitle });
    };
    ConsoleView.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        this.eventListenerHelper.addEventListener(this.displayListBtn.view, index_1.DisplayObjectWrapperMouseEvent.CLICK, this.onDisplayListClick);
        this.eventListenerHelper.addEventListener(this.closeBtn.view, index_1.DisplayObjectWrapperMouseEvent.CLICK, this.onClose);
    };
    ConsoleView.prototype.onDisplayListClick = function () {
        CC_1.CC.toggleView(CC_1.CC.displayListView);
    };
    return ConsoleView;
}(BaseConsoleView_1.BaseConsoleView));
exports.ConsoleView = ConsoleView;
//# sourceMappingURL=ConsoleView.js.map