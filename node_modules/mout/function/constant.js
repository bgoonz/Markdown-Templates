"use strict";
exports.__esModule = true;
/**
 * Returns a new function that will return the value
 */
function constant(value) {
    return function () {
        return value;
    };
}
exports["default"] = constant;
