export class KeyboardTools {

    static getCharFromKeyPressEvent(event:any):string {
        if (event.which == null) { // IE
            if (event.keyCode < 32) return null; // спец. символ
            return String.fromCharCode(event.keyCode)
        }

        if (event.which != 0 && event.charCode != 0) { // все кроме IE
            if (event.which < 32) return null; // спец. символ
            return String.fromCharCode(event.which); // остальные
        }

        return null; // спец. символ
    }

    static getCharCodeFromKeyPressEvent(event:KeyboardEvent):number {
        // Cross-browser support
        event = (event || (window.event as KeyboardEvent));
        let charCode:number = event.keyCode || event.which;
        return charCode;
    }
}