"use strict";
exports.__esModule = true;
/**
 * Linear interpolation.
 * IMPORTANT:will return `Infinity` if numbers overflow Number.MAX_VALUE
 */
function lerp(ratio, start, end) {
    return start + (end - start) * ratio;
}
exports["default"] = lerp;
