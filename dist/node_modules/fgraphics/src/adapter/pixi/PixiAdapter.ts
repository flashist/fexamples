import {Point, Logger} from "fcore/dist/index";
import {PixiTickerWrapper} from "./wrapper/ticker/PixiTickerWrapper";
import {IEngineAdapter, IObjectUnderPointVO} from "../abstract/IEngineAdapter";
import {EngineAdapter} from "../abstract/EngineAdapter";
import {IDisplayObjectContainerWrapper} from "../abstract/wrapper/display/IDisplayObjectContainerWrapper";
import {EngineAdapterEvent} from "../abstract/EngineAdapterEvent";
import {ITickerWrapper} from "../abstract/wrapper/ticker/ITickerWrapper";
import {IDisplayObjectWrapper} from "../abstract/wrapper/display/IDisplayObjectWrapper";
import {ITextWrapper} from "../abstract/wrapper/display/ITextWrapper";
import {PixiTextWrapper} from "./wrapper/display/PixiTextWrapper";
import {ISpriteWrapper} from "../abstract/wrapper/display/ISpriteWrapper";
import {PixiSpriteWrapper} from "./wrapper/display/PixiSpriteWrapper";
import {PixiDisplayObjectContainerWrapper} from "./wrapper/display/PixiDisplayObjectContainerWrapper";
import {PixiDisplayObjectWrapper} from "./wrapper/display/PixiDisplayObjectWrapper";
import {IGraphicsWrapper} from "../abstract/wrapper/display/IGraphicsWrapper";
import {PixiGraphicsWrapper} from "./wrapper/display/PixiGraphicsWrapper";
import {DisplayObjectWithNameVO} from "../../tools/display/DisplayObjectWithNameVO";
import {IPixiAdapterInitData} from "./IPixiAdapterInitData";
import WebGLRenderer = PIXI.WebGLRenderer;

export class PixiAdapter extends EngineAdapter implements IEngineAdapter {

    protected renderer:PIXI.SystemRenderer;
    protected _stage:PixiDisplayObjectContainerWrapper;
    protected tickerWrapper:PixiTickerWrapper;
    protected rendererSize:Point;

    constructor(initData?:IPixiAdapterInitData) {
        super(initData);

        Logger.log("PixiAdapter: ", this);
    }

    protected construction(initData?:IPixiAdapterInitData):void {
        super.construction(initData);

        this.rendererSize = new Point();

        this.tickerWrapper = new PixiTickerWrapper();
        this.tickerWrapper.object = PIXI.ticker.shared;

        if (initData) {
            this.renderer = initData.renderer;
        }

        if (initData && initData.nativeStage) {
            this._stage = (this.createDisplayObjectContainerWrapper(initData.nativeStage) as PixiDisplayObjectContainerWrapper);
        } else {
            this._stage = (this.createDisplayObjectContainerWrapper() as PixiDisplayObjectContainerWrapper);
        }

        if (!this.renderer) {
            let tempRendererSettings:PIXI.RendererOptions = {};
            if (initData && initData.rendererSettings) {
                tempRendererSettings = initData.rendererSettings;
            }

            this.renderer = PIXI.autoDetectRenderer(
                initData.rendererWidth,
                initData.rendererHeight,
                tempRendererSettings
            );
        }
    }


    public get stage():IDisplayObjectContainerWrapper {
        return this._stage;
    }

    public get canvas():HTMLCanvasElement {
        return this.renderer.view;
    }
    public set canvas(value:HTMLCanvasElement) {
        alert("PixiAdapter | set canvas __ WARNING! The canvas setter is not implemented!");
    }

    public get rendererWidth():number {
        return this.renderer.width;
    }

    public get rendererHeight():number {
        return this.renderer.height;
    }

    public get mainTicker():ITickerWrapper {
        return this.tickerWrapper;
    }

    public get BaseDisplayObjectClass():any {
        return PIXI.DisplayObject;
    }


    public renderGraphics():void {
        this.renderer.render(this._stage.object as PIXI.Container);
    }

    public changeRenderSize(width:number, height:number):void {
        this.renderer.resize(width, height);

        //
        this.dispatchEvent(EngineAdapterEvent.RENDER_SIZE_CHANGE);
    }

    public createDisplayWrapperBasedOnObject<WrapperType extends IDisplayObjectWrapper>(object:any):WrapperType {
        var result:WrapperType;

        if (object instanceof PIXI.Text) {
            result = (this.createTextWrapper(object) as any);

        } else if (object instanceof PIXI.Sprite) {
            result = (this.createSpriteWrapper(object) as any);

        } else if (object instanceof PIXI.Graphics) {
            result = (this.createGraphicsWrapper(object) as any);

        } else if (object instanceof PIXI.ParticleContainer) {
            result = (this.createPerformanceDisplayObjectContainerWrapper(object) as any);

        } else if (object instanceof PIXI.Container) {
            result = (this.createDisplayObjectContainerWrapper(object) as any);

        } else if (object instanceof PIXI.DisplayObject) {
            result = (this.createDisplayObjectWrapper(object) as any);
        }

        return result;
    }


    public createTextWrapper(object?:any):ITextWrapper {
        var result:PixiTextWrapper = new PixiTextWrapper();

        if (!object) {
            object = new PIXI.Text("", {fill: 0xFFFFFF});
        }
        result.object = object;

        return result;
    }

    public createSpriteWrapper(object?:any):ISpriteWrapper {
        var result:PixiSpriteWrapper = new PixiSpriteWrapper();

        if (!object) {
            object = new PIXI.Sprite();
        }
        result.object = object;

        return result;
    }

