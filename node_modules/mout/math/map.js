"use strict";
exports.__esModule = true;
var lerp_1 = require("./lerp");
var norm_1 = require("./norm");
/**
 * Maps a number from one scale to another.
 * @example map(3, 0, 4, -1, 1) -> 0.5
 */
function map(val, min1, max1, min2, max2) {
    return lerp_1["default"](norm_1["default"](val, min1, max1), min2, max2);
}
exports["default"] = map;
