import {BaseConsoleButton} from "../BaseConsoleButton";
import {InputManager, InputManagerEvent, InputManagerEventData} from "flibs/dist/index";
import {KeyboardTools, StringTools} from "fcore/dist/index";
import {CaptuerKeyButtonEvent} from "./CaptureKeyButtonEvent";
import {CC} from "../../CC";

export class CaptureKeyButton extends BaseConsoleButton {

    /*private static CAPTURE_LABEL_FIRST_PART:string = "Capture key:";
    private static NO_CAPTURE_KEY_TEXT:string = "(click to add)";
    private static CLICKED_HELP_TEXT:string = "Press a key";*/

    private captureKey:string;
    private captureCode:number;

    private _isClicked:boolean;

    constructor() {
        super();
    }

    protected construction():void {
        super.construction();

    }


    protected addListeners():void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            InputManager.instance,
            InputManagerEvent.KEY_PRESS,
            this.onKeyPress
        )
    }


    protected onClick():void {
        super.onClick();

        this.isClicked = !this.isClicked;
    }

    protected onKeyPress(data:InputManagerEventData):void {
        if (this.isClicked) {
            this.isClicked = false;
            this.captureCode = KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent);
            this.captureKey = KeyboardTools.getCharFromKeyPressEvent(data.nativeEvent);

            this.commitData();

        }else if(this.captureCode) {
            if (KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent) == this.captureCode) {
                this.dispatchEvent(CaptuerKeyButtonEvent.CAPTURE_KEY_PRESS);
            }
        }
    }


    protected commitData():void {
        super.commitData();

        if (this.isClicked) {
            this.label = CC.config.localization.captureKeyBtnPressedLabel;

        }else if(this.captureKey) {
            this.label = StringTools.substituteList(
                CC.config.localization.captureKeyBtnNormalLabel,
                this.captureKey
            );

        }else {
            this.label = StringTools.substituteList(
                CC.config.localization.captureKeyBtnNormalLabel,
                CC.config.localization.captureKeyBtnNoKeyHelpText
            );
        }
    }

    protected arrange():void {
        super.arrange();

    }


    get isClicked():boolean {
        return this._isClicked;
    }
    set isClicked(value:boolean) {
        if (value == this.isClicked) {
            return;
        }

        this._isClicked = value;

        this.commitData();
    }
}