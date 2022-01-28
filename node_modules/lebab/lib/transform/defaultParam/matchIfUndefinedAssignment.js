"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fMatches = require("f-matches");

var matchEqualsUndefined = (0, _fMatches.matches)({
  type: 'BinaryExpression',
  left: {
    type: 'Identifier',
    name: (0, _fMatches.extractAny)('name2')
  },
  operator: (0, _fMatches.extractAny)('operator'),
  right: {
    type: 'Identifier',
    name: 'undefined'
  }
});
var matchTypeofUndefined = (0, _fMatches.matches)({
  type: 'BinaryExpression',
  left: {
    type: 'UnaryExpression',
    operator: 'typeof',
    prefix: true,
    argument: {
      type: 'Identifier',
      name: (0, _fMatches.extractAny)('name2')
    }
  },
  operator: (0, _fMatches.extractAny)('operator'),
  right: {
    type: 'Literal',
    value: 'undefined'
  }
});
var matchIfUndefinedAssignment = (0, _fMatches.matches)({
  type: 'ExpressionStatement',
  expression: {
    type: 'AssignmentExpression',
    left: {
      type: 'Identifier',
      name: (0, _fMatches.extractAny)('name')
    },
    operator: '=',
    right: {
      type: 'ConditionalExpression',
      test: function test(ast) {
        return matchEqualsUndefined(ast) || matchTypeofUndefined(ast);
      },
      consequent: (0, _fMatches.extractAny)('consequent'),
      alternate: (0, _fMatches.extractAny)('alternate')
    }
  }
});

function isEquals(operator) {
  return operator === '===' || operator === '==';
}

function isNotEquals(operator) {
  return operator === '!==' || operator === '!=';
}

function isIdent(node, name) {
  return node.type === 'Identifier' && node.name === name;
}
/**
 * Matches: <name> = <name> === undefined ? <value> : <name>;
 * Matches: <name> = typeof <name> === 'undefined' ? <value> : <name>;
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
  var _ref = matchIfUndefinedAssignment(node) || {},
      name = _ref.name,
      name2 = _ref.name2,
      operator = _ref.operator,
      consequent = _ref.consequent,
      alternate = _ref.alternate;

  if (name && name === name2) {
    if (isEquals(operator) && isIdent(alternate, name)) {
      return {
        name: name,
        value: consequent,
        node: node
      };
    }

    if (isNotEquals(operator) && isIdent(consequent, name)) {
      return {
        name: name,
        value: alternate,
        node: node
      };
    }
  }
}