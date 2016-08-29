"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("fcore/dist/index");
var index_2 = require("fgraphics/dist/index");
var InputManagerEvent_1 = require("./InputManagerEvent");
var InputManagerEventData_1 = require("./InputManagerEventData");
var InputManager = (function (_super) {
    __extends(InputManager, _super);
    function InputManager() {
        _super.call(this);
        this.pressedKeyCodes = {};
        this.prevPressedKeyCodes = {};
        this.justPressedKeyCodes = {};
        this.justReleasedKeyCodes = {};
    }
    InputManager.prototype.construction = function () {
        _super.prototype.construction.call(this);
    };
    InputManager.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        /*document.addEventListener(JSKeyboardEvent.KEY_DOWN, this.onKeyDown);
         document.addEventListener(JSKeyboardEvent.KEY_UP, this.onKeyUp);*/
        var documentAny = document;
        var documentDispatcher = documentAny;
        this.eventListenerHelper.addEventListener(documentDispatcher, index_1.JSKeyboardEvent.KEY_DOWN, this.onKeyDown);
        this.eventListenerHelper.addEventListener(documentDispatcher, index_1.JSKeyboardEvent.KEY_PRESS, this.onKeyPress);
        this.eventListenerHelper.addEventListener(documentDispatcher, index_1.JSKeyboardEvent.KEY_UP, this.onKeyUp);
        this.eventListenerHelper.addEventListener(index_2.EngineAdapter.instance.mainTicker, index_2.TickerEvent.TICK, this.onTick);
    };
    InputManager.prototype.onTick = function () {
        this.updateInput();
    };
    InputManager.prototype.onKeyDown = function (event) {
        //CustomLogger.log("InputManager | onKeyDown __ event.event.keyCode: " + event.keyCode);
        if (!this.pressedKeyCodes[event.keyCode]) {
            this.pressedKeyCodes[event.keyCode] = true;
            this.isDataChanged = true;
        }
        var tempData = new InputManagerEventData_1.InputManagerEventData((event || window.event));
        this.dispatchEvent(InputManagerEvent_1.InputManagerEvent.KEY_DOWN, tempData);
    };
    InputManager.prototype.onKeyPress = function (event) {
        var tempData = new InputManagerEventData_1.InputManagerEventData((event || window.event));
        this.dispatchEvent(InputManagerEvent_1.InputManagerEvent.KEY_PRESS, tempData);
    };
    InputManager.prototype.onKeyUp = function (event) {
        if (this.pressedKeyCodes[event.keyCode]) {
            this.pressedKeyCodes[event.keyCode] = false;
            this.isDataChanged = true;
        }
        var tempData = new InputManagerEventData_1.InputManagerEventData((event || window.event));
        this.dispatchEvent(InputManagerEvent_1.InputManagerEvent.KEY_UP, tempData);
    };
    InputManager.prototype.updateInput = function () {
        //CustomLogger.log("InputManager | updateInput __ START");
        //CustomLogger.logCurrentTime();
        if (this.isDataChanged) {
            this.isDataChanged = false;
            var keyCode;
            for (keyCode in this.pressedKeyCodes) {
                if (this.pressedKeyCodes[keyCode] && !this.prevPressedKeyCodes[keyCode]) {
                    this.justPressedKeyCodes[keyCode] = true;
                }
                else {
                    this.justPressedKeyCodes[keyCode] = false;
                }
                if (!this.pressedKeyCodes[keyCode] && this.prevPressedKeyCodes[keyCode]) {
                    this.justReleasedKeyCodes[keyCode] = true;
                }
                else {
                    this.justReleasedKeyCodes[keyCode] = false;
                }
                this.prevPressedKeyCodes[keyCode] = this.pressedKeyCodes[keyCode];
            }
        }
        //CustomLogger.logCurrentTime();
        //CustomLogger.log("InputManager | updateInput __ END");
    };
    InputManager.prototype.checkIfKeyJustPressed = function (keyCode) {
        return this.justPressedKeyCodes[keyCode];
    };
    InputManager.prototype.checkIfKeyJustReleased = function (keyCode) {
        return this.justReleasedKeyCodes[keyCode];
    };
    InputManager.prototype.checkIfKeyDown = function (keyCode) {
        return this.pressedKeyCodes[keyCode];
    };
    Object.defineProperty(InputManager, "instance", {
        // Static
        get: function () {
            if (!InputManager._instance) {
                InputManager._instance = new InputManager();
            }
            return InputManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return InputManager;
}(index_1.BaseEventListenerObject));
exports.InputManager = InputManager;
//# sourceMappingURL=InputManager.js.map