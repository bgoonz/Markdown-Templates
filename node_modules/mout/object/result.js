"use strict";
exports.__esModule = true;
var isFunction_1 = require("../lang/isFunction");
function result(obj, prop) {
    var property = obj[prop];
    if (property === undefined) {
        return;
    }
    return isFunction_1["default"](property) ? property.call(obj) : property;
}
exports["default"] = result;
