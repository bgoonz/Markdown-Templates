"use strict";
exports.__esModule = true;
var forOwn_1 = require("./forOwn");
/**
 * Get object values
 */
function values(obj) {
    var vals = [];
    forOwn_1["default"](obj, function (val, key) {
        vals.push(val);
    });
    return vals;
}
exports["default"] = values;
