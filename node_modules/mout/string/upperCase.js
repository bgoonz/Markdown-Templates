"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
/**
 * "Safer" String.toUpperCase()
 */
function upperCase(str) {
    str = toString_1["default"](str);
    return str.toUpperCase();
}
exports["default"] = upperCase;
