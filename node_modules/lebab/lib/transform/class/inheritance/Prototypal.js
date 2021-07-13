"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fMatches = require("f-matches");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Processes nodes to detect super classes and return information for later
 * transformation.
 *
 * Detects:
 *
 *   Class1.prototype = Object.create(Class2.prototype);
 *
 * or:
 *
 *   Class1.prototype = new Class2();
 *
 * optionally followed by:
 *
 *   Class1.prototype.constructor = Class1;
 */
var Prototypal = /*#__PURE__*/function () {
  function Prototypal() {
    _classCallCheck(this, Prototypal);

    this.foundSuperclasses = {};
  }
  /**
   * Process a node and return inheritance details if found.
   * @param {Object} node
   * @param {Object} parent
   * @returns {Object/undefined} m
   *                    {String}   m.className
   *                    {Node}     m.superClass
   *                    {Object[]} m.relatedExpressions
   */


  _createClass(Prototypal, [{
    key: "process",
    value: function process(node, parent) {
      var m;

      if (m = this.matchNewAssignment(node) || this.matchObjectCreateAssignment(node)) {
        this.foundSuperclasses[m.className] = m.superClass;
        return {
          className: m.className,
          superClass: m.superClass,
          relatedExpressions: [{
            node: node,
            parent: parent
          }]
        };
      } else if (m = this.matchConstructorAssignment(node)) {
        var superClass = this.foundSuperclasses[m.className];

        if (superClass && m.className === m.constructorClassName) {
          return {
            className: m.className,
            superClass: superClass,
            relatedExpressions: [{
              node: node,
              parent: parent
            }]
          };
        }
      }
    } // Matches: <className>.prototype = new <superClass>();

  }, {
    key: "matchNewAssignment",
    value: function matchNewAssignment(node) {
      return (0, _fMatches.matches)({
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          left: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: (0, _fMatches.extractAny)('className')
            },
            property: {
              type: 'Identifier',
              name: 'prototype'
            }
          },
          right: {
            type: 'NewExpression',
            callee: (0, _fMatches.extractAny)('superClass')
          }
        }
      }, node);
    } // Matches: <className>.prototype = Object.create(<superClass>);

  }, {
    key: "matchObjectCreateAssignment",
    value: function matchObjectCreateAssignment(node) {
      return (0, _fMatches.matches)({
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          left: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: (0, _fMatches.extractAny)('className')
            },
            property: {
              type: 'Identifier',
              name: 'prototype'
            }
          },
          right: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'Object'
              },
              property: {
                type: 'Identifier',
                name: 'create'
              }
            },
            arguments: (0, _fMatches.matchesLength)([{
              type: 'MemberExpression',
              object: (0, _fMatches.extractAny)('superClass'),
              property: {
                type: 'Identifier',
                name: 'prototype'
              }
            }])
          }
        }
      }, node);
    } // Matches: <className>.prototype.constructor = <constructorClassName>;

  }, {
    key: "matchConstructorAssignment",
    value: function matchConstructorAssignment(node) {
      return (0, _fMatches.matches)({
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          left: {
            type: 'MemberExpression',
            object: {
              type: 'MemberExpression',
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
              name: 'constructor'
            }
          },
          right: {
            type: 'Identifier',
            name: (0, _fMatches.extractAny)('constructorClassName')
          }
        }
      }, node);
    }
  }]);

  return Prototypal;
}();

exports["default"] = Prototypal;