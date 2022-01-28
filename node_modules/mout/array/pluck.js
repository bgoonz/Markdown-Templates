"use strict";
exports.__esModule = true;
var map_1 = require("./map");
/**
 * Extract a list of property values.
 */
function pluck(arr, propName) {
    return map_1["default"](arr, propName);
}
exports["default"] = pluck;
