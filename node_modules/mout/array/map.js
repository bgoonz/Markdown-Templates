"use strict";
exports.__esModule = true;
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Array map
 */
function map(arr, callback, thisObj) {
    callback = makeIterator_1["default"](callback, thisObj);
    var results = [];
    if (arr == null) {
        return results;
    }
    var i = -1;
    var len = arr.length;
    while (++i < len) {
        results[i] = callback(arr[i], i, arr);
    }
    return results;
}
exports["default"] = map;
