"use strict";
exports.__esModule = true;
function kindOf(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
}
exports["default"] = kindOf;
