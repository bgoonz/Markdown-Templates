"use strict";
exports.__esModule = true;
var forIn_1 = require("./forIn");
/**
 * return a list of all enumerable properties that have function values
 */
function functions(obj) {
    var keys = [];
    forIn_1["default"](obj, function (val, key) {
        if (typeof val === 'function') {
            keys.push(key);
        }
    });
    return keys.sort();
}
exports["default"] = functions;
