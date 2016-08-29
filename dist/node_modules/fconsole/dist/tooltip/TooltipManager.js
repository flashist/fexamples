"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("fcore/dist/index");
var index_2 = require("fgraphics/dist/index");
var TooltipManager = (function (_super) {
    __extends(TooltipManager, _super);
    function TooltipManager(tooltip) {
        _super.call(this, tooltip);
    }
    TooltipManager.prototype.construction = function (tooltip) {
        _super.prototype.construction.call(this);
        this.tooltip = tooltip;
        this.mouseShift = new index_1.Point();
        this.tooltipInsideCont = index_2.EngineAdapter.instance.createDisplayObjectContainerWrapper();
        this.tooltipInsideCont.addChild(this.tooltip.view);
        this.hide();
    };
    TooltipManager.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        this.eventListenerHelper.addEventListener(index_2.EngineAdapter.instance.mainTicker, index_2.TickerEvent.TICK, this.onTick);
    };
    TooltipManager.prototype.onTick = function () {
        this.update();
    };
    TooltipManager.prototype.show = function (data) {
        this.visible = true;
        this.tooltip.data = data;
        this.update();
    };
    TooltipManager.prototype.hide = function () {
        this.visible = false;
    };
    /**
     * Обновление подсказки.
     */
    TooltipManager.prototype.update = function () {
        if (!this.visible) {
            return;
        }
        if (!this.tooltipCont) {
            return;
        }
        if (!this.tooltip) {
        }
        var tempPos = new index_1.Point(index_2.EngineAdapter.instance.globalMouseX, index_2.EngineAdapter.instance.globalMouseY);
        tempPos.x += this.mouseShift.x;
        tempPos.y += this.mouseShift.y;
        if (tempPos.x < 0) {
            tempPos.x = 0;
        }
        else if (tempPos.x + this.tooltip.view.width > index_2.EngineAdapter.instance.rendererWidth) {
            tempPos.x = index_2.EngineAdapter.instance.rendererWidth - this.tooltip.view.width;
        }
        if (tempPos.y < 0) {
            tempPos.y = 0;
        }
        else if (tempPos.y + this.tooltip.view.height > index_2.EngineAdapter.instance.rendererHeight) {
            tempPos.y = index_2.EngineAdapter.instance.rendererHeight - this.tooltip.view.height;
        }
        tempPos = this.tooltip.view.parent.toLocal(tempPos);
        this.moveTooltipTo(tempPos.x, tempPos.y);
    };
    /**
     * Move a tooltip to a new position.
     * Might be overridden in subclasses to implement different behavior (e.g. tween movement).
     *
     * @param x
     * @param y
     */
    TooltipManager.prototype.moveTooltipTo = function (x, y) {
        this.tooltip.view.x = x;
        this.tooltip.view.y = y;
    };
    Object.defineProperty(TooltipManager.prototype, "tooltipCont", {
        get: function () {
            return this._tooltipCont;
        },
        set: function (value) {
            if (this.tooltipCont == value) {
                return;
            }
            this._tooltipCont = value;
            if (this.tooltipCont) {
                this.tooltipCont.addChild(this.tooltipInsideCont);
            }
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipManager.prototype, "mouseShift", {
        get: function () {
            return this._mouseShift;
        },
        set: function (value) {
            this._mouseShift = value.clone();
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipManager.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
            this.tooltipInsideCont.visible = this.visible;
        },
        enumerable: true,
        configurable: true
    });
    TooltipManager.SHOW_DELAY = 0.5;
    return TooltipManager;
}(index_1.BaseEventListenerObject));
exports.TooltipManager = TooltipManager;
//# sourceMappingURL=TooltipManager.js.map