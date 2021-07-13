"use strict";
exports.__esModule = true;
var isKind_1 = require("./isKind");
/**
 */
var isArray = Array.isArray ||
    function (val) {
        return isKind_1["default"](val, 'Array');
    };
exports["default"] = isArray;
