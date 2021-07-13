"use strict";
exports.__esModule = true;
var get_1 = require("./get");
var UNDEF;
/**
 * Check if object has nested property.
 */
function has(obj, prop) {
    return get_1["default"](obj, prop) !== UNDEF;
}
exports["default"] = has;
