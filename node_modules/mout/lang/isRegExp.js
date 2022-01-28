"use strict";
exports.__esModule = true;
var isKind_1 = require("./isKind");
/**
 */
function isRegExp(val) {
    return isKind_1["default"](val, 'RegExp');
}
exports["default"] = isRegExp;
