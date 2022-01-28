"use strict";
exports.__esModule = true;
var isNumber_1 = require("./isNumber");
/**
 * Check if value is an integer
 */
function isInteger(val) {
    return isNumber_1["default"](val) && val % 1 === 0;
}
exports["default"] = isInteger;
