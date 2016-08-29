"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("fgraphics/dist/index");
var index_2 = require("fcore/dist/index");
var BaseTooltip = (function (_super) {
    __extends(BaseTooltip, _super);
    function BaseTooltip() {
        _super.apply(this, arguments);
    }
    BaseTooltip.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.view = index_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
    };
    BaseTooltip.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        this.tooltipData = this.data;
    };
    return BaseTooltip;
}(index_2.BaseObject));
exports.BaseTooltip = BaseTooltip;
//# sourceMappingURL=BaseTooltip.js.map