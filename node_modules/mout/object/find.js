"use strict";
exports.__esModule = true;
var some_1 = require("./some");
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Returns first item that matches criteria
 */
function find(obj, callback, thisObj) {
    callback = makeIterator_1["default"](callback, thisObj);
    var result;
    some_1["default"](obj, function (value, key, obj) {
        if (callback(value, key, obj)) {
            result = value;
            return true; // break
        }
    });
    return result;
}
exports["default"] = find;
