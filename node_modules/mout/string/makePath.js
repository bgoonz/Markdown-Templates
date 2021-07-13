"use strict";
exports.__esModule = true;
var join_1 = require("../array/join");
var slice_1 = require("../array/slice");
/**
 * Group arguments as path segments, if any of the args is `null` or an
 * empty string it will be ignored from resulting path.
 */
function makePath() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var result = join_1["default"](slice_1["default"](args), '/');
    // need to disconsider duplicate '/' after protocol (eg: 'http://')
    return result.replace(/([^:\/]|^)\/{2,}/g, '$1/');
}
exports["default"] = makePath;
