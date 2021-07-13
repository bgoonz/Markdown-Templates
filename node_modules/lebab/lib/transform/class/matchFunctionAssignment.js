"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fMatches = require("f-matches");

/**
 * Matches: <className>.<methodName> = function () { ... }
 *
 * When node matches returns the extracted fields:
 *
 * - className
 * - methodName
 * - methodNode
 *
 * @param  {Object} node
 * @return {Object}
 */
var _default = (0, _fMatches.matches)({
  type: 'ExpressionStatement',
  expression: {
    type: 'AssignmentExpression',
    left: {
      type: 'MemberExpression',
      computed: false,
      object: {
        type: 'Identifier',
        name: (0, _fMatches.extractAny)('className')
      },
      property: {
        type: 'Identifier',
        name: (0, _fMatches.extractAny)('methodName')
      }
    },
    operator: '=',
    right: (0, _fMatches.extract)('methodNode', {
      type: 'FunctionExpression'
    })
  }
});

exports["default"] = _default;