"use strict";
exports.__esModule = true;
var max_1 = require("../array/max");
var values_1 = require("./values");
/**
 * Returns maximum value inside object.
 */
function max(obj, compareFn) {
    return max_1["default"](values_1["default"](obj), compareFn);
}
exports["default"] = max;
