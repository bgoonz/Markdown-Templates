"use strict";
exports.__esModule = true;
var getQuery_1 = require("./getQuery");
/**
 * Checks if query string contains parameter.
 */
function contains(url, paramName) {
    var regex = new RegExp("(\\?|&)" + paramName + "=", 'g'); // matches `?param=` or `&param=`
    return regex.test(getQuery_1["default"](url));
}
exports["default"] = contains;
