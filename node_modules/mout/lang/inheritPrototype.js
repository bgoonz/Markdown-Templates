"use strict";
exports.__esModule = true;
var createObject_1 = require("./createObject");
/**
 * Inherit prototype from another Object.
 * - inspired by Nicholas Zackas <http://nczonline.net> Solution
 * @param {object} child Child object
 * @param {object} parent    Parent Object
 */
function inheritPrototype(child, parent) {
    var p = createObject_1["default"](parent.prototype);
    p.constructor = child;
    child.prototype = p;
    child.super_ = parent;
    return p;
}
exports["default"] = inheritPrototype;
