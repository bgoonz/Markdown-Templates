"use strict";
exports.__esModule = true;
var unique_1 = require("./unique");
var filter_1 = require("./filter");
var every_1 = require("./every");
var contains_1 = require("./contains");
var slice_1 = require("./slice");
/**
 * Return a new Array with elements common to all Arrays.
 * - based on underscore.js implementation
 */
function intersection(arr) {
    var arrs = slice_1["default"](arguments, 1);
    var result = filter_1["default"](unique_1["default"](arr), function (needle) {
        return every_1["default"](arrs, function (haystack) {
            return contains_1["default"](haystack, needle);
        });
    });
    return result;
}
exports["default"] = intersection;
