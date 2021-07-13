"use strict";
exports.__esModule = true;
var isObject_1 = require("../lang/isObject");
var values_1 = require("../object/values");
var map_1 = require("../array/map");
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Map collection values, returns Array.
 */
function map(list, callback, thisObj) {
    callback = makeIterator_1["default"](callback, thisObj);
    // list.length to check array-like object, if not array-like
    // we simply map all the object values
    if (isObject_1["default"](list) && list.length == null) {
        list = values_1["default"](list);
    }
    return map_1["default"](list, function (val, key, list) {
        return callback(val, key, list);
    });
}
exports["default"] = map;
