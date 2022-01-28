"use strict";
exports.__esModule = true;
/**
 * ES6 Number.isNaN
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
 */
function isNaN(val) {
    return typeof val === 'number' && val != val;
}
exports["default"] = isNaN;
