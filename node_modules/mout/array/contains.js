"use strict";
exports.__esModule = true;
var indexOf_1 = require("./indexOf");
/**
 * If array contains values.
 */
function contains(arr, val) {
    return indexOf_1["default"](arr, val) !== -1;
}
exports["default"] = contains;
