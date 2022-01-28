"use strict";
exports.__esModule = true;
var typecast_1 = require("../string/typecast");
var getQuery_1 = require("./getQuery");
/**
 * Get query parameter value.
 */
function getParam(url, param, shouldTypecast) {
    var regexp = new RegExp("(\\?|&)" + param + "=([^&]*)"); // matches `?param=value` or `&param=value`, value = $2
    var result = regexp.exec(getQuery_1["default"](url));
    var val = result && result[2] ? result[2] : null;
    return shouldTypecast === false ? val : typecast_1["default"](val);
}
exports["default"] = getParam;
