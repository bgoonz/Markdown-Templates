"use strict";
exports.__esModule = true;
var min_1 = require("../array/min");
var values_1 = require("./values");
/**
 * Returns minimum value inside object.
 */
function min(obj, iterator) {
    return min_1["default"](values_1["default"](obj), iterator);
}
exports["default"] = min;
