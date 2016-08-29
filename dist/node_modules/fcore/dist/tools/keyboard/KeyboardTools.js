"use strict";
var KeyboardTools = (function () {
    function KeyboardTools() {
    }
    KeyboardTools.getCharFromKeyPressEvent = function (event) {
        if (event.which == null) {
            if (event.keyCode < 32)
                return null; // спец. символ
            return String.fromCharCode(event.keyCode);
        }
        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32)
                return null; // спец. символ
            return String.fromCharCode(event.which); // остальные
        }
        return null; // спец. символ
    };
    KeyboardTools.getCharCodeFromKeyPressEvent = function (event) {
        // Cross-browser support
        event = (event || window.event);
        var charCode = event.keyCode || event.which;
        return charCode;
    };
    return KeyboardTools;
}());
exports.KeyboardTools = KeyboardTools;
//# sourceMappingURL=KeyboardTools.js.map