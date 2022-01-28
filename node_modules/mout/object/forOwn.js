"use strict";
exports.__esModule = true;
var hasOwn_1 = require("./hasOwn");
var forIn_1 = require("./forIn");
/**
 * Similar to Array/forEach but works over object properties and fixes Don't
 * Enum bug on IE.
 * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
 */
function forOwn(obj, fn, thisObj) {
    forIn_1["default"](obj, function (_, key) {
        if (hasOwn_1["default"](obj, key)) {
            return fn.call(thisObj, obj[key], key, obj);
        }
    });
}
exports["default"] = forOwn;
