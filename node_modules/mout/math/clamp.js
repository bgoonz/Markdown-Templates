"use strict";
exports.__esModule = true;
/**
 * Clamps value inside range.
 */
function clamp(val, min, max) {
    return val < min ? min : val > max ? max : val;
}
exports["default"] = clamp;
