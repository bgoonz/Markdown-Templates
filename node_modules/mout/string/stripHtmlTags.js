"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
/**
 * Remove HTML tags from string.
 */
function stripHtmlTags(str) {
    str = toString_1["default"](str);
    return str.replace(/<[^>]*>/g, '');
}
exports["default"] = stripHtmlTags;
