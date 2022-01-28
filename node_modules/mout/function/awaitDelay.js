"use strict";
exports.__esModule = true;
var now_1 = require("../time/now");
var timeout_1 = require("./timeout");
var append_1 = require("../array/append");
/**
 * Ensure a minimum delay for callbacks
 */
function awaitDelay(callback, delay) {
    var baseTime = now_1["default"]() + delay;
    return function () {
        // ensure all browsers will execute it asynchronously (avoid hard
        // to catch errors) not using "0" because of old browsers and also
        // since new browsers increase the value to be at least "4"
        // http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout
        var ms = Math.max(baseTime - now_1["default"](), 4);
        return timeout_1["default"].apply(this, append_1["default"]([callback, ms, this], arguments));
    };
}
exports["default"] = awaitDelay;
