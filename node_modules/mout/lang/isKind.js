"use strict";
exports.__esModule = true;
var kindOf_1 = require("./kindOf");
/**
 * Check if value is from a specific "kind".
 */
function isKind(val, kind) {
    return kindOf_1["default"](val) === kind;
}
exports["default"] = isKind;
