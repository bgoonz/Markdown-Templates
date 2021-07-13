"use strict";
exports.__esModule = true;
var choice_1 = require("./choice");
var _chars = '0123456789abcdef'.split('');
/**
 * Returns a random hexadecimal string
 */
function randHex(size) {
    size = size && size > 0 ? size : 6;
    var str = '';
    while (size--) {
        str += choice_1["default"](_chars);
    }
    return str;
}
exports["default"] = randHex;
