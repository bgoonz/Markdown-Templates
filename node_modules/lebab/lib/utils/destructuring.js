"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractVariables = extractVariables;
exports.extractVariableNames = extractVariableNames;

var _fp = require("lodash/fp");

/**
 * Extracts all variables from from destructuring
 * operation in assignment or variable declaration.
 *
 * Also works for a single identifier (so it generalizes
 * for all assignments / variable declarations).
 *
 * @param  {Object} node
 * @return {Object[]} Identifiers
 */
function extractVariables(node) {
  if (node.type === 'Identifier') {
    return [node];
  }

  if (node.type === 'ArrayPattern') {
    // Use compact() to ignore missing elements in ArrayPattern
    return (0, _fp.flatMap)(extractVariables, (0, _fp.compact)(node.elements));
  }

  if (node.type === 'ObjectPattern') {
    return (0, _fp.flatMap)(extractVariables, node.properties);
  }

  if (node.type === 'Property') {
    return extractVariables(node.value);
  }

  if (node.type === 'AssignmentPattern') {
    return extractVariables(node.left);
  } // Ignore stuff like MemberExpressions,
  // we only care about variables.


  return [];
}
/**
 * Like extractVariables(), but returns the names of variables
 * instead of Identifier objects.
 *
 * @param  {Object} node
 * @return {String[]} variable names
 */


function extractVariableNames(node) {
  return extractVariables(node).map(function (v) {
    return v.name;
  });
}