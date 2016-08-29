import {BaseClassWrapper, Rectangle, Logger, Point} from "fcore/dist/index";
import {IDisplayObjectWrapper} from "../../../abstract/wrapper/display/IDisplayObjectWrapper";
import {IDisplayObjectContainerWrapper} from "../../../abstract/wrapper/display/IDisplayObjectContainerWrapper";
import {DisplayObjectWrapperMouseEvent} from "../../../abstract/wrapper/display/DisplayObjectWrapperMouseEvent";
import {EngineAdapter} from "../../../abstract/EngineAdapter";
import {PixiMouseEvent} from "./PixiMouseEvent";

export class PixiDisplayObjectWrapper extends BaseClassWrapper implements IDisplayObjectWrapper {
    public isDisplayObjectWrapper:boolean = true;

    private _pixiDisplayObject:PIXI.DisplayObject;

    protected tempParent:IDisplayObjectContainerWrapper;

    constructor() {
        super();
    }


    protected commitData():void {
        super.commitData();

        this.pixiDisplayObject = (this.object as PIXI.DisplayObject);
    }

    protected commitInteractiveData():void {
        if (this.pixiDisplayObject) {
            if (this.interactive) {
                this.addInteractivePixiObjectListeners(this.pixiDisplayObject);
            } else {
                this.removeInteractivePixiObjectListeners(this.pixiDisplayObject);
            }
        }
    }

    public destruction():void {
        super.destruction();

        if (this.pixiDisplayObject) {
            this.pixiDisplayObject = null;
        }
        if (this.tempParent) {
            this.tempParent.destruction();
        }
    }


    protected removeListeners():void {
        super.removeListeners();

        if (this.pixiDisplayObject) {
            this.removeInteractivePixiObjectListeners(this.pixiDisplayObject);
        }
    }


    protected addInteractivePixiObjectListeners(pixiObject:PIXI.DisplayObject):void {
        if (!pixiObject) {
            return;
        }

        pixiObject.on(PixiMouseEvent.CLICK, this.onPixiClick, this);
        pixiObject.on(PixiMouseEvent.TAP, this.onPixiTap, this);
        pixiObject.on(PixiMouseEvent.MOUSE_DOWN, this.onPixiMouseDown, this);
        pixiObject.on(PixiMouseEvent.MOUSE_UP, this.onPixiMouseUp, this);
        pixiObject.on(PixiMouseEvent.MOUSE_UP_OUTSIDE, this.onPixiMouseUpOutside, this);
        pixiObject.on(PixiMouseEvent.TOUCH_START, this.onPixiMouseDown, this);
        pixiObject.on(PixiMouseEvent.TOUCH_END, this.onPixiMouseUp, this);
        pixiObject.on(PixiMouseEvent.TOUCH_END_OUTSIDE, this.onPixiMouseUpOutside, this);
        pixiObject.on(PixiMouseEvent.MOUSE_OVER, this.onPixiMouseOver, this);
        pixiObject.on(PixiMouseEvent.MOUSE_OUT, this.onPixiMouseOut, this);
    }

    protected removeInteractivePixiObjectListeners(pixiObject:PIXI.DisplayObject):void {
        if (!pixiObject) {
            return;
        }

        pixiObject.removeListener(PixiMouseEvent.CLICK, this.onPixiClick, this);
        pixiObject.removeListener(PixiMouseEvent.TAP, this.onPixiTap, this);
        pixiObject.removeListener(PixiMouseEvent.MOUSE_DOWN, this.onPixiMouseDown, this);
        pixiObject.removeListener(PixiMouseEvent.MOUSE_UP, this.onPixiMouseUp, this);
        pixiObject.removeListener(PixiMouseEvent.MOUSE_UP_OUTSIDE, this.onPixiMouseUpOutside, this);
        pixiObject.removeListener(PixiMouseEvent.TOUCH_START, this.onPixiMouseDown, this);
        pixiObject.removeListener(PixiMouseEvent.TOUCH_END, this.onPixiMouseUp, this);
        pixiObject.removeListener(PixiMouseEvent.TOUCH_END_OUTSIDE, this.onPixiMouseUpOutside, this);
        pixiObject.removeListener(PixiMouseEvent.MOUSE_OVER, this.onPixiMouseOver, this);
        pixiObject.removeListener(PixiMouseEvent.MOUSE_OUT, this.onPixiMouseOut, this);
    }


    protected onPixiClick(event:PIXI.interaction.InteractionEvent):void {
        this.dispatchEvent(DisplayObjectWrapperMouseEvent.CLICK);
    }

    protected onPixiTap(event:PIXI.interaction.InteractionEvent):void {
        this.dispatchEvent(DisplayObjectWrapperMouseEvent.CLICK);
    }

    protected onPixiMouseDown(event:PIXI.interaction.InteractionEvent):void {
        this.dispatchEvent(DisplayObjectWrapperMouseEvent.MOUSE_DOWN);
    }

