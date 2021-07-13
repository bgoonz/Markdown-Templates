"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
/**
 * "Safer" String.toLowerCase()
 */
function lowerCase(str) {
    str = toString_1["default"](str);
    return str.toLowerCase();
}
exports["default"] = lowerCase;
