"use strict";
exports.__esModule = true;
var isKind_1 = require("./isKind");
/**
 */
function isNumber(val) {
    return isKind_1["default"](val, 'Number');
}
exports["default"] = isNumber;
