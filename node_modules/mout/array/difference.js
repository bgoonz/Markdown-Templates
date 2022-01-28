"use strict";
exports.__esModule = true;
var unique_1 = require("./unique");
var filter_1 = require("./filter");
var some_1 = require("./some");
var contains_1 = require("./contains");
var slice_1 = require("./slice");
/**
 * Return a new Array with elements that aren't present in the other Arrays.
 */
function difference(arr) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var arrs = slice_1["default"](arguments, 1);
    var result = filter_1["default"](unique_1["default"](arr), function (needle) {
        return !some_1["default"](arrs, function (haystack) {
            return contains_1["default"](haystack, needle);
        });
    });
    return result;
}
exports["default"] = difference;
