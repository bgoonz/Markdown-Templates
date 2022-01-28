"use strict";
exports.__esModule = true;
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Array filter
 */
function filter(arr, callback, thisObj) {
    callback = makeIterator_1["default"](callback, thisObj);
    var results = [];
    if (arr == null) {
        return results;
    }
    var i = -1;
    var len = arr.length;
    var value;
    while (++i < len) {
        value = arr[i];
        if (callback(value, i, arr)) {
            results.push(value);
        }
    }
    return results;
}
exports["default"] = filter;
