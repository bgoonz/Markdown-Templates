"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var CAMEL_CASE_BORDER = /([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g;
/**
 * Add space between camelCase text.
 */
function unCamelCase(str, delimiter) {
    if (delimiter === void 0) { delimiter = ' '; }
    if (delimiter == null) {
        delimiter = ' ';
    }
    function join(str, c1, c2) {
        return c1 + delimiter + c2;
    }
    str = toString_1["default"](str);
    str = str.replace(CAMEL_CASE_BORDER, join);
    str = str.toLowerCase(); // add space between camelCase text
    return str;
}
exports["default"] = unCamelCase;
