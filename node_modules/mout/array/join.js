"use strict";
exports.__esModule = true;
var filter_1 = require("./filter");
function isValidString(val) {
    return val != null && val !== '';
}
/**
 * Joins strings with the specified separator inserted between each value.
 * Null values and empty strings will be excluded.
 */
function join(items, separator) {
    if (separator === void 0) { separator = ''; }
    return filter_1["default"](items, isValidString).join(separator);
}
exports["default"] = join;
