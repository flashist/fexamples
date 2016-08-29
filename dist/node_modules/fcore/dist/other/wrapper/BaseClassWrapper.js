"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseEventListenerObject_1 = require("../../baseobject/BaseEventListenerObject");
var BaseClassWrapper = (function (_super) {
    __extends(BaseClassWrapper, _super);
    function BaseClassWrapper() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(BaseClassWrapper.prototype, "object", {
        get: function () {
            return this._object;
        },
        set: function (value) {
            this._object = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    return BaseClassWrapper;
}(BaseEventListenerObject_1.BaseEventListenerObject));
exports.BaseClassWrapper = BaseClassWrapper;
//# sourceMappingURL=BaseClassWrapper.js.map