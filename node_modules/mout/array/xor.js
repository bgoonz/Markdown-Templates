"use strict";
exports.__esModule = true;
var unique_1 = require("./unique");
var filter_1 = require("./filter");
var contains_1 = require("./contains");
/**
 * Exclusive OR. Returns items that are present in a single array.
 * - like ptyhon's `symmetric_difference`
 */
function xor(arr1, arr2) {
    arr1 = unique_1["default"](arr1);
    arr2 = unique_1["default"](arr2);
    var a1 = filter_1["default"](arr1, function (item) {
        return !contains_1["default"](arr2, item);
    });
    var a2 = filter_1["default"](arr2, function (item) {
        return !contains_1["default"](arr1, item);
    });
    return a1.concat(a2);
}
exports["default"] = xor;
