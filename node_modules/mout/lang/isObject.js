"use strict";
exports.__esModule = true;
var isKind_1 = require("./isKind");
/**
 */
function isObject(val) {
    return isKind_1["default"](val, 'Object');
}
exports["default"] = isObject;
