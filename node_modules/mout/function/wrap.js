"use strict";
exports.__esModule = true;
var partial_1 = require("./partial");
/**
 * Returns the first function passed as an argument to the second,
 * allowing you to adjust arguments, run code before and after, and
 * conditionally execute the original function.
 */
function wrap(fn, wrapper) {
    return partial_1["default"](wrapper, fn);
}
exports["default"] = wrap;
