"use strict";
exports.__esModule = true;
var choice_1 = require("./choice");
var randHex_1 = require("./randHex");
/**
 * Returns pseudo-random guid (UUID v4)
 * IMPORTANT: it's not totally "safe" since randHex/choice uses Math.random
 * by default and sequences can be predicted in some cases. See the
 * "random/random" documentation for more info about it and how to replace
 * the default PRNG.
 */
function guid() {
    return (randHex_1["default"](8) +
        '-' +
        randHex_1["default"](4) +
        '-' +
        // v4 UUID always contain "4" at this position to specify it was
        // randomly generated
        '4' +
        randHex_1["default"](3) +
        '-' +
        // v4 UUID always contain chars [a,b,8,9] at this position
        choice_1["default"](8, 9, 'a', 'b') +
        randHex_1["default"](3) +
        '-' +
        randHex_1["default"](12));
}
exports["default"] = guid;
