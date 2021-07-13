"use strict";
exports.__esModule = true;
var bind = Function.prototype.bind;
/**
 * Do fn.apply on a constructor.
 */
function ctorApply(ctor, args) {
    // eslint-disable-next-line prefer-spread
    var Bound = bind.bind(ctor, undefined).apply(undefined, args);
    return new Bound();
}
exports["default"] = ctorApply;
