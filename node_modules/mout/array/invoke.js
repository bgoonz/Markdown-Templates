"use strict";
exports.__esModule = true;
var slice_1 = require("./slice");
/**
 * Call `methodName` on each item of the array passing custom arguments if
 * needed.
 */
function invoke(arr, methodName, varArgs) {
    if (arr == null) {
        return arr;
    }
    var args = slice_1["default"](arguments, 2);
    var i = -1;
    var len = arr.length;
    var value;
    while (++i < len) {
        value = arr[i];
        value[methodName].apply(value, args);
    }
    return arr;
}
exports["default"] = invoke;
