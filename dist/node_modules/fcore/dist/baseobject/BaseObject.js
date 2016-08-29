"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseEventDispatcher_1 = require("../event/eventdispatcher/BaseEventDispatcher");
var BaseObject = (function (_super) {
    __extends(BaseObject, _super);
    function BaseObject(initParams) {
        _super.call(this);
        this.construction(initParams);
        this.isConstructed = true;
        this.addListeners();
        this.commitData();
    }
    BaseObject.prototype.construction = function (initParams) {
        // Note: subclasses should implement their own logic here
    };
    BaseObject.prototype.destruction = function () {
        // Note: subclasses should implement their own logic here
        this.removeListeners();
    };
    BaseObject.prototype.addListeners = function () {
        this.removeListeners();
        // Note: subclasses should implement their own logic here
    };
    BaseObject.prototype.removeListeners = function () {
        // Note: subclasses should implement their own logic here
    };
    BaseObject.prototype.commitData = function () {
        // Note: subclasses should implement their own logic here
    };
    BaseObject.prototype.arrange = function () {
        // Note: subclasses should implement their own logic here
    };
    Object.defineProperty(BaseObject.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (this.data == value) {
                return;
            }
            this._data = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    return BaseObject;
}(BaseEventDispatcher_1.BaseEventDispatcher));
exports.BaseObject = BaseObject;
//# sourceMappingURL=BaseObject.js.map