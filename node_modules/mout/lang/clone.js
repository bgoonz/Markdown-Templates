"use strict";
exports.__esModule = true;
var kindOf_1 = require("./kindOf");
var isPlainObject_1 = require("./isPlainObject");
var mixIn_1 = require("../object/mixIn");
/**
 * Clone native types.
 */
function clone(val) {
    switch (kindOf_1["default"](val)) {
        case 'Object':
            return cloneObject(val);
        case 'Array':
            return cloneArray(val);
        case 'RegExp':
            return cloneRegExp(val);
        case 'Date':
            return cloneDate(val);
        default:
            return val;
    }
}
function cloneObject(source) {
    if (isPlainObject_1["default"](source)) {
        return mixIn_1["default"]({}, source);
    }
    else {
        return source;
    }
}
function cloneRegExp(r) {
    var flags = '';
    flags += r.multiline ? 'm' : '';
    flags += r.global ? 'g' : '';
    flags += r.ignoreCase ? 'i' : '';
    return new RegExp(r.source, flags);
}
function cloneDate(date) {
    return new Date(+date);
}
function cloneArray(arr) {
    return arr.slice();
}
exports["default"] = clone;
