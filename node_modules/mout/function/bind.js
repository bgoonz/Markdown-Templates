"use strict";
exports.__esModule = true;
/**
 * Return a function that will execute in the given context, optionally adding any additional supplied parameters to the beginning of the arguments collection.
 * @param {Function} fn  Function.
 * @param {object} context   Execution context.
 * @param {rest} args    Arguments (0...n arguments).
 * @return {Function} Wrapped Function.
 */
function bind(fn, context) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return function () {
        var innerArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            innerArgs[_i] = arguments[_i];
        }
        return fn.apply(context, args.concat(innerArgs));
    };
}
exports["default"] = bind;
