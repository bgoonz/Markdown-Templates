"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var escapeRegExp_1 = require("./escapeRegExp");
var DEFAULT_MARGIN_CHAR = '|';
/**
 * Strip leading characters followed by 'marginChar' from every line in a String.
 *
 * marginChar defaults to '|'.
 */
function stripMargin(str, marginChar) {
    marginChar = escapeRegExp_1["default"](marginChar || DEFAULT_MARGIN_CHAR);
    str = toString_1["default"](str);
    var regexp = new RegExp("^.*" + marginChar, 'gm');
    return str.replace(regexp, '');
}
exports["default"] = stripMargin;
