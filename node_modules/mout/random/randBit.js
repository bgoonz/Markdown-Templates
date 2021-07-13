"use strict";
exports.__esModule = true;
var randBool_1 = require("./randBool");
/**
 * Returns random bit (0 or 1)
 */
function randomBit() {
    return randBool_1["default"]() ? 1 : 0;
}
exports["default"] = randomBit;
