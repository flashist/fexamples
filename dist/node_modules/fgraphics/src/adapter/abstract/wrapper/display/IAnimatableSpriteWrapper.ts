import {ISpriteWrapper} from "./ISpriteWrapper";
import {ISpriteSheetWrapper} from "./ISpriteSheetWrapper";
export interface IAnimatableSpriteWrapper extends ISpriteWrapper {
    // A way to check if object is an instance of the IAnimatableSpriteWrapper
    isAnimatableSpriteWrapper: boolean;

    isLooped: boolean;
    currentFrame: number;
    spriteSheet: ISpriteSheetWrapper;

    play();
    stop();
    gotoAndPlay(frame:number): void;
    gotoAndStop(frame:number): void;
}
