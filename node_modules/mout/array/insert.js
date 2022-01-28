"use strict";
exports.__esModule = true;
var difference_1 = require("./difference");
var slice_1 = require("./slice");
/**
 * Insert item into array if not already present.
 */
function insert(arr) {
    var restItems = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restItems[_i - 1] = arguments[_i];
    }
    var diff = difference_1["default"](slice_1["default"](arguments, 1), arr);
    if (diff.length) {
        Array.prototype.push.apply(arr, diff);
    }
    return arr.length;
}
exports["default"] = insert;
