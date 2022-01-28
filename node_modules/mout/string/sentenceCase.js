"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var lowerCase_1 = require("./lowerCase");
var upperCase_1 = require("./upperCase");
/**
 * UPPERCASE first char of each sentence and lowercase other chars.
 */
function sentenceCase(str) {
    str = toString_1["default"](str);
    // Replace first char of each sentence (new line or after '.\s+') to
    // UPPERCASE
    return lowerCase_1["default"](str).replace(/(^\w)|\.\s+(\w)/gm, upperCase_1["default"]);
}
exports["default"] = sentenceCase;
