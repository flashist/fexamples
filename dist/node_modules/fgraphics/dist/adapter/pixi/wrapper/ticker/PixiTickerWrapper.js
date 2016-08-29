"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("fcore/dist/index");
var TickerEvent_1 = require("../../../abstract/wrapper/ticker/TickerEvent");
var PixiTickerWrapper = (function (_super) {
    __extends(PixiTickerWrapper, _super);
    function PixiTickerWrapper() {
        _super.call(this);
        this.prevLastTime = 0;
        this.lastTime = 0;
    }
    PixiTickerWrapper.prototype.removeListeners = function () {
        _super.prototype.removeListeners.call(this);
        if (this.pixiTicker) {
            this.removeTickerListeners(this.pixiTicker);
        }
    };
    PixiTickerWrapper.prototype.addTickerListeners = function (ticker) {
        if (!ticker) {
            return;
        }
        ticker.add(this.onTick, this);
    };
    PixiTickerWrapper.prototype.removeTickerListeners = function (ticker) {
        if (!ticker) {
            return;
        }
        ticker.remove(this.onTick, this);
    };
    PixiTickerWrapper.prototype.onTick = function (deltaTime) {
        this.prevLastTime = this.lastTime;
        this.lastTime = this.pixiTicker.lastTime;
        this.dispatchEvent(TickerEvent_1.TickerEvent.TICK);
    };
    PixiTickerWrapper.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        this.pixiTicker = this.object;
    };
    Object.defineProperty(PixiTickerWrapper.prototype, "pixiTicker", {
        get: function () {
            return this._pixiTicker;
        },
        set: function (value) {
            if (value == this.pixiTicker) {
                return;
            }
            this.removeTickerListeners(this.pixiTicker);
            //
            this._pixiTicker = value;
            this.addTickerListeners(this.pixiTicker);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiTickerWrapper.prototype, "fps", {
        get: function () {
            return this.pixiTicker.FPS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiTickerWrapper.prototype, "minFPS", {
        get: function () {
            return this.pixiTicker.minFPS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiTickerWrapper.prototype, "deltaTime", {
        get: function () {
            return this.lastTime - this.prevLastTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiTickerWrapper.prototype, "deltaTimeToTargetFpsCoef", {
        get: function () {
            return this.deltaTime / 1000;
        },
        enumerable: true,
        configurable: true
    });
    PixiTickerWrapper.prototype.update = function (currentTime) {
        if (this.pixiTicker) {
            this.pixiTicker.update(currentTime);
        }
    };
    return PixiTickerWrapper;
}(index_1.BaseClassWrapper));
exports.PixiTickerWrapper = PixiTickerWrapper;
//# sourceMappingURL=PixiTickerWrapper.js.map