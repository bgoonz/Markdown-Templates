"use strict";
exports.__esModule = true;
var has_1 = require("./has");
/**
 * Unset object property.
 */
function unset(obj, prop) {
    if (has_1["default"](obj, prop)) {
        var parts = prop.split('.');
        var last = parts.pop();
        while ((prop = parts.shift())) {
            obj = obj[prop];
        }
        return delete obj[last];
    }
    else {
        // if property doesn't exist treat as deleted
        return true;
    }
}
exports["default"] = unset;
