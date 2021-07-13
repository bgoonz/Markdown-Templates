"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fMatches = require("f-matches");

var _isTransformableToMethod = _interopRequireDefault(require("./isTransformableToMethod"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Matches: <className>.prototype.<methodName> = function () { ... }
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
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'Identifier',
          name: (0, _fMatches.extractAny)('className')
        },
        property: {
          type: 'Identifier',
          name: 'prototype'
        }
      },
      property: {
        type: 'Identifier',
        name: (0, _fMatches.extractAny)('methodName')
      }
    },
    operator: '=',
    right: (0, _fMatches.extract)('methodNode', _isTransformableToMethod["default"])
  }
});

exports["default"] = _default;