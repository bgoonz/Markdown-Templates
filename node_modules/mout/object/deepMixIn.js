"use strict";
exports.__esModule = true;
var forOwn_1 = require("./forOwn");
var isPlainObject_1 = require("../lang/isPlainObject");
/**
 * Mixes objects into the target object, recursively mixing existing child
 * objects.
 */
function deepMixIn(target, objects) {
    var i = 0;
    var n = arguments.length;
    var obj;
    while (++i < n) {
        obj = arguments[i];
        if (obj) {
            forOwn_1["default"](obj, copyProp, target);
        }
    }
    return target;
}
function copyProp(val, key) {
    var existing = this[key];
    if (isPlainObject_1["default"](val) && isPlainObject_1["default"](existing)) {
        deepMixIn(existing, val);
    }
    else {
        this[key] = val;
    }
}
exports["default"] = deepMixIn;
