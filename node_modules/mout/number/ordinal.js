"use strict";
exports.__esModule = true;
var toInt_1 = require("./toInt");
var nth_1 = require("./nth");
/**
 * converts number into ordinal form (1st, 2nd, 3rd, 4th, ...)
 */
function ordinal(n) {
    n = toInt_1["default"](n);
    return n + nth_1["default"](n);
}
exports["default"] = ordinal;
