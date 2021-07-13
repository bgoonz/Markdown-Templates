"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var lowerCase_1 = require("./lowerCase");
var upperCase_1 = require("./upperCase");
/**
 * UPPERCASE first char of each word.
 */
function properCase(str) {
    str = toString_1["default"](str);
    return lowerCase_1["default"](str).replace(/^\w|\s\w/g, upperCase_1["default"]);
}
exports["default"] = properCase;
