"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var WHITE_SPACES_1 = require("./WHITE_SPACES");
/**
 * Remove chars from end of string.
 */
function rtrim(str, chars) {
    str = toString_1["default"](str);
    chars = chars || WHITE_SPACES_1["default"];
    var end = str.length - 1;
    var charLen = chars.length;
    var found = true;
    var i;
    var c;
    while (found && end >= 0) {
        found = false;
        i = -1;
        c = str.charAt(end);
        while (++i < charLen) {
            if (c === chars[i]) {
                found = true;
                end--;
                break;
            }
        }
    }
    return end >= 0 ? str.substring(0, end + 1) : '';
}
exports["default"] = rtrim;
