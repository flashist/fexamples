"use strict";
var index_1 = require("fgraphics/dist/index");
var ConsoleView_1 = require("./view/ConsoleView");
var DisplayListView_1 = require("./view/DisplayListView");
var index_2 = require("fcore/dist/index");
var index_3 = require("flibs/dist/index");
var Config_1 = require("./Config");
var TooltipManager_1 = require("../tooltip/TooltipManager");
var ConsoleTooltip_1 = require("./view/tooltip/ConsoleTooltip");
var CC = (function () {
    function CC() {
    }
    CC.startInit = function (root, password, config) {
        if (password === void 0) { password = "`"; }
        index_2.Logger.log("CC: ", CC);
        CC.root = root;
        CC.contentCont = index_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
        CC.root.addChild(CC.contentCont);
        CC.viewsCont = index_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
        CC.contentCont.addChild(CC.viewsCont);
        CC.tooltipsCont = index_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
        CC.contentCont.addChild(CC.tooltipsCont);
        CC.password = password;
        if (!config) {
            config = new Config_1.Config();
        }
        CC.config = config;
        var tempTooltip = new ConsoleTooltip_1.ConsoleTooltip();
        CC.tooltipManager = new TooltipManager_1.TooltipManager(tempTooltip);
        CC.tooltipManager.tooltipCont = CC.tooltipsCont;
        CC.tooltipManager.mouseShift = new index_2.Point(10, 15);
        // View
        CC.view = new ConsoleView_1.ConsoleView();
        CC.displayListView = new DisplayListView_1.DisplayListView();
        // Events
        CC.eventListenerHelper.addEventListener(index_3.InputManager.instance, index_3.InputManagerEvent.KEY_PRESS, function (data) {
            var charCode = index_2.KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent);
            if (charCode === CC.password.charCodeAt(CC.passwordInputIndex)) {
                CC.passwordInputIndex++;
                if (CC.passwordInputIndex >= CC.password.length) {
                    CC.onPasswordInput();
                    CC.passwordInputIndex = 0;
                }
            }
            else {
                CC.passwordInputIndex = 0;
            }
        });
    };
    CC.onPasswordInput = function () {
        CC.visible = !CC.visible;
    };
    Object.defineProperty(CC, "visible", {
        get: function () {
            return CC.view.visible;
        },
        set: function (value) {
            if (value) {
                CC.showView(CC.view, false);
                index_1.DisplayObjectTools.moveObjectToTopLayer(CC.viewsCont);
                index_1.DisplayObjectTools.moveObjectToTopLayer(CC.tooltipsCont);
            }
            else {
                CC.hideView(CC.view);
            }
        },
        enumerable: true,
        configurable: true
    });
    CC.showView = function (view, moveToMouse) {
        if (moveToMouse === void 0) { moveToMouse = true; }
        CC.viewsCont.addChild(view.view);
        view.visible = true;
        CC.moveViewToTopLayer(view);
        if (moveToMouse) {
            view.view.x = index_1.EngineAdapter.instance.globalMouseX + 1;
            view.view.y = index_1.EngineAdapter.instance.globalMouseY + 1;
        }
    };
    CC.hideView = function (view) {
        if (view.view.parent) {
            view.view.parent.removeChild(view.view);
        }
        view.visible = false;
    };
    CC.toggleView = function (view, moveToMouse) {
        if (moveToMouse === void 0) { moveToMouse = true; }
        if (view.visible) {
            CC.hideView(view);
        }
        else {
            CC.showView(view, moveToMouse);
        }
    };
    CC.moveViewToTopLayer = function (view) {
        index_1.DisplayObjectTools.moveObjectToTopLayer(view.view);
    };
    CC.eventListenerHelper = new index_2.EventListenerHelper();
    CC.password = "";
    CC.passwordInputIndex = 0;
    return CC;
}());
exports.CC = CC;
//# sourceMappingURL=CC.js.map