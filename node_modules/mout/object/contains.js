"use strict";
exports.__esModule = true;
var some_1 = require("./some");
/**
 * Check if object contains value
 */
function contains(obj, needle) {
    return some_1["default"](obj, function (val) {
        return val === needle;
    });
}
exports["default"] = contains;
