"use strict";
exports.__esModule = true;
var isDate_1 = require("../lang/isDate");
/**
 * checks if it's a leap year
 */
function isLeapYear(fullYear) {
    if (isDate_1["default"](fullYear)) {
        fullYear = fullYear.getFullYear();
    }
    return fullYear % 400 === 0 || (fullYear % 100 !== 0 && fullYear % 4 === 0);
}
exports["default"] = isLeapYear;
