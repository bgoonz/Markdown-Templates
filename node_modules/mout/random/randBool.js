"use strict";
exports.__esModule = true;
var random_1 = require("./random");
/**
 * returns a random boolean value (true or false)
 */
function randBool() {
    return random_1["default"]() >= 0.5;
}
exports["default"] = randBool;
