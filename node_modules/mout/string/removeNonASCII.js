"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
/**
 * Remove non-printable ASCII chars
 */
function removeNonASCII(str) {
    str = toString_1["default"](str);
    // Matches non-printable ASCII chars -
    // http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
    return str.replace(/[^\x20-\x7E]/g, '');
}
exports["default"] = removeNonASCII;
