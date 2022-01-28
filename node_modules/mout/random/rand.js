"use strict";
exports.__esModule = true;
var random_1 = require("./random");
var MIN_INT_1 = require("../number/MIN_INT");
var MAX_INT_1 = require("../number/MAX_INT");
/**
 * Returns random number inside range
 */
function rand(min, max) {
    min = min == null ? MIN_INT_1["default"] : min;
    max = max == null ? MAX_INT_1["default"] : max;
    return min + (max - min) * random_1["default"]();
}
exports["default"] = rand;
