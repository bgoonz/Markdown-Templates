"use strict";
exports.__esModule = true;
var filter_1 = require("./filter");
/**
 * Remove all null/undefined items from array.
 */
function compact(arr) {
    return filter_1["default"](arr, function (val) {
        return val != null;
    });
}
exports["default"] = compact;
