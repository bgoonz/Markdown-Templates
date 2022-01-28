"use strict";
exports.__esModule = true;
var isKind_1 = require("./isKind");
/**
 */
function isString(val) {
    return isKind_1["default"](val, 'String');
}
exports["default"] = isString;
