"use strict";
exports.__esModule = true;
var toNumber_1 = require("../lang/toNumber");
/**
 * Get sign of the value.
 */
function sign(val) {
    var num = toNumber_1["default"](val);
    if (num === 0)
        return num; // +0 and +0 === 0
    if (isNaN(num))
        return num; // NaN
    return num < 0 ? -1 : 1;
}
exports["default"] = sign;
