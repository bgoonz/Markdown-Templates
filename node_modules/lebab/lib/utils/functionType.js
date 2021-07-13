"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = isFunction;
exports.isFunctionExpression = isFunctionExpression;
exports.isFunctionDeclaration = isFunctionDeclaration;

/**
 * True when node is any kind of function.
 */
function isFunction(node) {
  return isFunctionDeclaration(node) || isFunctionExpression(node);
}
/**
 * True when node is (arrow) function expression.
 */


function isFunctionExpression(node) {
  return node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression';
}
/**
 * True when node is function declaration.
 */


function isFunctionDeclaration(node) {
  return node.type === 'FunctionDeclaration';
}