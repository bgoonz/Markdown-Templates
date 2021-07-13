"use strict";
exports.__esModule = true;
var dayOfTheYear_1 = require("./dayOfTheYear");
/**
 * Return the week of the year based on given firstDayOfWeek
 */
function weekOfTheYear(date, firstDayOfWeek) {
    if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
    var doy = dayOfTheYear_1["default"](date);
    var dow = (7 + date.getDay() - firstDayOfWeek) % 7;
    var relativeWeekDay = 6 - firstDayOfWeek - dow;
    return Math.floor((doy + relativeWeekDay) / 7);
}
exports["default"] = weekOfTheYear;
