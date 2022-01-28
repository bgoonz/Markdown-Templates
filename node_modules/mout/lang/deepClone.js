"use strict";
exports.__esModule = true;
var clone_1 = require("./clone");
var forOwn_1 = require("../object/forOwn");
var kindOf_1 = require("./kindOf");
var isPlainObject_1 = require("./isPlainObject");
/**
 * Recursively clone native types.
 */
function deepClone(val, instanceClone) {
    if (Array.isArray(val)) {
        return cloneArray(val, instanceClone);
    }
    else if (kindOf_1["default"](val) === 'Object') {
        return cloneObject(val, instanceClone);
    }
    else {
        return clone_1["default"](val);
    }
}
function cloneObject(source, instanceClone) {
    if (isPlainObject_1["default"](source)) {
        var out = {};
        forOwn_1["default"](source, function (val, key) {
            this[key] = deepClone(val, instanceClone);
        }, out);
        return out;
    }
    else if (instanceClone) {
        return instanceClone(source);
    }
    else {
        return source;
    }
}
function cloneArray(arr, instanceClone) {
    var out = [];
    var n = arr.length;
    var i = -1;
    while (++i < n) {
        out[i] = deepClone(arr[i], instanceClone);
    }
    return out;
}
exports["default"] = deepClone;
