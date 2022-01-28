"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var get_1 = require("../object/get");
var stache = /\{\{([^\}]+)\}\}/g; // mustache-like
/**
 * String interpolation
 */
function interpolate(template, replacements, syntax) {
    template = toString_1["default"](template);
    var replaceFn = function (match, prop) {
        return toString_1["default"](get_1["default"](replacements, prop));
    };
    return template.replace(syntax || stache, replaceFn);
}
exports["default"] = interpolate;
