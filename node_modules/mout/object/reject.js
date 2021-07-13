"use strict";
exports.__esModule = true;
var filter_1 = require("./filter");
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Object reject
 */
function reject(obj, callback, thisObj) {
    callback = makeIterator_1["default"](callback, thisObj);
    return filter_1["default"](obj, function (value, index, obj) {
        return !callback(value, index, obj);
    }, thisObj);
}
exports["default"] = reject;
