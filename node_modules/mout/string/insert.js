"use strict";
exports.__esModule = true;
var clamp_1 = require("../math/clamp");
var toString_1 = require("../lang/toString");
/**
 * Inserts a string at a given index.
 */
function insert(string, index, partial) {
    string = toString_1["default"](string);
    if (index < 0) {
        index = string.length + index;
    }
    index = clamp_1["default"](index, 0, string.length);
    return string.substr(0, index) + partial + string.substr(index);
}
exports["default"] = insert;
