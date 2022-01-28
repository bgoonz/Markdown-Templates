"use strict";
exports.__esModule = true;
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Returns the index of the last item that matches criteria
 */
function findLastIndex(arr, iterator, thisObj) {
    iterator = makeIterator_1["default"](iterator, thisObj);
    if (arr == null) {
        return -1;
    }
    var n = arr.length;
    while (--n >= 0) {
        if (iterator(arr[n], n, arr)) {
            return n;
        }
    }
    return -1;
}
exports["default"] = findLastIndex;
