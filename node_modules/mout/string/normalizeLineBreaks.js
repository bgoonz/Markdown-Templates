"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
/**
 * Convert line-breaks from DOS/MAC to a single standard (UNIX by default)
 */
function normalizeLineBreaks(str, lineEnd) {
    str = toString_1["default"](str);
    lineEnd = lineEnd || '\n';
    return str
        .replace(/\r\n/g, lineEnd) // DOS
        .replace(/\r/g, lineEnd) // Mac
        .replace(/\n/g, lineEnd); // Unix
}
exports["default"] = normalizeLineBreaks;
