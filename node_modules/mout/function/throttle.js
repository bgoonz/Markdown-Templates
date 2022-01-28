"use strict";
exports.__esModule = true;
var now_1 = require("../time/now");
/**
 */
function throttle(fn, delay) {
    var context;
    var timeout;
    var result;
    var args;
    var diff;
    var prevCall = 0;
    function delayed() {
        prevCall = now_1["default"]();
        timeout = null;
        result = fn.apply(context, args);
    }
    function throttled() {
        context = this;
        args = arguments;
        diff = delay - (now_1["default"]() - prevCall);
        if (diff <= 0) {
            clearTimeout(timeout);
            delayed();
        }
        else if (!timeout) {
            timeout = setTimeout(delayed, diff);
        }
        return result;
    }
    throttled.cancel = function () {
        clearTimeout(timeout);
    };
    return throttled;
}
exports["default"] = throttle;
