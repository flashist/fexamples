"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventListenerHelper_1 = require("../event/eventlistenerhelper/EventListenerHelper");
var BaseObject_1 = require("./BaseObject");
var BaseEventListenerObject = (function (_super) {
    __extends(BaseEventListenerObject, _super);
    function BaseEventListenerObject(initParams) {
        _super.call(this, initParams);
    }
    BaseEventListenerObject.prototype.construction = function (initParams) {
        this.eventListenerHelper = new EventListenerHelper_1.EventListenerHelper(this);
        _super.prototype.construction.call(this, initParams);
    };
    BaseEventListenerObject.prototype.destruction = function () {
        _super.prototype.destruction.call(this);
        if (this.eventListenerHelper) {
            this.eventListenerHelper.destruction();
            this.eventListenerHelper = null;
        }
    };
    BaseEventListenerObject.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
    };
    BaseEventListenerObject.prototype.removeListeners = function () {
        _super.prototype.removeListeners.call(this);
        if (this.eventListenerHelper) {
            this.eventListenerHelper.removeAllListeners();
        }
    };
    return BaseEventListenerObject;
}(BaseObject_1.BaseObject));
exports.BaseEventListenerObject = BaseEventListenerObject;
//# sourceMappingURL=BaseEventListenerObject.js.map