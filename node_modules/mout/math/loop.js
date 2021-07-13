"use strict";
exports.__esModule = true;
/**
 * Loops value inside range.
 */
function loop(val, min, max) {
    return val < min ? max : val > max ? min : val;
}
exports["default"] = loop;
