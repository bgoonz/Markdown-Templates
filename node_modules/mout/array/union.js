"use strict";
exports.__esModule = true;
var unique_1 = require("./unique");
var append_1 = require("./append");
/**
 * Concat multiple arrays and remove duplicates
 */
function union(arrs) {
    var results = [];
    var i = -1;
    var len = arguments.length;
    while (++i < len) {
        append_1["default"](results, arguments[i]);
    }
    return unique_1["default"](results);
}
exports["default"] = union;
