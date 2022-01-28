"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
/**
 * Unescape unicode char sequences
 */
function unescapeUnicode(str) {
    str = toString_1["default"](str);
    return str.replace(/\\u[0-9a-f]{4}/g, function (ch) {
        var code = parseInt(ch.slice(2), 16);
        return String.fromCharCode(code);
    });
}
exports["default"] = unescapeUnicode;
