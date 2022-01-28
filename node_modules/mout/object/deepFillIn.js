"use strict";
exports.__esModule = true;
var forOwn_1 = require("./forOwn");
var isPlainObject_1 = require("../lang/isPlainObject");
/**
 * Deeply copy missing properties in the target from the defaults.
 */
function deepFillIn(target, defaults) {
    var i = 0;
    var n = arguments.length;
    var obj;
    while (++i < n) {
        obj = arguments[i];
        if (obj) {
            // jshint loopfunc: true
            forOwn_1["default"](obj, function (newValue, key) {
                var curValue = target[key];
                if (curValue == null) {
                    target[key] = newValue;
                }
                else if (isPlainObject_1["default"](curValue) && isPlainObject_1["default"](newValue)) {
                    deepFillIn(curValue, newValue);
                }
            });
        }
    }
    return target;
}
exports["default"] = deepFillIn;
