"use strict";
exports.__esModule = true;
/**
 * Appends an array to the end of another.
 * The first array will be modified.
 */
function append(arr1, arr2) {
    if (arr2 == null) {
        return arr1;
    }
    var pad = arr1.length;
    var i = -1;
    var len = arr2.length;
    while (++i < len) {
        arr1[pad + i] = arr2[i];
    }
    return arr1;
}
exports["default"] = append;
