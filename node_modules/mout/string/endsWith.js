"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
/**
 * Checks if string ends with specified suffix.
 */
function endsWith(str, suffix) {
    str = toString_1["default"](str);
    suffix = toString_1["default"](suffix);
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
exports["default"] = endsWith;
