"use strict";
exports.__esModule = true;
var findLastIndex_1 = require("./findLastIndex");
/**
 * Returns last item that matches criteria
 */
function findLast(arr, iterator, thisObj) {
    var idx = findLastIndex_1["default"](arr, iterator, thisObj);
    return idx >= 0 ? arr[idx] : void 0;
}
exports["default"] = findLast;
