"use strict";
exports.__esModule = true;
/**
 * Count number of full steps.
 */
function countSteps(val, step, overflow) {
    val = Math.floor(val / step);
    if (overflow) {
        return val % overflow;
    }
    return val;
}
exports["default"] = countSteps;
