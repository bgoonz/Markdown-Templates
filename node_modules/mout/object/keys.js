"use strict";
exports.__esModule = true;
var forOwn_1 = require("./forOwn");
/**
 * Get object keys
 */
var keys = Object.keys ||
    function (obj) {
        var keys = [];
        forOwn_1["default"](obj, function (_, key) {
            keys.push(key);
        });
        return keys;
    };
exports["default"] = keys;
