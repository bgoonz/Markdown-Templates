"use strict";
exports.__esModule = true;
var findIndex_1 = require("./findIndex");
/**
 * Returns first item that matches criteria
 */
function find(arr, iterator, thisObj) {
    var idx = findIndex_1["default"](arr, iterator, thisObj);
    return idx >= 0 ? arr[idx] : void 0;
}
exports["default"] = find;
