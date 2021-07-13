"use strict";
exports.__esModule = true;
var forEach_1 = require("./forEach");
var makeIterator_1 = require("../function/makeIterator_");
/**
 * filter collection values, returns array.
 */
function filter(list, iterator, thisObj) {
    iterator = makeIterator_1["default"](iterator, thisObj);
    var results = [];
    if (!list) {
        return results;
    }
    forEach_1["default"](list, function (value, index, list) {
        if (iterator(value, index, list)) {
            results[results.length] = value;
        }
    });
    return results;
}
exports["default"] = filter;
