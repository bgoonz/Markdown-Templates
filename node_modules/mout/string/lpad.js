"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var repeat_1 = require("./repeat");
/**
 * Pad string with `char` if its' length is smaller than `minLen`
 */
function lpad(str, minLen, ch) {
    if (ch === void 0) { ch = ' '; }
    str = toString_1["default"](str);
    return str.length < minLen ? repeat_1["default"](ch, minLen - str.length) + str : str;
}
exports["default"] = lpad;
