"use strict";
exports.__esModule = true;
var lpad_1 = require("../string/lpad");
var toNumber_1 = require("../lang/toNumber");
/**
 * Add padding zeros if n.length < minLength.
 */
function pad(n, minLength, char) {
    n = toNumber_1["default"](n);
    return lpad_1["default"]("" + n, minLength, char || '0');
}
exports["default"] = pad;
