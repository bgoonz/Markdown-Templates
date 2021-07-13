"use strict";
exports.__esModule = true;
/**
 * Returns a function that call a method on the passed object
 */
function func(name) {
    return function (obj) {
        return obj[name]();
    };
}
exports["default"] = func;
