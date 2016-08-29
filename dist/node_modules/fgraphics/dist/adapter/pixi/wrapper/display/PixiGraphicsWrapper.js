"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PixiDisplayObjectContainerWrapper_1 = require("./PixiDisplayObjectContainerWrapper");
var PixiGraphicsWrapper = (function (_super) {
    __extends(PixiGraphicsWrapper, _super);
    function PixiGraphicsWrapper() {
        _super.call(this);
        this.isGraphicsWrapper = true;
    }
    PixiGraphicsWrapper.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        this.pixiGraphics = this.object;
    };
    PixiGraphicsWrapper.prototype.clear = function () {
        this.pixiGraphics.clear();
        return this;
    };
    PixiGraphicsWrapper.prototype.beginFill = function (color, alpha) {
        this.pixiGraphics.beginFill(color, alpha);
        return this;
    };
    PixiGraphicsWrapper.prototype.endFill = function () {
        this.pixiGraphics.endFill();
        return this;
    };
    PixiGraphicsWrapper.prototype.lineStyle = function (lineWidth, color, alpha) {
        this.pixiGraphics.lineStyle(lineWidth, color, alpha);
        return this;
    };
    PixiGraphicsWrapper.prototype.lineTo = function (x, y) {
        this.pixiGraphics.lineTo(x, y);
        return this;
    };
    PixiGraphicsWrapper.prototype.moveTo = function (x, y) {
        this.pixiGraphics.moveTo(x, y);
        return this;
    };
    PixiGraphicsWrapper.prototype.drawRect = function (x, y, width, height) {
        this.pixiGraphics.drawRect(x, y, width, height);
        return this;
    };
    PixiGraphicsWrapper.prototype.drawCircle = function (x, y, radius) {
        this.pixiGraphics.drawCircle(x, y, radius);
        return this;
    };
    return PixiGraphicsWrapper;
}(PixiDisplayObjectContainerWrapper_1.PixiDisplayObjectContainerWrapper));
exports.PixiGraphicsWrapper = PixiGraphicsWrapper;
//# sourceMappingURL=PixiGraphicsWrapper.js.map