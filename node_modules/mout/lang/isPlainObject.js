"use strict";
exports.__esModule = true;
/**
 * Checks if the value is created by the `Object` constructor.
 */
function isPlainObject(value) {
    return !!value && typeof value === 'object' && value.constructor === Object;
}
exports["default"] = isPlainObject;
