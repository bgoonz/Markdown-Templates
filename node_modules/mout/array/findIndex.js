"use strict";
exports.__esModule = true;
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Returns the index of the first item that matches criteria
 */
function findIndex(arr, iterator, thisObj) {
    iterator = makeIterator_1["default"](iterator, thisObj);
    if (arr == null) {
        return -1;
    }
    var i = -1;
    var len = arr.length;
    while (++i < len) {
        if (iterator(arr[i], i, arr)) {
            return i;
        }
    }
    return -1;
}
exports["default"] = findIndex;
