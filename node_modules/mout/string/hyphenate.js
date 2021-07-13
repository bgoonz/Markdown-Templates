"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var slugify_1 = require("./slugify");
var unCamelCase_1 = require("./unCamelCase");
/**
 * Replaces spaces with hyphens, split camelCase text, remove non-word chars, remove accents and convert to lower case.
 */
function hyphenate(str) {
    str = toString_1["default"](str);
    str = unCamelCase_1["default"](str);
    return slugify_1["default"](str, '-');
}
exports["default"] = hyphenate;
