import {IGraphicsWrapper} from "../../../abstract/wrapper/display/IGraphicsWrapper";
import {PixiDisplayObjectContainerWrapper} from "./PixiDisplayObjectContainerWrapper";

export class PixiGraphicsWrapper extends PixiDisplayObjectContainerWrapper implements IGraphicsWrapper {

    public isGraphicsWrapper:boolean = true;


    protected pixiGraphics:PIXI.Graphics;

    constructor() {
        super();
    }


    protected commitData():void {
        super.commitData();

        this.pixiGraphics = (this.object as PIXI.Graphics);
    }

    clear():IGraphicsWrapper {
        this.pixiGraphics.clear();
        return this;
    }


    beginFill(color:number, alpha?:number):IGraphicsWrapper {
        this.pixiGraphics.beginFill(color, alpha);
        return this;
    }

    endFill():IGraphicsWrapper {
        this.pixiGraphics.endFill();
        return this;
    }

    lineStyle(lineWidth:number, color:number, alpha:number):IGraphicsWrapper {
        this.pixiGraphics.lineStyle(lineWidth, color, alpha);
        return this;
    }

    lineTo(x:number, y:number):IGraphicsWrapper {
        this.pixiGraphics.lineTo(x, y);
        return this;
    }

    moveTo(x:number, y:number):IGraphicsWrapper {
        this.pixiGraphics.moveTo(x, y);
        return this;
    }

    drawRect(x:number, y:number, width:number, height:number):IGraphicsWrapper {
        this.pixiGraphics.drawRect(x, y, width, height);
        return this;
    }

    drawCircle(x:number, y:number, radius:number):IGraphicsWrapper {
        this.pixiGraphics.drawCircle(x, y, radius);
        return this;
    }
}
