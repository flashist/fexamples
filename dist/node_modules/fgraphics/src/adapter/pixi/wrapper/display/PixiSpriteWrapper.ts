import {ISpriteWrapper} from "../../../abstract/wrapper/display/ISpriteWrapper";
import {Point} from "fcore/dist/index";
import {PixiDisplayObjectContainerWrapper} from "./PixiDisplayObjectContainerWrapper";

export class PixiSpriteWrapper extends PixiDisplayObjectContainerWrapper implements ISpriteWrapper {

    public isSpriteWrapper:boolean = true;

    protected pixiSprite:PIXI.Sprite;

    constructor() {
        super();
    }


    protected commitData():void {
        super.commitData();

        this.pixiSprite = (this.object as PIXI.Sprite);
    }


    //public gotoAndStop(frame: number): void
    //{
    //    this.pixiflashSprite.gotoAndStop(frame);
    //}


    public get texture():any {
        return this.pixiSprite.texture;
    }

    public set texture(value:any) {
        this.pixiSprite.texture = value;
    }


    public get anchor():Point {
        return new Point(
            this.pixiSprite.anchor.x,
            this.pixiSprite.anchor.y
        );
    }

    public set anchor(value:Point) {
        this.pixiSprite.anchor = new PIXI.Point(value.x, value.y);
    }
}
