"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fp = require("lodash/fp");

var _traverser = _interopRequireDefault(require("../traverser"));

var _withScope = _interopRequireDefault(require("../withScope"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ast) {
  _traverser["default"].replace(ast, (0, _withScope["default"])(ast, {
    enter: function enter(node, parent, scope) {
      if (isES5Function(node) && node.params.length === 0) {
        var argumentsVar = (0, _fp.find)(function (v) {
          return v.name === 'arguments';
        }, scope.variables); // Look through all the places where arguments is used:
        // Make sure none of these has access to some already existing `args` variable

        if (argumentsVar && argumentsVar.references.length > 0 && !argumentsVar.references.some(function (ref) {
          return hasArgs(ref.from);
        })) {
          // Change all arguments --> args
          argumentsVar.references.forEach(function (ref) {
            ref.identifier.name = 'args';
          }); // Change function() --> function(...args)

          node.params = [createRestElement()];
        }
      }
    }
  }));
}

function isES5Function(node) {
  return node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression';
}

function hasArgs(scope) {
  if (!scope) {
    return false;
  }

  if (scope.variables.some(function (v) {
    return v.name === 'args';
  })) {
    return true;
  }

  return hasArgs(scope.upper);
}

function createRestElement() {
  return {
    type: 'RestElement',
    argument: {
      type: 'Identifier',
      name: 'args'
    }
  };
}