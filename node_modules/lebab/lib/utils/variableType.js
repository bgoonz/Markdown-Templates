"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUpdate = isUpdate;
exports.isReference = isReference;

var _functionType = require("./functionType");

/**
 * True when node is variable update expression (like x++).
 *
 * @param {Object} node
 * @return {Boolean}
 */
function isUpdate(node) {
  return node.type === 'UpdateExpression' && node.argument.type === 'Identifier';
}
/**
 * True when node is reference to a variable.
 *
 * That is it's an identifier, that's not used:
 *
 * - as function name in function declaration/expression,
 * - as parameter name in function declaration/expression,
 * - as declared variable name in variable declaration,
 * - as object property name in member expression.
 * - as object property name in object literal.
 *
 * @param {Object} node
 * @param {Object} parent Immediate parent node (to determine context)
 * @return {Boolean}
 */


function isReference(node, parent) {
  return node.type === 'Identifier' && !isFunctionName(node, parent) && !isFunctionParameter(node, parent) && !isDeclaredVariable(node, parent) && !isPropertyInMemberExpression(node, parent) && !isPropertyInObjectLiteral(node, parent);
}

function isFunctionName(node, parent) {
  return (0, _functionType.isFunction)(parent) && parent.id === node;
}

function isFunctionParameter(node, parent) {
  return (0, _functionType.isFunction)(parent) && parent.params.some(function (p) {
    return p === node;
  });
}

function isDeclaredVariable(node, parent) {
  return parent.type === 'VariableDeclarator' && parent.id === node;
}

function isPropertyInMemberExpression(node, parent) {
  return parent.type === 'MemberExpression' && parent.property === node && !parent.computed;
}

function isPropertyInObjectLiteral(node, parent) {
  return parent.type === 'Property' && parent.key === node;
}