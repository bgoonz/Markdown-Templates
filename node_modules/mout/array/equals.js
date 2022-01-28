"use strict";
exports.__esModule = true;
var is_1 = require("../lang/is");
var isArray_1 = require("../lang/isArray");
var every_1 = require("./every");
/**
 * Compares if both arrays have the same elements
 */
function equals(a, b, callback) {
    if (callback === void 0) { callback = is_1["default"]; }
    if (!isArray_1["default"](a) || !isArray_1["default"](b)) {
        return callback(a, b);
    }
    if (a.length !== b.length) {
        return false;
    }
    return every_1["default"](a, makeCompare(callback), b);
}
function makeCompare(callback) {
    return function (value, i) {
        return i in this && callback(value, this[i]);
    };
}
exports["default"] = equals;
