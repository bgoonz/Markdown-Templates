"use strict";
exports.__esModule = true;
var hasOwn_1 = require("./hasOwn");
var deepClone_1 = require("../lang/deepClone");
var isObject_1 = require("../lang/isObject");
/**
 * Deep merge objects.
 */
function merge() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var i = 1;
    var key;
    var val;
    var obj;
    // make sure we don't modify source element and it's properties
    // objects are passed by reference
    var target = deepClone_1["default"](values[0]);
    while ((obj = values[i++])) {
        for (key in obj) {
            if (!hasOwn_1["default"](obj, key)) {
                continue;
            }
            val = obj[key];
            if (isObject_1["default"](val) && isObject_1["default"](target[key])) {
                // inception, deep merge objects
                target[key] = merge(target[key], val);
            }
            else {
                // make sure arrays, regexp, date, objects are cloned
                target[key] = deepClone_1["default"](val);
            }
        }
    }
    return target;
}
exports["default"] = merge;
