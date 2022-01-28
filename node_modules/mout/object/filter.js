"use strict";
exports.__esModule = true;
var forOwn_1 = require("./forOwn");
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Creates a new object with all the properties where the callback returns
 * true.
 */
function filterValues(obj, callback, thisObj) {
    callback = makeIterator_1["default"](callback, thisObj);
    var output = {};
    forOwn_1["default"](obj, function (value, key, obj) {
        if (callback(value, key, obj)) {
            output[key] = value;
        }
    });
    return output;
}
exports["default"] = filterValues;
