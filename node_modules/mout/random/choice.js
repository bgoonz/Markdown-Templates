"use strict";
exports.__esModule = true;
var randInt_1 = require("./randInt");
/**
 * Returns a random element from the supplied arguments
 * or from the array (if single argument is an array).
 */
function choice() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    var target = items.length === 1 && Array.isArray(items[0]) ? items[0] : items;
    return target[randInt_1["default"](0, target.length - 1)];
}
exports["default"] = choice;
