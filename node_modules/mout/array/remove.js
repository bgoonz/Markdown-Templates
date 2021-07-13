"use strict";
exports.__esModule = true;
var indexOf_1 = require("./indexOf");
/**
 * Remove a single item from the array.
 * (it won't remove duplicates, just a single item)
 */
function remove(arr, item) {
    var idx = indexOf_1["default"](arr, item);
    if (idx !== -1)
        arr.splice(idx, 1);
}
exports["default"] = remove;
