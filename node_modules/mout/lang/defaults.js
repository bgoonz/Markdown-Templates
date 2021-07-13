"use strict";
exports.__esModule = true;
var toArray_1 = require("./toArray");
var find_1 = require("../array/find");
/**
 * Return first non void argument
 */
function defaults(varArgs) {
    return find_1["default"](toArray_1["default"](arguments), nonVoid);
}
function nonVoid(val) {
    return val != null;
}
exports["default"] = defaults;
