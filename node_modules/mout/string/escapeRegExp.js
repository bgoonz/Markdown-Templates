"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
/**
 * Escape RegExp string chars.
 */
function escapeRegExp(str) {
    return toString_1["default"](str).replace(/\W/g, '\\$&');
}
exports["default"] = escapeRegExp;
