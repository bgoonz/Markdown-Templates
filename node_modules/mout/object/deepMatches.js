"use strict";
exports.__esModule = true;
var forOwn_1 = require("./forOwn");
var isArray_1 = require("../lang/isArray");
function containsMatch(array, pattern) {
    var i = -1;
    var length = array.length;
    while (++i < length) {
        if (deepMatches(array[i], pattern)) {
            return true;
        }
    }
    return false;
}
function matchArray(target, pattern) {
    var i = -1;
    var patternLength = pattern.length;
    while (++i < patternLength) {
        if (!containsMatch(target, pattern[i])) {
            return false;
        }
    }
    return true;
}
function matchObject(target, pattern) {
    var result = true;
    forOwn_1["default"](pattern, function (val, key) {
        if (!deepMatches(target[key], val)) {
            // Return false to break out of forOwn early
            return (result = false);
        }
    });
    return result;
}
/**
 * Recursively check if the objects match.
 */
function deepMatches(target, pattern) {
    if (target && typeof target === 'object' && pattern && typeof pattern === 'object') {
        if (isArray_1["default"](target) && isArray_1["default"](pattern)) {
            return matchArray(target, pattern);
        }
        else {
            return matchObject(target, pattern);
        }
    }
    else {
        return target === pattern;
    }
}
exports["default"] = deepMatches;
