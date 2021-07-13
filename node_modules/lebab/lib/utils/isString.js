"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isString;

/**
 * True when the given node is string literal.
 * @param  {Object}  node
 * @return {Boolean}
 */
function isString(node) {
  return node.type === 'Literal' && typeof node.value === 'string';
}