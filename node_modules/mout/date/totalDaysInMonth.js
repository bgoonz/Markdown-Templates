"use strict";
exports.__esModule = true;
var isDate_1 = require("../lang/isDate");
var isLeapYear_1 = require("./isLeapYear");
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function totalDaysInMonth(fullYear, monthIndex) {
    if (isDate_1["default"](fullYear)) {
        monthIndex = fullYear.getMonth();
    }
    if (monthIndex === 1 && isLeapYear_1["default"](fullYear)) {
        return 29;
    }
    else {
        return DAYS_IN_MONTH[monthIndex];
    }
}
exports["default"] = totalDaysInMonth;
