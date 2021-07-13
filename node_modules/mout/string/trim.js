"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var WHITE_SPACES_1 = require("./WHITE_SPACES");
var ltrim_1 = require("./ltrim");
var rtrim_1 = require("./rtrim");
/**
 * Remove white-spaces from beginning and end of string.
 */
function trim(str, chars) {
    str = toString_1["default"](str);
    chars = chars || WHITE_SPACES_1["default"];
    return ltrim_1["default"](rtrim_1["default"](str, chars), chars);
}
exports["default"] = trim;
