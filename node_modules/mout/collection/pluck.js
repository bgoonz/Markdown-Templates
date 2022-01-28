"use strict";
exports.__esModule = true;
var map_1 = require("./map");
/**
 * Extract a list of property values.
 */
function pluck(list, key) {
    return map_1["default"](list, function (value) {
        return value[key];
    });
}
exports["default"] = pluck;
