"use strict";
exports.__esModule = true;
/**
 * Returns an Array of numbers inside range.
 */
function range(start, stop, step) {
    if (stop == null) {
        stop = start;
        start = 0;
    }
    step = step || 1;
    var result = [];
    var i = start;
    while (i <= stop) {
        result.push(i);
        i += step;
    }
    return result;
}
exports["default"] = range;
