"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("fcore/dist/index");
var index_2 = require("fgraphics/dist/index");
var DragHelperEvent_1 = require("./DragHelperEvent");
var DragHelper = (function (_super) {
    __extends(DragHelper, _super);
    function DragHelper() {
        _super.call(this);
        this.startDragGlobalX = 0;
        this.startDragGlobalY = 0;
        this.lastDragGlobalX = 0;
        this.lastDragGlobalY = 0;
        this.changeDragGlobalX = 0;
        this.changeDragGlobalY = 0;
        // Might be useful to prevent too quick/too small drags
        this.dragUpdateDelay = 0;
        this.dragStartTime = 0;
    }
    DragHelper.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.viewEventListenerHelper = new index_1.EventListenerHelper(this);
    };
    DragHelper.prototype.destruction = function () {
        _super.prototype.destruction.call(this);
        if (this.viewEventListenerHelper) {
            this.viewEventListenerHelper.destruction();
            this.viewEventListenerHelper = null;
        }
    };
    DragHelper.prototype.removeListeners = function () {
        _super.prototype.removeListeners.call(this);
        this.removeViewListeners(this.view);
    };
    DragHelper.prototype.addViewObjectListeners = function (object) {
        if (!object) {
            return;
        }
        this.viewEventListenerHelper.addEventListener(object, index_2.DisplayObjectWrapperMouseEvent.MOUSE_DOWN, this.onMouseDown);
        this.viewEventListenerHelper.addEventListener(object, index_2.DisplayObjectWrapperMouseEvent.MOUSE_UP, this.onMouseUp);
        this.viewEventListenerHelper.addEventListener(object, index_2.DisplayObjectWrapperMouseEvent.MOUSE_UP_OUTSIDE, this.onMouseUp);
        this.viewEventListenerHelper.addEventListener(index_2.EngineAdapter.instance.mainTicker, index_2.TickerEvent.TICK, this.onTick);
    };
    DragHelper.prototype.removeViewListeners = function (object) {
        if (!object) {
            return;
        }
        this.viewEventListenerHelper.removeAllListeners();
    };
    DragHelper.prototype.onMouseDown = function () {
        this.startDrag();
    };
    DragHelper.prototype.onMouseUp = function () {
        this.stopDrag();
    };
    DragHelper.prototype.onTick = function () {
        if (this.isDragStarted) {
            if (this.checkIsNeedUpdateDrag()) {
                this.updateDrag();
            }
        }
    };
    DragHelper.prototype.dispatchDragStartEvent = function () {
        this.dispatchEvent(DragHelperEvent_1.DragHelperEvent.DRAG_START);
    };
    DragHelper.prototype.dispatchDragUpdateEvent = function () {
        this.dispatchEvent(DragHelperEvent_1.DragHelperEvent.DRAG_UPDATE);
    };
    DragHelper.prototype.dispatchDragEndEvent = function () {
        this.dispatchEvent(DragHelperEvent_1.DragHelperEvent.DRAG_END);
    };
    DragHelper.prototype.startDrag = function () {
        if (this.isDragStarted) {
            return;
        }
        this.isDragStarted = true;
        this.startDragGlobalX = index_2.EngineAdapter.instance.globalMouseX;
        this.startDragGlobalY = index_2.EngineAdapter.instance.globalMouseY;
        this.lastDragGlobalX = this.startDragGlobalX;
        this.lastDragGlobalY = this.startDragGlobalY;
        this.changeDragGlobalX = 0;
        this.changeDragGlobalY = 0;
        this.dispatchDragStartEvent();
    };
    DragHelper.prototype.stopDrag = function () {
        if (!this.isDragStarted) {
            return;
        }
        this.isDragStarted = false;
        this.updateDrag();
        this.dispatchDragEndEvent();
    };
    DragHelper.prototype.updateDrag = function () {
        // Если последняя точка перетаскивания не изменилась, то прерываем функцию
        if (this.lastDragGlobalX == index_2.EngineAdapter.instance.globalMouseX &&
            this.lastDragGlobalY == index_2.EngineAdapter.instance.globalMouseY) {
            return;
        }
        this.lastDragGlobalX = index_2.EngineAdapter.instance.globalMouseX;
        this.lastDragGlobalY = index_2.EngineAdapter.instance.globalMouseY;
        this.changeDragGlobalX = this.lastDragGlobalX - this.startDragGlobalX;
        this.changeDragGlobalY = this.lastDragGlobalY - this.startDragGlobalY;
        this.dispatchDragUpdateEvent();
    };
    Object.defineProperty(DragHelper.prototype, "isDragStarted", {
        get: function () {
            return this._isDragStarted;
        },
        set: function (value) {
            if (value == this.isDragStarted) {
                return;
            }
            this._isDragStarted = value;
            if (this.isDragStarted) {
                this.dragStartTime = Date.now();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragHelper.prototype, "view", {
        get: function () {
            return this._view;
        },
        set: function (value) {
            if (value == this.view) {
                return;
            }
            this.removeViewListeners(this.view);
            this._view = value;
            this.addViewObjectListeners(this.view);
        },
        enumerable: true,
        configurable: true
    });
    DragHelper.prototype.checkIsNeedUpdateDrag = function () {
        var result;
        if (Date.now() >= this.dragStartTime + this.dragUpdateDelay) {
            result = true;
        }
        return result;
    };
    return DragHelper;
}(index_1.BaseObject));
exports.DragHelper = DragHelper;
//# sourceMappingURL=DragHelper.js.map