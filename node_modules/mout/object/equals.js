"use strict";
exports.__esModule = true;
var hasOwn_1 = require("./hasOwn");
var every_1 = require("./every");
var isObject_1 = require("../lang/isObject");
var is_1 = require("../lang/is");
// Makes a function to compare the object values from the specified compare
// operation callback.
function makeCompare(callback) {
    return function (value, key) {
        return hasOwn_1["default"](this, key) && callback(value, this[key]);
    };
}
function checkProperties(value, key) {
    return hasOwn_1["default"](this, key);
}
/**
 * Checks if two objects have the same keys and values.
 */
function equals(a, b, callback) {
    if (callback === void 0) { callback = is_1["default"]; }
    if (!isObject_1["default"](a) || !isObject_1["default"](b)) {
        return callback(a, b);
    }
    return every_1["default"](a, makeCompare(callback), b) && every_1["default"](b, checkProperties, a);
}
exports["default"] = equals;
