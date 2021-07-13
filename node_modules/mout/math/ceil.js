"use strict";
exports.__esModule = true;
/**
 * Round value up with a custom radix.
 */
function ceil(val, step) {
    step = Math.abs(step || 1);
    return Math.ceil(val / step) * step;
}
exports["default"] = ceil;
