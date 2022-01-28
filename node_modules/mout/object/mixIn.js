"use strict";
exports.__esModule = true;
var forOwn_1 = require("./forOwn");
/**
 * Combine properties from all the objects into first one.
 * - This method affects target object in place, if you want to create a new Object pass an empty
 * object as first param.
 * @param {object} target    Target Object
 * @param {...object} objects    Objects to be combined (0...n objects).
 * @return {object} Target Object.
 */
function mixIn(target) {
    var objects = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objects[_i - 1] = arguments[_i];
    }
    var i = 0;
    var n = arguments.length;
    var obj;
    while (++i < n) {
        obj = arguments[i];
        if (obj != null) {
            forOwn_1["default"](obj, copyProp, target);
        }
    }
    return target;
}
function copyProp(val, key) {
    this[key] = val;
}
exports["default"] = mixIn;
