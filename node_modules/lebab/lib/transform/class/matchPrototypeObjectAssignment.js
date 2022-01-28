"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fMatches = require("f-matches");

var _isFunctionProperty = _interopRequireDefault(require("./isFunctionProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var matchPrototypeObjectAssignment = (0, _fMatches.matches)({
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
        name: 'prototype'
      }
    },
    operator: '=',
    right: {
      type: 'ObjectExpression',
      properties: (0, _fMatches.extract)('properties', function (props) {
        return props.every(_isFunctionProperty["default"]);
      })
    }
  }
});
/**
 * Matches: <className>.prototype = {
 *              <methodName>: <methodNode>,
 *              ...
 *          };
 *
 * When node matches returns the extracted fields:
 *
 * - className
 * - methods
 *     - propertyNode
 *     - methodName
 *     - methodNode
 *     - kind
 *
 * @param  {Object} node
 * @return {Object}
 */

function _default(node) {
  var _matchPrototypeObject = matchPrototypeObjectAssignment(node),
      className = _matchPrototypeObject.className,
      properties = _matchPrototypeObject.properties;

  if (className) {
    return {
      className: className,
      methods: properties.map(function (prop) {
        return {
          propertyNode: prop,
          methodName: prop.key.name,
          methodNode: prop.value,
          kind: prop.kind
        };
      })
    };
  }
}