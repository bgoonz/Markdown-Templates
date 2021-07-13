"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
/**
 * Searches for a given substring
 */
function contains(str, substring, fromIndex) {
    str = toString_1["default"](str);
    substring = toString_1["default"](substring);
    return str.indexOf(substring, fromIndex) !== -1;
}
exports["default"] = contains;
