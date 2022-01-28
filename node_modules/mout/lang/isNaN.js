"use strict";
exports.__esModule = true;
var isNumber_1 = require("./isNumber");
var isNaN_1 = require("../number/isNaN");
/**
 * Check if value is NaN for realz
 */
function isNaN(val) {
    // based on the fact that NaN !== NaN
    // need to check if it's a number to avoid conflicts with host objects
    // also need to coerce ToNumber to avoid edge case `new Number(NaN)`
    return !isNumber_1["default"](val) || isNaN_1["default"](Number(val));
}
exports["default"] = isNaN;
