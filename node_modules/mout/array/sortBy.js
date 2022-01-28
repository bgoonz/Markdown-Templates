"use strict";
exports.__esModule = true;
var sort_1 = require("./sort");
var makeIterator_1 = require("../function/makeIterator_");
/*
 * Sort array by the result of the callback
 */
function sortBy(arr, callback, context) {
    callback = makeIterator_1["default"](callback, context);
    return sort_1["default"](arr, function (a, b) {
        a = callback(a);
        b = callback(b);
        return a < b ? -1 : a > b ? 1 : 0;
    });
}
exports["default"] = sortBy;
