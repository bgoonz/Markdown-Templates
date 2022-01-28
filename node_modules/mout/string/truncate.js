"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var trim_1 = require("./trim");
/**
 * Limit number of chars.
 */
function truncate(str, maxChars, append, onlyFullWords) {
    str = toString_1["default"](str);
    append = append || '...';
    maxChars = onlyFullWords ? maxChars + 1 : maxChars;
    str = trim_1["default"](str);
    if (str.length <= maxChars) {
        return str;
    }
    str = str.substr(0, maxChars - append.length);
    // crop at last space or remove trailing whitespace
    str = onlyFullWords ? str.substr(0, str.lastIndexOf(' ')) : trim_1["default"](str);
    return str + append;
}
exports["default"] = truncate;
