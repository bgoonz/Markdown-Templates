"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var WHITE_SPACES_1 = require("./WHITE_SPACES");
/**
 * Remove chars from beginning of string.
 */
function ltrim(str, chars) {
    str = toString_1["default"](str);
    chars = chars || WHITE_SPACES_1["default"];
    var start = 0;
    var len = str.length;
    var charLen = chars.length;
    var found = true;
    var i;
    var c;
    while (found && start < len) {
        found = false;
        i = -1;
        c = str.charAt(start);
        while (++i < charLen) {
            if (c === chars[i]) {
                found = true;
                start++;
                break;
            }
        }
    }
    return start >= len ? '' : str.substr(start, len);
}
exports["default"] = ltrim;
