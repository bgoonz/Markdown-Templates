"use strict";
exports.__esModule = true;
var forEach_1 = require("../array/forEach");
/**
 * Create nested object if non-existent
 */
function namespace(obj, path) {
    if (!path)
        return obj;
    forEach_1["default"](path.split('.'), function (key) {
        if (!obj[key]) {
            obj[key] = {};
        }
        obj = obj[key];
    });
    return obj;
}
exports["default"] = namespace;
