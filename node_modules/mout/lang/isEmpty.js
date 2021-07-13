"use strict";
exports.__esModule = true;
var forOwn_1 = require("../object/forOwn");
var isArray_1 = require("./isArray");
function isEmpty(val) {
    if (val == null) {
        // typeof null == 'object' so we check it first
        return true;
    }
    else if (typeof val === 'string' || isArray_1["default"](val)) {
        return !val.length;
    }
    else if (typeof val === 'object') {
        var result_1 = true;
        forOwn_1["default"](val, function () {
            result_1 = false;
            return false; // break loop
        });
        return result_1;
    }
    else {
        return true;
    }
}
exports["default"] = isEmpty;
