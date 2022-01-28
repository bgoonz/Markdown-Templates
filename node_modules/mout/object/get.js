"use strict";
exports.__esModule = true;
/**
 * get "nested" object property
 */
function get(obj, prop) {
    if (!obj)
        return;
    var parts = prop.split('.');
    var last = parts.pop();
    while ((prop = parts.shift())) {
        obj = obj[prop];
        if (obj == null)
            return;
    }
    return obj[last];
}
exports["default"] = get;
