"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var repeat_1 = require("./repeat");
/**
 * Pad string with `char` if its' length is smaller than `minLen`
 */
function rpad(str, minLen, ch) {
    str = toString_1["default"](str);
    ch = ch || ' ';
    return str.length < minLen ? str + repeat_1["default"](ch, minLen - str.length) : str;
}
exports["default"] = rpad;
