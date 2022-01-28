"use strict";
exports.__esModule = true;
var isKind_1 = require("./isKind");
function getArguments() {
    return arguments;
}
var isArgs = isKind_1["default"](getArguments(), 'Arguments')
    ? function (val) {
        return isKind_1["default"](val, 'Arguments');
    }
    : function (val) {
        // Arguments is an Object on IE7
        return !!(val && Object.prototype.hasOwnProperty.call(val, 'callee'));
    };
exports["default"] = isArgs;
