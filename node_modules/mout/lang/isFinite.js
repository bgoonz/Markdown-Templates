"use strict";
exports.__esModule = true;
var isNumber_1 = require("./isNumber");
var GLOBAL_1 = require("./GLOBAL");
/**
 * Check if value is finite
 */
function isFinite(val) {
    var is = false;
    if (typeof val === 'string' && val !== '') {
        is = GLOBAL_1["default"].isFinite(parseFloat(val));
    }
    else if (isNumber_1["default"](val)) {
        // need to use isNumber because of Number constructor
        is = GLOBAL_1["default"].isFinite(val);
    }
    return is;
}
exports["default"] = isFinite;
