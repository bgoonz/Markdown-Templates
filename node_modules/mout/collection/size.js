"use strict";
exports.__esModule = true;
var isArray_1 = require("../lang/isArray");
var size_1 = require("../object/size");
/**
 * Get collection size
 */
function size(list) {
    if (!list) {
        return 0;
    }
    if (isArray_1["default"](list)) {
        return list.length;
    }
    return size_1["default"](list);
}
exports["default"] = size;
