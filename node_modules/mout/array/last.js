"use strict";
exports.__esModule = true;
/**
 * Returns last element of array.
 */
function last(arr) {
    if (arr == null || arr.length < 1) {
        return undefined;
    }
    return arr[arr.length - 1];
}
exports["default"] = last;
