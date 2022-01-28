"use strict";
exports.__esModule = true;
/**
 * Checks if value is inside the range.
 */
function inRange(val, min, max, threshold) {
    if (threshold === void 0) { threshold = 0; }
    return val + threshold >= min && val - threshold <= max;
}
exports["default"] = inRange;
