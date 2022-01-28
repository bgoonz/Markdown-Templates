"use strict";
exports.__esModule = true;
var pad_1 = require("../number/pad");
/**
 * time zone as hour and minute offset from UTC (e.g. +0900)
 */
function timezoneOffset(date) {
    var offset = date.getTimezoneOffset();
    var abs = Math.abs(offset);
    var h = pad_1["default"](Math.floor(abs / 60), 2);
    var m = pad_1["default"](abs % 60, 2);
    return (offset > 0 ? '-' : '+') + h + m;
}
exports["default"] = timezoneOffset;
