var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("TestConsoleClass", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TestConsoleClass;
    return {
        setters:[],
        execute: function() {
            TestConsoleClass = (function () {
                function TestConsoleClass() {
                    alert("TestConsoleClass");
                }
                return TestConsoleClass;
            }());
            exports_1("TestConsoleClass", TestConsoleClass);
        }
    }
});
System.register("tooltip/ITooltipData", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("console/view/BaseConsoleButton", ["fgraphics/dist/index", "fcore/dist/index", "console/CC"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var index_1, index_2, CC_1;
    var BaseConsoleButton;
    return {
        setters:[
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (CC_1_1) {
                CC_1 = CC_1_1;
            }],
        execute: function() {
            BaseConsoleButton = (function (_super) {
                __extends(BaseConsoleButton, _super);
                function BaseConsoleButton() {
                    _super.call(this);
                    this._label = "";
                }
                BaseConsoleButton.prototype.construction = function () {
                    _super.prototype.construction.call(this);
                    this.view = index_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
                    this.view.interactive = true;
                    this.view.buttonMode = true;
                    this.field = index_1.EngineAdapter.instance.createTextWrapper();
                    this.view.addChild(this.field);
                    this.field.color = CC_1.CC.config.btnSettings.labelColor;
                    this.field.size = CC_1.CC.config.btnSettings.labelSize;
                    this.commitData();
                    this.onOut();
                };
                BaseConsoleButton.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.eventListenerHelper.addEventListener(this.view, index_1.DisplayObjectWrapperMouseEvent.ROLL_OVER, this.onOver);
                    this.eventListenerHelper.addEventListener(this.view, index_1.DisplayObjectWrapperMouseEvent.ROLL_OUT, this.onOut);
                    this.eventListenerHelper.addEventListener(this.view, index_1.DisplayObjectWrapperMouseEvent.CLICK, this.onClick);
                    this.eventListenerHelper.addEventListener(this.view, index_1.DisplayObjectWrapperMouseEvent.MOUSE_UP_OUTSIDE, this.onOut);
                };
                BaseConsoleButton.prototype.onOver = function () {
                    this.view.alpha = 1;
                    if (this.tooltipData) {
                        CC_1.CC.tooltipManager.show(this.tooltipData);
                    }
                };
                BaseConsoleButton.prototype.onOut = function () {
                    this.view.alpha = 0.75;
                    CC_1.CC.tooltipManager.hide();
                };
                BaseConsoleButton.prototype.onClick = function () {
                    this.onOut();
                };
                BaseConsoleButton.prototype.commitData = function () {
                    _super.prototype.commitData.call(this);
                    this.field.text = this.label;
                    this.arrange();
                };
                BaseConsoleButton.prototype.arrange = function () {
                    _super.prototype.arrange.call(this);
                };
                Object.defineProperty(BaseConsoleButton.prototype, "label", {
                    get: function () {
                        return this._label;
                    },
                    set: function (value) {
                        if (value == this.label) {
                            return;
                        }
                        this._label = value;
                        this.commitData();
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseConsoleButton;
            }(index_2.BaseEventListenerObject));
            exports_3("BaseConsoleButton", BaseConsoleButton);
        }
    }
});
System.register("console/view/capturekey/CaptureKeyButtonEvent", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var CaptuerKeyButtonEvent;
    return {
        setters:[],
        execute: function() {
            CaptuerKeyButtonEvent = (function () {
                function CaptuerKeyButtonEvent() {
                }
                CaptuerKeyButtonEvent.CAPTURE_KEY_PRESS = "CAPTURE_KEY_PRESS";
                return CaptuerKeyButtonEvent;
            }());
            exports_4("CaptuerKeyButtonEvent", CaptuerKeyButtonEvent);
        }
    }
});
System.register("console/view/capturekey/CaptureKeyButton", ["console/view/BaseConsoleButton", "flibs/dist/index", "fcore/dist/index", "console/view/capturekey/CaptureKeyButtonEvent", "console/CC"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var BaseConsoleButton_1, index_3, index_4, CaptureKeyButtonEvent_1, CC_2;
    var CaptureKeyButton;
    return {
        setters:[
            function (BaseConsoleButton_1_1) {
                BaseConsoleButton_1 = BaseConsoleButton_1_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (CaptureKeyButtonEvent_1_1) {
                CaptureKeyButtonEvent_1 = CaptureKeyButtonEvent_1_1;
            },
            function (CC_2_1) {
                CC_2 = CC_2_1;
            }],
        execute: function() {
            CaptureKeyButton = (function (_super) {
                __extends(CaptureKeyButton, _super);
                function CaptureKeyButton() {
                    _super.call(this);
                }
                CaptureKeyButton.prototype.construction = function () {
                    _super.prototype.construction.call(this);
                };
                CaptureKeyButton.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.eventListenerHelper.addEventListener(index_3.InputManager.instance, index_3.InputManagerEvent.KEY_PRESS, this.onKeyPress);
                };
                CaptureKeyButton.prototype.onClick = function () {
                    _super.prototype.onClick.call(this);
                    this.isClicked = !this.isClicked;
                };
                CaptureKeyButton.prototype.onKeyPress = function (data) {
                    if (this.isClicked) {
                        this.isClicked = false;
                        this.captureCode = index_4.KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent);
                        this.captureKey = index_4.KeyboardTools.getCharFromKeyPressEvent(data.nativeEvent);
                        this.commitData();
                    }
                    else if (this.captureCode) {
                        if (index_4.KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent) == this.captureCode) {
                            this.dispatchEvent(CaptureKeyButtonEvent_1.CaptuerKeyButtonEvent.CAPTURE_KEY_PRESS);
                        }
                    }
                };
                CaptureKeyButton.prototype.commitData = function () {
                    _super.prototype.commitData.call(this);
                    if (this.isClicked) {
                        this.label = CC_2.CC.config.localization.captureKeyBtnPressedLabel;
                    }
                    else if (this.captureKey) {
                        this.label = index_4.StringTools.substituteList(CC_2.CC.config.localization.captureKeyBtnNormalLabel, this.captureKey);
                    }
                    else {
                        this.label = index_4.StringTools.substituteList(CC_2.CC.config.localization.captureKeyBtnNormalLabel, CC_2.CC.config.localization.captureKeyBtnNoKeyHelpText);
                    }
                };
                CaptureKeyButton.prototype.arrange = function () {
                    _super.prototype.arrange.call(this);
                };
                Object.defineProperty(CaptureKeyButton.prototype, "isClicked", {
                    get: function () {
                        return this._isClicked;
                    },
                    set: function (value) {
                        if (value == this.isClicked) {
                            return;
                        }
                        this._isClicked = value;
                        this.commitData();
                    },
                    enumerable: true,
                    configurable: true
                });
                return CaptureKeyButton;
            }(BaseConsoleButton_1.BaseConsoleButton));
            exports_5("CaptureKeyButton", CaptureKeyButton);
        }
    }
});
System.register("console/view/BaseConsoleView", ["fgraphics/dist/index", "fcore/dist/index", "flibs/dist/index", "console/view/BaseConsoleButton", "console/CC", "console/view/capturekey/CaptureKeyButton", "console/view/capturekey/CaptureKeyButtonEvent"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var index_5, index_6, index_7, BaseConsoleButton_2, CC_3, CaptureKeyButton_1, CaptureKeyButtonEvent_2;
    var BaseConsoleView;
    return {
        setters:[
            function (index_5_1) {
                index_5 = index_5_1;
            },
            function (index_6_1) {
                index_6 = index_6_1;
            },
            function (index_7_1) {
                index_7 = index_7_1;
            },
            function (BaseConsoleButton_2_1) {
                BaseConsoleButton_2 = BaseConsoleButton_2_1;
            },
            function (CC_3_1) {
                CC_3 = CC_3_1;
            },
            function (CaptureKeyButton_1_1) {
                CaptureKeyButton_1 = CaptureKeyButton_1_1;
            },
            function (CaptureKeyButtonEvent_2_1) {
                CaptureKeyButtonEvent_2 = CaptureKeyButtonEvent_2_1;
            }],
        execute: function() {
            BaseConsoleView = (function (_super) {
                __extends(BaseConsoleView, _super);
                function BaseConsoleView() {
                    _super.call(this);
                }
                BaseConsoleView.prototype.construction = function () {
                    _super.prototype.construction.call(this);
                    this.captureKey = "";
                    this._titleVisible = true;
                    this._captureVisible = false;
                    this.buttonsList = [];
                    this.buttonsEventListenerHelper = new index_6.EventListenerHelper(this);
                    this.view = index_5.EngineAdapter.instance.createDisplayObjectContainerWrapper();
                    this.bgGraphics = index_5.EngineAdapter.instance.createGraphicsWrapper();
                    this.view.addChild(this.bgGraphics);
                    //
                    this.bgGraphics.interactive = true;
                    this.dragHelper = new index_7.DragHelper();
                    this.dragHelper.view = this.bgGraphics;
                    this.contentCont = index_5.EngineAdapter.instance.createDisplayObjectContainerWrapper();
                    this.view.addChild(this.contentCont);
                    this.titleCont = index_5.EngineAdapter.instance.createDisplayObjectContainerWrapper();
                    this.contentCont.addChild(this.titleCont);
                    this.titleLabel = index_5.EngineAdapter.instance.createTextWrapper();
                    this.titleCont.addChild(this.titleLabel);
                    this.titleLabel.color = CC_3.CC.config.viewSettings.titleLabelColor;
                    this.titleLabel.size = CC_3.CC.config.viewSettings.titleLabelSize;
                    this.titleLabel.text = "Test Title";
                    this.btnsCont = index_5.EngineAdapter.instance.createDisplayObjectContainerWrapper();
                    this.titleCont.addChild(this.btnsCont);
                    this.captureBtn = new CaptureKeyButton_1.CaptureKeyButton();
                    this.titleCont.addChild(this.captureBtn.view);
                    this.captureBtn.view.y = this.titleLabel.y + this.titleLabel.height;
                    //
                    this.captureBtn.tooltipData = { title: CC_3.CC.config.localization.captureKeyBtnTooltipTitle };
                    this.commitData();
                };
                BaseConsoleView.prototype.destruction = function () {
                    _super.prototype.destruction.call(this);
                    if (this.buttonsEventListenerHelper) {
                        this.buttonsEventListenerHelper.destruction();
                        this.buttonsEventListenerHelper = null;
                    }
                };
                BaseConsoleView.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.eventListenerHelper.addEventListener(this.dragHelper, index_7.DragHelperEvent.DRAG_START, this.onDragStart);
                    this.eventListenerHelper.addEventListener(this.dragHelper, index_7.DragHelperEvent.DRAG_UPDATE, this.onDragUpdate);
                    this.eventListenerHelper.addEventListener(this.captureBtn, CaptureKeyButtonEvent_2.CaptuerKeyButtonEvent.CAPTURE_KEY_PRESS, this.onCaptureKey);
                };
                BaseConsoleView.prototype.onDragStart = function () {
                    this.viewDragStartX = this.view.x;
                    this.viewDragStartY = this.view.y;
                    CC_3.CC.moveViewToTopLayer(this);
                };
                BaseConsoleView.prototype.onDragUpdate = function () {
                    this.view.x = this.viewDragStartX + this.dragHelper.changeDragGlobalX;
                    this.view.y = this.viewDragStartY + this.dragHelper.changeDragGlobalY;
                };
                BaseConsoleView.prototype.onClose = function () {
                    CC_3.CC.hideView(this);
                };
                BaseConsoleView.prototype.onCaptureKey = function () {
                };
                Object.defineProperty(BaseConsoleView.prototype, "visible", {
                    get: function () {
                        return this._visible;
                    },
                    set: function (value) {
                        if (value == this.visible) {
                            return;
                        }
                        this._visible = value;
                        /*if (this.visible) {
                            CC.showView(this);
                        } else {
                            CC.hideView(this);
                        }*/
                        this.commitData();
                    },
                    enumerable: true,
                    configurable: true
                });
                BaseConsoleView.prototype.commitData = function () {
                    _super.prototype.commitData.call(this);
                    this.titleLabel.visible = this.titleVisible;
                    this.captureBtn.view.visible = this.captureVisible;
                    if (this.captureKey) {
                        this.captureBtn.label = BaseConsoleView.CAPTURE_LABEL_FIRST_PART + " " + this.captureKey;
                    }
                    else {
                        this.captureBtn.label = BaseConsoleView.CAPTURE_LABEL_FIRST_PART + " " + BaseConsoleView.NO_CAPTURE_KEY_TEXT;
                    }
                    this.arrange();
                };
                BaseConsoleView.prototype.arrange = function () {
                    // Reset previously set changes
                    var tempBtn;
                    var prevBtn;
                    var btnsCount = this.buttonsList.length;
                    for (var btnIndex = 0; btnIndex < btnsCount; btnIndex++) {
                        tempBtn = this.buttonsList[btnIndex];
                        if (prevBtn) {
                            tempBtn.view.x = prevBtn.view.x + prevBtn.view.width + 5;
                        }
                        prevBtn = tempBtn;
                    }
                    if (this.titleVisible) {
                        this.btnsCont.x = this.titleLabel.x + this.titleLabel.width + 10;
                    }
                    else {
                        this.btnsCont.x = this.titleLabel.x;
                    }
                    this.bgGraphics.clear();
                    this.bgGraphics.beginFill(CC_3.CC.config.viewSettings.bgColor, CC_3.CC.config.viewSettings.bgAlpha);
                    this.bgGraphics.lineStyle(CC_3.CC.config.viewSettings.borderWidth, CC_3.CC.config.viewSettings.borderColor, CC_3.CC.config.viewSettings.borderAlpha);
                    this.bgGraphics.drawRect(0, 0, this.contentCont.width + CC_3.CC.config.viewSettings.bgToContentShift.x, this.contentCont.height + CC_3.CC.config.viewSettings.bgToContentShift.y);
                    this.bgGraphics.endFill();
                    this.contentCont.x = this.bgGraphics.x + ((this.bgGraphics.width - this.contentCont.width) >> 1);
                    this.contentCont.y = this.bgGraphics.y + ((this.bgGraphics.height - this.contentCont.height) >> 1);
                };
                BaseConsoleView.prototype.createTitleBtn = function (label, tooltipData) {
                    var tempBtn = new BaseConsoleButton_2.BaseConsoleButton();
                    this.btnsCont.addChild(tempBtn.view);
                    tempBtn.label = label;
                    tempBtn.tooltipData = tooltipData;
                    this.buttonsList.push(tempBtn);
                    return tempBtn;
                };
                Object.defineProperty(BaseConsoleView.prototype, "titleVisible", {
                    get: function () {
                        return this._titleVisible;
                    },
                    set: function (value) {
                        if (value == this.titleVisible) {
                            return;
                        }
                        this._titleVisible = value;
                        this.commitData();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseConsoleView.prototype, "captureVisible", {
                    get: function () {
                        return this._captureVisible;
                    },
                    set: function (value) {
                        if (value == this.captureVisible) {
                            return;
                        }
                        this._captureVisible = value;
                        this.commitData();
                    },
                    enumerable: true,
                    configurable: true
                });
                BaseConsoleView.CAPTURE_LABEL_FIRST_PART = "Capture key:";
                BaseConsoleView.NO_CAPTURE_KEY_TEXT = "(click to add)";
                return BaseConsoleView;
            }(index_6.BaseEventListenerObject));
            exports_6("BaseConsoleView", BaseConsoleView);
        }
    }
});
System.register("console/view/ConsoleView", ["console/view/BaseConsoleView", "console/CC", "fgraphics/dist/index"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var BaseConsoleView_1, CC_4, index_8;
    var ConsoleView;
    return {
        setters:[
            function (BaseConsoleView_1_1) {
                BaseConsoleView_1 = BaseConsoleView_1_1;
            },
            function (CC_4_1) {
                CC_4 = CC_4_1;
            },
            function (index_8_1) {
                index_8 = index_8_1;
            }],
        execute: function() {
            ConsoleView = (function (_super) {
                __extends(ConsoleView, _super);
                function ConsoleView() {
                    _super.call(this);
                }
                ConsoleView.prototype.construction = function () {
                    _super.prototype.construction.call(this);
                    this.titleVisible = false;
                    this.displayListBtn = this.createTitleBtn("DL", {
                        title: CC_4.CC.config.localization.displayListBtnTooltipTitle,
                        text: CC_4.CC.config.localization.displayListBtnTooltipText
                    });
                    this.closeBtn = this.createTitleBtn("X", { title: CC_4.CC.config.localization.closeBtnTooltipTitle });
                };
                ConsoleView.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.eventListenerHelper.addEventListener(this.displayListBtn.view, index_8.DisplayObjectWrapperMouseEvent.CLICK, this.onDisplayListClick);
                    this.eventListenerHelper.addEventListener(this.closeBtn.view, index_8.DisplayObjectWrapperMouseEvent.CLICK, this.onClose);
                };
                ConsoleView.prototype.onDisplayListClick = function () {
                    CC_4.CC.toggleView(CC_4.CC.displayListView);
                };
                return ConsoleView;
            }(BaseConsoleView_1.BaseConsoleView));
            exports_7("ConsoleView", ConsoleView);
        }
    }
});
System.register("console/view/DisplayListView", ["console/view/BaseConsoleView", "fgraphics/dist/index", "fcore/dist/index", "console/CC"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var BaseConsoleView_2, index_9, index_10, CC_5;
    var DisplayListView;
    return {
        setters:[
            function (BaseConsoleView_2_1) {
                BaseConsoleView_2 = BaseConsoleView_2_1;
            },
            function (index_9_1) {
                index_9 = index_9_1;
            },
            function (index_10_1) {
                index_10 = index_10_1;
            },
            function (CC_5_1) {
                CC_5 = CC_5_1;
            }],
        execute: function() {
            DisplayListView = (function (_super) {
                __extends(DisplayListView, _super);
                function DisplayListView() {
                    _super.call(this);
                }
                DisplayListView.prototype.construction = function () {
                    _super.prototype.construction.call(this);
                    this.captureVisible = true;
                    this.lastCheckedPos = new index_10.Point();
                    this.titleLabel.text = "Display List";
                    this.displayListField = index_9.EngineAdapter.instance.createTextWrapper();
                    this.contentCont.addChild(this.displayListField);
                    this.displayListField.y = this.titleCont.y + this.titleCont.height + 5;
                    this.displayListField.color = CC_5.CC.config.displayListSettings.hierarchyLabelColor;
                    this.displayListField.size = CC_5.CC.config.displayListSettings.hierarchyLabelSize;
                    this.closeBtn = this.createTitleBtn("X", { title: CC_5.CC.config.localization.closeBtnTooltipTitle });
                };
                DisplayListView.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.eventListenerHelper.addEventListener(index_9.EngineAdapter.instance.mainTicker, index_9.TickerEvent.TICK, this.onTick);
                    this.eventListenerHelper.addEventListener(this.closeBtn.view, index_9.DisplayObjectWrapperMouseEvent.CLICK, this.onClose);
                };
                DisplayListView.prototype.onTick = function () {
                    if (this.visible) {
                        if (this.lastCheckedPos.x != index_9.EngineAdapter.instance.globalMouseX ||
                            this.lastCheckedPos.y != index_9.EngineAdapter.instance.globalMouseY) {
                            this.lastCheckedPos.x = index_9.EngineAdapter.instance.globalMouseX;
                            this.lastCheckedPos.y = index_9.EngineAdapter.instance.globalMouseY;
                            var underPointData = index_9.EngineAdapter.instance.getNativeObjectsUnderPoint(index_9.EngineAdapter.instance.stage.object, index_9.EngineAdapter.instance.globalMouseX, index_9.EngineAdapter.instance.globalMouseY);
                            var listText = this.parseUnderPointData(underPointData);
                            this.displayListField.text = listText;
                            this.arrange();
                        }
                    }
                };
                DisplayListView.prototype.onCaptureKey = function () {
                    _super.prototype.onCaptureKey.call(this);
                    var underPointData = index_9.EngineAdapter.instance.getNativeObjectsUnderPoint(index_9.EngineAdapter.instance.stage.object, index_9.EngineAdapter.instance.globalMouseX, index_9.EngineAdapter.instance.globalMouseY);
                    // Log the parsed structure
                    console.group("Display list structure:");
                    this.groupLogUnderPointData(underPointData);
                    console.groupEnd();
                };
                DisplayListView.prototype.getObjectsUnderMouse = function () {
                    return index_9.EngineAdapter.instance.getNativeObjectsUnderPoint(index_9.EngineAdapter.instance.stage.object, index_9.EngineAdapter.instance.globalMouseX, index_9.EngineAdapter.instance.globalMouseY);
                };
                DisplayListView.prototype.parseUnderPointData = function (data, prefix) {
                    if (prefix === void 0) { prefix = "∟"; }
                    var result = "";
                    if (data && data.object) {
                        var tempName = data.object.toString();
                        if (data.object.constructor) {
                            tempName = data.object.constructor.name;
                        }
                        result += prefix + " " + tempName;
                        var childPrefix = "- " + prefix;
                        var childrenCount = data.children.length;
                        for (var childIndex = 0; childIndex < childrenCount; childIndex++) {
                            result += "\n" + this.parseUnderPointData(data.children[childIndex], childPrefix);
                        }
                    }
                    return result;
                };
                DisplayListView.prototype.groupLogUnderPointData = function (data, prefix) {
                    if (prefix === void 0) { prefix = "∟"; }
                    if (data && data.object) {
                        //console.log(data.object);
                        //console.dir(data.object);
                        console.log(prefix, data.object);
                        if (data.children && data.children.length > 0) {
                            // console.group(" children");
                            var childrenCount = data.children.length;
                            for (var childIndex = 0; childIndex < childrenCount; childIndex++) {
                                this.groupLogUnderPointData(data.children[childIndex], "    " + prefix);
                            }
                        }
                    }
                };
                return DisplayListView;
            }(BaseConsoleView_2.BaseConsoleView));
            exports_8("DisplayListView", DisplayListView);
        }
    }
});
System.register("console/Config", [], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var Config;
    return {
        setters:[],
        execute: function() {
            Config = (function () {
                function Config() {
                    this.localization = {
                        closeBtnTooltipTitle: "Close",
                        displayListBtnTooltipTitle: "Display List Inspector",
                        displayListBtnTooltipText: "Map the display list\nunder your mouse",
                        captureKeyBtnTooltipTitle: "Assign a key",
                        captureKeyBtnNormalLabel: "Capture key: {0}",
                        captureKeyBtnPressedLabel: "Press a key",
                        captureKeyBtnNoKeyHelpText: "(click to add)",
                        displayListTitle: "Display List Inspector",
                    };
                    this.btnSettings = {
                        labelSize: 14,
                        labelColor: 0xFF9900
                    };
                    this.viewSettings = {
                        bgColor: 0x000000,
                        bgAlpha: 0.75,
                        bgToContentShift: { x: 10, y: 10 },
                        borderWidth: 1,
                        borderColor: 0x660000,
                        borderAlpha: 0.75,
                        titleLabelColor: 0xFFFFFF,
                        titleLabelSize: 14
                    };
                    this.displayListSettings = {
                        hierarchyLabelColor: 0xCCCCCC,
                        hierarchyLabelSize: 14
                    };
                    this.tooltipSettings = {
                        bgColor: 0x000000,
                        bgAlpha: 0.75,
                        bgToContentShift: { x: 10, y: 10 },
                        borderWidth: 1,
                        borderColor: 0x660000,
                        borderAlpha: 0.75,
                        titleLabelColor: 0xFF9900,
                        titleLabelSize: 14,
                        textLabelColor: 0xCCCCCC,
                        textLabelSize: 12
                    };
                }
                return Config;
            }());
            exports_9("Config", Config);
        }
    }
});
System.register("tooltip/BaseTooltip", ["fgraphics/dist/index", "fcore/dist/index"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var index_11, index_12;
    var BaseTooltip;
    return {
        setters:[
            function (index_11_1) {
                index_11 = index_11_1;
            },
            function (index_12_1) {
                index_12 = index_12_1;
            }],
        execute: function() {
            BaseTooltip = (function (_super) {
                __extends(BaseTooltip, _super);
                function BaseTooltip() {
                    _super.apply(this, arguments);
                }
                BaseTooltip.prototype.construction = function () {
                    _super.prototype.construction.call(this);
                    this.view = index_11.EngineAdapter.instance.createDisplayObjectContainerWrapper();
                };
                BaseTooltip.prototype.commitData = function () {
                    _super.prototype.commitData.call(this);
                    this.tooltipData = this.data;
                };
                return BaseTooltip;
            }(index_12.BaseObject));
            exports_10("BaseTooltip", BaseTooltip);
        }
    }
});
System.register("tooltip/TooltipManager", ["fcore/dist/index", "fgraphics/dist/index"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var index_13, index_14;
    var TooltipManager;
    return {
        setters:[
            function (index_13_1) {
                index_13 = index_13_1;
            },
            function (index_14_1) {
                index_14 = index_14_1;
            }],
        execute: function() {
            TooltipManager = (function (_super) {
                __extends(TooltipManager, _super);
                function TooltipManager(tooltip) {
                    _super.call(this, tooltip);
                }
                TooltipManager.prototype.construction = function (tooltip) {
                    _super.prototype.construction.call(this);
                    this.tooltip = tooltip;
                    this.mouseShift = new index_13.Point();
                    this.tooltipInsideCont = index_14.EngineAdapter.instance.createDisplayObjectContainerWrapper();
                    this.tooltipInsideCont.addChild(this.tooltip.view);
                    this.hide();
                };
                TooltipManager.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.eventListenerHelper.addEventListener(index_14.EngineAdapter.instance.mainTicker, index_14.TickerEvent.TICK, this.onTick);
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
                    var tempPos = new index_13.Point(index_14.EngineAdapter.instance.globalMouseX, index_14.EngineAdapter.instance.globalMouseY);
                    tempPos.x += this.mouseShift.x;
                    tempPos.y += this.mouseShift.y;
                    if (tempPos.x < 0) {
                        tempPos.x = 0;
                    }
                    else if (tempPos.x + this.tooltip.view.width > index_14.EngineAdapter.instance.rendererWidth) {
                        tempPos.x = index_14.EngineAdapter.instance.rendererWidth - this.tooltip.view.width;
                    }
                    if (tempPos.y < 0) {
                        tempPos.y = 0;
                    }
                    else if (tempPos.y + this.tooltip.view.height > index_14.EngineAdapter.instance.rendererHeight) {
                        tempPos.y = index_14.EngineAdapter.instance.rendererHeight - this.tooltip.view.height;
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
            }(index_13.BaseEventListenerObject));
            exports_11("TooltipManager", TooltipManager);
        }
    }
});
System.register("console/view/tooltip/ConsoleTooltip", ["tooltip/BaseTooltip", "fgraphics/dist/index", "console/CC"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var BaseTooltip_1, index_15, CC_6;
    var ConsoleTooltip;
    return {
        setters:[
            function (BaseTooltip_1_1) {
                BaseTooltip_1 = BaseTooltip_1_1;
            },
            function (index_15_1) {
                index_15 = index_15_1;
            },
            function (CC_6_1) {
                CC_6 = CC_6_1;
            }],
        execute: function() {
            ConsoleTooltip = (function (_super) {
                __extends(ConsoleTooltip, _super);
                function ConsoleTooltip() {
                    _super.call(this);
                }
                ConsoleTooltip.prototype.construction = function () {
                    _super.prototype.construction.call(this);
                    this.bg = index_15.EngineAdapter.instance.createGraphicsWrapper();
                    this.view.addChild(this.bg);
                    this.contentCont = index_15.EngineAdapter.instance.createDisplayObjectContainerWrapper();
                    this.view.addChild(this.contentCont);
                    this.titleLabel = index_15.EngineAdapter.instance.createTextWrapper();
                    this.contentCont.addChild(this.titleLabel);
                    this.titleLabel.align = index_15.TextWrapperAlign.CENTER;
                    this.titleLabel.color = CC_6.CC.config.tooltipSettings.titleLabelColor;
                    this.titleLabel.size = CC_6.CC.config.tooltipSettings.titleLabelSize;
                    this.textLabel = index_15.EngineAdapter.instance.createTextWrapper();
                    this.contentCont.addChild(this.textLabel);
                    this.textLabel.align = index_15.TextWrapperAlign.CENTER;
                    this.textLabel.color = CC_6.CC.config.tooltipSettings.textLabelColor;
                    this.textLabel.size = CC_6.CC.config.tooltipSettings.textLabelSize;
                };
                ConsoleTooltip.prototype.commitData = function () {
                    _super.prototype.commitData.call(this);
                    if (!this.tooltipData) {
                        return;
                    }
                    this.titleLabel.text = this.tooltipData.title;
                    this.textLabel.text = this.tooltipData.text;
                    if (this.tooltipData.text) {
                        this.textLabel.visible = true;
                    }
                    else {
                        this.textLabel.visible = false;
                    }
                    this.arrange();
                };
                ConsoleTooltip.prototype.arrange = function () {
                    _super.prototype.arrange.call(this);
                    if (this.textLabel.visible) {
                        var labelMaxWidth = Math.max(this.titleLabel.width, this.textLabel.width);
                        this.titleLabel.x = ((labelMaxWidth - this.titleLabel.width) >> 1);
                        this.textLabel.x = ((labelMaxWidth - this.textLabel.width) >> 1);
                        this.textLabel.y = this.titleLabel.y + this.titleLabel.height;
                    }
                    else {
                        this.titleLabel.x = 0;
                    }
                    this.bg.clear();
                    this.bg.beginFill(CC_6.CC.config.tooltipSettings.bgColor, CC_6.CC.config.tooltipSettings.bgAlpha);
                    this.bg.lineStyle(CC_6.CC.config.tooltipSettings.borderWidth, CC_6.CC.config.tooltipSettings.borderColor, CC_6.CC.config.tooltipSettings.borderAlpha);
                    this.bg.drawRect(0, 0, this.contentCont.width + CC_6.CC.config.tooltipSettings.bgToContentShift.x, this.contentCont.height + CC_6.CC.config.tooltipSettings.bgToContentShift.y);
                    this.bg.endFill();
                    this.contentCont.x = this.bg.x + ((this.bg.width - this.contentCont.width) >> 1);
                    this.contentCont.y = this.bg.y + ((this.bg.height - this.contentCont.height) >> 1);
                };
                return ConsoleTooltip;
            }(BaseTooltip_1.BaseTooltip));
            exports_12("ConsoleTooltip", ConsoleTooltip);
        }
    }
});
System.register("console/CC", ["fgraphics/dist/index", "console/view/ConsoleView", "console/view/DisplayListView", "fcore/dist/index", "flibs/dist/index", "console/Config", "tooltip/TooltipManager", "console/view/tooltip/ConsoleTooltip"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var index_16, ConsoleView_1, DisplayListView_1, index_17, index_18, Config_1, TooltipManager_1, ConsoleTooltip_1;
    var CC;
    return {
        setters:[
            function (index_16_1) {
                index_16 = index_16_1;
            },
            function (ConsoleView_1_1) {
                ConsoleView_1 = ConsoleView_1_1;
            },
            function (DisplayListView_1_1) {
                DisplayListView_1 = DisplayListView_1_1;
            },
            function (index_17_1) {
                index_17 = index_17_1;
            },
            function (index_18_1) {
                index_18 = index_18_1;
            },
            function (Config_1_1) {
                Config_1 = Config_1_1;
            },
            function (TooltipManager_1_1) {
                TooltipManager_1 = TooltipManager_1_1;
            },
            function (ConsoleTooltip_1_1) {
                ConsoleTooltip_1 = ConsoleTooltip_1_1;
            }],
        execute: function() {
            CC = (function () {
                function CC() {
                }
                CC.startInit = function (root, password, config) {
                    if (password === void 0) { password = "`"; }
                    CC.root = index_16.EngineAdapter.instance.createDisplayWrapperBasedOnObject(root);
                    CC.viewsCont = index_16.EngineAdapter.instance.createDisplayObjectContainerWrapper();
                    CC.root.addChild(CC.viewsCont);
                    CC.tooltipsCont = index_16.EngineAdapter.instance.createDisplayObjectContainerWrapper();
                    CC.root.addChild(CC.tooltipsCont);
                    CC.password = password;
                    if (!config) {
                        config = new Config_1.Config();
                    }
                    CC.config = config;
                    var tempTooltip = new ConsoleTooltip_1.ConsoleTooltip();
                    CC.tooltipManager = new TooltipManager_1.TooltipManager(tempTooltip);
                    CC.tooltipManager.tooltipCont = CC.tooltipsCont;
                    CC.tooltipManager.mouseShift = new index_17.Point(10, 15);
                    // View
                    CC.view = new ConsoleView_1.ConsoleView();
                    CC.displayListView = new DisplayListView_1.DisplayListView();
                    // Events
                    CC.eventListenerHelper.addEventListener(index_18.InputManager.instance, index_18.InputManagerEvent.KEY_PRESS, function (data) {
                        var charCode = index_17.KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent);
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
                            index_16.DisplayObjectTools.moveObjectToTopLayer(CC.viewsCont);
                            index_16.DisplayObjectTools.moveObjectToTopLayer(CC.tooltipsCont);
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
                        view.view.x = index_16.EngineAdapter.instance.globalMouseX + 1;
                        view.view.y = index_16.EngineAdapter.instance.globalMouseY + 1;
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
                    index_16.DisplayObjectTools.moveObjectToTopLayer(view.view);
                };
                CC.eventListenerHelper = new index_17.EventListenerHelper();
                CC.password = "";
                CC.passwordInputIndex = 0;
                return CC;
            }());
            exports_13("CC", CC);
        }
    }
});
System.register("index", ["TestConsoleClass", "console/CC", "console/Config", "tooltip/BaseTooltip", "tooltip/TooltipManager", "console/view/BaseConsoleButton", "console/view/BaseConsoleView", "console/view/ConsoleView", "console/view/DisplayListView", "console/view/capturekey/CaptureKeyButton", "console/view/capturekey/CaptureKeyButtonEvent", "console/view/tooltip/ConsoleTooltip"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_14(exports);
    }
    return {
        setters:[
            function (TestConsoleClass_1_1) {
                exportStar_1(TestConsoleClass_1_1);
            },
            function (CC_7_1) {
                exportStar_1(CC_7_1);
            },
            function (Config_2_1) {
                exportStar_1(Config_2_1);
            },
            function (BaseTooltip_2_1) {
                exportStar_1(BaseTooltip_2_1);
            },
            function (TooltipManager_2_1) {
                exportStar_1(TooltipManager_2_1);
            },
            function (BaseConsoleButton_3_1) {
                exportStar_1(BaseConsoleButton_3_1);
            },
            function (BaseConsoleView_3_1) {
                exportStar_1(BaseConsoleView_3_1);
            },
            function (ConsoleView_2_1) {
                exportStar_1(ConsoleView_2_1);
            },
            function (DisplayListView_2_1) {
                exportStar_1(DisplayListView_2_1);
            },
            function (CaptureKeyButton_2_1) {
                exportStar_1(CaptureKeyButton_2_1);
            },
            function (CaptureKeyButtonEvent_3_1) {
                exportStar_1(CaptureKeyButtonEvent_3_1);
            },
            function (ConsoleTooltip_2_1) {
                exportStar_1(ConsoleTooltip_2_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=fconsole.js.map