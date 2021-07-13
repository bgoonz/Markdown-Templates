"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var truncate_1 = require("./truncate");
/**
 * Truncate string at full words.
 */
function crop(str, maxChars, append) {
    str = toString_1["default"](str);
    return truncate_1["default"](str, maxChars, append, true);
}
exports["default"] = crop;
