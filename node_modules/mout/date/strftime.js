"use strict";
exports.__esModule = true;
var pad_1 = require("../number/pad");
var lpad_1 = require("../string/lpad");
var i18n_1 = require("./i18n_");
var dayOfTheYear_1 = require("./dayOfTheYear");
var timezoneOffset_1 = require("./timezoneOffset");
var timezoneAbbr_1 = require("./timezoneAbbr");
var weekOfTheYear_1 = require("./weekOfTheYear");
var _combinations = {
    D: '%m/%d/%y',
    F: '%Y-%m-%d',
    r: '%I:%M:%S %p',
    R: '%H:%M',
    T: '%H:%M:%S',
    x: 'locale',
    X: 'locale',
    c: 'locale'
};
/**
 * format date based on strftime format
 */
function strftime(date, format, localeData) {
    if (localeData === void 0) { localeData = i18n_1["default"]; }
    var reToken = /%([a-z%])/gi;
    function makeIterator(fn) {
        return function (match, token) {
            return fn(date, token, localeData);
        };
    }
    return format
        .replace(reToken, makeIterator(expandCombinations))
        .replace(reToken, makeIterator(convertToken));
}
function expandCombinations(date, token, l10n) {
    if (token in _combinations) {
        var expanded = _combinations[token];
        return expanded === 'locale' ? l10n[token] : expanded;
    }
    else {
        return "%" + token;
    }
}
function convertToken(date, token, l10n) {
    var day;
    switch (token) {
        case 'a':
            return l10n.days_abbr[date.getDay()];
        case 'A':
            return l10n.days[date.getDay()];
        case 'h':
        case 'b':
            return l10n.months_abbr[date.getMonth()];
        case 'B':
            return l10n.months[date.getMonth()];
        case 'C':
            return pad_1["default"](Math.floor(date.getFullYear() / 100), 2);
        case 'd':
            return pad_1["default"](date.getDate(), 2);
        case 'e':
            return pad_1["default"](date.getDate(), 2, ' ');
        case 'H':
            return pad_1["default"](date.getHours(), 2);
        case 'I':
            return pad_1["default"](date.getHours() % 12, 2);
        case 'j':
            return pad_1["default"](dayOfTheYear_1["default"](date), 3);
        case 'l':
            return lpad_1["default"](date.getHours() % 12, 2);
        case 'L':
            return pad_1["default"](date.getMilliseconds(), 3);
        case 'm':
            return pad_1["default"](date.getMonth() + 1, 2);
        case 'M':
            return pad_1["default"](date.getMinutes(), 2);
        case 'n':
            return '\n';
        case 'p':
            return date.getHours() >= 12 ? l10n.pm : l10n.am;
        case 'P':
            return convertToken(date, 'p', l10n).toLowerCase();
        case 's':
            return date.getTime() / 1000;
        case 'S':
            return pad_1["default"](date.getSeconds(), 2);
        case 't':
            return '\t';
        case 'u':
            day = date.getDay();
            return day === 0 ? 7 : day;
        case 'U':
            return pad_1["default"](weekOfTheYear_1["default"](date), 2);
        case 'w':
            return date.getDay();
        case 'W':
            return pad_1["default"](weekOfTheYear_1["default"](date, 1), 2);
        case 'y':
            return pad_1["default"](date.getFullYear() % 100, 2);
        case 'Y':
            return pad_1["default"](date.getFullYear(), 4);
        case 'z':
            return timezoneOffset_1["default"](date);
        case 'Z':
            return timezoneAbbr_1["default"](date);
        case '%':
            return '%';
        default:
            // keep unrecognized tokens
            return "%" + token;
    }
}
exports["default"] = strftime;
