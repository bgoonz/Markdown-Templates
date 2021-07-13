"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
/**
 * Checks if string starts with specified prefix.
 */
function startsWith(str, prefix) {
    str = toString_1["default"](str);
    prefix = toString_1["default"](prefix);
    return str.indexOf(prefix) === 0;
}
exports["default"] = startsWith;
