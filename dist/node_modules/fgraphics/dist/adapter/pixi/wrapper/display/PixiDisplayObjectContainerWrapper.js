"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EngineAdapter_1 = require("../../../abstract/EngineAdapter");
var PixiDisplayObjectWrapper_1 = require("./PixiDisplayObjectWrapper");
var PixiDisplayObjectContainerWrapper = (function (_super) {
    __extends(PixiDisplayObjectContainerWrapper, _super);
    function PixiDisplayObjectContainerWrapper() {
        _super.call(this);
        this.isDisplayObjectContainerWrapper = true;
    }
    PixiDisplayObjectContainerWrapper.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        this.pixiContainer = this.object;
    };
    Object.defineProperty(PixiDisplayObjectContainerWrapper.prototype, "width", {
        get: function () {
            return this.pixiContainer.width;
        },
        set: function (value) {
            this.pixiContainer.width = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiDisplayObjectContainerWrapper.prototype, "height", {
        get: function () {
            return this.pixiContainer.height;
        },
        set: function (value) {
            this.pixiContainer.height = value;
        },
        enumerable: true,
        configurable: true
    });
    PixiDisplayObjectContainerWrapper.prototype.addChild = function (child) {
        this.pixiContainer.addChild(child.object);
    };
    PixiDisplayObjectContainerWrapper.prototype.addChildAt = function (child, index) {
        this.pixiContainer.addChildAt(child.object, index);
    };
    PixiDisplayObjectContainerWrapper.prototype.removeChild = function (child) {
        this.pixiContainer.removeChild(child.object);
    };
    PixiDisplayObjectContainerWrapper.prototype.removeChildAt = function (index) {
        this.pixiContainer.removeChildAt(index);
    };
    PixiDisplayObjectContainerWrapper.prototype.getChildAt = function (index) {
        var result;
        var tempNativeObject = this.pixiContainer.getChildAt(index);
        if (tempNativeObject) {
            result = EngineAdapter_1.EngineAdapter.instance.createDisplayWrapperBasedOnObject(tempNativeObject);
        }
        return result;
    };
    PixiDisplayObjectContainerWrapper.prototype.setChildIndex = function (child, index) {
        this.pixiContainer.setChildIndex(child.object, index);
    };
    Object.defineProperty(PixiDisplayObjectContainerWrapper.prototype, "nativeChildren", {
        get: function () {
            return this.pixiContainer.children;
        },
        enumerable: true,
        configurable: true
    });
    return PixiDisplayObjectContainerWrapper;
}(PixiDisplayObjectWrapper_1.PixiDisplayObjectWrapper));
exports.PixiDisplayObjectContainerWrapper = PixiDisplayObjectContainerWrapper;
//# sourceMappingURL=PixiDisplayObjectContainerWrapper.js.map