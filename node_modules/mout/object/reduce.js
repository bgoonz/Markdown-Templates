"use strict";
exports.__esModule = true;
var forOwn_1 = require("./forOwn");
var size_1 = require("./size");
/**
 * Object reduce
 */
function reduce(obj, callback, memo, thisObj) {
    var initial = arguments.length > 2;
    if (!size_1["default"](obj) && !initial) {
        throw new Error('reduce of empty object with no initial value');
    }
    forOwn_1["default"](obj, function (value, key, list) {
        if (!initial) {
            memo = value;
            initial = true;
        }
        else {
            memo = callback.call(thisObj, memo, value, key, list);
        }
    });
    return memo;
}
exports["default"] = reduce;
