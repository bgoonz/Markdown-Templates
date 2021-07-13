"use strict";
exports.__esModule = true;
var filter_1 = require("./filter");
/**
 * @return {array} Array of unique items
 */
function unique(arr, compare) {
    if (compare === void 0) { compare = isEqual; }
    return filter_1["default"](arr, function (item, i, arr) {
        var n = arr.length;
        while (++i < n) {
            if (compare(item, arr[i])) {
                return false;
            }
        }
        return true;
    });
}
function isEqual(a, b) {
    return a === b;
}
exports["default"] = unique;