    protected onPixiMouseUp(event:PIXI.interaction.InteractionEvent):void {
        this.dispatchEvent(DisplayObjectWrapperMouseEvent.MOUSE_UP);
    }

    protected onPixiMouseUpOutside(event:PIXI.interaction.InteractionEvent):void {
        this.dispatchEvent(DisplayObjectWrapperMouseEvent.MOUSE_UP_OUTSIDE);
    }

    protected onPixiMouseOver(event:PIXI.interaction.InteractionEvent):void {
        this.dispatchEvent(DisplayObjectWrapperMouseEvent.ROLL_OVER);
    }

    protected onPixiMouseOut(event:PIXI.interaction.InteractionEvent):void {
        this.dispatchEvent(DisplayObjectWrapperMouseEvent.ROLL_OUT);
    }


    protected get pixiDisplayObject():PIXI.DisplayObject {
        return this._pixiDisplayObject;
    }

    protected set pixiDisplayObject(value:PIXI.DisplayObject) {
        this.removeInteractivePixiObjectListeners(this.pixiDisplayObject);
        //
        this._pixiDisplayObject = value;
        // this.addInteractivePixiObjectListeners(this.pixiDisplayObject);
        this.commitInteractiveData();
    }


    public get cache():boolean {
        return this.pixiDisplayObject.cacheAsBitmap;
    }
    public set cache(value:boolean) {
        this.pixiDisplayObject.cacheAsBitmap = value;
    }


    public get alpha():number {
        return this.pixiDisplayObject.alpha;
    }
    public set alpha(value:number) {
        this.pixiDisplayObject.alpha = value;
    }


    public get x():number {
        return this.pixiDisplayObject.position.x;
    }
    public set x(value:number) {
        this.pixiDisplayObject.position.x = value;
    }


    public get y():number {
        return this.pixiDisplayObject.position.y;
    }
    public set y(value:number) {
        this.pixiDisplayObject.position.y = value;
    }


    public get scaleX():number {
        return this.pixiDisplayObject.scale.x;
    }
    public set scaleX(value:number) {
        this.pixiDisplayObject.scale.x = value;
    }


    public get scaleY():number {
        return this.pixiDisplayObject.scale.y;
    }
    public set scaleY(value:number) {
        this.pixiDisplayObject.scale.y = value;
    }


    public get visible():boolean {
        return this.pixiDisplayObject.visible;
    }
    public set visible(value:boolean) {
        this.pixiDisplayObject.visible = value;
    }


    public get interactive():boolean {
        return this.pixiDisplayObject.interactive;
    }
    public set interactive(value:boolean) {
        this.pixiDisplayObject.interactive = value;

        this.commitInteractiveData();
    }


    public get buttonMode():boolean {
        return this.pixiDisplayObject.buttonMode;
    }
    public set buttonMode(value:boolean) {
        this.pixiDisplayObject.buttonMode = value;
    }


    public get parent():IDisplayObjectContainerWrapper {
        if (!this.pixiDisplayObject.parent) {
            return null;

        } else {

            if (!this.tempParent) {
                this.tempParent = EngineAdapter.instance.createDisplayObjectContainerWrapper(this.pixiDisplayObject.parent);
            }
            this.tempParent.object = this.pixiDisplayObject.parent;

            return this.tempParent;
        }
    }


    public getGlobalBounds():Rectangle {
        var tempPixiBounds:PIXI.Rectangle = this.pixiDisplayObject.getBounds();
        return new Rectangle(tempPixiBounds.x, tempPixiBounds.y, tempPixiBounds.width, tempPixiBounds.height);
    }

    public getLocalBounds():Rectangle {
        var tempPixiBounds:PIXI.Rectangle = this.pixiDisplayObject.getLocalBounds();
        return new Rectangle(tempPixiBounds.x, tempPixiBounds.y, tempPixiBounds.width, tempPixiBounds.height);
    }


    public toGlobal(position:Point):Point {
        let tempPixiPos:PIXI.Point = this.pixiDisplayObject.toGlobal(new PIXI.Point(position.x, position.y));
        return new Point(tempPixiPos.x, tempPixiPos.y);
    }
    public toLocal(position:Point):Point {
        let tempPixiPos:PIXI.Point = this.pixiDisplayObject.toLocal(new PIXI.Point(position.x, position.y));
        return new Point(tempPixiPos.x, tempPixiPos.y);
    }


    public get width():number {
        return this.getLocalBounds().width / this.scaleX;
    }
    public set width(value:number) {
        Logger.error("PixiDisplayObjectWrapper | set width __ WARNING! Setter is not implemented for simple display objects!")
    }

    public get height():number {
        return this.getLocalBounds().height / this.scaleY;
    }
    public set height(value:number) {
        Logger.error("PixiDisplayObjectWrapper | set height __ WARNING! Setter is not implemented for simple display objects!")
    }


    public checkIfParamIsParent(paramName:string):boolean {
        var result:boolean;
        if (paramName == "parent") {
            result = true;
        }

        return result;
    }
}
