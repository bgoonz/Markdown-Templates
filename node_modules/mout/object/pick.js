"use strict";
exports.__esModule = true;
function pick(obj) {
    var varKeys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        varKeys[_i - 1] = arguments[_i];
    }
    var keys = Array.isArray(varKeys[0]) ? varKeys[0] : varKeys;
    var out = {};
    var i = 0;
    var key;
    while ((key = keys[i++])) {
        out[key] = obj[key];
    }
    return out;
}
exports["default"] = pick;
