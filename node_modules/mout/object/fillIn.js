"use strict";
exports.__esModule = true;
var forEach_1 = require("../array/forEach");
var slice_1 = require("../array/slice");
var forOwn_1 = require("./forOwn");
/**
 * Copy missing properties in the obj from the defaults.
 */
function fillIn(obj) {
    var varDefaults = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        varDefaults[_i - 1] = arguments[_i];
    }
    forEach_1["default"](slice_1["default"](varDefaults), function (base) {
        forOwn_1["default"](base, function (val, key) {
            if (obj[key] == null) {
                obj[key] = val;
            }
        });
    });
    return obj;
}
exports["default"] = fillIn;
