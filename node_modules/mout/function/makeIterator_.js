"use strict";
exports.__esModule = true;
var identity_1 = require("./identity");
var prop_1 = require("./prop");
var deepMatches_1 = require("../object/deepMatches");
/**
 * Converts argument into a valid iterator.
 * Used internally on most array/object/collection methods that receives a
 * callback/iterator providing a shortcut syntax.
 */
function makeIterator(src, thisObj) {
    if (src == null) {
        return identity_1["default"];
    }
    switch (typeof src) {
        case 'function':
            // function is the first to improve perf (most common case)
            // also avoid using `Function#call` if not needed, which boosts
            // perf a lot in some cases
            return typeof thisObj !== 'undefined'
                ? function (val, i, arr) {
                    return src.call(thisObj, val, i, arr);
                }
                : src;
        case 'object':
            return function (val) {
                return deepMatches_1["default"](val, src);
            };
        case 'string':
        case 'number':
            return prop_1["default"](src);
    }
}
exports["default"] = makeIterator;
