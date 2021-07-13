"use strict";
exports.__esModule = true;
var filter_1 = require("./filter");
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Inverse or collection/filter
 */
function reject(list, iterator, thisObj) {
    iterator = makeIterator_1["default"](iterator, thisObj);
    return filter_1["default"](list, function (value, index, list) {
        return !iterator(value, index, list);
    }, thisObj);
}
exports["default"] = reject;
