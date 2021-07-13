"use strict";
exports.__esModule = true;
/**
 * internal method used to create other collection modules.
 */
function makeCollectionMethod(arrMethod, objMethod, defaultReturn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args[0] == null) {
            return defaultReturn;
        }
        // array-like is treated as array
        return typeof args[0].length === 'number' ? arrMethod.apply(void 0, args) : objMethod.apply(void 0, args);
    };
}
exports["default"] = makeCollectionMethod;