    public createDisplayObjectContainerWrapper(object?:any):IDisplayObjectContainerWrapper {
        var result:PixiDisplayObjectContainerWrapper = new PixiDisplayObjectContainerWrapper();

        if (!object) {
            object = new PIXI.Container();
        }
        result.object = object;

        return result;
    }

    public createPerformanceDisplayObjectContainerWrapper(object?:any):IDisplayObjectContainerWrapper {
        if (!object) {
            object = new PIXI.ParticleContainer();
        }

        var result:IDisplayObjectContainerWrapper = this.createDisplayObjectContainerWrapper(object);
        return result;
    }

    public createDisplayObjectWrapper(object?:any):IDisplayObjectWrapper {
        var result:PixiDisplayObjectWrapper = new PixiDisplayObjectWrapper();

        if (!object) {
            object = new PIXI.DisplayObject();
        }
        result.object = object;

        return result;
    }

    public createGraphicsWrapper(object?:any):IGraphicsWrapper {
        var result:PixiGraphicsWrapper = new PixiGraphicsWrapper();

        if (!object) {
            object = new PIXI.Graphics();
        }
        result.object = object;

        return result;
    }


    public get globalMouseX():number {
        return (this.renderer as any).plugins.interaction.mouse.global.x;
    }

    public get globalMouseY():number {
        return (this.renderer as any).plugins.interaction.mouse.global.y;
    }


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


    public findChildrenByNamePart<ChildType extends IDisplayObjectWrapper>(nativeContainer:any,
                                                                           namePart:string,
                                                                           isRecursive:boolean):DisplayObjectWithNameVO<ChildType>[] {

        var result:DisplayObjectWithNameVO<ChildType>[] = [];

        var pixiContainer:PIXI.Container = (nativeContainer as PIXI.Container);
        var tempDisplayObject:PIXI.DisplayObject;
        var tempDisplayObjectWrapper:ChildType;
        var tempContainer:PIXI.Container;
        var tempData:DisplayObjectWithNameVO<ChildType>;
        var propName:string;
        for (propName in pixiContainer) {
            if (pixiContainer[propName] == pixiContainer.parent) {
                // Do nothing to prevent wrong recursion
                continue;

            } else if (propName.indexOf(namePart) != -1) {
                tempDisplayObject = (pixiContainer[propName] as PIXI.DisplayObject);
                if (tempDisplayObject && (tempDisplayObject instanceof PIXI.DisplayObject)) {
                    tempDisplayObjectWrapper = this.createDisplayWrapperBasedOnObject<ChildType>(tempDisplayObject);

                    tempData = new DisplayObjectWithNameVO<ChildType>();
                    tempData.object = tempDisplayObjectWrapper;
                    tempData.name = propName;

                    result.push(tempData);
                }

            } else if (isRecursive) {
                tempContainer = (pixiContainer[propName] as PIXI.Container);
                if (tempContainer && (tempContainer instanceof PIXI.Container)) {
                    var tempItems:DisplayObjectWithNameVO<ChildType>[] = this.findChildrenByNamePart<ChildType>(
                        tempContainer,
                        namePart,
                        isRecursive
                    );

                    result = result.concat(tempItems);
                }
            }
        }

        return result;
    }

    public findChildByName<ChildType extends IDisplayObjectWrapper>(nativeContainer:any,
                                                                    childName:string,
                                                                    isRecursive:boolean):ChildType {

        var result:ChildType;

        var pixiContainer:PIXI.Container = (nativeContainer as PIXI.Container);
        if (pixiContainer[childName] instanceof PIXI.DisplayObject) {
            result = this.createDisplayWrapperBasedOnObject<ChildType>(pixiContainer[childName]);

        } else if (isRecursive) {
            var tempChildContainer:PIXI.Container;
            var everyResult:boolean;
            pixiContainer.children.every(
                (item:PIXI.DisplayObject, index:number, array:PIXI.DisplayObject[]):boolean => {
                    everyResult = true;

                    if (item instanceof PIXI.Container) {
                        tempChildContainer = (item as PIXI.Container);
                        result = this.findChildByName<ChildType>(tempChildContainer, childName, isRecursive);
                        if (result) {
                            everyResult = false;
                        }
                    }

                    return everyResult;
                }
            );
        }

        return result;
    }

    private cachedPoint:PIXI.Point = new PIXI.Point();

    public getNativeObjectsUnderPoint(root:any,
                                      x:number,
                                      y:number):IObjectUnderPointVO {

        let result:IObjectUnderPointVO;

        let isUnderPoint:boolean = false;
        if (root.containsPoint) {
            this.cachedPoint.x = x;
            this.cachedPoint.y = y;
            if (root.containsPoint(this.cachedPoint)) {
                isUnderPoint = true;
            }

        } else {
            let tempBounds:PIXI.Rectangle = (root as PIXI.DisplayObject).getBounds();
            if (tempBounds.contains(x, y)) {
                isUnderPoint = true;
            }
        }

        if (isUnderPoint) {
            result = {object: root, children: []};

            let rootContainer:PIXI.Container = (root as PIXI.Container);
            if (rootContainer.children && rootContainer.children.length > 0) {
                let tempChild:any;
                let tempChildResult:any;
                let childrenCount:number = rootContainer.children.length;
                for (let childIndex:number = 0; childIndex < childrenCount; childIndex++) {
                    tempChild = rootContainer.children[childIndex];
                    tempChildResult = this.getNativeObjectsUnderPoint(tempChild, x, y);
                    if (tempChildResult) {
                        result.children.push(tempChildResult);
                    }
                }
            }
        }

        return result;
    }
}
