"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var toArray_1 = require("../lang/toArray");
/**
 * Replace string(s) with the replacement(s) in the source.
 */
function replace(str, search, replacements) {
    str = toString_1["default"](str);
    search = toArray_1["default"](search);
    replacements = toArray_1["default"](replacements);
    var searchLength = search.length;
    var replacementsLength = replacements.length;
    if (replacementsLength !== 1 && searchLength !== replacementsLength) {
        throw new Error('Unequal number of searches and replacements');
    }
    var i = -1;
    while (++i < searchLength) {
        // Use the first replacement for all searches if only one
        // replacement is provided
        str = str.replace(search[i], replacements[replacementsLength === 1 ? 0 : i]);
    }
    return str;
}
exports["default"] = replace;
