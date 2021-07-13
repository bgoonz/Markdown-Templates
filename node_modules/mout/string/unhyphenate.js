"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
/**
 * Replaces hyphens with spaces. (only hyphens between word chars)
 */
function unhyphenate(str) {
    str = toString_1["default"](str);
    return str.replace(/(\w)(-)(\w)/g, '$1 $3');
}
exports["default"] = unhyphenate;
