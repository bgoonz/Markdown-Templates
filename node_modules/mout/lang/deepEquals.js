"use strict";
exports.__esModule = true;
var is_1 = require("./is");
var isObject_1 = require("./isObject");
var isArray_1 = require("./isArray");
var equals_1 = require("../object/equals");
var equals_2 = require("../array/equals");
/**
 * Recursively checks for same properties and values.
 */
function deepEquals(a, b, callback) {
    if (callback === void 0) { callback = is_1["default"]; }
    var bothObjects = isObject_1["default"](a) && isObject_1["default"](b);
    var bothArrays = !bothObjects && isArray_1["default"](a) && isArray_1["default"](b);
    if (!bothObjects && !bothArrays) {
        return callback(a, b);
    }
    function compare(a, b) {
        return deepEquals(a, b, callback);
    }
    var method = bothObjects ? equals_1["default"] : equals_2["default"];
    return method(a, b, compare);
}
exports["default"] = deepEquals;
