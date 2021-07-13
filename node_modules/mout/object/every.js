"use strict";
exports.__esModule = true;
var forOwn_1 = require("./forOwn");
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Object every
 */
function every(obj, callback, thisObj) {
    callback = makeIterator_1["default"](callback, thisObj);
    var result = true;
    forOwn_1["default"](obj, function (val, key) {
        // we consider any falsy values as "false" on purpose so shorthand
        // syntax can be used to check property existence
        if (!callback(val, key, obj)) {
            result = false;
            return false; // break
        }
    });
    return result;
}
exports["default"] = every;
