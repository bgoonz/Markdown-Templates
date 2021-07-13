"use strict";
exports.__esModule = true;
var is_1 = require("./is");
/**
 * Check if both values are not identical/egal
 */
function isnt(x, y) {
    return !is_1["default"](x, y);
}
exports["default"] = isnt;
