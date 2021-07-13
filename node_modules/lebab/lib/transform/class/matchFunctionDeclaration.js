"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 * Matches: function <className>() { ... }
 *
 * When node matches returns the extracted fields:
 *
 * - className
 * - constructorNode
 *
 * @param  {Object} node
 * @return {Object}
 */
function _default(node) {
  if (node.type === 'FunctionDeclaration' && node.id) {
    return {
      className: node.id.name,
      constructorNode: node
    };
  }
}