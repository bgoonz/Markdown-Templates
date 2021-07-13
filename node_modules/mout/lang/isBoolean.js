"use strict";
exports.__esModule = true;
var isKind_1 = require("./isKind");
/**
 */
function isBoolean(val) {
    return isKind_1["default"](val, 'Boolean');
}
exports["default"] = isBoolean;
