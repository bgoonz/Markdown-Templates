"use strict";
exports.__esModule = true;
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Return maximum value inside array
 */
function max(arr, iterator, thisObj) {
    if (arr == null || !arr.length) {
        return Infinity;
    }
    else if (arr.length && !iterator) {
        // eslint-disable-next-line prefer-spread
        return Math.max.apply(Math, arr);
    }
    else {
        iterator = makeIterator_1["default"](iterator, thisObj);
        var result = void 0;
        var compare = -Infinity;
        var value = void 0;
        var temp = void 0;
        var i = -1;
        var len = arr.length;
        while (++i < len) {
            value = arr[i];
            temp = iterator(value, i, arr);
            if (temp > compare) {
                compare = temp;
                result = value;
            }
        }
        return result;
    }
}
exports["default"] = max;
