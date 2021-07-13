"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fMatches = require("f-matches");

var _isFunctionProperty = _interopRequireDefault(require("./isFunctionProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var matchObjectDefinePropertyCall = (0, _fMatches.matches)({
  type: 'ExpressionStatement',
  expression: {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      computed: false,
      object: {
        type: 'Identifier',
        name: 'Object'
      },
      property: {
        type: 'Identifier',
        name: 'defineProperty'
      }
    },
    arguments: [{
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
    }, {
      type: 'Literal',
      value: (0, _fMatches.extractAny)('methodName')
    }, {
      type: 'ObjectExpression',
      properties: (0, _fMatches.extractAny)('properties')
    }]
  }
});

function isAccessorDescriptor(node) {
  return (0, _isFunctionProperty["default"])(node) && (node.key.name === 'get' || node.key.name === 'set');
}
/**
 * Matches: Object.defineProperty(<className>.prototype, "<methodName>", {
 *              <kind>: <methodNode>,
 *              ...
 *          })
 *
 * When node matches returns the extracted fields:
 *
 * - className
 * - methodName
 * - descriptors:
 *     - propertyNode
 *     - methodNode
 *     - kind
 *
 * @param  {Object} node
 * @return {Object}
 */


function _default(node) {
  var _matchObjectDefinePro = matchObjectDefinePropertyCall(node),
      className = _matchObjectDefinePro.className,
      methodName = _matchObjectDefinePro.methodName,
      properties = _matchObjectDefinePro.properties;

  if (className) {
    return {
      className: className,
      methodName: methodName,
      descriptors: properties.filter(isAccessorDescriptor).map(function (prop) {
        return {
          propertyNode: prop,
          methodNode: prop.value,
          kind: prop.key.name
        };
      })
    };
  }
}