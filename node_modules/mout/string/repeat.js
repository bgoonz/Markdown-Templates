"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var toInt_1 = require("../number/toInt");
/**
 * Repeat string n times
 */
function repeat(str, n) {
    var result = '';
    str = toString_1["default"](str);
    n = toInt_1["default"](n);
    if (n < 1) {
        return '';
    }
    while (n > 0) {
        if (n % 2) {
            result += str;
        }
        n = Math.floor(n / 2);
        str += str;
    }
    return result;
}
exports["default"] = repeat;
