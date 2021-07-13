"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fMatches = require("f-matches");

var matchOrAssignment = (0, _fMatches.matches)({
  type: 'ExpressionStatement',
  expression: {
    type: 'AssignmentExpression',
    left: {
      type: 'Identifier',
      name: (0, _fMatches.extractAny)('name')
    },
    operator: '=',
    right: {
      type: 'LogicalExpression',
      left: {
        type: 'Identifier',
        name: (0, _fMatches.extractAny)('name2')
      },
      operator: '||',
      right: (0, _fMatches.extractAny)('value')
    }
  }
});
/**
 * Matches: <name> = <name> || <value>;
 *
 * When node matches returns the extracted fields:
 *
 * - name
 * - value
 * - node (the entire node)
 *
 * @param {Object} node
 * @return {Object}
 */

function _default(node) {
  var _ref = matchOrAssignment(node) || {},
      name = _ref.name,
      name2 = _ref.name2,
      value = _ref.value;

  if (name && name === name2) {
    return {
      name: name,
      value: value,
      node: node
    };
  }
}