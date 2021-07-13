"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var camelCase_1 = require("./camelCase");
var upperCase_1 = require("./upperCase");
/**
 * camelCase + UPPERCASE first char
 */
function pascalCase(str) {
    str = toString_1["default"](str);
    return camelCase_1["default"](str).replace(/^[a-z]/, upperCase_1["default"]);
}
exports["default"] = pascalCase;
