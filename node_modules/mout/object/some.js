"use strict";
exports.__esModule = true;
var forOwn_1 = require("./forOwn");
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Object some
 */
function some(obj, callback, thisObj) {
    callback = makeIterator_1["default"](callback, thisObj);
    var result = false;
    forOwn_1["default"](obj, function (val, key) {
        if (callback(val, key, obj)) {
            result = true;
            return false; // break
        }
    });
    return result;
}
exports["default"] = some;
