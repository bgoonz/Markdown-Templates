"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var replaceAccents_1 = require("./replaceAccents");
var removeNonWord_1 = require("./removeNonWord");
var trim_1 = require("./trim");
/**
 * Convert to lower case, remove accents, remove non-word chars and
 * replace spaces with the specified delimeter.
 * Does not split camelCase text.
 */
function slugify(str, delimeter) {
    str = toString_1["default"](str);
    if (delimeter == null) {
        delimeter = '-';
    }
    str = replaceAccents_1["default"](str);
    str = removeNonWord_1["default"](str);
    str = trim_1["default"](str) // should come after removeNonWord
        .replace(/ +/g, delimeter) // replace spaces with delimeter
        .toLowerCase();
    return str;
}
exports["default"] = slugify;
