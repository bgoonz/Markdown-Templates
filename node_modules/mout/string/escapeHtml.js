"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
/**
 * Escapes a string for insertion into HTML.
 */
function escapeHtml(str) {
    str = toString_1["default"](str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#39;')
        .replace(/"/g, '&quot;');
    return str;
}
exports["default"] = escapeHtml;
