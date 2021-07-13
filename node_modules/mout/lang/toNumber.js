"use strict";
exports.__esModule = true;
var isArray_1 = require("./isArray");
/**
 * covert value into number if numeric
 */
function toNumber(val) {
    // numberic values should come first because of -0
    if (typeof val === 'number')
        return val;
    // we want all falsy values (besides -0) to return zero to avoid
    // headaches
    if (!val)
        return 0;
    if (typeof val === 'string')
        return parseFloat(val);
    // arrays are edge cases. `Number([4]) === 4`
    if (isArray_1["default"](val))
        return NaN;
    return Number(val);
}
exports["default"] = toNumber;
