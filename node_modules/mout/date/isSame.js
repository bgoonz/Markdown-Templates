"use strict";
exports.__esModule = true;
var startOf_1 = require("./startOf");
/**
 * Check if date is "same" with optional period
 */
function isSame(date1, date2, period) {
    if (period) {
        date1 = startOf_1["default"](date1, period);
        date2 = startOf_1["default"](date2, period);
    }
    return Number(date1) === Number(date2);
}
exports["default"] = isSame;
