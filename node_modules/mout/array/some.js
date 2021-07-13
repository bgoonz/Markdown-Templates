"use strict";
exports.__esModule = true;
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Array some
 */
function some(arr, callback, thisObj) {
    callback = makeIterator_1["default"](callback, thisObj);
    var result = false;
    if (arr == null) {
        return result;
    }
    var i = -1;
    var len = arr.length;
    while (++i < len) {
        // we iterate over sparse items since there is no way to make it
        // work properly on IE 7-8. see #64
        if (callback(arr[i], i, arr)) {
            result = true;
            break;
        }
    }
    return result;
}
exports["default"] = some;
