"use strict";
exports.__esModule = true;
var mixIn_1 = require("../object/mixIn");
/**
 * Create Object using prototypal inheritance and setting custom properties.
 * - Mix between Douglas Crockford Prototypal Inheritance <http://javascript.crockford.com/prototypal.html> and the EcmaScript 5 `Object.create()` method.
 * @param {object} parent    Parent Object.
 * @param {object} [props] Object properties.
 * @return {object} Created object.
 */
function createObject(parent, props) {
    function F() { }
    F.prototype = parent;
    return mixIn_1["default"](new F(), props);
}
exports["default"] = createObject;
