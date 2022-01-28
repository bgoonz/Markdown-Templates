"use strict";
exports.__esModule = true;
var randBool_1 = require("./randBool");
/**
 * Returns random sign (-1 or 1)
 */
function randomSign() {
    return randBool_1["default"]() ? 1 : -1;
}
exports["default"] = randomSign;
