"use strict";
exports.__esModule = true;
var contains_1 = require("../array/contains");
function omit(obj) {
    var varKeys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        varKeys[_i - 1] = arguments[_i];
    }
    var keys = Array.isArray(varKeys[0]) ? varKeys[0] : varKeys;
    var out = {};
    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property) && !contains_1["default"](keys, property)) {
            out[property] = obj[property];
        }
    }
    return out;
}
exports["default"] = omit;
