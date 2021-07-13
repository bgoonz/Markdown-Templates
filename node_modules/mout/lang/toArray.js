"use strict";
exports.__esModule = true;
var kindOf_1 = require("./kindOf");
var GLOBAL_1 = require("./GLOBAL");
/**
 * Convert array-like object into array
 */
function toArray(val) {
    var ret = [];
    var kind = kindOf_1["default"](val);
    var n;
    if (val != null) {
        if (val.length == null ||
            kind === 'String' ||
            kind === 'Function' ||
            kind === 'RegExp' ||
            val === GLOBAL_1["default"]) {
            // string, regexp, function have .length but user probably just want
            // to wrap value into an array..
            ret[ret.length] = val;
        }
        else {
            // window returns true on isObject in IE7 and may have length
            // property. `typeof NodeList` returns `function` on Safari so
            // we can't use it (#58)
            n = val.length;
            while (n--) {
                ret[n] = val[n];
            }
        }
    }
    return ret;
}
exports["default"] = toArray;
