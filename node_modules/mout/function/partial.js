"use strict";
exports.__esModule = true;
var indexOf_1 = require("../array/indexOf");
var take_1 = require("../array/take");
var _ = {};
/**
 * Creates a partially applied function.
 */
function partial(f) {
    var outerArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        outerArgs[_i - 1] = arguments[_i];
    }
    var has_ = indexOf_1["default"](outerArgs, _) !== -1;
    return function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        // Don't waste time checking for placeholders if there aren't any.
        var args = has_
            ? take_1["default"](outerArgs.length, function (i) {
                var a = outerArgs[i];
                return a === _ ? rest.shift() : a;
            })
            : outerArgs;
        return f.apply(this, rest.length ? args.concat(rest) : args);
    };
}
partial._ = _;
exports["default"] = partial;
