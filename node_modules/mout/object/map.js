"use strict";
exports.__esModule = true;
var forOwn_1 = require("./forOwn");
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Creates a new object where all the values are the result of calling
 * `callback`.
 */
function mapValues(obj, callback, thisObj) {
    callback = makeIterator_1["default"](callback, thisObj);
    var output = {};
    forOwn_1["default"](obj, function (val, key, obj) {
        output[key] = callback(val, key, obj);
    });
    return output;
}
exports["default"] = mapValues;
