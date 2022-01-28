"use strict";
exports.__esModule = true;
var indexOf_1 = require("./indexOf");
/**
 * Remove all instances of an item from array.
 */
function removeAll(arr, item) {
    var idx = indexOf_1["default"](arr, item);
    while (idx !== -1) {
        arr.splice(idx, 1);
        idx = indexOf_1["default"](arr, item, idx);
    }
}
exports["default"] = removeAll;
