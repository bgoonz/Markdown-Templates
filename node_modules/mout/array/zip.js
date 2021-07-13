"use strict";
exports.__esModule = true;
var max_1 = require("./max");
var map_1 = require("./map");
function getLength(arr) {
    return arr == null ? 0 : arr.length;
}
/**
 * Merges together the values of each of the arrays with the values at the
 * corresponding position.
 */
function zip(arr) {
    var len = arr ? max_1["default"](map_1["default"](arguments, getLength)) : 0;
    var results = [];
    var i = -1;
    while (++i < len) {
        // jshint loopfunc: true
        results.push(map_1["default"](arguments, function (item) {
            return item == null ? undefined : item[i];
        }));
    }
    return results;
}
exports["default"] = zip;
