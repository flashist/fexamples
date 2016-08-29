"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("fcore/dist/index");
var PixiTickerWrapper_1 = require("./wrapper/ticker/PixiTickerWrapper");
var EngineAdapter_1 = require("../abstract/EngineAdapter");
var EngineAdapterEvent_1 = require("../abstract/EngineAdapterEvent");
var PixiTextWrapper_1 = require("./wrapper/display/PixiTextWrapper");
var PixiSpriteWrapper_1 = require("./wrapper/display/PixiSpriteWrapper");
var PixiDisplayObjectContainerWrapper_1 = require("./wrapper/display/PixiDisplayObjectContainerWrapper");
var PixiDisplayObjectWrapper_1 = require("./wrapper/display/PixiDisplayObjectWrapper");
var PixiGraphicsWrapper_1 = require("./wrapper/display/PixiGraphicsWrapper");
var DisplayObjectWithNameVO_1 = require("../../tools/display/DisplayObjectWithNameVO");
var PixiAdapter = (function (_super) {
    __extends(PixiAdapter, _super);
    function PixiAdapter(initData) {
        _super.call(this, initData);
        this.cachedPoint = new PIXI.Point();
        index_1.Logger.log("PixiAdapter: ", this);
    }
    PixiAdapter.prototype.construction = function (initData) {
        _super.prototype.construction.call(this, initData);
        this.rendererSize = new index_1.Point();
        this.tickerWrapper = new PixiTickerWrapper_1.PixiTickerWrapper();
        this.tickerWrapper.object = PIXI.ticker.shared;
        if (initData) {
            this.renderer = initData.renderer;
        }
        if (initData && initData.nativeStage) {
            this._stage = this.createDisplayObjectContainerWrapper(initData.nativeStage);
        }
        else {
            this._stage = this.createDisplayObjectContainerWrapper();
        }
        if (!this.renderer) {
            var tempRendererSettings = {};
            if (initData && initData.rendererSettings) {
                tempRendererSettings = initData.rendererSettings;
            }
            this.renderer = PIXI.autoDetectRenderer(initData.rendererWidth, initData.rendererHeight, tempRendererSettings);
        }
    };
    Object.defineProperty(PixiAdapter.prototype, "stage", {
        get: function () {
            return this._stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiAdapter.prototype, "canvas", {
        get: function () {
            return this.renderer.view;
        },
        set: function (value) {
            alert("PixiAdapter | set canvas __ WARNING! The canvas setter is not implemented!");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiAdapter.prototype, "rendererWidth", {
        get: function () {
            return this.renderer.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiAdapter.prototype, "rendererHeight", {
        get: function () {
            return this.renderer.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiAdapter.prototype, "mainTicker", {
        get: function () {
            return this.tickerWrapper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiAdapter.prototype, "BaseDisplayObjectClass", {
        get: function () {
            return PIXI.DisplayObject;
        },
        enumerable: true,
        configurable: true
    });
    PixiAdapter.prototype.renderGraphics = function () {
        this.renderer.render(this._stage.object);
    };
    PixiAdapter.prototype.changeRenderSize = function (width, height) {
        this.renderer.resize(width, height);
        //
        this.dispatchEvent(EngineAdapterEvent_1.EngineAdapterEvent.RENDER_SIZE_CHANGE);
    };
    PixiAdapter.prototype.createDisplayWrapperBasedOnObject = function (object) {
        var result;
        if (object instanceof PIXI.Text) {
            result = this.createTextWrapper(object);
        }
        else if (object instanceof PIXI.Sprite) {
            result = this.createSpriteWrapper(object);
        }
        else if (object instanceof PIXI.Graphics) {
            result = this.createGraphicsWrapper(object);
        }
        else if (object instanceof PIXI.ParticleContainer) {
            result = this.createPerformanceDisplayObjectContainerWrapper(object);
        }
        else if (object instanceof PIXI.Container) {
            result = this.createDisplayObjectContainerWrapper(object);
        }
        else if (object instanceof PIXI.DisplayObject) {
            result = this.createDisplayObjectWrapper(object);
        }
        return result;
    };
    PixiAdapter.prototype.createTextWrapper = function (object) {
        var result = new PixiTextWrapper_1.PixiTextWrapper();
        if (!object) {
            object = new PIXI.Text("", { fill: 0xFFFFFF });
        }
        result.object = object;
        return result;
    };
    PixiAdapter.prototype.createSpriteWrapper = function (object) {
        var result = new PixiSpriteWrapper_1.PixiSpriteWrapper();
        if (!object) {
            object = new PIXI.Sprite();
        }
        result.object = object;
        return result;
    };
    PixiAdapter.prototype.createDisplayObjectContainerWrapper = function (object) {
        var result = new PixiDisplayObjectContainerWrapper_1.PixiDisplayObjectContainerWrapper();
        if (!object) {
            object = new PIXI.Container();
        }
        result.object = object;
        return result;
    };
    PixiAdapter.prototype.createPerformanceDisplayObjectContainerWrapper = function (object) {
        if (!object) {
            object = new PIXI.ParticleContainer();
        }
        var result = this.createDisplayObjectContainerWrapper(object);
        return result;
    };
    PixiAdapter.prototype.createDisplayObjectWrapper = function (object) {
        var result = new PixiDisplayObjectWrapper_1.PixiDisplayObjectWrapper();
        if (!object) {
            object = new PIXI.DisplayObject();
        }
        result.object = object;
        return result;
    };
    PixiAdapter.prototype.createGraphicsWrapper = function (object) {
        var result = new PixiGraphicsWrapper_1.PixiGraphicsWrapper();
        if (!object) {
            object = new PIXI.Graphics();
        }
        result.object = object;
        return result;
    };
    Object.defineProperty(PixiAdapter.prototype, "globalMouseX", {
        get: function () {
            return this.renderer.plugins.interaction.mouse.global.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiAdapter.prototype, "globalMouseY", {
        get: function () {
            return this.renderer.plugins.interaction.mouse.global.y;
        },
        enumerable: true,
        configurable: true
    });
    /*public setFieldTextsByNameInHierarchy(nativeContainer:any,
     params:any = null):void {
     var pixiContainer:PIXI.Container = (nativeContainer as PIXI.Container);

     var tempText:string;
     var tempTextWrapper:ITextWrapper = this.createTextWrapper();
     var tempField:PIXI.Text;
     pixiContainer.children.forEach(
     (item:PIXI.DisplayObject, index:number, array:PIXI.DisplayObject[]):void => {
     if (item instanceof PIXI.Text) {
     tempField = (item as PIXI.Text);

     tempText = this.localeManager.getText(tempField.name, params);
     if (tempText) {
     tempTextWrapper.object = tempText;
     TextFieldTools.setText(tempTextWrapper, tempText);
     }

     } else if (item instanceof PIXI.Container) {
     this.setFieldTextsByNameInHierarchy((item as PIXI.Container), params);
     }
     }
     );

     tempTextWrapper.destruction();
     }*/
    PixiAdapter.prototype.findChildrenByNamePart = function (nativeContainer, namePart, isRecursive) {
        var result = [];
        var pixiContainer = nativeContainer;
        var tempDisplayObject;
        var tempDisplayObjectWrapper;
        var tempContainer;
        var tempData;
        var propName;
        for (propName in pixiContainer) {
            if (pixiContainer[propName] == pixiContainer.parent) {
                // Do nothing to prevent wrong recursion
                continue;
            }
            else if (propName.indexOf(namePart) != -1) {
                tempDisplayObject = pixiContainer[propName];
                if (tempDisplayObject && (tempDisplayObject instanceof PIXI.DisplayObject)) {
                    tempDisplayObjectWrapper = this.createDisplayWrapperBasedOnObject(tempDisplayObject);
                    tempData = new DisplayObjectWithNameVO_1.DisplayObjectWithNameVO();
                    tempData.object = tempDisplayObjectWrapper;
                    tempData.name = propName;
                    result.push(tempData);
                }
            }
            else if (isRecursive) {
                tempContainer = pixiContainer[propName];
                if (tempContainer && (tempContainer instanceof PIXI.Container)) {
                    var tempItems = this.findChildrenByNamePart(tempContainer, namePart, isRecursive);
                    result = result.concat(tempItems);
                }
            }
        }
        return result;
    };
    PixiAdapter.prototype.findChildByName = function (nativeContainer, childName, isRecursive) {
        var _this = this;
        var result;
        var pixiContainer = nativeContainer;
        if (pixiContainer[childName] instanceof PIXI.DisplayObject) {
            result = this.createDisplayWrapperBasedOnObject(pixiContainer[childName]);
        }
        else if (isRecursive) {
            var tempChildContainer;
            var everyResult;
            pixiContainer.children.every(function (item, index, array) {
                everyResult = true;
                if (item instanceof PIXI.Container) {
                    tempChildContainer = item;
                    result = _this.findChildByName(tempChildContainer, childName, isRecursive);
                    if (result) {
                        everyResult = false;
                    }
                }
                return everyResult;
            });
        }
        return result;
    };
    PixiAdapter.prototype.getNativeObjectsUnderPoint = function (root, x, y) {
        var result;
        var isUnderPoint = false;
        if (root.containsPoint) {
            this.cachedPoint.x = x;
            this.cachedPoint.y = y;
            if (root.containsPoint(this.cachedPoint)) {
                isUnderPoint = true;
            }
        }
        else {
            var tempBounds = root.getBounds();
            if (tempBounds.contains(x, y)) {
                isUnderPoint = true;
            }
        }
        if (isUnderPoint) {
            result = { object: root, children: [] };
            var rootContainer = root;
            if (rootContainer.children && rootContainer.children.length > 0) {
                var tempChild = void 0;
                var tempChildResult = void 0;
                var childrenCount = rootContainer.children.length;
                for (var childIndex = 0; childIndex < childrenCount; childIndex++) {
                    tempChild = rootContainer.children[childIndex];
                    tempChildResult = this.getNativeObjectsUnderPoint(tempChild, x, y);
                    if (tempChildResult) {
                        result.children.push(tempChildResult);
                    }
                }
            }
        }
        return result;
    };
    return PixiAdapter;
}(EngineAdapter_1.EngineAdapter));
exports.PixiAdapter = PixiAdapter;
//# sourceMappingURL=PixiAdapter.js.map