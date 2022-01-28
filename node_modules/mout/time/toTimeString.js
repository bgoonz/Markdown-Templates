"use strict";
exports.__esModule = true;
var countSteps_1 = require("../math/countSteps");
var pad_1 = require("../number/pad");
var HOUR = 3600000;
var MINUTE = 60000;
var SECOND = 1000;
/**
 * Format timestamp into a time string.
 */
function toTimeString(ms) {
    var h = ms < HOUR ? 0 : countSteps_1["default"](ms, HOUR);
    var m = ms < MINUTE ? 0 : countSteps_1["default"](ms, MINUTE, 60);
    var s = ms < SECOND ? 0 : countSteps_1["default"](ms, SECOND, 60);
    var str = '';
    str += h ? h + ':' : '';
    str += pad_1["default"](m, 2) + ':';
    str += pad_1["default"](s, 2);
    return str;
}
exports["default"] = toTimeString;
