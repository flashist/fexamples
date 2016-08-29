import {IEventDispatcher, JSKeyboardEvent, BaseEventListenerObject} from "fcore/dist/index";
import {EngineAdapter, TickerEvent} from "fgraphics/dist/index";
import {InputManagerEvent} from "./InputManagerEvent";
import {InputManagerEventData} from "./InputManagerEventData";

export class InputManager extends BaseEventListenerObject {

    protected static _instance:InputManager;


    private pressedKeyCodes:any = {};
    private prevPressedKeyCodes:any = {};
    private justPressedKeyCodes:any = {};
    private justReleasedKeyCodes:any = {};

    private isDataChanged:boolean;

    public constructor() {
        super();
    }

    protected construction():void {
        super.construction();


    }

    protected addListeners():void {
        super.addListeners();

        /*document.addEventListener(JSKeyboardEvent.KEY_DOWN, this.onKeyDown);
         document.addEventListener(JSKeyboardEvent.KEY_UP, this.onKeyUp);*/

        var documentAny:any = (document as any);
        var documentDispatcher:IEventDispatcher<Event> = (documentAny as IEventDispatcher<Event>);
        this.eventListenerHelper.addEventListener(documentDispatcher, JSKeyboardEvent.KEY_DOWN, this.onKeyDown);
        this.eventListenerHelper.addEventListener(documentDispatcher, JSKeyboardEvent.KEY_PRESS, this.onKeyPress);
        this.eventListenerHelper.addEventListener(documentDispatcher, JSKeyboardEvent.KEY_UP, this.onKeyUp);
        this.eventListenerHelper.addEventListener(EngineAdapter.instance.mainTicker, TickerEvent.TICK, this.onTick);
    }


    protected onTick():void {
        this.updateInput();
    }

    protected onKeyDown(event:KeyboardEvent):void {
        //CustomLogger.log("InputManager | onKeyDown __ event.event.keyCode: " + event.keyCode);

        if (!this.pressedKeyCodes[event.keyCode]) {
            this.pressedKeyCodes[event.keyCode] = true;

            this.isDataChanged = true;
        }

        let tempData:InputManagerEventData = new InputManagerEventData((event || window.event));
        this.dispatchEvent(InputManagerEvent.KEY_DOWN, tempData);
    }

    protected onKeyPress(event:KeyboardEvent):void {
        let tempData:InputManagerEventData = new InputManagerEventData((event || window.event));
        this.dispatchEvent(InputManagerEvent.KEY_PRESS, tempData);
    }

    protected onKeyUp(event:KeyboardEvent):void {
        if (this.pressedKeyCodes[event.keyCode]) {
            this.pressedKeyCodes[event.keyCode] = false;

            this.isDataChanged = true;
        }

        let tempData:InputManagerEventData = new InputManagerEventData((event || window.event));
        this.dispatchEvent(InputManagerEvent.KEY_UP, tempData);
    }


    protected updateInput():void {
        //CustomLogger.log("InputManager | updateInput __ START");
        //CustomLogger.logCurrentTime();

        if (this.isDataChanged) {
            this.isDataChanged = false;

            var keyCode:string;
            for (keyCode in this.pressedKeyCodes) {
                if (this.pressedKeyCodes[keyCode] && !this.prevPressedKeyCodes[keyCode]) {
                    this.justPressedKeyCodes[keyCode] = true;
                } else {
                    this.justPressedKeyCodes[keyCode] = false;
                }

                if (!this.pressedKeyCodes[keyCode] && this.prevPressedKeyCodes[keyCode]) {
                    this.justReleasedKeyCodes[keyCode] = true;
                } else {
                    this.justReleasedKeyCodes[keyCode] = false;
                }

                this.prevPressedKeyCodes[keyCode] = this.pressedKeyCodes[keyCode];
            }
        }

        //CustomLogger.logCurrentTime();
        //CustomLogger.log("InputManager | updateInput __ END");
    }


    public checkIfKeyJustPressed(keyCode:number):Boolean {
        return this.justPressedKeyCodes[keyCode];
    }

    public checkIfKeyJustReleased(keyCode:number):boolean {
        return this.justReleasedKeyCodes[keyCode];
    }

    public checkIfKeyDown(keyCode:number):boolean {
        return this.pressedKeyCodes[keyCode];
    }


    // Static

    public static get instance():InputManager {
        if (!InputManager._instance) {
            InputManager._instance = new InputManager();
        }

        return InputManager._instance;
    }
}
