"use strict";
exports.__esModule = true;
var namespace_1 = require("./namespace");
/**
 * set "nested" object property
 */
function set(obj, prop, val) {
    var parts = /^(.+)\.(.+)$/.exec(prop);
    if (parts) {
        namespace_1["default"](obj, parts[1])[parts[2]] = val;
    }
    else {
        obj[prop] = val;
    }
}
exports["default"] = set;
