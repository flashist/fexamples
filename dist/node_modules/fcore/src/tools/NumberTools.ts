export class NumberTools {
    public static getRandom(min:number, max:number, isFloor:boolean = false, isRound:boolean = false, isCeil:boolean = false):number {
        var result:number = min + Math.random() * (max - min);

        if (isFloor) {
            result = Math.floor(result);
        }
        if (isRound) {
            result = Math.round(result);
        }
        if (isCeil) {
            result = Math.ceil(result);
        }

        return result;
    }
}
