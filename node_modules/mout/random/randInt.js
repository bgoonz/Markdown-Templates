"use strict";
exports.__esModule = true;
var MIN_INT_1 = require("../number/MIN_INT");
var MAX_INT_1 = require("../number/MAX_INT");
var rand_1 = require("./rand");
/**
 * Gets random integer inside range or snap to min/max values.
 */
function randInt(min, max) {
    min = min == null ? MIN_INT_1["default"] : ~~min;
    max = max == null ? MAX_INT_1["default"] : ~~max;
    // can't be max + 0.5 otherwise it will round up if `rand`
    // returns `max` causing it to overflow range.
    // -0.5 and + 0.49 are required to avoid bias caused by rounding
    return Math.round(rand_1["default"](min - 0.5, max + 0.499999999999));
}
exports["default"] = randInt;
