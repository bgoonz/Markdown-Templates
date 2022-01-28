"use strict";
exports.__esModule = true;
/**
 * Delays the call of a function within a given context.
 */
function timeout(fn, millis, context) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    return setTimeout(function () {
        fn.apply(context, args);
    }, millis);
}
exports["default"] = timeout;
