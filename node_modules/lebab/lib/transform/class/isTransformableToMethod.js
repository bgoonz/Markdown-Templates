"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isTransformableToMethod;

var _traverser = _interopRequireDefault(require("../../traverser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Detects if function can be transformed to class method
 * @param  {Object}  node
 * @return {Boolean}
 */
function isTransformableToMethod(node) {
  if (node.type === 'FunctionExpression') {
    return true;
  }

  if (node.type === 'ArrowFunctionExpression' && !usesThis(node)) {
    return true;
  }
}

function usesThis(ast) {
  return _traverser["default"].find(ast, 'ThisExpression', {
    skipTypes: ['FunctionExpression', 'FunctionDeclaration']
  });
}