"use strict";
exports.__esModule = true;
var isLeapYear_1 = require("./isLeapYear");
/**
 * return the amount of days in the year following the gregorian calendar
 * and leap years
 */
function totalDaysInYear(fullYear) {
    return isLeapYear_1["default"](fullYear) ? 366 : 365;
}
exports["default"] = totalDaysInYear;
