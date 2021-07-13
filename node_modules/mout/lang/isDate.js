"use strict";
exports.__esModule = true;
var isKind_1 = require("./isKind");
/**
 */
function isDate(val) {
    return isKind_1["default"](val, 'Date');
}
exports["default"] = isDate;
