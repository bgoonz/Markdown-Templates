"use strict";
exports.__esModule = true;
var forOwn_1 = require("./forOwn");
/**
 * Get object size
 */
function size(obj) {
    var count = 0;
    forOwn_1["default"](obj, function () {
        count++;
    });
    return count;
}
exports["default"] = size;
