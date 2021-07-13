"use strict";
exports.__esModule = true;
var some_1 = require("../array/some");
var datePatterns = [
    /^([0-9]{4})$/,
    /^([0-9]{4})-([0-9]{2})$/,
    /^([0-9]{4})-?([0-9]{2})-?([0-9]{2})$/ // YYYY-MM-DD or YYYYMMDD
];
var ORD_DATE = /^([0-9]{4})-?([0-9]{3})$/; // YYYY-DDD
var timePatterns = [
    /^([0-9]{2}(?:\.[0-9]*)?)$/,
    /^([0-9]{2}):?([0-9]{2}(?:\.[0-9]*)?)$/,
    /^([0-9]{2}):?([0-9]{2}):?([0-9]{2}(\.[0-9]*)?)$/ // HH:MM:SS.ss
];
var DATE_TIME = /^(.+)T(.+)$/;
var TIME_ZONE = /^(.+)([+\-])([0-9]{2}):?([0-9]{2})$/;
function matchAll(str, patterns) {
    var match;
    var found = some_1["default"](patterns, function (pattern) {
        return !!(match = pattern.exec(str));
    });
    return found ? match : null;
}
function getDate(year, month, day) {
    var date = new Date(Date.UTC(year, month, day));
    // Explicitly set year to avoid Date.UTC making dates < 100 relative to
    // 1900
    date.setUTCFullYear(year);
    var valid = date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day;
    return valid ? +date : NaN;
}
function parseOrdinalDate(str) {
    var match = ORD_DATE.exec(str);
    if (match) {
        var year = +match[1];
        var day = +match[2];
        var date = new Date(Date.UTC(year, 0, day));
        if (date.getUTCFullYear() === year) {
            return +date;
        }
    }
    return NaN;
}
function parseDate(str) {
    var match = matchAll(str, datePatterns);
    if (match === null) {
        // Ordinal dates are verified differently.
        return parseOrdinalDate(str);
    }
    var year = match[1] === void 0 ? 0 : +match[1];
    var month = match[2] === void 0 ? 0 : +match[2] - 1;
    var day = match[3] === void 0 ? 1 : +match[3];
    return getDate(year, month, day);
}
function getTime(hr, min, sec) {
    var valid = (hr < 24 && hr >= 0 && min < 60 && min >= 0 && sec < 60 && min >= 0) ||
        (hr === 24 && min === 0 && sec === 0);
    if (!valid) {
        return NaN;
    }
    return ((hr * 60 + min) * 60 + sec) * 1000;
}
function parseOffset(str) {
    var match;
    if (str.charAt(str.length - 1) === 'Z') {
        str = str.substring(0, str.length - 1);
    }
    else {
        match = TIME_ZONE.exec(str);
        if (match) {
            var hours = +match[3];
            var minutes = match[4] === void 0 ? 0 : +match[4];
            var offset = getTime(hours, minutes, 0);
            if (match[2] === '-') {
                offset *= -1;
            }
            return { offset: offset, time: match[1] };
        }
    }
    // No time zone specified, assume UTC
    return { offset: 0, time: str };
}
function parseTime(str) {
    var _a = parseOffset(str), offset = _a.offset, time = _a.time;
    if (isNaN(offset)) {
        return NaN;
    }
    var match = matchAll(time, timePatterns);
    if (match === null) {
        return NaN;
    }
    var hours = match[1] === void 0 ? 0 : +match[1];
    var minutes = match[2] === void 0 ? 0 : +match[2];
    var seconds = match[3] === void 0 ? 0 : +match[3];
    return getTime(hours, minutes, seconds) - offset;
}
/**
 * Parse an ISO8601 formatted date string, and return a Date object.
 */
function parseISO8601(str) {
    var match = DATE_TIME.exec(str);
    if (!match) {
        // No time specified
        return parseDate(str);
    }
    return parseDate(match[1]) + parseTime(match[2]);
}
exports["default"] = parseISO8601;
