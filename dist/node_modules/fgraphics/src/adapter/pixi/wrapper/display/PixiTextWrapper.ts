import {ITextWrapper} from "../../../abstract/wrapper/display/ITextWrapper";
import {PixiSpriteWrapper} from "./PixiSpriteWrapper";
import {ObjectTools} from "fcore/dist/index";
import {TextWrapperAlign} from "../../../abstract/wrapper/display/TextWrapperAlign";

export class PixiTextWrapper extends PixiSpriteWrapper implements ITextWrapper {
    public isTextWrapper:boolean = true;


    protected pixiText:PIXI.Text;
    private _fontFamily:string = "";
    private _size:number;
    private _color:number;
    private _align:string;

    constructor() {
        super();
    }


    protected commitData():void {
        super.commitData();

        this.pixiText = (this.object as PIXI.Text);
        if (!this.pixiText) {
            return;
        }

        let tempStyle:PIXI.TextStyle = {};
        ObjectTools.copyProps(tempStyle, this.pixiText.style, true);

        if (this.color) {
            tempStyle.fill = this.color;
        }

        if (this.align && this.align != TextWrapperAlign.NONE) {
            tempStyle.align = this.align;
        } else {
            tempStyle.align = "";
        }

        /*tempStyle.font = "";
        if (this.fontFamily) {
            tempStyle.font += this.fontFamily;
        }
        if (this.size) {
            if (tempStyle.font) {
                tempStyle.font += " ";
            }
            tempStyle.font += this.size + "px";
        }*/
        if (this.fontFamily) {
            (tempStyle as any).fontFamily = this.fontFamily;
        }
        if (this.size) {
            (tempStyle as any).fontSize = this.size;
        }


        this.pixiText.style = tempStyle;
    }

    public get text():string {
        return this.pixiText.text;
    }

    public set text(value:string) {
        this.pixiText.text = value;
    }

    public get fontFamily():string {
        return this._fontFamily;
    }

    public set fontFamily(value:string) {
        if (value == this.fontFamily) {
            return;
        }

        this._fontFamily = value;

        this.commitData();
    }

    public get size():number {
        return this._size;
    }

    public set size(value:number) {
        if (value == this.size) {
            return;
        }

        this._size = value;

        this.commitData();
    }

    public get color():number {
        return this._color;
    }

    public set color(value:number) {
        if (value == this.color) {
            return;
        }

        this._color = value;

        this.commitData();
    }

    public get align():string {
        return this._align;
    }
    public set align(value:string) {
        if (value == this.align) {
            return;
        }

        this._align = value;

        this.commitData();
    }
}
