"use strict";
exports.__esModule = true;
var functions_1 = require("./functions");
var bind_1 = require("../function/bind");
var forEach_1 = require("../array/forEach");
/**
 * Binds methods of the object to be run in it's own context.
 */
function bindAll(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var keys = args.length > 0 ? args : functions_1["default"](obj);
    forEach_1["default"](keys, function (key) {
        obj[key] = bind_1["default"](obj[key], obj);
    });
}
exports["default"] = bindAll;
