"use strict";
exports.__esModule = true;
var toNumber_1 = require("../lang/toNumber");
/**
 * Enforce a specific amount of decimal digits and also fix floating
 * point rounding issues.
 */
function enforcePrecision(val, nDecimalDigits) {
    val = toNumber_1["default"](val);
    var pow = Math.pow(10, nDecimalDigits);
    return +(Math.round(val * pow) / pow).toFixed(nDecimalDigits);
}
exports["default"] = enforcePrecision;
