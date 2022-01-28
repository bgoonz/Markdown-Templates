"use strict";
exports.__esModule = true;
var forOwn_1 = require("./forOwn");
/**
 * checks if a object contains all given properties/values
 */
function matches(target, props) {
    // can't use "object/every" because of circular dependency
    var result = true;
    forOwn_1["default"](props, function (val, key) {
        if (target[key] !== val) {
            // break loop at first difference
            return (result = false);
        }
    });
    return result;
}
exports["default"] = matches;
