"use strict";
exports.__esModule = true;
var countSteps_1 = require("../math/countSteps");
/**
 * Parse timestamp into an object.
 */
function parseMs(ms) {
    return {
        milliseconds: countSteps_1["default"](ms, 1, 1000),
        seconds: countSteps_1["default"](ms, 1000, 60),
        minutes: countSteps_1["default"](ms, 60000, 60),
        hours: countSteps_1["default"](ms, 3600000, 24),
        days: countSteps_1["default"](ms, 86400000)
    };
}
exports["default"] = parseMs;
