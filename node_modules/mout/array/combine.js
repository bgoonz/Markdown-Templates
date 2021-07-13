"use strict";
exports.__esModule = true;
var indexOf_1 = require("./indexOf");
/**
 * Combines an array with all the items of another.
 * Does not allow duplicates and is case and type sensitive.
 */
function combine(arr1, arr2) {
    if (arr2 == null) {
        return arr1;
    }
    var i = -1;
    var len = arr2.length;
    while (++i < len) {
        if (indexOf_1["default"](arr1, arr2[i]) === -1) {
            arr1.push(arr2[i]);
        }
    }
    return arr1;
}
exports["default"] = combine;
