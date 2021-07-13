"use strict";
exports.__esModule = true;
/**
 * Check if value is close to target.
 */
function isNear(val, target, threshold) {
    return Math.abs(val - target) <= threshold;
}
exports["default"] = isNear;
