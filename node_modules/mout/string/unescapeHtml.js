"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
/**
 * Unescapes HTML special chars
 */
function unescapeHtml(str) {
    str = toString_1["default"](str)
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#0*39;/g, "'")
        .replace(/&quot;/g, '"');
    return str;
}
exports["default"] = unescapeHtml;
