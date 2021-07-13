"use strict";
exports.__esModule = true;
var map_1 = require("./map");
var prop_1 = require("../function/prop");
/**
 * Extract a list of property values.
 */
function pluck(obj, propName) {
    return map_1["default"](obj, prop_1["default"](propName));
}
exports["default"] = pluck;
