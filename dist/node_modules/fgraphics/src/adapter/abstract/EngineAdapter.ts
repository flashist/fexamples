import {IEngineAdapter} from "./IEngineAdapter";
import {BaseEventListenerObject} from "fcore/dist/index";

export class EngineAdapter extends BaseEventListenerObject {
    public static instance:IEngineAdapter;
}
