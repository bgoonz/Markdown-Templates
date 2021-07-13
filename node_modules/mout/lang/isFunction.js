"use strict";
exports.__esModule = true;
var isKind_1 = require("./isKind");
/**
 */
function isFunction(val) {
    return isKind_1["default"](val, 'Function');
}
exports["default"] = isFunction;
