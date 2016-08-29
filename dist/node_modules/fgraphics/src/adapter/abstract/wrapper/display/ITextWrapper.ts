import {ISpriteWrapper} from "./ISpriteWrapper";

export interface ITextWrapper extends ISpriteWrapper {

    // A way to check if object is an instance of the ITextWrapper
    isTextWrapper: boolean;

    text: string;
    color: number;
    fontFamily: string;
    size:number;
    align:string;
}
