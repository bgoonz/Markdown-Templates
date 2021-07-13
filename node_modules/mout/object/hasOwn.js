"use strict";
exports.__esModule = true;
/**
 * Safer Object.hasOwnProperty
 */
function hasOwn(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
exports["default"] = hasOwn;
