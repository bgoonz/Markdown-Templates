"use strict";
exports.__esModule = true;
var append_1 = require("./append");
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Maps the items in the array and concatenates the result arrays.
 */
function collect(arr, callback, thisObj) {
    callback = makeIterator_1["default"](callback, thisObj);
    var results = [];
    if (arr == null) {
        return results;
    }
    var i = -1;
    var len = arr.length;
    while (++i < len) {
        var value = callback(arr[i], i, arr);
        if (value != null) {
            append_1["default"](results, value);
        }
    }
    return results;
}
exports["default"] = collect;
